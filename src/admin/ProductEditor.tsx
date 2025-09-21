import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { getCategories } from '../data/categories';
import MultiImageUploader from '../components/MultiImageUploader';
import './ProductEditor.css';

const ProductEditor: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Migrate old product structure to new structure
  const migrateProduct = (product: any): Product => {
    if (product.price && !product.prices) {
      return {
        ...product,
        prices: { '10ml': product.price, '30ml': product.price * 2.33 },
        perfumeNotes: product.perfumeNotes || { top: [], heart: [], base: [] },
        concentration: product.concentration || 'Eau de Parfum (EDP)',
        sizes: ['10ml', '30ml']
      };
    }
    return product;
  };

  // Load products from localStorage or use default data
  useEffect(() => {
    const savedProducts = localStorage.getItem('sunrise-products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      const migratedProducts = parsed.map(migrateProduct);
      setProducts(migratedProducts);
      // Save migrated data back to localStorage
      localStorage.setItem('sunrise-products', JSON.stringify(migratedProducts));
    } else {
      // Load default products
      import('../data/products').then(module => {
        setProducts(module.products);
        localStorage.setItem('sunrise-products', JSON.stringify(module.products));
      });
    }
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('sunrise-products', JSON.stringify(updatedProducts));
  };

  const handleSaveProduct = (product: Product) => {
    const updatedProducts = editingProduct
      ? products.map(p => p.id === product.id ? product : p)
      : [...products, { ...product, id: product.name.toLowerCase().replace(/\s+/g, '-') }];
    
    saveProducts(updatedProducts);
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product? This cannot be undone.')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      saveProducts(updatedProducts);
    }
  };

  const filteredProducts = products.filter(product => {
    // Ensure product has required properties
    if (!product || !product.name || !product.category) return false;
    
    return product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           product.category.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="product-editor">
      <div className="editor-header">
        <div>
          <h2>Product Management</h2>
          <p>Add, edit, or remove your perfume products</p>
        </div>
        <button 
          className="btn btn-primary add-product-btn"
          onClick={() => setShowAddForm(true)}
        >
          + Add New Product
        </button>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => {
          // Ensure product has all required properties with fallbacks
          const safeProduct = {
            ...product,
            prices: product.prices || { '10ml': 15.00, '30ml': 35.00 },
            perfumeNotes: product.perfumeNotes || { top: [], heart: [], base: [] },
            concentration: product.concentration || 'Eau de Parfum (EDP)',
            sizes: product.sizes || ['10ml', '30ml']
          };
          
          return (
            <div key={product.id} className="product-card-admin">
              <div className="product-image-admin">
                <div className="image-placeholder-admin">
                  <span>🧴</span>
                </div>
              </div>
              
              <div className="product-info-admin">
                <h3>{safeProduct.name}</h3>
                <p className="product-price-admin">
                  10ml: ${safeProduct.prices['10ml'].toFixed(2)} | 30ml: ${safeProduct.prices['30ml'].toFixed(2)}
                </p>
                <p className="product-category-admin">{safeProduct.category}</p>
                <p className="product-inspiration-admin">{safeProduct.inspiration}</p>
                <p className="product-description-admin">{safeProduct.description}</p>
              </div>
              
              <div className="product-actions">
                <button 
                  className="btn-edit"
                  onClick={() => setEditingProduct(safeProduct)}
                >
                  ✏️ Edit
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No products found matching "{searchTerm}"</p>
        </div>
      )}

      {(editingProduct || showAddForm) && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setEditingProduct(null);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
};

interface ProductFormProps {
  product: Product | null;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onCancel }) => {
  const [categories] = useState(() => getCategories());
  const [formData, setFormData] = useState<Product>(
    product || {
      id: '',
      name: '',
      prices: { '10ml': 15.00, '30ml': 35.00 },
      description: '',
      inspiration: '',
      image: '/images/placeholder.jpg',
      images: [],
      category: categories.length > 0 ? categories[0].id : 'floral',
      perfumeNotes: { top: [], heart: [], base: [] },
      concentration: 'Eau de Parfum (EDP)',
      sizes: ['10ml', '30ml']
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form">
        <div className="form-header">
          <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Pink Sunrise"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Concentration *</label>
              <select
                value={formData.concentration}
                onChange={(e) => setFormData({...formData, concentration: e.target.value})}
              >
                <option value="Eau de Parfum (EDP)">Eau de Parfum (EDP)</option>
                <option value="Eau de Toilette (EDT)">Eau de Toilette (EDT)</option>
                <option value="Parfum">Parfum</option>
                <option value="Eau Fraiche">Eau Fraiche</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>10ml Price *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.prices['10ml']}
                onChange={(e) => setFormData({
                  ...formData, 
                  prices: { ...formData.prices, '10ml': parseFloat(e.target.value) || 0 }
                })}
                required
              />
            </div>
            
            <div className="form-group">
              <label>30ml Price *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.prices['30ml']}
                onChange={(e) => setFormData({
                  ...formData, 
                  prices: { ...formData.prices, '30ml': parseFloat(e.target.value) || 0 }
                })}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as any})}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <MultiImageUploader
                currentImages={formData.images || []}
                onImagesChange={(images) => setFormData({...formData, images})}
                label="Product Images (up to 5)"
                maxImages={5}
                maxSize={2}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Inspiration *</label>
            <input
              type="text"
              value={formData.inspiration}
              onChange={(e) => setFormData({...formData, inspiration: e.target.value})}
              placeholder="e.g., Inspired by Chanel No. 5"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the fragrance..."
              rows={4}
              required
            />
          </div>
          
          <div className="perfume-notes-section">
            <h3>Perfume Notes</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Top Notes</label>
                <input
                  type="text"
                  value={formData.perfumeNotes.top.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData, 
                    perfumeNotes: { 
                      ...formData.perfumeNotes, 
                      top: e.target.value.split(', ').filter(note => note.trim()) 
                    }
                  })}
                  placeholder="e.g., Lemon, Bergamot, Orange"
                />
              </div>
              
              <div className="form-group">
                <label>Heart Notes</label>
                <input
                  type="text"
                  value={formData.perfumeNotes.heart.join(', ')}
                  onChange={(e) => setFormData({
                    ...formData, 
                    perfumeNotes: { 
                      ...formData.perfumeNotes, 
                      heart: e.target.value.split(', ').filter(note => note.trim()) 
                    }
                  })}
                  placeholder="e.g., Rose, Jasmine, Lily"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Base Notes</label>
              <input
                type="text"
                value={formData.perfumeNotes.base.join(', ')}
                onChange={(e) => setFormData({
                  ...formData, 
                  perfumeNotes: { 
                    ...formData.perfumeNotes, 
                    base: e.target.value.split(', ').filter(note => note.trim()) 
                  }
                })}
                placeholder="e.g., Vanilla, Musk, Sandalwood"
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {product ? 'Update Product' : 'Add Product'}
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

export default ProductEditor;
