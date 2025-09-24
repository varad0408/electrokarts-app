// backend/routes/orderRoutes.js

const express = require('express');
const router = express.Router();

const { 
  createOrder, 
  getOrderById, 
  getOrderByOrderId 
} = require('../controllers/orderController');

// Import your authentication middleware (assuming it's in a middleware folder)
const { protect } = require('../middleware/authMiddleware');


// ✅ ADD THE 'protect' MIDDLEWARE HERE
// This ensures the user is logged in before they can create an order.
router.post('/', protect, createOrder);


router.get('/by-order-id/:orderId', protect, getOrderByOrderId);
router.get('/:id', protect, getOrderById);

module.exports = router;