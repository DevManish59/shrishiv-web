import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import DynamicPageContent from "@/components/DynamicPageContent";

interface PageProps {
  params: { slug: string };
  searchParams: { id: number };
}

async function getDynamicPages(slug: string, id: number) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/page?id=${id}&slug=${slug}`, {
    cache: "no-store", // ensures fresh data on every request
  });
  if (!res.ok) {
    throw new Error("Failed to fetch page data");
  }

  const pageData = await res.json();
  return pageData;
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  try {
    const parameter = await params;
    const id = searchParams.id;
    const currentPageData = await getDynamicPages(parameter.slug, id);
    const { name, description, title } = currentPageData;
    return {
      title: title || name,
      description: description,
      openGraph: {
        title: title || name,
        description: description,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/p/parameter.slug`,
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

export default async function Page({ params, searchParams }: PageProps) {
  const parameter = await params;
  const id = searchParams.id;

  const pageData = await getDynamicPages(parameter.slug, id);

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
