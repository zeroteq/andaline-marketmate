const express = require('express');
const Favorite = require('../models/Favorite');
const router = express.Router();

// Add to favorites
router.post('/', async (req, res) => {
  const { userId, listingId } = req.body;
  try {
    const existingFavorite = await Favorite.findOne({ userId, listingId });
    if (existingFavorite) return res.status(400).json({ message: 'Listing already in favorites' });

    const favorite = new Favorite({ userId, listingId });
    await favorite.save();

    res.status(201).json({ message: 'Added to favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
