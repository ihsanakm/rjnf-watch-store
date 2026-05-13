'use client';

import { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const faqs = [
  {
    question: "How do I secure a timepiece from the collection?",
    answer: "Acquisitions are handled exclusively through our WhatsApp Inner Circle. Members receive priority notifications of new arrivals before they are listed publicly. Once a piece is announced, you can message our concierge directly to begin the secure acquisition process."
  },
  {
    question: "Are all watches guaranteed authentic?",
    answer: "Every timepiece in our collection undergoes a rigorous multi-point inspection by our master watchmakers. We provide a Certificate of Authenticity and a comprehensive mechanical integrity report with every purchase."
  },
  {
    question: "Do you offer international, insured shipping?",
    answer: "Yes, we ship globally using specialized high-value couriers. Every shipment is fully insured for its replacement value and requires an adult signature upon delivery. We handle all logistics to ensure your piece arrives in pristine condition."
  },
  {
    question: "Can I request a specific model not in the catalogue?",
    answer: "Through our extensive global network of collectors and heritage partners, we offer a bespoke sourcing service. If you are seeking a specific reference, our acquisition team can likely secure it for you privately."
  },
  {
    question: "What is your warranty and return policy?",
    answer: "We stand behind the mechanical excellence of every watch. All timepieces come with a 12-month mechanical warranty. Due to the unique nature of our curated collection, returns are handled on a case-by-case basis within 48 hours of delivery."
  }
];

const FAQItem = ({ faq, isOpen, toggle }: { faq: typeof faqs[0], isOpen: boolean, toggle: () => void }) => {
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

const FAQ = () => {
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
      ease: 'power3.out'
    });
  }, { scope: container });

  return (
    <section className="faq bg-white py-12 sm:py-16 lg:py-20" id="faq" ref={container}>
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 md:px-12">
        <div className="faq-header mb-10 text-center sm:mb-16 lg:mb-20">
          <span className="text-gold mb-4 block text-[10px] font-bold uppercase tracking-[0.32em] sm:text-xs sm:tracking-[0.4em]">Common Inquiries</span>
          <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tighter text-obsidian sm:text-5xl md:text-6xl">
            Acquisition <br />
            <span className="text-[#8D9096] opacity-30 font-medium">Intelligence</span>
          </h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
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
