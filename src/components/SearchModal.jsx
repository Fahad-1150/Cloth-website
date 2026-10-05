/**
 * ============================================================================
 * BinAsor ATELIER - GLOBAL SEARCH MODAL
 * ============================================================================
 * Instant search overlay with real-time text matching, keyword suggestions,
 * image thumbnails, and category filters.
 */

import React, { useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight } from 'lucide-react';
import './SearchModal.css';

export const SearchModal = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    products,
    navigateToProduct,
    setActivePage,
  } = useStore();

  const inputRef = useRef(null);

  /* Auto-focus search input upon opening */
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  /* Real-time keyword filter across name, category, and editorial description */
  const filtered = searchQuery.trim()
    ? products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const popularTags = ['Blazer', 'Linen Shirt', 'Hoodie', 'Sneakers', 'Watch', 'Leather Bag'];

  const handleSelectProduct = (id) => {
    setIsSearchOpen(false);
    navigateToProduct(id);
  };

  /* ==========================================================================
     RENDER SEARCH MODAL
     ========================================================================== */
  return (
    <div className="search-modal-overlay">
      <div
        className="search-modal-backdrop"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="search-modal-dialog-wrap">
        <div className="search-modal-card">
          {/* Header Input Bar */}
          <div className="search-modal-input-bar">
            <Search size={18} color="#a3a3a3" style={{ flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collections, tailoring, footwear, accessories..."
              className="search-modal-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', fontSize: '0.6875rem', color: '#a3a3a3', cursor: 'pointer', textTransform: 'uppercase' }}
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              style={{ background: 'none', border: 'none', color: '#737373', cursor: 'pointer', padding: '0.25rem', display: 'flex' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Popular Tag Suggestions */}
          <div className="search-modal-tags-bar">
            <span style={{ color: '#a3a3a3', fontWeight: 600, flexShrink: 0 }}>Trending:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchQuery(tag)}
                className="search-modal-tag-pill"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="search-modal-results-wrap">
            {searchQuery.trim() === '' ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#737373', fontSize: '0.8125rem', fontWeight: 300 }}>
                Type garment names, textiles, or collections above to search the catalog.
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <p style={{ fontWeight: 600, color: '#171717', marginBottom: '0.25rem' }}>
                  No garments matched &ldquo;{searchQuery}&rdquo;
                </p>
                <p style={{ fontSize: '0.75rem', color: '#737373' }}>
                  Try broader queries like &quot;linen&quot;, &quot;bag&quot;, &quot;wool&quot;, or &quot;blazer&quot;.
                </p>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#737373', marginBottom: '0.75rem' }}>
                  <span>Found {filtered.length} garments</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActivePage('shop');
                    }}
                    style={{ background: 'none', border: 'none', color: '#0a0a0a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}
                  >
                    <span>View in Catalog</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                <div className="search-modal-results-grid">
                  {filtered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectProduct(item.id)}
                      className="search-result-item"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="search-result-img"
                        referrerPolicy="no-referrer"
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#a3a3a3' }}>
                          {item.category}
                        </div>
                        <h4 style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0a0a0a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0.125rem 0' }}>
                          {item.name}
                        </h4>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#171717' }}>
                          ৳{item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
