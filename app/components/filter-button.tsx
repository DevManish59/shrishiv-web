"use client";

import { Filter } from "lucide-react";

interface FilterButtonProps {
  filterOptions: {
    [key: string]: Array<{
      value: string;
      label: string;
    }>;
  };
  activeFilters: {
    [key: string]: string[];
  };
  searchParams: { [key: string]: string | string[] | undefined };
  setIsFilterOpen: (isOpen: boolean) => void;
}

export default function FilterButton({ setIsFilterOpen }: FilterButtonProps) {
  return (
    <>
      <button
        onClick={() => setIsFilterOpen(true)}
        className="flex items-center gap-2 text-sm font-medium bg-black text-white px-4 py-2 cursor-pointer"
      >
        <Filter className="h-4 w-4" />
        FILTER AND ORDER
      </button>
    </>
  );
}
