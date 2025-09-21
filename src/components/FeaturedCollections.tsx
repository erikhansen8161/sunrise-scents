import React, { useState, useEffect } from 'react';
import { getCategories, Category } from '../data/categories';
import './FeaturedCollections.css';

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  gradient: string;
}

const FeaturedCollections: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    // Load categories and convert to collections
    const categories = getCategories();
    const collectionsFromCategories: Collection[] = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image || '/api/placeholder/300/400',
      gradient: `linear-gradient(135deg, ${category.color} 0%, ${adjustColorBrightness(category.color, 20)} 100%)`
    }));
    setCollections(collectionsFromCategories);
  }, []);

  // Helper function to adjust color brightness for gradient
  const adjustColorBrightness = (color: string, percent: number): string => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  return (
    <section id="collections" className="featured-collections section">
        <div className="section-header fade-in">
          <h2>Featured Collections</h2>
          <p>Discover our signature fragrance families, each crafted to tell a unique story</p>
        </div>

        <div className="collections-grid">
          {collections.map((collection, index) => (
            <div 
              key={collection.id} 
              className="collection-card fade-in"
              style={{ animationDelay: `${0.2 * (index + 1)}s` }}
            >
              <div className="card-image">
                {collection.image && collection.image !== '/api/placeholder/300/400' ? (
                  <div className="category-image-container">
                    <img 
                      src={collection.image} 
                      alt={collection.name}
                      className="category-image"
                    />
                    <div className="image-gradient-overlay" style={{ background: collection.gradient }}></div>
                  </div>
                ) : (
                  <div 
                    className="image-placeholder"
                    style={{ background: collection.gradient }}
                  >
                    <div className="perfume-silhouette"></div>
                  </div>
                )}
                <div className="card-overlay">
                  <a href={`/shop?category=${collection.id}`} className="view-collection-btn">
                    View Collection
                  </a>
                </div>
              </div>
              
              <div className="card-content">
                <h3>{collection.name}</h3>
                <p>{collection.description}</p>
                <a href={`/shop?category=${collection.id}`} className="learn-more">
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};

export default FeaturedCollections;
