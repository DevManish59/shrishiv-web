"use client";

import SharedLayout from "@/components/layout/SharedLayout";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SharedLayout includeReviews={true}>{children}</SharedLayout>;
}
