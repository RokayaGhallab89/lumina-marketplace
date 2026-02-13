import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: 'fa-chart-line' },
    { path: '/admin/products', label: 'Products', icon: 'fa-box' },
    { path: '/admin/orders', label: 'Orders', icon: 'fa-clipboard-list' },
    { path: '/admin/sellers', label: 'Sellers', icon: 'fa-store' },
    { path: '/admin/coupons', label: 'Coupons', icon: 'fa-ticket' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center gap-2">
           <span className="text-primary text-2xl"><i className="fa-solid fa-bag-shopping"></i></span>
           <span className="font-bold text-lg tracking-tight">LUMINA ADMIN</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
           {navItems.map(item => (
             <Link 
               key={item.path} 
               to={item.path}
               className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                 location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                  ? 'bg-primary text-white font-medium' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
               }`}
             >
               <i className={`fa-solid ${item.icon} w-5`}></i>
               {item.label}
             </Link>
           ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
           <Link to="/" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Back to Store
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
         {/* Mobile Header */}
         <header className="md:hidden bg-secondary text-white p-4 flex items-center justify-between">
            <span className="font-bold">LUMINA ADMIN</span>
            <Link to="/" className="text-sm text-primary">Exit</Link>
         </header>

         <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <Outlet />
         </main>
      </div>
    </div>
  );
};

export default AdminLayout;