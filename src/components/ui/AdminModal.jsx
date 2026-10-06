import React from 'react';
import { X } from 'lucide-react';
import './AdminModal.css';

/**
 * Shared modal shell for admin forms and management dialogs.
 */
export const AdminModal = ({ title, children, onClose, maxWidth = '44rem' }) => (
  <div className="admin-modal-overlay" onClick={onClose} role="presentation">
    <section
      className="admin-modal-card"
      style={{ maxWidth }}
      onClick={(event) => event.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div className="admin-modal-header">
        <h3 className="admin-modal-title" id="admin-modal-title">{title}</h3>
        <button className="admin-modal-close" type="button" onClick={onClose} aria-label="Close dialog">
          <X size={20} />
        </button>
      </div>
      {children}
    </section>
  </div>
);

export default AdminModal;
