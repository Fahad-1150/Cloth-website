/**
 * ============================================================================
 * BinAsor ATELIER - VALUE PROPOSITIONS & GUARANTEES FEATURE BAR
 * ============================================================================
 * Luxury horizontal assurance bar showcasing complimentary shipping thresholds,
 * secure payment certification, concierge support, and straightforward returns.
 */

import React from 'react';
import { Truck, ShieldCheck, Headphones, RotateCcw } from 'lucide-react';
import './FeatureBar.css';

export const FeatureBar = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      subtitle: 'On all orders over ৳99',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payment',
      subtitle: '100% secure checkout',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      subtitle: "We're here to help",
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      subtitle: '30 days return policy',
    },
  ];

  return (
    <div className="feature-bar-wrap">
      <div className="feature-bar-container">
        {features.map((feat, index) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              className={`feature-item ${index !== 0 ? 'feature-item-bordered' : ''}`}
            >
              <div className="feature-icon-box">
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <div className="feature-text-group">
                <span className="feature-title">{feat.title}</span>
                <span className="feature-subtitle">{feat.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureBar;
