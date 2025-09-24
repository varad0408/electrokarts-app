import React, { useEffect, useState } from 'react';
import apiClient from '../../api/apiClient';
import { Link } from 'react-router-dom';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await apiClient.get('/orders');
      // ✅ Prevent unnecessary re-renders
      setOrders(prev => JSON.stringify(prev) === JSON.stringify(data) ? prev : data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h3>Order Management</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th><th>User</th><th>Total</th><th>Status</th><th>Placed At</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name}</td>
              <td>₹{order.totalPrice.toFixed(2)}</td>
              <td>{order.statusTimeline[order.statusTimeline.length - 1]?.status}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/order-tracking/${order._id}`} className="btn-small">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
