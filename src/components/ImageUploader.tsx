import React, { useState, useCallback, useRef } from 'react';
import './ImageUploader.css';

interface ImageUploaderProps {
  currentImage?: string;
  onImageUpload: (imageUrl: string) => void;
  onImageRemove?: () => void;
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImage,
  onImageUpload,
  onImageRemove,
  label = "Upload Image",
  accept = "image/*",
  maxSize = 5
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      return `File size must be less than ${maxSize}MB`;
    }

    return null;
  };

  const processFile = async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Convert file to base64 data URL for storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload(result);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setError('Failed to read file');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload image');
      setIsUploading(false);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (onImageRemove) {
      onImageRemove();
    }
    setError(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-uploader-container">
      <label className="image-uploader-label">{label}</label>
      
      {currentImage ? (
        <div className="current-image-container">
          <div className="image-preview">
            <img src={currentImage} alt="Current" />
            <div className="image-overlay">
              <button
                type="button"
                className="change-image-btn"
                onClick={handleClick}
              >
                Change Image
              </button>
              {onImageRemove && (
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={handleRemove}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`image-uploader-dropzone ${isDragOver ? 'drag-over' : ''} ${isUploading ? 'uploading' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          {isUploading ? (
            <div className="upload-progress">
              <div className="spinner"></div>
              <p>Uploading...</p>
            </div>
          ) : (
            <div className="upload-content">
              <div className="upload-icon">
                <div className="perfume-bottle-placeholder">
                  <div className="bottle-cap"></div>
                  <div className="bottle-neck"></div>
                  <div className="bottle-body"></div>
                  <div className="bottle-base"></div>
                </div>
              </div>
              <div className="upload-text">
                <p className="primary-text">
                  <strong>Drag and drop</strong> an image here, or <strong>click to browse</strong>
                </p>
                <p className="secondary-text">
                  Supports: JPG, PNG, GIF up to {maxSize}MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {error && (
        <div className="upload-error">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
