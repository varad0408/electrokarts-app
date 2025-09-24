import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { cartItems = [] } = useSelector((state) => state.cart || {});

  // 🧮 Calculate totals
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

  // 🗑 Remove item
  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // 🔄 Update qty
  const updateQty = (item, qty) => {
    dispatch(
      addToCart({
        product: item.product, // this should be product.slug
        name: item.name,
        price: item.price,
        imageUrls: item.imageUrls,
        qty: Number(qty),
      })
    );
  };

  // ✅ Proceed to checkout
  const checkoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-page">
      <h2 className="section-title">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn-gradient">Continue Shopping</Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.product}>
                <Link to={`/product/${item.product}`} className="cart-item__image-wrap">
                  <img
                    src={item.imageUrls?.[0] || "https://via.placeholder.com/80"}
                    alt={item.name}
                    className="cart-item__image"
                  />
                </Link>
                <div className="cart-item__details">
                  <Link to={`/product/${item.product}`} className="cart-item__name">
                    {item.name}
                  </Link>
                  <div className="cart-item__meta">
                    <span className="cart-item__price">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </span>
                    <div className="cart-item__qty">
                      <label htmlFor={`qty-${item.product}`}>Qty</label>
                      <select
                        id={`qty-${item.product}`}
                        className="qty-select"
                        value={Number(item.qty || 1)}
                        onChange={(e) => updateQty(item, e.target.value)}
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <button className="btn-remove" onClick={() => removeHandler(item.product)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
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
            <button onClick={checkoutHandler} className="btn-buy-now">
              Proceed to Checkout
            </button>
            <button onClick={() => dispatch(clearCart())} className="btn-remove-all">
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
