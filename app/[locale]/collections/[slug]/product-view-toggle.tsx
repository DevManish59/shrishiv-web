"use client";

import { Grid, List } from "lucide-react";
import Link from "next/link";

export default function ProductViewToggle({
  viewMode,
  searchParams,
  slug,
}: {
  viewMode: "grid" | "list";
  searchParams: { [key: string]: string | string[] | undefined };
  slug: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Link
        href={`/collections/${slug}?${new URLSearchParams({
          ...Object.fromEntries(
            Object.entries(searchParams).filter(([key]) => key !== "view")
          ),
          view: "grid",
        })}`}
        className={`p-2 rounded ${
          viewMode === "grid"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="Grid view"
      >
        <Grid size={16} />
      </Link>
      <Link
        href={`/collections/${slug}?${new URLSearchParams({
          ...Object.fromEntries(
            Object.entries(searchParams).filter(([key]) => key !== "view")
          ),
          view: "list",
        })}`}
        className={`p-2 rounded ${
          viewMode === "list"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="List view"
      >
        <List size={16} />
      </Link>
    </div>
  );
}
