import SharedLayout from "@/components/layout/SharedLayout";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedLayout includeReviews={true}>{children}</SharedLayout>;
}
