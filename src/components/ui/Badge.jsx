/**
 * ============================================================================
 * BinAsor ATELIER - REUSABLE BADGE COMPONENT
 * ============================================================================
 * Visual tag indicating product status (New, Sale, Hot, In Stock).
 */

import React from 'react';
import './Badge.css';

/**
 * @param {Object} props
 * @param {'sale' | 'new' | 'hot' | 'instock' | 'outofstock' | 'neutral'} [props.variant='neutral']
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 */
export const Badge = ({
  variant = 'neutral',
  children,
  className = '',
  ...rest
}) => {
  /* ==========================================================================
     CLASSNAME DETERMINATION
     ========================================================================== */
  const normalizedVariant = String(variant).toLowerCase();
  const variantClass = `badge-${normalizedVariant}`;
  const combinedClasses = `badge-base ${variantClass} ${className}`.trim();

  /* ==========================================================================
     RENDER BADGE
     ========================================================================== */
  return (
    <span className={combinedClasses} {...rest}>
      {children}
    </span>
  );
};

export default Badge;
