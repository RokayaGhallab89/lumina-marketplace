import React from 'react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Wishlist: React.FC = () => {
  const { wishlist } = useCart();
  const { products } = useStore();
  
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <i className="fa-solid fa-heart-crack text-5xl text-red-400"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Your wishlist is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Save items you love to your wishlist to find them easily later!</p>
        <Link to="/" className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-accent shadow-lg transition-transform hover:scale-105">
          EXPLORE PRODUCTS
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
       <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold">{wishlist.length}</span>
       </div>
       
       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
       </div>
    </div>
  );
};

export default Wishlist;