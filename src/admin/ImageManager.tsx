import React, { useState } from 'react';
import './ImageManager.css';

const ImageManager: React.FC = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="image-manager">
      <div className="editor-header">
        <div>
          <h2>Image Management</h2>
          <p>Upload and manage product images</p>
        </div>
      </div>

      <div className="upload-section">
        <div 
          className="upload-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="upload-icon">📷</div>
          <h3>Upload Images</h3>
          <p>Drag and drop images here, or click to browse</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="file-input"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="upload-btn">
            Choose Images
          </label>
        </div>
      </div>

      <div className="instructions-section">
        <div className="instructions-card">
          <h3>📋 How to Add Product Images</h3>
          <ol>
            <li>Upload your product images using the area above</li>
            <li>Save images with clear names (e.g., "pink-sunrise.jpg")</li>
            <li>In the Product Editor, use the path: "/images/your-image-name.jpg"</li>
            <li>For best results, use images that are 300x400 pixels or larger</li>
          </ol>
        </div>

        <div className="instructions-card">
          <h3>💡 Image Tips</h3>
          <ul>
            <li>Use high-quality product photos</li>
            <li>Keep file sizes under 1MB for fast loading</li>
            <li>Use consistent lighting and backgrounds</li>
            <li>JPG format works best for product photos</li>
          </ul>
        </div>
      </div>

      {uploadedImages.length > 0 && (
        <div className="uploaded-images">
          <h3>Recently Uploaded</h3>
          <div className="images-grid">
            {uploadedImages.map((image, index) => (
              <div key={index} className="image-preview">
                <img src={image} alt={`Upload ${index + 1}`} />
                <div className="image-overlay">
                  <button 
                    className="delete-btn"
                    onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageManager;
