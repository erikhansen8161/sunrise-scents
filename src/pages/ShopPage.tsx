import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products as defaultProducts, Product } from '../data/products';
import { getCategories } from '../data/categories';
import ProductCard from '../components/ProductCard';
import './ShopPage.css';

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; }[]>([]);

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

    // Load categories
    const dynamicCategories = getCategories();
    setCategories([
      { id: 'all', name: 'All Products' },
      ...dynamicCategories.map(cat => ({ id: cat.id, name: cat.name }))
    ]);
  }, []);

  useEffect(() => {
    // Check URL parameters for category filter and search
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam && categoryParam !== 'all') {
      setSelectedCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    if (searchTerm === '') {
      return matchesCategory;
    }
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      // Search in product name
      product.name.toLowerCase().includes(searchLower) ||
      // Search in inspiration
      product.inspiration.toLowerCase().includes(searchLower) ||
      // Search in description
      product.description.toLowerCase().includes(searchLower) ||
      // Search in concentration
      product.concentration.toLowerCase().includes(searchLower) ||
      // Search in category
      product.category.toLowerCase().includes(searchLower) ||
      // Search in perfume notes - top notes
      product.perfumeNotes?.top?.some(note => 
        note.toLowerCase().includes(searchLower)
      ) ||
      // Search in perfume notes - heart notes
      product.perfumeNotes?.heart?.some(note => 
        note.toLowerCase().includes(searchLower)
      ) ||
      // Search in perfume notes - base notes
      product.perfumeNotes?.base?.some(note => 
        note.toLowerCase().includes(searchLower)
      );
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="shop-page">
      {/* Hero Section */}
      <section className="shop-hero">
          <div className="shop-hero-content">
            <h1>Our Collection</h1>
            <p className="shop-subtitle">
              Locally crafted fragrances made in Vermont. Each scent is carefully inspired by 
              luxury perfumes and created with premium ingredients at an affordable price.
            </p>
            <div className="made-in-badge">
              <span>🏔️ Made in Vermont</span>
            </div>
          </div>
      </section>

      {/* Filters Section */}
      <section className="shop-filters">
          <div className="filters-content">
            <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search by name, notes, inspiration, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
          <div className="products-header">
            <h2>Perfumes</h2>
            <p className="products-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
              >
                View All Products
              </button>
            </div>
          )}
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
          <div className="newsletter-content">
            <h3>Connect with Us Today</h3>
            <p>Get updates on new fragrances and exclusive offers</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter Your Email Here"
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
            <label className="newsletter-checkbox">
              <input type="checkbox" />
              <span>Yes, Subscribe me to get updates on Sunrise Scents</span>
            </label>
          </div>
      </section>
    </div>
  );
};

export default ShopPage;
