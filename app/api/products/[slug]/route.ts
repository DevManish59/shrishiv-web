import { NextResponse } from "next/server";

// Force dynamic rendering - disable static generation
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Mock product data as fallback
const mockProductData = {
  id: 1,
  productName: "Sample Chain Necklace",
  shortDescription:
    "Beautiful chain necklace design with premium quality material",
  pointOne: "Premium quality material",
  pointTwo: "Elegant design",
  pointThree: "Perfect for any occasion",
  pointFour: "Adjustable length",
  pointFive: "Includes gift box",
  url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/sample-chain-necklace`,
  stock: 10,
  shipDay: 3,
  categoryIds: [1],
  sizeChartId: 1,
  sku: "NECK001",
  hsnCode: "711319",
  ageGroup: "Adult",
  gender: "Female",
  googleProductCategory: "Jewelry",
  mrpPrice: 5000,
  discount: 20,
  salesPrice: 4000,
  isFeatured: true,
  images: [
    "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
  ],
  imageFiles: [],
  attributeValues: [
    {
      id: 1,
      attributeId: 1,
      parentAttributeId: null,
      attributeName: "Gold Plated",
      attributeColor: "#FFD700",
      price: 4000,
      isDefault: true,
      images: [
        "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
      ],
      existingImages: null,
      imageFiles: [],
    },
  ],
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Check if external API is configured
    const externalApiUrl = process.env.EXTERNAL_API_URL;
    if (!externalApiUrl) {
      console.warn("⚠️ Product API: EXTERNAL_API_URL not set, using mock data");
      return NextResponse.json(mockProductData);
    }

    const { slug } = params;
    const url = `${externalApiUrl}/product/by-slug/${slug}`;

    console.log("🚀 Product API: Calling external API:", url);

    const response = await fetch(url);

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
    return NextResponse.json(mockProductData);
  }
}
