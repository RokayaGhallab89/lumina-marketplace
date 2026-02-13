import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';

const Products: React.FC = () => {
  const { products, deleteProduct, addProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Basic form state for adding
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: '',
    price: 0,
    category: 'electronics',
    brand: '',
    inStock: true,
    image: 'https://picsum.photos/400/400'
  });

  const filtered = products.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: Date.now(),
      title: newProduct.title!,
      price: Number(newProduct.price),
      category: newProduct.category!,
      brand: newProduct.brand!,
      inStock: newProduct.inStock!,
      image: newProduct.image!,
      images: [newProduct.image!],
      description: 'New product added via Admin.',
      rating: 0,
      reviews: 0,
      reviewsList: [],
      createdAt: new Date().toISOString(),
      seller: { 
          id: 'admin', name: 'Lumina Direct', rating: 5, followers: 0, 
          logo: '', banner: '', isOfficial: true, joinedDate: '', description: '' 
      }
    };
    addProduct(product);
    setIsModalOpen(false);
  };

  return (
    <div>
       <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-accent transition-colors">
             <i className="fa-solid fa-plus mr-2"></i> Add Product
          </button>
       </div>

       <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
             <input 
               type="text" 
               placeholder="Search products..." 
               className="w-full max-w-md border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
             />
          </div>
          
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-xs">
                   <tr>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Stock</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {filtered.map(p => (
                      <tr key={p.id} className="hover:bg-gray-50">
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <img src={p.image} className="w-10 h-10 rounded object-cover" alt="" />
                               <div>
                                  <p className="font-bold text-gray-800 line-clamp-1">{p.title}</p>
                                  <p className="text-xs text-gray-400">ID: {p.id}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4 capitalize">{p.category}</td>
                         <td className="px-6 py-4 font-bold text-gray-800">${p.price}</td>
                         <td className="px-6 py-4">
                            {p.inStock 
                              ? <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-bold">In Stock</span>
                              : <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-bold">Out of Stock</span>
                            }
                         </td>
                         <td className="px-6 py-4 text-right">
                            <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700">
                               <i className="fa-solid fa-trash"></i>
                            </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>

       {/* Add Modal */}
       {isModalOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl animate-fade-in-up">
               <h2 className="text-xl font-bold mb-4">Add New Product</h2>
               <form onSubmit={handleAdd} className="space-y-4">
                  <input required placeholder="Product Title" className="w-full border p-2 rounded" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                     <input required type="number" placeholder="Price" className="w-full border p-2 rounded" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                     <select className="w-full border p-2 rounded" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                        <option value="electronics">Electronics</option>
                        <option value="fashion">Fashion</option>
                        <option value="home">Home</option>
                        <option value="gaming">Gaming</option>
                     </select>
                  </div>
                  <input required placeholder="Brand" className="w-full border p-2 rounded" value={newProduct.brand} onChange={e => setNewProduct({...newProduct, brand: e.target.value})} />
                  
                  <div className="flex justify-end gap-3 mt-6">
                     <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
                     <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-accent">Save Product</button>
                  </div>
               </form>
            </div>
         </div>
       )}
    </div>
  );
};

export default Products;