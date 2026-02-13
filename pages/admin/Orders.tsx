import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';

const Orders: React.FC = () => {
  const { adminOrders, updateOrderStatus } = useStore();

  const getStatusColor = (status: Order['status']) => {
     switch(status) {
        case 'Delivered': return 'bg-green-100 text-green-700';
        case 'Shipped': return 'bg-blue-100 text-blue-700';
        case 'Processing': return 'bg-yellow-100 text-yellow-700';
        case 'Cancelled': return 'bg-red-100 text-red-700';
        default: return 'bg-gray-100 text-gray-600';
     }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-xs">
                   <tr>
                      <th className="px-6 py-3">Order ID</th>
                      <th className="px-6 py-3">Customer</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Total</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Action</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {adminOrders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                         <td className="px-6 py-4 font-mono font-bold">{order.id}</td>
                         <td className="px-6 py-4">
                            <p className="font-bold text-gray-800">{order.customerName}</p>
                            <p className="text-xs text-gray-400">{order.shippingAddress}</p>
                         </td>
                         <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                         <td className="px-6 py-4 font-bold">${order.total.toFixed(2)}</td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                               {order.status}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <select 
                               className="border border-gray-300 rounded text-xs px-2 py-1 focus:outline-none"
                               value={order.status}
                               onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                            >
                               <option value="Processing">Processing</option>
                               <option value="Shipped">Shipped</option>
                               <option value="Delivered">Delivered</option>
                               <option value="Cancelled">Cancelled</option>
                            </select>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};

export default Orders;