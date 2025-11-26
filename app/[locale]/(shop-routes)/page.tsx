import SingleBanner from "@/components/ui/banner";
import FullHeightGrid from "@/components/ui/full-height-grid";
import {
  fallbackBannerData,
  fallbackGridItems,
  homepgeMetadata,
} from "@/lib/constant";
import { COOKIE_KEY_LANGUAGE_ISO } from "@/lib/cookie-constant";
import { cookies } from "next/headers";

// Force dynamic rendering - disable static generation
export const dynamic = "force-dynamic";
export const revalidate = 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getHomePageData(): Promise<any> {
  try {
    const cookieStore = await cookies();
    const currentLanguage =
      cookieStore.get(COOKIE_KEY_LANGUAGE_ISO)?.value || "en";
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

    const endpoints = {
      featured: `${process.env.EXTERNAL_API_URL}/web/category`,
      store: `${process.env.EXTERNAL_API_URL}/web/store-detail`,
    };

    // Fetch both in parallel
    const [featuredRes, storeRes] = await Promise.all([
      fetch(endpoints.featured, {
        cache: "no-store",
        headers: {
          ...(currentLanguage !== "en" && { languageCode: currentLanguage }),
        },
      }),
      fetch(endpoints.store, {
        cache: "no-store",
        headers: {
          ...(currentLanguage !== "en" && { languageCode: currentLanguage }),
        },
      }),
    ]);

    // Check for failed responses
    if (!featuredRes.ok || !storeRes.ok) {
      throw new Error(
        `External API failed: featured=${featuredRes.status} store=${storeRes.status}`
      );
    }

    const [featuredData, storeData] = await Promise.all([
      featuredRes.json(),
      storeRes.json(),
    ]);
    return { storeData: storeData?.[0], featuredData };
  } catch (error) {
    console.warn("❌ Home Page: Failed to fetch data, using fallback:", error);

    // Return fallback data in unified format
    return [fallbackBannerData, ...fallbackGridItems];
  }
}

export default async function Home() {
  if (!process.env.EXTERNAL_API_URL) {
    console.warn("⚠️ Home Page: EXTERNAL_API_URL not set, using fallback data");
  }
  const homeData = await getHomePageData();

  // Extract banner and grid items from the unified array
  const storeData = homeData?.storeData;
  const categoryItems = homeData?.featuredData;

  const gridItems = categoryItems.flatMap((category: any) =>
    category.subCategories.map((sub: any) => ({
      ...sub,
      slug: `${category.slug}/${sub.slug}`, // ✅ combined slug
    }))
  );

  return (
    <div>
      <SingleBanner
        data={{
          ...storeData,
          mobileBanner:
            storeData?.mobileBannerUrl ||
            storeData?.desktopBannerUrl ||
            "/logo.png",
          desktopBanner: storeData?.desktopBannerUrl || "/logo.png",
          buttonText: "Shop Now",
          slug:
            categoryItems?.[0]?.slug &&
            categoryItems?.[0]?.subCategories?.[0]?.slug
              ? `${categoryItems?.[0]?.slug}/${categoryItems?.[0]?.subCategories?.[0]?.slug}`
              : "",
        }}
      />
      <div className="min-h-screen">
        <FullHeightGrid items={gridItems} />
      </div>
    </div>
  );
}

export async function generateMetadata() {
  try {
    if (!process.env.EXTERNAL_API_URL) {
      console.warn(
        "⚠️ Home Page: EXTERNAL_API_URL not set, using fallback data"
      );
    }
    const homeData = await getHomePageData();
    const storeData = homeData?.storeData;
    const {
      storeName,
      description = "Discover our premium collection of lab-grown diamond jewelry with exceptional craftsmanship and ethical sourcing. Exclusive sales and new collections available.",
      metaTitle,
      metaDescription,
      desktopBannerUrl,
    } = storeData;
    return {
      title: metaTitle || storeName,
      description: metaDescription || description,
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
        title: metaTitle || storeName,
        description: metaDescription || description,
        url: process.env.NEXT_PUBLIC_BASE_URL,
        siteName: "Shrishiv Diamonds",
        images: [
          {
            url: desktopBannerUrl || "/logo.png",
          },
        ],
        locale: "en-US",
        type: "website",
      },

      twitter: {
        title: metaTitle || storeName,
        description: metaDescription || description,
        card: "summary_large_image",
      },
      alternates: {
        canonical: process.env.NEXT_PUBLIC_BASE_URL,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return homepgeMetadata;
  }
}
