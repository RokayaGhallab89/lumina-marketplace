export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  images?: string[];
}

export interface Seller {
  id: string;
  name: string;
  rating: number;
  followers: number;
  logo: string;
  banner: string;
  isOfficial: boolean;
  joinedDate: string;
  description: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  badges?: string[];
  brand: string;
  inStock: boolean;
  createdAt: string; // ISO date string
  seller: Seller;
  reviewsList: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  customerName?: string; // For Admin view
  shippingAddress?: string; // For Admin view
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isProductRecommendation?: boolean;
  recommendedProductIds?: number[];
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
}