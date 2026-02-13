import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Order } from '../types';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart, addOrder } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form States
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: ''
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newOrderId = `LUM-${Math.floor(Math.random()*1000000)}`;
    setOrderId(newOrderId);
    
    const newOrder: Order = {
        id: newOrderId,
        date: new Date().toISOString(),
        total: cartTotal,
        status: 'Processing',
        items: [...cart]
    };
    
    addOrder(newOrder);
    setIsLoading(false);
    setOrderComplete(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-basket-shopping text-3xl text-gray-400"></i>
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Browse our categories and discover our best deals!</p>
        <Link to="/" className="bg-primary text-white px-6 py-2 rounded font-bold hover:bg-accent">
          START SHOPPING
        </Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fa-solid fa-check text-4xl text-green-500"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">Thank you for shopping with Lumina. Your order <span className="font-mono font-bold">#{orderId}</span> has been placed.</p>
        
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow-sm border mb-8 text-left">
           <h3 className="font-bold border-b pb-2 mb-2">Delivery Details</h3>
           <p className="text-sm"><strong>Name:</strong> {address.fullName}</p>
           <p className="text-sm"><strong>Address:</strong> {address.street}, {address.city}, {address.state}</p>
           <p className="text-sm"><strong>Phone:</strong> {address.phone}</p>
        </div>

        <div className="flex justify-center gap-4">
            <Link to="/orders" className="bg-gray-200 text-gray-800 px-6 py-3 rounded font-bold hover:bg-gray-300">
                VIEW ORDER
            </Link>
            <Link to="/" className="bg-primary text-white px-8 py-3 rounded font-bold hover:bg-accent shadow-lg">
                CONTINUE SHOPPING
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
           <Link to="/cart" className="text-gray-400 hover:text-primary"><i className="fa-solid fa-arrow-left text-lg"></i></Link> Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Forms */}
          <div className="flex-1">
            {/* Steps Indicator */}
            <div className="flex items-center mb-8">
               <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                 <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>1</span>
                 <span className="font-bold hidden sm:inline">Address</span>
               </div>
               <div className={`h-1 flex-1 mx-4 ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
               <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                 <span className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>2</span>
                 <span className="font-bold hidden sm:inline">Payment</span>
               </div>
            </div>

            {step === 1 && (
              <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input required type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none" 
                           value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input required type="tel" className="w-full border border-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none" 
                           value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
                      </div>
                   </div>
                   <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input required type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none" 
                           value={address.street} onChange={e => setAddress({...address, street: e.target.value})} />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input required type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none" 
                           value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State / Province</label>
                        <input required type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none" 
                           value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                      </div>
                   </div>
                   <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-accent mt-4">
                     PROCEED TO PAYMENT
                   </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                 <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                 
                 <div className="flex flex-col gap-3 mb-6">
                    <label className={`flex items-center gap-3 p-4 border rounded cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-orange-50 ring-1 ring-primary' : 'border-gray-200'}`}>
                       <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                       <i className="fa-regular fa-credit-card text-xl"></i>
                       <div>
                         <span className="font-bold block">Pay with Card</span>
                         <span className="text-xs text-gray-500">Secure payment with Visa, Mastercard</span>
                       </div>
                    </label>

                    <label className={`flex items-center gap-3 p-4 border rounded cursor-pointer ${paymentMethod === 'cod' ? 'border-primary bg-orange-50 ring-1 ring-primary' : 'border-gray-200'}`}>
                       <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                       <i className="fa-solid fa-money-bill-wave text-xl"></i>
                       <div>
                         <span className="font-bold block">Cash on Delivery</span>
                         <span className="text-xs text-gray-500">Pay when you receive your order</span>
                       </div>
                    </label>
                 </div>

                 {paymentMethod === 'card' && (
                   <div className="bg-gray-50 p-4 rounded border border-gray-200 mb-6 animate-fade-in-up">
                      <div className="mb-3">
                         <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Card Number</label>
                         <div className="relative">
                            <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-gray-300 rounded px-3 py-2 pl-10 focus:border-primary focus:outline-none"
                              value={cardDetails.number} onChange={e => setCardDetails({...cardDetails, number: e.target.value})} maxLength={19} />
                            <i className="fa-regular fa-credit-card absolute left-3 top-3 text-gray-400"></i>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full border border-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none"
                               value={cardDetails.expiry} onChange={e => setCardDetails({...cardDetails, expiry: e.target.value})} maxLength={5} />
                         </div>
                         <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">CVC</label>
                            <input type="text" placeholder="123" className="w-full border border-gray-300 rounded px-3 py-2 focus:border-primary focus:outline-none"
                               value={cardDetails.cvc} onChange={e => setCardDetails({...cardDetails, cvc: e.target.value})} maxLength={3} />
                         </div>
                      </div>
                   </div>
                 )}

                 <div className="flex gap-4">
                   <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-300 rounded text-gray-700 font-bold hover:bg-gray-50">
                     BACK
                   </button>
                   <button onClick={handlePlaceOrder} disabled={isLoading} className="flex-[2] bg-primary text-white font-bold py-3 rounded hover:bg-accent disabled:opacity-50 flex items-center justify-center gap-2">
                     {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : `PAY $${cartTotal.toFixed(2)}`}
                   </button>
                 </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white p-4 rounded shadow-sm border border-gray-200 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              <div className="max-h-60 overflow-y-auto mb-4 space-y-3">
                 {cart.map(item => (
                   <div key={item.id} className="flex gap-3 text-sm">
                      <div className="w-12 h-12 bg-gray-50 rounded flex-shrink-0">
                         <img src={item.image} className="w-full h-full object-contain" alt="" />
                      </div>
                      <div className="flex-1">
                         <p className="line-clamp-1">{item.title}</p>
                         <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                   </div>
                 ))}
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                 <div className="flex justify-between">
                   <span className="text-gray-600">Subtotal</span>
                   <span>${cartTotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Shipping</span>
                   <span className="text-green-600 font-bold">FREE</span>
                 </div>
                 <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                   <span>Total</span>
                   <span className="text-primary">${cartTotal.toFixed(2)}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;