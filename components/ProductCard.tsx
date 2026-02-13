import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { t, formatPrice } = useLanguage();
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const isLiked = isInWishlist(product.id);

  return (
    <div className="bg-white rounded-md shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group relative overflow-hidden border border-transparent hover:border-gray-100">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1 rtl:right-2 rtl:left-auto">
        {discount > 0 && (
          <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-sm shadow-sm">
            -{discount}%
          </span>
        )}
        {product.badges?.map(badge => (
          <span key={badge} className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase shadow-sm">
            {badge}
          </span>
        ))}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        className={`absolute top-2 right-2 z-10 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${isLiked ? 'bg-red-50' : 'bg-white hover:bg-gray-50'} rtl:left-2 rtl:right-auto`}
      >
        <i className={`${isLiked ? 'fa-solid text-red-500' : 'fa-regular text-gray-400'} fa-heart text-lg`}></i>
      </button>

      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square bg-white">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="text-sm text-gray-800 hover:text-primary line-clamp-2 h-10 mb-1 leading-tight font-medium transition-colors">
          {product.title}
        </Link>
        
        <div className="mt-auto">
          <div className="flex flex-col mb-2">
             <div className="flex items-center gap-2">
                 <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                 {product.oldPrice && (
                   <span className="text-xs text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                 )}
             </div>
          </div>

          <div className="flex items-center text-xs text-yellow-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-200'}`}></i>
            ))}
            <span className="text-gray-400 ml-1 ps-1">({product.reviews})</span>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-white border border-primary text-primary font-bold py-2 rounded text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white"
          >
            <i className="fa-solid fa-cart-plus"></i> {t('addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;