/**
 * ============================================================================
 * BinAsor ATELIER - PRODUCT CATALOG & DEMO DATA STORE
 * ============================================================================
 * Handcrafted initial collection catalog, category taxonomies, and initial
 * customer orders for development and demonstration.
 */
// Static asset paths hosted in public/assets/images/ (root-relative for Netlify production)
export const heroModelImg = '/assets/images/hero_fashion_model_1791180041478.jpg';
export const catWomenImg = '/assets/images/cat_women_fashion_1791180101627.jpg';
export const catMenImg = '/assets/images/cat_men_fashion_1791180111441.jpg';
export const catBagImg = '/assets/images/cat_leather_bag_1791180122206.jpg';

/* ============================================================================
   ADMIN DASHBOARD DEMO DATA
   Keep dashboard-only presentation data beside the rest of the mock catalog.
   ============================================================================ */
export const ADMIN_SALES_DATA = [
  { name: '22 Jul', income: 4000, expense: 2400 },
  { name: '23 Jul', income: 3000, expense: 1398 },
  { name: '24 Jul', income: 2000, expense: 2800 },
  { name: '25 Jul', income: 2780, expense: 3908 },
  { name: '26 Jul', income: 3890, expense: 2480 },
  { name: '27 Jul', income: 3390, expense: 2800 },
  { name: '28 Jul', income: 4490, expense: 3300 },
  { name: '29 Jul', income: 5200, expense: 2900 },
];

export const ADMIN_TARGET_DATA = [
  { name: 'Completed', value: 75, color: '#047857' },
  { name: 'Remaining', value: 25, color: '#e7e5e4' },
];

export const ADMIN_OFFERS = [
  { name: '40% Discount Offer', date: 'Expires 05 Aug 2026', progress: 75 },
  { name: '100 Taka Coupon', date: 'Expires 10 Sep 2026', progress: 90 },
  { name: 'Stock Out Sale', date: 'Upcoming 14 Sep 2026', progress: 30, color: '#047857' },
];

/* ==========================================================================
   INITIAL CATEGORIES
   ========================================================================== */
export const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Women',
    slug: 'women',
    itemCount: 120,
    image: catWomenImg,
    description: 'Refined silhouettes and modern luxury essentials for women.'
  },
  {
    id: 'cat-2',
    name: 'Men',
    slug: 'men',
    itemCount: 98,
    image: catMenImg,
    description: 'Precision tailored menswear, minimalist shirts, and layers.'
  },
  {
    id: 'cat-3',
    name: 'Bags',
    slug: 'bags',
    itemCount: 45,
    image: catBagImg,
    description: 'Handcrafted Italian full-grain leather bags and totes.'
  },
  {
    id: 'cat-4',
    name: 'Shoes',
    slug: 'shoes',
    itemCount: 62,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80',
    description: 'Architectural footwear, leather runners, and suede Chelsea boots.'
  },
  {
    id: 'cat-5',
    name: 'Accessories',
    slug: 'accessories',
    itemCount: 35,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
    description: 'Luxury timepieces, sunglasses, and brushed metal jewelry.'
  }
];

/* ==========================================================================
   INITIAL PRODUCTS CATALOG
   ========================================================================== */
export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Oversized Blazer',
    category: 'Women',
    department: 'Women',
    price: 129.00,
    originalPrice: undefined,
    rating: 4.9,
    reviewCount: 48,
    image: heroModelImg,
    gallery: [
      heroModelImg,
      catWomenImg,
    ],
    badge: 'New',
    description: 'Tailored with an intentional relaxed silhouette, this double-breasted oversized blazer is crafted from structured virgin wool blend. Features soft shoulder structure and satin lining for fluid draping.',
    details: [
      'Virgin wool and viscose structured weave',
      'Double-breasted horn button closure',
      'Dual front flap pockets and interior chest pocket',
      'Subtle peak lapels and rear central vent',
      'Dry clean only'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal White', hex: '#F3EFEA' },
      { name: 'Camel Tan', hex: '#C19A6B' },
      { name: 'Charcoal Black', hex: '#1C1917' }
    ],
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    createdAt: '2026-03-01'
  },
  {
    id: 'prod-2',
    name: 'Linen Shirt',
    category: 'Men',
    department: 'Men',
    price: 79.00,
    originalPrice: 99.00,
    rating: 4.7,
    reviewCount: 36,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80'
    ],
    badge: 'Sale',
    description: 'A breathable classic crafted from 100% Normandy flax linen. Garment washed for exceptional softness that improves with every wear, featuring a refined French front placket.',
    details: [
      '100% Normandy certified pure linen',
      'Mother-of-pearl buttons with cross-stitching',
      'Pre-washed for relaxed texture and minimal shrinkage',
      'Curved hem designed to be worn untucked or tucked',
      'Machine wash gentle cold'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sand Grey', hex: '#D1CCC0' },
      { name: 'Pure White', hex: '#FAFAFA' },
      { name: 'Navy Dusk', hex: '#1E293B' }
    ],
    inStock: true,
    stockCount: 24,
    isFeatured: true,
    isOnSale: true,
    createdAt: '2026-03-05'
  },
  {
    id: 'prod-3',
    name: 'Premium Hoodie',
    category: 'Men',
    department: 'Men',
    price: 89.00,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 52,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=700&q=80'
    ],
    badge: 'New',
    description: 'Heavyweight 450 GSM French terry cotton hoodie engineered for supreme drape and longevity. Features double-layered hood without drawstrings for a clean architectural profile.',
    details: [
      '450 GSM combed organic French terry cotton',
      'Seamless double-needle collar and cuff construction',
      'Relaxed drop-shoulder fit',
      'Hidden interior kangaroo pocket stitching',
      'Ribbed side gussets for enhanced mobility'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Slate Heather', hex: '#475569' },
      { name: 'Washed Black', hex: '#27272A' },
      { name: 'Bone White', hex: '#F4F4F5' }
    ],
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    createdAt: '2026-03-10'
  },
  {
    id: 'prod-4',
    name: 'Leather Sneakers',
    category: 'Shoes',
    department: 'Unisex',
    price: 149.00,
    originalPrice: undefined,
    rating: 4.9,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80'
    ],
    badge: undefined,
    description: 'Minimalist low-top sneakers handmade in Portugal using buttery Italian calfskin. Mounted on Margom rubber cupsoles with padded leather insoles for day-long ease.',
    details: [
      'Full-grain Italian calf leather upper and lining',
      'Recycled vulcanized rubber outsoles',
      'Hand-stitched reinforced toe bumper',
      'Waxed organic cotton tonal laces',
      'Includes dust bag and spare insoles'
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Stone Grey', hex: '#94A3B8' },
      { name: 'Triple White', hex: '#FFFFFF' },
      { name: 'Obsidian', hex: '#0F172A' }
    ],
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    createdAt: '2026-02-28'
  },
  {
    id: 'prod-5',
    name: 'Classic Watch',
    category: 'Accessories',
    department: 'Unisex',
    price: 119.00,
    originalPrice: 149.00,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80'
    ],
    badge: 'Sale',
    description: 'Minimalist dress watch featuring a matte black dial, polished gold hour markers, and a quick-release top-grain leather strap. Powered by precision Japanese quartz movement.',
    details: [
      '316L medical-grade stainless steel case (40mm)',
      'Sapphire crystal glass with anti-reflective coating',
      'Precision Japanese Miyota quartz movement',
      '5 ATM water resistance (50 meters)',
      'Interchangeable genuine Italian leather band'
    ],
    sizes: ['One Size (40mm)'],
    colors: [
      { name: 'Gold / Black Leather', hex: '#18181B' },
      { name: 'Silver / Tan Leather', hex: '#A16207' }
    ],
    inStock: true,
    stockCount: 9,
    isFeatured: true,
    isOnSale: true,
    createdAt: '2026-02-20'
  },
  {
    id: 'prod-6',
    name: 'Luxury Baguette Shoulder Bag',
    category: 'Bags',
    department: 'Women',
    price: 185.00,
    originalPrice: 220.00,
    rating: 4.9,
    reviewCount: 42,
    image: catBagImg,
    gallery: [
      catBagImg,
      heroModelImg
    ],
    badge: 'Hot',
    description: 'Compact 90s-inspired baguette bag rendered in smooth vegetable-tanned calfskin. Accented with custom brushed gold hardware and an adjustable shoulder drop.',
    details: [
      '100% full-grain vegetable-tanned leather',
      'Solid brass hardware with pale gold electroplating',
      'Interior zippered pocket and card slip slot',
      'Magnetic flap closure with buckle detail',
      'Dimensions: 26cm W x 14cm H x 6cm D'
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Noir Black', hex: '#09090B' },
      { name: 'Espresso Brown', hex: '#3E2723' },
      { name: 'Ivory Cream', hex: '#FDFBF7' }
    ],
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isOnSale: true,
    createdAt: '2026-03-02'
  },
  {
    id: 'prod-7',
    name: 'Tailored Wool Trousers',
    category: 'Men',
    department: 'Men',
    price: 115.00,
    originalPrice: undefined,
    rating: 4.8,
    reviewCount: 29,
    image: catMenImg,
    gallery: [
      catMenImg
    ],
    badge: 'New',
    description: 'High-waisted single pleat trousers cut in four-season Italian tropical wool. Features an extended tab closure, side adjusters, and a clean tapered break.',
    details: [
      '100% Italian Super 110s tropical wool',
      'Extended horn-button tab waist with brass side cinch buckles',
      'Double reverse front pleats for drape and comfort',
      'Unfinished hems ready for custom tailoring',
      'Dry clean only'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: [
      { name: 'Midnight Charcoal', hex: '#1E293B' },
      { name: 'Warm Taupe', hex: '#78716C' }
    ],
    inStock: true,
    stockCount: 14,
    isFeatured: false,
    createdAt: '2026-03-12'
  },
  {
    id: 'prod-8',
    name: 'Silk Blend Slip Dress',
    category: 'Women',
    department: 'Women',
    price: 135.00,
    originalPrice: 175.00,
    rating: 4.9,
    reviewCount: 31,
    image: catWomenImg,
    gallery: [
      catWomenImg,
      heroModelImg
    ],
    badge: 'Sale',
    description: 'Cut on the bias for an effortless liquid silhouette that skims the body. Features ultra-fine adjustable spaghetti straps and a subtle cowl neckline.',
    details: [
      '92% Mulberry silk, 8% elastane for slight give',
      'Bias-cut construction contours naturally without clinging',
      'French seam finishes throughout',
      'Ankle midi length with side slit',
      'Hand wash cold or dry clean'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne Beige', hex: '#E2D4C0' },
      { name: 'Classic Black', hex: '#18181B' },
      { name: 'Emerald', hex: '#064E3B' }
    ],
    inStock: true,
    stockCount: 11,
    isFeatured: false,
    isOnSale: true,
    createdAt: '2026-03-08'
  }
];

/* ==========================================================================
   INITIAL ORDERS
   ========================================================================== */
export const INITIAL_ORDERS = [
  {
    id: 'LX-8924',
    date: '2026-10-02',
    customerName: 'Eleanor Vance',
    customerEmail: 'eleanor.v@example.com',
    shippingAddress: {
      address: '742 Evergreen Terrace',
      city: 'Springfield',
      postalCode: '97477',
      country: 'United States'
    },
    items: [
      {
        id: 'cart-1',
        productId: 'prod-1',
        product: INITIAL_PRODUCTS[0],
        selectedSize: 'M',
        selectedColor: 'Oatmeal White',
        quantity: 1
      },
      {
        id: 'cart-2',
        productId: 'prod-5',
        product: INITIAL_PRODUCTS[4],
        selectedSize: 'One Size (40mm)',
        selectedColor: 'Gold / Black Leather',
        quantity: 1
      }
    ],
    subtotal: 248.00,
    discount: 0,
    shipping: 0,
    total: 248.00,
    paymentMethod: 'credit_card',
    status: 'Processing'
  },
  {
    id: 'LX-8919',
    date: '2026-09-29',
    customerName: 'Marcus Sterling',
    customerEmail: 'm.sterling@example.com',
    shippingAddress: {
      address: '12 Kensington High St',
      city: 'London',
      postalCode: 'W8 4PT',
      country: 'United Kingdom'
    },
    items: [
      {
        id: 'cart-3',
        productId: 'prod-2',
        product: INITIAL_PRODUCTS[1],
        selectedSize: 'L',
        selectedColor: 'Sand Grey',
        quantity: 2
      }
    ],
    subtotal: 158.00,
    discount: 15.80,
    shipping: 0,
    total: 142.20,
    paymentMethod: 'apple_pay',
    status: 'Shipped'
  }
];
