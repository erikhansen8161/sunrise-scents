import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useCart } from '../contexts/CartContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<'10ml' | '30ml'>('10ml');
  const [showDetails, setShowDetails] = useState(false);
  const { addToCart, isInCart } = useCart();

  // Fallback for products that might have old structure
  const prices = product.prices || { '10ml': 15.00, '30ml': 35.00 };
  const perfumeNotes = product.perfumeNotes || { top: [], heart: [], base: [] };
  const concentration = product.concentration || 'Eau de Parfum (EDP)';
  const sizes = product.sizes || ['10ml', '30ml'];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
  };

  const inCart = isInCart(product.id, selectedSize);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
        {(product.images && product.images.length > 0 && product.images[0].startsWith('data:image/')) || 
         (product.image && product.image !== '/images/placeholder.jpg' && product.image.startsWith('data:image/')) ? (
          <div className="product-image-container">
            <img 
              src={product.images && product.images.length > 0 ? product.images[0] : product.image} 
              alt={product.name}
              className="product-image-actual"
            />
            <div className="category-badge">
              {product.category}
            </div>
          </div>
        ) : (
          <div className="image-placeholder">
            <div className="perfume-bottle-icon">
              <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
                <rect x="15" y="0" width="10" height="8" fill="currentColor" opacity="0.7" rx="2"/>
                <rect x="8" y="8" width="24" height="45" fill="currentColor" opacity="0.8" rx="8"/>
                <rect x="12" y="15" width="16" height="25" fill="currentColor" opacity="0.3" rx="4"/>
                <circle cx="20" cy="25" r="3" fill="currentColor" opacity="0.5"/>
              </svg>
            </div>
            <div className="category-badge">
              {product.category}
            </div>
          </div>
        )}
        </div>
      </Link>
      
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-name-link">
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-inspiration">{product.inspiration}</p>
        <p className="product-concentration">{concentration}</p>
        
        {/* Size and Price Selection */}
        <div className="size-price-section">
          <div className="size-options">
            {sizes.map(size => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size} - ${prices[size].toFixed(2)}
              </button>
            ))}
          </div>
        </div>

        {/* Perfume Notes Preview */}
        <div className="notes-preview">
          <button 
            className="notes-toggle"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? '− Hide Details' : '+ Perfume Notes'}
          </button>
          
          {showDetails && (
            <div className="notes-details">
              <div className="notes-section">
                <strong>Top Notes:</strong> {perfumeNotes.top.join(', ') || 'Not specified'}
              </div>
              <div className="notes-section">
                <strong>Heart Notes:</strong> {perfumeNotes.heart.join(', ') || 'Not specified'}
              </div>
              <div className="notes-section">
                <strong>Base Notes:</strong> {perfumeNotes.base.join(', ') || 'Not specified'}
              </div>
              <div className="description-full">
                {product.description}
              </div>
            </div>
          )}
        </div>
        
        <div className="product-footer">
          <div className="selected-price">
            ${prices[selectedSize].toFixed(2)}
          </div>
          <button 
            className={`add-to-cart-btn ${inCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
          >
            {inCart ? '✓ Added to Cart' : `Add ${selectedSize} to Cart`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
