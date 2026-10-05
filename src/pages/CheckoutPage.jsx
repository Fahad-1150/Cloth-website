/**
 * ============================================================================
 * BinAsor ATELIER - CHECKOUT & ORDER INVOICE PAGE
 * ============================================================================
 * Multi-section order finalization interface handling delivery destination,
 * payment selection (Credit Card, Apple Pay, Cash on Delivery), and receipt generation.
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Banknote,
  ArrowRight,
  ArrowLeft,
  Truck,
  Package,
  ShoppingBag,
} from 'lucide-react';
import './CheckoutPage.css';

export const CheckoutPage = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const { cart, cartTotal, placeOrder, setActivePage } = useStore();

  /* ==========================================================================
     FORM STATE & PAYMENT SELECTION
     ========================================================================== */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [completedOrder, setCompletedOrder] = useState(null);

  /* Calculations */
  const isFreeShipping = cartTotal >= 99;
  const shippingCost = cartTotal === 0 ? 0 : isFreeShipping ? 0 : 15;
  const finalTotal = cartTotal + shippingCost;

  /* Field change handler */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* Order submission */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert('Please fill in your required shipping details.');
      return;
    }

    const order = placeOrder({
      customerName: formData.name,
      customerEmail: formData.email,
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      items: cart,
      subtotal: cartTotal,
      discount: 0,
      shipping: shippingCost,
      total: finalTotal,
      paymentMethod,
      status: 'Processing',
    });

    setCompletedOrder(order);
  };

  /* ==========================================================================
     CONFIRMATION / INVOICE VIEW (POST-PURCHASE)
     ========================================================================== */
  if (completedOrder) {
    return (
      <div className="checkout-page-wrapper">
        <div className="invoice-wrapper">
          <div className="invoice-card">
            <div className="invoice-header-status">
              <div className="invoice-badge-circle">
                <CheckCircle2 size={36} />
              </div>
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.15em', color: '#a3a3a3', textTransform: 'uppercase' }}>
                Order Confirmed & Placed
              </span>
              <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.25rem', fontWeight: 500, margin: '0.5rem 0' }}>
                Thank You, {completedOrder.customerName}
              </h1>
              <p style={{ fontSize: '0.8125rem', color: '#737373', maxWidth: '28rem', margin: '0 auto', lineHeight: 1.6 }}>
                Your order <strong>{completedOrder.id}</strong> has been received and is being prepared with bespoke atelier packaging.
              </p>
            </div>

            {/* Order Summary Metadata */}
            <div className="invoice-meta-grid">
              <div>
                <span style={{ color: '#a3a3a3', display: 'block', marginBottom: '0.25rem' }}>Order Reference</span>
                <strong style={{ color: '#0a0a0a' }}>{completedOrder.id}</strong>
              </div>
              <div>
                <span style={{ color: '#a3a3a3', display: 'block', marginBottom: '0.25rem' }}>Order Date</span>
                <strong style={{ color: '#0a0a0a' }}>{completedOrder.date}</strong>
              </div>
              <div>
                <span style={{ color: '#a3a3a3', display: 'block', marginBottom: '0.25rem' }}>Payment Method</span>
                <strong style={{ color: '#0a0a0a' }}>{completedOrder.paymentMethod.replace('_', ' ').toUpperCase()}</strong>
              </div>
              <div>
                <span style={{ color: '#a3a3a3', display: 'block', marginBottom: '0.25rem' }}>Fulfillment Status</span>
                <span style={{ color: '#047857', fontWeight: 600 }}>{completedOrder.status}</span>
              </div>
            </div>

            {/* Delivery Destination */}
            <div style={{ padding: '1rem', border: '1px solid #f5f5f5', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.75rem' }}>
              <h4 style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                Shipping Destination
              </h4>
              <p style={{ color: '#525252', lineHeight: 1.5 }}>
                {completedOrder.customerName}<br />
                {completedOrder.shippingAddress.address}<br />
                {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.postalCode}, {completedOrder.shippingAddress.country}
              </p>
            </div>

            {/* Action Return */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <Button
                variant="primary"
                size="md"
                onClick={() => setActivePage('shop')}
              >
                Return to Shop
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================================
     EMPTY BAG CHECK
     ========================================================================== */
  if (cart.length === 0) {
    return (
      <div className="checkout-page-wrapper">
        <div className="checkout-container">
          <EmptyState
            icon={<ShoppingBag size={32} />}
            title="No Items to Checkout"
            description="Your shopping bag is currently empty. Add products before proceeding to payment."
            action={
              <Button
                variant="primary"
                size="md"
                onClick={() => setActivePage('shop')}
              >
                Browse Catalog
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  /* ==========================================================================
     RENDER MAIN CHECKOUT FORM
     ========================================================================== */
  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActivePage('cart')}
            icon={<ArrowLeft size={14} />}
            iconPosition="left"
          >
            Back to Bag
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="checkout-layout-grid">
          {/* Left Form: Shipping Details & Payment */}
          <div className="checkout-form-section">
            {/* Fieldset: Shipping Address */}
            <fieldset className="checkout-fieldset">
              <legend className="checkout-legend">1. Shipping Information</legend>

              <div className="checkout-input-row checkout-input-row-2">
                <div className="checkout-field">
                  <label className="checkout-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Eleanor Vance"
                    className="checkout-input"
                  />
                </div>
                <div className="checkout-field">
                  <label className="checkout-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="eleanor@example.com"
                    className="checkout-input"
                  />
                </div>
              </div>

              <div className="checkout-input-row checkout-input-row-2">
                <div className="checkout-field">
                  <label className="checkout-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="checkout-input"
                  />
                </div>
                <div className="checkout-field">
                  <label className="checkout-label">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="checkout-select"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              <div className="checkout-field">
                <label className="checkout-label">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Apartment, suite, unit, or street address"
                  className="checkout-input"
                />
              </div>

              <div className="checkout-input-row checkout-input-row-2">
                <div className="checkout-field">
                  <label className="checkout-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New York"
                    className="checkout-input"
                  />
                </div>
                <div className="checkout-field">
                  <label className="checkout-label">Postal / ZIP Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="10001"
                    className="checkout-input"
                  />
                </div>
              </div>
            </fieldset>

            {/* Fieldset: Payment Options */}
            <fieldset className="checkout-fieldset">
              <legend className="checkout-legend">2. Payment Method</legend>

              <div className="checkout-payment-methods">
                <label className={`checkout-payment-card ${paymentMethod === 'credit_card' ? 'selected' : ''}`}>
                  <div className="checkout-payment-radio-group">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'credit_card'}
                      onChange={() => setPaymentMethod('credit_card')}
                      className="accent-neutral-950"
                    />
                    <div>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block' }}>Credit / Debit Card</span>
                      <span style={{ fontSize: '0.6875rem', color: '#737373' }}>Visa, Mastercard, American Express</span>
                    </div>
                  </div>
                  <CreditCard size={18} color="#525252" />
                </label>

                <label className={`checkout-payment-card ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <div className="checkout-payment-radio-group">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-neutral-950"
                    />
                    <div>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block' }}>Cash on Delivery (COD)</span>
                      <span style={{ fontSize: '0.6875rem', color: '#737373' }}>Settle payment upon white-glove arrival</span>
                    </div>
                  </div>
                  <Banknote size={18} color="#525252" />
                </label>
              </div>
            </fieldset>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={<ArrowRight size={16} />}
              iconPosition="right"
            >
              Confirm & Place Order · ৳{finalTotal.toFixed(2)}
            </Button>
          </div>

          {/* Right Sidebar: Live Bag Review */}
          <aside className="checkout-summary-card">
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, borderBottom: '1px solid #e5e5e5', paddingBottom: '0.75rem' }}>
              Order Review ({cart.length})
            </h2>

            <div className="checkout-summary-items">
              {cart.map((item) => (
                <div key={item.id} className="checkout-summary-item">
                  <div className="checkout-item-thumb">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, fontSize: '0.75rem' }}>
                    <h4 style={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.product.name}
                    </h4>
                    <span style={{ color: '#737373', display: 'block' }}>
                      Qty: {item.quantity} · {item.selectedSize}
                    </span>
                    <strong style={{ color: '#0a0a0a', marginTop: '0.25rem', display: 'block' }}>
                      ৳{(item.product.price * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#525252' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>৳{cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `৳${shippingCost.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5e5e5', paddingTop: '0.75rem', fontWeight: 700, fontSize: '1.125rem', color: '#0a0a0a' }}>
                <span>Grand Total</span>
                <span>৳{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
