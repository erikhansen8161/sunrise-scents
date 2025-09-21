import React, { useState } from 'react';
import './ContentEditor.css';

const ContentEditor: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const sections = [
    { id: 'home', name: '🏠 Home Page', description: 'Edit homepage content and hero section' },
    { id: 'about', name: '📖 About Page', description: 'Update about page text and story' },
    { id: 'contact', name: '📞 Contact Info', description: 'Update contact information and addresses' }
  ];

  return (
    <div className="content-editor">
      <div className="editor-header">
        <div>
          <h2>Content Management</h2>
          <p>Update text content across your website</p>
        </div>
      </div>

      <div className="content-sections">
        <div className="sections-nav">
          {sections.map(section => (
            <button
              key={section.id}
              className={`section-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <div className="section-info">
                <h3>{section.name}</h3>
                <p>{section.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="content-form">
          {activeSection === 'home' && <HomeContentEditor />}
          {activeSection === 'about' && <AboutContentEditor />}
          {activeSection === 'contact' && <ContactContentEditor />}
        </div>
      </div>
    </div>
  );
};

const HomeContentEditor: React.FC = () => {
  const [homeContent, setHomeContent] = useState({
    heroTitle: 'Capture the Essence of Dawn',
    heroSubtitle: 'Discover luxury fragrances that awaken your senses and illuminate your spirit.',
    aboutTitle: 'The Art of Fragrance',
    aboutText: 'At Sunrise Scents, we believe that fragrance is more than just a scent...'
  });

  const handleSave = () => {
    localStorage.setItem('home-content', JSON.stringify(homeContent));
    alert('Home page content saved successfully!');
  };

  return (
    <div className="content-form-section">
      <h3>Home Page Content</h3>
      
      <div className="form-group">
        <label>Hero Title</label>
        <input
          type="text"
          value={homeContent.heroTitle}
          onChange={(e) => setHomeContent({...homeContent, heroTitle: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>Hero Subtitle</label>
        <textarea
          value={homeContent.heroSubtitle}
          onChange={(e) => setHomeContent({...homeContent, heroSubtitle: e.target.value})}
          rows={3}
        />
      </div>
      
      <div className="form-group">
        <label>About Section Title</label>
        <input
          type="text"
          value={homeContent.aboutTitle}
          onChange={(e) => setHomeContent({...homeContent, aboutTitle: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>About Section Text</label>
        <textarea
          value={homeContent.aboutText}
          onChange={(e) => setHomeContent({...homeContent, aboutText: e.target.value})}
          rows={5}
        />
      </div>
      
      <button className="btn btn-primary" onClick={handleSave}>
        Save Home Page Changes
      </button>
    </div>
  );
};

const AboutContentEditor: React.FC = () => {
  return (
    <div className="content-form-section">
      <h3>About Page Content</h3>
      <p className="coming-soon">About page editor coming soon! For now, you can edit the About page content by modifying the AboutPage.tsx file.</p>
    </div>
  );
};

const ContactContentEditor: React.FC = () => {
  const [contactInfo, setContactInfo] = useState({
    email: 'customersupport@sunrisescents.com',
    address: 'PO Box 241, Quechee, Vermont 05059',
    phone: ''
  });

  const handleSave = () => {
    localStorage.setItem('contact-info', JSON.stringify(contactInfo));
    alert('Contact information saved successfully!');
  };

  return (
    <div className="content-form-section">
      <h3>Contact Information</h3>
      
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          value={contactInfo.email}
          onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
        />
      </div>
      
      <div className="form-group">
        <label>Business Address</label>
        <textarea
          value={contactInfo.address}
          onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
          rows={2}
        />
      </div>
      
      <div className="form-group">
        <label>Phone Number (Optional)</label>
        <input
          type="tel"
          value={contactInfo.phone}
          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
          placeholder="(555) 123-4567"
        />
      </div>
      
      <button className="btn btn-primary" onClick={handleSave}>
        Save Contact Information
      </button>
    </div>
  );
};

export default ContentEditor;
