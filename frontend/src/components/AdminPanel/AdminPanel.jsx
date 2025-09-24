import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import FeedbackManagement from './FeedbackManagement';

export default function AdminPanel() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <nav className="admin-nav">
        <NavLink to="products">Manage Products</NavLink> |{' '}
        <NavLink to="orders">Manage Orders</NavLink> |{' '}
        <NavLink to="feedback">View Feedback</NavLink>
      </nav>

      <Routes>
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="feedback" element={<FeedbackManagement />} />
        <Route path="*" element={<p>Select a section to manage</p>} />
      </Routes>
    </div>
  );
}