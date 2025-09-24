import React from 'react';
import { Link } from 'react-router-dom';

function HeroBanner() {
  return (
    <div className="hero-banner">
      <img src="/images/hero-banner.jpg" alt="Featured Product Banner" />
      <div className="hero-banner__content">
        <h2>iPhone Air</h2>
        <p>Starting at ₹1,15,900*</p>
        <Link to="/product/apple-iphone-16-air-256gb" className="btn-gradient">Pre-order Now</Link>
      </div>
    </div>
  );
}

export default HeroBanner;