import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/page-style.scss";
// import { CartProvider } from "@/contexts/CartContext";
// import { LocalStorageCartProvider } from "@/contexts/LocalStorageCartContext";
// import { AuthProvider } from "@/contexts/AuthContext";
// import ModelViewerProvider from "@/components/ui/model-viewer-provider";
import { generateDefaultMetadata } from "./lib/seo-config";
// import LoadScripts from "./ScriptLoader";
// import { Schema } from "components/ui/schema";
// import { generateOrganizationSchema } from "lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateDefaultMetadata();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{/* <Schema schema={organizationSchema} /> */}</head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
