import React from 'react';
import { useStore } from '../../context/StoreContext';

const Dashboard: React.FC = () => {
  const { products, sellers, adminOrders } = useStore();

  const totalSales = adminOrders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = adminOrders.length;
  const pendingOrders = adminOrders.filter(o => o.status === 'Processing').length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900">${totalSales.toLocaleString()}</h3>
               </div>
               <div className="p-2 bg-green-100 text-green-600 rounded-md">
                  <i className="fa-solid fa-dollar-sign text-xl"></i>
               </div>
            </div>
            <p className="text-xs text-green-600 flex items-center gap-1">
               <i className="fa-solid fa-arrow-trend-up"></i> +12% from last month
            </p>
         </div>

         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-900">{totalOrders}</h3>
               </div>
               <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                  <i className="fa-solid fa-cart-shopping text-xl"></i>
               </div>
            </div>
            <p className="text-xs text-blue-600 font-medium">{pendingOrders} orders pending</p>
         </div>

         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-sm text-gray-500 font-medium">Products</p>
                  <h3 className="text-2xl font-bold text-gray-900">{products.length}</h3>
               </div>
               <div className="p-2 bg-purple-100 text-purple-600 rounded-md">
                  <i className="fa-solid fa-box text-xl"></i>
               </div>
            </div>
            <p className="text-xs text-gray-500">Across {new Set(products.map(p => p.category)).size} categories</p>
         </div>

         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-sm text-gray-500 font-medium">Sellers</p>
                  <h3 className="text-2xl font-bold text-gray-900">{sellers.length}</h3>
               </div>
               <div className="p-2 bg-orange-100 text-orange-600 rounded-md">
                  <i className="fa-solid fa-store text-xl"></i>
               </div>
            </div>
            <p className="text-xs text-gray-500">{sellers.filter(s => s.isOfficial).length} Official Stores</p>
         </div>
      </div>

      {/* Analytics Charts & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Simple Visual Chart (CSS only) */}
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-6">Sales Analytics (Mock)</h3>
            <div className="flex items-end justify-between h-48 gap-2">
               {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                  <div key={i} className="w-full bg-blue-50 rounded-t-sm relative group cursor-pointer hover:bg-blue-100 transition-colors">
                     <div className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded pointer-events-none">
                        ${h * 100}
                     </div>
                  </div>
               ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-400">
               <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
         </div>

         {/* Recent Orders */}
         <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">Recent Orders</h3>
            <div className="space-y-4">
               {adminOrders.slice(0, 4).map(order => (
                  <div key={order.id} className="flex items-center justify-between pb-3 border-b last:border-0 border-gray-100">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                           <i className="fa-solid fa-receipt"></i>
                        </div>
                        <div>
                           <p className="text-sm font-bold text-gray-800">{order.customerName || 'Guest Customer'}</p>
                           <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">${order.total.toFixed(2)}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                           order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                           order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                           'bg-gray-100 text-gray-600'
                        }`}>{order.status}</span>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;