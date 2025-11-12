// // Specific API functions for common use cases
// // These functions use the unified API service for optimal routing

// import {  clientApiService, serverApiService } from './api-service';

// // ===== PUBLIC APIs (Client-side safe) =====

// export async function fetchWeatherData(city: string) {
//   return clientApiService.get(`/weather/${city}`);
// }

// export async function fetchCurrencyRates() {
//   return clientApiService.get('/currency/rates');
// }

// export async function fetchNewsData(category: string) {
//   return clientApiService.get(`/news/${category}`);
// }

// export async function fetchPublicProductData(productId: string) {
//   return clientApiService.get(`/products/${productId}/public`);
// }

// // ===== SERVER APIs (Server-side only - includes protected data) =====

// export async function fetchHeaderData() {
//   return serverApiService.get('/header-data');
// }

// export async function fetchProductData(productSlug: string) {
//   // For category/subcategory requests (contains '/'), use local API
//   if (productSlug.includes('/')) {
//     const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//     try {
//       const response = await fetch(`${baseUrl}/api/products/by-category/${productSlug}`);
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
//       const data = await response.json();
//       return {
//         data,
//         error: null,
//         status: response.status,
//       };
//     } catch (error) {
//       return {
//         data: null,
//         error: (error as Error).message,
//         status: 500,
//       };
//     }
//   }
//   // For individual product requests, use external API
//   return serverApiService.get(`/products/${productSlug}`);
// }

// export async function fetchCategoryData(categorySlug: string) {
//   // Use local API for category data
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
//   try {
//     const response = await fetch(`${baseUrl}/api/categories/${categorySlug}`);
//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//     }
//     const data = await response.json();
//     return {
//       data,
//       error: null,
//       status: response.status,
//     };
//   } catch (error) {
//     return {
//       data: null,
//       error: (error as Error).message,
//       status: 500,
//     };
//   }
// }

// export async function fetchInventoryData() {
//   return serverApiService.get('/inventory');
// }

// export async function updateInventoryData(inventoryData: any) {
//   return serverApiService.post('/inventory', inventoryData);
// }

// // ===== USER & PROTECTED APIs (Server-side only) =====

// export async function fetchUserProfile(userId: string) {
//   return serverApiService.get(`users/${userId}/profile`);
// }

// export async function updateUserProfile(userId: string, profileData: any) {
//   return serverApiService.post(`users/${userId}/profile`, profileData);
// }

// export async function fetchUserOrders(userId: string) {
//   return serverApiService.get(`users/${userId}/orders`);
// }

// export async function submitPaymentData(paymentData: any) {
//   return serverApiService.post('payments', paymentData);
// }

// export async function fetchAnalyticsData(dateRange: string) {
//   return serverApiService.get(`analytics?range=${dateRange}`);
// }

// export async function submitReviewData(reviewData: any) {
//   return serverApiService.post('reviews', reviewData);
// }

// // ===== SMART APIs (Auto-routing) =====

// export async function fetchProductDetails(productId: string, isPublic = false) {
//   if (isPublic) {
//     return clientApiService.get(`/products/${productId}/public`);
//   }
//   return serverApiService.get(`/products/${productId}`);
// }

// export async function fetchUserData(userId: string, includePrivate = false) {
//   if (includePrivate) {
//     return serverApiService.get(`users/${userId}`);
//   }
//   return clientApiService.get(`/users/${userId}/public`);
// }

// // ===== E-COMMERCE SPECIFIC =====

// export async function fetchCartData(userId?: string) {
//   if (userId) {
//     return serverApiService.get(`users/${userId}/cart`);
//   }
//   return serverApiService.get('/cart');
// }

// export async function updateCartData(cartData: any, userId?: string) {
//   if (userId) {
//     return serverApiService.post(`users/${userId}/cart`, cartData);
//   }
//   return serverApiService.post('/cart', cartData);
// }

// export async function fetchOrderHistory(userId: string) {
//   return serverApiService.get(`users/${userId}/orders`);
// }

// export async function createOrder(orderData: any) {
//   return serverApiService.post('orders', orderData);
// }

// export async function fetchWishlist(userId: string) {
//   return serverApiService.get(`users/${userId}/wishlist`);
// }

// export async function addToWishlist(userId: string, productId: string) {
//   return serverApiService.post(`users/${userId}/wishlist`, { productId });
// }

// // ===== SEARCH & FILTERS =====

// export async function searchProducts(query: string, filters?: any) {
//   const params = new URLSearchParams({ q: query, ...filters });
//   return serverApiService.get(`/search/products?${params}`);
// }

// export async function fetchProductFilters(categoryId?: string) {
//   const endpoint = categoryId ? `/filters/${categoryId}` : '/filters';
//   return serverApiService.get(endpoint);
// }

// // ===== NOTIFICATIONS & COMMUNICATIONS =====

// export async function sendNotification(notificationData: any) {
//   return serverApiService.post('notifications', notificationData);
// }

// export async function fetchNotifications(userId: string) {
//   return serverApiService.get(`users/${userId}/notifications`);
// }

// export async function markNotificationRead(userId: string, notificationId: string) {
//   return serverApiService.put(`users/${userId}/notifications/${notificationId}`,
//     { read: true });
// }

// // ===== UTILITY FUNCTIONS =====

// export async function validateCoupon(couponCode: string) {
//   return clientApiService.get(`/coupons/validate/${couponCode}`);
// }

// export async function calculateShipping(zipCode: string, items: any[]) {
//   return clientApiService.post('/shipping/calculate', { zipCode, items });
// }

// export async function trackOrder(orderId: string) {
//   return clientApiService.get(`/orders/${orderId}/track`);
// }

// export async function fetchFeaturedCategories() {
//   return serverApiService.get('/featured-categories');
// }

// // ===== ERROR HANDLING UTILITIES =====

// export function handleApiError(error: any, fallbackData?: any) {
//   console.error('API Error:', error);

//   if (fallbackData) {
//     return {
//       data: fallbackData,
//       error: null,
//       status: 200,
//       cached: true,
//     };
//   }

//   return {
//     data: null,
//     error: error?.message || 'Unknown error occurred',
//     status: 500,
//   };
// }

// export function isApiError(response: any): boolean {
//   return response?.error !== null && response?.error !== undefined;
// }

// export function getApiErrorMessage(response: any): string {
//   return response?.error || 'An unexpected error occurred';
// }
