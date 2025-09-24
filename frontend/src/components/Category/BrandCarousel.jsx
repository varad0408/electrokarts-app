import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// The component now manages its own static content
const brandBanners = [
  {
    image: '/images/mobile-brand.jpg',
    link: '/category/mobiles' // You can change this link later if needed
  },
  {
    image: '/images/mobile-brand2.jpg',
    link: '/category/mobiles'
  }
];

function BrandCarousel() {
  const carouselRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="brand-carousel-wrapper">
      <button className="carousel-arrow-button" onClick={() => scroll(-400)} aria-label="Scroll Left">
        <BsChevronLeft />
      </button>

      <div className="brand-carousel" ref={carouselRef}>
        {brandBanners.map((banner, index) => (
          <Link to={banner.link} key={index} className="brand-banner-link">
            <img src={banner.image} alt={`Mobile Brands ${index + 1}`} />
          </Link>
        ))}
      </div>

      <button className="carousel-arrow-button" onClick={() => scroll(400)} aria-label="Scroll Right">
        <BsChevronRight />
      </button>
    </div>
  );
}

export default BrandCarousel;