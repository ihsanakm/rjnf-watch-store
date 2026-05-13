import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import ProductCatalogue from '@/components/ProductCatalogue';
import Contact from '@/components/Contact';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { getStorefrontContent } from '@/lib/strapi-home';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const cms = await getStorefrontContent();

  return (
    <main className="relative bg-white">
      <div className="relative z-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <Hero content={cms.hero} />
        <Brands brands={cms.brands} brandSerifFlags={cms.brandSerifFlags} />
        <ProductCatalogue products={cms.products} heading={cms.catalogueHeading} />
        <Contact content={cms.contact} />
        <Reviews reviews={cms.reviews} heading={cms.reviewsHeading} />
        <FAQ faqs={cms.faqs} heading={cms.faqHeading} />
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer content={cms.footer} />
      </div>
    </main>
  );
}
