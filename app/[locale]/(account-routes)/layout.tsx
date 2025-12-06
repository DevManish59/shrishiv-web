import SharedLayout from "@/components/layout/SharedLayout";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedLayout>{children}</SharedLayout>;
}
