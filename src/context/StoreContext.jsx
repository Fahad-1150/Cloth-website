/**
 * ============================================================================
 * BinAsor ATELIER - GLOBAL APPLICATION STATE STORE
 * ============================================================================
 * Centralized React Context managing catalog inventory, shopping bag,
 * personal wishlist, simulated checkout orders, administrative authentication,
 * and ephemeral alert toasts.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_ORDERS } from '../data/mockData';

/* ==========================================================================
   CONTEXT INITIALIZATION
   ========================================================================== */
const StoreContext = createContext(undefined);

/* LocalStorage persistent keys (v2 for production assets) */
const STORAGE_KEYS = {
  PRODUCTS: 'BinAsor_products_v2',
  CATEGORIES: 'BinAsor_categories_v2',
  CART: 'BinAsor_cart_v2',
  WISHLIST: 'BinAsor_wishlist_v2',
  ORDERS: 'BinAsor_orders_v2',
  ADMIN_AUTH: 'BinAsor_admin_auth_v2',
};

// Legacy keys for automatic migration
const LEGACY_STORAGE_KEYS = {
  PRODUCTS: 'BinAsor_products_v1',
  CATEGORIES: 'BinAsor_categories_v1',
  CART: 'BinAsor_cart_v1',
  WISHLIST: 'BinAsor_wishlist_v1',
  ORDERS: 'BinAsor_orders_v1',
};

/**
 * Normalizes image paths to ensure full compatibility with Vite production builds,
 * Netlify static routing, and persistent browser storage.
 */
const normalizeImagePath = (imgUrl) => {
  if (!imgUrl || typeof imgUrl !== 'string') return imgUrl;

  // External URLs (e.g. Unsplash, CDN, or base64 data URLs)
  if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://') || imgUrl.startsWith('data:')) {
    return imgUrl;
  }

  // Known catalog static assets mapped to public/assets/images/
  const knownAssets = [
    'hero_fashion_model_1791180041478',
    'cat_women_fashion_1791180101627',
    'cat_men_fashion_1791180111441',
    'cat_leather_bag_1791180122206',
    'summer_sale_banner_1791180091588',
    'summer_resort_linen_1791181012178',
  ];

  for (const asset of knownAssets) {
    if (imgUrl.includes(asset)) {
      return `/assets/images/${asset}.jpg`;
    }
  }

  // Ensure root-relative format (starts with /) for nested routes
  if (imgUrl.startsWith('./')) {
    return `/${imgUrl.slice(2)}`;
  }
  if (!imgUrl.startsWith('/')) {
    return `/${imgUrl}`;
  }

  return imgUrl;
};

const sanitizeProduct = (p) => {
  if (!p) return p;
  return {
    ...p,
    image: normalizeImagePath(p.image),
    gallery: Array.isArray(p.gallery) ? p.gallery.map(normalizeImagePath) : [],
  };
};

const sanitizeCategory = (c) => {
  if (!c) return c;
  return {
    ...c,
    image: normalizeImagePath(c.image),
  };
};

/* ==========================================================================
   STORE PROVIDER COMPONENT
   ========================================================================== */
export const StoreProvider = ({ children }) => {
  /* --------------------------------------------------------------------------
     1. INVENTORY & CATALOG STATE
     -------------------------------------------------------------------------- */
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS) || localStorage.getItem(LEGACY_STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeProduct);
        }
      }
      return INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES) || localStorage.getItem(LEGACY_STORAGE_KEYS.CATEGORIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeCategory);
        }
      }
      return INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  /* --------------------------------------------------------------------------
     2. SHOPPING BAG & WISHLIST STATE
     -------------------------------------------------------------------------- */
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART) || localStorage.getItem(LEGACY_STORAGE_KEYS.CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => ({
            ...item,
            product: sanitizeProduct(item.product),
          }));
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST) || localStorage.getItem(LEGACY_STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  /* --------------------------------------------------------------------------
     3. ORDER MANAGEMENT & ADMIN AUTH STATE
     -------------------------------------------------------------------------- */
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS) || localStorage.getItem(LEGACY_STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((o) => ({
            ...o,
            items: Array.isArray(o.items)
              ? o.items.map((it) => ({
                  ...it,
                  product: sanitizeProduct(it.product),
                }))
              : [],
          }));
        }
      }
      return INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return (
        localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true' ||
        localStorage.getItem('BinAsor_admin_auth_v1') === 'true'
      );
    } catch {
      return false;
    }
  });

  /* --------------------------------------------------------------------------
     4. ACTIVE NAVIGATION & OVERLAY MODAL STATE
     -------------------------------------------------------------------------- */
  const [activePage, setActivePage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);
  const [toasts, setToasts] = useState([]);

  /* --------------------------------------------------------------------------
     5. LOCAL STORAGE SYNCHRONIZATION
     -------------------------------------------------------------------------- */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  /* --------------------------------------------------------------------------
     6. TOAST NOTIFICATION HANDLERS
     -------------------------------------------------------------------------- */
  const showToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  /* --------------------------------------------------------------------------
     7. SHOPPING BAG OPERATIONS
     -------------------------------------------------------------------------- */
  const addToCart = (product, size, color, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          id: `${product.id}-${size}-${color}-${Date.now()}`,
          productId: product.id,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity,
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added "${product.name}" to cart`);
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  /* --------------------------------------------------------------------------
     8. WISHLIST OPERATIONS
     -------------------------------------------------------------------------- */
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  /* --------------------------------------------------------------------------
     9. DEEP NAVIGATION HELPERS
     -------------------------------------------------------------------------- */
  const navigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (categoryName) => {
    setSelectedCategoryFilter(categoryName);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* --------------------------------------------------------------------------
     10. ADMIN AUTHENTICATION
     -------------------------------------------------------------------------- */
  const adminLogin = (password) => {
    // Standard credential checking for prototype administration
    if (password === 'admin123' || password === 'admin') {
      setIsAdminLoggedIn(true);
      showToast('Logged in to Admin Dashboard', 'success');
      return true;
    }
    showToast('Invalid credentials. Hint: use admin123', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    showToast('Logged out of Admin Dashboard', 'info');
    setActivePage('home');
  };

  /* --------------------------------------------------------------------------
     11. PRODUCT CRUD OPERATIONS
     -------------------------------------------------------------------------- */
  const addProduct = (productData) => {
    const newProduct = sanitizeProduct({
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    });
    setProducts((prev) => [newProduct, ...prev]);

    // Increment category tally
    setCategories((prev) =>
      prev.map((cat) =>
        cat.name.toLowerCase() === newProduct.category.toLowerCase()
          ? { ...cat, itemCount: cat.itemCount + 1 }
          : cat
      )
    );

    showToast(`Product "${newProduct.name}" created successfully!`, 'success');
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? sanitizeProduct({ ...p, ...updatedFields }) : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id) => {
    const toDelete = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (toDelete) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.name.toLowerCase() === toDelete.category.toLowerCase()
            ? { ...cat, itemCount: Math.max(0, cat.itemCount - 1) }
            : cat
        )
      );
    }
    showToast('Product deleted', 'info');
  };

  const toggleProductSale = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const newSaleStatus = !p.isOnSale;
          return {
            ...p,
            isOnSale: newSaleStatus,
            badge: newSaleStatus ? 'Sale' : p.badge === 'Sale' ? undefined : p.badge,
          };
        }
        return p;
      })
    );
    showToast('Product sale status updated', 'success');
  };

  /* --------------------------------------------------------------------------
     12. CATEGORY CRUD OPERATIONS
     -------------------------------------------------------------------------- */
  const addCategory = (catData) => {
    const newCat = sanitizeCategory({
      ...catData,
      id: `cat-${Date.now()}`,
      itemCount: 0,
    });
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCat.name}" added`, 'success');
  };

  /* --------------------------------------------------------------------------
     13. ORDER CHECKOUT & FULFILLMENT
     -------------------------------------------------------------------------- */
  const placeOrder = (orderData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      ...orderData,
      id: `LX-${randomNum}`,
      date: new Date().toISOString().split('T')[0],
      items: Array.isArray(orderData.items)
        ? orderData.items.map((it) => ({
            ...it,
            product: sanitizeProduct(it.product),
          }))
        : [],
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    showToast(`Order ${orderId} marked as ${status}`, 'success');
  };

  /* ==========================================================================
     CONTEXT VALUE DISTRIBUTION
     ========================================================================== */
  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        orders,
        activePage,
        setActivePage,
        selectedProductId,
        setSelectedProductId,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        toggleWishlist,
        isWishlisted,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductSale,
        addCategory,
        placeOrder,
        updateOrderStatus,
        toasts,
        showToast,
        dismissToast,
        navigateToProduct,
        navigateToCategory,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

/* ==========================================================================
   HOOK FOR CONSUMING STORE
   ========================================================================== */
export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export default StoreContext;
