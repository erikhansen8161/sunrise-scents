import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
          <div className="footer-section">
            <img src="/logo.svg" alt="Sunrise Scents" className="footer-logo" />
            <h3 className="gradient-text">Sunrise Scents</h3>
            <p>Crafting luxury fragrances that capture the essence of dawn's first light.</p>
            <div className="social-links">
              <a href="https://instagram.com/sunrisescents1" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://facebook.com/SunriseScents1" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://tiktok.com/@sunrisescents1" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.43z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@sunrisescents" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75,15.02 15.5,11.75 9.75,8.48"></polygon>
                </svg>
              </a>
              <a href="https://linkedin.com/company/sunrise-scents" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All Perfumes</Link></li>
              <li><Link to="/shop?category=floral">Floral Fragrances</Link></li>
              <li><Link to="/shop?category=woody">Woody Scents</Link></li>
              <li><Link to="/shop?category=fresh">Fresh & Clean</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faqs">FAQs</Link></li>
              <li><Link to="/allergen-disclaimer">Allergen Info</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Policies</h4>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/refund-policy">Refund Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect with Us Today</h4>
            <p>Subscribe to get updates on Sunrise Scents</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter Your Email Here"
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
            <div className="contact-info">
              <p><strong>Contact:</strong></p>
              <p>customersupport@sunrisescents.com</p>
              <p>PO Box 241, Quechee, VT 05059</p>
            </div>
          </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <p>&copy; 2024 Sunrise Scents. All rights reserved.</p>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
