// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const User = require('../models/User');

// POST a new review
router.post('/', async (req, res) => {
  const { reviewer, reviewee, rating, comment, marketplaceReview } = req.body;

  try {
    const review = new Review({
      reviewer,
      reviewee,
      rating,
      comment,
      marketplaceReview
    });
    
    await review.save();
    
    // Add review to user's profile
    const user = await User.findById(reviewee);
    user.reviews.push(review._id);
    await user.save();
    
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET reviews for a user
router.get('/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId }).populate('reviewer');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET marketplace reviews
router.get('/marketplace', async (req, res) => {
  try {
    const reviews = await Review.find({ marketplaceReview: true }).populate('reviewer');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
