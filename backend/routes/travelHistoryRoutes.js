const express = require('express');
const router = express.Router();
const TravelHistory = require('../models/TravelHistory');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id; 
    const travelHistory = await TravelHistory.find({ userId });
    res.json(travelHistory);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch travel history' });
  }
});

module.exports = router;