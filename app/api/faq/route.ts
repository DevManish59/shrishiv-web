import { HelpCategory } from "@/lib/types";
import { NextResponse } from "next/server";

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

    // ✅ filter categories by published
    const filteredCategories =
      faqListdata?.length > 0 &&
      faqListdata?.filter((cat: HelpCategory) => cat.published);

    return NextResponse.json(
      filteredCategories.length > 0 ? filteredCategories : []
    );
  } catch (error) {
    console.error("Header data fetch error:", error);
  }
}
