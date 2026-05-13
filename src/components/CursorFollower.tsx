'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text) return;

    // Set initial positions
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(text, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      // Smoothly follow mouse
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      
      gsap.to(text, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 3, duration: 0.3 });
      gsap.to(text, { scale: 1.2, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(text, { scale: 1, duration: 0.3 });
    };

    const interactables = document.querySelectorAll('a, button');
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    window.addEventListener('mousemove', moveCursor);

    // Rotate text continuously
    gsap.to(text, {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  const brandName = "RJNF WATCHES | RJNF WATCHES | ";
  const characters = brandName.split("");

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[9999] shadow-[0_0_10px_rgba(176,138,74,0.5)]"
      />
      <div
        ref={textRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9998] w-0 h-0"
      >
        {characters.map((char, i) => (
          <span
            key={i}
            className="absolute text-gold font-black text-[10px] uppercase tracking-tighter"
            style={{
              left: 0,
              top: 0,
              transform: `translate(-50%, -50%) rotate(${i * (360 / characters.length)}deg) translateY(-35px) scaleY(1.4)`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <style jsx global>{`
        @media (hover: hover) and (pointer: fine) {
          body {
            cursor: none !important;
          }
          a, button, [role="button"] {
            cursor: none !important;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .custom-cursor {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CursorFollower;
