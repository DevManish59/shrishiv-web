import { cookies } from "next/headers";
import { COOKIE_KEY_LANGUAGE_ISO } from "@/lib/cookie-constant";
import { DynamicCategory, ParentCategory, SubCategory } from "@/types/header";

type NewApiResponse = ParentCategory[];

interface HeaderDataResponse {
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

export async function fetchHeaderDataServer() {
  try {
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
      // Add timeout
      signal: AbortSignal.timeout(5000), // 5 second timeout
      cache: "no-store", // Ensure fresh data on each request
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform external data to our format
    return transformExternalData(data);
  } catch (error) {
    console.error("Header data fetch error:", error);
  }
}
