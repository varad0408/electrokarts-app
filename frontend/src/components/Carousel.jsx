import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import './Carousel.css';

function Carousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!slides || slides.length === 0) return null;

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    setCurrentIndex(isFirstSlide ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
  };

  const currentSlide = slides[currentIndex];

  return (
    <div className="carousel">
      <div className="carousel__arrow carousel__arrow--left" onClick={goToPrevious}>
        <BsChevronLeft />
      </div>
      <div className="carousel__arrow carousel__arrow--right" onClick={goToNext}>
        <BsChevronRight />
      </div>

      <div className="carousel__slide">
        <img src={currentSlide.image} alt={currentSlide.title} className="carousel__image" />
        <div className="carousel__content">
          <h2 className="carousel__title">{currentSlide.title}</h2>
          <p className="carousel__subtitle">{currentSlide.subtitle}</p>

          {/* Use provided link when available; otherwise fall back to slug or id */}
          <Link
            to={currentSlide.link ?? `/product/${currentSlide.slug ?? currentSlide.id}`}
            className="carousel__button"
          >
            Pre-order Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
