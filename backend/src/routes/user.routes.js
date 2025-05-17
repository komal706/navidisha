const express = require('express');
const router = express.Router();

// Placeholder for user routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'User routes working' });
});

module.exports = router; 