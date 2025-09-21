export interface Category {
  id: string;
  name: string;
  description: string;
  color: string; // For UI styling/gradients
  image?: string; // Optional category image
}

export const defaultCategories: Category[] = [
  {
    id: 'floral',
    name: 'Floral',
    description: 'Delicate blooms and romantic florals for every occasion',
    color: '#E8B4B4'
  },
  {
    id: 'woody',
    name: 'Woody',
    description: 'Rich, sophisticated scents with deep woody undertones',
    color: '#8B7355'
  },
  {
    id: 'citrus',
    name: 'Citrus',
    description: 'Bright, energizing scents with zesty citrus notes',
    color: '#FFD700'
  },
  {
    id: 'oriental',
    name: 'Oriental',
    description: 'Exotic, warm spices and luxurious oriental blends',
    color: '#8B4513'
  },
  {
    id: 'fresh',
    name: 'Fresh',
    description: 'Clean, crisp scents inspired by Vermont\'s natural beauty',
    color: '#87CEEB'
  }
];

// Helper function to get categories from localStorage or default
export const getCategories = (): Category[] => {
  try {
    const saved = localStorage.getItem('sunrise-categories');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading categories:', error);
  }
  return [...defaultCategories];
};

// Helper function to save categories to localStorage
export const saveCategories = (categories: Category[]): void => {
  try {
    localStorage.setItem('sunrise-categories', JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories:', error);
  }
};
