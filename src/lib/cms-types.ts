export type HeroContent = {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  punchline: string;
  videoSrc: string;
};

export type PageHeadingContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
};

export type ProductCard = {
  id: number | string;
  name: string;
  type: string;
  price: string;
  image: string;
  images?: string[];
  overview?: string;
  brand?: string;
  model?: string;
  movement?: string;
  display?: string;
  gender?: string;
  caseMaterial?: string;
  caseDiameter?: string;
  caseThickness?: string;
  dialColor?: string;
  glassType?: string;
  strapMaterial?: string;
  strapColor?: string;
  strapLength?: string;
  strapWidth?: string;
  claspType?: string;
  waterResistance?: string;
  weight?: string;
  keyFeatures?: string[];
  packageIncludes?: string[];
  warranty?: string;
  shippingDelivery?: string[];
  careInstructions?: string[];
};

export type ReviewCard = {
  id: number | string;
  name: string;
  text: string;
  rating: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  body: string;
  whatsappUrl: string;
  instagramUrl: string;
};

export type FooterContent = {
  creditEyebrow: string;
  designerFirstName: string;
  designerLastName: string;
  copyrightLine: string;
};

export type StorefrontContent = {
  hero: HeroContent;
  brands: string[];
  brandSerifFlags: boolean[];
  catalogueHeading: PageHeadingContent;
  products: ProductCard[];
  contact: ContactContent;
  reviewsHeading: PageHeadingContent;
  reviews: ReviewCard[];
  faqHeading: PageHeadingContent;
  faqs: FaqItem[];
  footer: FooterContent;
};
