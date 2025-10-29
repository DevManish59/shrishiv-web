import { ReviewType } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const externalApiUrl =
      process.env.EXTERNAL_API_URL || "https://api.shrishiv.com";

    const url = `${externalApiUrl}/product-review`;

    // Forward request to external API
    const response = await fetch(url, {
      method: "POST",
      body: formData, // forward as form-data
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
export async function GET() {
  try {
    const externalApiUrl =
      process.env.EXTERNAL_API_URL || "https://api.shrishiv.com";

    const url = `${externalApiUrl}/product-review`;

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
