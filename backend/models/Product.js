const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  color: { type: String },
  category: {
    type: String,
    enum: ['Mobiles', 'Tablets', 'Cameras', 'Laptops', 'Smartwatches', 'Refrigerators', 'ACs', 'Speakers', 'Headphones', 'Televisions', 'Gaming Consoles'],
    required: true,
  },
  description: { type: String, required: true },
  keyFeatures: [{ type: String }],
  price: { type: Number, required: true, min: 0 },
  imageUrls: [{ type: String, required: true }],
  stock: { type: Number, default: 0, min: 0 },
  brand: { type: String },
  reviews: [reviewSchema],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  variants: [{
    type: { type: String, required: true },
    value: { type: String, required: true },
    price: { type: Number, required: true }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);