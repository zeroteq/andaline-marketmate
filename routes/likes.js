const express = require('express');
const UserLike = require('../models/UserLike');
const Listing = require('../models/Listing');
const router = express.Router();

// Like a listing
router.post('/', async (req, res) => {
  const { userId, listingId } = req.body;
  try {
    const listing = await Listing.findById(listingId);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const existingLike = await UserLike.findOne({ userId, listingId });
    if (existingLike) return res.status(400).json({ message: 'Listing already liked' });

    const like = new UserLike({ userId, listingId });
    await like.save();

    listing.likes += 1;
    await listing.save();

    res.status(201).json({ message: 'Listing liked' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
