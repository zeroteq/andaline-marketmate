const express = require('express');
const Listing = require('../models/Listing');
const router = express.Router();

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().populate('userId', 'displayName profilePic');
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a listing
router.post('/', async (req, res) => {
  const { type, title, price, description, location, images, userId, category } = req.body;
  try {
    const listing = new Listing({ type, title, price, description, location, images, userId, category });
    await listing.save();
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
