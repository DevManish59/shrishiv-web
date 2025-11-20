import { COOKIE_KEY_LANGUAGE_ISO } from "@/lib/cookie-constant";
import { NextRequest, NextResponse } from "next/server";

const CACHE_DURATION = 3600; // 1 hour
export async function GET(req: NextRequest) {
  try {
    const currentLanguageCode =
      req.cookies.get(COOKIE_KEY_LANGUAGE_ISO)?.value || "en";

    // Fetch from external API
    const externalApiUrl =
      process.env.EXTERNAL_API_URL || "https://api.shrishiv.com";

    const url = `${externalApiUrl}/store-detail`;

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
    const storeDetail = await response.json();

    return NextResponse.json(storeDetail || [], {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error("Header data fetch error:", error);
  }
}
