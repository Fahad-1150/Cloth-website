/**
 * ============================================================================
 * BinAsor ATELIER - SHOPPING BAG & CART PAGE
 * ============================================================================
 * Primary checkout preparation view displaying selected line items,
 * quantity controls, coupon promotions, free shipping thresholds, and order summaries.
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { QuantitySelector } from '../components/ui/QuantitySelector';
import { EmptyState } from '../components/ui/EmptyState';
import {
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import './CartPage.css';

export const CartPage = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const {
    cart,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    setActivePage,
    navigateToProduct,
    showToast,
  } = useStore();

  /* ==========================================================================
     LOCAL COUPON STATE & CALCULATIONS
     ========================================================================== */
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState(null);

  const FREE_SHIPPING_THRESHOLD = 99;
  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = cartTotal === 0 ? 0 : isFreeShipping ? 0 : 15;
  const discountAmount = (cartTotal * discountPercent) / 100;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingCost);

  /* Coupon verification */
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'BinAsor20' || clean === 'SUMMER20') {
      setAppliedPromo(clean);
      setDiscountPercent(20);
      showToast('20% coupon discount applied!', 'success');
    } else if (clean === 'WELCOME10') {
      setAppliedPromo(clean);
      setDiscountPercent(10);
      showToast('10% welcome discount applied!', 'success');
    } else {
      showToast('Invalid coupon. Try BinAsor20', 'error');
    }
    setPromoCode('');
  };

  /* ==========================================================================
     EMPTY STATE FALLBACK
     ========================================================================== */
  if (cart.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <div className="cart-container">
          <EmptyState
            icon={<ShoppingBag size={32} />}
            title="Your Shopping Bag is Empty"
            description="It appears you have not selected any pieces for your wardrobe yet. Explore our curated catalog to begin."
            action={
              <Button
                variant="primary"
                size="md"
                onClick={() => setActivePage('shop')}
                icon={<ArrowRight size={14} />}
                iconPosition="right"
              >
                Explore Collections
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  /* ==========================================================================
     RENDER CART PAGE
     ========================================================================== */
  return (
    <div className="cart-page-wrapper">
      <div className="cart-container">
        {/* Header Navigation */}
        <div className="cart-header">
          <div>
            <h1 className="cart-title">Shopping Bag</h1>
            <p className="cart-subtitle">Review and adjust your selected luxury garments.</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActivePage('shop')}
            icon={<ArrowLeft size={14} />}
            iconPosition="left"
          >
            Continue Shopping
          </Button>
        </div>

        {/* Free Shipping Milestone Alert */}
        <div className="cart-shipping-banner">
          {isFreeShipping ? (
            <span className="cart-shipping-unlocked">
              ✓ You have unlocked complimentary standard worldwide shipping!
            </span>
          ) : (
            <span className="cart-shipping-remaining">
              Add <strong>৳{(FREE_SHIPPING_THRESHOLD - cartTotal).toFixed(2)}</strong> more to unlock Free Worldwide Shipping.
            </span>
          )}
        </div>

        {/* Layout: Line Items Left + Order Summary Right */}
        <div className="cart-grid-layout">
          {/* Cart Items List */}
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-line-item">
                <div
                  className="cart-item-img-link"
                  onClick={() => navigateToProduct(item.productId)}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item-img"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="cart-item-details">
                  <div className="cart-item-meta">
                    {item.product.category} · {item.product.department}
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateToProduct(item.productId)}
                    className="cart-item-name"
                  >
                    {item.product.name}
                  </button>
                  <div className="cart-item-options">
                    Size: {item.selectedSize} · Color: {item.selectedColor}
                  </div>
                  <div className="cart-item-price">
                    ৳{item.product.price.toFixed(2)}
                  </div>
                </div>

                <QuantitySelector
                  quantity={item.quantity}
                  onChange={(qty) => updateCartQuantity(item.id, qty)}
                  compact
                  min={1}
                />

                <div className="cart-item-subtotal">
                  ৳{(item.product.price * item.quantity).toFixed(2)}
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="cart-item-remove-btn"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <aside className="cart-summary-card">
            <h2 className="cart-summary-title">Order Summary</h2>

            <div className="cart-summary-rows">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>৳{cartTotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="cart-summary-row" style={{ color: '#047857' }}>
                  <span>Discount ({appliedPromo})</span>
                  <span>-৳{discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="cart-summary-row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `৳${shippingCost.toFixed(2)}`}</span>
              </div>

              <div className="cart-summary-row cart-summary-total-row">
                <span>Total</span>
                <span>৳{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="cart-coupon-form">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Coupon code (e.g. BinAsor20)"
                className="cart-coupon-input"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                style={{ borderRadius: '0 2px 2px 0' }}
              >
                Apply
              </Button>
            </form>

            {/* Checkout Action */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setActivePage('checkout')}
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Proceed to Checkout
            </Button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', fontSize: '0.6875rem', color: '#737373' }}>
              <ShieldCheck size={14} color="#047857" />
              <span>256-bit Encrypted Secure Checkout</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
