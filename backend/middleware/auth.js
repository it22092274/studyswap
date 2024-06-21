// middleware/auth.js

const Jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
  try {
    const Token = req.header('Authorization').split(' ')[1];
    if (!Token) return res.status(401).send('Access Denied. No Token Provided.');

    const Decoded = Jwt.verify(Token, 'your_jwt_secret');
    req.User = Decoded;
    next();
  } catch (Ex) {
    res.status(400).send('Invalid Token.');
  }
};

module.exports = Auth;

