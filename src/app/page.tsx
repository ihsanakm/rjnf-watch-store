import Hero from '@/components/Hero';
import Brands from '@/components/Brands';
import ProductCatalogue from '@/components/ProductCatalogue';
import Contact from '@/components/Contact';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative bg-white">
      {/* Scrollable content container with higher z-index */}
      <div className="relative z-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <Hero />
        <Brands />
        <ProductCatalogue />
        <Contact />
        <Reviews />
        <FAQ />
      </div>

      {/* Sticky footer that gets revealed */}
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </main>
  );
}
