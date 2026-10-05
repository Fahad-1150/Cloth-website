/**
 * ============================================================================
 * BinAsor ATELIER - SHOP & CATALOG PAGE
 * ============================================================================
 * Comprehensive catalog browsing interface with multi-faceted filtering:
 * category taxonomies, dynamic price boundaries, stock availability,
 * editorial badges, and sorting controls.
 */

import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Filter, SlidersHorizontal, RotateCcw, PackageSearch } from 'lucide-react';
import './ShopPage.css';

export const ShopPage = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const {
    products,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
  } = useStore();

  /* ==========================================================================
     LOCAL FILTER & SORT STATE
     ========================================================================== */
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(300);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  /* Compute dynamic bounds based on products in catalog */
  const prices = products.map((p) => p.price);
  const minAvailablePrice = Math.floor(Math.min(...prices, 0));
  const maxAvailablePrice = Math.ceil(Math.max(...prices, 300));

  /* ==========================================================================
     FILTER & SORT COMPUTATION
     ========================================================================== */
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category taxonomy filter
        if (
          selectedCategoryFilter &&
          selectedCategoryFilter !== 'All' &&
          p.category.toLowerCase() !== selectedCategoryFilter.toLowerCase() &&
          p.department.toLowerCase() !== selectedCategoryFilter.toLowerCase()
        ) {
          return false;
        }

        // Upper price ceiling filter
        if (p.price > maxPrice) return false;

        // In-stock availability toggle
        if (onlyInStock && !p.inStock) return false;

        // Promotional badge filter
        if (selectedBadge && p.badge !== selectedBadge) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: featured pieces elevated first
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategoryFilter, maxPrice, onlyInStock, selectedBadge, sortBy]);

  /* ==========================================================================
     FILTER ACTIONS
     ========================================================================== */
  const resetFilters = () => {
    setSelectedCategoryFilter(null);
    setMaxPrice(maxAvailablePrice);
    setOnlyInStock(false);
    setSelectedBadge(null);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategoryFilter !== null ||
    maxPrice < maxAvailablePrice ||
    onlyInStock ||
    selectedBadge !== null;

  /* ==========================================================================
     RENDER SHOP PAGE
     ========================================================================== */
  return (
    <div className="shop-page-wrapper">
      <div className="shop-container">
        {/* ==================================================================
            HEADER: TITLE & TOOLBAR
            ================================================================== */}
        <div className="shop-header">


          {/* Desktop & Mobile Toolbar Controls */}
          <div className="shop-toolbar">
            <div className="shop-sort-group">
              <span className="shop-sort-label">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="shop-sort-select"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="shop-mobile-filter-btn"
              aria-label="Toggle Mobile Filter Sheet"
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* ==================================================================
            MAIN CONTENT LAYOUT: SIDEBAR FILTERS + PRODUCTS GRID
            ================================================================== */}
        <div className="shop-layout">
          {/* ----------------------------------------------------------------
             Sidebar Filters
             ---------------------------------------------------------------- */}
          <aside className={`shop-sidebar ${isMobileFiltersOpen ? '' : 'shop-sidebar-hidden'}`}>
            {/* Header & Reset Action */}
            <div className="shop-sidebar-header">
              <span className="shop-sidebar-title">
                <Filter size={14} /> Filters
              </span>
              {hasActiveFilters && (
                <button onClick={resetFilters} className="shop-reset-btn">
                  <RotateCcw size={12} /> Reset
                </button>
              )}
            </div>

            {/* Category Directory */}
            <div className="shop-filter-group">
              <h3 className="shop-filter-heading">Category</h3>
              <div className="shop-category-list">
                <button
                  onClick={() => setSelectedCategoryFilter(null)}
                  className={`shop-category-btn ${selectedCategoryFilter === null ? 'active' : ''}`}
                >
                  <span>All Products</span>
                  <span className="shop-category-count">{products.length}</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.name)}
                    className={`shop-category-btn ${selectedCategoryFilter === cat.name ? 'active' : ''}`}
                  >
                    <span>{cat.name}</span>
                    <span className="shop-category-count">
                      {products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="shop-price-slider-wrap">
              <div className="shop-price-header">
                <h3 className="shop-filter-heading" style={{ marginBottom: 0 }}>Max Price</h3>
                <span className="shop-price-val">৳{maxPrice}</span>
              </div>
              <input
                type="range"
                min={minAvailablePrice}
                max={maxAvailablePrice}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="shop-range-input"
              />
              <div className="shop-range-labels">
                <span>৳{minAvailablePrice}</span>
                <span>৳{maxAvailablePrice}</span>
              </div>
            </div>

            {/* Special Offers & Badges */}
            <div className="shop-badge-group">
              <h3 className="shop-filter-heading">Special Offers</h3>
              <div className="shop-badge-pills">
                {['New', 'Sale', 'Hot'].map((badge) => (
                  <button
                    key={badge}
                    onClick={() => setSelectedBadge(selectedBadge === badge ? null : badge)}
                    className={`shop-badge-pill ${selectedBadge === badge ? 'active' : ''}`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Filter Toggle */}
            <div className="shop-instock-toggle">
              <span className="shop-filter-heading" style={{ marginBottom: 0 }}>In Stock Only</span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="shop-checkbox"
              />
            </div>
          </aside>

          {/* ----------------------------------------------------------------
             Product Results Main Area
             ---------------------------------------------------------------- */}
          <main className="shop-main-content">
            <div className="shop-results-status">
              <span>Showing {filteredProducts.length} items</span>
              {selectedCategoryFilter && (
                <span className="shop-active-filter-badge">
                  Filtered by: {selectedCategoryFilter}
                </span>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <EmptyState
                icon={<PackageSearch size={28} />}
                title="No matching garments found"
                description="We could not find any items matching your selected criteria. Try adjusting the price ceiling or clearing filters."
                action={
                  <Button variant="primary" size="md" onClick={resetFilters}>
                    Clear All Filters
                  </Button>
                }
              />
            ) : (
              <div className="shop-products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
