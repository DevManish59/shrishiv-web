import SharedLayout from "@/components/layout/SharedLayout";

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedLayout includeReviews={false}>{children}</SharedLayout>;
}
