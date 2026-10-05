/**
 * ============================================================================
 * BinAsor ATELIER - QUICK VIEW MODAL OVERLAY
 * ============================================================================
 * Fast preview modal allowing shoppers to view garment imagery, choose sizes,
 * pick hues, and add directly to bag without losing catalog position.
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/Button';
import { RatingStars } from './ui/RatingStars';
import { QuantitySelector } from './ui/QuantitySelector';
import { X, ArrowRight, Check } from 'lucide-react';
import './QuickViewModal.css';

export const QuickViewModal = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    navigateToProduct,
  } = useStore();

  /* ==========================================================================
     LOCAL ATTRIBUTE SELECTION STATE
     ========================================================================== */
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || 'Standard');
      setSelectedColor(quickViewProduct.colors[0]?.name || 'Standard');
      setQuantity(1);
      setActiveImage(quickViewProduct.image || '');
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const currentImage = activeImage || quickViewProduct.image || '';

  /* Actions */
  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setQuickViewProduct(null);
  };

  const handleGoToDetails = () => {
    const id = quickViewProduct.id;
    setQuickViewProduct(null);
    navigateToProduct(id);
  };

  /* ==========================================================================
     RENDER QUICK VIEW MODAL
     ========================================================================== */
  return (
    <div className="quickview-overlay">
      <div
        className="quickview-backdrop"
        onClick={() => setQuickViewProduct(null)}
      />

      <div className="quickview-dialog-wrap">
        <div className="quickview-card">
          <button
            type="button"
            onClick={() => setQuickViewProduct(null)}
            className="quickview-close-btn"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Left Column: Image Display */}
          <div className="quickview-media-col">
            <div className="quickview-image-box">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={quickViewProduct.name}
                  referrerPolicy="no-referrer"
                />
              ) : null}
            </div>
          </div>

          {/* Right Column: Garment Specs & Purchase Action */}
          <div className="quickview-details-col">
            <div>
              <div className="quickview-eyebrow">
                {quickViewProduct.category} · {quickViewProduct.department}
              </div>
              <h2 className="quickview-title">{quickViewProduct.name}</h2>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0a0a0a' }}>
                  ৳{quickViewProduct.price.toFixed(2)}
                </span>
                <RatingStars
                  rating={quickViewProduct.rating}
                  reviewCount={quickViewProduct.reviewCount}
                />
              </div>
            </div>

            <p className="quickview-desc">{quickViewProduct.description}</p>

            {/* Sizes */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div>
                <span style={{ fontSize: '0.6875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.375rem' }}>
                  Select Size
                </span>
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '0.375rem 0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        border: '1px solid',
                        borderColor: selectedSize === s ? '#0a0a0a' : '#e5e5e5',
                        backgroundColor: selectedSize === s ? '#0a0a0a' : '#ffffff',
                        color: selectedSize === s ? '#ffffff' : '#171717',
                        borderRadius: '2px',
                        cursor: 'pointer',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add Button */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                min={1}
                max={quickViewProduct.stockCount || 10}
              />

              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleAddToCart}
                disabled={!quickViewProduct.inStock}
              >
                Add to Bag · ৳{(quickViewProduct.price * quantity).toFixed(2)}
              </Button>
            </div>

            <button
              type="button"
              onClick={handleGoToDetails}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '0.75rem',
                color: '#525252',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                cursor: 'pointer',
                marginTop: '0.25rem',
              }}
            >
              <span>View Full Garment Dossier</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
