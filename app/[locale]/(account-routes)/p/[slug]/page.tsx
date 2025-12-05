import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import DynamicPageContent from "@/components/DynamicPageContent";
import { Metadata } from "next";

interface PageProps {
  params: { slug: string; locale: string };
}

async function fetchWithErrorHandling(url: string, options: any) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return notFound();
  }
}

async function getDynamicPages(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/page?slug=${slug}`;
  const options = {
    cache: "no-store", // ensures fresh data on every request
  };
  return fetchWithErrorHandling(url, options);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  try {
    const { slug, locale } = await params;
    const currentPageData = await getDynamicPages(slug);

    const { metaTitle, metaDescription, title, description, imageUrls } =
      currentPageData;

    const image = imageUrls?.[0] || "";
    return {
      title: metaTitle || title,
      description: metaDescription || description,
      openGraph: {
        title: metaTitle || title,
        description: metaDescription || description,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/product/${slug}`,
        images: image ? [{ url: image }] : [],
        locale: locale,
        type: "website",
      },
      twitter: {
        title: metaTitle || title,
        description: metaDescription || description,
        card: "summary_large_image",
        site: "@shrishiv",
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/product/${slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {};
  }
}

export default async function Page({ params }: PageProps) {
  const parameter = await params;

  const pageData = await getDynamicPages(parameter.slug);

  return (
    <Suspense
      fallback={
        <div className="flex items-center space-x-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
      }
    >
      <DynamicPageContent pageData={pageData} />
    </Suspense>
  );
}
