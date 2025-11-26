import { NextResponse } from "next/server";

export async function GET() {
  try {
    const externalApiUrl =
      process.env.EXTERNAL_API_URL || "https://api.shrishiv.com";

    const url = `${externalApiUrl}/web/product-review/stats`;

    // Forward request to external API
    const response = await fetch(url);

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
