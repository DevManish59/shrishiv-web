"use client";

import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

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

export default function FilterDialog({
  isOpen,
  onClose,
  filterOptions,
  activeFilters,
  searchParams,
}: {
  isOpen: boolean;
  onClose: () => void;
  filterOptions: FilterOptions;
  activeFilters: ActiveFilters;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [localFilters, setLocalFilters] =
    useState<ActiveFilters>(activeFilters);

  // Reset local filters when dialog opens with current URL params
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(activeFilters);
    }
  }, [isOpen, activeFilters]);

  const toggleSection = (category: string) => {
    setExpandedSections((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleFilter = (category: string, value: string) => {
    setLocalFilters((prev) => {
      const currentFilters = prev[category] || [];
      const isActive = currentFilters.includes(value);

      const newFilters = {
        ...prev,
        [category]: isActive
          ? currentFilters.filter((v) => v !== value)
          : [...currentFilters, value],
      };

      // Remove empty categories
      if (newFilters[category].length === 0) {
        delete newFilters[category];
      }

      return newFilters;
    });
  };

  const handleShowItems = () => {
    // Create new URLSearchParams with only view and sort params if they exist
    const params = new URLSearchParams();
    if (searchParams.view) {
      params.set("view", searchParams.view.toString());
    }
    if (searchParams.sort) {
      params.set("sort", searchParams.sort.toString());
    }

    // Add local filters to params
    Object.entries(localFilters).forEach(([category, values]) => {
      if (values.length > 0) {
        params.set(category, values.join(","));
      }
    });

    // Navigate to current path with new params
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
    onClose();
  };

  const handleClearFilters = () => {
    setLocalFilters({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100]"
            onClick={onClose}
          />

          {/* Filter Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-[110] shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Filter Sections */}
            <div className="flex-1 overflow-y-auto py-4">
              {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category} className="mb-6 px-4">
                  <button
                    onClick={() => toggleSection(category)}
                    className="w-full flex items-center justify-between mb-3 cursor-pointer"
                  >
                    <h3 className="text-base font-medium capitalize">
                      {category}
                    </h3>
                    <span
                      className={`transform transition-transform ${
                        expandedSections.includes(category) ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {expandedSections.includes(category) && (
                    <div className="space-y-3 mb-4">
                      {options.map((option, index) => {
                        const isActive = localFilters[category]?.includes(
                          option.value
                        );

                        return (
                          <div
                            key={index}
                            className="flex items-center group cursor-pointer"
                            onClick={() => toggleFilter(category, option.value)}
                          >
                            <div className="relative flex items-center">
                              <input
                                type="checkbox"
                                checked={isActive}
                                readOnly
                                className="h-5 w-5 border-gray-300 text-black focus:ring-black rounded"
                              />
                              <span className="ml-3 text-sm text-gray-700">
                                {option.label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleShowItems}
                  className="w-full px-4 py-2.5 bg-black text-white hover:bg-gray-800 transition-colors rounded-full font-medium"
                >
                  Show Items
                </button>
                <button
                  onClick={handleClearFilters}
                  className="w-full px-4 py-2.5 border border-gray-300 text-center hover:bg-gray-50 transition-colors rounded-full"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
