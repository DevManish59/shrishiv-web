import React from "react";
import ModelViewerProvider from "@/components/ui/model-viewer-provider";
import LoadScripts from "@/ScriptLoader";
import { AuthProvider } from "@/contexts/AuthContext";
import LocaleProvider from "@/contexts/LocalProvider";
import { LocalStorageCartProvider } from "@/contexts/LocalStorageCartContext";
import HeaderDataProvider from "@/components/providers/HeaderDataProvider";
// import { CartProvider } from "@/contexts/CartContext";

export const dynamicParams = true;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;

  return (
    <LocaleProvider locale={locale}>
      <AuthProvider>
        {/* <CartProvider> */}
        <LocalStorageCartProvider>
          <ModelViewerProvider preload={true}>
            <HeaderDataProvider>{children}</HeaderDataProvider>
          </ModelViewerProvider>
        </LocalStorageCartProvider>
        {/* </CartProvider> */}
      </AuthProvider>
      <LoadScripts />
    </LocaleProvider>
  );
}
