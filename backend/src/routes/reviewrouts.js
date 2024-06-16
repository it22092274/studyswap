// routes/Reviews.js
const Express = require('express');
const Router = Express.Router();
const Review = require('../models/reviewmodel');
const User = require('../models/usermodel'); // Ensure User model is imported

// POST a new review
Router.post('/addrev', async (req, res) => {
  const { Reviewer, Reviewee, Rating, Comment, MarketplaceReview } = req.body;

  try {
    const newReview = new Review({
      Reviewer,
      Reviewee,
      Rating,
      Comment,
      MarketplaceReview
    });

    await newReview.save();

    // Add review to provider's profile if role is 'Provider'
    // const user = await User.findById(Reviewee);
    // if (user.Role === 'Provider') {
    //   user.Reviews.push(newReview._id);
    //   await user.save();
    // }

    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET reviews for a user
Router.get('/:UserId', async (req, res) => {
  try {
    const userReviews = await Review.find({ Reviewee: req.params.UserId }).populate('Reviewer');
    res.status(200).json(userReviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET marketplace reviews
Router.get('/marketplacerev', async (req, res) => {
  try {
    const marketplaceReviews = await Review.find({ MarketplaceReview: true }).populate('Reviewer');
    res.status(200).json(marketplaceReviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = Router;
