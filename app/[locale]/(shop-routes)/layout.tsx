import SharedLayout from "@/components/layout/SharedLayout";
import { getHeaderData } from "@/lib/header-data";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerData = await getHeaderData();

  return (
    <SharedLayout includeReviews={true} menuData={headerData.categories}>
      {children}
    </SharedLayout>
  );
}
