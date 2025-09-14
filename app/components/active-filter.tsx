"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

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

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default function ActiveFilters({
  activeFilters,
  filterOptions,
  searchParams,
}: {
  activeFilters: ActiveFilters;
  filterOptions: FilterOptions;
  searchParams: SearchParams;
}) {
  const pathname = usePathname();

  if (!Object.values(activeFilters).some((arr) => arr.length > 0)) {
    return null;
  }

  const createFilterUrl = (categoryToRemove: string, valueToRemove: string) => {
    const params = new URLSearchParams();

    // First, add all non-category params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== categoryToRemove && value) {
        if (typeof value === "string") {
          params.set(key, value);
        } else if (Array.isArray(value)) {
          params.set(key, value.join(","));
        }
      }
    });

    // Then handle the category we're modifying
    if (categoryToRemove === "category") {
      const currentValues = ((searchParams.category as string) || "").split(
        ","
      );
      const remainingValues = currentValues.filter((v) => v !== valueToRemove);
      if (remainingValues.length > 0) {
        params.set("category", remainingValues.join(","));
      }
    } else {
      // For other parameters, just remove the specific value
      const currentValue = searchParams[categoryToRemove];
      if (typeof currentValue === "string") {
        const values = currentValue.split(",");
        const remainingValues = values.filter((v) => v !== valueToRemove);
        if (remainingValues.length > 0) {
          params.set(categoryToRemove, remainingValues.join(","));
        }
      }
    }

    return params.toString();
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {Object.entries(activeFilters).flatMap(([category, values]) =>
        values.map((value) => {
          const option = filterOptions[category]?.find(
            (opt) => opt.value === value
          );
          if (!option) return null;

          const queryString = createFilterUrl(category, value);
          const href = `${pathname}${queryString ? `?${queryString}` : ""}`;

          return (
            <Link
              key={`${category}-${value}`}
              href={href}
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
