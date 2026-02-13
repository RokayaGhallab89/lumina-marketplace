import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Order } from '../types';

interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  
  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // Smart Features
  recentlyViewed: number[];
  addRecentlyViewed: (productId: number) => void;
  
  // AI Chat Control
  isAiChatOpen: boolean;
  setIsAiChatOpen: (isOpen: boolean) => void;
  aiContext: string;
  setAiContext: (context: string) => void;

  // Toast
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Smart Features State
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiContext, setAiContext] = useState('');

  // Toast State
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', isVisible: false });

  // Load state from local storage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('lumina-cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('lumina-wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem('lumina-orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedRecentlyViewed = localStorage.getItem('lumina-recent');
      if (savedRecentlyViewed) setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    } catch (e) {
      console.error("Failed to parse local storage data", e);
    }
  }, []);

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem('lumina-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumina-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lumina-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lumina-recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // setIsCartOpen(true); // removed to show toast instead
    showToast(`Added ${product.title} to cart`);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
         showToast('Removed from wishlist', 'info');
         return prev.filter(id => id !== productId);
      } else {
         showToast('Added to wishlist');
         return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const addRecentlyViewed = (productId: number) => {
    setRecentlyViewed(prev => {
        const filtered = prev.filter(id => id !== productId);
        return [productId, ...filtered].slice(0, 10);
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      isCartOpen,
      setIsCartOpen,
      wishlist,
      toggleWishlist,
      isInWishlist,
      orders,
      addOrder,
      recentlyViewed,
      addRecentlyViewed,
      isAiChatOpen,
      setIsAiChatOpen,
      aiContext,
      setAiContext,
      toast,
      showToast,
      hideToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};