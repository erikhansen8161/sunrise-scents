import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { products as defaultProducts, Product } from '../data/products';
import { useCart, CartItem } from '../contexts/CartContext';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } = useCart();

  // Check if we're on the landing page (home page)
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (isLandingPage) {
        // On landing page: Header appears when scrolling past the fullscreen landing
        setIsScrolled(window.scrollY > window.innerHeight * 0.8);
      } else {
        // On other pages: Header is always visible
        setIsScrolled(true);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage]);

  useEffect(() => {
    // Load products from localStorage or use defaults
    const savedProducts = localStorage.getItem('sunrise-products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        setProducts(parsed);
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
        setProducts(defaultProducts);
      }
    } else {
      setProducts(defaultProducts);
    }
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location.pathname === '/') {
      // If already on home page, scroll to Featured Collections
      const featuredSection = document.querySelector('[data-section="featured-collections"]');
      if (featuredSection) {
        featuredSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Navigate to home page (will trigger the return visit logic)
      navigate('/');
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchTerm('');
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const getFilteredProducts = () => {
    if (searchTerm.length < 2) return [];
    
    const searchLower = searchTerm.toLowerCase();
    return products.filter(product => {
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.inspiration.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.perfumeNotes?.top?.some(note => note.toLowerCase().includes(searchLower)) ||
        product.perfumeNotes?.heart?.some(note => note.toLowerCase().includes(searchLower)) ||
        product.perfumeNotes?.base?.some(note => note.toLowerCase().includes(searchLower))
      );
    }).slice(0, 5); // Limit to 5 results
  };

  const handleProductClick = (product: Product) => {
    setIsSearchOpen(false);
    setSearchTerm('');
    navigate(`/shop?search=${encodeURIComponent(product.name)}`);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    updateQuantity(item.product.id, item.size, newQuantity);
  };

  const handleRemoveItem = (item: CartItem) => {
    removeFromCart(item.product.id, item.size);
  };

  const filteredProducts = getFilteredProducts();

  // Close search and cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (isSearchOpen && !target.closest('.header-search-container')) {
        setIsSearchOpen(false);
        setSearchTerm('');
      }
      
      if (isCartOpen && !target.closest('.header-cart-container')) {
        setIsCartOpen(false);
      }
    };

    if (isSearchOpen || isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen, isCartOpen]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
          <Link to="/" className="logo">
            <img src="/logo-horizontal.svg" alt="Sunrise Scents" className="logo-image" />
          </Link>
          
          <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
            <a href="/" onClick={handleHomeClick} className="nav-link">Home</a>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/shop" className="nav-link">Shop</Link>
            <Link to="/faqs" className="nav-link">FAQs</Link>
          </nav>

          <div className="header-actions">
            <div className="header-search-container">
              <button 
                className={`search-btn ${isSearchOpen ? 'active' : ''}`} 
                onClick={handleSearchToggle}
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </button>
              
              {isSearchOpen && (
                <div className="header-search-dropdown header-search-v2">
                  <div className="search-input-container">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="header-search-input"
                      autoFocus
                    />
                    <button 
                      className="search-close-btn"
                      onClick={handleSearchToggle}
                      aria-label="Close search"
                    >
                      ×
                    </button>
                  </div>
                  
                  {filteredProducts.length > 0 && (
                    <div className="search-results">
                      {filteredProducts.map(product => (
                        <div
                          key={product.id}
                          className="search-result-item"
                          onClick={() => handleProductClick(product)}
                        >
                          <div className="result-info">
                            <div className="result-name">{product.name}</div>
                            <div className="result-category">{product.category}</div>
                            <div className="result-price">
                              10ml: ${product.prices['10ml']} | 30ml: ${product.prices['30ml']}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {searchTerm.length >= 2 && filteredProducts.length === 0 && (
                    <div className="no-results">
                      No products found for "{searchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="header-cart-container">
              <button 
                className={`cart-btn ${isCartOpen ? 'active' : ''}`} 
                onClick={handleCartToggle}
                aria-label="Shopping cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {getCartItemCount() > 0 && (
                  <span className="cart-badge">{getCartItemCount()}</span>
                )}
              </button>
              
              {isCartOpen && (
                <div className="header-cart-dropdown">
                  <div className="cart-header">
                    <h3>Shopping Cart ({getCartItemCount()})</h3>
                    {cartItems.length > 0 && (
                      <button className="clear-cart-btn" onClick={clearCart}>
                        Clear All
                      </button>
                    )}
                  </div>
                  
                  {cartItems.length === 0 ? (
                    <div className="empty-cart">
                      <p>Your cart is empty</p>
                      <Link to="/shop" onClick={() => setIsCartOpen(false)}>
                        Continue Shopping
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="cart-items">
                        {cartItems.map((item, index) => (
                          <div key={`${item.product.id}-${item.size}`} className="cart-item">
                            <div className="item-info">
                              <div className="item-name">{item.product.name}</div>
                              <div className="item-details">
                                <span className="item-size">{item.size}</span>
                                <span className="item-price">${item.product.prices[item.size]}</span>
                              </div>
                            </div>
                            <div className="item-controls">
                              <div className="quantity-controls">
                                <button 
                                  onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                                  +
                                </button>
                              </div>
                              <button 
                                className="remove-item-btn"
                                onClick={() => handleRemoveItem(item)}
                                aria-label="Remove item"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="cart-footer">
                        <div className="cart-total">
                          <strong>Total: ${getCartTotal().toFixed(2)}</strong>
                        </div>
                        <div className="cart-actions">
                          <Link 
                            to="/shop" 
                            className="continue-shopping-btn"
                            onClick={() => setIsCartOpen(false)}
                          >
                            Continue Shopping
                          </Link>
                          <button className="checkout-btn">
                            Checkout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
    </header>
  );
};

export default Header;
