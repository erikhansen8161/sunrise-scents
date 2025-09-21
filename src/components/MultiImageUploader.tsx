import React, { useState, useRef } from 'react';
import './MultiImageUploader.css';

interface MultiImageUploaderProps {
  currentImages?: string[]; // Array of base64 or URLs
  onImagesChange: (images: string[]) => void;
  label: string;
  maxImages?: number; // Maximum number of images allowed
  maxSize?: number; // Max size per image in MB
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  currentImages = [],
  onImagesChange,
  label,
  maxImages = 5,
  maxSize = 2, // Default max size 2MB per image
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = async (files: File[]) => {
    setError(null);
    
    // Check if adding these files would exceed the limit
    if (currentImages.length + files.length > maxImages) {
      setError(`You can only upload up to ${maxImages} images. You currently have ${currentImages.length} images.`);
      return;
    }

    // Filter valid image files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed.');
        return false;
      }
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size exceeds ${maxSize}MB limit.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      const newImages: string[] = [];
      
      for (const file of validFiles) {
        const base64 = await fileToBase64(file);
        newImages.push(base64);
      }

      onImagesChange([...currentImages, ...newImages]);
    } catch (error) {
      setError('Failed to process some images.');
    } finally {
      setIsUploading(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = currentImages.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const canAddMore = currentImages.length < maxImages;

  return (
    <div className="multi-image-uploader">
      <label className="multi-image-uploader-label">{label}</label>
      
      <div className="images-grid">
        {currentImages.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={image} alt={`Upload ${index + 1}`} />
            <button
              type="button"
              className="remove-image-btn"
              onClick={() => handleRemoveImage(index)}
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ))}
        
        {canAddMore && (
          <div
            className={`add-image-dropzone ${isDragOver ? 'drag-over' : ''} ${isUploading ? 'uploading' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              style={{ display: 'none' }}
            />

            {isUploading ? (
              <div className="upload-progress">
                <div className="spinner"></div>
                <p>Uploading...</p>
              </div>
            ) : (
              <div className="add-image-content">
                <div className="add-image-icon">
                  <div className="perfume-bottle-placeholder">
                    <div className="bottle-cap"></div>
                    <div className="bottle-neck"></div>
                    <div className="bottle-body"></div>
                    <div className="bottle-base"></div>
                  </div>
                </div>
                <div className="add-image-text">
                  <p className="primary-text">
                    <strong>Drag and drop</strong> images here, or <strong>click to browse</strong>
                  </p>
                  <p className="secondary-text">
                    Max {maxImages} images, {maxSize}MB each
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="image-count">
        {currentImages.length} / {maxImages} images
      </div>
    </div>
  );
};

export default MultiImageUploader;
