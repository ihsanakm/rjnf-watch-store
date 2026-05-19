'use client';

import { useState, useMemo } from 'react';
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
};

/* ───────────────── Demo Data ───────────────── */
export const IMAGES = [
  'https://assets.codepen.io/16327/portrait-number-1.png',
  'https://assets.codepen.io/16327/portrait-number-2.png',
  'https://assets.codepen.io/16327/portrait-number-3.png',
  'https://assets.codepen.io/16327/portrait-number-4.png',
];

export const DEMO_PRODUCTS: ProductItem[] = [
  { id: 1,  name: 'Oceanic Pro',      brand: 'Rolex',                category: 'Diving',          price: 42000,  priceFormatted: 'LKR 42,000',  movement: 'Automatic', image: IMAGES[0] },
  { id: 2,  name: 'Skywalker II',     brand: 'Breitling',            category: 'Aviation',        price: 58000,  priceFormatted: 'LKR 58,000',  movement: 'Automatic', image: IMAGES[1] },
  { id: 3,  name: 'Gold Reserve',     brand: 'Patek Philippe',       category: 'Dress',           price: 125000, priceFormatted: 'LKR 125,000', movement: 'Manual',    image: IMAGES[2] },
  { id: 4,  name: 'Chronos-X',        brand: 'TAG Heuer',            category: 'Chronograph',     price: 72000,  priceFormatted: 'LKR 72,000',  movement: 'Automatic', image: IMAGES[3] },
  { id: 5,  name: 'Heritage 1954',    brand: 'Omega',                category: 'Vintage',         price: 89000,  priceFormatted: 'LKR 89,000',  movement: 'Manual',    image: IMAGES[0] },
  { id: 6,  name: 'Abyss Deep',       brand: 'Rolex',                category: 'Diving',          price: 64000,  priceFormatted: 'LKR 64,000',  movement: 'Automatic', image: IMAGES[1] },
  { id: 7,  name: 'Cloud Master',     brand: 'IWC Schaffhausen',     category: 'Aviation',        price: 61000,  priceFormatted: 'LKR 61,000',  movement: 'Automatic', image: IMAGES[2] },
  { id: 8,  name: 'Royal Onyx',       brand: 'Cartier',              category: 'Dress',           price: 159000, priceFormatted: 'LKR 159,000', movement: 'Automatic', image: IMAGES[3] },
  { id: 9,  name: 'Nebula GMT',       brand: 'Omega',                category: 'Chronograph',     price: 95000,  priceFormatted: 'LKR 95,000',  movement: 'Automatic', image: IMAGES[0] },
  { id: 10, name: 'Midnight Opus',    brand: 'Audemars Piguet',      category: 'Limited Edition', price: 245000, priceFormatted: 'LKR 245,000', movement: 'Automatic', image: IMAGES[1] },
  { id: 11, name: 'Titan Pulse',      brand: 'Hublot',               category: 'Chronograph',     price: 118000, priceFormatted: 'LKR 118,000', movement: 'Automatic', image: IMAGES[2] },
  { id: 12, name: 'Vintage Classic',  brand: 'Vacheron Constantin',  category: 'Vintage',         price: 198000, priceFormatted: 'LKR 198,000', movement: 'Manual',    image: IMAGES[3] },
  { id: 13, name: 'Luminous Diver',   brand: 'Rolex',                category: 'Diving',          price: 52000,  priceFormatted: 'LKR 52,000',  movement: 'Automatic', image: IMAGES[0] },
];

const CATEGORIES = ['All', 'Chronograph', 'Diving', 'Aviation', 'Dress', 'Limited Edition', 'Vintage'];
const BRANDS     = ['All', ...Array.from(new Set(DEMO_PRODUCTS.map(p => p.brand))).sort()];
const MOVEMENTS  = ['All', 'Automatic', 'Manual'];
const PER_PAGE   = 12; // 4 columns × 3 rows

/* ───────────────── Component ───────────────── */
export default function ProductsPageClient() {
  /* ── Filter state ── */
  const [category, setCategory]   = useState('All');
  const [brand, setBrand]         = useState('All');
  const [movement, setMovement]   = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [page, setPage]           = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  /* ── Filtering ── */
  const filtered = useMemo(() => {
    let result = [...DEMO_PRODUCTS];
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
            <FilterDropdown label="Brand" value={brand} options={BRANDS} onChange={v => handleFilter(setBrand, v)} />
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
            <FilterDropdown label="Brand" value={brand} options={BRANDS} onChange={v => handleFilter(setBrand, v)} />
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
