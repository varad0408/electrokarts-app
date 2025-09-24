const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Make sure this path is correct

// Middleware to protect routes by verifying a user's token
const protect = async (req, res, next) => {
  let token;

  // We read the JWT from the http-only cookie
  if (req.cookies.jwt) {
    try {
      token = req.cookies.jwt;
      
      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find the user by the ID in the token and attach them to the request
      req.user = await User.findById(decoded.userId).select('-password');
      
      next(); // Proceed to the next step
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check for admin privileges
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };