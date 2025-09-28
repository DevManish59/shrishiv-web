import { NextResponse } from "next/server";

// Force dynamic rendering - disable static generation
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Mock subcategory data as fallback
const mockSubcategoryData = {
  category: {
    id: 1,
    name: "Necklaces",
    slug: "necklaces",
    description: "Elegant necklace collection",
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
  },
  products: [
    {
      id: 1,
      productName: "Sample Chain Necklace",
      shortDescription: "Beautiful chain necklace design",
      pointOne: "Premium quality material",
      pointTwo: "Elegant design",
      pointThree: "Perfect for any occasion",
      pointFour: "Adjustable length",
      pointFive: "Includes gift box",
      url: "mabji-india.vercel.app/product/sample-chain-necklace",
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
    },
  ],
};

export async function GET(
  request: Request,
  { params }: { params: { category: string; subcategory: string } }
) {
  try {
    // Check if external API is configured
    const externalApiUrl = process.env.EXTERNAL_API_URL;
    if (!externalApiUrl) {
      console.warn(
        "⚠️ Subcategory API: EXTERNAL_API_URL not set, using mock data"
      );
      return NextResponse.json(mockSubcategoryData);
    }

    const { subcategory } = await params;
    const url = `${externalApiUrl}/product/by-category?slug=${subcategory}`;

    console.log(url, "url");
    console.log("🚀 Subcategory API: Calling external API:", url);

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`External API failed: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Subcategory API: External API response received", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Subcategory API: Error fetching external data:", error);

    // Return mock data as fallback
    console.log("🔄 Subcategory API: Using mock data as fallback");
    return NextResponse.json(mockSubcategoryData);
  }
}
