"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchHeaderData } from "@/lib/api-functions";
import { headerMenuStaticData } from "@/lib/constant";

interface MenuItem {
  label: string;
  href: string;
  className?: string;
}

interface Category {
  label: string;
  slug: string;
}

interface MenuSection {
  categories: Category[];
  featured: MenuItem[];
}

interface ApiResponse {
  menuData?: Record<"women" | "men" | "kids", MenuSection>;
  women?: MenuSection;
  men?: MenuSection;
  kids?: MenuSection;
}

interface HeaderData {
  menuData: Record<"women" | "men" | "kids", MenuSection>;
  isLoading: boolean;
  error: string | null;
}

const HeaderContext = createContext<HeaderData | undefined>(undefined);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [headerData, setHeaderData] = useState<HeaderData>({
    menuData: {
      women: {
        categories: [],
        featured: [],
      },
      men: {
        categories: [],
        featured: [],
      },
      kids: {
        categories: [],
        featured: [],
      },
    },
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const loadHeaderData = async () => {
      try {
        // Fetch from external API (caching is handled by the API service)
        const response = await fetchHeaderData();

        if (response.error) {
          throw new Error(response.error);
        }

        if (response.data) {
          const apiData = response.data as ApiResponse;
          const menuData =
            apiData.menuData ||
            (apiData as Record<"women" | "men" | "kids", MenuSection>);

          setHeaderData({
            menuData,
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error("No data received from API");
        }
      } catch (error) {
        console.error("Error fetching header data:", error);

        // Fallback to static data if API fails
        setHeaderData(headerMenuStaticData);
      }
    };

    loadHeaderData();
  }, []);

  return (
    <HeaderContext.Provider value={headerData}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeaderData() {
  const context = useContext(HeaderContext);
  if (context === undefined) {
    throw new Error("useHeaderData must be used within a HeaderProvider");
  }
  return context;
}
