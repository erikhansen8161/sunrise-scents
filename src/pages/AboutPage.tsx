import React, { useState, useEffect } from 'react';
import { AboutContent, defaultAboutContent } from '../data/aboutContent';
import './AboutPage.css';

const AboutPage: React.FC = () => {
  const [content, setContent] = useState<AboutContent>(defaultAboutContent);

  useEffect(() => {
    // Load saved content from localStorage
    const savedContent = localStorage.getItem('about-content');
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        setContent({ ...defaultAboutContent, ...parsed });
      } catch (error) {
        console.error('Error loading about content:', error);
      }
    }
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section - Brand Introduction */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>{content.heroTitle}</h1>
            <p className="hero-subtitle">
              {content.heroSubtitle}
            </p>
            <div className="brand-description">
              {content.brandDescription.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="made-in-badge">
              <span>🏔️ Made in Vermont</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sofia's Story Section */}
      <section className="sofia-story section">
        <div className="container">
          <div className="story-header">
            <h2>{content.storyTitle}</h2>
            <h3 className="story-subtitle">{content.storySubtitle}</h3>
          </div>
          
          <div className="story-content">
            <div className="story-text">
              <p className="story-paragraph">
                {content.storyParagraph1}
              </p>
              <p className="story-paragraph">
                {content.storyParagraph2}
              </p>
              <p className="story-paragraph">
                {content.storyParagraph3}
              </p>
              <p className="story-paragraph">
                {content.storyParagraph4}
              </p>
              {content.storyParagraph5 && (
                <p className="story-paragraph">
                  {content.storyParagraph5}
                </p>
              )}
              
              <div className="founder-signature">
                <p><strong>{content.founderName}</strong></p>
              </div>
            </div>
            
            <div className="story-visual">
              <div className="visual-card">
                <div className="visual-icon">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <h4>Crafted with Love</h4>
                <p>Every fragrance is a labor of love, created to bring joy and healing through scent.</p>
              </div>
              
              <div className="visual-card">
                <div className="visual-icon">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h4>IFRA Compliant</h4>
                <p>All fragrances meet International Fragrance Association standards for safety and quality.</p>
              </div>
              
              <div className="visual-card">
                <div className="visual-icon">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21,15 16,10 5,21"></polyline>
                  </svg>
                </div>
                <h4>Scenic Photography</h4>
                <p>Labels feature Sofia's own photography from her travels with Missy across New England.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Quote Section */}
      <section className="founder-quote section">
        <div className="container">
          <div className="quote-content">
            <h2>{content.founderQuoteTitle}</h2>
            <blockquote className="founder-quote-text">
              "{content.founderQuote}"
            </blockquote>
            <p className="founder-signature-quote">{content.founderSignature}</p>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="company-info section">
        <div className="container">
          <div className="company-details">
            <h3>Our Location</h3>
            <p>
              <strong>{content.companyName}</strong><br/>
              {content.address.split('\n').map((line, index) => (
                <span key={index}>{line}<br/></span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="disclaimer-section section">
        <div className="container">
          <div className="disclaimer-content">
            <h2>{content.disclaimerTitle}</h2>
            <div className="disclaimer-text">
              {content.disclaimerContent.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <p className="disclaimer-contact">
              {content.disclaimerContact}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
