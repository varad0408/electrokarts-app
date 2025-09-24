import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/Products/ProductList';
import ProductDetail from './components/Products/ProductDetail';
import Cart from './components/Cart/Cart';
import Checkout from './components/Cart/Checkout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Wishlist from './components/Wishlist';
import FeedbackForm from './components/FeedbackForm';
import OrderTracking from './components/OrderTracking'; // to be implemented
import AdminPanel from './components/AdminPanel/AdminPanel'; // to be implemented

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/feedback" element={<FeedbackForm />} />
      <Route path="/order-tracking/:id" element={<OrderTracking />} />
      <Route path="/admin/*" element={<AdminPanel />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}