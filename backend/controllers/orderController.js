const Order = require('../models/order');

const generateOrderId = () => `EK-${Date.now()}`;

const generateDeliveryDate = () => {
  const deliveryDate = new Date();
  const randomDays = Math.floor(Math.random() * 5) + 3;
  deliveryDate.setDate(deliveryDate.getDate() + randomDays);
  return deliveryDate;
};

exports.createOrder = async (req, res, next) => {
  try {
    const { orderItems, totalPrice } = req.body;
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    const order = new Order({
      orderId: generateOrderId(),
      user: req.user.id, // Assumes auth middleware is running
      orderItems,
      totalPrice,
      estimatedDelivery: generateDeliveryDate(),
      statusTimeline: [{ status: 'Order Placed', date: new Date() }],
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

// ✅ ADD THIS MISSING FUNCTION
exports.getOrderByOrderId = async (req, res, next) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId }).populate('user', 'name email');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
};