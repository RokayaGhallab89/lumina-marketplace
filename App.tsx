import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AIChat from './components/AIChat';
import Toast from './components/Toast';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import SellerProfile from './pages/SellerProfile';

// Admin Imports
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminSellers from './pages/admin/Sellers';
import AdminCoupons from './pages/admin/Coupons';

const AppContent: React.FC = () => {
  const { toast, hideToast } = useCart();

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
           <Route index element={<Dashboard />} />
           <Route path="products" element={<AdminProducts />} />
           <Route path="orders" element={<AdminOrders />} />
           <Route path="sellers" element={<AdminSellers />} />
           <Route path="coupons" element={<AdminCoupons />} />
        </Route>

        {/* Public Store Routes */}
        <Route path="*" element={
           <div className="min-h-screen flex flex-col font-sans relative">
            <Toast 
              message={toast.message} 
              type={toast.type} 
              isVisible={toast.isVisible} 
              onClose={hideToast} 
            />
            
            <Header />
            <CartDrawer />
            <AIChat />
            
            <main className="flex-1 pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/seller/:id" element={<SellerProfile />} />
              </Routes>
            </main>
            
            <Footer />
            <BottomNav />
          </div>
        } />
      </Routes>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <StoreProvider>
          <CartProvider>
              <AppContent />
          </CartProvider>
      </StoreProvider>
    </LanguageProvider>
  );
};

export default App;