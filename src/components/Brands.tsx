'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { DEFAULT_BRANDS, DEFAULT_BRAND_SERIF_FLAGS } from '@/lib/cms-defaults';

type BrandsProps = {
  brands?: string[];
  brandSerifFlags?: boolean[];
};

const Brands = ({
  brands = DEFAULT_BRANDS,
  brandSerifFlags = DEFAULT_BRAND_SERIF_FLAGS,
}: BrandsProps) => {
  const container = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    gsap.to(track, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });
  }, { scope: container });

  const serifFor = (index: number, brand: string) => {
    const flag = brandSerifFlags[index];
    if (typeof flag === 'boolean') return flag;
    return brand === 'CARTIER';
  };

  return (
    <section className="brands relative overflow-hidden border-y border-white/5 bg-[#0a0a0a] py-3 sm:py-4" ref={container}>
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #8D9096 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
    
      <div className="flex whitespace-nowrap w-max relative z-10" ref={trackRef}>
        {brands.map((brand, i) => (
          <div key={`brand-1-${brand}-${i}`} className="flex items-center px-3 text-[#dcdee1] opacity-70 hover:opacity-100 hover:text-white transition-all duration-700 cursor-default scale-90 grayscale hover:grayscale-0 sm:px-6">
            <span className={`text-xl font-bold uppercase tracking-[0.28em] sm:text-3xl sm:tracking-[0.4em] lg:text-4xl ${serifFor(i, brand) ? 'font-serif italic' : ''}`}>
              {brand}
            </span>
          </div>
        ))}
        {brands.map((brand, i) => (
          <div key={`brand-2-${brand}-${i}`} className="flex items-center px-3 text-[#dcdee1] opacity-70 hover:opacity-100 hover:text-white transition-all duration-700 cursor-default scale-90 grayscale hover:grayscale-0 sm:px-6">
            <span className={`text-xl font-bold uppercase tracking-[0.28em] sm:text-3xl sm:tracking-[0.4em] lg:text-4xl ${serifFor(i, brand) ? 'font-serif italic' : ''}`}>
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
