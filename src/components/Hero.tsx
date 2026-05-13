'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from './Header';
import type { HeroContent } from '@/lib/cms-types';
import { DEFAULT_HERO } from '@/lib/cms-defaults';

type HeroProps = {
  content?: HeroContent;
};

const Hero = ({ content = DEFAULT_HERO }: HeroProps) => {
  const container = useRef(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

    tl.from('.hero-bg', { scale: 1.2, opacity: 0, duration: 2 })
      .from('.hero-subtitle', { y: 20, opacity: 0 }, '-=1.5')
      .from('.hero-title', { y: 40, opacity: 0 }, '-=1.2')
      .from('.hero-punchline', { y: 20, opacity: 0 }, '-=1')
      .fromTo(
        '.btn-animate',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, clearProps: 'transform,opacity' },
        '-=0.8'
      );
  }, { scope: container });

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = buttonRef.current;
    const ripple = rippleRef.current;
    if (!btn || !ripple) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeft = x < rect.width / 2;

    gsap.killTweensOf([ripple, btn]);

    if (isLeft) {
      gsap.set(ripple, { left: 0, right: 'auto', width: '0%', opacity: 1 });
    } else {
      gsap.set(ripple, { right: 0, left: 'auto', width: '0%', opacity: 1 });
    }

    gsap.to(ripple, {
      width: '100%',
      duration: 0.5,
      ease: "power3.out"
    });
    gsap.to(btn, { color: "#ffffff", borderColor: "#ffffff", borderWidth: '1px', duration: 0.4 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = buttonRef.current;
    const ripple = rippleRef.current;
    if (!btn || !ripple) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeft = x < rect.width / 2;

    gsap.killTweensOf([ripple, btn]);

    if (isLeft) {
      gsap.set(ripple, { left: 0, right: 'auto' });
    } else {
      gsap.set(ripple, { right: 0, left: 'auto' });
    }

    gsap.to(ripple, {
      width: '0%',
      duration: 0.4,
      ease: "power3.in"
    });
    gsap.to(btn, { color: "#000000", borderColor: "transparent", duration: 0.4 });
  };

  return (
    <section className="relative m-2 flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-lg sm:rounded-xl lg:min-h-[98vh]" ref={container} >
      <div className="hero-bg absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={content.videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A1128]/70 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 flex min-h-[calc(100svh-1rem)] w-full flex-col px-3 sm:px-6 lg:min-h-[98vh] lg:px-9">
        <Header variant="light" />

        <div className="flex flex-1 flex-col items-center justify-center py-14 text-center sm:py-20 lg:mt-25 lg:block lg:max-w-4xl lg:py-0 lg:text-left">
          <span className="hero-subtitle mb-4 block text-[10px] font-semibold uppercase tracking-[0.32rem] text-gold sm:text-sm sm:tracking-[0.5rem]">
            {content.subtitle}
          </span>
          <h1 className="hero-title mb-6 text-[clamp(2.7rem,14vw,6rem)] font-black leading-none tracking-tighter text-white sm:mb-8 sm:text-[clamp(3rem,8vw,6rem)]">
            {content.titleLine1} <br />
            <span>{content.titleLine2}</span>
          </h1>
          <p className="hero-punchline mx-auto mb-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-xl lg:mx-0">
            {content.punchline}
          </p>
          <Link
            href="#catalogue"
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='btn-animate relative inline-flex w-full max-w-xs items-center justify-center overflow-hidden rounded-md border-2 border-transparent bg-white/90 px-6 py-4 text-sm font-bold uppercase text-black transition-transform active:scale-95 sm:w-auto sm:px-8 sm:text-base'
          >
            <span className="relative z-10">Explore Collections</span>
            <span
              ref={rippleRef}
              className="absolute inset-0 pointer-events-none bg-black w-0 h-full z-0"
            />
          </Link>

        </div>
      </div>
    </section>
  );
};

export default Hero;
