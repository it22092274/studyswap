// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// POST a new review
router.post('/add', async (req, res) => {
  const { marketplaceReview, rating, comment } = req.body;

  try {
    const review = new Review({
      marketplaceReview,
      rating,
      comment,
      
    });
    
    await review.save().then(()=>{
      res.status(200).json({msg:"review added successfully"});
    });
    
    // Add review to user's profile
    // const user = await User.findById(reviewee);
    // user.reviews.push(review._id);
    // await user.save();

    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// // GET reviews for a user
// router.get('/:userId', async (req, res) => {
//   try {
//     const reviews = await Review.find({ reviewee: req.params.userId }).populate('reviewer');
//     res.status(200).json(reviews);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // GET marketplace reviews
// router.get('/marketplace', async (req, res) => {
//   try {
//     const reviews = await Review.find({ marketplaceReview: true }).populate('reviewer');
//     res.status(200).json(reviews);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

//Get all reviews 
router.route("/reviews/").get((req, res) => {
  Review.find()
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ message: `Feedbacks fetching unsuccessful ${err}` });
    });
});

module.exports = router;
