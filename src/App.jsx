/**
 * ============================================================================
 * BinAsor ATELIER - APPLICATION ROOT SHELL
 * ============================================================================
 * Master application controller coordinating active view routing,
 * global navigation header, interactive drawers/modals, and footer.
 */

import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/ToastContainer';

/* Pages */
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { SalePage } from './pages/SalePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { WishlistPage } from './pages/WishlistPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './admin/AdminDashboard';

import './App.css';

/* ==========================================================================
   ROUTED CONTENT CONTROLLER
   ========================================================================== */
const AppContent = () => {
  const { activePage } = useStore();

  /* Scroll to viewport top on each page switch */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="app-shell">
      {/* 3-Zone Global Navigation Bar */}
      {activePage !== 'admin' && <Header />}

      {/* Dynamic Main Viewport */}
      <main className="app-main">
        {activePage === 'home' && <HomePage />}
        {activePage === 'shop' && <ShopPage />}
        {activePage === 'collections' && <ShopPage />}
        {activePage === 'sale' && <SalePage />}
        {activePage === 'product-detail' && <ProductDetailPage />}
        {activePage === 'cart' && <CartPage />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'wishlist' && <WishlistPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Footer */}
      {activePage !== 'admin' && <Footer />}

      {/* Floating Interactive Drawers & Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <ToastContainer />
    </div>
  );
};

/* ==========================================================================
   APPLICATION ENTRY POINT WITH CONTEXT PROVIDER
   ========================================================================== */
export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
