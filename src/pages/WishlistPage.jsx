/**
 * ============================================================================
 * BinAsor ATELIER - WISHLIST & SAVED WARDROBE PAGE
 * ============================================================================
 * Personal curation room where patrons view and manage saved silhouettes,
 * tailoring, and accessories.
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { Heart, ArrowRight } from 'lucide-react';
import './WishlistPage.css';

export const WishlistPage = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const { wishlist, products, setActivePage } = useStore();

  /* Cross-reference wishlist IDs with catalog records */
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  /* ==========================================================================
     RENDER WISHLIST
     ========================================================================== */
  return (
    <div className="wishlist-page-wrapper">
      <div className="wishlist-container">
        {/* Header Information */}
        <div className="wishlist-header">
          <div className="wishlist-eyebrow">Personal Curation</div>
          <h1 className="wishlist-title">
            Saved Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="wishlist-subtitle">
            Keep track of the silhouettes, tailoring, and footwear you love.
          </p>
        </div>

        {/* Empty State vs. Product Grid */}
        {wishlistedProducts.length === 0 ? (
          <EmptyState
            icon={<Heart size={28} />}
            title="Your Wishlist is Empty"
            description="Click the heart icon on any garment card or product detail page to curate your personal wardrobe collection."
            action={
              <Button
                variant="primary"
                size="md"
                onClick={() => setActivePage('shop')}
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                Discover Collections
              </Button>
            }
          />
        ) : (
          <div className="wishlist-grid">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
