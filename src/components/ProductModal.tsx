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
              {product.images && product.images.length > 1 ? (
                <div className="product-modal-sub-images">
                  {product.images.slice(1, 3).map((img, idx) => (
                    <img key={idx} src={img} alt={`Detail ${idx + 1}`} />
                  ))}
                </div>
              ) : (
                <div className="product-modal-sub-images">
                  <img src={IMAGES[(typeof product.id === 'number' ? product.id : 0) % 4]} alt="Detail 1" />
                  <img src={IMAGES[(typeof product.id === 'number' ? product.id + 1 : 1) % 4]} alt="Detail 2" />
                </div>
              )}
            </div>
            <div className="product-modal-info">
              <span className="product-card-brand">{product.brand}</span>
              <h2 className="product-modal-title">{product.name}</h2>
              <p className="product-modal-price">{product.priceFormatted}</p>
              {/* Dynamic product details */}
              <div className="product-modal-spec-section">
                {product.overview && <p className="product-modal-desc">{product.overview}</p>}
                {!product.overview && (
                  <p className="product-modal-desc">
                    This exquisite timepiece combines exceptional craftsmanship with timeless design. Featuring precision engineering and premium materials, it represents the pinnacle of luxury watchmaking.
                  </p>
                )}
                
                <h3 className="spec-heading">Specifications</h3>
                <div className="product-modal-details">
                  <div className="product-modal-detail-item"><span>Brand</span><p>{product.brand}</p></div>
                  {product.model && <div className="product-modal-detail-item"><span>Model</span><p>{product.model}</p></div>}
                  <div className="product-modal-detail-item"><span>Movement</span><p>{product.movement}</p></div>
                  {product.display && <div className="product-modal-detail-item"><span>Display</span><p>{product.display}</p></div>}
                  {product.gender && <div className="product-modal-detail-item"><span>Gender</span><p>{product.gender}</p></div>}
                  {product.caseMaterial && <div className="product-modal-detail-item"><span>Case Material</span><p>{product.caseMaterial}</p></div>}
                  {product.caseDiameter && <div className="product-modal-detail-item"><span>Case Diameter</span><p>{product.caseDiameter}</p></div>}
                  {product.caseThickness && <div className="product-modal-detail-item"><span>Case Thickness</span><p>{product.caseThickness}</p></div>}
                  {product.dialColor && <div className="product-modal-detail-item"><span>Dial Color</span><p>{product.dialColor}</p></div>}
                  {product.glassType && <div className="product-modal-detail-item"><span>Glass Type</span><p>{product.glassType}</p></div>}
                  {product.strapMaterial && <div className="product-modal-detail-item"><span>Strap Material</span><p>{product.strapMaterial}</p></div>}
                  {product.strapColor && <div className="product-modal-detail-item"><span>Strap Color</span><p>{product.strapColor}</p></div>}
                  {product.strapLength && <div className="product-modal-detail-item"><span>Strap Length</span><p>{product.strapLength}</p></div>}
                  {product.strapWidth && <div className="product-modal-detail-item"><span>Strap Width</span><p>{product.strapWidth}</p></div>}
                  {product.claspType && <div className="product-modal-detail-item"><span>Clasp Type</span><p>{product.claspType}</p></div>}
                  {product.waterResistance && <div className="product-modal-detail-item"><span>Water Resistance</span><p>{product.waterResistance}</p></div>}
                  {product.weight && <div className="product-modal-detail-item"><span>Weight</span><p>{product.weight}</p></div>}
                </div>

                {product.keyFeatures && product.keyFeatures.length > 0 && (
                  <div className="product-modal-extra">
                    <h3 className="spec-heading">Key Features</h3>
                    <ul className="spec-list">
                      {product.keyFeatures.map((feat, idx) => <li key={idx}>{feat}</li>)}
                    </ul>
                  </div>
                )}

                {product.packageIncludes && product.packageIncludes.length > 0 && (
                  <div className="product-modal-extra">
                    <h3 className="spec-heading">Package Includes</h3>
                    <ul className="spec-list">
                      {product.packageIncludes.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                )}

                {product.warranty && (
                  <div className="product-modal-extra">
                    <h3 className="spec-heading">Warranty</h3>
                    <p className="spec-text">{product.warranty}</p>
                  </div>
                )}

                {product.shippingDelivery && product.shippingDelivery.length > 0 && (
                  <div className="product-modal-extra">
                    <h3 className="spec-heading">Shipping & Delivery</h3>
                    <ul className="spec-list">
                      {product.shippingDelivery.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                )}

                {product.careInstructions && product.careInstructions.length > 0 && (
                  <div className="product-modal-extra">
                    <h3 className="spec-heading">Care Instructions</h3>
                    <ul className="spec-list">
                      {product.careInstructions.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>
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
