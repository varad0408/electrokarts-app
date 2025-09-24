const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductBySlug,
  createProduct,
  addReview,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, admin, createProduct);

// Explicit slug route to support URLs like /api/products/slug/:slug
router.get('/slug/:slug', getProductBySlug);

router.route('/:id').get(getProductById);

router.route('/:id/review').post(protect, addReview);

module.exports = router;
