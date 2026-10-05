/**
 * ============================================================================
 * BinAsor ATELIER - SEASONAL ARCHIVE & SALE PAGE
 * ============================================================================
 * Promotional archive featuring discounted garments, seasonal clearance,
 * promotional voucher copy triggers, and department sorting.
 */

import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Tag,
  Percent,
  Copy,
  Check,
  Sparkles,
} from 'lucide-react';
import './SalePage.css';

export const SalePage = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const { products, setActivePage, showToast } = useStore();

  /* ==========================================================================
     FILTER & SORT STATE
     ========================================================================== */
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [sortBy, setSortBy] = useState('discount');
  const [maxPrice, setMaxPrice] = useState(300);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  /* Filter catalog strictly for items on sale */
  const saleProducts = useMemo(() => {
    return products
      .filter((p) => {
        const isOnSale = p.isOnSale || p.badge === 'Sale' || (p.originalPrice && p.originalPrice > p.price);
        if (!isOnSale) return false;

        if (departmentFilter !== 'All') {
          if (departmentFilter === 'Women' && p.department !== 'Women' && p.category !== 'Women') return false;
          if (departmentFilter === 'Men' && p.department !== 'Men' && p.category !== 'Men') return false;
          if (departmentFilter === 'Bags' && p.category !== 'Bags') return false;
          if (departmentFilter === 'Shoes' && p.category !== 'Shoes') return false;
          if (departmentFilter === 'Accessories' && p.category !== 'Accessories') return false;
        }

        if (p.price > maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'discount') {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return discountB - discountA;
        }
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [products, departmentFilter, sortBy, maxPrice]);

  /* Coupon code copy to clipboard */
  const handleCopyCode = () => {
    navigator.clipboard?.writeText('BinAsor20');
    setCopiedCoupon(true);
    showToast('Code BinAsor20 copied to clipboard!', 'success');
    setTimeout(() => setCopiedCoupon(false), 3000);
  };

  const departments = ['All', 'Women', 'Men', 'Bags', 'Shoes', 'Accessories'];

  /* ==========================================================================
     RENDER SALE PAGE
     ========================================================================== */
  return (
    <div className="sale-page-wrapper">
      <div className="sale-container">
        {/* ==================================================================
            HERO EDITORIAL PROMOTION BANNER
            ================================================================== */}


        {/* ==================================================================
            DEPARTMENT FILTER & SORT TOOLBAR
            ================================================================== */}
        <div className="sale-toolbar">
          <div className="sale-dept-pills">
            {departments.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setDepartmentFilter(dept)}
                className={`sale-dept-pill ${departmentFilter === dept ? 'active' : ''}`}
              >
                {dept === 'All' ? 'All Sale' : dept}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem' }}>
            <span style={{ color: '#737373' }}>
              {saleProducts.length} items on sale
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#a3a3a3' }}>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e5e5e5',
                  color: '#171717',
                  fontSize: '0.75rem',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '2px',
                  outline: 'none',
                }}
              >
                <option value="discount">Highest % Off</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* ==================================================================
            SALE PRODUCTS GRID
            ================================================================== */}
        {saleProducts.length === 0 ? (
          <EmptyState
            icon={<Sparkles size={28} />}
            title="No sale items in this category"
            description="Try selecting another department or explore our full regular catalog."
            action={
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Button variant="primary" size="md" onClick={() => setDepartmentFilter('All')}>
                  View All Sale
                </Button>
                <Button variant="outline" size="md" onClick={() => setActivePage('shop')}>
                  Browse Catalog
                </Button>
              </div>
            }
          />
        ) : (
          <div className="sale-products-grid">
            {saleProducts.map((product) => {
              const discountPercentage = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 20;

              return (
                <div key={product.id} className="sale-card-wrapper">
                  <div className="sale-discount-tag">
                    -{discountPercentage}%
                  </div>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalePage;
