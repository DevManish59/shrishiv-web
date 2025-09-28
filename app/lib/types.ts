export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  sku: string;
  stock: number;
  rating: number;
  images: string[];
  categoryIds: string[];
  tags: string[];
  featured: boolean;
  status: "active" | "inactive" | "draft";
  seoTitle?: string;
  seoDescription?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  couponCode?: string;
  couponDiscount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  couponDiscount: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: "paypal" | "card";
  paymentId?: string;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  expiresAt?: Date;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface Wishlist {
  id: string;
  userId: string;
  productIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  author: string;
  date: string;
  media?: string[];
  youtubeUrl?: string;
  isVerified?: boolean;
  helpfulCount?: number;
  storeResponse?: {
    response: string;
    date: string;
  };
}

export interface ReviewSummary {
  totalRating: number;
  ratingDistribution: {
    [key: number]: number;
  };
}

// Unified API Types - Used for both home page and subcategory pages
export interface UnifiedItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  // For header/category items (like banner)
  href?: string; // For grid items
  buttonText?: string; // For banner/header items
  slug?: string; // For banner/header items
  size?: "half" | "full"; // For grid items
  category?: string; // For grid items
  priority?: boolean; // For grid items
  // For product items
  price?: number; // For product items
  originalPrice?: number; // For product items
  rating?: number; // For product items
  reviewCount?: number; // For product items
  isNew?: boolean; // For product items
  colors?: string[]; // For product items
  sizes?: string[]; // For product items
  imageUrls?: string[]; // For product items
  name?: string; // For product items
  shortDescription?: string; // For product items
  // Removed CSS-related properties - will be managed on frontend
}

export interface UnifiedPageData {
  items: UnifiedItem[]; // Array where first item is header/category, rest are content items
}

// Alias HomePageData to UnifiedPageData for consistency
export type HomePageData = UnifiedPageData;

// API Response Types
export interface AttributeValue {
  id: number;
  attributeId: number;
  parentAttributeId: number | null;
  attributeName: string | null;
  price: number;
  isDefault: boolean;
  images: string[] | null;
  imageFiles: string[];
}

export interface ApiProduct {
  id: number;
  productName: string;
  shortDescription: string;
  pointOne: string | null;
  pointTwo: string | null;
  pointThree: string | null;
  pointFour: string | null;
  pointFive: string | null;
  url: string | null;
  stock: number | null;
  shipDay: number | null;
  sku: string | null;
  hsnCode: string | null;
  ageGroup: string | null;
  gender: string | null;
  googleProductCategory: string | null;
  mrpPrice: number | null;
  discount: number | null;
  salesPrice: number | null;
  isFeatured: boolean | null;
  images: string[] | null;
  imageFiles: string[];
  attributeValues: AttributeValue[];
  createdAt: string;
  updatedAt: string;
}

// Transformed Product Type for UI
export interface TransformedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number; // Made required
  sku: string;
  description: string;
  shortDescription: string;
  stock: number;
  images: string[];
  attributeValues: AttributeValue[];
  rating: number;
  reviewCount: number;
  is3DViewEnabled: boolean;
  // Additional fields for compatibility
  metalTypes: Array<{
    key: string;
    name: string;
    value: string;
    color: string;
    textColor: string;
    price: number; // Added price field for dynamic pricing
  }>;
  diamondSizes: Array<{
    size: string;
    available: boolean;
    price: number; // Added price field for dynamic pricing
  }>;
  ringSizes: Array<{
    size: string;
    available: boolean;
  }>;
}

// Types for new API response format
export interface HelpItem {
  id: number;
  displayOrder: number;
  question: string;
  answer: string;
  deleted: boolean;
  published: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  categoryId: number | null;
}

export interface HelpCategory {
  id: number;
  name: string;
  deleted: boolean;
  published: boolean;
  displayOrder: number;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  helpItems: HelpItem[];
}

export interface DynamicPageItem {
  id: number;
  name: string;
  title: string;
  description: string;
  longDesc: any;
  pageUrl: string;
  displayOrder: number;
  images: string | null; // depends on your API, could also be File[] if uploading
  imageUrls: string[];
  deleted: boolean | null;
  createdAt: string | null; // if backend sends ISO date strings
  updatedAt: string | null;
}

export interface StoreSocial {
  socialTwitter: string;
  socialInstagram: string;
  socialPinterest: string;
  socialFacebook: string;
  socialYoutube: string;
  socialTumblr: string;
  socialLinkedin: string;
  socialTelegram: string;
  socialSkype: string;
  socialSnapchat: string;
  socialTiktok: string;
}
