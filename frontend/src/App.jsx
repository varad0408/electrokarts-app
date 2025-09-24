import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Layout/Header';
import CategoryNav from './components/Layout/CategoryNav';
import Footer from './components/Layout/Footer';

// Page Components
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetail from './components/Products/ProductDetail';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Cart from './components/Cart/Cart';
import PrivateRoute from './components/PrivateRoute';
import Checkout from './components/Cart/Checkout';
import OrderSuccessPage from './pages/OrderSuccessPage'; // 1. Import it
import OrderTrackingPage from './pages/OrderTrackingPage'; // 1. Import the new page
import MyOrdersPage from './pages/MyOrdersPage'; 



function App() {
  return (
    <Router>
      <Header />
      <CategoryNav />
      
      <main className="app-main">
        <Routes>
          {/* Public routes that anyone can access */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {/* ✅ Product detail is now public so it renders correctly */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Protected routes that require a user to be logged in */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
          <Route path="/track-order/:orderId" element={<OrderTrackingPage />} /> {/* 2. Add this new route */}
          <Route path="/my-orders" element={<PrivateRoute><MyOrdersPage /></PrivateRoute>} /> 
        

        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
