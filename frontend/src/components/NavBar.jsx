import React from 'react';
import { Link } from 'react-router-dom';
// Import icons for categories
import { FaMobileAlt, FaLaptop, FaHeadphonesAlt, FaCamera, FaTv, FaThermometerHalf, FaSpeaker, FaSnowflake, FaPlug } from 'react-icons/fa'; // Example icons
import { IoMdFridge } from 'react-icons/io'; // Another example

import './Navbar.css'; // Make sure you have a Navbar.css for navbar specific styles

function Navbar() {
  return (
    <nav className="navbar">
      {/* ... other navbar content like logo, search ... */}

      <div className="navbar__categories">
        <Link to="/category/mobiles" className="category-nav-item">
          <FaMobileAlt />
          <span>Mobiles</span>
        </Link>
        <Link to="/category/televisions" className="category-nav-item">
          <FaTv />
          <span>Televisions</span>
        </Link>
        <Link to="/category/laptops" className="category-nav-item">
          <FaLaptop />
          <span>Laptops</span>
        </Link>
        <Link to="/category/headphones" className="category-nav-item">
          <FaHeadphonesAlt />
          <span>Headphones</span>
        </Link>
        <Link to="/category/cameras" className="category-nav-item">
          <FaCamera />
          <span>Cameras</span>
        </Link>
        <Link to="/category/refrigerators" className="category-nav-item">
          <IoMdFridge /> {/* Using IoMdFridge for refrigerator */}
          <span>Refrigerators</span>
        </Link>
        <Link to="/category/acs" className="category-nav-item">
          <FaSnowflake /> {/* Using FaSnowflake for AC */}
          <span>ACs</span>
        </Link>
        <Link to="/category/speakers" className="category-nav-item">
          <FaSpeaker />
          <span>Speakers</span>
        </Link>
        {/* Add more categories as needed, e.g., 'Gaming Consoles' */}
        <Link to="/category/gaming-consoles" className="category-nav-item">
          <FaPlug /> {/* Placeholder icon, choose a better one if available */}
          <span>Gaming Consoles</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;