"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterOptions {
  [key: string]: FilterOption[];
}

interface ActiveFilters {
  [key: string]: string[];
}

export default function ActiveFilters({
  activeFilters,
  filterOptions,
  slug,
}: {
  activeFilters: ActiveFilters;
  filterOptions: FilterOptions;
  slug: string;
}) {
  const searchParams = useSearchParams();
  if (!Object.values(activeFilters).some((arr) => arr.length > 0)) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {Object.entries(activeFilters).flatMap(([category, values]) =>
        values.map((value) => {
          const option = filterOptions[category]?.find(
            (opt) => opt.value === value
          );
          if (!option) return null;

          const params = new URLSearchParams(
            Object.fromEntries(
              Object.entries(searchParams).filter(
                ([key, value]) => key !== category && typeof value === "string"
              )
            )
          );
          const newValues = activeFilters[category].filter((v) => v !== value);
          if (newValues.length > 0) {
            params.set(category, newValues.join(","));
          }

          return (
            <Link
              key={`${category}-${value}`}
              href={`/collections/${slug}?${params.toString()}`}
              className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {option.label}
              <X size={14} className="ml-1" />
            </Link>
          );
        })
      )}
    </div>
  );
}
