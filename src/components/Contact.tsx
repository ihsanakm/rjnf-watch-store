'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MessageCircle, ArrowRight } from 'lucide-react';

const InstagramIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Contact = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.contact-content > *', {
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: container });

  return (
    <section className="contact relative overflow-hidden bg-obsidian py-12 text-white sm:py-16 lg:py-20" id="contact" ref={container}>
      {/* Abstract Background Detail */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-white/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[800px] px-4 text-center sm:px-6 md:px-12">
        <div className="contact-content">
          <span className="text-gold mb-4 block text-[10px] font-bold uppercase tracking-[0.32em] sm:tracking-[0.4em]">First Access</span>
          <h2 className="mb-6 text-3xl font-black uppercase leading-tight tracking-tighter sm:text-4xl md:text-5xl">
            Join the <br />
            <span className="text-[#8D9096]">Inner Circle</span>
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-white/60 sm:mb-10 md:text-base">
            Priority arrivals are posted exclusively to our private WhatsApp community before they reach the public. Join our inner circle to secure your masterpiece.
          </p>
          
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-5">
            <a 
              href="https://wa.me/yournumber" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between rounded-lg bg-white px-6 py-4 text-xs font-bold uppercase tracking-widest text-obsidian transition-all duration-500 hover:bg-gold hover:text-white sm:min-w-[240px] sm:px-8"
            >
              <span className="flex items-center gap-2">
                <MessageCircle size={18} className="text-green-500 group-hover:text-white transition-colors" />
                Join WhatsApp Group
              </span>
              <ArrowRight size={18} className="ml-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
            </a>

            <a 
              href="https://instagram.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-500 hover:border-white hover:bg-white/5 sm:min-w-[240px] sm:px-8"
            >
              <InstagramIcon size={18} className="text-gold" />
              Follow Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
