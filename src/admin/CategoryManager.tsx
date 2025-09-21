import React, { useState, useEffect } from 'react';
import { Category, getCategories, saveCategories, defaultCategories } from '../data/categories';
import ImageUploader from '../components/ImageUploader';
import './CategoryManager.css';

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadedCategories = getCategories();
    setCategories(loadedCategories);
  }, []);

  const handleSaveCategory = (category: Category) => {
    console.log('handleSaveCategory called with:', category); // Debug log
    console.log('editingCategory:', editingCategory); // Debug log
    
    let updatedCategories: Category[];
    
    if (editingCategory) {
      // Update existing category
      console.log('Updating existing category'); // Debug log
      updatedCategories = categories.map(c => c.id === category.id ? category : c);
    } else {
      // Add new category
      console.log('Adding new category'); // Debug log
      updatedCategories = [...categories, category];
    }
    
    console.log('Updated categories:', updatedCategories); // Debug log
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
    setEditingCategory(null);
    setShowAddForm(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This may affect existing products.')) {
      const updatedCategories = categories.filter(c => c.id !== categoryId);
      setCategories(updatedCategories);
      saveCategories(updatedCategories);
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset to default categories? This will remove all custom categories.')) {
      setCategories([...defaultCategories]);
      saveCategories([...defaultCategories]);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="category-manager-container">
      <div className="manager-header">
        <div>
          <h1>Category Management</h1>
          <p>Manage product categories for your shop</p>
        </div>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search categories..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-outline"
            onClick={handleResetToDefaults}
          >
            Reset to Defaults
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            Add New Category
          </button>
        </div>
      </div>

      <div className="categories-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <div key={category.id} className="category-card">
              <div 
                className="category-color" 
                style={{ backgroundColor: category.color }}
              ></div>
              
              <div className="category-info">
                <h3>{category.name}</h3>
                <p className="category-id">ID: {category.id}</p>
                <p className="category-description">{category.description}</p>
              </div>

              <div className="category-actions">
                <button
                  className="btn-edit"
                  onClick={() => setEditingCategory(category)}
                >
                  Edit
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-categories">No categories found. Add a new category to get started!</p>
        )}
      </div>

      {(editingCategory || showAddForm) && (
        <CategoryForm
          category={editingCategory}
          existingIds={categories.map(c => c.id)}
          onSave={handleSaveCategory}
          onCancel={() => {
            setEditingCategory(null);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
};

interface CategoryFormProps {
  category: Category | null;
  existingIds: string[];
  onSave: (category: Category) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  category, 
  existingIds, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Category>(
    category || {
      id: '',
      name: '',
      description: '',
      color: '#8B9A7A',
      image: undefined
    }
  );
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Update form data when category prop changes
  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const generateId = (name: string): string => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Category name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Category description is required';
    }
    
    // For new categories, check if generated ID already exists
    // For existing categories, only check if ID changed and conflicts
    const generatedId = category ? formData.id : generateId(formData.name);
    if (!category && existingIds.includes(generatedId)) {
      newErrors.name = 'A category with this name already exists';
    } else if (category && formData.id !== category.id && existingIds.includes(formData.id)) {
      newErrors.name = 'A category with this name already exists';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const categoryToSave: Category = {
      ...formData,
      id: category ? formData.id : generateId(formData.name),
      name: formData.name.trim(),
      description: formData.description.trim()
    };
    
    console.log('Saving category:', categoryToSave); // Debug log
    onSave(categoryToSave);
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      id: category ? formData.id : generateId(name)
    });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close form if clicking on overlay background, but not on the form itself
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="category-form-overlay" onClick={handleOverlayClick}>
      <div className="category-form" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{category ? 'Edit Category' : 'Add New Category'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g., Floral"
              className={errors.name ? 'error' : ''}
              autoComplete="off"
              spellCheck="false"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Category ID</label>
            <input
              type="text"
              value={category ? formData.id : generateId(formData.name)}
              disabled
              className="disabled-input"
            />
            <small>Auto-generated from name (used in URLs and code)</small>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of this fragrance category..."
              rows={3}
              className={errors.description ? 'error' : ''}
              autoComplete="off"
              spellCheck="true"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <ImageUploader
              currentImage={formData.image}
              onImageUpload={(imageUrl) => setFormData({...formData, image: imageUrl})}
              onImageRemove={() => setFormData({...formData, image: undefined})}
              label="Category Image (Optional)"
              maxSize={1}
            />
          </div>

          <div className="form-group">
            <label>Color Theme</label>
            <div className="color-input-group">
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="color-picker"
              />
              <input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                placeholder="#8B9A7A"
                className="color-text"
              />
            </div>
            <small>Used for collection cards and UI theming</small>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {category ? 'Update Category' : 'Add Category'}
            </button>
            <button type="button" className="btn btn-outline" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryManager;
