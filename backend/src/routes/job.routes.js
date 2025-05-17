const express = require('express');
const router = express.Router();

// Placeholder for job routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Job routes working' });
});

module.exports = router; 