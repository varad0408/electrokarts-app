import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Using your central API client

function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await apiClient.get('/users/my-orders');
        setOrders(data);
      } catch (err) {
        setError('Could not fetch orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Loading your orders...</p>;
  if (error) return <p className="error" style={{ textAlign: 'center' }}>{error}</p>;

  return (
    <div className="orders-container">
      <h1 className="section-title">My Orders</h1>
      {orders.length === 0 ? (
        <p style={{ color: 'white', textAlign: 'center' }}>You have not placed any orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <div>
                  <span className="order-id">ORDER #{order.orderId}</span>
                  <span className="order-date">Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="order-total">
                  <span>TOTAL</span>
                  <span>₹{order.totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="order-card-body">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="order-item">
                    <img src={item.imageUrls[0]} alt={item.name} className="order-item-image" />
                    <div className="order-item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.qty}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-card-footer">
                <span className={`order-status ${order.statusTimeline[order.statusTimeline.length - 1].status.toLowerCase().replace(' ', '-')}`}>
                  Status: {order.statusTimeline[order.statusTimeline.length - 1].status}
                </span>
                <Link to={`/track-order/${order.orderId}`} className="btn-secondary">
                  Track Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrdersPage;