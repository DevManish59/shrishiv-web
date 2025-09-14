"use client";

import { useState } from "react";
import FilterButton from "./filter-button";
import FilterDialog from "./filter-dialog";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterOptions {
  [key: string]: FilterOption[];
}

interface ActiveFilters {
  [key: string]: string[];
}

interface StickyFilterBarProps {
  filterOptions: FilterOptions;
  activeFilters: ActiveFilters;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function StickyFilterBar({
  filterOptions,
  activeFilters,
  searchParams,
}: StickyFilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <>
      <FilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filterOptions={filterOptions}
        activeFilters={activeFilters}
        searchParams={searchParams}
      />
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4">
            <FilterButton
              filterOptions={filterOptions}
              activeFilters={activeFilters}
              searchParams={searchParams}
              setIsFilterOpen={setIsFilterOpen}
            />

            {/* <div className="flex items-center gap-4">
              <ProductViewToggle gridSize={gridSize} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
