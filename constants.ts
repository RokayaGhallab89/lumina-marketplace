import { Product, Category, Seller, Review } from './types';

export const EXCHANGE_RATE = 50; // 1 USD = 50 EGP

export const TRANSLATIONS = {
  en: {
    // Header
    searchPlaceholder: "Search products, brands and categories...",
    search: "SEARCH",
    orders: "Orders",
    saved: "Saved",
    cart: "Cart",
    freeDelivery: "FREE DELIVERY on all orders over",
    sellOn: "Sell on Lumina",
    
    // Home
    flashSales: "Flash Sales",
    trending: "Trending Now",
    recentlyViewed: "Recently Viewed",
    recommended: "Recommended For You",
    topElectronics: "Top Electronics",
    trendingFashion: "Trending Fashion",
    viewAll: "VIEW ALL",
    filters: "Filters",
    reset: "RESET",
    price: "Price",
    brand: "Brand",
    rating: "Rating",
    availability: "Availability",
    includeOutOfStock: "Include Out of Stock",
    sortBy: "Sort by:",
    featured: "Featured",
    priceLowHigh: "Price: Low to High",
    priceHighLow: "Price: High to Low",
    newest: "Newest Arrivals",
    avgReview: "Avg. Customer Review",
    noProducts: "No products found",
    resetFilters: "Reset All Filters",
    addToCart: "ADD TO CART",
    
    // Product Details
    reviews: "Reviews",
    description: "Description",
    specifications: "Specifications",
    verifiedFeedback: "Verified Feedback",
    verifiedRatings: "verified ratings",
    brandLabel: "Brand:",
    similarProducts: "Similar products from",
    shippingFrom: "shipping from",
    authentic: "100% Authentic",
    securePayment: "Secure Payment",
    bestPrice: "Best Price",
    promotions: "Promotions",
    callToOrder: "Call to order",
    freeReturn: "Free return within 15 days",
    officialStoreItems: "For Official Store items",
    deliveryReturns: "Delivery & Returns",
    doorDelivery: "Door Delivery",
    codAvailable: "Cash on Delivery Available",
    returnPolicy: "Return Policy",
    sellerInfo: "Seller Information",
    customerRating: "Customer Rating",
    followers: "Followers",
    orderScore: "Order Score",
    viewProfile: "VIEW SELLER PROFILE",
    moreFrom: "More from",
    youMayLike: "You may also like",
    askAi: "Ask AI",
    
    // Footer
    about: "About Lumina",
    payment: "Payment",
    buyingOn: "Buying on Lumina",
    newsletter: "Newsletter",
    subscribe: "Subscribe to get the latest promo codes!",
    enterEmail: "Enter Email Address",
    male: "Male",
    female: "Female",
    rights: "Lumina Shop. All rights reserved.",
    careers: "Careers",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    safety: "Buyer Safety Centre",
    faqs: "FAQs",
    delivery: "Delivery",
    
    // Cart & Checkout
    shoppingCart: "Shopping Cart",
    cartEmpty: "Your cart is empty!",
    startShopping: "START SHOPPING",
    subtotal: "Subtotal",
    checkout: "CHECKOUT",
    clearCart: "Clear Cart",
    continueShopping: "Continue Shopping",
    item: "ITEM",
    quantity: "QUANTITY",
    unitPrice: "UNIT PRICE",
    shipping: "Shipping",
    total: "Total",
    remove: "REMOVE",
    
    // Badges
    officialStore: "Official Store",
    bestSeller: "Best Seller",
    flashSale: "Flash Sale",
    topRated: "Top Rated",
    choice: "Choice",
  },
  ar: {
    // Header
    searchPlaceholder: "ابحث عن المنتجات والعلامات التجارية...",
    search: "بحث",
    orders: "الطلبات",
    saved: "المحفوظات",
    cart: "عربة التسوق",
    freeDelivery: "توصيل مجاني للطلبات التي تزيد عن",
    sellOn: "بيع على لومينا",
    
    // Home
    flashSales: "عروض الفلاش",
    trending: "الرائج الآن",
    recentlyViewed: "شوهدت مؤخراً",
    recommended: "موصى به لك",
    topElectronics: "أفضل الإلكترونيات",
    trendingFashion: "أزياء رائجة",
    viewAll: "عرض الكل",
    filters: "تصفية",
    reset: "إعادة تعيين",
    price: "السعر",
    brand: "العلامة التجارية",
    rating: "التقييم",
    availability: "التوفر",
    includeOutOfStock: "تضمين غير المتوفر",
    sortBy: "ترتيب حسب:",
    featured: "المميزة",
    priceLowHigh: "السعر: من الأقل للأعلى",
    priceHighLow: "السعر: من الأعلى للأقل",
    newest: "الأحدث وصولاً",
    avgReview: "متوسط تقييم العملاء",
    noProducts: "لم يتم العثور على منتجات",
    resetFilters: "إعادة تعيين المرشحات",
    addToCart: "أضف للعربة",
    
    // Product Details
    reviews: "المراجعات",
    description: "الوصف",
    specifications: "المواصفات",
    verifiedFeedback: "آراء موثقة",
    verifiedRatings: "تقييم موثق",
    brandLabel: "العلامة التجارية:",
    similarProducts: "منتجات مشابهة من",
    shippingFrom: "شحن من",
    authentic: "أصلي 100%",
    securePayment: "دفع آمن",
    bestPrice: "أفضل سعر",
    promotions: "العروض",
    callToOrder: "اتصل للطلب",
    freeReturn: "إرجاع مجاني خلال 15 يوم",
    officialStoreItems: "لمنتجات المتجر الرسمي",
    deliveryReturns: "التوصيل والإرجاع",
    doorDelivery: "توصيل للباب",
    codAvailable: "الدفع عند الاستلام متاح",
    returnPolicy: "سياسة الإرجاع",
    sellerInfo: "معلومات البائع",
    customerRating: "تقييم العملاء",
    followers: "المتابعين",
    orderScore: "نقاط الطلب",
    viewProfile: "عرض ملف البائع",
    moreFrom: "المزيد من",
    youMayLike: "قد يعجبك أيضاً",
    askAi: "اسأل الذكاء الاصطناعي",
    
    // Footer
    about: "عن لومينا",
    payment: "الدفع",
    buyingOn: "الشراء على لومينا",
    newsletter: "النشرة البريدية",
    subscribe: "اشترك للحصول على أحدث الرموز الترويجية!",
    enterEmail: "أدخل البريد الإلكتروني",
    male: "ذكر",
    female: "أنثى",
    rights: "متجر لومينا. جميع الحقوق محفوظة.",
    careers: "وظائف",
    privacy: "سياسة الخصوصية",
    terms: "الشروط والأحكام",
    safety: "مركز أمان المشتري",
    faqs: "الأسئلة الشائعة",
    delivery: "التوصيل",
    
    // Cart & Checkout
    shoppingCart: "عربة التسوق",
    cartEmpty: "عربة التسوق فارغة!",
    startShopping: "ابدأ التسوق",
    subtotal: "المجموع الفرعي",
    checkout: "الدفع",
    clearCart: "إفراغ العربة",
    continueShopping: "مواصلة التسوق",
    item: "المنتج",
    quantity: "الكمية",
    unitPrice: "سعر الوحدة",
    shipping: "الشحن",
    total: "الإجمالي",
    remove: "إزالة",
    
    // Badges
    officialStore: "متجر رسمي",
    bestSeller: "الأكثر مبيعاً",
    flashSale: "عرض فلاش",
    topRated: "أعلى تقييم",
    choice: "مختارة",
  }
};

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: 'fa-layer-group' },
  { id: 'phones', name: 'Mobiles', icon: 'fa-mobile-screen-button' },
  { id: 'electronics', name: 'Electronics', icon: 'fa-plug' },
  { id: 'fashion', name: 'Fashion', icon: 'fa-shirt' },
  { id: 'home', name: 'Home', icon: 'fa-couch' },
  { id: 'beauty', name: 'Beauty', icon: 'fa-spray-can-sparkles' },
  { id: 'grocery', name: 'Grocery', icon: 'fa-basket-shopping' },
  { id: 'gaming', name: 'Gaming', icon: 'fa-gamepad' },
  { id: 'baby', name: 'Baby', icon: 'fa-baby' },
  { id: 'sports', name: 'Sports', icon: 'fa-person-running' },
];

const MOCK_REVIEWS: Review[] = [
  { 
    id: 'r1', 
    userName: 'John Doe', 
    rating: 5, 
    comment: 'Excellent product! The battery life is amazing and the camera quality exceeds my expectations. Delivery was super fast too.', 
    date: '2023-10-15',
    verified: true,
    images: ['https://picsum.photos/id/10/200/200', 'https://picsum.photos/id/11/200/200']
  },
  { 
    id: 'r2', 
    userName: 'Sarah Smith', 
    rating: 4, 
    comment: 'Good value for money. The build quality is decent. Packaging could be better though.', 
    date: '2023-10-12',
    verified: true 
  },
  { 
    id: 'r3', 
    userName: 'Mike Johnson', 
    rating: 5, 
    comment: 'Exactly as described. Love it! Will definitely buy from this seller again.', 
    date: '2023-09-28',
    verified: true
  },
  { 
    id: 'r4', 
    userName: 'Emily Blunt', 
    rating: 3, 
    comment: 'It is okay, but I expected a bit more based on the description. Shipping took longer than expected.', 
    date: '2023-09-15',
    verified: false
  },
  { 
    id: 'r5', 
    userName: 'David K.', 
    rating: 5, 
    comment: 'Highly recommended! A+++ service.', 
    date: '2023-08-30',
    verified: true
  }
];

export const SELLERS: Seller[] = [
  {
    id: 's1',
    name: 'Lumina Official Store',
    rating: 4.9,
    followers: 15200,
    logo: 'https://picsum.photos/id/60/100/100',
    banner: 'https://picsum.photos/id/20/1200/300',
    isOfficial: true,
    joinedDate: '2020-01-15',
    description: 'The official destination for top-tier electronics and lifestyle products. 100% Authentic Guaranteed.'
  },
  {
    id: 's2',
    name: 'Fashion Forward',
    rating: 4.6,
    followers: 8500,
    logo: 'https://picsum.photos/id/64/100/100',
    banner: 'https://picsum.photos/id/445/1200/300',
    isOfficial: false,
    joinedDate: '2021-03-10',
    description: 'Trending styles for men and women. Fresh collections every week.'
  },
  {
    id: 's3',
    name: 'Tech Haven',
    rating: 4.7,
    followers: 5300,
    logo: 'https://picsum.photos/id/96/100/100',
    banner: 'https://picsum.photos/id/1/1200/300',
    isOfficial: false,
    joinedDate: '2021-06-20',
    description: 'Your premium source for gadgets, computers, and gaming gear.'
  },
  {
    id: 's4',
    name: 'Home & Beyond',
    rating: 4.5,
    followers: 2100,
    logo: 'https://picsum.photos/id/75/100/100',
    banner: 'https://picsum.photos/id/184/1200/300',
    isOfficial: false,
    joinedDate: '2022-01-05',
    description: 'Making your home beautiful and functional with quality essentials.'
  }
];

// Helper to assign specific sellers to products based on category/brand
const getSellerForProduct = (id: number, category: string, brand: string): Seller => {
  // Official store items
  if (['Apple', 'Samsung', 'Sony', 'Infinix'].includes(brand)) return SELLERS[0];
  if (category === 'fashion') return SELLERS[1];
  if (category === 'computing' || category === 'gaming' || category === 'phones') return SELLERS[2];
  return SELLERS[3]; // Home, Beauty, Grocery etc.
};

const BASE_PRODUCTS = [
  // Phones
  {
    id: 1,
    title: "Infinix Hot 30i - 6.6\" HD+ 128GB",
    price: 120.50,
    oldPrice: 150.00,
    rating: 4.5,
    reviews: 128,
    image: "https://picsum.photos/id/1/400/400",
    category: "phones",
    description: "Experience the power of speed with the new Infinix Hot 30i. Featuring a massive 5000mAh battery and 90Hz fluid screen.",
    badges: ["Official Store", "Free Delivery"],
    brand: "Infinix",
    inStock: true,
    createdAt: "2023-01-15"
  },
  {
    id: 4,
    title: "Samsung Galaxy A54 5G",
    price: 399.00,
    rating: 4.7,
    reviews: 340,
    image: "https://picsum.photos/id/5/400/400",
    category: "phones",
    description: "Capture awesome moments with the multi-lens camera system.",
    badges: ["Official Store"],
    brand: "Samsung",
    inStock: true,
    createdAt: "2023-03-10"
  },
  {
    id: 10,
    title: "Apple iPhone 14 Pro Max",
    price: 1099.00,
    oldPrice: 1199.00,
    rating: 4.9,
    reviews: 1200,
    image: "https://picsum.photos/id/100/400/400",
    category: "phones",
    description: "Dynamic Island, a magical new way to interact with iPhone. 48MP Main camera.",
    badges: ["Best Seller"],
    brand: "Apple",
    inStock: true,
    createdAt: "2022-09-20"
  },
  {
    id: 11,
    title: "Xiaomi Redmi Note 12",
    price: 180.00,
    rating: 4.4,
    reviews: 89,
    image: "https://picsum.photos/id/101/400/400",
    category: "phones",
    description: "120Hz AMOLED display. 33W fast charging.",
    brand: "Xiaomi",
    inStock: true,
    createdAt: "2023-04-05"
  },

  // Electronics
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Headphones",
    price: 348.00,
    oldPrice: 399.99,
    rating: 4.9,
    reviews: 856,
    image: "https://picsum.photos/id/3/400/400",
    category: "electronics",
    description: "Industry-leading noise canceling with two processors controlling 8 microphones.",
    badges: ["Best Seller"],
    brand: "Sony",
    inStock: true,
    createdAt: "2023-02-01"
  },
  {
    id: 7,
    title: "4K LED Smart TV 55 Inch",
    price: 450.00,
    oldPrice: 550.00,
    rating: 4.4,
    reviews: 112,
    image: "https://picsum.photos/id/8/400/400",
    category: "electronics",
    description: "Ultra HD viewing experience with smart connectivity apps built-in.",
    badges: ["Flash Sale"],
    brand: "Generic",
    inStock: true,
    createdAt: "2023-05-12"
  },
  {
    id: 12,
    title: "JBL Flip 6 Bluetooth Speaker",
    price: 99.99,
    oldPrice: 129.99,
    rating: 4.6,
    reviews: 450,
    image: "https://picsum.photos/id/146/400/400",
    category: "electronics",
    description: "Bold sound for every adventure. IP67 waterproof and dustproof.",
    brand: "JBL",
    inStock: true,
    createdAt: "2023-06-01"
  },
  {
    id: 13,
    title: "Canon EOS R50 Mirrorless Camera",
    price: 679.00,
    rating: 4.8,
    reviews: 56,
    image: "https://picsum.photos/id/250/400/400",
    category: "electronics",
    description: "Compact, lightweight, and perfect for creators.",
    brand: "Canon",
    inStock: false,
    createdAt: "2023-07-20"
  },

  // Fashion
  {
    id: 3,
    title: "Men's Casual Slim Fit T-Shirt",
    price: 15.99,
    oldPrice: 25.00,
    rating: 4.1,
    reviews: 45,
    image: "https://picsum.photos/id/4/400/400",
    category: "fashion",
    description: "Comfortable, breathable cotton blend fabric perfect for everyday wear.",
    brand: "Generic",
    inStock: true,
    createdAt: "2023-08-01"
  },
  {
    id: 8,
    title: "Nike Air Max Sneakers",
    price: 120.00,
    rating: 4.8,
    reviews: 1500,
    image: "https://picsum.photos/id/103/400/400",
    category: "fashion",
    description: "The classic look you love with a comfortable modern feel.",
    brand: "Nike",
    inStock: true,
    createdAt: "2023-01-10"
  },
  {
    id: 14,
    title: "Women's Floral Summer Dress",
    price: 35.50,
    oldPrice: 50.00,
    rating: 4.3,
    reviews: 210,
    image: "https://picsum.photos/id/104/400/400",
    category: "fashion",
    description: "Lightweight and airy, perfect for hot summer days.",
    brand: "Generic",
    inStock: true,
    createdAt: "2023-05-20"
  },
  {
    id: 15,
    title: "Classic Leather Wallet",
    price: 29.99,
    rating: 4.5,
    reviews: 88,
    image: "https://picsum.photos/id/106/400/400",
    category: "fashion",
    description: "Genuine leather bifold wallet with RFID protection.",
    brand: "Generic",
    inStock: true,
    createdAt: "2022-11-15"
  },

  // Computing
  {
    id: 5,
    title: "HP Pavilion 15 Laptop",
    price: 650.00,
    oldPrice: 750.00,
    rating: 4.3,
    reviews: 89,
    image: "https://picsum.photos/id/6/400/400",
    category: "computing",
    description: "Compact PC that lets you get more done on the go.",
    brand: "HP",
    inStock: true,
    createdAt: "2022-12-05"
  },
  {
    id: 16,
    title: "Logitech MX Master 3S Mouse",
    price: 99.00,
    rating: 4.9,
    reviews: 300,
    image: "https://picsum.photos/id/107/400/400",
    category: "computing",
    description: "An icon remastered. Feel the performance.",
    badges: ["Choice"],
    brand: "Logitech",
    inStock: true,
    createdAt: "2023-04-15"
  },
  {
    id: 17,
    title: "MacBook Air M2",
    price: 1099.00,
    oldPrice: 1199.00,
    rating: 4.8,
    reviews: 500,
    image: "https://picsum.photos/id/119/400/400",
    category: "computing",
    description: "Don't take it lightly. Supercharged by M2.",
    badges: ["Official Store"],
    brand: "Apple",
    inStock: false,
    createdAt: "2023-01-25"
  },

  // Home
  {
    id: 6,
    title: "Modern Coffee Table",
    price: 89.99,
    oldPrice: 120.00,
    rating: 4.6,
    reviews: 22,
    image: "https://picsum.photos/id/7/400/400",
    category: "home",
    description: "Minimalist design that fits perfectly in any modern living room.",
    brand: "Generic",
    inStock: true,
    createdAt: "2023-03-15"
  },
  {
    id: 18,
    title: "Non-Stick Cookware Set (7 Pcs)",
    price: 65.00,
    oldPrice: 89.99,
    rating: 4.4,
    reviews: 156,
    image: "https://picsum.photos/id/108/400/400",
    category: "home",
    description: "Healthy cooking with less oil. Easy to clean.",
    brand: "Generic",
    inStock: true,
    createdAt: "2023-02-28"
  },
  {
    id: 19,
    title: "Egyptian Cotton Bed Sheets",
    price: 45.00,
    rating: 4.7,
    reviews: 89,
    image: "https://picsum.photos/id/109/400/400",
    category: "home",
    description: "Experience the luxury of 5-star hotel bedding at home.",
    brand: "Generic",
    inStock: true,
    createdAt: "2023-06-10"
  },

  // Beauty
  {
    id: 20,
    title: "Cerave Moisturizing Cream",
    price: 18.50,
    rating: 4.8,
    reviews: 2000,
    image: "https://picsum.photos/id/110/400/400",
    category: "beauty",
    description: "Barrier-restoring moisturizing cream for dry to very dry skin.",
    badges: ["Best Seller"],
    brand: "Cerave",
    inStock: true,
    createdAt: "2023-01-05"
  },
  {
    id: 21,
    title: "Maybelline Mascara",
    price: 11.99,
    rating: 4.3,
    reviews: 400,
    image: "https://picsum.photos/id/111/400/400",
    category: "beauty",
    description: "Volume and length without clumps.",
    brand: "Maybelline",
    inStock: true,
    createdAt: "2023-04-20"
  },
  
  // Grocery
  {
    id: 22,
    title: "Basmati Rice 5kg",
    price: 12.00,
    oldPrice: 15.00,
    rating: 4.5,
    reviews: 67,
    image: "https://picsum.photos/id/112/400/400",
    category: "grocery",
    description: "Premium long grain aromatic rice.",
    brand: "Generic",
    inStock: true,
    createdAt: "2023-07-01"
  },
  {
    id: 23,
    title: "Organic Olive Oil 1L",
    price: 14.50,
    rating: 4.7,
    reviews: 45,
    image: "https://picsum.photos/id/113/400/400",
    category: "grocery",
    description: "Cold pressed virgin olive oil.",
    brand: "Generic",
    inStock: true,
    createdAt: "2023-05-05"
  },

  // Gaming
  {
    id: 24,
    title: "PlayStation 5 Console",
    price: 499.00,
    rating: 4.9,
    reviews: 5000,
    image: "https://picsum.photos/id/114/400/400",
    category: "gaming",
    description: "Play Has No Limits. Lightning fast loading.",
    badges: ["Top Rated"],
    brand: "Sony",
    inStock: true,
    createdAt: "2022-11-20"
  },
  {
    id: 25,
    title: "Xbox Wireless Controller",
    price: 59.99,
    rating: 4.6,
    reviews: 800,
    image: "https://picsum.photos/id/115/400/400",
    category: "gaming",
    description: "Textured triggers and bumpers. Hybrid D-pad.",
    brand: "Microsoft",
    inStock: true,
    createdAt: "2023-02-15"
  },

  // Sports
  {
    id: 26,
    title: "Yoga Mat Non-Slip",
    price: 22.00,
    oldPrice: 30.00,
    rating: 4.4,
    reviews: 120,
    image: "https://picsum.photos/id/116/400/400",
    category: "sports",
    description: "Eco-friendly material with excellent grip.",
    brand: "Generic",
    inStock: true,
    createdAt: "2023-06-25"
  },
  {
    id: 27,
    title: "Adjustable Dumbbells Set",
    price: 85.00,
    rating: 4.5,
    reviews: 56,
    image: "https://picsum.photos/id/117/400/400",
    category: "sports",
    description: "Save space with these adjustable weight dumbbells.",
    brand: "Generic",
    inStock: true,
    createdAt: "2023-03-30"
  }
];

// Helper to enhance existing products with new fields
const enhanceProducts = (products: any[]): Product[] => {
  return products.map(p => ({
    ...p,
    images: [p.image, `https://picsum.photos/id/${p.id + 10}/400/400`, `https://picsum.photos/id/${p.id + 20}/400/400`, `https://picsum.photos/id/${p.id + 30}/400/400`],
    seller: getSellerForProduct(p.id, p.category, p.brand),
    reviewsList: MOCK_REVIEWS,
  }));
};

export const PRODUCTS = enhanceProducts(BASE_PRODUCTS);