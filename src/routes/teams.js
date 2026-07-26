const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  res.json({ message: 'Team endpoint' });
});

module.exports = router;