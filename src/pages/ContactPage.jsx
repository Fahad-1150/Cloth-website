/**
 * ============================================================================
 * BinAsor ATELIER - CLIENT CONCIERGE & CONTACT PAGE
 * ============================================================================
 * Direct communication portal for patrons seeking bespoke sizing, private
 * showroom appointments, order logistics, or garment care assistance.
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import './ContactPage.css';

export const ContactPage = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const { showToast } = useStore();

  /* ==========================================================================
     FORM STATE
     ========================================================================== */
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  /* Submission handler */
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your inquiry has been relayed to our concierge team.', 'success');
  };

  /* ==========================================================================
     RENDER CONTACT PAGE
     ========================================================================== */
  return (
    <div className="contact-page-wrapper">
      <div className="contact-container">
        {/* ==================================================================
            HEADER & INTRODUCTION
            ================================================================== */}
        <div className="contact-header">
          <div className="contact-eyebrow">Client Concierge</div>
          <h1 className="contact-title">How May We Assist You?</h1>
          <p className="contact-lead">
            Whether inquiring about bespoke sizing, order tracking, private showroom fittings, or garment craftsmanship, our concierge team is available 7 days a week.
          </p>
        </div>

        {/* ==================================================================
            GRID: CONCIERGE INFORMATION + CONTACT FORM
            ================================================================== */}
        <div className="contact-grid">
          {/* Left Details Card */}
          <aside className="contact-info-card">
            <div className="contact-info-item">
              <Mail size={18} color="#171717" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
              <div>
                <h4 className="contact-info-heading">Email Concierge</h4>
                <p className="contact-info-text">concierge@BinAsor.fashion</p>
                <p className="contact-info-subtext">Average response: &lt; 2 hours</p>
              </div>
            </div>

            <div className="contact-info-item" style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1.25rem' }}>
              <Phone size={18} color="#171717" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
              <div>
                <h4 className="contact-info-heading">Direct Line</h4>
                <p className="contact-info-text">+1 (800) 589-6721</p>
                <p className="contact-info-subtext">Mon–Sun: 9:00 AM – 9:00 PM EST</p>
              </div>
            </div>

            <div className="contact-info-item" style={{ borderTop: '1px solid #f0f0f0', paddingTop: '1.25rem' }}>
              <MapPin size={18} color="#171717" style={{ marginTop: '0.125rem', flexShrink: 0 }} />
              <div>
                <h4 className="contact-info-heading">Flagship Atelier</h4>
                <p className="contact-info-text">
                  540 Madison Avenue, 9th Floor<br />
                  New York, NY 10022
                </p>
              </div>
            </div>
          </aside>

          {/* Right Inquiry Form */}
          <main className="contact-form-card">
            {submitted ? (
              <div className="contact-success-state">
                <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '9999px', backgroundColor: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={28} />
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, color: '#0a0a0a' }}>
                  Inquiry Received
                </h3>
                <p style={{ fontSize: '0.8125rem', color: '#525252', maxWidth: '24rem', lineHeight: 1.6 }}>
                  Thank you for reaching out. A dedicated personal stylist and client representative will review your message and reply promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-fields">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div className="contact-field">
                    <label className="contact-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Eleanor Vance"
                      className="contact-input"
                    />
                  </div>

                  <div className="contact-field">
                    <label className="contact-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="eleanor@example.com"
                      className="contact-input"
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label className="contact-label">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Sizing inquiry regarding Oversized Blazer"
                    className="contact-input"
                  />
                </div>

                <div className="contact-field">
                  <label className="contact-label">Message *</label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please share any specifications or order questions..."
                    className="contact-textarea"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<Send size={14} />}
                  iconPosition="right"
                >
                  Send Inquiry
                </Button>
              </form>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
