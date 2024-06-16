// models/User.js
const Mongoose = require('mongoose');
const Review = require('./reviewmodel'); // Import the Review model

const UserSchema = new Mongoose.Schema({
  Name: String,
  Email: { type: String, unique: true },
  Password: String,
  Role: { type: String, enum: ['buyer', 'provider'] },
  Reviews: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = Mongoose.model('User', UserSchema);

