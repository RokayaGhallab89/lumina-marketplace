import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { cartCount, wishlist } = useCart();
  const { t, language, setLanguage, currency, setCurrency, formatPrice } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar (Promo) & Settings */}
      <div className="bg-primary text-white text-xs py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
            <span className="font-bold hidden md:block">
                {t('freeDelivery')} {formatPrice(50)} | 🌟 {t('sellOn')}
            </span>
            <div className="flex gap-4 items-center ms-auto md:ms-0">
                {/* Currency Switcher */}
                <div className="flex gap-1 cursor-pointer">
                    <span className={currency === 'USD' ? 'font-bold underline' : 'opacity-80 hover:opacity-100'} onClick={() => setCurrency('USD')}>USD</span>
                    <span>|</span>
                    <span className={currency === 'EGP' ? 'font-bold underline' : 'opacity-80 hover:opacity-100'} onClick={() => setCurrency('EGP')}>EGP</span>
                </div>

                {/* Language Switcher */}
                <div className="flex gap-1 cursor-pointer">
                    <span className={language === 'en' ? 'font-bold underline' : 'opacity-80 hover:opacity-100'} onClick={() => setLanguage('en')}>English</span>
                    <span>|</span>
                    <span className={language === 'ar' ? 'font-bold underline' : 'opacity-80 hover:opacity-100'} onClick={() => setLanguage('ar')}>العربية</span>
                </div>
            </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-black tracking-tighter flex items-center gap-1">
           <span className="text-primary text-3xl"><i className="fa-solid fa-bag-shopping"></i></span> LUMINA
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:flex relative">
          <div className="absolute inset-y-0 left-0 pl-3 ps-3 flex items-center pointer-events-none">
            <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
          </div>
          <input
            type="text"
            className={`w-full ps-10 pr-4 py-2 border border-gray-300 rounded-s-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors`}
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          />
          <button 
            onClick={handleSearch}
            className="bg-primary hover:bg-accent text-white font-semibold py-2 px-6 rounded-e-md transition-colors shadow-sm"
          >
            {t('search')}
          </button>
        </div>

        {/* Icons/Actions - Hidden on Mobile (moved to bottom nav) */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/orders" className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors group">
            <i className="fa-solid fa-box-open text-xl"></i>
            <span className="font-medium text-sm group-hover:underline">{t('orders')}</span>
          </Link>

          <Link to="/wishlist" className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors group relative">
            <div className="relative">
              <i className="fa-regular fa-heart text-xl"></i>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold h-3 w-3 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </div>
            <span className="font-medium text-sm group-hover:underline">{t('saved')}</span>
          </Link>

          <Link 
            to="/cart"
            className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors relative"
          >
            <div className="relative">
              <i className="fa-solid fa-cart-shopping text-2xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="font-medium">{t('cart')}</span>
          </Link>
        </div>
      </div>
      
      {/* Mobile Search (visible only on small screens) */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
            <input
            type="text"
            className="w-full ps-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-primary"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
           <button 
            onClick={handleSearch}
            className="absolute right-0 top-0 h-full px-3 text-gray-500 rtl:left-0 rtl:right-auto"
           >
             <i className="fa-solid fa-magnifying-glass"></i>
           </button>
        </div>
      </div>
    </header>
  );
};

export default Header;