import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full flex flex-col bg-white shadow-xl animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <i className="fa-solid fa-cart-shopping text-primary"></i> Shopping Cart ({cart.length})
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <i className="fa-solid fa-basket-shopping text-6xl mb-4 text-gray-300"></i>
                <p className="text-lg">Your cart is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 text-primary font-bold hover:underline"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-4">
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{item.title}</h3>
                    <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 border-r disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <i className="fa-solid fa-minus text-xs"></i>
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 border-l"
                        >
                          <i className="fa-solid fa-plus text-xs"></i>
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                      >
                        <i className="fa-solid fa-trash-can"></i> <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-medium">Subtotal</span>
                <span className="text-xl font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                className="w-full bg-primary text-white font-bold py-3 rounded shadow-md hover:bg-accent transition-colors flex items-center justify-center gap-2"
                onClick={handleCheckout}
              >
                CHECKOUT (${cartTotal.toFixed(2)})
              </button>
              <button 
                 onClick={clearCart}
                 className="w-full mt-2 text-xs text-gray-500 hover:text-red-500 underline"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;