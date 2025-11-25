import { MetadataRoute } from "next";

// API Configuration
const API_CONFIG = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-api-domain.com/api",
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
};

// Fetch products from your API
async function fetchProductsFromAPI() {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/products?limit=1000`, {
      headers: {
        Authorization: `Bearer ${API_CONFIG.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data.products || [];
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
    return [];
  }
}

// Fetch categories from your API
async function fetchCategoriesFromAPI() {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/categories`, {
      headers: {
        Authorization: `Bearer ${API_CONFIG.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data || data.categories || [];
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    // Fetch data dynamically from your API
    const [products, categories] = await Promise.all([
      fetchProductsFromAPI(),
      fetchCategoriesFromAPI(),
    ]);

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/shop`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/collections`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/reviews`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
    ];

    // Product pages from API
    const productPages = products.map(
      (product: {
        id: string;
        slug: string;
        updatedAt?: string;
        updated_at?: string;
      }) => ({
        url: `${baseUrl}/product/${product.id}-${product.slug}`,
        lastModified: new Date(
          product.updatedAt || product.updated_at || Date.now()
        ),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })
    );

    // Category pages from API
    const categoryPages = categories.map(
      (category: {
        slug: string;
        updatedAt?: string;
        updated_at?: string;
      }) => ({
        url: `${baseUrl}/collections/${category.slug}`,
        lastModified: new Date(
          category.updatedAt || category.updated_at || Date.now()
        ),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })
    );

    return [...staticPages, ...productPages, ...categoryPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Fallback to static pages only if API fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
      },
    ];
  }
}
