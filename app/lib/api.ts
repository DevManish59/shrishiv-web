import { ApiProduct, HomePageData } from './types';

/**
 * Fetch product data from API (for client-side use only)
 */
export async function fetchProduct(id: string): Promise<ApiProduct> {
  try {
    const response = await fetch(`/api/products/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

/**
 * Fetch all products from API (for client-side use only)
 */
export async function fetchProducts(): Promise<ApiProduct[]> {
  try {
    const response = await fetch('/api/products');

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch home page data from API
 */
export async function fetchHomePageData(): Promise<HomePageData> {
  try {
    // Replace this with your actual API endpoint
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/home`);

    if (!response.ok) {
      throw new Error(`Failed to fetch home page data: ${response.statusText}`);
    }

    const homeData = await response.json();
    return homeData;
  } catch (error) {
    console.error('Error fetching home page data:', error);
    throw error;
  }
} 