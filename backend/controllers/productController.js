const Product = require('../models/product'); // Make sure the model path is correct

// This function handles fetching all products and filtering by category or search
exports.getProducts = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// This function finds a single product by its slug (param name: id for backward compatibility)
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.id }).populate('reviews.user', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// New explicit getter by slug path: /api/products/slug/:slug
exports.getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate('reviews.user', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// ✅ ADD THIS FUNCTION FOR THE BANNER
// This function gets only the specific products designated for the banner
exports.getBannerProducts = async (req, res) => {
  try {
    const bannerProductSlugs = [
      'iphone-air',
      'apple-macbook-air',
      'bose-soundlink-flex',
      'samsung-galaxy-s25-ultra'
    ];
    
    const products = await Product.find({ 'slug': { $in: bannerProductSlugs } });
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'Banner products not found' });
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

exports.addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findOne({ slug: req.params.id });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    
    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user.id.toString());
    if (alreadyReviewed) return res.status(400).json({ message: 'You have already reviewed this product' });

    const review = { user: req.user.id, name: req.user.name, rating: Number(rating), comment };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    
    await product.save();
    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    next(error);
  }
};
