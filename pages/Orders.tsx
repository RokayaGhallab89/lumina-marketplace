import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Orders: React.FC = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <i className="fa-solid fa-box-open text-5xl text-blue-400"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">No orders yet</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't placed any orders yet. Start shopping to fill your history!</p>
        <Link to="/" className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-accent shadow-lg transition-transform hover:scale-105">
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
       <h1 className="text-2xl font-bold mb-6">My Orders</h1>
       <div className="space-y-6">
          {orders.map((order) => (
             <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
                   <div className="flex flex-wrap gap-x-8 gap-y-2">
                      <div>
                         <div className="text-xs text-gray-500 uppercase font-bold">Order Placed</div>
                         <div className="text-sm font-medium text-gray-800">{new Date(order.date).toLocaleDateString()}</div>
                      </div>
                      <div>
                         <div className="text-xs text-gray-500 uppercase font-bold">Total</div>
                         <div className="text-sm font-medium text-gray-800">${order.total.toFixed(2)}</div>
                      </div>
                      <div>
                         <div className="text-xs text-gray-500 uppercase font-bold">Order #</div>
                         <div className="text-sm font-medium text-gray-800">{order.id}</div>
                      </div>
                   </div>
                   <div>
                       <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${
                           order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                           order.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                           'bg-gray-200 text-gray-700'
                       }`}>
                           <span className={`w-2 h-2 rounded-full ${
                               order.status === 'Delivered' ? 'bg-green-600' : 
                               order.status === 'Processing' ? 'bg-blue-600' : 'bg-gray-500'
                           }`}></span>
                           {order.status}
                       </span>
                   </div>
                </div>
                
                <div className="p-6">
                   <div className="space-y-4">
                      {order.items.map((item) => (
                         <div key={item.id} className="flex gap-4 items-center">
                            <div className="w-16 h-16 border rounded bg-white flex-shrink-0 p-1">
                               <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1">
                               <h4 className="text-sm font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                               <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                               <Link to={`/product/${item.id}`} className="text-primary text-sm font-bold hover:underline">
                                  Buy Again
                               </Link>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export default Orders;