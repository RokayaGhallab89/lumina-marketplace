import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Seller, Order, Coupon } from '../types';
import { PRODUCTS, SELLERS } from '../constants';

interface StoreContextType {
  products: Product[];
  sellers: Seller[];
  adminOrders: Order[];
  coupons: Coupon[];
  
  // Actions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addAdminOrder: (order: Order) => void;
  
  verifySeller: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Mock initial admin orders
const MOCK_ADMIN_ORDERS: Order[] = [
    {
        id: 'ORD-7721',
        date: new Date().toISOString(),
        total: 1250.00,
        status: 'Delivered',
        customerName: 'Alice Johnson',
        shippingAddress: '123 Maple St, NY',
        items: [PRODUCTS[0], PRODUCTS[2]] as any
    },
    {
        id: 'ORD-7722',
        date: new Date(Date.now() - 86400000).toISOString(),
        total: 89.99,
        status: 'Processing',
        customerName: 'Bob Smith',
        shippingAddress: '456 Oak Ave, CA',
        items: [PRODUCTS[5]] as any
    },
    {
        id: 'ORD-7723',
        date: new Date(Date.now() - 172800000).toISOString(),
        total: 299.00,
        status: 'Shipped',
        customerName: 'Charlie Brown',
        shippingAddress: '789 Pine Ln, TX',
        items: [PRODUCTS[1]] as any
    }
];

const MOCK_COUPONS: Coupon[] = [
    { id: '1', code: 'WELCOME20', discountType: 'percentage', value: 20, expiryDate: '2024-12-31', isActive: true, usageCount: 45 },
    { id: '2', code: 'SUMMERSALE', discountType: 'fixed', value: 10, expiryDate: '2024-08-31', isActive: true, usageCount: 120 },
];

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [sellers, setSellers] = useState<Seller[]>(SELLERS);
  const [adminOrders, setAdminOrders] = useState<Order[]>(MOCK_ADMIN_ORDERS);
  const [coupons, setCoupons] = useState<Coupon[]>(MOCK_COUPONS);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [...prev, coupon]);
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setAdminOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const addAdminOrder = (order: Order) => {
    setAdminOrders(prev => [order, ...prev]);
  };

  const verifySeller = (id: string) => {
    setSellers(prev => prev.map(s => s.id === id ? { ...s, isOfficial: !s.isOfficial } : s));
  };

  return (
    <StoreContext.Provider value={{
      products,
      sellers,
      adminOrders,
      coupons,
      addProduct,
      updateProduct,
      deleteProduct,
      addCoupon,
      deleteCoupon,
      updateOrderStatus,
      addAdminOrder,
      verifySeller
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within a StoreProvider");
  return context;
};