/**
 * ============================================================================
 * BinAsor ATELIER - FOOTER COMPONENT
 * ============================================================================
 * Multi-column brand foundation featuring newsletter subscription,
 * taxonomy directory navigation, concierge contacts, and copyright credentials.
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/Button';
import { ArrowRight, Check } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const { setActivePage, setSelectedCategoryFilter, showToast } = useStore();

  /* ==========================================================================
     NEWSLETTER SUBSCRIPTION STATE
     ========================================================================== */
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing to the BinAsor Gazette', 'success');
    setEmail('');
  };

  const handleNav = (page, category = null) => {
    if (category) {
      setSelectedCategoryFilter(category);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ==========================================================================
     RENDER FOOTER
     ========================================================================== */
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Multi-Column Main Grid */}
        <div className="footer-grid">
          {/* Column 1: Brand & Newsletter */}
          <div className="footer-brand-col">
            <span className="footer-brand-logo">BinAsor</span>
            <p className="footer-brand-text">
              Crafting timeless clothing, footwear, and accessories with an unwavering dedication to sustainable fibers and modern tailored simplicity.
            </p>


          </div>

          {/* Column 2: Collections Directory */}


          {/* Column 3: Customer Care & Concierge */}
          <div className="footer-nav-col">
            <h4 className="footer-col-title">Client Care</h4>
            <ul className="footer-links-list">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="footer-link-btn"
                >
                  Contact & Concierge
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="footer-link-btn"
                >
                  Shipping & Customs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="footer-link-btn"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('shop')}
                  className="footer-link-btn"
                >
                  Size Guide & Care
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & Management */}

        </div>

        {/* Subfooter Legal */}
        <div className="footer-subbar">
          <p>© 2026 BinAsor . All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="https://fahad-1150.github.io/NHFahad/acy-policy">Developed by NH.Fahad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
