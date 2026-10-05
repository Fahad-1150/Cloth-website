/**
 * ============================================================================
 * BinAsor ATELIER - HERO EDITORIAL CAROUSEL
 * ============================================================================
 * Premium high-impact banner presenting rotating seasonal campaigns,
 * bespoke tailoring highlights, and luxury leather showcases with auto-play.
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/Button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
const heroModelImg = '/assets/images/hero_fashion_model_1791180041478.jpg';
const catWomenImg = '/assets/images/cat_women_fashion_1791180101627.jpg';
const catBagImg = '/assets/images/cat_leather_bag_1791180122206.jpg';
import './HeroCarousel.css';

export const HeroCarousel = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const { setActivePage, setSelectedCategoryFilter } = useStore();

  /* ==========================================================================
     CAROUSEL SLIDES CONFIGURATION
     ========================================================================== */
  const slides = [
    {
      badge: 'NEW COLLECTION 2026',
      title: 'Elevate Your\nStyle. Effortlessly.',
      subtitle: 'Discover premium fashion made for you.',
      buttonText: 'SHOP NOW',
      image: heroModelImg,
      categoryLink: 'Women',
    },
    {
      badge: 'SEASONAL EDIT',
      title: 'Timeless Silhouettes.\nModern Craft.',
      subtitle: 'Precision-cut tailoring for the contemporary wardrobe.',
      buttonText: 'EXPLORE EDIT',
      image: catWomenImg,
      categoryLink: 'Women',
    },
    {
      badge: 'ITALIAN LEATHER',
      title: 'Bespoke Bags &\nFine Accessories.',
      subtitle: 'Handmade full-grain leather goods finished with custom brass.',
      buttonText: 'VIEW BAGS',
      image: catBagImg,
      categoryLink: 'Bags',
    },
  ];

  /* Active slide index */
  const [currentSlide, setCurrentSlide] = useState(0);

  /* Auto-slide timer (6 seconds) */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  /* Step controls */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCta = (slide) => {
    if (slide.categoryLink) {
      setSelectedCategoryFilter(slide.categoryLink);
    }
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const active = slides[currentSlide];

  /* ==========================================================================
     RENDER HERO CAROUSEL
     ========================================================================== */
  return (
    <section className="hero-carousel-section">
      <div className="hero-carousel-container">
        {/* Main Grid: Left Headline, Right Editorial Viewport */}
        <div className="hero-carousel-grid">
          <div className="hero-copy-col">
            <div className="hero-tag-wrap">
              <span className="hero-tag">{active.badge}</span>
            </div>

            <h1 className="hero-headline">{active.title}</h1>

            <p className="hero-subtitle">{active.subtitle}</p>

            <div>
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleCta(active)}
                icon={<ArrowRight size={16} />}
                iconPosition="right"
              >
                {active.buttonText}
              </Button>
            </div>
          </div>

          <div className="hero-image-col">
            <div className="hero-image-box">
              {active.image ? (
                <img
                  src={active.image}
                  alt="BinAsor Fashion Editorial"
                  className="hero-img"
                  referrerPolicy="no-referrer"
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Carousel Slide Indicators & Directional Controls */}
        <div className="hero-controls-bar">
          <div className="hero-dots-row">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`hero-dot-btn ${currentSlide === idx ? 'active' : ''}`}
              />
            ))}
          </div>

          <div className="hero-arrow-btns">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="hero-arrow-btn"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next Slide"
              className="hero-arrow-btn"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
