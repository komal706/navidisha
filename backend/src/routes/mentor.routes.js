const express = require('express');
const router = express.Router();

// Placeholder for mentor routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Mentor routes working' });
});

module.exports = router; 