// models/User.js
const Mongoose = require('mongoose');
const Review = require('./Review'); // Import the Review model

const UserSchema = new Mongoose.Schema({
  Name: String,
  Email: { type: String, unique: true },
  Password: String,
  Role: { type: String, enum: ['Buyer', 'Provider'] },
  Reviews: [{
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    required: function() { return this.Role === 'Provider'; }
  }]
});

// Middleware to remove Reviews field if Role is not 'Provider'
UserSchema.pre('save', function(next) {
  if (this.Role !== 'Provider') {
    this.Reviews = undefined;
  }
  next();
});

module.exports = Mongoose.model('User', UserSchema);
;
