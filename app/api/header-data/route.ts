import { COOKIE_KEY_LANGUAGE_ISO } from "@/lib/cookie-constant";
import {
  DynamicCategory,
  HeaderCategory,
  ParentCategory,
  SubCategory,
} from "@/types/header";
import { NextRequest, NextResponse } from "next/server";

type NewApiResponse = ParentCategory[];

interface MenuSection {
  categories: HeaderCategory[];
  featured: HeaderCategory[];
}

// Removed unused MenuData interface

interface OldApiResponse {
  women?: MenuSection;
  men?: MenuSection;
  kids?: MenuSection;
}

// Cache duration in seconds
const CACHE_DURATION = 3600; // 1 hour

export async function GET(req: NextRequest) {
  try {
    // Check if we have cached data
    const currentLanguageCode =
      req.cookies.get(COOKIE_KEY_LANGUAGE_ISO)?.value || "en";
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

    const url = `${externalApiUrl}/web/category/headers`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(currentLanguageCode !== "en" && {
          languageCode: currentLanguageCode,
        }),
      },
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
      return NextResponse.json(
        { categories: [] },
        {
          headers: {
            "Cache-Control": "public, s-maxage=300", // 5 minutes for fallback
          },
        }
      );
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
    return NextResponse.json(
      { categories: [] },
      {
        status: 200, // Still return 200 to avoid client errors
        headers: {
          "Cache-Control": "public, s-maxage=300", // 5 minutes for fallback
        },
      }
    );
  }
}

// Cache functions (you can use Redis, database, or file system)
async function getCachedHeaderData() {
  return null;
}

async function cacheHeaderData() {
  return;
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
          parentCategory.subCategories
            ?.filter((sub) => !sub?.featured)
            ?.map((sub: SubCategory) => ({
              id: sub.id,
              label: sub.name,
              slug: sub.slug,
            })) || [],
        featured:
          parentCategory.subCategories
            ?.filter((sub) => sub?.featured)
            .map((sub) => ({
              id: sub.id,
              label: sub.name,
              slug: sub.slug,
            })) || [], // You can populate this from API or leave empty for now
      };
      dynamicCategories.push(dynamicCategory);
    });
  }

  return { categories: dynamicCategories };
}
