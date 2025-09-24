import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // 1. Import axios for making API requests

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  // This part is already correct and efficient
  const { subtotal, shipping, tax, total } = useMemo(() => {
    const subtotalCalc = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.qty || 1),
      0
    );
    const shippingCalc = subtotalCalc >= 4999 || subtotalCalc === 0 ? 0 : 99;
    const taxCalc = Math.round(subtotalCalc * 0.18);
    const totalCalc = subtotalCalc + shippingCalc + taxCalc;
    return { subtotal: subtotalCalc, shipping: shippingCalc, tax: taxCalc, total: totalCalc };
  }, [cartItems]);

  // 2. Updated handler to be async and send data to the backend
  const placeOrderHandler = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Send the cart items and total price to your new backend endpoint
      const { data: createdOrder } = await axios.post("/api/orders", {
        orderItems: cartItems,
        totalPrice: total,
      });

      // Clear the cart from Redux and local storage
      dispatch(clearCart());

      // 3. Redirect to the new order success/invoice page
      navigate(`/order-success/${createdOrder.orderId}`);

    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-page">
      <h2 className="section-title">Checkout</h2>

      {cartItems.length === 0 ? (
        <div className="checkout-empty">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn-gradient">Continue Shopping</Link>
        </div>
      ) : (
        <div className="checkout-grid">
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div className="checkout-item" key={item.product}>
                <img
                  src={item.imageUrls?.[0] || "https://via.placeholder.com/80"}
                  alt={item.name}
                  className="checkout-item__image"
                />
                <div className="checkout-item__details">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.qty}</p>
                  <p>₹{Number(item.price).toLocaleString("en-IN")}</p>
                </div>
              </div>
            ))}
          </div>

          <aside className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}</span>
            </div>
            <div className="summary-row">
              <span>Tax (18%)</span>
              <span>₹{tax.toLocaleString("en-IN")}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
            <button onClick={placeOrderHandler} className="btn-buy-now">
              Place Order
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}