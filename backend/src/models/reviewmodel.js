
// models/Review.js
const Mongoose = require('mongoose');
const User = require('./User'); // Import the User model

const ReviewSchema = new Mongoose.Schema({
  Reviewer: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
  Reviewee: { type: Mongoose.Schema.Types.ObjectId, ref: 'User' },
  MarketplaceReview: { type: Boolean, default: false },
  Rating: { type: Number, min: 1, max: 5 },
  Comment: String,
  CreatedAt: { type: Date, default: Date.now }
});

module.exports = Mongoose.model('Review', ReviewSchema);
