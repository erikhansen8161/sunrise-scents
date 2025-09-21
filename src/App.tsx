import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <ScrollToTop />
          {window.location.pathname !== '/admin' && <Header />}
          <main>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
          </main>
          {window.location.pathname !== '/admin' && <Footer />}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
