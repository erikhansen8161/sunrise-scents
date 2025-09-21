import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  size: '10ml' | '30ml';
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: '10ml' | '30ml', quantity?: number) => void;
  removeFromCart: (productId: string, size: '10ml' | '30ml') => void;
  updateQuantity: (productId: string, size: '10ml' | '30ml', quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isInCart: (productId: string, size: '10ml' | '30ml') => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sunrise-cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCartItems(parsed);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sunrise-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, size: '10ml' | '30ml', quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, size, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string, size: '10ml' | '30ml') => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.product.id === productId && item.size === size))
    );
  };

  const updateQuantity = (productId: string, size: '10ml' | '30ml', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.prices[item.size] * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productId: string, size: '10ml' | '30ml') => {
    return cartItems.some(item => item.product.id === productId && item.size === size);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
