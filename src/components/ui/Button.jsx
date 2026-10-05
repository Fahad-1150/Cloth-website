/**
 * ============================================================================
 * BinAsor ATELIER - REUSABLE BUTTON COMPONENT
 * ============================================================================
 * Flexible, accessible button with variant and size controls.
 * Used across hero headers, product cards, cart drawer, and checkout.
 */

import React from 'react';
import './Button.css';

/**
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'} [props.variant='primary']
 * @param {'sm' | 'md' | 'lg'} [props.size='md']
 * @param {boolean} [props.fullWidth=false]
 * @param {React.ReactNode} [props.icon]
 * @param {'left' | 'right'} [props.iconPosition='right']
 * @param {React.ReactNode} props.children
 * @param {string} [props.className='']
 * @param {function} [props.onClick]
 * @param {boolean} [props.disabled=false]
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon = null,
  iconPosition = 'right',
  children,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...rest
}) => {
  /* ==========================================================================
     CLASSNAME COMPOSITION
     ========================================================================== */
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const widthClass = fullWidth ? 'btn-full' : '';
  const combinedClasses = `btn-base ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim();

  /* ==========================================================================
     RENDER BUTTON
     ========================================================================== */
  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && iconPosition === 'left' && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon">{icon}</span>}
    </button>
  );
};

export default Button;
