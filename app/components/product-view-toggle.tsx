"use client";

import { LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProductViewToggle({
  gridSize,
}: {
  gridSize: "2x2" | "4x4" | "6x6";
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createUrl = (size: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("grid", size);
    return `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
  };

  return (
    <div className="flex items-center space-x-2">
      {/* <Link
        href={createUrl("2x2")}
        className={`p-2 rounded ${
          gridSize === "2x2"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="2x2 grid view"
      >
        <Grid2X2 size={16} />
      </Link>
      <Link
        href={createUrl("4x4")}
        className={`p-2 rounded ${
          gridSize === "4x4"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="4x4 grid view"
      >
        <Grid3X3 size={16} />
      </Link> */}
      <Link
        href={createUrl("4x4")}
        className={`p-2 rounded ${
          gridSize === "4x4"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600"
        }`}
        aria-label="4x4 grid view"
      >
        <LayoutGrid size={16} />
      </Link>
    </div>
  );
}
