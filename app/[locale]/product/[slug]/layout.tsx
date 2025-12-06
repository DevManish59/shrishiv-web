import SharedLayout from "@/components/layout/SharedLayout";
import { getHeaderData } from "@/lib/header-data";

export default async function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerData = await getHeaderData();

  return (
    <SharedLayout menuData={headerData.categories}>{children}</SharedLayout>
  );
}
