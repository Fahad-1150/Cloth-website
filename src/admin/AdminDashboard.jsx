/**
 * ============================================================================
 * BinAsor ATELIER - ADMIN DASHBOARD & STORE MANAGEMENT
 * ============================================================================
 * Administrative back-office interface for inventory management, product CRUD,
 * category taxonomy additions, and customer order fulfillment tracking.
 */

import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Lock,
  Plus,
  Edit2,
  Trash2,
  ShoppingBag,
  TrendingUp,
  Package,
  Layers,
  LogOut,
  X,
  Check,
  Search,
  ExternalLink,
} from 'lucide-react';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  /* ==========================================================================
     GLOBAL STORE HOOKS
     ========================================================================== */
  const {
    products,
    categories,
    orders,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductSale,
    addCategory,
    updateOrderStatus,
    navigateToProduct,
  } = useStore();

  /* ==========================================================================
     LOCAL AUTH & NAVIGATION STATE
     ========================================================================== */
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [tableSearch, setTableSearch] = useState('');

  /* ==========================================================================
     MODAL CONTROLS & FORM STATE
     ========================================================================== */
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryNameInput, setCategoryNameInput] = useState('');
  const [categoryImageInput, setCategoryImageInput] = useState('');

  /* Product Add/Edit Form */
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Women',
    department: 'Women',
    price: 99,
    originalPrice: undefined,
    image: '',
    galleryInput: '',
    badge: '',
    description: '',
    sizesInput: 'XS, S, M, L, XL',
    colorsInput: 'Black (#18181B), Ivory (#FDFBF7)',
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    isOnSale: false,
  });

  /* ==========================================================================
     AUTHENTICATION HANDLERS
     ========================================================================== */
  const handleLogin = (e) => {
    e.preventDefault();
    adminLogin(passwordInput);
  };

  const handleQuickDemoLogin = () => {
    adminLogin('admin123');
  };

  /* ==========================================================================
     PRODUCT MODAL HANDLERS
     ========================================================================== */
  const handleOpenAddModal = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: categories[0]?.name || 'Women',
      department: 'Women',
      price: 120,
      originalPrice: undefined,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80',
      galleryInput: '',
      badge: 'New',
      description: 'Crafted from premium sustainable materials with an intentional minimalist silhouette.',
      sizesInput: 'XS, S, M, L, XL',
      colorsInput: 'Sand (#D1CCC0), Slate (#475569)',
      inStock: true,
      stockCount: 20,
      isFeatured: true,
      isOnSale: false,
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    setEditingProductId(p.id);
    setProductForm({
      name: p.name,
      category: p.category,
      department: p.department,
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      galleryInput: (p.gallery || []).join(', '),
      badge: p.badge || '',
      description: p.description,
      sizesInput: (p.sizes || []).join(', '),
      colorsInput: (p.colors || []).map((c) => `${c.name} (${c.hex})`).join(', '),
      inStock: p.inStock,
      stockCount: p.stockCount,
      isFeatured: Boolean(p.isFeatured),
      isOnSale: Boolean(p.isOnSale),
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();

    // Parse sizes
    const sizes = productForm.sizesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Parse colors
    const colors = productForm.colorsInput
      .split(',')
      .map((part) => {
        const match = part.match(/(.*?)\((#.*?)\)/);
        if (match) {
          return { name: match[1].trim(), hex: match[2].trim() };
        }
        return { name: part.trim(), hex: '#18181B' };
      })
      .filter((c) => c.name);

    // Parse gallery
    const gallery = productForm.galleryInput
      .split(',')
      .map((g) => g.trim())
      .filter(Boolean);

    const payload = {
      name: productForm.name,
      category: productForm.category,
      department: productForm.department,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
      image: productForm.image,
      gallery: gallery.length > 0 ? gallery : [productForm.image],
      badge: productForm.badge || undefined,
      description: productForm.description,
      sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L'],
      colors: colors.length > 0 ? colors : [{ name: 'Black', hex: '#18181B' }],
      inStock: Boolean(productForm.inStock),
      stockCount: Number(productForm.stockCount),
      isFeatured: Boolean(productForm.isFeatured),
      isOnSale: Boolean(productForm.isOnSale),
      rating: 4.9,
      reviewCount: 12,
    };

    if (editingProductId) {
      updateProduct(editingProductId, payload);
    } else {
      addProduct(payload);
    }

    setIsProductModalOpen(false);
  };

  /* ==========================================================================
     CATEGORY MODAL HANDLERS
     ========================================================================== */
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!categoryNameInput.trim()) return;

    addCategory({
      name: categoryNameInput.trim(),
      slug: categoryNameInput.trim().toLowerCase().replace(/\s+/g, '-'),
      image:
        categoryImageInput.trim() ||
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80',
      description: `Luxury essentials curated under ${categoryNameInput.trim()}`,
    });

    setCategoryNameInput('');
    setCategoryImageInput('');
    setIsCategoryModalOpen(false);
  };

  /* ==========================================================================
     REVENUE & METRIC COMPUTATIONS
     ========================================================================== */
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalItemsSold = orders.reduce(
    (sum, o) => sum + o.items.reduce((iSum, item) => iSum + item.quantity, 0),
    0
  );

  /* Filter products table based on search query */
  const filteredTableProducts = products.filter((p) => {
    if (showOnlySale && !p.isOnSale && p.badge !== 'Sale') return false;
    if (!tableSearch) return true;
    return (
      p.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(tableSearch.toLowerCase()) ||
      p.id.toLowerCase().includes(tableSearch.toLowerCase())
    );
  });

  /* ==========================================================================
     AUTHENTICATION GATE SCREEN
     ========================================================================== */
  if (!isAdminLoggedIn) {
    return (
      <div className="admin-page-wrapper">
        <div className="admin-login-wrapper">
          <div className="admin-login-card">
            <div className="admin-login-icon">
              <Lock size={24} />
            </div>

            <h1 className="admin-login-title">Atelier Back-Office</h1>
            <p className="admin-login-desc">
              Restricted management portal for inventory, catalog curation, and client orders.
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password (admin123)"
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  fontSize: '0.8125rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  outline: 'none',
                }}
              />

              <Button type="submit" variant="primary" size="md" fullWidth>
                Authenticate Access
              </Button>

              <button
                type="button"
                onClick={handleQuickDemoLogin}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.75rem',
                  color: '#64748b',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                Quick Demo 1-Click Access (admin123)
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* ==========================================================================
     AUTHENTICATED ADMIN DASHBOARD VIEW
     ========================================================================== */
  return (
    <div className="admin-page-wrapper">
      <div className="admin-container">
        {/* Topbar & Logout Action */}
        <div className="admin-topbar">
          <div>
            <div className="admin-eyebrow">Platform Administration</div>
            <h1 className="admin-title">Store Management</h1>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenAddModal}
              icon={<Plus size={14} />}
              iconPosition="left"
            >
              Add Product
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={adminLogout}
              icon={<LogOut size={14} />}
              iconPosition="right"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Metric KPI Cards */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-icon-wrap">
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="admin-stat-label">Gross Revenue</div>
              <div className="admin-stat-value">৳{totalRevenue.toFixed(2)}</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon-wrap">
              <Package size={20} />
            </div>
            <div>
              <div className="admin-stat-label">Total Orders</div>
              <div className="admin-stat-value">{orders.length}</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon-wrap">
              <ShoppingBag size={20} />
            </div>
            <div>
              <div className="admin-stat-label">Live Garments</div>
              <div className="admin-stat-value">{products.length}</div>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon-wrap">
              <Layers size={20} />
            </div>
            <div>
              <div className="admin-stat-label">Categories</div>
              <div className="admin-stat-value">{categories.length}</div>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="admin-tabs-bar">
          <button
            type="button"
            onClick={() => setActiveTab('products')}
            className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          >
            <ShoppingBag size={15} />
            <span>Products Inventory ({products.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          >
            <Package size={15} />
            <span>Orders Management ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`admin-tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
          >
            <Layers size={15} />
            <span>Categories ({categories.length})</span>
          </button>
        </div>

        {/* Tab 1: Products Table */}
        {activeTab === 'products' && (
          <div className="admin-table-card">
            <div className="admin-table-toolbar">
              <div className="admin-search-wrap">
                <Search size={14} color="#94a3b8" />
                <input
                  type="text"
                  placeholder="Search products by name or category..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <label style={{ fontSize: '0.75rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={showOnlySale}
                    onChange={(e) => setShowOnlySale(e.target.checked)}
                    className="accent-neutral-950"
                  />
                  <span>Sale items only</span>
                </label>

                <Button variant="primary" size="sm" onClick={handleOpenAddModal}>
                  + New Product
                </Button>
              </div>
            </div>

            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTableProducts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img
                            src={p.image}
                            alt=""
                            style={{ width: '2.5rem', height: '3rem', objectFit: 'cover', borderRadius: '3px', backgroundColor: '#f1f5f9' }}
                          />
                          <div>
                            <strong style={{ color: '#0f172a', display: 'block' }}>{p.name}</strong>
                            <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>{p.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>{p.category}</td>
                      <td>
                        <strong>৳{p.price.toFixed(2)}</strong>
                        {p.originalPrice && (
                          <span style={{ fontSize: '0.6875rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '0.375rem' }}>
                            ৳{p.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td>
                        {p.inStock ? (
                          <span style={{ color: '#16a34a', fontWeight: 600 }}>In Stock ({p.stockCount})</span>
                        ) : (
                          <span style={{ color: '#dc2626', fontWeight: 600 }}>Out of Stock</span>
                        )}
                      </td>
                      <td>
                        {p.isOnSale || p.badge === 'Sale' ? (
                          <Badge variant="sale">On Sale</Badge>
                        ) : p.badge === 'New' ? (
                          <Badge variant="new">New</Badge>
                        ) : (
                          <Badge variant="neutral">Regular</Badge>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.375rem' }}>
                          <button
                            type="button"
                            onClick={() => toggleProductSale(p.id)}
                            title="Toggle Sale Status"
                            style={{ padding: '0.375rem', border: '1px solid #e2e8f0', borderRadius: '3px', background: '#ffffff', cursor: 'pointer', fontSize: '0.6875rem' }}
                          >
                            {p.isOnSale ? 'Sale: ON' : 'Sale: OFF'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(p)}
                            title="Edit Product"
                            style={{ padding: '0.375rem', border: '1px solid #e2e8f0', borderRadius: '3px', background: '#ffffff', cursor: 'pointer' }}
                          >
                            <Edit2 size={13} color="#475569" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProduct(p.id)}
                            title="Delete Product"
                            style={{ padding: '0.375rem', border: '1px solid #fee2e2', borderRadius: '3px', background: '#fff5f5', cursor: 'pointer' }}
                          >
                            <Trash2 size={13} color="#dc2626" />
                          </button>
                          <button
                            type="button"
                            onClick={() => navigateToProduct(p.id)}
                            title="View PDP"
                            style={{ padding: '0.375rem', border: '1px solid #e2e8f0', borderRadius: '3px', background: '#ffffff', cursor: 'pointer' }}
                          >
                            <ExternalLink size={13} color="#475569" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Management */}
        {activeTab === 'orders' && (
          <div className="admin-table-card">
            <div className="admin-table-toolbar">
              <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>All Customer Invoices</span>
            </div>

            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order Ref</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td><strong>{o.id}</strong></td>
                      <td>
                        <div>{o.customerName}</div>
                        <span style={{ fontSize: '0.6875rem', color: '#64748b' }}>{o.customerEmail}</span>
                      </td>
                      <td>{o.date}</td>
                      <td>{o.items.length} garments</td>
                      <td><strong>৳{o.total.toFixed(2)}</strong></td>
                      <td>
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '3px',
                            border: '1px solid #cbd5e1',
                            background: '#ffffff',
                          }}
                        >
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
        )}

        {/* Tab 3: Categories Management */}
        {activeTab === 'categories' && (
          <div className="admin-table-card">
            <div className="admin-table-toolbar">
              <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Taxonomy Categories</span>
              <Button variant="primary" size="sm" onClick={() => setIsCategoryModalOpen(true)}>
                + New Category
              </Button>
            </div>

            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Cover</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Item Count</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <img
                          src={c.image}
                          alt=""
                          style={{ width: '2.5rem', height: '3rem', objectFit: 'cover', borderRadius: '3px' }}
                        />
                      </td>
                      <td><strong>{c.name}</strong></td>
                      <td><code style={{ fontSize: '0.6875rem', color: '#475569' }}>{c.slug}</code></td>
                      <td>{c.itemCount} active garments</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================================================================
            ADD / EDIT PRODUCT MODAL
            ================================================================== */}
        {isProductModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setIsProductModalOpen(false)}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3 className="admin-modal-title">
                  {editingProductId ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Name *</label>
                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', fontSize: '0.8125rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', fontSize: '0.8125rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Price (৳) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      style={{ width: '100%', padding: '0.5rem', fontSize: '0.8125rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Original Price (৳)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={productForm.originalPrice || ''}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                      placeholder="Optional"
                      style={{ width: '100%', padding: '0.5rem', fontSize: '0.8125rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Stock Count</label>
                    <input
                      type="number"
                      value={productForm.stockCount}
                      onChange={(e) => setProductForm({ ...productForm, stockCount: Number(e.target.value) })}
                      style={{ width: '100%', padding: '0.5rem', fontSize: '0.8125rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Image URL</label>
                  <input
                    type="url"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.8125rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.8125rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="accent-neutral-950"
                    />
                    <span>In Stock</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={productForm.isOnSale}
                      onChange={(e) => setProductForm({ ...productForm, isOnSale: e.target.checked })}
                      className="accent-neutral-950"
                    />
                    <span>On Sale</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={productForm.isFeatured}
                      onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                      className="accent-neutral-950"
                    />
                    <span>Featured on Home</span>
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <Button variant="ghost" size="sm" onClick={() => setIsProductModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    {editingProductId ? 'Update Product' : 'Save Product'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================================
            ADD CATEGORY MODAL
            ================================================================== */}
        {isCategoryModalOpen && (
          <div className="admin-modal-overlay" onClick={() => setIsCategoryModalOpen(false)}>
            <div className="admin-modal-card" style={{ maxWidth: '28rem' }} onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3 className="admin-modal-title">New Category</h3>
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Category Name *</label>
                  <input
                    type="text"
                    required
                    value={categoryNameInput}
                    onChange={(e) => setCategoryNameInput(e.target.value)}
                    placeholder="e.g. Knitwear"
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.8125rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>Image URL</label>
                  <input
                    type="url"
                    value={categoryImageInput}
                    onChange={(e) => setCategoryImageInput(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    style={{ width: '100%', padding: '0.5rem', fontSize: '0.8125rem', border: '1px solid #cbd5e1', borderRadius: '3px' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <Button variant="ghost" size="sm" onClick={() => setIsCategoryModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Create Category
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
