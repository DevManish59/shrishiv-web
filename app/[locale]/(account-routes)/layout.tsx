import SharedLayout from "@/components/layout/SharedLayout";
import { getHeaderData } from "@/lib/header-data";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerData = await getHeaderData();

  return (
    <SharedLayout menuData={headerData.categories}>{children}</SharedLayout>
  );
}
