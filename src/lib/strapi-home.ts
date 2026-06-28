import { getStrapiMedia, getStrapiServerOrigin } from './strapi';
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
import { DEFAULT_STOREFRONT } from './cms-defaults';

type StrapiListResponse<T> = { data: T[] };
type StrapiSingleResponse<T> = { data: T | null };

function qs(entries: Record<string, string>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(entries)) {
    sp.set(k, v);
  }
  return sp.toString();
}

async function strapiFetchJson<T>(path: string, search: string): Promise<T | null> {
  const base = getStrapiServerOrigin();
  const url = `${base}/api/${path}?${search}`;
  const token = process.env.STRAPI_API_TOKEN;
  const headers: HeadersInit = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(url, { cache: 'no-store', headers });
    if (!res.ok) return null;
    const json = (await res.json()) as T & { error?: unknown };
    if (json && typeof json === 'object' && 'error' in json && json.error) return null;
    return json as T;
  } catch {
    return null;
  }
}

function mediaUrls(value: unknown): string[] {
  if (!value || typeof value !== 'object') return [];
  const v = value as { url?: string; data?: any };
  if (typeof v.url === 'string') return [v.url];
  
  const urls: string[] = [];
  if (Array.isArray(v)) {
    for (const item of v) if (typeof item.url === 'string') urls.push(item.url);
  } else if (Array.isArray(v.data)) {
    for (const item of v.data) if (typeof item.url === 'string') urls.push(item.url);
  } else if (v.data && typeof v.data.url === 'string') {
    urls.push(v.data.url);
  }
  return urls;
}

function mediaUrl(value: unknown): string | null {
  const urls = mediaUrls(value);
  return urls.length > 0 ? urls[0] : null;
}

function mapHero(raw: Record<string, unknown> | null | undefined): HeroContent | null {
  if (!raw) return null;
  const subtitle = typeof raw.subtitle === 'string' ? raw.subtitle : null;
  const titleLine1 = typeof raw.titleLine1 === 'string' ? raw.titleLine1 : null;
  const titleLine2 = typeof raw.titleLine2 === 'string' ? raw.titleLine2 : null;
  const punchline = typeof raw.punchline === 'string' ? raw.punchline : null;
  if (!subtitle || !titleLine1 || !titleLine2 || !punchline) return null;

  const videoPath = mediaUrl(raw.video);
  const videoSrc = videoPath
    ? getStrapiMedia(videoPath) ?? DEFAULT_STOREFRONT.hero.videoSrc
    : DEFAULT_STOREFRONT.hero.videoSrc;

  return { subtitle, titleLine1, titleLine2, punchline, videoSrc };
}

function parseMarkdownList(text: unknown): string[] | undefined {
  if (typeof text !== 'string') return undefined;
  if (!text.trim()) return undefined;
  const lines = text.split('\n').map(l => l.trim().replace(/^[-*]\s*/, '')).filter(l => l.length > 0);
  return lines.length > 0 ? lines : [text];
}

function mapProduct(raw: Record<string, unknown>): ProductCard | null {
  const id = raw.documentId ?? raw.id;
  const name = typeof raw.name === 'string' ? raw.name : null;
  const type = typeof raw.type === 'string' ? raw.type : null;
  const price = typeof raw.price === 'string' ? raw.price : null;
  const imagePaths = mediaUrls(raw.image);
  const image = imagePaths.length > 0 ? getStrapiMedia(imagePaths[0]) ?? '/watch_collection_1.png' : '/watch_collection_1.png';
  const images = imagePaths.map(p => getStrapiMedia(p) || p).filter(Boolean) as string[];
  
  if (id == null || !name || !type || !price) return null;

  return { 
    id: id as string | number, 
    name, type, price, image, images,
    overview: typeof raw.overview === 'string' ? raw.overview : undefined,
    brand: typeof raw.brand === 'string' ? raw.brand : undefined,
    model: typeof raw.model === 'string' ? raw.model : undefined,
    movement: typeof raw.movement === 'string' ? raw.movement : undefined,
    display: typeof raw.display === 'string' ? raw.display : undefined,
    gender: typeof raw.gender === 'string' ? raw.gender : undefined,
    caseMaterial: typeof raw.caseMaterial === 'string' ? raw.caseMaterial : undefined,
    caseDiameter: typeof raw.caseDiameter === 'string' ? raw.caseDiameter : undefined,
    caseThickness: typeof raw.caseThickness === 'string' ? raw.caseThickness : undefined,
    dialColor: typeof raw.dialColor === 'string' ? raw.dialColor : undefined,
    glassType: typeof raw.glassType === 'string' ? raw.glassType : undefined,
    strapMaterial: typeof raw.strapMaterial === 'string' ? raw.strapMaterial : undefined,
    strapColor: typeof raw.strapColor === 'string' ? raw.strapColor : undefined,
    strapLength: typeof raw.strapLength === 'string' ? raw.strapLength : undefined,
    strapWidth: typeof raw.strapWidth === 'string' ? raw.strapWidth : undefined,
    claspType: typeof raw.claspType === 'string' ? raw.claspType : undefined,
    waterResistance: typeof raw.waterResistance === 'string' ? raw.waterResistance : undefined,
    weight: typeof raw.weight === 'string' ? raw.weight : undefined,
    keyFeatures: parseMarkdownList(raw.keyFeatures),
    packageIncludes: parseMarkdownList(raw.packageIncludes),
    warranty: typeof raw.warranty === 'string' ? raw.warranty : undefined,
    shippingDelivery: parseMarkdownList(raw.shippingDelivery),
    careInstructions: parseMarkdownList(raw.careInstructions),
  };
}

function mapReview(raw: Record<string, unknown>): ReviewCard | null {
  const id = raw.documentId ?? raw.id;
  const name = typeof raw.name === 'string' ? raw.name : null;
  const text = typeof raw.text === 'string' ? raw.text : null;
  const rating = typeof raw.rating === 'number' ? raw.rating : 5;
  if (id == null || !name || !text) return null;
  return { id: id as string | number, name, text, rating };
}

function stringField(value: unknown): string | null {
  if (typeof value === 'string') return value;
  if (value == null) return null;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return null;
}

function mapFaq(raw: Record<string, unknown>): FaqItem | null {
  const question = stringField(raw.question);
  const answer = stringField(raw.answer);
  if (!question?.trim() || !answer?.trim()) return null;
  return { question: question.trim(), answer: answer.trim() };
}

function mapPageHeading(raw: Record<string, unknown>): PageHeadingContent | null {
  const eyebrow = typeof raw.eyebrow === 'string' ? raw.eyebrow : null;
  const titleLine1 = typeof raw.titleLine1 === 'string' ? raw.titleLine1 : null;
  const titleLine2 = typeof raw.titleLine2 === 'string' ? raw.titleLine2 : null;
  if (!eyebrow || !titleLine1 || !titleLine2) return null;
  return { eyebrow, titleLine1, titleLine2 };
}

function mapContact(raw: Record<string, unknown> | null | undefined): ContactContent | null {
  if (!raw) return null;
  const eyebrow = typeof raw.eyebrow === 'string' ? raw.eyebrow : null;
  const titleLine1 = typeof raw.titleLine1 === 'string' ? raw.titleLine1 : null;
  const titleLine2 = typeof raw.titleLine2 === 'string' ? raw.titleLine2 : null;
  const body = typeof raw.body === 'string' ? raw.body : null;
  const whatsappUrl = typeof raw.whatsappUrl === 'string' ? raw.whatsappUrl : null;
  const instagramUrl = typeof raw.instagramUrl === 'string' ? raw.instagramUrl : null;
  if (!eyebrow || !titleLine1 || !titleLine2 || !body || !whatsappUrl || !instagramUrl) return null;
  return { eyebrow, titleLine1, titleLine2, body, whatsappUrl, instagramUrl };
}

function mapFooter(raw: Record<string, unknown> | null | undefined): FooterContent | null {
  if (!raw) return null;
  const creditEyebrow = typeof raw.creditEyebrow === 'string' ? raw.creditEyebrow : null;
  const designerFirstName = typeof raw.designerFirstName === 'string' ? raw.designerFirstName : null;
  const designerLastName = typeof raw.designerLastName === 'string' ? raw.designerLastName : null;
  const copyrightLine = typeof raw.copyrightLine === 'string' ? raw.copyrightLine : null;
  if (!creditEyebrow || !designerFirstName || !designerLastName || !copyrightLine) return null;
  return { creditEyebrow, designerFirstName, designerLastName, copyrightLine };
}

export async function getStorefrontContent(): Promise<StorefrontContent> {
  const published = qs({
    status: 'published',
    populate: '*',
  });

  const [
    heroRes,
    productsRes,
    brandsRes,
    reviewsRes,
    faqsRes,
    contactRes,
    headingsRes,
    footerRes,
  ] = await Promise.all([
    strapiFetchJson<StrapiSingleResponse<Record<string, unknown>>>('hero-section', published),
    strapiFetchJson<StrapiListResponse<Record<string, unknown>>>(
      'products',
      qs({ status: 'published', populate: '*', 'pagination[pageSize]': '100', sort: 'createdAt:asc' })
    ),
    strapiFetchJson<StrapiListResponse<Record<string, unknown>>>(
      'brands',
      qs({ status: 'published', populate: '*', 'pagination[pageSize]': '100', sort: 'sortOrder:asc' })
    ),
    strapiFetchJson<StrapiListResponse<Record<string, unknown>>>(
      'reviews',
      qs({ status: 'published', populate: '*', 'pagination[pageSize]': '100', sort: 'sortOrder:asc' })
    ),
    strapiFetchJson<StrapiListResponse<Record<string, unknown>>>(
      'faqs',
      qs({ status: 'published', populate: '*', 'pagination[pageSize]': '100', sort: 'sortOrder:asc' })
    ),
    strapiFetchJson<StrapiSingleResponse<Record<string, unknown>>>('contact-section', published),
    strapiFetchJson<StrapiListResponse<Record<string, unknown>>>(
      'page-headings',
      qs({ status: 'published', populate: '*', 'pagination[pageSize]': '25' })
    ),
    strapiFetchJson<StrapiSingleResponse<Record<string, unknown>>>('footer-section', published),
  ]);

  const base = DEFAULT_STOREFRONT;

  const hero = mapHero(heroRes?.data ?? undefined) ?? base.hero;

  const products =
    productsRes?.data?.map(mapProduct).filter(Boolean) as ProductCard[] | undefined;
  const mergedProducts = products && products.length > 0 ? products : base.products;

  const brandRows = brandsRes?.data ?? [];
  const brandsFromCms = brandRows
    .map((row) => ({
      name: typeof row.name === 'string' ? row.name : '',
      serif: Boolean(row.useSerifStyle),
    }))
    .filter((b) => b.name.length > 0);
  const brands = brandsFromCms.length > 0 ? brandsFromCms.map((b) => b.name) : base.brands;
  const brandSerifFlags =
    brandsFromCms.length > 0 ? brandsFromCms.map((b) => b.serif) : base.brandSerifFlags;

  const reviews =
    reviewsRes?.data?.map(mapReview).filter(Boolean) as ReviewCard[] | undefined;
  const mergedReviews = reviews && reviews.length > 0 ? reviews : base.reviews;

  const faqs = faqsRes?.data?.map(mapFaq).filter(Boolean) as FaqItem[] | undefined;
  const mergedFaqs = faqs && faqs.length > 0 ? faqs : base.faqs;

  const contact = mapContact(contactRes?.data ?? undefined) ?? base.contact;
  const footer = mapFooter(footerRes?.data ?? undefined) ?? base.footer;

  const headingBySection: Partial<Record<'catalogue' | 'reviews' | 'faq', PageHeadingContent>> = {};
  for (const row of headingsRes?.data ?? []) {
    const section = row.section;
    if (section !== 'catalogue' && section !== 'reviews' && section !== 'faq') continue;
    const mapped = mapPageHeading(row);
    if (mapped) headingBySection[section] = mapped;
  }

  return {
    hero,
    brands,
    brandSerifFlags,
    catalogueHeading: headingBySection.catalogue ?? base.catalogueHeading,
    products: mergedProducts,
    contact,
    reviewsHeading: headingBySection.reviews ?? base.reviewsHeading,
    reviews: mergedReviews,
    faqHeading: headingBySection.faq ?? base.faqHeading,
    faqs: mergedFaqs,
    footer,
  };
}
