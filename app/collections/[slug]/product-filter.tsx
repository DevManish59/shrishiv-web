"use client";

import Link from "next/link";

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

export default function ProductFilters({
  filterOptions,
  activeFilters,
  searchParams,
  slug,
  showFilters,
}: {
  filterOptions: FilterOptions;
  activeFilters: ActiveFilters;
  searchParams: { [key: string]: string | string[] | undefined };
  slug: string;
  showFilters: boolean;
}) {
  return (
    <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-4">Filters</h3>

        {Object.entries(filterOptions).map(([category, options]) => (
          <div key={category} className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3 capitalize">
              {category}
            </h4>
            <div className="space-y-2">
              {options.map((option, index) => {
                const isActive = activeFilters[category]?.includes(
                  option.value
                );
                const params = new URLSearchParams(
                  Object.fromEntries(
                    Object.entries(searchParams).filter(
                      ([key]) => key !== category
                    )
                  )
                );

                if (isActive) {
                  const newValues = activeFilters[category].filter(
                    (v) => v !== option.value
                  );
                  if (newValues.length > 0) {
                    params.set(category, newValues.join(","));
                  }
                } else {
                  const newValues = [...activeFilters[category], option.value];
                  params.set(category, newValues.join(","));
                }

                return (
                  <Link
                    key={index}
                    href={`/collections/${slug}?${params.toString()}`}
                    className={`flex items-center text-sm ${
                      isActive ? "text-blue-600 font-medium" : "text-gray-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isActive}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                    />
                    {option.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
