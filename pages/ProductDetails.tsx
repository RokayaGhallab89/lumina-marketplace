import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useStore();
  const { addToCart, toggleWishlist, isInWishlist, addRecentlyViewed, setIsAiChatOpen, setAiContext } = useCart();
  const { t, formatPrice, language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string>('');
  
  const product = products.find(p => p.id === Number(id));

  // Reset selected image when product changes and add to recently viewed
  useEffect(() => {
    if (product) {
        setSelectedImage(product.image);
        addRecentlyViewed(product.id);
    }
  }, [product, addRecentlyViewed]);

  const deliveryDates = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 2); // 2 days from now
    const end = new Date(today);
    end.setDate(today.getDate() + 5); // 5 days from now
    
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    const locale = language === 'ar' ? 'ar-EG' : 'en-US';
    return {
        start: start.toLocaleDateString(locale, options),
        end: end.toLocaleDateString(locale, options)
    };
  }, [language]);

  const handleAskAI = () => {
    if (!product) return;
    setAiContext(`I am looking at ${product.title}. Can you tell me if this is good for ${product.category === 'gaming' ? 'gaming' : 'daily use'}? And suggest similar items.`);
    setIsAiChatOpen(true);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/" className="text-primary hover:underline">Back to Home</Link>
      </div>
    );
  }

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const isLiked = isInWishlist(product.id);
  
  const similarProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const moreFromSeller = products.filter(p => p.seller.id === product.seller.id && p.id !== product.id).slice(0, 4);

  // Review Stats
  const totalReviews = product.reviewsList.length;
  const averageRating = product.reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviews || 0;
  
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;
  product.reviewsList.forEach(r => {
      const rVal = Math.floor(r.rating);
      if(rVal >= 1 && rVal <= 5) ratingCounts[rVal]++;
  });

  return (
    <div className="container mx-auto px-4 py-8 pb-32 md:pb-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-primary">Home</Link> 
        <i className={`fa-solid ${language === 'ar' ? 'fa-chevron-left' : 'fa-chevron-right'} text-xs`}></i>
        <span className="capitalize">{product.category}</span>
        <i className={`fa-solid ${language === 'ar' ? 'fa-chevron-left' : 'fa-chevron-right'} text-xs`}></i>
        <span className="text-gray-800 truncate max-w-[200px]">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        
        {/* LEFT COLUMN: Images & Main Info */}
        <div className="lg:col-span-9">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0 border border-gray-200">
                
                {/* Image Gallery */}
                <div className="md:col-span-5 p-6 border-b md:border-b-0 md:border-r border-gray-200 rtl:md:border-l rtl:md:border-r-0">
                <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4 border border-gray-100">
                    <img src={selectedImage || product.image} alt={product.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {(product.images || [product.image]).map((img, i) => (
                    <div 
                        key={i} 
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 border rounded cursor-pointer overflow-hidden flex-shrink-0 ${selectedImage === img ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-gray-400'}`}
                    >
                        <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                    </div>
                    ))}
                </div>
                </div>

                {/* Product Info */}
                <div className="md:col-span-7 p-6 flex flex-col">
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl font-medium text-gray-800 mb-2">{product.title}</h1>
                        <button 
                            onClick={() => toggleWishlist(product.id)}
                            className={`p-2 rounded-full transition-colors ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 bg-gray-50'}`}
                        >
                            <i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart text-xl`}></i>
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-2 text-sm">
                        <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fa-solid fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-200'}`}></i>
                        ))}
                        </div>
                        <span className="text-primary hover:underline cursor-pointer">{totalReviews} {t('verifiedRatings')}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-4">{t('brandLabel')} <span className="text-black font-medium">{product.brand}</span> | {t('similarProducts')} {product.brand}</div>

                    <hr className="border-gray-100 mb-4" />

                    <div className="mb-6">
                        <div className="flex items-end gap-3 mb-1">
                        <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                        {product.oldPrice && (
                            <span className="text-lg text-gray-400 line-through mb-1">{formatPrice(product.oldPrice)}</span>
                        )}
                        {discount > 0 && (
                            <span className="bg-red-100 text-red-600 font-bold px-2 py-1 rounded text-sm mb-1">-{discount}%</span>
                        )}
                        </div>
                        <p className="text-xs text-gray-500">+ {t('shippingFrom')} {formatPrice(2)} to LEKKI-AJAH</p>
                    </div>

                    {/* Desktop Actions */}
                    <div className="mb-4 hidden md:flex gap-4">
                       <button 
                           onClick={() => addToCart(product)}
                           className="flex-1 bg-primary text-white text-lg font-bold py-3 rounded shadow-lg hover:bg-accent transition-all active:scale-95 flex items-center justify-center gap-3"
                       >
                           <i className="fa-solid fa-cart-shopping"></i> {t('addToCart')}
                       </button>
                       <button
                           onClick={handleAskAI}
                           className="px-4 bg-secondary text-white font-bold rounded shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                           title="Ask AI Assistant about this product"
                       >
                           <i className="fa-solid fa-wand-magic-sparkles"></i> <span className="hidden sm:inline">{t('askAi')}</span>
                       </button>
                    </div>
                    
                    {/* Trust Badges */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                        <span className="flex items-center gap-1"><i className="fa-solid fa-shield-halved text-green-600"></i> {t('authentic')}</span>
                        <span className="flex items-center gap-1"><i className="fa-solid fa-lock text-green-600"></i> {t('securePayment')}</span>
                        <span className="flex items-center gap-1"><i className="fa-solid fa-hand-holding-dollar text-green-600"></i> {t('bestPrice')}</span>
                    </div>

                    <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm space-y-3">
                        <h3 className="font-bold text-gray-800 uppercase text-xs">{t('promotions')}</h3>
                        <div className="flex items-start gap-2">
                        <i className="fa-solid fa-phone text-primary mt-1"></i>
                        <div>
                            <p className="font-medium text-blue-600 hover:underline cursor-pointer">{t('callToOrder')} 0800-LUMINA</p>
                        </div>
                        </div>
                        <div className="flex items-start gap-2">
                        <i className="fa-solid fa-rotate-left text-primary mt-1"></i>
                        <div>
                            <p className="font-medium">{t('freeReturn')}</p>
                            <p className="text-gray-500 text-xs">{t('officialStoreItems')}</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description & Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 overflow-hidden">
                <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex gap-6">
                    <span className="font-bold text-primary border-b-2 border-primary pb-2.5 -mb-3.5">{t('description')}</span>
                    <span className="font-bold text-gray-500 hover:text-gray-800 cursor-pointer">{t('specifications')}</span>
                    <span className="font-bold text-gray-500 hover:text-gray-800 cursor-pointer">{t('verifiedFeedback')} ({totalReviews})</span>
                </div>
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">{t('description')}</h2>
                    <div className="prose max-w-none text-gray-700 mb-8">
                        <p className="mb-4">{product.description}</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>High quality build material</li>
                            <li>1 year warranty included</li>
                            <li>Supports fast charging</li>
                            <li>Global version with multi-language support</li>
                        </ul>
                    </div>

                    <hr className="my-8 border-gray-100" />
                    
                    {/* Ratings Summary */}
                    <h2 className="text-xl font-bold text-gray-800 mb-6">{t('verifiedFeedback')}</h2>
                    <div className="flex flex-col md:flex-row gap-8 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <div className="flex flex-col items-center justify-center min-w-[120px]">
                            <h3 className="text-4xl font-bold text-primary">{averageRating.toFixed(1)}/5</h3>
                            <div className="flex text-yellow-400 text-sm my-1">
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className={`fa-solid fa-star ${i < Math.round(averageRating) ? '' : 'text-gray-200'}`}></i>
                                ))}
                            </div>
                            <span className="text-gray-500 text-xs">{totalReviews} {t('verifiedRatings')}</span>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                            {[5, 4, 3, 2, 1].map(stars => (
                                <div key={stars} className="flex items-center gap-2 text-xs">
                                    <span className="w-8 font-bold text-gray-600">{stars} Stars</span>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-yellow-400 rounded-full" 
                                            style={{ width: `${totalReviews ? (ratingCounts[stars] / totalReviews) * 100 : 0}%` }}
                                        ></div>
                                    </div>
                                    <span className="w-6 text-gray-500 text-right">{ratingCounts[stars]}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <h3 className="font-bold text-lg mb-4">{t('reviews')} ({totalReviews})</h3>
                    <div className="space-y-6">
                        {product.reviewsList?.map((review) => (
                            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-yellow-400 text-xs">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={`fa-solid fa-star ${i < review.rating ? '' : 'text-gray-200'}`}></i>
                                            ))}
                                        </div>
                                        <span className="font-bold text-sm text-gray-800">{review.comment}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{review.date}</span>
                                </div>
                                
                                {review.images && review.images.length > 0 && (
                                    <div className="flex gap-2 my-2">
                                        {review.images.map((img, idx) => (
                                            <div key={idx} className="w-16 h-16 rounded border border-gray-200 overflow-hidden cursor-pointer">
                                                <img src={img} alt="Review" className="w-full h-full object-cover hover:scale-110 transition-transform" />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-2">
                                     <span className="text-xs text-gray-600 font-medium">by {review.userName}</span>
                                     {review.verified && (
                                         <span className="text-green-600 text-xs flex items-center gap-1 font-bold bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                             <i className="fa-solid fa-circle-check"></i> Verified Purchase
                                         </span>
                                     )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: Seller & Delivery Info */}
        <div className="lg:col-span-3 space-y-4">
             {/* Delivery */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 border-b pb-2">{t('deliveryReturns')}</h3>
                
                <div className="mb-4">
                     <div className="flex gap-3 mb-1">
                        <div className="w-8 h-8 rounded border flex items-center justify-center flex-shrink-0 bg-gray-50">
                            <i className="fa-solid fa-truck-fast text-primary"></i>
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">{t('doorDelivery')}</h4>
                            <p className="text-xs text-gray-500 mt-1">
                                Ready for delivery between <span className="text-gray-800 font-bold">{deliveryDates.start}</span> & <span className="text-gray-800 font-bold">{deliveryDates.end}</span> when you order within next 5hrs 23mins
                            </p>
                        </div>
                     </div>
                </div>

                <div className="mb-4">
                     <div className="flex gap-3 mb-1">
                        <div className="w-8 h-8 rounded border flex items-center justify-center flex-shrink-0 bg-gray-50">
                             <i className="fa-solid fa-hand-holding-dollar text-primary"></i>
                        </div>
                        <div>
                             <h4 className="font-bold text-sm">{t('codAvailable')}</h4>
                             <p className="text-xs text-gray-500 mt-1">Pay when you receive your order.</p>
                        </div>
                     </div>
                </div>

                <div className="flex gap-3">
                     <div className="w-8 h-8 rounded border flex items-center justify-center flex-shrink-0 bg-gray-50">
                        <i className="fa-solid fa-rotate-left text-primary"></i>
                     </div>
                     <div>
                        <h4 className="font-bold text-sm">{t('returnPolicy')}</h4>
                        <p className="text-xs text-gray-500 mt-1">{t('freeReturn')}. <Link to="#" className="text-blue-500 hover:underline">See more</Link></p>
                     </div>
                </div>
             </div>

             {/* Seller Info */}
             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 border-b pb-2">{t('sellerInfo')}</h3>
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 font-bold overflow-hidden border border-gray-200">
                        <img src={product.seller.logo} alt={product.seller.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="overflow-hidden flex-1">
                        <h4 className="font-bold text-gray-800 truncate flex items-center gap-1">
                           <Link to={`/seller/${product.seller.id}`} className="hover:underline">{product.seller.name}</Link>
                           {product.seller.isOfficial && <i className="fa-solid fa-check-circle text-blue-600 text-xs" title="Official Store"></i>}
                        </h4>
                        <p className="text-xs text-gray-500">{product.seller.rating}/5 {t('customerRating')}</p>
                    </div>
                </div>
                <div className="flex justify-between text-sm border-t pt-3 bg-gray-50 p-2 rounded">
                    <div className="text-center w-1/2 border-r border-gray-200 rtl:border-l rtl:border-r-0">
                        <span className="block font-bold text-lg">{product.seller.followers.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-500 uppercase">{t('followers')}</span>
                    </div>
                    <div className="text-center w-1/2">
                        <span className="block font-bold text-lg text-green-600">86%</span>
                        <span className="text-[10px] text-gray-500 uppercase">{t('orderScore')}</span>
                    </div>
                </div>
                <Link to={`/seller/${product.seller.id}`} className="block w-full text-center mt-4 border border-primary text-primary font-bold py-2 rounded hover:bg-orange-50 transition-colors text-sm">
                    {t('viewProfile')}
                </Link>
             </div>
        </div>
      </div>

      {/* More from Seller */}
      {moreFromSeller.length > 0 && (
         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">{t('moreFrom')} {product.seller.name}</h2>
                <Link to={`/seller/${product.seller.id}`} className="text-primary font-bold text-sm hover:underline">{t('viewAll')}</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {moreFromSeller.map(prod => (
                    <ProductCard key={prod.id} product={prod} />
                ))}
            </div>
         </div>
      )}

      {/* Similar Products */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t('youMayLike')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similarProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
            ))}
        </div>
      </div>
      
      {/* Mobile Sticky Add to Cart Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden z-50 flex items-center gap-3 pb-[calc(env(safe-area-inset-bottom)+12px)]">
          <div className="flex flex-col">
             <span className="text-xs text-gray-500">Total Price</span>
             <span className="font-bold text-lg text-gray-900">{formatPrice(product.price)}</span>
          </div>
          <button 
             onClick={() => addToCart(product)}
             className="flex-1 bg-primary text-white font-bold py-3 rounded-full shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
             <i className="fa-solid fa-cart-plus"></i> {t('addToCart')}
          </button>
      </div>

    </div>
  );
};

export default ProductDetails;