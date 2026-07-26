// Listings Routes
const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const { body, validationResult } = require('express-validator');

// Middleware to check authentication
const auth = require('../middleware/auth');

// @route GET /api/listings
// @desc Get all listings with filters
router.get('/', async (req, res) => {
  try {
    const { type, category, location, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (location) filter['location.area'] = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    filter.status = 'active';

    const skip = (page - 1) * limit;
    const listings = await Listing.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .populate('userId', 'name email phone profile');

    const total = await Listing.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      listings
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/listings/:id
// @desc Get listing by ID
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id)
      .populate('userId', 'name email phone profile');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Increment view count
    listing.analytics.views += 1;
    listing.analytics.lastViewed = new Date();
    await listing.save();

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/listings
// @desc Create new listing
router.post('/', auth, [
  body('title').notEmpty().withMessage('Title is required'),
  body('type').isIn(['apartment', 'villa', 'townhouse', 'studio', 'penthouse', 'land']),
  body('category').isIn(['buy', 'rent', 'offplan', 'sell']),
  body('price').isNumeric().withMessage('Valid price is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('description').notEmpty().withMessage('Description is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const listing = new Listing({
      ...req.body,
      userId: req.user.id
    });

    await listing.save();

    res.status(201).json({
      message: 'Listing created successfully',
      listing
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route PUT /api/listings/:id
// @desc Update listing
router.put('/:id', auth, async (req, res) => {
  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, updatedAt: new Date() },
      { new: true }
    );

    res.json({
      message: 'Listing updated successfully',
      listing
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route DELETE /api/listings/:id
// @desc Delete listing
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Listing.findByIdAndRemove(req.params.id);

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;