/**
 * ============================================================================
 * BinAsor ATELIER - FEATURED APPAREL & GOODS SECTION
 * ============================================================================
 * Homepage product showcase spotlighting the top-rated handcrafted pieces
 * with 1-click cart addition and quick detail routing.
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';
import './FeaturedProducts.css';

export const FeaturedProducts = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const { products, setActivePage, setSelectedCategoryFilter } = useStore();

  /* Select featured items or default to first 5 products */
  const featured = products.filter((p) => p.isFeatured).slice(0, 5);
  const displayProducts = featured.length >= 5 ? featured : products.slice(0, 5);

  const handleViewAll = () => {
    setSelectedCategoryFilter(null);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ==========================================================================
     RENDER FEATURED PRODUCTS
     ========================================================================== */
  return (
    <section className="featured-products-wrap">
      {/* Header: Title Left, View All Right */}
      <div className="featured-products-header">
        <h2 className="featured-products-heading">Featured Products</h2>
        <button
          type="button"
          onClick={handleViewAll}
          className="featured-products-viewall"
        >
          <span>View all</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Grid of 5 Product Cards */}
      <div className="featured-products-grid">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
