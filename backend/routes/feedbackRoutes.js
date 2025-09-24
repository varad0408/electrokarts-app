const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getAllFeedbacks,
} = require('../controllers/feedbackController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').post(protect, submitFeedback).get(protect, admin, getAllFeedbacks);

module.exports = router;