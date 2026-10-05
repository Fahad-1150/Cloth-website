/**
 * ============================================================================
 * BinAsor ATELIER - REUSABLE QUANTITY SELECTOR
 * ============================================================================
 * Clean step incrementer / decrementer for PDP and cart lines.
 */

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import './QuantitySelector.css';

/**
 * @param {Object} props
 * @param {number} props.quantity
 * @param {function} props.onChange
 * @param {number} [props.min=1]
 * @param {number} [props.max=99]
 * @param {boolean} [props.compact=false]
 * @param {string} [props.className='']
 */
export const QuantitySelector = ({
  quantity,
  onChange,
  min = 1,
  max = 99,
  compact = false,
  className = '',
}) => {
  /* ==========================================================================
     STEP CONTROLS
     ========================================================================== */
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  /* ==========================================================================
     RENDER QUANTITY PICKER
     ========================================================================== */
  return (
    <div
      className={`qty-control ${compact ? 'qty-compact' : ''} ${className}`.trim()}
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        className="qty-btn"
        onClick={handleDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={compact ? 12 : 14} />
      </button>

      <span className="qty-display" aria-live="polite">
        {quantity}
      </span>

      <button
        type="button"
        className="qty-btn"
        onClick={handleIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus size={compact ? 12 : 14} />
      </button>
    </div>
  );
};

export default QuantitySelector;
