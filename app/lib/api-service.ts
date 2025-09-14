// Unified API Service - Two clear paths: Client and Server

interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  retries?: number;
  cacheDuration?: number;
  apiKey?: string;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
  cached?: boolean;
}

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  cache?: boolean;
  timeout?: number;
  retries?: number;
}

class ApiService {
  private config: ApiConfig;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private isServer: boolean;

  constructor(config: ApiConfig) {
    this.config = {
      timeout: 10000,
      retries: 2,
      cacheDuration: 300000, // 5 minutes
      ...config,
    };
    this.isServer = typeof window === 'undefined';
  }

  async fetch<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      cache = true,
      timeout = this.config.timeout,
      retries = this.config.retries,
    } = options;

    const url = `${this.config.baseUrl}${endpoint}`;
    const cacheKey = `${method}-${url}-${JSON.stringify(body || {})}`;

    // Check cache for GET requests
    if (method === 'GET' && cache) {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return {
          data: cached,
          error: null,
          status: 200,
          cached: true,
        };
      }
    }

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
        ...headers,
      },
      signal: AbortSignal.timeout(timeout || 10000),
      ...(body && { body: JSON.stringify(body) }),
    };

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= (retries || 3); attempt++) {
      try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Cache successful GET responses
        if (method === 'GET' && cache) {
          this.setCache(cacheKey, data);
        }

        return {
          data,
          error: null,
          status: response.status,
        };
      } catch (error) {
        lastError = error as Error;

        // Don't retry on client errors (4xx)
        if (error instanceof Error && error.message.includes('HTTP 4')) {
          break;
        }

        // Wait before retry (exponential backoff)
        if (attempt < (retries || 3)) {
          await new Promise(resolve => 
            setTimeout(resolve, Math.pow(2, attempt) * 1000)
          );
        }
      }
    }

    return {
      data: null,
      error: lastError?.message || 'Unknown error',
      status: 500,
    };
  }

  async get<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body: any, options?: Omit<ApiRequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T>(endpoint: string, body: any, options?: Omit<ApiRequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async delete<T>(endpoint: string, options?: Omit<ApiRequestOptions, 'method'>): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, { ...options, method: 'DELETE' });
  }

  private getFromCache(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.config.cacheDuration!) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clearCache(): void {
    this.cache.clear();
  }

  isServerSide(): boolean {
    return this.isServer;
  }
}

// ===== TWO CLEAR SERVICE INSTANCES =====

// 1. CLIENT API SERVICE (for client-side calls - public APIs only)
export const clientApiService = new ApiService({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.public-service.com',
  timeout: 10000,
  retries: 2,
  cacheDuration: 300000, // 5 minutes
});

// 2. SERVER API SERVICE (for server-side calls with API keys)
export const serverApiService = new ApiService({
  baseUrl: process.env.EXTERNAL_API_URL || 'https://api.example.com/v1',
  timeout: 15000,
  retries: 3,
  cacheDuration: 3600000, // 1 hour
  apiKey: process.env.EXTERNAL_API_KEY,
});

// ===== UNIFIED API SERVICE (Auto-routing) =====

export class UnifiedApiService {
  private static instance: UnifiedApiService;

  static getInstance(): UnifiedApiService {
    if (!UnifiedApiService.instance) {
      UnifiedApiService.instance = new UnifiedApiService();
    }
    return UnifiedApiService.instance;
  }

  /**
   * Smart API call that automatically routes to the right service
   */
  async call<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const isServer = typeof window === 'undefined';

    // Server-side: Use server API service (with API keys)
    if (isServer) {
      return serverApiService.fetch<T>(endpoint, options);
    }

    // Client-side: Use client API service (public APIs only)
    return clientApiService.fetch<T>(endpoint, options);
  }

  // Convenience methods
  async get<T>(endpoint: string, options?: any): Promise<ApiResponse<T>> {
    return this.call<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, body: any, options?: any): Promise<ApiResponse<T>> {
    return this.call<T>(endpoint, { ...options, method: 'POST', body });
  }

  async put<T>(endpoint: string, body: any, options?: any): Promise<ApiResponse<T>> {
    return this.call<T>(endpoint, { ...options, method: 'PUT', body });
  }

  async delete<T>(endpoint: string, options?: any): Promise<ApiResponse<T>> {
    return this.call<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

// Export the singleton instance
export const apiService = UnifiedApiService.getInstance();

// ===== CATEGORY-SPECIFIC API FUNCTIONS =====

/**
 * Fetch products by category and subcategory from external API
 */
export async function fetchProductsByCategory(category: string, subcategory: string): Promise<ApiResponse<any>> {
  try {
    const response = await serverApiService.get(`/by-category?slug=${category}/${subcategory}`);
    return response;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return {
      data: null,
      error: 'Failed to fetch products by category',
      status: 500,
    };
  }
}

/**
 * Fetch category information from external API
 */
export async function fetchCategoryInfo(categoryId: string): Promise<ApiResponse<any>> {
  try {
    const response = await serverApiService.get(`/category/${categoryId}`);
    return response;
  } catch (error) {
    console.error('Error fetching category info:', error);
    return {
      data: null,
      error: 'Failed to fetch category info',
      status: 500,
    };
  }
}

/**
 * Fetch product by slug from external API
 */
export async function fetchProductBySlug(slug: string): Promise<ApiResponse<any>> {
  try {
    const response = await serverApiService.get(`/product/by-slug/${slug}`);
    return response;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return {
      data: null,
      error: 'Failed to fetch product by slug',
      status: 500,
    };
  }
} 