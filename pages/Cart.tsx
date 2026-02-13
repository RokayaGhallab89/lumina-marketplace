import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-6 animate-bounce-subtle">
            <i className="fa-solid fa-cart-arrow-down text-5xl text-primary"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Your cart is empty!</h2>
        <p className="text-gray-500 mb-8 max-w-md">It looks like you haven't added anything to your cart yet. Browse our categories and discover our best deals!</p>
        <Link to="/" className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-accent shadow-lg transition-transform hover:scale-105">
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({cart.length})</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items List */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b bg-gray-50 hidden md:grid grid-cols-12 text-sm font-bold text-gray-500">
             <div className="col-span-6">ITEM</div>
             <div className="col-span-2 text-center">QUANTITY</div>
             <div className="col-span-2 text-center">UNIT PRICE</div>
             <div className="col-span-2 text-center">SUBTOTAL</div>
          </div>
          
          <div className="divide-y divide-gray-100">
             {cart.map((item) => (
                <div key={item.id} className="p-4 flex flex-col md:grid md:grid-cols-12 gap-4 items-center">
                   {/* Item Info */}
                   <div className="col-span-6 flex gap-4 w-full">
                      <div className="w-20 h-20 flex-shrink-0 border rounded bg-white p-1">
                         <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{item.title}</h3>
                         <div className="text-xs text-gray-500 mb-2">Seller: {item.seller?.name || "Lumina"}</div>
                         <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-xs hover:underline flex items-center gap-1 font-bold"
                         >
                            <i className="fa-solid fa-trash-can"></i> REMOVE
                         </button>
                      </div>
                   </div>

                   {/* Quantity */}
                   <div className="col-span-2 flex justify-center w-full md:w-auto">
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-50 hover:bg-gray-100 text-gray-600 border-r flex items-center justify-center disabled:opacity-50"
                            disabled={item.quantity <= 1}
                            >
                            <i className="fa-solid fa-minus text-xs"></i>
                            </button>
                            <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                            <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-50 hover:bg-gray-100 text-gray-600 border-l flex items-center justify-center"
                            >
                            <i className="fa-solid fa-plus text-xs"></i>
                            </button>
                        </div>
                   </div>

                   {/* Unit Price (Hidden on mobile) */}
                   <div className="col-span-2 text-center hidden md:block">
                      <span className="font-bold text-gray-800">${item.price.toFixed(2)}</span>
                      {item.oldPrice && <div className="text-xs text-gray-400 line-through">${item.oldPrice.toFixed(2)}</div>}
                   </div>

                   {/* Subtotal */}
                   <div className="col-span-2 text-center w-full md:w-auto flex justify-between md:justify-center items-center">
                      <span className="md:hidden text-gray-500 text-sm">Subtotal:</span>
                      <span className="font-bold text-primary text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                   </div>
                </div>
             ))}
          </div>

          <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
             <button onClick={clearCart} className="text-red-500 text-sm font-bold hover:underline">
                Clear Cart
             </button>
             <Link to="/" className="text-primary text-sm font-bold hover:underline">
                Continue Shopping
             </Link>
          </div>
        </div>

        {/* Summary Card */}
        <div className="lg:w-80 space-y-4">
           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
              <h3 className="font-bold text-gray-800 border-b pb-2 mb-4 uppercase text-sm">Cart Summary</h3>
              <div className="flex justify-between items-center mb-2">
                 <span className="text-gray-600">Subtotal</span>
                 <span className="font-bold text-lg">${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">Delivery fees not included yet.</p>
              <button 
                 onClick={() => navigate('/checkout')}
                 className="w-full bg-primary text-white font-bold py-3 rounded shadow-lg hover:bg-accent transition-colors"
              >
                 CHECKOUT (${cartTotal.toFixed(2)})
              </button>
           </div>
           
           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-bold text-gray-800 text-sm mb-2">Returns are easy</h3>
              <p className="text-xs text-gray-500">Free return within 15 days for Official Store items and 7 days for other eligible items.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;