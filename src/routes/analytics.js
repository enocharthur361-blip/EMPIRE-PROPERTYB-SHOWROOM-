const express = require('express');
const router = express.Router();

router.get('/listings', (req, res) => {
  res.json({ message: 'Listings analytics endpoint' });
});

module.exports = router;