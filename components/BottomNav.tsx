import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const BottomNav: React.FC = () => {
  const { cartCount, wishlist } = useCart();
  const { t } = useLanguage();

  const navClass = ({ isActive }: { isActive: boolean }) => 
    `flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16">
        <NavLink to="/" className={navClass}>
          <i className="fa-solid fa-house text-xl"></i>
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        
        <NavLink to="/wishlist" className={navClass}>
          <div className="relative">
            <i className="fa-solid fa-heart text-xl"></i>
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full ring-1 ring-white">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium">{t('saved')}</span>
        </NavLink>

        <NavLink to="/cart" className={navClass}>
          <div className="relative">
             <i className="fa-solid fa-cart-shopping text-xl"></i>
             {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
          </div>
          <span className="text-[10px] font-medium">{t('cart')}</span>
        </NavLink>

        <NavLink to="/orders" className={navClass}>
          <i className="fa-solid fa-box-open text-xl"></i>
          <span className="text-[10px] font-medium">{t('orders')}</span>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;