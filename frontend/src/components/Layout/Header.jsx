import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          Electrokart
        </Link>

        <div className="search-bar">
          <input type="text" placeholder="What are you looking for?" />
        </div>

        <nav className="header-nav">
          <Link to="/cart">
            {/* We'll replace this text with an icon later */}
            <span>🛒</span> 
            Cart ({cartItemCount})
          </Link>
          {isLoggedIn ? (
            <Link to="/profile">
              <span>👤</span>
              Profile
            </Link>
          ) : (
            <Link to="/login">
              <span>👤</span>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;