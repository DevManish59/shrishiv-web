import {
  COOKIE_KEY_COUNTRY_ISO,
  COOKIE_KEY_LANGUAGE_ISO,
} from "@/lib/cookie-constant";
import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering - disable static generation
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log(
      "req.cookies.get(COOKIE_KEY_LANGUAGE_ISO)",
      req.cookies.get(COOKIE_KEY_LANGUAGE_ISO)
    );
    const currentLanguageCode =
      req.cookies.get(COOKIE_KEY_LANGUAGE_ISO)?.value || "en";
    const currentCountryCode =
      req.cookies.get(COOKIE_KEY_COUNTRY_ISO)?.value || "in";

    console.log(
      "currentLanguageCode-&-currentCountryCode",
      currentLanguageCode,
      currentCountryCode
    );

    const { slug } = await params;
    const url = `${process.env.EXTERNAL_API_URL}/web/product/by-slug/${slug}`;

    console.log("🚀 Product API: Calling external API:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...(currentLanguageCode !== "en" && {
          languageCode: currentLanguageCode,
        }),
        ...(currentCountryCode !== "in" && {
          countryCode: currentCountryCode,
        }),
      },
    });

    if (!response.ok) {
      throw new Error(`External API failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Product API: External API response received", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Product API: Error fetching external data:", error);

    // Return mock data as fallback
    console.log("🔄 Product API: Using mock data as fallback");
    return NextResponse.json("");
  }
}
