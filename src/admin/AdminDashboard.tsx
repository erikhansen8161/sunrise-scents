import React, { useState } from 'react';
import ProductEditor from './ProductEditor';
import ContentEditor from './ContentEditor';
import AboutEditor from './AboutEditor';
import CategoryManager from './CategoryManager';
import ImageManager from './ImageManager';
import './AdminDashboard.css';

interface AdminDashboardProps {
  onLogout: () => void;
}

type ActiveTab = 'dashboard' | 'products' | 'categories' | 'about' | 'content' | 'images';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    onLogout();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductEditor />;
      case 'categories':
        return <CategoryManager />;
      case 'about':
        return <AboutEditor />;
      case 'content':
        return <ContentEditor />;
      case 'images':
        return <ImageManager />;
      default:
        return (
          <div className="dashboard-home">
            <h2>Welcome to Your Admin Panel</h2>
            <p>Choose what you'd like to manage from the menu above.</p>
            
            <div className="quick-stats">
              <div className="stat-card">
                <h3>16</h3>
                <p>Total Products</p>
              </div>
              <div className="stat-card">
                <h3>5</h3>
                <p>Product Categories</p>
              </div>
              <div className="stat-card">
                <h3>3</h3>
                <p>Website Pages</p>
              </div>
            </div>
            
            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button 
                  className="action-btn products"
                  onClick={() => setActiveTab('products')}
                >
                  <div className="btn-icon">🛍️</div>
                  <div>
                    <h4>Edit Products</h4>
                    <p>Add, edit, or remove perfumes</p>
                  </div>
                </button>

                <button 
                  className="action-btn categories"
                  onClick={() => setActiveTab('categories')}
                >
                  <div className="btn-icon">🏷️</div>
                  <div>
                    <h4>Manage Categories</h4>
                    <p>Create and edit product categories</p>
                  </div>
                </button>

                <button
                  className="action-btn about"
                  onClick={() => setActiveTab('about')}
                >
                  <div className="btn-icon">📖</div>
                  <div>
                    <h4>Edit About Page</h4>
                    <p>Update your company story and values</p>
                  </div>
                </button>
                
                <button 
                  className="action-btn images"
                  onClick={() => setActiveTab('images')}
                >
                  <div className="btn-icon">🖼️</div>
                  <div>
                    <h4>Manage Images</h4>
                    <p>Upload and organize photos</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-left">
          <img src="/logo-horizontal.svg" alt="Sunrise Scents" className="admin-logo" />
          <h1>Admin Panel</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      
      <nav className="admin-nav">
        <button 
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          🏠 Dashboard
        </button>
        <button 
          className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          🛍️ Products
        </button>
        <button 
          className={`nav-btn ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          🏷️ Categories
        </button>
        <button 
          className={`nav-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          📖 About Page
        </button>
        <button 
          className={`nav-btn ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          📝 Other Content
        </button>
        <button 
          className={`nav-btn ${activeTab === 'images' ? 'active' : ''}`}
          onClick={() => setActiveTab('images')}
        >
          🖼️ Images
        </button>
      </nav>
      
      <main className="admin-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
