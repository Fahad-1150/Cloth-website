/**
 * ============================================================================
 * BinAsor ATELIER - APPLICATION MOUNT POINT
 * ============================================================================
 * Initializes React DOM root and mounts the top-level App component.
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
