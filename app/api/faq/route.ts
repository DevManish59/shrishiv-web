import { HelpCategory } from "@/lib/types";
import { NextResponse } from "next/server";

const CACHE_DURATION = 3600; // 1 hour
export async function GET() {
  try {
    // Fetch from external API
    const externalApiUrl =
      process.env.EXTERNAL_API_URL || "http://44.198.188.164:8080";

    const url = `${externalApiUrl}/help-category`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }
    const faqListdata = await response.json();

    // ✅ filter categories by published and having helpItems > 0
    // const filteredCategories =
    //   faqListdata?.length > 0
    //     ? faqListdata.filter(
    //         (cat: HelpCategory) => cat.published && cat.helpItems?.length > 0
    //       )
    //     : [];

    const filteredCategories =
      faqListdata?.length > 0
        ? faqListdata
            .filter((cat: HelpCategory) => cat.published) // category must be published
            .map((cat: HelpCategory) => ({
              ...cat,
              helpItems: cat.helpItems?.filter((item) => item.published) ?? [], // only published items
            }))
            .filter((cat: HelpCategory) => cat.helpItems.length > 0) // only keep categories with published items
        : [];

    return NextResponse.json(
      filteredCategories.length > 0 ? filteredCategories : [],
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
        },
      }
    );
  } catch (error) {
    console.error("Header data fetch error:", error);
  }
}
