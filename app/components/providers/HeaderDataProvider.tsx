// import { fetchHeaderDataServer } from "@/lib/fetch-header-data";
import { fetchHeaderDataServer } from "lib/fetch-header-data";
import HeaderDataClientProvider from "./HeaderDataClientProvider";
import { DynamicCategory } from "@/types/header";

interface HeaderDataProviderProps {
  children: React.ReactNode;
  initialData?: { categories: DynamicCategory[] };
}

export default async function HeaderDataProvider({
  children,
  initialData,
}: HeaderDataProviderProps) {
  // Fetch header data server-side if not provided
  const headerData = initialData || (await fetchHeaderDataServer());

  // Pass data to client component wrapper
  return (
    <HeaderDataClientProvider headerData={headerData || { categories: [] }}>
      {children}
    </HeaderDataClientProvider>
  );
}
