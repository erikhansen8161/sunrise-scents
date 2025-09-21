import React from 'react';
import './AboutSection.css';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section section">
        <div className="about-content">
          <div className="about-text fade-in">
            <h2>The Art of Fragrance</h2>
            <p className="lead">
              At Sunrise Scents, we believe that fragrance is more than just a scent – 
              it's a memory, an emotion, a moment captured in time.
            </p>
            <p>
              Founded with a passion for olfactory artistry, we craft each fragrance 
              using the finest ingredients sourced from around the world. Our master 
              perfumers blend tradition with innovation, creating scents that tell 
              stories and evoke the beauty of dawn's first light.
            </p>
            <p>
              From the sun-kissed citrus groves of Italy to the mystical sandalwood 
              forests of India, every bottle contains a journey of discovery and 
              the promise of transformation.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <h3 className="gradient-text">50+</h3>
                <p>Unique Fragrances</p>
              </div>
              <div className="stat">
                <h3 className="gradient-text">15+</h3>
                <p>Years of Expertise</p>
              </div>
              <div className="stat">
                <h3 className="gradient-text">100%</h3>
                <p>Natural Ingredients</p>
              </div>
            </div>
          </div>
          
          <div className="about-visual fade-in">
            <div className="visual-grid">
              <div className="visual-item large">
                <div className="visual-placeholder" style={{background: 'var(--gradient-primary)'}}>
                  <div className="ingredient-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                </div>
                <h4>Premium Ingredients</h4>
              </div>
              
              <div className="visual-item">
                <div className="visual-placeholder" style={{background: 'var(--accent-rose)'}}>
                  <div className="ingredient-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </div>
                </div>
                <h4>Crafted with Love</h4>
              </div>
              
              <div className="visual-item">
                <div className="visual-placeholder" style={{background: 'var(--accent-lavender)'}}>
                  <div className="ingredient-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                  </div>
                </div>
                <h4>Sustainable Practices</h4>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default AboutSection;
