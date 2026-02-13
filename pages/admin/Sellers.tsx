import React from 'react';
import { useStore } from '../../context/StoreContext';

const Sellers: React.FC = () => {
  const { sellers, verifySeller } = useStore();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Registered Sellers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {sellers.map(seller => (
            <div key={seller.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
               <div className="relative">
                   <img src={seller.logo} alt={seller.name} className="w-20 h-20 rounded-full object-cover mb-4 border border-gray-100" />
                   {seller.isOfficial && (
                       <div className="absolute bottom-4 right-0 bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-white" title="Official Verified">
                           <i className="fa-solid fa-check"></i>
                       </div>
                   )}
               </div>
               
               <h3 className="text-lg font-bold text-gray-800 mb-1">{seller.name}</h3>
               <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-10">{seller.description || 'No description available.'}</p>
               
               <div className="grid grid-cols-2 w-full border-t border-b border-gray-100 py-3 mb-4">
                  <div>
                      <span className="block font-bold text-gray-800">{seller.rating}</span>
                      <span className="text-xs text-gray-400">RATING</span>
                  </div>
                  <div className="border-l border-gray-100">
                      <span className="block font-bold text-gray-800">{seller.followers.toLocaleString()}</span>
                      <span className="text-xs text-gray-400">FOLLOWERS</span>
                  </div>
               </div>

               <button 
                  onClick={() => verifySeller(seller.id)}
                  className={`w-full py-2 rounded font-bold text-sm transition-colors ${
                      seller.isOfficial 
                      ? 'border border-red-500 text-red-500 hover:bg-red-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
               >
                  {seller.isOfficial ? 'REVOKE BADGE' : 'VERIFY SELLER'}
               </button>
            </div>
         ))}
      </div>
    </div>
  );
};

export default Sellers;