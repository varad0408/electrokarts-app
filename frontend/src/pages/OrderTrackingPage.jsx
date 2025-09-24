import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function OrderTrackingPage() {
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
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Loading Order Status...</p>;
  if (error) return <p className="error" style={{ textAlign: 'center' }}>{error}</p>;
  if (!order) return <p style={{ color: 'white', textAlign: 'center' }}>Order not found.</p>;

  const formatDate = (dateString) => new Date(dateString).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  const allStatuses = ['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const completedStatuses = order.statusTimeline.map(s => s.status);

  return (
    <div className="tracking-container">
      <div className="tracking-header">
        <h1>Track Your Order</h1>
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="timeline">
        {allStatuses.map((status, index) => {
          const statusDetail = order.statusTimeline.find(s => s.status === status);
          const isCompleted = completedStatuses.includes(status);
          
          return (
            <div key={index} className={`timeline-item ${isCompleted ? 'completed' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h4 className="status-title">{status}</h4>
                {statusDetail && (
                  <p className="status-date">{formatDate(statusDetail.date)}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="tracking-actions">
        {order.isDelivered ? (
          <Link to={`/feedback/${order.orderId}`} className="btn-gradient">Leave Feedback</Link>
        ) : (
          <p>We'll notify you once your order is delivered.</p>
        )}
        <Link to="/" className="btn-secondary">Back to Home</Link>
      </div>
    </div>
  );
}

export default OrderTrackingPage;