import React, { useEffect, useState } from 'react';
import './FullscreenLanding.css';

const FullscreenLanding: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="fullscreen-landing">
      <div 
        className="landing-background"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          backgroundImage: `
            linear-gradient(
              135deg,
              rgba(0, 0, 0, 0.4) 0%,
              rgba(0, 0, 0, 0.2) 30%,
              rgba(0, 0, 0, 0.3) 70%,
              rgba(0, 0, 0, 0.5) 100%
            ),
            url('/images/pogue-photo.jpg')
          `
        }}
      >
        <div className="landscape-overlay"></div>
      </div>
      
      <div className="landing-content">
        <div className="landing-logo">
          <img src="/logo-horizontal.svg" alt="Sunrise Scents" />
        </div>
        
        <div className="landing-text">
          <h1 className="landing-title">
            Luxury fragrances at affordable prices
          </h1>
          <p className="landing-subtitle">
            Fragrances rooted in emotion, memory, and mindful escape
          </p>
          <p className="landing-tagline">
            Handcrafted in Vermont's Green Mountains
          </p>
        </div>

        <button className="scroll-down-btn" onClick={scrollToContent}>
          <span>Explore Collections</span>
          <div className="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </button>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <div className="scroll-dot"></div>
      </div>
    </section>
  );
};

export default FullscreenLanding;
