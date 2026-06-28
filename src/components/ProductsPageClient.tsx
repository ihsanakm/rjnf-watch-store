'use client';

import { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, X, ArrowLeft, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import ProductModal from './ProductModal';

/* ───────────────── Types ───────────────── */
export type ProductItem = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  priceFormatted: string;
  movement: string;
  image: string;
  images?: string[];
  // Product Details
  overview?: string;
  model?: string;
  display?: string;
  gender?: string;
  caseMaterial?: string;
  caseDiameter?: string;
  caseThickness?: string;
  dialColor?: string;
  glassType?: string;
  strapMaterial?: string;
  strapColor?: string;
  strapLength?: string;
  strapWidth?: string;
  claspType?: string;
  waterResistance?: string;
  weight?: string;
  keyFeatures?: string[];
  packageIncludes?: string[];
  warranty?: string;
  shippingDelivery?: string[];
  careInstructions?: string[];
};

/* ───────────────── Demo Data ───────────────── */
export const IMAGES = [
  '/watch_collection_1.png',
  '/watch_collection_2.png',
  '/watch_collection_1.png',
  '/watch_collection_2.png',
];

export const DEMO_PRODUCTS: ProductItem[] = [
  // Men's Collection - Automatic
  { id: 1, name: 'Binbond Skeletal Auto', brand: 'Binbond', category: "Men's Collection", price: 24500, priceFormatted: 'LKR 24,500', movement: 'Automatic', image: '/watch_collection_1.png' },
  { id: 2, name: 'Longlux Executive Auto', brand: 'Longlux', category: "Men's Collection", price: 32000, priceFormatted: 'LKR 32,000', movement: 'Automatic', image: '/watch_collection_2.png' },
  { id: 3, name: 'Poedagar Prestige Auto', brand: 'Poedagar', category: "Men's Collection", price: 27500, priceFormatted: 'LKR 27,500', movement: 'Automatic', image: '/watch_collection_1.png' },
  { 
    id: 4, 
    name: 'Wojtek Vanguard Auto', 
    brand: 'Wojtek', 
    category: "Men's Collection", 
    price: 29000, 
    priceFormatted: 'LKR 29,000', 
    movement: 'Automatic', 
    image: '/watch_collection_2.png',
    overview: 'Enhance your style with the WOJTEK, a premium timepiece that combines elegant design with reliable performance. Crafted with high-quality materials and attention to detail, this watch is suitable for business, casual, and special occasions. Its sophisticated appearance and comfortable fit make it an excellent choice for everyday wear.',
    model: 'RJNF-WT-010',
    display: 'Analog',
    gender: 'Men',
    caseMaterial: 'Stainless Steel',
    caseDiameter: '40 mm',
    caseThickness: '12 mm',
    dialColor: 'White',
    glassType: 'Sapphire Crystal',
    strapMaterial: 'Leather',
    strapColor: 'Brown/Black',
    strapLength: '22 cm',
    strapWidth: '20 mm',
    claspType: 'Buckle',
    waterResistance: '5 ATM',
    weight: '75g',
    keyFeatures: [
      'Premium Automatic movement',
      'Durable Stainless Steel construction',
      'Scratch-resistant Sapphire Crystal',
      'Comfortable and secure fit',
      'Elegant design suitable for business and casual wear',
      'Water-resistant for daily use',
      'High-quality finish with attention to detail'
    ],
    packageIncludes: [
      '1 × WOJTEK',
      'Premium Watch Box',
      'RJNF Warranty Card',
      'User Manual (if available)'
    ],
    warranty: 'This product includes a 1-Year RJNF Warranty covering manufacturing defects. Damage caused by accidents, misuse, water exposure beyond the stated rating, or normal wear and tear is not covered.',
    shippingDelivery: [
      'Islandwide delivery across Sri Lanka',
      'Secure packaging',
      'Fast order processing',
      'Tracking details provided after dispatch'
    ],
    careInstructions: [
      'Avoid strong impacts and dropping the watch.',
      'Keep the watch clean using a soft microfiber cloth.',
      'Avoid exposure to strong magnetic fields.',
      'Follow the water-resistance guidelines for your model.',
      'Store the watch in a dry place when not in use.'
    ]
  },
  { id: 5, name: 'Forsining Tourbillon Auto', brand: 'Forsining', category: "Men's Collection", price: 35000, priceFormatted: 'LKR 35,000', movement: 'Automatic', image: '/watch_collection_1.png' },

  // Men's Collection - Quartz
  { id: 6, name: 'Binbond Stealth Quartz', brand: 'Binbond', category: "Men's Collection", price: 18500, priceFormatted: 'LKR 18,500', movement: 'Quartz', image: '/watch_collection_2.png' },
  { id: 7, name: 'Longlux Classic Quartz', brand: 'Longlux', category: "Men's Collection", price: 22000, priceFormatted: 'LKR 22,000', movement: 'Quartz', image: '/watch_collection_1.png' },
  { id: 8, name: 'Poedagar Sport Quartz', brand: 'Poedagar', category: "Men's Collection", price: 19500, priceFormatted: 'LKR 19,500', movement: 'Quartz', image: '/watch_collection_2.png' },
  { id: 9, name: 'Wojtek Element Quartz', brand: 'Wojtek', category: "Men's Collection", price: 21000, priceFormatted: 'LKR 21,000', movement: 'Quartz', image: '/watch_collection_1.png' },
  { id: 10, name: 'Forsining Quartz Special', brand: 'Forsining', category: "Men's Collection", price: 23500, priceFormatted: 'LKR 23,500', movement: 'Quartz', image: '/watch_collection_2.png' },

  // Women's Collection - Automatic
  { id: 11, name: 'Binbond Graceful Lady', brand: 'Binbond', category: "Women's Collection", price: 22500, priceFormatted: 'LKR 22,500', movement: 'Automatic', image: '/watch_collection_1.png' },
  { id: 12, name: 'Longlux Velvet Auto', brand: 'Longlux', category: "Women's Collection", price: 28500, priceFormatted: 'LKR 28,500', movement: 'Automatic', image: '/watch_collection_2.png' },
  { id: 13, name: 'Poedagar Aurora Pearl', brand: 'Poedagar', category: "Women's Collection", price: 25000, priceFormatted: 'LKR 25,000', movement: 'Automatic', image: '/watch_collection_1.png' },
  { id: 14, name: 'Wojtek Empress Gold', brand: 'Wojtek', category: "Women's Collection", price: 29500, priceFormatted: 'LKR 29,500', movement: 'Automatic', image: '/watch_collection_2.png' },
  { id: 15, name: 'Forsining Starlight Sky', brand: 'Forsining', category: "Women's Collection", price: 31000, priceFormatted: 'LKR 31,000', movement: 'Automatic', image: '/watch_collection_1.png' },

  // Women's Collection - Quartz
  { id: 16, name: 'Binbond Diamond Quartz', brand: 'Binbond', category: "Women's Collection", price: 16500, priceFormatted: 'LKR 16,500', movement: 'Quartz', image: '/watch_collection_2.png' },
  { id: 17, name: 'Longlux Rose Quartz', brand: 'Longlux', category: "Women's Collection", price: 19500, priceFormatted: 'LKR 19,500', movement: 'Quartz', image: '/watch_collection_1.png' },
  { id: 18, name: 'Poedagar Crystal Quartz', brand: 'Poedagar', category: "Women's Collection", price: 17500, priceFormatted: 'LKR 17,500', movement: 'Quartz', image: '/watch_collection_2.png' },
  { id: 19, name: 'Wojtek Petite Quartz', brand: 'Wojtek', category: "Women's Collection", price: 18000, priceFormatted: 'LKR 18,000', movement: 'Quartz', image: '/watch_collection_1.png' },
  { id: 20, name: 'Forsining Glamour Quartz', brand: 'Forsining', category: "Women's Collection", price: 20500, priceFormatted: 'LKR 20,500', movement: 'Quartz', image: '/watch_collection_2.png' },

  // Couple Collection - Automatic
  { id: 21, name: 'Binbond Duo Eternal Auto', brand: 'Binbond', category: "Couple Collection", price: 45000, priceFormatted: 'LKR 45,000', movement: 'Automatic', image: '/watch_collection_1.png' },
  { id: 22, name: 'Longlux Alliance Auto', brand: 'Longlux', category: "Couple Collection", price: 54000, priceFormatted: 'LKR 54,000', movement: 'Automatic', image: '/watch_collection_2.png' },
  { id: 23, name: 'Poedagar Unity Auto', brand: 'Poedagar', category: "Couple Collection", price: 48000, priceFormatted: 'LKR 48,000', movement: 'Automatic', image: '/watch_collection_1.png' },
  { id: 24, name: 'Wojtek Concord Auto', brand: 'Wojtek', category: "Couple Collection", price: 51000, priceFormatted: 'LKR 51,000', movement: 'Automatic', image: '/watch_collection_2.png' },
  { id: 25, name: 'Forsining Harmony Auto', brand: 'Forsining', category: "Couple Collection", price: 58000, priceFormatted: 'LKR 58,000', movement: 'Automatic', image: '/watch_collection_1.png' },

  // Couple Collection - Quartz
  { id: 26, name: 'Binbond Duo Sport Quartz', brand: 'Binbond', category: "Couple Collection", price: 34000, priceFormatted: 'LKR 34,000', movement: 'Quartz', image: '/watch_collection_2.png' },
  { id: 27, name: 'Longlux Destiny Quartz', brand: 'Longlux', category: "Couple Collection", price: 39000, priceFormatted: 'LKR 39,000', movement: 'Quartz', image: '/watch_collection_1.png' },
  { id: 28, name: 'Poedagar Classic Duo', brand: 'Poedagar', category: "Couple Collection", price: 36000, priceFormatted: 'LKR 36,000', movement: 'Quartz', image: '/watch_collection_2.png' },
  { id: 29, name: 'Wojtek Twin Quartz', brand: 'Wojtek', category: "Couple Collection", price: 38000, priceFormatted: 'LKR 38,000', movement: 'Quartz', image: '/watch_collection_1.png' },
  { id: 30, name: 'Forsining Fusion Quartz', brand: 'Forsining', category: "Couple Collection", price: 41000, priceFormatted: 'LKR 41,000', movement: 'Quartz', image: '/watch_collection_2.png' },

  // Branded Watches
  { id: 31, name: 'Omega Speedmaster Racing', brand: 'Omega', category: "Branded Watches", price: 125000, priceFormatted: 'LKR 125,000', movement: 'Automatic', image: '/watch_collection_1.png' },
  { id: 32, name: 'Breitling Navitimer B01', brand: 'Breitling', category: "Branded Watches", price: 110000, priceFormatted: 'LKR 110,000', movement: 'Automatic', image: '/watch_collection_2.png' },
  { id: 33, name: 'Cartier Santos Dumont', brand: 'Cartier', category: "Branded Watches", price: 165000, priceFormatted: 'LKR 165,000', movement: 'Quartz', image: '/watch_collection_1.png' },
  { id: 34, name: 'Hublot Classic Fusion', brand: 'Hublot', category: "Branded Watches", price: 145000, priceFormatted: 'LKR 145,000', movement: 'Automatic', image: '/watch_collection_2.png' },

  // Super Clone Series
  { id: 35, name: 'Rolex Submariner Date Clone', brand: 'Rolex', category: "Super Clone Series", price: 95000, priceFormatted: 'LKR 95,000', movement: 'Automatic', image: '/watch_collection_1.png' },
  { id: 36, name: 'Patek Philippe Nautilus Clone', brand: 'Patek Philippe', category: "Super Clone Series", price: 135000, priceFormatted: 'LKR 135,000', movement: 'Automatic', image: '/watch_collection_2.png' },
  { id: 37, name: 'Tissot PRX Powermatic Clone', brand: 'Tissot', category: "Super Clone Series", price: 45000, priceFormatted: 'LKR 45,000', movement: 'Automatic', image: '/watch_collection_1.png' },
  { id: 38, name: 'Audemars Piguet Royal Oak Clone', brand: 'Audemars Piguet', category: "Super Clone Series", price: 120000, priceFormatted: 'LKR 120,000', movement: 'Automatic', image: '/watch_collection_2.png' }
];

const CATEGORIES = [
  'All',
  "Men's Collection",
  "Women's Collection",
  "Couple Collection",
  'Branded Watches',
  'Super Clone Series'
];

const MOVEMENTS  = ['All', 'Automatic', 'Quartz'];
const PER_PAGE   = 12; // 4 columns × 3 rows

/* ───────────────── Component ───────────────── */
export default function ProductsPageClient({ initialProducts = [] }: { initialProducts?: any[] }) {
  const productsToUse = useMemo(() => {
    if (initialProducts && initialProducts.length > 0) {
      return initialProducts.map(p => ({
        ...p,
        id: p.id,
        name: p.name,
        category: p.type || p.category || 'Uncategorized',
        price: typeof p.price === 'string' ? parseInt(p.price.replace(/\D/g, ''), 10) || 0 : p.price,
        priceFormatted: typeof p.price === 'string' ? (p.price.startsWith('LKR') ? p.price : `LKR ${p.price}`) : `LKR ${p.price}`,
        brand: p.brand || 'Unknown Brand',
        movement: p.movement || 'Automatic',
        image: p.image,
      })) as ProductItem[];
    }
    return DEMO_PRODUCTS;
  }, [initialProducts]);

  /* ── Filter state ── */
  const [category, setCategory]   = useState('All');
  const [brand, setBrand]         = useState('All');
  const [movement, setMovement]   = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage]           = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Compute available brands dynamically based on active category selection:
  const availableBrands = useMemo(() => {
    let list = ['All'];
    if (category === "Men's Collection" || category === "Women's Collection" || category === "Couple Collection") {
      list = ['All', 'Binbond', 'Longlux', 'Poedagar', 'Wojtek', 'Forsining'];
    } else if (category === "Super Clone Series") {
      list = ['All', 'Rolex', 'Patek Philippe', 'Tissot', 'Audemars Piguet'];
    } else if (category === "Branded Watches") {
      list = ['All', 'Omega', 'Breitling', 'Cartier', 'Hublot'];
    } else {
      list = ['All', ...Array.from(new Set(productsToUse.map(p => p.brand))).sort()];
    }
    return list;
  }, [category, productsToUse]);

  // Adjust selected brand if it is no longer valid under the new category
  useEffect(() => {
    if (!availableBrands.includes(brand)) {
      setBrand('All');
    }
  }, [category, availableBrands, brand]);

  /* ── Filtering ── */
  const filtered = useMemo(() => {
    let result = [...productsToUse];
    if (category !== 'All') result = result.filter(p => p.category === category);
    if (brand !== 'All')    result = result.filter(p => p.brand === brand);
    if (movement !== 'All') result = result.filter(p => p.movement === movement);
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [category, brand, movement, searchQuery]);

  const totalPages  = Math.ceil(filtered.length / PER_PAGE);
  const pageItems   = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const activeFilterCount = [category, brand, movement].filter(f => f !== 'All').length;

  const clearFilters = () => {
    setCategory('All');
    setBrand('All');
    setMovement('All');
    setSearchQuery('');
    setPage(0);
  };

  const handleFilter = (setter: (v: string) => void, value: string) => {
    setter(value);
    setPage(0); // reset to first page on filter change
  };

  return (
    <>
      {/* ═══════ Hero Banner ═══════ */}
      <section className="products-hero">
        <div className="products-hero-bg" />
        <div className="products-hero-content">
          <span className="products-hero-eyebrow">Curated Selection</span>
          <h1 className="products-hero-title">
            THE<br />
            <span className="products-hero-title-accent">COLLECTION</span>
          </h1>
          <p className="products-hero-sub">
            Browse our complete catalogue of luxury timepieces.
            Filter by brand, category, movement &amp; more.
          </p>
        </div>
      </section>

      {/* ═══════ Filter Bar ═══════ */}
      <section className="products-filters-section">
        <div className="products-filters-bar">
          {/* Category chips */}
          <div className="products-category-chips">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => handleFilter(setCategory, c)}
                className={`chip ${category === c ? 'chip-active' : ''}`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Desktop filters */}
          <div className="products-desktop-filters">
            <div className="filter-search-container">
              <Search size={14} className="filter-search-icon" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={e => handleFilter(setSearchQuery, e.target.value)}
                className="filter-search-input"
              />
            </div>
            <FilterDropdown label="Brand" value={brand} options={availableBrands} onChange={v => handleFilter(setBrand, v)} />
            <FilterDropdown label="Movement" value={movement} options={MOVEMENTS} onChange={v => handleFilter(setMovement, v)} />
            {(activeFilterCount > 0 || searchQuery !== '') && (
              <button onClick={clearFilters} className="clear-filters-btn">
                <X size={14} /> Clear
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            className="mobile-filter-toggle"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="mobile-filter-badge">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* Mobile filter panel */}
        {mobileFiltersOpen && (
          <div className="mobile-filter-panel">
            <div className="filter-search-container-mobile">
              <Search size={14} className="filter-search-icon" />
              <input 
                type="text" 
                placeholder="Search collection..." 
                value={searchQuery}
                onChange={e => handleFilter(setSearchQuery, e.target.value)}
                className="filter-search-input"
              />
            </div>
            <FilterDropdown label="Brand" value={brand} options={availableBrands} onChange={v => handleFilter(setBrand, v)} />
            <FilterDropdown label="Movement" value={movement} options={MOVEMENTS} onChange={v => handleFilter(setMovement, v)} />
            {(activeFilterCount > 0 || searchQuery !== '') && (
              <button onClick={clearFilters} className="clear-filters-btn">
                <X size={14} /> Clear All
              </button>
            )}
          </div>
        )}

        <div className="products-result-count">
          <span>{filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'} found</span>
        </div>
      </section>

      {/* ═══════ Product Grid (4 × 3) ═══════ */}
      <section className="products-grid-section">
        {filtered.length === 0 ? (
          <div className="products-empty">
            <p>No timepieces match your criteria</p>
            <button onClick={clearFilters} className="products-empty-btn">
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="products-grid animate-fade-in" key={`${category}-${brand}-${movement}-${page}`}>
              {pageItems.map((product) => (
                <div 
                  key={product.id} 
                  className="product-card"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="product-card-inner">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-img"
                      draggable={false}
                    />
                    <div className="product-card-badge">{product.category}</div>
                    <div className="product-card-overlay">
                      <span className="product-card-brand">{product.brand}</span>
                      <h3 className="product-card-name">{product.name}</h3>
                      <p className="product-card-price">{product.priceFormatted}</p>
                      <span className="product-card-movement">{product.movement}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="products-pagination">
                <button
                  onClick={() => setPage(p => p - 1)}
                  disabled={page === 0}
                  className="pagination-btn"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="pagination-pages">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i)}
                      className={`pagination-dot ${page === i ? 'pagination-dot-active' : ''}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= totalPages - 1}
                  className="pagination-btn"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ═══════ Product Modal ═══════ */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}

/* ───────────────── Filter Dropdown ───────────────── */
function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="filter-dropdown">
      <label className="filter-label">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="filter-select"
      >
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
