'use client';

import { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { FaqItem, PageHeadingContent } from '@/lib/cms-types';
import { DEFAULT_FAQS, DEFAULT_FAQ_HEADING } from '@/lib/cms-defaults';

const FAQItem = ({ faq, isOpen, toggle }: { faq: FaqItem, isOpen: boolean, toggle: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, { scope: contentRef, dependencies: [isOpen] });

  return (
    <div className="border-b border-obsidian/10">
      <button 
        onClick={toggle}
        className="group flex w-full items-center justify-between py-6 text-left sm:py-8"
      >
        <span className={`text-lg font-bold tracking-tighter transition-colors duration-300 sm:text-xl md:text-2xl ${isOpen ? 'text-gold' : 'text-obsidian group-hover:text-gold'}`}>
          {faq.question}
        </span>
        <div className={`ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-obsidian/10 transition-all duration-300 ${isOpen ? 'bg-gold border-gold text-white rotate-180' : 'text-obsidian'}`}>
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>
      <div 
        ref={contentRef} 
        className="overflow-hidden h-0 opacity-0"
      >
        <div className="pb-6 pr-0 sm:pb-8 sm:pr-12">
          <p className="max-w-3xl text-base leading-relaxed text-[#8D9096] sm:text-lg">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

type FAQProps = {
  faqs?: FaqItem[];
  heading?: PageHeadingContent;
};

const FAQ = ({
  faqs = DEFAULT_FAQS,
  heading = DEFAULT_FAQ_HEADING,
}: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from('.faq-header > *', {
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
    <section className="faq bg-white py-12 sm:py-16 lg:py-20" id="faq" ref={container}>
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 md:px-12">
        <div className="faq-header mb-10 text-center sm:mb-16 lg:mb-20">
          <span className="text-gold mb-4 block text-[10px] font-bold uppercase tracking-[0.32em] sm:text-xs sm:tracking-[0.4em]">{heading.eyebrow}</span>
          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-obsidian sm:text-5xl md:text-6xl">
            {heading.titleLine1} <br />
            <span className="text-[#8D9096] opacity-30 font-medium">{heading.titleLine2}</span>
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={`${faq.question}-${index}`} 
              faq={faq} 
              isOpen={openIndex === index} 
              toggle={() => setOpenIndex(openIndex === index ? null : index)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
