/**
 * ============================================================================
 * BinAsor ATELIER - PRODUCT DETAIL PAGE
 * ============================================================================
 * High-touch luxury product showcase featuring multi-angle high-res galleries,
 * bespoke size & color selectors, stock level monitoring, garment care tabs,
 * and related wardrobe recommendations.
 */

import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { RatingStars } from '../components/ui/RatingStars';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import {
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Check,
  ArrowLeft,
  X,
  ShoppingBag,
} from 'lucide-react';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setActivePage,
  } = useStore();

  /* Identify active product or fallback to first catalog entry */
  const product = products.find((p) => p.id === selectedProductId) || products[0];

  /* ==========================================================================
     LOCAL COMPONENT STATE
     ========================================================================== */
  const [activeImage, setActiveImage] = useState(() => product?.image || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  /* Synchronize attributes whenever active product changes */
  useEffect(() => {
    if (product) {
      setActiveImage(product.image || '');
      setSelectedSize(product.sizes[0] || 'Standard');
      setSelectedColor(product.colors[0]?.name || 'Standard');
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pdp-wrapper" style={{ textAlign: 'center', paddingTop: '6rem' }}>
        <p style={{ color: '#737373' }}>Product not found.</p>
        <Button variant="primary" onClick={() => setActivePage('shop')} style={{ marginTop: '1rem' }}>
          Return to Shop
        </Button>
      </div>
    );
  }

  /* Image array unification */
  const currentDisplayImage = activeImage || product.image || '';
  const galleryImages = [product.image, ...(product.gallery || [])].filter(
    (v, i, a) => Boolean(v) && a.indexOf(v) === i
  );

  /* Related recommendations in matching taxonomy */
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.department === product.department))
    .slice(0, 4);

  /* Wishlist state check */
  const wishlisted = isWishlisted(product.id);

  /* Add to shopping bag handler */
  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  /* ==========================================================================
     RENDER PRODUCT DETAIL
     ========================================================================== */
  return (
    <div className="pdp-wrapper">
      <div className="pdp-container">
        {/* ==================================================================
            BREADCRUMB & BACK ACTION
            ================================================================== */}
        <Breadcrumb
          items={[
            { label: 'Home', onClick: () => setActivePage('home') },
            { label: 'Shop', onClick: () => setActivePage('shop') },
            { label: product.category, onClick: () => setActivePage('shop') },
            { label: product.name },
          ]}
        />

        <button
          onClick={() => setActivePage('shop')}
          className="pdp-back-btn"
          aria-label="Back to Collection"
        >
          <ArrowLeft size={14} />
          <span>Back to Collection</span>
        </button>

        {/* ==================================================================
            MAIN TWO-COLUMN PRODUCT GRID
            ================================================================== */}
        <div className="pdp-grid">
          {/* ----------------------------------------------------------------
             Left Column: Multi-Angle Gallery
             ---------------------------------------------------------------- */}
          <div className="pdp-gallery-wrap">
            {galleryImages.length > 1 && (
              <div className="pdp-thumbnails-list">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`pdp-thumb-btn ${activeImage === img ? 'active' : ''}`}
                    aria-label={`View product image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="pdp-thumb-img"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="pdp-main-stage">
              {product.badge && (
                <div className="pdp-badge-floating">
                  <Badge variant={product.badge.toLowerCase()}>
                    {product.badge}
                  </Badge>
                </div>
              )}

              {currentDisplayImage ? (
                <img
                  src={currentDisplayImage}
                  alt={product.name}
                  className="pdp-stage-img"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#a3a3a3', fontSize: '0.75rem' }}>
                  No preview available
                </div>
              )}
            </div>
          </div>

          {/* ----------------------------------------------------------------
             Right Column: Purchase Module & Specifications
             ---------------------------------------------------------------- */}
          <div className="pdp-purchase-module">
            <div>
              {/* Category & Live Stock */}
              <div className="pdp-meta-row">
                <span>{product.category} · {product.department}</span>
                {product.inStock ? (
                  <span className="pdp-stock-status in-stock">
                    <span className="pdp-stock-dot" />
                    In Stock ({product.stockCount} available)
                  </span>
                ) : (
                  <span className="pdp-stock-status out-of-stock">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Garment Title */}
              <h1 className="pdp-title">{product.name}</h1>

              {/* Pricing & Ratings */}
              <div className="pdp-price-row">
                <div className="pdp-price-group">
                  <span className="pdp-current-price">
                    ৳{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="pdp-original-price">
                      ৳{product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <RatingStars
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                />
              </div>
            </div>

            {/* Editorial Description */}
            <p className="pdp-description">{product.description}</p>

            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '1rem' }}>
                <div className="pdp-section-header">
                  <span className="pdp-section-label">
                    Color: <span style={{ fontWeight: 400, color: '#525252' }}>{selectedColor}</span>
                  </span>
                </div>
                <div className="pdp-colors-row">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`pdp-color-circle ${selectedColor === c.name ? 'active' : ''}`}
                      title={c.name}
                      type="button"
                    >
                      <span
                        className="pdp-color-swatch"
                        style={{ backgroundColor: c.hex }}
                      >
                        {selectedColor === c.name && (
                          <Check size={12} color="#ffffff" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }} />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizing Grid with Modal Guide */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '1rem' }}>
                <div className="pdp-section-header">
                  <span className="pdp-section-label">Select Size</span>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    type="button"
                    style={{ background: 'none', border: 'none', color: '#525252', fontSize: '0.75rem', textDecoration: 'underline', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Ruler size={12} />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="pdp-sizes-grid">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`pdp-size-btn ${selectedSize === s ? 'active' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Primary Action */}
            <div className="pdp-actions-row">
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                min={1}
                max={product.stockCount || 10}
              />

              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={<ShoppingBag size={16} />}
                iconPosition="left"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Bag · ৳{(product.price * quantity).toFixed(2)}
              </Button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`pdp-wishlist-toggle ${wishlisted ? 'active' : ''}`}
                aria-label="Save to Wishlist"
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Service & Delivery Assurances */}
            <div className="pdp-trust-grid">
              <div className="pdp-trust-item">
                <Truck size={14} color="#171717" />
                <span>Free shipping over ৳99</span>
              </div>
              <div className="pdp-trust-item">
                <RotateCcw size={14} color="#171717" />
                <span>30-Day returns</span>
              </div>
              <div className="pdp-trust-item">
                <ShieldCheck size={14} color="#171717" />
                <span>Authenticity certified</span>
              </div>
            </div>

            {/* Specifications, Shipping & Garment Care Tabs */}
            <div className="pdp-tabs-container">
              <div className="pdp-tabs-nav">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`pdp-tab-trigger ${activeTab === 'details' ? 'active' : ''}`}
                >
                  Specifications
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('shipping')}
                  className={`pdp-tab-trigger ${activeTab === 'shipping' ? 'active' : ''}`}
                >
                  Shipping & Customs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('care')}
                  className={`pdp-tab-trigger ${activeTab === 'care' ? 'active' : ''}`}
                >
                  Garment Care
                </button>
              </div>

              <div className="pdp-tab-body">
                {activeTab === 'details' && (
                  <ul className="pdp-specs-list">
                    {product.details?.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                )}

                {activeTab === 'shipping' && (
                  <p>
                    Complimentary express dispatch on all orders exceeding ৳99. International duties
                    and tariffs are pre-calculated and cleared at checkout with DHL Express worldwide delivery.
                  </p>
                )}

                {activeTab === 'care' && (
                  <p>
                    Specialist dry clean or delicate hand wash cold using plant-based detergent.
                    Lay flat on cotton towel away from direct heat to preserve raw drape and natural luster.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================================
            SIZE GUIDE MODAL
            ================================================================== */}
        {sizeGuideOpen && (
          <div className="pdp-modal-overlay" onClick={() => setSizeGuideOpen(false)}>
            <div className="pdp-modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="pdp-modal-close"
                onClick={() => setSizeGuideOpen(false)}
              >
                <X size={20} />
              </button>

              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, marginBottom: '0.5rem' }}>
                Standard Sizing Matrix
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#737373', marginBottom: '1.5rem' }}>
                Measurements shown in inches. All silhouettes are tailored for an intentional relaxed silhouette.
              </p>

              <table style={{ width: '100%', fontSize: '0.75rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                    <th style={{ padding: '0.5rem 0' }}>Size</th>
                    <th style={{ padding: '0.5rem 0' }}>Chest / Bust</th>
                    <th style={{ padding: '0.5rem 0' }}>Waist</th>
                    <th style={{ padding: '0.5rem 0' }}>Hips</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#525252' }}>
                  <tr style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '0.5rem 0', fontWeight: 600 }}>XS</td>
                    <td>32 - 34&quot;</td>
                    <td>25 - 26&quot;</td>
                    <td>35 - 36&quot;</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '0.5rem 0', fontWeight: 600 }}>S</td>
                    <td>35 - 36&quot;</td>
                    <td>27 - 28&quot;</td>
                    <td>37 - 38&quot;</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '0.5rem 0', fontWeight: 600 }}>M</td>
                    <td>37 - 38&quot;</td>
                    <td>29 - 30&quot;</td>
                    <td>39 - 40&quot;</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '0.5rem 0', fontWeight: 600 }}>L</td>
                    <td>39 - 41&quot;</td>
                    <td>31 - 33&quot;</td>
                    <td>41 - 43&quot;</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.5rem 0', fontWeight: 600 }}>XL</td>
                    <td>42 - 44&quot;</td>
                    <td>34 - 36&quot;</td>
                    <td>44 - 46&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================
            RELATED APPAREL RECOMMENDATIONS
            ================================================================== */}
        {relatedProducts.length > 0 && (
          <section className="pdp-related-section">
            <h2 className="pdp-related-title">Complete the Silhouette</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
