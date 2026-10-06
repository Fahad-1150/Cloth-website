/**
 * ============================================================================
 * BinAsor ATELIER - ADMIN DASHBOARD & STORE MANAGEMENT
 * ============================================================================
 * 
 * This file contains the main AdminDashboard component, which acts as the 
 * central control panel for the store. It handles authentication, data 
 * visualization (overview stats, top products, offers), inventory management 
 * (products, categories), and order processing.
 * 
 * The UI is responsive and designed strictly using external CSS classes mapped 
 * in `AdminDashboard.css`.
 */
import React, { useState } from 'react';

// Context for global state (products, orders, categories)
import { useStore } from '../context/StoreContext';

// Custom UI Components
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AdminModal } from '../components/ui/AdminModal';

// Lucide Icons for consistent, modern SVG iconography
import {
  Lock, Edit2, Trash2, ShoppingBag, TrendingUp, Layers,
  LogOut, Search, Home, Box, Tag, Users
} from 'lucide-react';

// Mock data used as fallbacks for initial display
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, ADMIN_OFFERS } from '../data/mockData';

// Stylesheet containing all design rules for the dashboard
import './AdminDashboard.css';

export const AdminDashboard = () => {
  // ==========================================================================
  // 1. GLOBAL STATE & CONTEXT
  // ==========================================================================
  const {
    products, categories, orders, isAdminLoggedIn, adminLogin, adminLogout,
    addProduct, updateProduct, deleteProduct, addCategory,
    updateOrderStatus
  } = useStore();

  // ==========================================================================
  // 2. LOCAL UI STATE
  // ==========================================================================

  // Authentication state
  const [passwordInput, setPasswordInput] = useState('');

  // Layout & Navigation states
  const [activeTab, setActiveTab] = useState('dashboard'); // Tracks which view is open
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controls mobile sidebar visibility

  // Table Filtering states
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [tableSearch, setTableSearch] = useState('');

  // Product Management Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null); // Null if adding new, ID if editing

  // Category Management Modal states
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryNameInput, setCategoryNameInput] = useState('');
  const [categoryImageInput, setCategoryImageInput] = useState('');

  // Form payload for Product Creation/Updates
  const [productForm, setProductForm] = useState({
    name: '', category: INITIAL_CATEGORIES[0]?.name || 'Women', department: 'Women', price: 99, originalPrice: undefined,
    image: '', galleryInput: '', badge: '', description: '', sizesInput: 'XS, S, M, L, XL',
    colorsInput: 'Black (#18181B), Ivory (#FDFBF7)', inStock: true, stockCount: 15,
    isFeatured: true, isOnSale: false,
  });

  // ==========================================================================
  // 3. AUTHENTICATION HANDLERS
  // ==========================================================================
  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin(passwordInput);
  };

  const handleQuickDemoLogin = () => {
    adminLogin('admin123');
  };

  // ==========================================================================
  // 4. MODAL LOGIC & FORM SUBMISSIONS
  // ==========================================================================

  /**
   * Opens the product modal in "Add New" mode with default dummy data
   */
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    const mockProduct = INITIAL_PRODUCTS[0];
    setProductForm({
      name: '', category: INITIAL_CATEGORIES[0]?.name || 'Women', department: 'Women', price: 120, originalPrice: undefined,
      image: mockProduct?.image || '', galleryInput: '',
      badge: 'New', description: 'Crafted from premium sustainable materials with an intentional minimalist silhouette.',
      sizesInput: 'XS, S, M, L, XL', colorsInput: 'Sand (#D1CCC0), Slate (#475569)', inStock: true, stockCount: 20, isFeatured: true, isOnSale: false,
    });
    setIsProductModalOpen(true);
  };

  /**
   * Opens the product modal in "Edit" mode, pre-filling the form with product data
   */
  const handleOpenEditModal = (p) => {
    setEditingProductId(p.id);
    setProductForm({
      name: p.name, category: p.category, department: p.department, price: p.price, originalPrice: p.originalPrice,
      image: p.image, galleryInput: (p.gallery || []).join(', '), badge: p.badge || '', description: p.description,
      sizesInput: (p.sizes || []).join(', '), colorsInput: (p.colors || []).map((c) => `${c.name} (${c.hex})`).join(', '),
      inStock: p.inStock, stockCount: p.stockCount, isFeatured: Boolean(p.isFeatured), isOnSale: Boolean(p.isOnSale),
    });
    setIsProductModalOpen(true);
  };

  /**
   * Parses string inputs into structured arrays and commits product creation/update
   */
  const handleSaveProduct = (e) => {
    e.preventDefault();
    const sizes = productForm.sizesInput.split(',').map((s) => s.trim()).filter(Boolean);
    const colors = productForm.colorsInput.split(',').map((part) => {
      const match = part.match(/(.*?)\((#.*?)\)/);
      if (match) return { name: match[1].trim(), hex: match[2].trim() };
      return { name: part.trim(), hex: '#18181B' };
    }).filter((c) => c.name);
    const gallery = productForm.galleryInput.split(',').map((g) => g.trim()).filter(Boolean);

    const payload = {
      name: productForm.name, category: productForm.category, department: productForm.department, price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined, image: productForm.image,
      gallery: gallery.length > 0 ? gallery : [productForm.image], badge: productForm.badge || undefined, description: productForm.description,
      sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L'], colors: colors.length > 0 ? colors : [{ name: 'Black', hex: '#18181B' }],
      inStock: Boolean(productForm.inStock), stockCount: Number(productForm.stockCount), isFeatured: Boolean(productForm.isFeatured),
      isOnSale: Boolean(productForm.isOnSale), rating: 4.9, reviewCount: 12,
    };

    if (editingProductId) updateProduct(editingProductId, payload);
    else addProduct(payload);
    setIsProductModalOpen(false);
  };

  /**
   * Commits category creation
   */
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryNameInput.trim()) return;
    addCategory({
      name: categoryNameInput.trim(), slug: categoryNameInput.trim().toLowerCase().replace(/\s+/g, '-'),
      image: categoryImageInput.trim() || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80',
      description: `Luxury essentials curated under ${categoryNameInput.trim()}`,
    });
    setCategoryNameInput('');
    setCategoryImageInput('');
    setIsCategoryModalOpen(false);
  };

  // ==========================================================================
  // 5. DERIVED DATA & STATISTICS
  // ==========================================================================

  // Calculate total revenue from all orders
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Calculate unique customer count based on email addresses
  const totalCustomers = Array.from(new Set(orders.map(o => o.customerEmail))).length;

  // Count orders that are not yet delivered
  const pendingDelivery = orders.filter(o => o.status !== 'Delivered').length;

  // Filter products for the products table based on search query and sale status
  const filteredTableProducts = products.filter((p) => {
    if (showOnlySale && !p.isOnSale && p.badge !== 'Sale') return false;
    if (!tableSearch) return true;
    return p.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(tableSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(tableSearch.toLowerCase());
  });


  // ==========================================================================
  // 6. RENDER LOGIC
  // ==========================================================================

  // --- Render Authentication Screen if not logged in ---
  if (!isAdminLoggedIn) {
    return (
      <div className="admin-page-wrapper">
        <div className="admin-login-wrapper">
          <div className="admin-login-card">
            <div className="admin-login-icon"><Lock size={24} /></div>
            <h1 className="admin-login-title">BINASOR</h1>
            <p className="admin-login-desc">Restricted management portal for inventory, catalog curation, and client orders.</p>
            <form onSubmit={handleLogin} className="admin-login-form">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password (admin123)"
                className="admin-login-input"
              />
              <Button type="submit" variant="primary" size="md" fullWidth>Authenticate Access</Button>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="admin-login-demo-btn"
              >
                Quick Demo 1-Click Access (admin123)
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // --- View Renderers ---

  /**
   * Render Dashboard Overview Tab
   * Shows metric summary cards, top selling products, and current offers
   */
  const renderOverview = () => (
    <>
      {/* 4-Column Grid for Key Metrics (Revenue, Orders, Customers, Deliveries) */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-title">Total Revenue<br /><span className="admin-stat-subtitle">Last 30 days</span></span>
          </div>
          <div className="admin-stat-value-wrap">
            <span className="admin-stat-value">৳{(totalRevenue + 82650).toLocaleString()}</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-title">Total Order<br /><span className="admin-stat-subtitle">Last 30 days</span></span>
          </div>
          <div className="admin-stat-value-wrap">
            <span className="admin-stat-value">{(orders.length + 1645).toLocaleString()}</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-title">Total Customer<br /><span className="admin-stat-subtitle">Last 30 days</span></span>
          </div>
          <div className="admin-stat-value-wrap">
            <span className="admin-stat-value">{(totalCustomers + 1462).toLocaleString()}</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-title">Pending Delivery<br /><span className="admin-stat-subtitle">Last 30 days</span></span>
          </div>
          <div className="admin-stat-value-wrap">
            <span className="admin-stat-value">{pendingDelivery + 117}</span>
          </div>
        </div>
      </div>

      {/* Bottom Section: Top Products & Offers */}
      <div className="admin-bottom-row">
        {/* Top Selling Products List */}
        <div className="admin-chart-card">
          <div className="admin-chart-header">
            <h3 className="admin-chart-title">Top Selling Products</h3>
          </div>

          {/* Responsive CSS Grid Carousel for Top Products */}
          <div className="admin-products-carousel">
            {(products.length > 0 ? products : INITIAL_PRODUCTS).slice(0, 2).map(p => (
              <div key={p.id} className="admin-product-card">
                <img src={p.image} alt={p.name} />
                <div className="admin-product-card-title">{p.name}</div>
                <div className="admin-product-card-stock">{p.stockCount * 5} Pcs</div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Offers List */}
        <div className="admin-chart-card">
          <div className="admin-chart-header admin-offer-header-wrap">
            <h3 className="admin-chart-title">Current Offer</h3>
          </div>

          <div className="admin-offers-list">
            {ADMIN_OFFERS.map((offer) => (
              <div className="admin-offer-item" key={offer.name}>
                <div className="admin-offer-header">
                  <span className="admin-offer-name">{offer.name}</span>
                  <span className="admin-offer-date">{offer.date}</span>
                </div>
                {/* Visual Progress Bar for Offers */}
                <div className="admin-progress-bg">
                  <div className="admin-progress-fill" style={{ width: `${offer.progress}%`, backgroundColor: offer.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  /**
   * Render Products Tab
   * Shows searchable, filterable data table for managing inventory items
   */
  const renderProducts = () => (
    <div className="admin-table-card">
      <div className="admin-table-toolbar">
        {/* Search Bar */}
        <div className="admin-search-wrap">
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Search products..." value={tableSearch} onChange={(e) => setTableSearch(e.target.value)} />
        </div>

        {/* Actions (Filter Checkbox & Create Button) */}
        <div className="admin-toolbar-actions">
          <label className="admin-toolbar-checkbox">
            <input type="checkbox" checked={showOnlySale} onChange={(e) => setShowOnlySale(e.target.checked)} /> Sale only
          </label>
          <Button variant="primary" size="sm" onClick={handleOpenAddModal}>+ New Product</Button>
        </div>
      </div>

      {/* Product Data Table */}
      <div className="admin-table-responsive">
        <table className="admin-table">
          <thead>
            <tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filteredTableProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="admin-table-product">
                    <img src={p.image} alt="" className="admin-table-img" />
                    <div><strong className="admin-table-title">{p.name}</strong><span className="admin-table-id">{p.id}</span></div>
                  </div>
                </td>
                <td>{p.category}</td>
                <td>
                  <strong>৳{p.price.toFixed(2)}</strong>
                  {p.originalPrice && <span className="admin-table-old-price">৳{p.originalPrice.toFixed(2)}</span>}
                </td>
                <td>
                  {p.inStock ? <span className="admin-stock-in">In Stock ({p.stockCount})</span> : <span className="admin-stock-out">Out of Stock</span>}
                </td>
                <td>
                  {p.isOnSale || p.badge === 'Sale' ? <Badge variant="sale">On Sale</Badge> : p.badge === 'New' ? <Badge variant="new">New</Badge> : <Badge variant="neutral">Regular</Badge>}
                </td>
                <td>
                  <div className="admin-table-actions">
                    <button type="button" className="admin-btn-edit" onClick={() => handleOpenEditModal(p)}><Edit2 size={14} color="#64748b" /></button>
                    <button type="button" className="admin-btn-delete" onClick={() => deleteProduct(p.id)}><Trash2 size={14} color="#ef4444" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /**
   * Render Orders Tab
   * Displays all customer orders with status update controls
   */
  const renderOrders = () => (
    <div className="admin-table-card">
      <div className="admin-table-toolbar">
        <span className="admin-table-title-large">All Customer Invoices</span>
      </div>

      {/* Orders Data Table */}
      <div className="admin-table-responsive">
        <table className="admin-table">
          <thead>
            <tr><th>Order Ref</th><th>Customer</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td><strong>{o.id}</strong></td>
                <td><div>{o.customerName}</div><span className="admin-table-id">{o.customerEmail}</span></td>
                <td>{o.date}</td>
                <td>{o.items.length} garments</td>
                <td><strong>৳{o.total.toFixed(2)}</strong></td>
                <td>
                  {/* Status Dropdown */}
                  <select className="admin-status-select" value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /**
   * Render Categories Tab
   * Shows data table of taxonomy categories
   */
  const renderCategories = () => (
    <div className="admin-table-card">
      <div className="admin-table-toolbar">
        <span className="admin-table-title-large">Taxonomy Categories</span>
        <Button variant="primary" size="sm" onClick={() => setIsCategoryModalOpen(true)}>+ New Category</Button>
      </div>

      {/* Categories Data Table */}
      <div className="admin-table-responsive">
        <table className="admin-table">
          <thead>
            <tr><th>Cover</th><th>Name</th><th>Slug</th><th>Item Count</th></tr>
          </thead>
          <tbody>
            {(categories.length > 0 ? categories : INITIAL_CATEGORIES).map((c) => (
              <tr key={c.id}>
                <td><img src={c.image} alt="" className="admin-table-img" /></td>
                <td><strong>{c.name}</strong></td>
                <td><code className="admin-table-id">{c.slug}</code></td>
                <td>{c.itemCount} active garments</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ==========================================================================
  // MAIN COMPONENT RENDER
  // ==========================================================================
  return (
    <div className="admin-layout">
      {/* 
        Sidebar Backdrop (Mobile Only)
        Clicking this overlay closes the sidebar menu. 
      */}
      <div className={`admin-sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`} onClick={() => setIsSidebarOpen(false)} />

      {/* Sidebar Navigation Menu */}
      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="admin-brand">

          <div className="admin-brand-text">BINASOR</div>
        </div>

        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}>
            <Home size={18} /> Dashboard
          </button>

          <button className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`} onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}>
            <Box size={18} /> Products
          </button>
          <button className={`admin-nav-item`} onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}>
            <Tag size={18} /> Offers
          </button>

          <button className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }}>
            <ShoppingBag size={18} /> Orders
          </button>
          <button className={`admin-nav-item`} onClick={() => setActiveTab('dashboard')}>
            <TrendingUp size={18} /> Sales
          </button>
          <button className={`admin-nav-item`} onClick={() => setActiveTab('dashboard')}>
            <Users size={18} /> Customer
          </button>

          <button className={`admin-nav-item admin-sidebar-logout`} onClick={adminLogout}>
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Right-Side Content Area */}
      <main className="admin-main">

        {/* Top Header Row (Contains Hamburger Toggle & Search) */}
        <header className="admin-header">
          <button className="admin-mobile-menu-toggle" onClick={() => setIsSidebarOpen(true)} aria-label="Open navigation"><Layers size={20} /></button>
          <h1>{activeTab === 'dashboard' ? 'Overview' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>

          <div className="admin-header-right">
            <div className="admin-search-bar">
              <Search size={16} color="#94a3b8" />
              <input type="text" placeholder="Search..." />
            </div>
          </div>
        </header>

        {/* Dynamic Content Viewport (Injects component based on active tab) */}
        <div className="admin-content">
          {activeTab === 'dashboard' && renderOverview()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'categories' && renderCategories()}
          {activeTab === 'orders' && renderOrders()}
        </div>
      </main>

      {/* 
        Product Creation / Editing Modal Overlay
        Form elements are styled using predefined CSS classes
      */}
      {isProductModalOpen && (
        <AdminModal title={editingProductId ? 'Edit Product' : 'Add New Product'} onClose={() => setIsProductModalOpen(false)}>
          <form onSubmit={handleSaveProduct} className="admin-modal-form">

            {/* Top row with 2 equal columns */}
            <div className="admin-modal-grid-2">
              <div>
                <label className="admin-modal-label">Name *</label>
                <input type="text" required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} className="admin-modal-input" />
              </div>
              <div>
                <label className="admin-modal-label">Category</label>
                <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })} className="admin-modal-input">
                  {(categories.length > 0 ? categories : INITIAL_CATEGORIES).map((c) => (<option key={c.id} value={c.name}>{c.name}</option>))}
                </select>
              </div>
            </div>

            {/* Middle row with 3 equal columns */}
            <div className="admin-modal-grid-3">
              <div>
                <label className="admin-modal-label">Price (৳) *</label>
                <input type="number" step="0.01" required value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })} className="admin-modal-input" />
              </div>
              <div>
                <label className="admin-modal-label">Original Price</label>
                <input type="number" step="0.01" value={productForm.originalPrice || ''} onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value ? Number(e.target.value) : undefined })} className="admin-modal-input" />
              </div>
              <div>
                <label className="admin-modal-label">Stock Count</label>
                <input type="number" value={productForm.stockCount} onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })} className="admin-modal-input" />
              </div>
            </div>

            {/* Full-width inputs */}
            <div>
              <label className="admin-modal-label">Image URL</label>
              <input type="url" value={productForm.image} onChange={(e) => setProductForm({ ...productForm, image: e.target.value })} className="admin-modal-input" />
            </div>
            <div>
              <label className="admin-modal-label">Description</label>
              <textarea rows={3} value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="admin-modal-input" />
            </div>

            {/* Toggles (Checkboxes) */}
            <div className="admin-modal-checkboxes">
              <label className="admin-modal-checkbox-label"><input type="checkbox" checked={productForm.inStock} onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })} /> In Stock</label>
              <label className="admin-modal-checkbox-label"><input type="checkbox" checked={productForm.isOnSale} onChange={(e) => setProductForm({ ...productForm, isOnSale: e.target.checked })} /> On Sale</label>
              <label className="admin-modal-checkbox-label"><input type="checkbox" checked={productForm.isFeatured} onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })} /> Featured</label>
            </div>

            {/* Footer Buttons */}
            <div className="admin-modal-footer">
              <Button variant="ghost" size="sm" onClick={() => setIsProductModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" size="sm" className="admin-btn-save">{editingProductId ? 'Update Product' : 'Save Product'}</Button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* 
        Category Creation Modal Overlay 
      */}
      {isCategoryModalOpen && (
        <AdminModal title="New Category" maxWidth="28rem" onClose={() => setIsCategoryModalOpen(false)}>
          <form onSubmit={handleSaveCategory} className="admin-modal-form">
            <div>
              <label className="admin-modal-label">Name *</label>
              <input type="text" required value={categoryNameInput} onChange={(e) => setCategoryNameInput(e.target.value)} className="admin-modal-input" />
            </div>
            <div>
              <label className="admin-modal-label">Cover Image URL</label>
              <input type="url" value={categoryImageInput} onChange={(e) => setCategoryImageInput(e.target.value)} className="admin-modal-input" />
            </div>
            <div className="admin-modal-footer">
              <Button variant="ghost" size="sm" onClick={() => setIsCategoryModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" size="sm" className="admin-btn-save">Save</Button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
};
