/**
 * ============================================================================
 * BinAsor ATELIER - REUSABLE EMPTY STATE COMPONENT
 * ============================================================================
 * Graceful fallback illustration for empty cart, wishlist, and filter results.
 */

import React from 'react';
import './EmptyState.css';

/**
 * @param {Object} props
 * @param {React.ReactNode} props.icon
 * @param {string} props.title
 * @param {string} props.description
 * @param {React.ReactNode} [props.action]
 * @param {string} [props.className='']
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`empty-state-wrapper ${className}`.trim()}>
      {icon && <div className="empty-state-icon-box">{icon}</div>}
      <h3 className="empty-state-title">{title}</h3>
      {description && <p className="empty-state-description">{description}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
