import React from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  // This component is ONLY for displaying the static sections on the homepage.
  // The logic for fetching and displaying category products is in CategoryPage.jsx.
  return (
    <>
      <div className="main-content-container">
        <h2 className="section-title">Latest Launches</h2>
        <div className="image-map-container">
          <img 
            src="/images/latest-launch.jpg" 
            alt="Latest Launches" 
            className="content-section-image"
          />
          <Link to="/product/airpods-pro-3" className="hotspot" style={{ left: '0%', top: '0%', width: '25%', height: '100%' }} aria-label="AirPods Pro 3"></Link>
          <Link to="/product/watch-ultra-3" className="hotspot" style={{ left: '25%', top: '0%', width: '25%', height: '100%' }} aria-label="Watch Ultra 3"></Link>
          <Link to="/product/watch-series-11" className="hotspot" style={{ left: '50%', top: '0%', width: '25%', height: '100%' }} aria-label="Watch Series 11"></Link>
          <Link to="/product/watch-se-3" className="hotspot" style={{ left: '75%', top: '0%', width: '25%', height: '100%' }} aria-label="Watch SE 3"></Link>
        </div>
      </div>

      <div className="main-content-container">
        <h2 className="section-title">What's Hot</h2>
        <div className="image-map-container">
          <img 
            src="/images/whats-hot.jpg" 
            alt="What's Hot" 
            className="content-section-image"
          />
          <Link to="/product/oneplus-13s-5g" className="hotspot" style={{ left: '0%', top: '0%', width: '25%', height: '100%' }} aria-label="OnePlus 13s 5G"></Link>
          <Link to="/product/croma-75-inch-qled-tv" className="hotspot" style={{ left: '25%', top: '0%', width: '25%', height: '100%' }} aria-label="Croma 75 inch TV"></Link>
          <Link to="/product/sony-playstation-5-slim" className="hotspot" style={{ left: '50%', top: '0%', width: '25%', height: '100%' }} aria-label="SONY PlayStation 5 Slim"></Link>
          <Link to="/product/croma-236l-refrigerator" className="hotspot" style={{ left: '75%', top: '0%', width: '25%', height: '100%' }} aria-label="Croma Refrigerator"></Link>
        </div>
      </div>
    </>
  );
}

export default ProductList;