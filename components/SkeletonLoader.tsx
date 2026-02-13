import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="aspect-square bg-gray-200"></div>
      
      {/* Content Placeholder */}
      <div className="p-3 flex flex-col flex-1 space-y-3">
        {/* Title Lines */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        
        <div className="mt-auto space-y-3">
           {/* Price */}
           <div className="h-6 bg-gray-200 rounded w-1/3"></div>
           
           {/* Rating */}
           <div className="flex gap-1">
              {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-3 h-3 bg-gray-200 rounded-full"></div>
              ))}
           </div>

           {/* Button */}
           <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export const BannerSkeleton: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-gray-200 rounded-md animate-pulse"></div>
  );
};