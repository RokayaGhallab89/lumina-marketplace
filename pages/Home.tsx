import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/SkeletonLoader';
import { CATEGORIES } from '../constants';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useStore } from '../context/StoreContext';

const Home: React.FC = () => {
  const { recentlyViewed } = useCart();
  const { products } = useStore();
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  
  // Loading state simulation
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Simulate loading delay
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  const availableBrands = useMemo(() => {
    let baseProducts = products;
    if (activeCategory !== 'all') {
      baseProducts = baseProducts.filter(p => p.category === activeCategory);
    }
    const brands = Array.from(new Set(baseProducts.map(p => p.brand))).sort();
    return brands;
  }, [activeCategory, products]);

  const handleCategorySelect = (id: string) => {
    setActiveCategory(id);
    setSelectedBrands([]); // Reset filters when changing category
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    if (searchQuery) {
      setSearchParams({});
    }
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const getProductsByCategory = (catId: string) => {
    return products.filter(p => p.category === catId);
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.brand.toLowerCase().includes(lowerQuery)
      );
    } else if (activeCategory !== 'all') {
      result = getProductsByCategory(activeCategory);
    }

    if (minPrice) {
      result = result.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= Number(maxPrice));
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return 0; // Featured / ID order
      }
    });

    return result;
  }, [searchQuery, activeCategory, minPrice, maxPrice, selectedBrands, minRating, inStockOnly, sortBy, products]);

  const trendingProducts = useMemo(() => {
     return products.filter(p => p.rating >= 4.5 && p.reviews > 100).sort((a,b) => b.reviews - a.reviews).slice(0, 6);
  }, [products]);

  const recentlyViewedProducts = useMemo(() => {
     return recentlyViewed.map(id => products.find(p => p.id === id)).filter(Boolean) as typeof products;
  }, [recentlyViewed, products]);

  const recommendedProducts = useMemo(() => {
     if (recentlyViewed.length > 0) {
        const viewedCats = recentlyViewedProducts.map(p => p.category);
        const topCat = viewedCats.sort((a,b) => 
            viewedCats.filter(v => v===a).length - viewedCats.filter(v => v===b).length
        ).pop();
        
        if (topCat) {
            return products.filter(p => p.category === topCat && !recentlyViewed.includes(p.id)).slice(0, 6);
        }
     }
     return products.filter(p => p.rating >= 4.0).slice(10, 16);
  }, [recentlyViewed, recentlyViewedProducts, products]);


  const isGridView = searchQuery || activeCategory !== 'all';

  useEffect(() => {
    window.scrollTo(0,0);
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen pb-12 bg-gray-100">
      <Hero 
        activeCategory={searchQuery ? 'all' : activeCategory} 
        onSelectCategory={handleCategorySelect} 
      />
      
      {/* Mobile Category Circular Rail */}
      <div className="md:hidden py-4 px-2 overflow-x-auto scrollbar-hide bg-white mb-4 shadow-sm border-b border-gray-100">
         <div className="flex gap-4 min-w-max px-2">
            {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
              <div 
                key={cat.id} 
                className="flex flex-col items-center gap-1 w-16 cursor-pointer" 
                onClick={() => handleCategorySelect(cat.id)}
              >
                 <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl bg-gray-50 border transition-colors ${activeCategory === cat.id && !searchQuery ? 'border-primary text-primary shadow-sm' : 'border-gray-200 text-gray-600'}`}>
                    <i className={`fa-solid ${cat.icon}`}></i>
                 </div>
                 <span className="text-[10px] font-medium text-center truncate w-full">{cat.name}</span>
              </div>
            ))}
         </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        
        {isGridView ? (
           <div className="flex flex-col md:flex-row gap-6 items-start">
             
             {/* Sidebar Filter (Desktop) */}
             <div className="hidden md:block w-64 bg-white rounded-md shadow-sm border border-gray-200 p-4 sticky top-24">
               <div className="flex items-center justify-between mb-4 border-b pb-2">
                 <h3 className="font-bold text-gray-800">{t('filters')}</h3>
                 <button onClick={() => { setMinPrice(''); setMaxPrice(''); setSelectedBrands([]); setMinRating(0); setInStockOnly(false); }} className="text-xs text-primary font-bold hover:underline">{t('reset')}</button>
               </div>

               {/* Price Filter */}
               <div className="mb-6">
                 <h4 className="text-sm font-bold text-gray-700 mb-2">{t('price')}</h4>
                 <div className="flex items-center gap-2">
                   <input type="number" placeholder="Min" className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-primary focus:outline-none" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                   <span className="text-gray-400">-</span>
                   <input type="number" placeholder="Max" className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:border-primary focus:outline-none" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                 </div>
               </div>
               
               {/* Brand Filter */}
               <div className="mb-6">
                 <h4 className="text-sm font-bold text-gray-700 mb-2">{t('brand')}</h4>
                 <div className="space-y-1 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                   {availableBrands.map(brand => (
                     <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                       <input 
                         type="checkbox" 
                         className="rounded text-primary focus:ring-primary"
                         checked={selectedBrands.includes(brand)}
                         onChange={() => handleBrandToggle(brand)}
                       />
                       {brand}
                     </label>
                   ))}
                 </div>
               </div>

               {/* Rating Filter */}
               <div className="mb-6">
                 <h4 className="text-sm font-bold text-gray-700 mb-2">{t('rating')}</h4>
                 <div className="space-y-1">
                   {[4, 3, 2, 1].map(star => (
                     <label key={star} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                       <input 
                         type="radio" 
                         name="rating" 
                         checked={minRating === star}
                         onChange={() => setMinRating(star)}
                         className="text-primary focus:ring-primary"
                       />
                       <div className="flex text-yellow-400 text-xs">
                          {[...Array(5)].map((_, i) => (
                             <i key={i} className={`fa-solid fa-star ${i < star ? '' : 'text-gray-200'}`}></i>
                          ))}
                       </div>
                       <span className="text-gray-500 text-xs">& Up</span>
                     </label>
                   ))}
                 </div>
               </div>

               {/* Availability */}
               <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">{t('availability')}</h4>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                     <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="rounded text-primary focus:ring-primary" />
                     {t('includeOutOfStock')}
                  </label>
               </div>
             </div>

             {/* Product Grid Area */}
             <div className="flex-1">
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 mb-4 flex flex-wrap items-center justify-between gap-4">
                  <h2 className="text-lg font-bold capitalize truncate">
                    {searchQuery 
                      ? `Search: "${searchQuery}"` 
                      : `${CATEGORIES.find(c => c.id === activeCategory)?.name || 'All'} Products`
                    }
                    <span className="text-sm font-normal text-gray-500 ml-2">
                        {isLoading ? '...' : `(${filteredProducts.length} items)`}
                    </span>
                  </h2>

                  <div className="flex items-center gap-3">
                    <button 
                      className="md:hidden flex items-center gap-1 border border-gray-300 px-3 py-1.5 rounded text-sm font-medium hover:bg-gray-50"
                      onClick={() => setIsMobileFilterOpen(true)}
                    >
                      <i className="fa-solid fa-filter text-gray-500"></i> {t('filters')}
                    </button>

                    <div className="flex items-center gap-2">
                       <span className="text-sm text-gray-500 hidden sm:inline">{t('sortBy')}</span>
                       <select 
                         value={sortBy} 
                         onChange={(e) => setSortBy(e.target.value)}
                         className="border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-primary"
                       >
                         <option value="featured">{t('featured')}</option>
                         <option value="price-asc">{t('priceLowHigh')}</option>
                         <option value="price-desc">{t('priceHighLow')}</option>
                         <option value="rating">{t('avgReview')}</option>
                         <option value="newest">{t('newest')}</option>
                       </select>
                    </div>
                  </div>
                </div>

                {/* Grid with Skeleton Loader */}
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200 min-h-[400px]">
                   {isLoading ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                          {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
                      </div>
                   ) : filteredProducts.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                   ) : (
                      <div className="py-20 text-center flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                           <i className="fa-solid fa-magnifying-glass text-4xl text-gray-300"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{t('noProducts')}</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            We couldn't find what you're looking for. Try adjusting your filters or search for something else.
                        </p>
                        <button onClick={() => { setSearchParams({}); setActiveCategory('all'); setMinPrice(''); setMaxPrice(''); setSelectedBrands([]); setMinRating(0); }} className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-accent transition-all shadow-md">
                          {t('resetFilters')}
                        </button>
                      </div>
                   )}
                </div>
             </div>
           </div>
        ) : (
          <div className="space-y-8">
            {/* Standard Dashboard Layout */}
            
            <div className="rounded-md overflow-hidden shadow-sm bg-white border border-gray-100">
              <div className="bg-red-600 text-white p-3 flex items-center justify-between">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <i className="fa-solid fa-bolt"></i> {t('flashSales')}
                </h3>
                <div className="text-sm font-medium bg-red-700 px-3 py-1 rounded">Ends in 05h : 23m</div>
              </div>
              <div className="p-4 overflow-x-auto scrollbar-hide">
                 <div className="flex gap-4 min-w-max">
                   {isLoading 
                      ? [...Array(5)].map((_, i) => <div key={i} className="w-40 md:w-48"><ProductSkeleton /></div>)
                      : products.slice(0, 8).map(product => (
                         <div key={`flash-${product.id}`} className="w-40 md:w-48">
                           <ProductCard product={product} />
                         </div>
                   ))}
                 </div>
              </div>
            </div>

            {/* Trending Now */}
            <div>
               <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <i className="fa-solid fa-fire text-orange-500"></i> {t('trending')}
                 </h3>
               </div>
               <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {isLoading
                     ? [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
                     : trendingProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                  ))}
                </div>
               </div>
            </div>

            {/* Recently Viewed */}
            {recentlyViewedProducts.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <i className="fa-solid fa-clock-rotate-left text-gray-500"></i> {t('recentlyViewed')}
                        </h3>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {recentlyViewedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Recommended For You */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-md shadow-sm border border-blue-100">
              <div className="flex items-center justify-between mb-3">
                 <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <i className="fa-solid fa-wand-magic-sparkles text-purple-600"></i> {t('recommended')}
                 </h3>
                 <span className="text-xs font-medium text-purple-600 bg-white px-2 py-1 rounded-full shadow-sm">Based on your interests</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {isLoading 
                    ? [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
                    : recommendedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Electronics */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-xl font-bold text-gray-800">{t('topElectronics')}</h3>
                 <button onClick={() => handleCategorySelect('electronics')} className="text-sm font-bold text-primary hover:underline">{t('viewAll')}</button>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {getProductsByCategory('electronics').slice(0, 6).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                  {getProductsByCategory('phones').slice(0, 6).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>

            {/* Banner Grid (Ad Space) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="h-40 md:h-52 bg-blue-100 rounded-md overflow-hidden relative group cursor-pointer hover:shadow-lg transition-shadow">
                  <img src="https://picsum.photos/id/180/600/300" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Ad" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                     <h3 className="text-2xl font-bold text-white border-2 border-white px-6 py-2">NEW ARRIVALS</h3>
                  </div>
               </div>
               <div className="h-40 md:h-52 bg-pink-100 rounded-md overflow-hidden relative group cursor-pointer hover:shadow-lg transition-shadow">
                  <img src="https://picsum.photos/id/250/600/300" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Ad" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                     <h3 className="text-2xl font-bold text-white border-2 border-white px-6 py-2">CAMERA DEALS</h3>
                  </div>
               </div>
            </div>

            {/* Fashion Section */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                 <h3 className="text-xl font-bold text-gray-800">{t('trendingFashion')}</h3>
                 <button onClick={() => handleCategorySelect('fashion')} className="text-sm font-bold text-primary hover:underline">{t('viewAll')}</button>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {getProductsByCategory('fashion').slice(0, 12).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden">
           <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsMobileFilterOpen(false)}></div>
           <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl flex flex-col animate-slide-in-right rtl:left-0 rtl:right-auto">
             <div className="flex items-center justify-between p-4 border-b">
               <h3 className="font-bold text-lg">{t('filters')}</h3>
               <button onClick={() => setIsMobileFilterOpen(false)}>
                 <i className="fa-solid fa-xmark text-xl text-gray-500"></i>
               </button>
             </div>
             
             {/* Filter Content */}
             <div className="flex-1 overflow-y-auto p-4">
                 {/* Price Filter */}
                 <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-700 mb-2">{t('price')}</h4>
                    <div className="flex items-center gap-2">
                        <input type="number" placeholder="Min" className="w-full px-2 py-2 text-sm border border-gray-300 rounded focus:border-primary focus:outline-none" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                        <span className="text-gray-400">-</span>
                        <input type="number" placeholder="Max" className="w-full px-2 py-2 text-sm border border-gray-300 rounded focus:border-primary focus:outline-none" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                    </div>
                </div>
               
               {/* Brand Filter */}
               <div className="mb-6">
                 <h4 className="text-sm font-bold text-gray-700 mb-2">{t('brand')}</h4>
                 <div className="space-y-2">
                   {availableBrands.map(brand => (
                     <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                       <input 
                         type="checkbox" 
                         className="w-4 h-4 rounded text-primary focus:ring-primary"
                         checked={selectedBrands.includes(brand)}
                         onChange={() => handleBrandToggle(brand)}
                       />
                       {brand}
                     </label>
                   ))}
                 </div>
               </div>

               {/* Rating Filter */}
               <div className="mb-6">
                 <h4 className="text-sm font-bold text-gray-700 mb-2">{t('rating')}</h4>
                 <div className="space-y-2">
                   {[4, 3, 2, 1].map(star => (
                     <label key={star} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                       <input 
                         type="radio" 
                         name="mobile-rating" 
                         checked={minRating === star}
                         onChange={() => setMinRating(star)}
                         className="w-4 h-4 text-primary focus:ring-primary"
                       />
                       <div className="flex text-yellow-400 text-xs">
                          {[...Array(5)].map((_, i) => (
                             <i key={i} className={`fa-solid fa-star ${i < star ? '' : 'text-gray-200'}`}></i>
                          ))}
                       </div>
                       <span className="text-gray-500 text-xs">& Up</span>
                     </label>
                   ))}
                 </div>
               </div>

               {/* Availability */}
               <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-2">{t('availability')}</h4>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary">
                     <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)} className="w-4 h-4 rounded text-primary focus:ring-primary" />
                     {t('includeOutOfStock')}
                  </label>
               </div>
             </div>

             <div className="p-4 border-t bg-gray-50 flex gap-2 mt-auto">
                <button onClick={() => { setMinPrice(''); setMaxPrice(''); setSelectedBrands([]); setMinRating(0); setInStockOnly(false); }} className="flex-1 py-3 border border-gray-300 rounded text-sm font-bold">{t('reset')}</button>
                <button onClick={() => setIsMobileFilterOpen(false)} className="flex-[2] bg-primary text-white py-3 rounded text-sm font-bold">Done</button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Home;