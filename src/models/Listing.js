// Listing Model
const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  type: {
    type: String,
    enum: ['apartment', 'villa', 'townhouse', 'studio', 'penthouse', 'land'],
    required: true
  },
  category: {
    type: String,
    enum: ['buy', 'rent', 'offplan', 'sell'],
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  currency: {
    type: String,
    default: 'AED'
  },
  location: {
    address: String,
    area: String,
    city: String,
    emirate: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }
  },
  details: {
    bedrooms: Number,
    bathrooms: Number,
    sqft: Number,
    parking: Number,
    furnished: Boolean,
    yearBuilt: Number
  },
  amenities: [String],
  description: {
    type: String,
    required: true
  },
  media: {
    photos: [{
      url: String,
      caption: String,
      uploadedAt: Date
    }],
    videos: [{
      url: String,
      thumbnail: String,
      duration: Number
    }],
    virtualTourUrl: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'sold', 'rented', 'pending'],
    default: 'active'
  },
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    inquiries: {
      type: Number,
      default: 0
    },
    favorites: {
      type: Number,
      default: 0
    },
    lastViewed: Date
  },
  documents: [{
    type: String,
    name: String,
    url: String,
    uploadedAt: Date
  }],
  isFeature: {
    type: Boolean,
    default: false
  },
  expiresAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geospatial queries
listingSchema.index({ 'location.coordinates': '2dsphere' });
listingSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Listing', listingSchema);