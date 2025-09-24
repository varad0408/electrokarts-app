import React from 'react';
import Carousel from '../components/Carousel';
import ProductList from '../components/Products/ProductList';

const carouselSlides = [
    { image: '/images/iphone-air.jpg', title: 'iPhone Air', link: '/product/apple-iphone-16-air-256gb' },
    { image: '/images/Apple-Mac.jpg', title: 'MacBooks', link: '/product/apple-macbook-air-13-m4' },
    { image: '/images/Bose-banner.jpg', title: 'Bose SoundLink Flex', link: '/product/bose-soundlink-flex-portable' },
    { image: '/images/galaxy-s25.jpg', title: 'Galaxy S25', link: '/product/samsung-galaxy-s25-256gb' }
];

function HomePage() {
  return (
    <div>
      <Carousel slides={carouselSlides} />
      <ProductList />
    </div>
  );
}

export default HomePage;