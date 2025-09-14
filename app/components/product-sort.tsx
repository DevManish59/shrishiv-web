"use client";

import { useRouter } from "next/navigation";

interface SortOption {
  value: string;
  label: string;
}

export default function ProductSort({
  sortBy,
  sortOptions,
  searchParams,
  slug,
}: {
  sortBy: string;
  sortOptions: SortOption[];
  searchParams: { [key: string]: string | string[] | undefined };
  slug: string;
}) {
  const router = useRouter();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(
      Object.fromEntries(
        Object.entries(searchParams).filter(([key]) => key !== "sort")
      )
    );
    params.set("sort", e.target.value);
    router.push(`/collections/${slug}?${params.toString()}`);
  };

  return (
    <select
      value={sortBy}
      onChange={handleSortChange}
      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Sort products"
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
