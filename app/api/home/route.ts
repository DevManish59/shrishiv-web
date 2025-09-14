import { NextResponse } from 'next/server';
import { UnifiedPageData } from '@/lib/types';

// Force dynamic rendering - disable static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Mock home page data - replace with your actual database query
const mockHomeData: UnifiedPageData = {
  items: [
    // First item is used for banner (has buttonText, slug, no href/size/category)
    {
      id: "main-banner",
      title: "Exclusive Sale",
      subtitle: "Up to 70% off on selected items. Don't miss out!",
      description: "Discover our premium collection of jewelry with lab-grown diamonds",
      image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop",
      buttonText: "Shop Sale",
      slug: "sale"
    },
    // Remaining items are used for grid (have href, size, category)
    {
      id: "shirts",
      title: "SHIRTS",
      subtitle: "New Collection",
      image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
      href: "/men/shirts",
      size: "half",
      category: "men",
      priority: true
    },
    {
      id: "trousers",
      title: "TROUSERS",
      subtitle: "Spring/Summer 2024",
      image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
      href: "/men/trousers",
      size: "half",
      category: "men"
    },
    {
      id: "dresses",
      title: "DRESSES",
      subtitle: "Elegant Collection",
      image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
      href: "/women/dresses",
      size: "half",
      category: "women",
      priority: true
    },
    {
      id: "kids",
      title: "KIDS",
      subtitle: "New Collection",
      image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
      href: "/kids/shirts",
      size: "half",
      category: "kids"
    },
    {
      id: "trousers-kids",
      title: "TROUSERS",
      subtitle: "Spring/Summer 2024",
      image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
      href: "/kids/trousers",
      size: "half",
      category: "kids"
    },
    {
      id: "dresses-kids",
      title: "DRESSES",
      subtitle: "Elegant Collection",
      image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
      href: "/kids/dresses",
      size: "half",
      category: "kids"
    },
    // Jewelry category links
    {
      id: "rings-collection",
      title: "RINGS",
      subtitle: "Premium Jewelry Collection",
      image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
      href: "/rings/ring",
      size: "half",
      category: "rings",
      priority: true
    },
    {
      id: "necklaces-collection",
      title: "NECKLACES",
      subtitle: "Elegant Designs",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
      href: "/necklaces/necklace",
      size: "half",
      category: "necklaces"
    },
    {
      id: "earrings-collection",
      title: "EARRINGS",
      subtitle: "Beautiful Accessories",
      image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
      href: "/earrings/earring",
      size: "half",
      category: "earrings"
    }
  ]
};

export async function GET() {
  try {
    // Check if external API is configured
    const externalApiUrl = process.env.EXTERNAL_API_URL;
    if (!externalApiUrl) {
      console.warn("⚠️ EXTERNAL_API_URL not set, using mock data");
      return NextResponse.json(mockHomeData);
    }

    const url = `${externalApiUrl}/product-category/featured`;
    console.log("🚀 Home API: Calling external API:", url);
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`External API failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Home API: External API response received");
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Home API: Error fetching external data:', error);
    
    // Return mock data as fallback
    console.log("🔄 Home API: Using mock data as fallback");
    return NextResponse.json(mockHomeData);
  }
}