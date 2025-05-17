const express = require('express');
const router = express.Router();

// Placeholder for chatbot routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Chatbot routes working' });
});

module.exports = router; 