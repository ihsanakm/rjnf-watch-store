'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  variant?: 'dark' | 'light';
}

const Header = ({ variant = 'dark' }: HeaderProps) => {
  const container = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const linkTone = variant === 'light' ? 'text-white' : 'text-obsidian';
  const mobilePanel = variant === 'light' ? 'bg-obsidian/95' : 'bg-white/95';
  const mobileLinkTone = variant === 'light' ? 'text-white/85 hover:text-white hover:bg-white/10' : 'text-obsidian/80 hover:text-obsidian hover:bg-obsidian/5';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/#catalogue', label: 'Collection' },
    { href: '/#reviews', label: 'Reviews' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/#contact', label: 'Contact Us' },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector('.underline-gsap');
    gsap.to(underline, {
      width: '100%',
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector('.underline-gsap');
    gsap.to(underline, {
      width: '0%',
      duration: 0.3,
      ease: 'power2.in',
    });
  };

  return (
    <header ref={container} className="relative">
      <div className="flex items-center justify-between border-b border-white/30 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className={`${linkTone} text-sm font-black tracking-[0.28em] uppercase sm:hidden`}>
          RJNF
        </Link>
 
        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex lg:gap-10">
          {links.slice(0, 4).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link relative ${linkTone}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {link.label}
              <span className="underline-gsap absolute -bottom-0.5 left-0 h-px w-0 bg-white" />
            </Link>
          ))}
        </nav>

        <Link
          href="#contact"
          className={`nav-link relative hidden text-sm font-semibold ${linkTone} md:inline-flex`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Contact Us
          <span className="underline-gsap absolute -bottom-0.5 left-0 h-px w-0 bg-white" />
        </Link>

        <button
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/10 text-white backdrop-blur md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`absolute left-0 right-0 top-full z-30 mx-4 mt-3 overflow-hidden rounded-lg border border-white/15 ${mobilePanel} shadow-2xl backdrop-blur transition-all duration-300 md:hidden ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`rounded-md px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] transition-colors ${mobileLinkTone}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
