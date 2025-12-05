"use client";

import { createContext, useContext } from "react";
import { DynamicCategory } from "@/types/header";

interface HeaderDataContextType {
  categories: DynamicCategory[];
}

const HeaderDataContext = createContext<HeaderDataContextType | undefined>(
  undefined
);

export default function HeaderDataClientProvider({
  children,
  headerData,
}: {
  children: React.ReactNode;
  headerData: { categories: DynamicCategory[] };
}) {
  return (
    <HeaderDataContext.Provider value={headerData}>
      {children}
    </HeaderDataContext.Provider>
  );
}

export function useHeaderData() {
  const context = useContext(HeaderDataContext);
  if (!context) {
    throw new Error("useHeaderData must be used within HeaderDataProvider");
  }
  return context;
}

