import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Coupon } from '../../types';

const Coupons: React.FC = () => {
  const { coupons, addCoupon, deleteCoupon } = useStore();
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
      code: '',
      value: 0,
      discountType: 'percentage',
      expiryDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const coupon: Coupon = {
          id: Date.now().toString(),
          code: newCoupon.code!.toUpperCase(),
          discountType: newCoupon.discountType as any,
          value: Number(newCoupon.value),
          expiryDate: newCoupon.expiryDate!,
          isActive: true,
          usageCount: 0
      };
      addCoupon(coupon);
      setNewCoupon({ code: '', value: 0, discountType: 'percentage', expiryDate: '' });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Coupon Manager</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Form */}
         <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
                 <h2 className="font-bold text-lg mb-4">Create Coupon</h2>
                 <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                         <input required type="text" className="w-full border p-2 rounded uppercase" value={newCoupon.code} onChange={e => setNewCoupon({...newCoupon, code: e.target.value})} placeholder="e.g. SUMMER20" />
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select className="w-full border p-2 rounded" value={newCoupon.discountType} onChange={e => setNewCoupon({...newCoupon, discountType: e.target.value as any})}>
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed ($)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                            <input required type="number" className="w-full border p-2 rounded" value={newCoupon.value || ''} onChange={e => setNewCoupon({...newCoupon, value: Number(e.target.value)})} placeholder="10" />
                        </div>
                     </div>

                     <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                         <input required type="date" className="w-full border p-2 rounded" value={newCoupon.expiryDate} onChange={e => setNewCoupon({...newCoupon, expiryDate: e.target.value})} />
                     </div>

                     <button type="submit" className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-accent mt-2">
                         CREATE COUPON
                     </button>
                 </form>
             </div>
         </div>

         {/* List */}
         <div className="lg:col-span-2">
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Code</th>
                            <th className="px-6 py-3">Discount</th>
                            <th className="px-6 py-3">Expires</th>
                            <th className="px-6 py-3">Usage</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {coupons.map(c => (
                            <tr key={c.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <span className="font-mono font-bold text-primary bg-orange-50 px-2 py-1 rounded border border-orange-100">{c.code}</span>
                                </td>
                                <td className="px-6 py-4 font-bold">
                                    {c.discountType === 'percentage' ? `${c.value}%` : `$${c.value}`}
                                </td>
                                <td className="px-6 py-4">{new Date(c.expiryDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{c.usageCount} times</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => deleteCoupon(c.id)} className="text-red-500 hover:text-red-700">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {coupons.length === 0 && (
                    <div className="p-8 text-center text-gray-500">No active coupons. Create one to get started.</div>
                )}
             </div>
         </div>
      </div>
    </div>
  );
};

export default Coupons;