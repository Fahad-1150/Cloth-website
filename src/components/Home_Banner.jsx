/**
 * ============================================================================
 * BinAsor ATELIER - SUMMER PROMOTIONAL HERO BANNER
 * ============================================================================
 * High-conversion promotion block featuring fixed campaign messaging
 * paired with an auto-sliding editorial carousel with cross-fade transitions.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/Button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const summerSaleImg1 = '/assets/images/summer_sale_banner_1791180091588.jpg';
const summerSaleImg2 = '/assets/images/summer_resort_linen_1791181012178.jpg';
const summerSaleImg3 = '/assets/images/hero_fashion_model_1791180041478.jpg';
const summerSaleImg4 = '/assets/images/cat_men_fashion_1791180111441.jpg';
import './Home_Banner.css';

export const Home_Banner = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const { setActivePage, setSelectedCategoryFilter } = useStore();

  /* ==========================================================================
     LOCAL COMPONENT STATE & TIMERS
     ========================================================================== */
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const sliderImages = [
    { src: summerSaleImg1, alt: 'Summer Casual Menswear & Linen' },
    { src: summerSaleImg2, alt: 'Breezy Linen Resort Wear' },
    { src: summerSaleImg3, alt: 'Tailored Minimalist Silhouettes' },
    { src: summerSaleImg4, alt: 'Contemporary Layering & Essentials' },
  ];

  /* Auto-slide effect (3.8 seconds) */
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
    }, 3800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, sliderImages.length]);

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % sliderImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleShopSale = () => {
    setSelectedCategoryFilter(null);
    setActivePage('sale');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ==========================================================================
     RENDER SUMMER SALE BANNER
     ========================================================================== */
  return (
    <section className="Banner_card_wrap ">
      <div className="Banner_card">
        {/* Left Column: Fixed Promotional Message */}
        <div className="summer-sale-copy">
          <span className="summer-sale-tag">Summer Sale</span>

          <h2 className="summer-sale-heading">Up to 50% Off</h2>


          <div>
            <Button
              variant="primary"
              size="md"
              onClick={handleShopSale}
              icon={<ArrowRight size={14} />}
              iconPosition="right"
            >
              Shop
            </Button>
          </div>
        </div>

        {/* Right Column: Auto-sliding Slideshow */}
        <div
          className="summer-sale-image-col"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {sliderImages.map((img, idx) => (
            <div
              key={idx}
              className={`summer-sale-slide ${idx === currentImageIndex ? 'active' : 'inactive'
                }`}
            >
              {img.src && (
                <img
                  src={img.src}
                  alt={img.alt}
                  className="summer-sale-slide-img"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          ))}

          {/* Left edge soft gradient */}
          <div className="summer-sale-gradient-fade" />

          {/* Controls: Arrows on hover */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="summer-sale-arrow left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Slide"
            className="summer-sale-arrow right"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dots Indicator */}
          <div className="summer-sale-dots">
            {sliderImages.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentImageIndex(dotIdx)}
                aria-label={`Slide ${dotIdx + 1}`}
                className={`summer-sale-dot ${currentImageIndex === dotIdx ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home_Banner;
