import SingleBanner from "@/components/ui/banner";
import FullHeightGrid from "@/components/ui/full-height-grid";
import { UnifiedItem } from "@/lib/types";

// Force dynamic rendering - disable static generation
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Fallback data for when API fails
const fallbackGridItems: UnifiedItem[] = [
  {
    id: "shirts",
    title: "SHIRTS",
    subtitle: "New Collection",
    image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
    href: "/men/shirts",
    size: "half",
  },
  {
    id: "trousers",
    title: "TROUSERS",
    subtitle: "Spring/Summer 2024",
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
    href: "/men/trousers",
    size: "half",
  },
  {
    id: "dresses",
    title: "DRESSES",
    subtitle: "Elegant Collection",
    image:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    href: "/women/dresses",
    size: "half",
  },
  {
    id: "kids",
    title: "KIDS",
    subtitle: "New Collection",
    image:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    href: "/kids/shirts",
    size: "half",
  },
  {
    id: "trousers-kids",
    title: "TROUSERS",
    subtitle: "Spring/Summer 2024",
    image:
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    href: "/kids/trousers",
    size: "half",
  },
  {
    id: "dresses-kids",
    title: "DRESSES",
    subtitle: "Elegant Collection",
    image:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    href: "/kids/dresses",
    size: "half",
  },
];

const fallbackBannerData: UnifiedItem = {
  id: "main-banner",
  title: "Exclusive Sale",
  subtitle: "Up to 70% off on selected items. Don't miss out!",
  image:
    "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
  buttonText: "Shop Sale",
  slug: "sale",
};

// Server-side data fetching function
async function getHomePageData(): Promise<UnifiedItem[]> {
  try {
    // Check if we're in build mode
    if (
      process.env.NODE_ENV === "production" &&
      !process.env.EXTERNAL_API_URL
    ) {
      console.warn(
        "⚠️ Build mode detected without EXTERNAL_API_URL, using fallback"
      );
      return [fallbackBannerData, ...fallbackGridItems];
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/home`;

    console.log("🚀 Home Page: Calling API route:", apiUrl);

    // Use Next.js built-in fetch with revalidation for better caching
    const response = await fetch(apiUrl, {
      cache: "no-store", // Disable caching for dynamic data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch home page data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Home Page: API response received");
    return data;
  } catch (error) {
    console.warn("❌ Home Page: Failed to fetch data, using fallback:", error);

    // Return fallback data in unified format
    return [fallbackBannerData, ...fallbackGridItems];
  }
}

export default async function Home() {
  // Check if external API is configured
  const externalApiUrl = process.env.EXTERNAL_API_URL;
  console.log("🏠 Home Page: EXTERNAL_API_URL =", externalApiUrl);

  if (!externalApiUrl) {
    console.warn("⚠️ Home Page: EXTERNAL_API_URL not set, using fallback data");
  }

  // Fetch data on server side
  console.log("🚀 Home Page: Starting to fetch data...");
  const homeData = await getHomePageData();
  console.log(
    "✅ Home Page: Data fetched successfully, items count:",
    homeData.length
  );

  // Extract banner and grid items from the unified array
  const bannerData = homeData[0];
  const gridItems = homeData.slice(1);

  return (
    <div>
      <SingleBanner data={bannerData} />
      <div className="min-h-screen">
        <FullHeightGrid items={gridItems} />
      </div>
    </div>
  );
}

// Add metadata for SEO
export const metadata = {
  title: "Home | Shrishiv Jewelry",
  description:
    "Discover our premium collection of lab-grown diamond jewelry with exceptional craftsmanship and ethical sourcing. Exclusive sales and new collections available.",
  keywords: [
    "jewelry",
    "diamond jewelry",
    "lab grown diamonds",
    "engagement rings",
    "wedding jewelry",
    "fine jewelry",
    "ethical jewelry",
  ],
  openGraph: {
    title: "Home | Shrishiv Jewelry",
    description: "Discover our premium collection of lab-grown diamond jewelry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Shrishiv Jewelry",
    description: "Discover our premium collection of lab-grown diamond jewelry",
  },
};
