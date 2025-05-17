const express = require('express');
const router = express.Router();

// Placeholder for course routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Course routes working' });
});

module.exports = router; 