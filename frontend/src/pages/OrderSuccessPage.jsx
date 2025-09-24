import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function OrderSuccessPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`/api/orders/by-order-id/${orderId}`);
        setOrder(data);
      } catch (err) {
        setError('Failed to fetch order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Loading Order Details...</p>;
  if (error) return <p className="error" style={{ textAlign: 'center' }}>{error}</p>;
  if (!order) return <p style={{ color: 'white', textAlign: 'center' }}>Order not found.</p>;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
      </div>

      <div className="invoice-details">
        <h2>Order Invoice</h2>
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Order Date:</strong> {formatDate(order.createdAt)}</p>
        <p><strong>Estimated Delivery:</strong> {formatDate(order.estimatedDelivery)}</p>
      </div>

      <div className="invoice-items">
        <h3>Items Ordered</h3>
        {order.orderItems.map(item => (
          <div className="invoice-item" key={item.product}>
            <img src={item.imageUrls[0]} alt={item.name} className="invoice-item-image" />
            <div className="invoice-item-details">
              <span className="item-name">{item.name}</span>
              <span className="item-qty">Qty: {item.qty}</span>
            </div>
            <span className="item-price">₹{item.price.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>

      <div className="invoice-summary">
        <h3>Total Amount</h3>
        <p>₹{order.totalPrice.toLocaleString('en-IN')}</p>
      </div>

      <div className="invoice-actions">
        <Link to={`/track-order/${order.orderId}`} className="btn-gradient">Track Your Order</Link>
        <Link to="/" className="btn-secondary">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default OrderSuccessPage;