import React from 'react';
import { Link } from 'react-router-dom';
// 1. Import the icons we need from the library
import { BsPhone, BsLaptop, BsCamera, BsSpeaker, BsSmartwatch } from 'react-icons/bs'; // BsSmartwatch is imported but not used
import { FiMonitor, FiHardDrive } from 'react-icons/fi';
import { FaCompactDisc } from 'react-icons/fa';

// 2. Update the categories array to use the icon components
const categories = [
  { name: 'Mobiles', icon: <BsPhone /> },
  { name: 'Televisions', icon: <FiMonitor /> },
  { name: 'Laptops', icon: <BsLaptop /> },
  { name: 'Headphones', icon: <FaCompactDisc /> },
  { name: 'Cameras', icon: <BsCamera /> },
  { name: 'Refrigerators', icon: <FiHardDrive /> },
  { name: 'ACs', icon: <BsSpeaker /> }, // Using speaker as a placeholder for AC
  { name: 'Speakers', icon: <BsSpeaker /> },
];

function CategoryNav() {
  return (
    <nav className="category-nav">
      <div className="category-nav__container">
        {categories.map((category) => (
          <Link to={`/category/${category.name.toLowerCase()}`} key={category.name} className="category-nav__item">
            <div className="category-nav__icon">{category.icon}</div>
            <span className="category-nav__name">{category.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default CategoryNav;