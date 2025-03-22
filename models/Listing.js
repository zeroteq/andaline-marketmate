const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  type: { type: String, enum: ['product', 'service'], required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  images: { type: [String], default: [] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  category: { type: String, required: true }
});

module.exports = mongoose.model('Listing', listingSchema);
