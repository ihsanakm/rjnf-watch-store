'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PageHeadingContent, ProductCard } from '@/lib/cms-types';
import { DEFAULT_CATALOGUE_HEADING, DEFAULT_PRODUCTS } from '@/lib/cms-defaults';
import { DEMO_PRODUCTS, IMAGES, type ProductItem } from './ProductsPageClient';
import ProductModal from './ProductModal';

type ProductCatalogueProps = {
  products?: ProductCard[];
  heading?: PageHeadingContent;
};

const EASE    = 'cubic-bezier(0.22,1,0.36,1)';
const TRANSITION = `left 0.6s ${EASE}, transform 0.6s ${EASE}, filter 0.6s ${EASE}, opacity 0.6s ${EASE}, box-shadow 0.6s ${EASE}`;

const ProductCatalogue = ({
  products: productsProp = DEFAULT_PRODUCTS,
  heading = DEFAULT_CATALOGUE_HEADING,
}: ProductCatalogueProps) => {
  const products = productsProp;

  const allFilters = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.type))];
    unique.sort();
    return ['All', ...unique];
  }, [products]);

  const [activeFilter, setActiveFilter]         = useState('All');
  const [viewportWidth, setViewportWidth]       = useState(1200);
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isAnimating, setIsAnimating]           = useState(false);
  const [selectedProduct, setSelectedProduct]   = useState<ProductItem | null>(null);

  const handleExaminePiece = (product: ProductCard) => {
    const matchedProduct = DEMO_PRODUCTS.find(
      dp => dp.name.toLowerCase() === product.name.toLowerCase()
    );

    const productToShow: ProductItem = matchedProduct || {
      ...product,
      id: typeof product.id === 'number' ? product.id : parseInt(product.id as string) || 999,
      name: product.name,
      brand: product.brand || 'RJNF',
      category: product.type,
      price: typeof product.price === 'string' ? parseInt(product.price.replace(/\D/g, ''), 10) || 0 : 0,
      priceFormatted: product.price,
      movement: product.movement || 'Automatic',
      image: product.image
    } as ProductItem;

    setSelectedProduct(productToShow);
  };

  useEffect(() => {
    if (activeFilter !== 'All' && !allFilters.includes(activeFilter)) {
      setActiveFilter('All');
      setCurrentIndex(0);
    }
  }, [activeFilter, allFilters]);

  useEffect(() => {
    const updateViewport = () => setViewportWidth(window.innerWidth);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const metrics = useMemo(() => {
    const cardWidth = Math.min(320, Math.max(230, viewportWidth * 0.76));
    const cardHeight = Math.min(480, Math.max(340, cardWidth * 1.5));
    const gap = viewportWidth < 640
      ? Math.max(180, cardWidth * 0.74)
      : Math.min(350, Math.max(250, viewportWidth * 0.27));

    return { cardWidth, cardHeight, gap };
  }, [viewportWidth]);

  const filtered = activeFilter === 'All'
    ? products
    : products.filter(p => p.type === activeFilter);

  const total = filtered.length;
  const wrap = (n: number) => ((n % total) + total) % total;

  const navigate = (dir: 'left' | 'right') => {
    if (isAnimating || total <= 1) return;
    setIsAnimating(true);
    setCurrentIndex(prev => dir === 'right' ? prev + 1 : prev - 1);
    setTimeout(() => setIsAnimating(false), 620);
  };

  const handleFilter = (f: string) => {
    if (f === activeFilter) return;
    setTransitionEnabled(false);
    setActiveFilter(f);
    setCurrentIndex(0);
    setIsAnimating(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setTransitionEnabled(true)));
  };

  const slots = [-2, -1, 0, 1, 2].map(offset => ({
    vi:      currentIndex + offset,
    offset,
    product: filtered[wrap(currentIndex + offset)],
  }));

  return (
    <section className="catalogue bg-white py-12 sm:py-16 lg:py-20" id="catalogue">

      <div className="mx-auto mb-8 max-w-[1600px] px-4 text-center sm:px-6 md:mb-10">
        <span className="text-gold mb-4 block text-[10px] font-bold uppercase tracking-[0.32em] sm:text-xs sm:tracking-[0.4em]">{heading.eyebrow}</span>
        <h2 className="text-4xl font-black leading-none tracking-tighter text-obsidian sm:text-5xl md:text-7xl">
          {heading.titleLine1} <br />
          <span className="text-[#8D9096] opacity-30 font-medium">{heading.titleLine2}</span>
        </h2>
      </div>

      <div className="no-scrollbar mb-8 overflow-x-auto px-4 sm:px-6">
        <div className="mx-auto flex w-max items-center gap-6 pb-2 sm:gap-10">
          {allFilters.map(f => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`relative py-2 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 group whitespace-nowrap ${
                activeFilter === f ? 'text-obsidian' : 'text-[#8D9096]'
              }`}
            >
              {f}
              <span className={`absolute bottom-0 left-0 h-px bg-obsidian transition-all duration-500 ${
                activeFilter === f ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-5">

        <div className="relative w-full overflow-hidden" style={{ height: metrics.cardHeight }}>
          {total === 0 ? (
            <div className="flex items-center justify-center h-full text-[#8D9096] text-sm tracking-widest uppercase">
              No pieces in this category
            </div>
          ) : (
            slots.map(({ vi, offset, product }) => {
              if (!product) return null;
              const isCentre = offset === 0;
              return (
                <div
                  key={vi}
                  className="absolute top-0"
                  style={{
                    width:  metrics.cardWidth,
                    height: metrics.cardHeight,
                    left:        `calc(50% - ${metrics.cardWidth / 2}px + ${offset * metrics.gap}px)`,
                    transform:   `scale(${isCentre ? 1 : 0.85})`,
                    filter:      isCentre ? 'blur(0px)' : 'blur(6px)',
                    opacity:     isCentre ? 1 : Math.abs(offset) === 1 ? 0.42 : 0.15,
                    zIndex:      isCentre ? 10 : 5 - Math.abs(offset),
                    borderRadius: '1rem',
                    overflow:    'hidden',
                    boxShadow:   isCentre
                      ? '0 32px 80px rgba(0,0,0,0.18)'
                      : '0 8px 30px rgba(0,0,0,0.06)',
                    pointerEvents: isCentre ? 'auto' : 'none',
                    transition:  transitionEnabled ? TRANSITION : 'none',
                  }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 76vw, 320px"
                    className="object-cover"
                  />
                  {isCentre && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-6 text-center opacity-0 backdrop-blur-[2px] transition-all duration-700 hover:opacity-100 sm:p-8">
                      <h3 className="mb-2 text-2xl font-black uppercase tracking-tighter text-white sm:text-3xl">{product.name}</h3>
                      <p className="text-gold mb-6 text-lg font-bold sm:mb-8 sm:text-xl">{product.price}</p>
                      <button 
                        onClick={() => handleExaminePiece(product)}
                        className="bg-white text-black px-6 py-3 rounded-md font-bold text-[10px] uppercase tracking-widest hover:bg-gold hover:text-white transition-all duration-300 sm:px-10 sm:py-4 sm:text-xs"
                      >
                        Examine Piece
                      </button>
                    </div>
                  )}
                  <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
                    <span className="bg-white/90 backdrop-blur-md text-[9px] font-bold px-3 py-1.5 rounded-full text-black tracking-[0.16em] uppercase sm:text-[10px] sm:px-4 sm:tracking-[0.2em]">
                      {product.type}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center gap-6 sm:gap-10">
          <button
            onClick={() => navigate('left')}
            disabled={total <= 1 || isAnimating}
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-obsidian/10 flex items-center justify-center text-obsidian hover:bg-obsidian hover:text-white transition-all duration-300 shadow-xl disabled:opacity-30 disabled:cursor-not-allowed sm:h-16 sm:w-16"
          >
            <ChevronLeft size={24} />
          </button>

          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#8D9096] min-w-[60px] text-center">
            {total === 0 ? '-' : `${wrap(currentIndex) + 1} / ${total}`}
          </span>

          <button
            onClick={() => navigate('right')}
            disabled={total <= 1 || isAnimating}
            className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-obsidian/10 flex items-center justify-center text-obsidian hover:bg-obsidian hover:text-white transition-all duration-300 shadow-xl disabled:opacity-30 disabled:cursor-not-allowed sm:h-16 sm:w-16"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-obsidian border border-obsidian/10 px-8 py-3 rounded-full hover:bg-obsidian hover:text-white transition-all duration-300"
        >
          View Full Collection
          <ChevronRight size={14} />
        </Link>

      </div>

      {/* ═══════ Product Modal ═══════ */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default ProductCatalogue;
