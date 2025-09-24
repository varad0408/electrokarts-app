// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { 
  registerUser, 
  loginUser,
  getMyOrders // 1. Import the new function
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// 2. ✅ ADD THIS NEW ROUTE
// It is protected, so only logged-in users can access it.
router.get('/my-orders', protect, getMyOrders);

module.exports = router;