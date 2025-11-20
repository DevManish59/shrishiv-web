import { COOKIE_KEY_LANGUAGE_ISO } from "@/lib/cookie-constant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentLanguageCode =
      req.cookies.get(COOKIE_KEY_LANGUAGE_ISO)?.value || "en";

    const formData = await req.formData();

    const externalApiUrl =
      process.env.EXTERNAL_API_URL || "https://api.shrishiv.com";

    const url = `${externalApiUrl}/product-review`;

    // Forward request to external API
    const response = await fetch(url, {
      method: "POST",
      body: formData, // forward as form-data
      headers: {
        ...(currentLanguageCode !== "en" && {
          languageCode: currentLanguageCode,
        }),
      },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const result = await response.json();
    console.log("Reciew++", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Review POST error:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const currentLanguageCode =
      req.cookies.get(COOKIE_KEY_LANGUAGE_ISO)?.value || "en";

    const externalApiUrl =
      process.env.EXTERNAL_API_URL || "https://api.shrishiv.com";

    const url = `${externalApiUrl}/product-review`;

    // Forward request to external API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...(currentLanguageCode !== "en" && {
          languageCode: currentLanguageCode,
        }),
      },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const result = await response.json();
    // const approvedReview = result?.filter(
    //   (item: ReviewType) => item.isApproved === true
    // );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Review GET error:", error);
    return NextResponse.json(
      { error: "Failed to load review" },
      { status: 500 }
    );
  }
}
