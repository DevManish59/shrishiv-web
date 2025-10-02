import { NextResponse } from "next/server";

const CACHE_DURATION = 3600; // 1 hour
export async function GET() {
  try {
    // Fetch from external API
    const externalApiUrl =
      process.env.EXTERNAL_API_URL || "http://44.198.188.164:8080";

    const url = `${externalApiUrl}/store-detail`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
