import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import DynamicPageContent from "@/components/DynamicPageContent";

interface PageProps {
  params: { slug: string };
}

async function getDynamicPages(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/page?slug=${slug}`, {
    cache: "no-store", // ensures fresh data on every request
  });
  if (!res.ok) {
    throw new Error("Failed to fetch page data");
  }

  const pageData = await res.json();
  return pageData;
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
