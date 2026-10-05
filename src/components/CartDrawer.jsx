/**
 * ============================================================================
 * BinAsor ATELIER - SHOPPING BAG DRAWER OVERLAY
 * ============================================================================
 * Slide-in right drawer displaying current bag inventory, live threshold
 * shipping bar, line item updates, and direct checkout routes.
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from './ui/Button';
import { QuantitySelector } from './ui/QuantitySelector';
import { EmptyState } from './ui/EmptyState';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import './CartDrawer.css';

export const CartDrawer = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const {
    cart,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    setActivePage,
  } = useStore();

  if (!isCartOpen) return null;

  /* ==========================================================================
     SHIPPING THRESHOLD CALCULATIONS
     ========================================================================== */
  const FREE_SHIPPING_THRESHOLD = 99;
  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const progressPercent = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);

  /* Navigation actions */
  const handleCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewCart = () => {
    setIsCartOpen(false);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ==========================================================================
     RENDER CART DRAWER
     ========================================================================== */
  return (
    <div className="cart-drawer-overlay">
      {/* Dimming Backdrop */}
      <div
        className="cart-drawer-backdrop"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sliding Drawer Container */}
      <div className="cart-drawer-panel-wrap">
        <div className="cart-drawer-panel">
          {/* Header */}
          <div className="cart-drawer-header">
            <h2 className="cart-drawer-heading">
              <ShoppingBag size={18} />
              <span>Your Bag ({cartCount})</span>
            </h2>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="cart-drawer-close"
              aria-label="Close bag drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Milestone Tier */}
          <div className="cart-drawer-shipping-tier">
            {isFreeShipping ? (
              <span style={{ color: '#047857', fontWeight: 600 }}>
                ✓ Unlocked Free Worldwide Shipping!
              </span>
            ) : (
              <span>
                Add <strong>৳{shippingRemaining.toFixed(2)}</strong> more for Free Worldwide Shipping.
              </span>
            )}
            <div className="cart-drawer-progress-track">
              <div
                className="cart-drawer-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Body: Items or Empty Fallback */}
          {cart.length === 0 ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <EmptyState
                icon={<ShoppingBag size={28} />}
                title="Your Bag is Empty"
                description="Add items from our catalog to review them here."
                action={
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setIsCartOpen(false);
                      setActivePage('shop');
                    }}
                  >
                    Browse Collection
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="cart-drawer-items-wrap">
              {cart.map((item) => (
                <div key={item.id} className="cart-drawer-item">
                  <div className="cart-drawer-item-img">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="cart-drawer-item-info">
                    <h4 className="cart-drawer-item-title">{item.product.name}</h4>
                    <div className="cart-drawer-item-options">
                      {item.selectedSize} · {item.selectedColor}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                      <QuantitySelector
                        quantity={item.quantity}
                        onChange={(qty) => updateCartQuantity(item.id, qty)}
                        compact
                        min={1}
                      />
                      <span className="cart-drawer-item-price">
                        ৳{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="cart-drawer-remove"
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer Summary & Proceed Buttons */}
          {cart.length > 0 && (
            <div className="cart-drawer-footer">
              <div className="cart-drawer-total-row">
                <span className="cart-drawer-total-label">Estimated Total</span>
                <span className="cart-drawer-total-val">৳{cartTotal.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleCheckout}
                  icon={<ArrowRight size={15} />}
                  iconPosition="right"
                >
                  Checkout Now
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={handleViewCart}
                >
                  View Full Bag
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
