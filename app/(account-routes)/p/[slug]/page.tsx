import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import DynamicPageContent from "@/components/DynamicPageContent";

interface PageProps {
  params: { slug: string };
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

export async function generateMetadata({ params }: PageProps) {
  try {
    const parameter = await params;
    const currentPageData = await getDynamicPages(parameter.slug);
    const { name, description, title, pageUrl } = currentPageData;
    return {
      title: title || name,
      description: description,
      openGraph: {
        title: title || name,
        description: description,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${pageUrl}`,
        locale: "en-US",
        type: "website",
      },

      twitter: {
        title: title || name,
        description: description,
        card: "summary_large_image",
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
