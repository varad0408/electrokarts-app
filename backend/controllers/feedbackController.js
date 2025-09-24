const Feedback = require('../models/Feedback');
const sendEmail = require('../utils/sendEmail');

exports.submitFeedback = async (req, res, next) => {
  try {
    const { message } = req.body;
    const user = req.user.id;
    const feedback = await Feedback.create({ user, message });

    // Send email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Feedback received',
      text: `User ${req.user.email} submitted feedback:\n\n${message}`
    });

    res.status(201).json({ message: 'Feedback submitted' });
  } catch (error) {
    next(error);
  }
};

exports.getAllFeedbacks = async (req, res, next) => {
  // Admin only
  const feedbacks = await Feedback.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(feedbacks);
};