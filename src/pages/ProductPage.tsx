import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Product, products as defaultProducts } from '../data/products';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ProductCard';
import './ProductPage.css';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<'10ml' | '30ml'>('10ml');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    // Load products from localStorage or use defaults
    const savedProducts = localStorage.getItem('sunrise-products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        setProducts(parsed);
        const foundProduct = parsed.find((p: Product) => p.id === id);
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
        setProducts(defaultProducts);
        const foundProduct = defaultProducts.find(p => p.id === id);
        setProduct(foundProduct || null);
      }
    } else {
      setProducts(defaultProducts);
      const foundProduct = defaultProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="product-page">
        <div className="product-not-found">
          <h1>Product Not Found</h1>
          <p>The product you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/shop')} className="btn btn-primary">
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // Fallback for products that might have old structure
  const prices = product.prices || { '10ml': 15.00, '30ml': 35.00 };
  const perfumeNotes = product.perfumeNotes || { top: [], heart: [], base: [] };
  const concentration = product.concentration || 'Eau de Parfum (EDP)';
  const sizes = product.sizes || ['10ml', '30ml'];

  // Get product images - prioritize new images array, fallback to single image
  const productImages = product.images && product.images.length > 0 
    ? product.images.filter(img => img && img.startsWith('data:image/'))
    : (product.image && product.image !== '/images/placeholder.jpg' && product.image.startsWith('data:image/'))
      ? [product.image]
      : [];

  // Always show 5 images for consistency - fill with default placeholders if needed
  const displayImages = [];
  for (let i = 0; i < 5; i++) {
    if (i < productImages.length) {
      displayImages.push(productImages[i]);
    } else {
      displayImages.push('default');
    }
  }

  // Get recommended products (same category, excluding current product)
  const recommendedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
  };

  const inCart = isInCart(product.id, selectedSize);

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Product Images Gallery */}
        <div className="product-images">
          <div className="main-image">
            {displayImages[selectedImageIndex] === 'default' ? (
              <div className="default-product-image">
                <div className="perfume-bottle-placeholder">
                  <div className="bottle-cap"></div>
                  <div className="bottle-neck"></div>
                  <div className="bottle-body"></div>
                  <div className="bottle-base"></div>
                </div>
              </div>
            ) : (
              <img 
                src={displayImages[selectedImageIndex]} 
                alt={product.name}
                className="product-main-image"
              />
            )}
          </div>
          
          <div className="image-thumbnails">
            {displayImages.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImageIndex === index ? 'active' : ''}`}
                onClick={() => setSelectedImageIndex(index)}
              >
                {image === 'default' ? (
                  <div className="thumbnail-placeholder">
                    <div className="thumbnail-perfume-bottle">
                      <div className="thumbnail-bottle-cap"></div>
                      <div className="thumbnail-bottle-neck"></div>
                      <div className="thumbnail-bottle-body"></div>
                      <div className="thumbnail-bottle-base"></div>
                    </div>
                  </div>
                ) : (
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                )}
              </button>
            ))}
          </div>

          {/* Recommended Products Mini Grid */}
          <div className="mini-recommendations">
            <h4>You Might Also Like</h4>
            <div className="mini-products-grid">
              {recommendedProducts.length > 0 ? recommendedProducts.slice(0, 4).map(recProduct => (
                  <Link 
                    key={recProduct.id} 
                    to={`/product/${recProduct.id}`} 
                    className="mini-product-card"
                  >
                    <div className="mini-product-image">
                      {(recProduct.images && recProduct.images.length > 0 && recProduct.images[0].startsWith('data:image/')) || 
                       (recProduct.image && recProduct.image !== '/images/placeholder.jpg' && recProduct.image.startsWith('data:image/')) ? (
                        <img 
                          src={recProduct.images && recProduct.images.length > 0 ? recProduct.images[0] : recProduct.image} 
                          alt={recProduct.name}
                        />
                      ) : (
                        <div className="mini-placeholder">
                          <div className="mini-perfume-bottle">
                            <div className="mini-bottle-cap"></div>
                            <div className="mini-bottle-neck"></div>
                            <div className="mini-bottle-body"></div>
                            <div className="mini-bottle-base"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mini-product-info">
                      <h5>{recProduct.name}</h5>
                      <p className="mini-price">${recProduct.prices?.['10ml']?.toFixed(2) || '15.00'}</p>
                    </div>
                  </Link>
                )) : (
                  <div className="no-recommendations">
                    <p>No other products in this category yet.</p>
                  </div>
                )}
              </div>
            </div>
        </div>

        {/* Product Information */}
        <div className="product-details">
          <div className="product-header">
            <div className="product-category">{product.category}</div>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-inspiration">{product.inspiration}</p>
            <div className="product-concentration">{concentration}</div>
          </div>

          <div className="product-pricing">
            <div className="price-display">
              <span className="current-price">${prices[selectedSize].toFixed(2)}</span>
              <span className="size-label">{selectedSize}</span>
            </div>
            
            <div className="size-options">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size} - ${prices[size].toFixed(2)}
                </button>
              ))}
            </div>
          </div>

          <div className="product-actions">
            <button 
              className={`add-to-cart-btn ${inCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
            >
              {inCart ? '✓ Added to Cart' : `Add ${selectedSize} to Cart`}
            </button>
            <button className="wishlist-btn">
              ♡ Add to Wishlist
            </button>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="perfume-notes">
            <h3>Fragrance Notes</h3>
            <div className="notes-breakdown">
              <div className="note-section">
                <h4>Top Notes</h4>
                <p>{perfumeNotes.top.join(', ') || 'Not specified'}</p>
              </div>
              <div className="note-section">
                <h4>Heart Notes</h4>
                <p>{perfumeNotes.heart.join(', ') || 'Not specified'}</p>
              </div>
              <div className="note-section">
                <h4>Base Notes</h4>
                <p>{perfumeNotes.base.join(', ') || 'Not specified'}</p>
              </div>
            </div>
          </div>

          <div className="product-features">
            <div className="feature">
              <span className="feature-icon">🌿</span>
              <span>Vegan & Cruelty-Free</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🏔️</span>
              <span>Made in Vermont</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔄</span>
              <span>Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs">
        <div className="tab-container">
          <button 
            className={`tab ${!showReviews ? 'active' : ''}`}
            onClick={() => setShowReviews(false)}
          >
            About
          </button>
          <button 
            className={`tab ${showReviews ? 'active' : ''}`}
            onClick={() => setShowReviews(true)}
          >
            Reviews (12)
          </button>
        </div>

        <div className="tab-content">
          {!showReviews ? (
            <div className="about-content">
              <h3>About This Fragrance</h3>
              <p>{product.description}</p>
              
              <h4>How to Use</h4>
              <p>Apply to pulse points - wrists, neck, and behind ears. For best results, apply to moisturized skin. The fragrance will develop and evolve throughout the day.</p>
              
              <h4>Storage</h4>
              <p>Store in a cool, dry place away from direct sunlight. Keep the cap tightly closed when not in use to preserve the fragrance.</p>
            </div>
          ) : (
            <div className="reviews-content">
              <div className="reviews-summary">
                <div className="rating-display">
                  <div className="stars">★★★★★</div>
                  <span className="rating-text">4.8 out of 5</span>
                </div>
                <p>Based on 12 reviews</p>
              </div>

              <div className="reviews-list">
                {[
                  { name: "Sarah M.", rating: 5, comment: "Absolutely love this scent! It's exactly what I was looking for - fresh and elegant." },
                  { name: "Jessica L.", rating: 5, comment: "Perfect for everyday wear. The longevity is amazing and it smells divine." },
                  { name: "Emily R.", rating: 4, comment: "Great quality for the price. Will definitely order again." },
                  { name: "Amanda K.", rating: 5, comment: "The packaging was beautiful and the scent is exactly as described. Highly recommend!" }
                ].map((review, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <span className="reviewer-name">{review.name}</span>
                      <div className="review-stars">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProductPage;
