import React, { useState, useEffect } from 'react';
import { AboutContent, defaultAboutContent } from '../data/aboutContent';
import './AboutEditor.css';

const AboutEditor: React.FC = () => {
  const [content, setContent] = useState<AboutContent>(defaultAboutContent);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hasChanges, setHasChanges] = useState(false);

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

  const handleSave = () => {
    localStorage.setItem('about-content', JSON.stringify(content));
    setHasChanges(false);
    alert('About page content saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset to default content? This will lose all your changes.')) {
      setContent(defaultAboutContent);
      localStorage.removeItem('about-content');
      setHasChanges(true);
    }
  };

  const updateContent = (field: string, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const sections = [
    { id: 'hero', name: '🏠 Hero Section', description: 'Brand introduction and description' },
    { id: 'story', name: '📖 Sofia\'s Story', description: 'Personal journey and background' },
    { id: 'quote', name: '💬 Founder Quote', description: 'Sofia\'s personal message' },
    { id: 'company', name: '🏢 Company Info', description: 'Location and contact details' },
    { id: 'disclaimer', name: '⚖️ Legal Disclaimer', description: 'Legal and compliance information' },
  ];

  const renderHeroEditor = () => (
    <div className="editor-section">
      <h3>Hero Section - Brand Introduction</h3>
      <div className="form-group">
        <label>Hero Title</label>
        <input
          type="text"
          value={content.heroTitle}
          onChange={(e) => updateContent('heroTitle', e.target.value)}
          placeholder="Sunrise Scents Brand"
        />
      </div>
      <div className="form-group">
        <label>Hero Subtitle</label>
        <textarea
          value={content.heroSubtitle}
          onChange={(e) => updateContent('heroSubtitle', e.target.value)}
          placeholder="A fragrance house rooted in emotion, memory, and mindful escape"
          rows={2}
        />
      </div>
      <div className="form-group">
        <label>Brand Description</label>
        <textarea
          value={content.brandDescription}
          onChange={(e) => updateContent('brandDescription', e.target.value)}
          placeholder="Use double line breaks (\\n\\n) to separate paragraphs"
          rows={8}
        />
        <small>Tip: Use \\n\\n to create paragraph breaks</small>
      </div>
    </div>
  );

  const renderStoryEditor = () => (
    <div className="editor-section">
      <h3>Sofia's Story Section</h3>
      <div className="form-group">
        <label>Story Title</label>
        <input
          type="text"
          value={content.storyTitle}
          onChange={(e) => updateContent('storyTitle', e.target.value)}
          placeholder="Our Story"
        />
      </div>
      <div className="form-group">
        <label>Story Subtitle</label>
        <input
          type="text"
          value={content.storySubtitle}
          onChange={(e) => updateContent('storySubtitle', e.target.value)}
          placeholder="Sunrise Scents: A Story of Passion and Healing"
        />
      </div>
      <div className="form-group">
        <label>Story Paragraph 1</label>
        <textarea
          value={content.storyParagraph1}
          onChange={(e) => updateContent('storyParagraph1', e.target.value)}
          rows={4}
        />
      </div>
      <div className="form-group">
        <label>Story Paragraph 2</label>
        <textarea
          value={content.storyParagraph2}
          onChange={(e) => updateContent('storyParagraph2', e.target.value)}
          rows={4}
        />
      </div>
      <div className="form-group">
        <label>Story Paragraph 3</label>
        <textarea
          value={content.storyParagraph3}
          onChange={(e) => updateContent('storyParagraph3', e.target.value)}
          rows={4}
        />
      </div>
      <div className="form-group">
        <label>Story Paragraph 4</label>
        <textarea
          value={content.storyParagraph4}
          onChange={(e) => updateContent('storyParagraph4', e.target.value)}
          rows={4}
        />
      </div>
      <div className="form-group">
        <label>Story Paragraph 5 (Optional)</label>
        <textarea
          value={content.storyParagraph5}
          onChange={(e) => updateContent('storyParagraph5', e.target.value)}
          rows={3}
        />
      </div>
      <div className="form-group">
        <label>Founder Name</label>
        <input
          type="text"
          value={content.founderName}
          onChange={(e) => updateContent('founderName', e.target.value)}
          placeholder="Sofia Hansen"
        />
      </div>
    </div>
  );

  const renderQuoteEditor = () => (
    <div className="editor-section">
      <h3>Founder Quote Section</h3>
      <div className="form-group">
        <label>Quote Section Title</label>
        <input
          type="text"
          value={content.founderQuoteTitle}
          onChange={(e) => updateContent('founderQuoteTitle', e.target.value)}
          placeholder="A Message from Our Founder"
        />
      </div>
      <div className="form-group">
        <label>Founder Quote</label>
        <textarea
          value={content.founderQuote}
          onChange={(e) => updateContent('founderQuote', e.target.value)}
          rows={6}
        />
      </div>
      <div className="form-group">
        <label>Founder Signature</label>
        <input
          type="text"
          value={content.founderSignature}
          onChange={(e) => updateContent('founderSignature', e.target.value)}
          placeholder="— Sofia Hansen, CEO & Founder"
        />
      </div>
    </div>
  );

  const renderCompanyEditor = () => (
    <div className="editor-section">
      <h3>Company Information</h3>
      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          value={content.companyName}
          onChange={(e) => updateContent('companyName', e.target.value)}
          placeholder="Sunrise Scents, LLC."
        />
      </div>
      <div className="form-group">
        <label>Business Address</label>
        <textarea
          value={content.address}
          onChange={(e) => updateContent('address', e.target.value)}
          placeholder="PO Box 241&#10;Quechee, Vermont 05059"
          rows={3}
        />
        <small>Tip: Use line breaks for multi-line addresses</small>
      </div>
    </div>
  );

  const renderDisclaimerEditor = () => (
    <div className="editor-section">
      <h3>Legal Disclaimer</h3>
      <div className="form-group">
        <label>Disclaimer Title</label>
        <input
          type="text"
          value={content.disclaimerTitle}
          onChange={(e) => updateContent('disclaimerTitle', e.target.value)}
          placeholder="Disclaimer - Sunrise Scents"
        />
      </div>
      <div className="form-group">
        <label>Disclaimer Content</label>
        <textarea
          value={content.disclaimerContent}
          onChange={(e) => updateContent('disclaimerContent', e.target.value)}
          rows={12}
        />
        <small>Tip: Use \\n\\n to create paragraph breaks</small>
      </div>
      <div className="form-group">
        <label>Contact Information</label>
        <textarea
          value={content.disclaimerContact}
          onChange={(e) => updateContent('disclaimerContact', e.target.value)}
          rows={2}
          placeholder="For questions, contact us at..."
        />
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'hero': return renderHeroEditor();
      case 'story': return renderStoryEditor();
      case 'quote': return renderQuoteEditor();
      case 'company': return renderCompanyEditor();
      case 'disclaimer': return renderDisclaimerEditor();
      default: return renderHeroEditor();
    }
  };

  return (
    <div className="about-editor">
      <div className="editor-header">
        <div>
          <h2>About Page Editor</h2>
          <p>Edit Sofia's authentic story and company information</p>
        </div>
        <div className="editor-actions">
          {hasChanges && <span className="changes-indicator">• Unsaved changes</span>}
          <button className="btn btn-outline" onClick={handleReset}>
            Reset to Default
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>

      <div className="editor-content">
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

        <div className="editor-form">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default AboutEditor;