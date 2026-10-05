/**
 * ============================================================================
 * BinAsor ATELIER - REUSABLE BREADCRUMB COMPONENT
 * ============================================================================
 * Hierarchical path navigation for e-commerce catalog and product detail.
 */

import React from 'react';
import { ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

/**
 * @param {Object} props
 * @param {Array<{ label: string, onClick?: function }>} props.items
 * @param {string} [props.className='']
 */
export const Breadcrumb = ({ items = [], className = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={`breadcrumb-nav ${className}`.trim()}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="breadcrumb-separator" aria-hidden="true">
                <ChevronRight size={12} />
              </span>
            )}
            {isLast || !item.onClick ? (
              <span className="breadcrumb-current" aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                className="breadcrumb-link"
                onClick={item.onClick}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
