import React from 'react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-title-section">
          <h1 className="hero-title fade-in">
            Capture the Essence of
            <span className="gradient-text"> Vermont</span>
          </h1>
        </div>
        
        <div className="hero-content">
          <div className="hero-text fade-in">
            <p className="hero-subtitle">
              Discover luxury fragrances at affordable prices, crafted with passion in Vermont's Green Mountains. 
              Each bottle features Sofia's personal photography from her running adventures with Missy, 
              making every fragrance a unique piece of art that captures New England's natural beauty.
            </p>
            <div className="hero-features">
              <div className="feature">
                <div className="feature-icon">📸</div>
                <span>Personal Vermont Photography</span>
              </div>
              <div className="feature">
                <div className="feature-icon">🏔️</div>
                <span>Handcrafted in Vermont</span>
              </div>
              <div className="feature">
                <div className="feature-icon">💎</div>
                <span>Luxury Quality, Fair Prices</span>
              </div>
            </div>
            <div className="hero-actions">
              <a href="#collections" className="btn btn-primary">
                Explore Collections
              </a>
              <a href="#about" className="btn btn-outline">
                Our Story
              </a>
            </div>
          </div>
          
          <div className="hero-visual fade-in">
            <div className="mountain-scene">
              <div className="perfume-bottles">
                <div className="bottle bottle-1">
                  <div className="bottle-label">Vermont Sunrise</div>
                  <div className="bottle-photo"></div>
                </div>
                <div className="bottle bottle-2">
                  <div className="bottle-label">Mountain Mist</div>
                  <div className="bottle-photo"></div>
                </div>
                <div className="bottle bottle-3">
                  <div className="bottle-label">Forest Trail</div>
                  <div className="bottle-photo"></div>
                </div>
              </div>
              <div className="scene-details">
                <div className="detail detail-1">🌲</div>
                <div className="detail detail-2">🦋</div>
                <div className="detail detail-3">🌸</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default HeroSection;
