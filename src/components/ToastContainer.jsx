/**
 * ============================================================================
 * BinAsor ATELIER - GLOBAL TOAST NOTIFICATION STACK
 * ============================================================================
 * Floating ephemeral notification alert banners for bag operations,
 * wishlist updates, and administrative confirmations.
 */

import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import './ToastContainer.css';

export const ToastContainer = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  /* ==========================================================================
     RENDER TOASTS
     ========================================================================== */
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-card">
          <div className="toast-content">
            {toast.type === 'success' && (
              <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0 }} />
            )}
            {toast.type === 'error' && (
              <AlertCircle size={16} color="#fb7185" style={{ flexShrink: 0 }} />
            )}
            {toast.type === 'info' && (
              <Info size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
            )}
            <span style={{ lineHeight: 1.4 }}>{toast.message}</span>
          </div>

          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="toast-close-btn"
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
