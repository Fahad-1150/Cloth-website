/**
 * ============================================================================
 * BinAsor ATELIER - PRODUCT CARD COMPONENT
 * ============================================================================
 * Essential visual building block for product displays across Home, Shop,
 * Sale, Wishlist, and Related Recommendation shelves.
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { Badge } from './ui/Badge';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import './ProductCard.css';

/**
 * @param {Object} props
 * @param {Object} props.product - Catalog product model
 */
export const ProductCard = ({ product }) => {
  if (!product) return null;

  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const {
    navigateToProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setQuickViewProduct,
  } = useStore();

  /* ==========================================================================
     EVENT HANDLERS
     ========================================================================== */
  const handleCardClick = () => {
    navigateToProduct(product.id);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultSize = (product.sizes && product.sizes[0]) || 'M';
    const defaultColor = (product.colors && product.colors[0]?.name) || 'Standard';
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const wishlisted = isWishlisted(product.id);
  const numericPrice = Number(product.price) || 0;
  const numericOriginalPrice = product.originalPrice ? Number(product.originalPrice) : null;

  /* ==========================================================================
     RENDER PRODUCT CARD
     ========================================================================== */
  return (
    <div
      onClick={handleCardClick}
      className="product-card-wrap"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
    >
      {/* --------------------------------------------------------------------
          Product Media Stage
          -------------------------------------------------------------------- */}
      <div className="product-card-media">
        {/* Editorial Status Badge */}
        {product.badge && (
          <div className="product-card-badge">
            <Badge variant={String(product.badge).toLowerCase()}>
              {product.badge}
            </Badge>
          </div>
        )}

        {/* Wishlist Heart Toggle */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`product-card-wishlist ${wishlisted ? 'active' : ''}`}
        >
          <Heart
            size={15}
            fill={wishlisted ? 'currentColor' : 'none'}
            strokeWidth={1.75}
          />
        </button>

        {/* Garment Image */}
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-card-img"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div style={{ color: '#a3a3a3', fontSize: '0.75rem' }}>No image</div>
        )}

        {/* Hover Quick View Trigger */}
        <div className="product-card-quickview-wrap">
          <button
            type="button"
            onClick={handleQuickView}
            className="product-card-quickview-btn"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------------
          Product Meta Information & Quick Purchase
          -------------------------------------------------------------------- */}
      <div className="product-card-info">
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className="product-card-name">{product.name}</h3>

          <div className="product-card-pricing">
            <span className="product-card-price">
              ৳{numericPrice.toFixed(2)}
            </span>
            {numericOriginalPrice !== null && numericOriginalPrice > numericPrice && (
              <span className="product-card-original-price">
                ৳{numericOriginalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* 1-Click Shopping Bag Add */}
        <button
          type="button"
          onClick={handleQuickAdd}
          aria-label={`Add ${product.name} to cart`}
          className="product-card-cart-btn"
          title="Quick add to bag"
        >
          <ShoppingBag size={14} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
