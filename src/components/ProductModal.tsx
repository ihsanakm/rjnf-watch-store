'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IMAGES, type ProductItem } from './ProductsPageClient';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product || !mounted) return null;

  const modalContent = (
    <div className="product-modal-overlay animate-fade-in" onClick={onClose}>
      <div className="product-modal-content animate-slide-up" onClick={e => e.stopPropagation()}>
        <button className="product-modal-close" onClick={onClose} aria-label="Close modal">
          <X size={24} />
        </button>
        <div className="product-modal-scroll-container">
          <div className="product-modal-grid">
            <div className="product-modal-images">
              <img src={product.image} alt={product.name} className="product-modal-main-img" />
              <div className="product-modal-sub-images">
                <img src={IMAGES[(product.id) % 4]} alt="Detail 1" />
                <img src={IMAGES[(product.id + 1) % 4]} alt="Detail 2" />
              </div>
            </div>
            <div className="product-modal-info">
              <span className="product-card-brand">{product.brand}</span>
              <h2 className="product-modal-title">{product.name}</h2>
              <p className="product-modal-price">{product.priceFormatted}</p>
              <div className="product-modal-details">
                <div className="product-modal-detail-item">
                  <span>Category</span>
                  <p>{product.category}</p>
                </div>
                <div className="product-modal-detail-item">
                  <span>Movement</span>
                  <p>{product.movement}</p>
                </div>
              </div>
              <p className="product-modal-desc">
                This exquisite timepiece combines exceptional craftsmanship with timeless design. Featuring precision engineering and premium materials, it represents the pinnacle of luxury watchmaking.
              </p>
              <a 
                href={`https://wa.me/yourwhatsappnumber?text=I'm interested in the ${product.brand} ${product.name} (${product.priceFormatted})`}
                target="_blank" 
                rel="noopener noreferrer"
                className="product-modal-cta"
              >
                Inquire via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
