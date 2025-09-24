// Import necessary packages
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path'); // Import the 'path' module
const connectDB = require('./config/db');

// Import route files
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

// --- Initial Setup ---
dotenv.config();
connectDB();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// --- API Routes ---
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);


// --- DEPLOYMENT CONFIGURATION ---
// This code will only run in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  // Set the frontend build folder as a static folder
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  // Serve the index.html file for any other routes
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  // In development, the root route just says the API is running
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}


// --- Error Handling Middleware (Optional) ---
// ...

// --- Start Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});