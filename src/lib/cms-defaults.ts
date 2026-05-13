import type {
  ContactContent,
  FaqItem,
  FooterContent,
  HeroContent,
  PageHeadingContent,
  ProductCard,
  ReviewCard,
  StorefrontContent,
} from './cms-types';

export const DEFAULT_HERO: HeroContent = {
  subtitle: 'Timeless Excellence',
  titleLine1: 'PRECISION',
  titleLine2: 'IN EVERY SECOND',
  punchline:
    'Engineered for the extraordinary, designed for those who value every moment.',
  videoSrc: '/video/herobg.mp4',
};

export const DEFAULT_BRANDS = [
  'ROLEX',
  'PATEK PHILIPPE',
  'AUDEMARS PIGUET',
  'OMEGA',
  'CARTIER',
  'VACHERON CONSTANTIN',
  'IWC SCHAFFHAUSEN',
  'BREITLING',
  'JAEGER-LECOULTRE',
  'HUBLOT',
  'TAG HEUER',
];

export const DEFAULT_BRAND_SERIF_FLAGS = DEFAULT_BRANDS.map((b) => b === 'CARTIER');

export const DEFAULT_CATALOGUE_HEADING: PageHeadingContent = {
  eyebrow: 'The Collection',
  titleLine1: 'MASTERPIECES',
  titleLine2: 'OF TIME',
};

export const DEFAULT_PRODUCTS: ProductCard[] = [
  { id: 1, name: 'Oceanic Pro', type: 'Diving', price: 'LKR 4,200', image: '/watch_collection_1.png' },
  { id: 2, name: 'Skywalker II', type: 'Aviation', price: 'LKR 5,800', image: '/watch_collection_2.png' },
  { id: 3, name: 'Gold Reserve', type: 'Dress', price: 'LKR 12,500', image: '/watch_collection_1.png' },
  { id: 4, name: 'Chronos-X', type: 'Chronograph', price: 'LKR 7,200', image: '/watch_collection_2.png' },
  { id: 5, name: 'Heritage 1954', type: 'Vintage', price: 'LKR 8,900', image: '/watch_collection_1.png' },
  { id: 6, name: 'Abyss Deep', type: 'Diving', price: 'LKR 6,400', image: '/watch_collection_2.png' },
  { id: 7, name: 'Cloud Master', type: 'Aviation', price: 'LKR 6,100', image: '/watch_collection_2.png' },
  { id: 8, name: 'Royal Onyx', type: 'Dress', price: 'LKR 15,900', image: '/watch_collection_1.png' },
];

export const DEFAULT_CONTACT: ContactContent = {
  eyebrow: 'First Access',
  titleLine1: 'Join the',
  titleLine2: 'Inner Circle',
  body: 'Priority arrivals are posted exclusively to our private WhatsApp community before they reach the public. Join our inner circle to secure your masterpiece.',
  whatsappUrl: 'https://wa.me/yournumber',
  instagramUrl: 'https://instagram.com/yourprofile',
};

export const DEFAULT_REVIEWS_HEADING: PageHeadingContent = {
  eyebrow: 'Client Experience',
  titleLine1: 'Voices of',
  titleLine2: 'Excellence',
};

export const DEFAULT_REVIEWS: ReviewCard[] = [
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

export const DEFAULT_FAQ_HEADING: PageHeadingContent = {
  eyebrow: 'Common Inquiries',
  titleLine1: 'Acquisition',
  titleLine2: 'Intelligence',
};

export const DEFAULT_FAQS: FaqItem[] = [
  {
    question: 'How do I secure a timepiece from the collection?',
    answer:
      'Acquisitions are handled exclusively through our WhatsApp Inner Circle. Members receive priority notifications of new arrivals before they are listed publicly. Once a piece is announced, you can message our concierge directly to begin the secure acquisition process.',
  },
  {
    question: 'Are all watches guaranteed authentic?',
    answer:
      'Every timepiece in our collection undergoes a rigorous multi-point inspection by our master watchmakers. We provide a Certificate of Authenticity and a comprehensive mechanical integrity report with every purchase.',
  },
  {
    question: 'Do you offer international, insured shipping?',
    answer:
      'Yes, we ship globally using specialized high-value couriers. Every shipment is fully insured for its replacement value and requires an adult signature upon delivery. We handle all logistics to ensure your piece arrives in pristine condition.',
  },
  {
    question: 'Can I request a specific model not in the catalogue?',
    answer:
      'Through our extensive global network of collectors and heritage partners, we offer a bespoke sourcing service. If you are seeking a specific reference, our acquisition team can likely secure it for you privately.',
  },
  {
    question: 'What is your warranty and return policy?',
    answer:
      'We stand behind the mechanical excellence of every watch. All timepieces come with a 12-month mechanical warranty. Due to the unique nature of our curated collection, returns are handled on a case-by-case basis within 48 hours of delivery.',
  },
];

export const DEFAULT_FOOTER: FooterContent = {
  creditEyebrow: 'Digital Excellence Designed By',
  designerFirstName: 'Mohammed',
  designerLastName: 'Ihsan',
  copyrightLine: '(c) 2026 LUXURY TIMEPIECES GROUP | Sri Lanka',
};

export const DEFAULT_STOREFRONT: StorefrontContent = {
  hero: DEFAULT_HERO,
  brands: DEFAULT_BRANDS,
  brandSerifFlags: DEFAULT_BRAND_SERIF_FLAGS,
  catalogueHeading: DEFAULT_CATALOGUE_HEADING,
  products: DEFAULT_PRODUCTS,
  contact: DEFAULT_CONTACT,
  reviewsHeading: DEFAULT_REVIEWS_HEADING,
  reviews: DEFAULT_REVIEWS,
  faqHeading: DEFAULT_FAQ_HEADING,
  faqs: DEFAULT_FAQS,
  footer: DEFAULT_FOOTER,
};
