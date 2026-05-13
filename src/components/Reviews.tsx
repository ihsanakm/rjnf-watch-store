'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { PageHeadingContent, ReviewCard } from '@/lib/cms-types';
import { DEFAULT_REVIEWS, DEFAULT_REVIEWS_HEADING } from '@/lib/cms-defaults';

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const a = parts[0][0];
    const b = parts[parts.length - 1][0];
    return `${a}${b}`.toUpperCase();
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || '?';
}

const ReviewColumn = ({ items, speed, reverse = false }: { items: ReviewCard[], speed: number, reverse?: boolean }) => {
  const columnRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const col = columnRef.current;
    if (!col) return;

    const totalHeight = col.scrollHeight / 2;
    
    const animation = gsap.fromTo(col, 
      { y: reverse ? -totalHeight : 0 },
      {
        y: reverse ? 0 : -totalHeight,
        duration: speed,
        ease: 'none',
        repeat: -1,
      }
    );

    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    col.addEventListener('mouseenter', handleMouseEnter);
    col.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      col.removeEventListener('mouseenter', handleMouseEnter);
      col.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: columnRef, dependencies: [speed, reverse] });

  return (
    <div className="flex flex-col gap-6" ref={columnRef}>
      {[...items, ...items].map((review, idx) => (
        <div 
          key={`${review.id}-${idx}`} 
          className="bg-[#F8F9FA] p-6 rounded-lg border border-obsidian/5 hover:border-gold/30 transition-colors duration-500 sm:p-8"
        >
          <div className="flex gap-1 mb-4">
            {[...Array(review.rating)].map((_, i) => (
              <span key={i} className="text-gold text-xs">{'\u2605'}</span>
            ))}
          </div>
          <p className="text-obsidian font-medium leading-relaxed mb-6 italic">&quot;{review.text}&quot;</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-obsidian flex items-center justify-center text-white text-[10px] font-bold">
              {initialsFor(review.name)}
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#8D9096]">{review.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

type ReviewsProps = {
  reviews?: ReviewCard[];
  heading?: PageHeadingContent;
};

const Reviews = ({
  reviews = DEFAULT_REVIEWS,
  heading = DEFAULT_REVIEWS_HEADING,
}: ReviewsProps) => {
  return (
    <section className="reviews relative overflow-hidden border-t border-white/30 bg-white py-12 sm:py-16 lg:py-20" id="reviews">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">
        <div className="mb-10 text-center sm:mb-16 lg:mb-20">
          <span className="text-gold mb-4 block text-[10px] font-bold uppercase tracking-[0.32em] sm:text-xs sm:tracking-[0.4em]">{heading.eyebrow}</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-obsidian sm:text-5xl md:text-6xl">
            {heading.titleLine1} <br />
            <span className="text-[#8D9096] opacity-30 font-medium">{heading.titleLine2}</span>
          </h2>
        </div>

        <div className="relative h-[620px] overflow-hidden sm:h-[700px]">
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <ReviewColumn items={reviews.slice(0, 3)} speed={40} />
            <div className="hidden md:block">
              <ReviewColumn items={reviews.slice(3, 6)} speed={50} reverse={true} />
            </div>
            <div className="hidden lg:block">
              <ReviewColumn items={reviews.slice(6, 9)} speed={45} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
