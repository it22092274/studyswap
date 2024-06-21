const Bcrypt = require('bcryptjs');
const User = require('../models/usermodel'); // Ensure User model is imported

Router.post('/register', async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const ExistingUser = await User.findOne({ Email });
    if (ExistingUser) {
      return res.status(400).json({ Message: "User already exists." });
    }
    const HashedPassword = await Bcrypt.hash(Password, 12);
    const NewUser = new User({
      Email,
      Password: HashedPassword,
    });
    await NewUser.save();
    res.status(201).json({ Message: "User created successfully." });
  } catch (Error) {
    res.status(500).json({ Message: "Error registering new user." });
  }
});

Router.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const User = await User.findOne({ Email });
    if (!User) {
      return res.status(404).json({ Message: "User not found." });
    }
    const IsPasswordCorrect = await Bcrypt.compare(Password, User.Password);
    if (!IsPasswordCorrect) {
      return res.status(400).json({ Message: "Invalid credentials." });
    }
    const Token = Jwt.sign({ UserId: User._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(200).json({ Token, UserId: User._id });
  } catch (Error) {
    res.status(500).json({ Message: "Something went wrong." });
  }
});

module.exports = Router;
