/**
 * ============================================================================
 * BinAsor ATELIER - REUSABLE RATING STARS COMPONENT
 * ============================================================================
 * Renders 5-star rating visualization with numeric score and review tally.
 */

import React from 'react';
import { Star } from 'lucide-react';
import './RatingStars.css';

/**
 * @param {Object} props
 * @param {number} props.rating - e.g. 4.8
 * @param {number} [props.reviewCount] - e.g. 42
 * @param {boolean} [props.showText=true]
 * @param {number} [props.starSize=14]
 * @param {string} [props.className='']
 */
export const RatingStars = ({
  rating = 5,
  reviewCount,
  showText = true,
  starSize = 14,
  className = '',
}) => {
  /* ==========================================================================
     STAR CALCULATION (0 - 5)
     ========================================================================== */
  const roundedRating = Math.round(rating);

  /* ==========================================================================
     RENDER STARS & SCORE
     ========================================================================== */
  return (
    <div className={`rating-container ${className}`.trim()}>
      <div className="rating-stars-row" aria-label={`Rated ${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((index) => {
          const isFilled = index <= roundedRating;
          return (
            <Star
              key={index}
              size={starSize}
              className={isFilled ? 'rating-star-filled' : 'rating-star-empty'}
            />
          );
        })}
      </div>

      {showText && (
        <>
          <span className="rating-score">{Number(rating).toFixed(1)}</span>
          {typeof reviewCount === 'number' && (
            <span className="rating-reviews">({reviewCount})</span>
          )}
        </>
      )}
    </div>
  );
};

export default RatingStars;
