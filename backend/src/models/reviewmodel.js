const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    marketplaceReview: { type: Boolean, default: false },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Review', reviewSchema);