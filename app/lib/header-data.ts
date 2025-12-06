import { cookies } from "next/headers";
import { COOKIE_KEY_LANGUAGE_ISO } from "@/lib/cookie-constant";
import { DynamicCategory, ParentCategory, SubCategory } from "@/types/header";

type NewApiResponse = ParentCategory[];

export interface HeaderDataResponse {
  categories: DynamicCategory[];
}

function transformExternalData(
  externalData: NewApiResponse
): HeaderDataResponse {
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
            })) || [],
      };
      dynamicCategories.push(dynamicCategory);
    });
  }

  return { categories: dynamicCategories };
}

export async function getHeaderData(): Promise<HeaderDataResponse> {
  try {
    // Get language code from cookies (server-side)
    const cookieStore = await cookies();
    const currentLanguageCode =
      cookieStore.get(COOKIE_KEY_LANGUAGE_ISO)?.value || "en";

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
      // Enable Next.js fetch caching
      next: { revalidate: 3600 }, // Revalidate every hour
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
      return { categories: [] };
    }

    // Transform external data to our format
    return transformExternalData(data);
  } catch (error) {
    console.error("Header data fetch error:", error);
    // Return fallback data
    return { categories: [] };
  }
}
