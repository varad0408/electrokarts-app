import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById, clearCurrentOrder } from '../redux/slices/orderSlice';

export default function OrderTracking() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder: order, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, id]);

  const steps = ['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const stepMeta = useMemo(() => {
    if (!order?.statusTimeline) return { currentIndex: 0, dates: {} };
    const dates = {};
    order.statusTimeline.forEach((s) => { dates[s.status] = s.date; });
    const last = order.statusTimeline[order.statusTimeline.length - 1]?.status;
    const currentIndex = Math.max(0, steps.findIndex((s) => s === last));
    return { currentIndex, dates };
  }, [order, steps]);

  if (status === 'loading') return <p style={{ textAlign: 'center' }}>Loading order details...</p>;
  if (error) return <p className="error-message" style={{ textAlign: 'center' }}>{error}</p>;
  if (!order) return <p style={{ textAlign: 'center' }}>Order not found.</p>;

  return (
    <div className="order-tracking">
      <div className="order-header">
        <h2>Order Tracking</h2>
        <p className="order-id">Order ID: <span>#{order._id}</span></p>
      </div>

      <div className="order-stepper">
        {steps.map((label, index) => {
          const completed = index <= stepMeta.currentIndex;
          return (
            <div key={label} className={`step ${completed ? 'completed' : ''}`}>
              <div className="step-marker" />
              <div className="step-label">
                <span>{label}</span>
                {stepMeta.dates[label] && (
                  <small>{new Date(stepMeta.dates[label]).toLocaleString()}</small>
                )}
              </div>
              {index < steps.length - 1 && <div className={`step-connector ${index < stepMeta.currentIndex ? 'filled' : ''}`} />}
            </div>
          );
        })}
      </div>

      <div className="order-sections">
        <section className="order-items">
          <h3>Items</h3>
          <div className="order-items-list">
            {order.orderItems.map((item, idx) => {
              const productId = item.product?._id || item.product;
              const name = item.product?.name || item.name || 'Product';
              const image = item.product?.imageUrls?.[0] || item.imageUrls?.[0];
              const quantity = item.quantity || 1;
              return (
                <div key={`${productId}-${idx}`} className="order-item">
                  <div className="order-item__image-wrap">
                    <img src={image || 'https://via.placeholder.com/64'} alt={name} className="order-item__image" />
                  </div>
                  <div className="order-item__details">
                    <div className="order-item__name">{name}</div>
                    <div className="order-item__qty">Qty: {quantity}</div>
                  </div>
                  <div className="order-item__price">₹{Number(item.price * quantity).toLocaleString('en-IN')}</div>
                </div>
              );
            })}
          </div>
        </section>

        <aside className="order-summary">
          <h3>Summary</h3>
          <div className="summary-row">
            <span>Items Total</span>
            <span>₹{Number(order.orderItems.reduce((s, i) => s + i.price * (i.quantity || 1), 0)).toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>₹{Number(order.shippingPrice || 0).toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>₹{Number(order.taxPrice || 0).toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{Number(order.totalPrice || 0).toLocaleString('en-IN')}</span>
          </div>

          <div className="shipping-address">
            <h4>Shipping Address</h4>
            <p>
              {order.shippingAddress?.address}<br/>
              {order.shippingAddress?.city} {order.shippingAddress?.postalCode}<br/>
              {order.shippingAddress?.country}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}