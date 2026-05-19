import type { Metadata } from 'next';
import ProductsPageClient from '@/components/ProductsPageClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './products.css';

export const metadata: Metadata = {
  title: 'Collection | RJNF Luxury Watches',
  description:
    'Browse our curated collection of luxury timepieces. Filter by brand, category, movement and more.',
};

export default function ProductsPage() {
  return (
    <main className="relative bg-white min-h-screen">
      <div className="relative z-10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        {/* Dark header */}
        <div className="bg-obsidian">
          <Header variant="light" />
        </div>

        <ProductsPageClient />
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </main>
  );
}
