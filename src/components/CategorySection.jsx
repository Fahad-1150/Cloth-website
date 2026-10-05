/**
 * ============================================================================
 * BinAsor ATELIER - Category SECTION
 * ============================================================================
 * High-aesthetic category directory grid featuring Women, Men, Bags,
 * Shoes, and Accessories with item tallies and instant filter routing.
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';
import './CategorySection.css';

export const CategorySection = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const { categories, navigateToCategory, setActivePage, setSelectedCategoryFilter } = useStore();

  /* View entire catalog handler */
  const handleViewAll = () => {
    setSelectedCategoryFilter(null);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ==========================================================================
     RENDER CATEGORY SECTION
     ========================================================================== */
  return (
    <section className="category-section-wrap">
      {/* Header: Title Left, View All Right */}
      <div className="category-header-row">
        <h2 className="category-main-heading">Category</h2>
        <button
          type="button"
          onClick={handleViewAll}
          className="category-viewall-btn"
        >
          <span>View all</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Grid of Category Cards */}
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigateToCategory(cat.name)}
            className="category-card"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigateToCategory(cat.name);
              }
            }}
          >
            {/* Visual Box */}
            <div className="category-media-box">
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="category-card-img"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div style={{ fontSize: '0.75rem', color: '#a3a3a3' }}>{cat.name}</div>
              )}
            </div>

            {/* Label & Item Tally */}
            <h3 className="category-card-name">{cat.name}</h3>
            <span className="category-card-count">{cat.itemCount} Items</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
