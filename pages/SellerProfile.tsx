import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const SellerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { sellers, products } = useStore();
  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'feedback'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  const seller = sellers.find(s => s.id === id);
  
  if (!seller) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Seller Not Found</h2>
        <Link to="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    );
  }

  const sellerProducts = products.filter(p => p.seller.id === seller.id);
  
  const filteredProducts = sellerProducts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      {/* Seller Header */}
      <div className="bg-white shadow-sm mb-6">
         {/* Banner */}
         <div className="h-32 md:h-48 bg-gray-300 w-full overflow-hidden relative">
            <img src={seller.banner} alt={seller.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20"></div>
         </div>
         
         {/* Info Bar */}
         <div className="container mx-auto px-4 py-4 relative">
             <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-12 md:-mt-16 mb-2">
                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-4 border-white shadow-md bg-white overflow-hidden relative z-10">
                    <img src={seller.logo} alt={seller.name} className="w-full h-full object-cover" />
                 </div>
                 
                 <div className="flex-1 text-white md:text-gray-800 md:mb-2 z-10 md:z-0 drop-shadow-md md:drop-shadow-none">
                     <h1 className="text-2xl font-bold flex items-center gap-2">
                        {seller.name} 
                        {seller.isOfficial && <span className="bg-blue-600 text-white text-[10px] uppercase px-2 py-0.5 rounded-full flex items-center gap-1"><i className="fa-solid fa-check-circle"></i> Official Store</span>}
                     </h1>
                     <div className="flex items-center gap-4 text-sm mt-1">
                        <span className="flex items-center gap-1"><i className="fa-solid fa-star text-yellow-400"></i> {seller.rating}/5 Ratings</span>
                        <span>{seller.followers.toLocaleString()} Followers</span>
                     </div>
                 </div>

                 <div className="w-full md:w-auto mt-4 md:mt-0">
                     <button className="bg-primary text-white font-bold py-2 px-8 rounded shadow-md hover:bg-accent transition-colors w-full md:w-auto">
                        FOLLOW
                     </button>
                 </div>
             </div>
         </div>

         {/* Navigation Tabs */}
         <div className="container mx-auto px-4 border-t border-gray-100 mt-4">
             <div className="flex gap-8 overflow-x-auto">
                 <button 
                    onClick={() => setActiveTab('home')}
                    className={`py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'home' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                 >
                    HOME PAGE
                 </button>
                 <button 
                    onClick={() => setActiveTab('profile')}
                    className={`py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                 >
                    PROFILE & POLICIES
                 </button>
                 <button 
                    onClick={() => setActiveTab('feedback')}
                    className={`py-3 font-bold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'feedback' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                 >
                    SELLER FEEDBACK
                 </button>
             </div>
         </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4">
         <div className="flex flex-col lg:flex-row gap-6">
             
             {/* Sidebar (Always visible on large screens) */}
             <div className="w-full lg:w-64 flex-shrink-0 space-y-4">
                 {/* Seller Score */}
                 <div className="bg-white p-4 rounded shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 text-sm mb-3 uppercase border-b pb-2">Seller Performance</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Order Fulfillment</span>
                            <span className="font-bold text-green-600">Excellent</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Quality Score</span>
                            <span className="font-bold text-green-600">High</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Customer Rating</span>
                            <span className="font-bold text-yellow-500">{seller.rating}/5</span>
                        </div>
                    </div>
                 </div>

                 {/* Join Date */}
                 <div className="bg-white p-4 rounded shadow-sm border border-gray-200 text-xs text-gray-500">
                     Joined Lumina on {new Date(seller.joinedDate).toLocaleDateString()}
                 </div>
             </div>

             {/* Main Content */}
             <div className="flex-1">
                 
                 {activeTab === 'home' && (
                     <>
                        {/* Store Search */}
                        <div className="bg-white p-4 rounded shadow-sm border border-gray-200 mb-6 flex items-center gap-2">
                           <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                           <input 
                              type="text" 
                              placeholder={`Search in ${seller.name}...`} 
                              className="flex-1 outline-none text-sm"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                           />
                        </div>

                        {/* Products Grid */}
                        <h2 className="text-lg font-bold mb-4">All Products ({filteredProducts.length})</h2>
                        {filteredProducts.length > 0 ? (
                           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                              {filteredProducts.map(p => (
                                 <ProductCard key={p.id} product={p} />
                              ))}
                           </div>
                        ) : (
                           <div className="text-center py-20 bg-white rounded shadow-sm">
                               <p className="text-gray-500">No products found matching your search.</p>
                           </div>
                        )}
                     </>
                 )}

                 {activeTab === 'profile' && (
                     <div className="bg-white p-8 rounded shadow-sm border border-gray-200">
                         <h2 className="text-xl font-bold mb-4">About {seller.name}</h2>
                         <p className="text-gray-600 mb-8 leading-relaxed">
                            {seller.description}
                         </p>

                         <div className="grid md:grid-cols-2 gap-8">
                             <div>
                                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><i className="fa-solid fa-truck-fast text-primary"></i> Shipping Policy</h3>
                                <p className="text-sm text-gray-500">
                                   We strive to ship all orders within 24 hours of purchase. Standard delivery takes 3-5 business days depending on your location. Expedited options available at checkout.
                                </p>
                             </div>
                             <div>
                                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><i className="fa-solid fa-rotate-left text-primary"></i> Return Policy</h3>
                                <p className="text-sm text-gray-500">
                                   {seller.isOfficial 
                                      ? "Enjoy a 15-day free return policy on all items. Items must be returned in original condition with tags attached." 
                                      : "7-day return policy for eligible items. Please contact us immediately if you receive a defective product."}
                                </p>
                             </div>
                             <div>
                                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2"><i className="fa-solid fa-shield-halved text-primary"></i> Warranty</h3>
                                <p className="text-sm text-gray-500">
                                   All electronic products come with a minimum 1-year manufacturer warranty unless stated otherwise.
                                </p>
                             </div>
                         </div>
                     </div>
                 )}
                 
                 {activeTab === 'feedback' && (
                    <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                       <h2 className="text-xl font-bold mb-6">Customer Feedback</h2>
                       <div className="space-y-6">
                           <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                               <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                                   JD
                               </div>
                               <div>
                                   <div className="flex items-center gap-2 mb-1">
                                       <span className="font-bold text-sm">John Doe</span>
                                       <span className="text-xs text-gray-400">2 days ago</span>
                                   </div>
                                   <div className="flex text-yellow-400 text-xs mb-2">
                                       {[1,2,3,4,5].map(i => <i key={i} className="fa-solid fa-star"></i>)}
                                   </div>
                                   <p className="text-sm text-gray-600">Fast shipping and item exactly as described. Will buy again!</p>
                                   <div className="mt-2 text-xs text-gray-400">Purchased: <span className="text-gray-600">Infinix Hot 30i</span></div>
                               </div>
                           </div>
                           <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                               <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600">
                                   AM
                               </div>
                               <div>
                                   <div className="flex items-center gap-2 mb-1">
                                       <span className="font-bold text-sm">Alice M.</span>
                                       <span className="text-xs text-gray-400">1 week ago</span>
                                   </div>
                                   <div className="flex text-yellow-400 text-xs mb-2">
                                       {[1,2,3,4].map(i => <i key={i} className="fa-solid fa-star"></i>)}
                                       <i className="fa-solid fa-star text-gray-200"></i>
                                   </div>
                                   <p className="text-sm text-gray-600">Product is good but packaging could be better.</p>
                                   <div className="mt-2 text-xs text-gray-400">Purchased: <span className="text-gray-600">Wireless Headphones</span></div>
                               </div>
                           </div>
                       </div>
                    </div>
                 )}

             </div>
         </div>
      </div>
    </div>
  );
};

export default SellerProfile;