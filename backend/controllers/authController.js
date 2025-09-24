const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (user) => jwt.sign({
  id: user._id,
  isAdmin: user.isAdmin
}, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token
    });
  } catch (error) {
    next(error);
  }
};

// Logout (client-side can clear token)
// Add refresh tokens or invalidate tokens if needed (advanced)