/**
 * ============================================================================
 * BinAsor ATELIER - GLOBAL HEADER & NAVIGATION BAR
 * ============================================================================
 * Architectural 3-zone header implementing:
 * 1. Global announcement banner
 * 2. Serif wordmark brand logo
 * 3. Primary catalog links with real-time active route tracking
 * 4. User actions: Search modal trigger, Admin authorization indicator,
 *    Wishlist count badge, and Shopping Bag counter.
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, User, Menu, X, ShieldCheck } from 'lucide-react';
import './Header.css';

export const Header = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const {
    activePage,
    setActivePage,
    cartCount,
    setIsCartOpen,
    setIsSearchOpen,
    wishlist,
    isAdminLoggedIn,
    setSelectedCategoryFilter,
  } = useStore();

  /* ==========================================================================
     LOCAL COMPONENT STATE
     ========================================================================== */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* Primary navigation links specification */
  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'shop' },
    { label: 'Sale!', page: 'sale', isSale: true },



  ];

  /* Route navigation click handler */
  const handleNavigate = (page, filter = null) => {
    if (filter) {
      setSelectedCategoryFilter(null);
    }
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ==========================================================================
     RENDER HEADER
     ========================================================================== */
  return (
    <header className="header-wrapper">
      {/* --------------------------------------------------------------------
          1. TOP PROMOTIONAL ANNOUNCEMENT BANNER
          -------------------------------------------------------------------- */}

      {/* --------------------------------------------------------------------
          2. MAIN 3-ZONE NAVIGATION BAR
          -------------------------------------------------------------------- */}
      <div className="header-main-nav">
        {/* Mobile menu hamburger button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="header-mobile-toggle"
            aria-label="Toggle Navigation Drawer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Zone 1: Wordmark Logo */}
        <div>
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="header-logo-btn"
          >
            BinAsor
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="header-nav-links">
          {navLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavigate(item.page, item.badgeFilter)}
              className={`header-nav-link ${item.isSale ? 'sale' : activePage === item.page ? 'active' : ''
                }`}
            >
              <span>{item.label}</span>
              {item.isSale && <span className="header-sale-dot" />}
            </button>
          ))}
        </nav>

        {/* Zone 3: Interactive Action Triggers */}
        <div className="header-actions">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="header-action-btn"
            title="Search catalog"
            aria-label="Search"
          >
            <Search size={19} strokeWidth={1.75} />
          </button>

          {/* Admin Portal Quick Access */}


          {/* Wishlist Link & Counter */}



          {/* Shopping Bag Drawer Trigger */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="header-action-btn"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag size={19} strokeWidth={1.75} />
            <span className="header-bag-count">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------------
          3. MOBILE MENU DRAWER
          -------------------------------------------------------------------- */}
      {mobileMenuOpen && (
        <div className="header-mobile-menu">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.page, item.badgeFilter)}
                style={{
                  textAlign: 'left',
                  fontSize: '1rem',
                  padding: '0.5rem 0',
                  background: 'none',
                  border: 'none',
                  fontWeight: activePage === item.page ? 600 : 400,
                  color: item.isSale ? '#e11d48' : '#171717',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ borderTop: '1px solid #f5f5f5', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <button
              type="button"
              onClick={() => handleNavigate('admin')}
              style={{ background: 'none', border: 'none', color: '#525252', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              <User size={16} />
              <span>Admin Management</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('wishlist')}
              style={{ background: 'none', border: 'none', color: '#525252', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
            >
              <Heart size={16} />
              <span>Wishlist ({wishlist.length})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
