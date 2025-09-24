// backend/models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // User-friendly, unique ID like EK-1678886400000
  orderId: { type: String, required: true, unique: true },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [
    {
      product: { type: String, required: true }, // product slug
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
      imageUrls: [{ type: String }],
    },
  ],
  shippingAddress: {
    // You can add this later
  },
  totalPrice: { type: Number, required: true },
  
  // New fields for tracking
  estimatedDelivery: { type: Date },
  statusTimeline: [
    {
      status: { 
        type: String, 
        enum: ['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'], 
        default: 'Order Placed' 
      },
      date: { type: Date, default: Date.now },
      notes: { type: String }
    }
  ],
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },

}, { timestamps: true }); // createdAt and updatedAt

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;