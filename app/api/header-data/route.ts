import { NextResponse } from "next/server";

// Types for new API response format
interface SubCategory {
  id: number;
  name: string;
  slug: string;
}

interface Category {
  label: string;
  slug: string;
}

interface MenuItem {
  label: string;
  href: string;
  className?: string;
}

interface ParentCategory {
  id: number;
  name: string;
  slug: string;
  subCategories: SubCategory[];
}

type NewApiResponse = ParentCategory[];

interface FeaturedItem {
  label: string;
  href: string;
  className?: string;
}

interface MenuSection {
  categories: { label: string; slug: string }[];
  featured: FeaturedItem[];
}

interface DynamicCategory {
  id: number;
  name: string;
  slug: string;
  categories: Category[];
  featured: MenuItem[];
}

// Removed unused MenuData interface

interface OldApiResponse {
  women?: MenuSection;
  men?: MenuSection;
  kids?: MenuSection;
}

// Cache duration in seconds
const CACHE_DURATION = 3600; // 1 hour

export async function GET() {
  try {
    // Check if we have cached data
    const cachedData = await getCachedHeaderData();
    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        },
      });
    }

    // Fetch from external API
    const externalApiUrl =
      process.env.EXTERNAL_API_URL || "https://api.shrishiv.com";

    const url = `${externalApiUrl}/product-category/headers`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add timeout
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();

    // Check if we have valid data, otherwise use fallback
    if (!Array.isArray(data) || data.length === 0) {
      console.log(
        "External API returned empty or invalid data, using fallback"
      );
      return NextResponse.json(getFallbackData(), {
        headers: {
          "Cache-Control": "public, s-maxage=300", // 5 minutes for fallback
        },
      });
    }

    // Transform external data to our format
    const transformedData = transformExternalData(data);

    // Cache the data
    await cacheHeaderData();

    return NextResponse.json(transformedData, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error("Header data fetch error:", error);

    // Return fallback data
    return NextResponse.json(getFallbackData(), {
      status: 200, // Still return 200 to avoid client errors
      headers: {
        "Cache-Control": "public, s-maxage=300", // 5 minutes for fallback
      },
    });
  }
}

// Cache functions (you can use Redis, database, or file system)
async function getCachedHeaderData() {
  // Implement your caching logic here
  // Example with Redis:
  // return await redis.get('header-data');
  return null;
}

async function cacheHeaderData() {
  // Implement your caching logic here
  // Example with Redis:
  // await redis.setex('header-data', CACHE_DURATION, JSON.stringify(data));
}

function transformExternalData(externalData: NewApiResponse | OldApiResponse) {
  // Transform external API response to dynamic format
  const dynamicCategories: DynamicCategory[] = [];

  // Handle array format from new API
  if (Array.isArray(externalData)) {
    externalData.forEach((parentCategory: ParentCategory) => {
      const dynamicCategory: DynamicCategory = {
        id: parentCategory.id,
        name: parentCategory.name || "Unknown",
        slug:
          parentCategory.slug ||
          parentCategory.name?.toLowerCase().replace(/\s+/g, "-") ||
          "unknown",
        categories:
          parentCategory.subCategories?.map((sub: SubCategory) => ({
            label: sub.name,
            slug: sub.slug,
          })) || [],
        featured: [], // You can populate this from API or leave empty for now
      };
      dynamicCategories.push(dynamicCategory);
    });
  } else {
    // Fallback to old format if API still returns old structure
    // Convert old format to dynamic format
    if (externalData.women?.categories?.length) {
      dynamicCategories.push({
        id: 1,
        name: "Women",
        slug: "women",
        categories: externalData.women.categories,
        featured: externalData.women.featured || [],
      });
    }
    if (externalData.men?.categories?.length) {
      dynamicCategories.push({
        id: 2,
        name: "Men",
        slug: "men",
        categories: externalData.men.categories,
        featured: externalData.men.featured || [],
      });
    }
    if (externalData.kids?.categories?.length) {
      dynamicCategories.push({
        id: 3,
        name: "Kids",
        slug: "kids",
        categories: externalData.kids.categories,
        featured: externalData.kids.featured || [],
      });
    }
  }

  return { categories: dynamicCategories };
}

function getFallbackData() {
  return {
    categories: [
      {
        id: 1,
        name: "Rings",
        slug: "rings",
        categories: [
          { label: "Ring", slug: "ring" },
          { label: "Choker", slug: "choker" },
        ],
        featured: [
          { label: "ENGAGEMENT", href: "/rings/engagement" },
          { label: "WEDDING", href: "/rings/wedding" },
        ],
      },
      {
        id: 2,
        name: "Necklaces",
        slug: "necklaces",
        categories: [
          { label: "Necklace", slug: "necklace" },
          { label: "Chain", slug: "chain" },
        ],
        featured: [
          { label: "PENDANTS", href: "/necklaces/pendants" },
          { label: "CHAINS", href: "/necklaces/chains" },
        ],
      },
      {
        id: 3,
        name: "Earrings",
        slug: "earrings",
        categories: [
          { label: "Earring", slug: "earring" },
          { label: "Stud", slug: "stud" },
        ],
        featured: [
          { label: "DIAMOND", href: "/earrings/diamond" },
          { label: "GOLD", href: "/earrings/gold" },
        ],
      },
    ],
  };
}
