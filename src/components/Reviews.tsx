'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const reviews = [
  { id: 1, name: 'Alexander V.', text: 'The attention to detail on the Oceanic Pro is simply unmatched. It feels like a piece of art on my wrist.', rating: 5 },
  { id: 2, name: 'Sophia M.', text: 'Fast delivery and premium packaging. The Heritage 1954 exceeded my expectations in every way.', rating: 5 },
  { id: 3, name: 'Marcus L.', text: 'As a collector, I appreciate the mechanical integrity. RJNF has truly mastered the craft.', rating: 5 },
  { id: 4, name: 'Elena R.', text: 'Stunning design and perfect weight. The Gold Reserve is my new favorite dress watch.', rating: 5 },
  { id: 5, name: 'Julian K.', text: 'Exceptional service. The SkyWalker II is a masterpiece of aviation-inspired design.', rating: 5 },
  { id: 6, name: 'Clara T.', text: 'Elegant, timeless, and precise. Exactly what I was looking for in a luxury timepiece.', rating: 5 },
  { id: 7, name: 'David H.', text: 'The craftsmanship is evident from the moment you open the box. Highly recommended.', rating: 5 },
  { id: 8, name: 'Isabella S.', text: 'Beautifully balanced design. It transitions perfectly from the office to evening events.', rating: 5 },
  { id: 9, name: 'Victor B.', text: 'The movement is incredibly smooth. You can tell this is built to last generations.', rating: 5 },
];

const ReviewColumn = ({ items, speed, reverse = false }: { items: typeof reviews, speed: number, reverse?: boolean }) => {
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

    // Pause on hover
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
              {review.name.split(' ')[0][0]}{review.name.split(' ')[1][0]}
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#8D9096]">{review.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const Reviews = () => {
  return (
    <section className="reviews relative overflow-hidden border-t border-white/30 bg-white py-12 sm:py-16 lg:py-20" id="reviews">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-12">
        <div className="mb-10 text-center sm:mb-16 lg:mb-20">
          <span className="text-gold mb-4 block text-[10px] font-bold uppercase tracking-[0.32em] sm:text-xs sm:tracking-[0.4em]">Client Experience</span>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-obsidian sm:text-5xl md:text-6xl">
            Voices of <br />
            <span className="text-[#8D9096] opacity-30 font-medium">Excellence</span>
          </h2>
        </div>

        <div className="relative h-[620px] overflow-hidden sm:h-[700px]">
          {/* Vertical Fades */}
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
