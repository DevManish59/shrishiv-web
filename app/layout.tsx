import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ModelViewerProvider from "@/components/ui/model-viewer-provider";
import { generateDefaultMetadata } from "./lib/seo-config";
import { Schema } from "components/ui/schema";
import { generateOrganizationSchema } from "lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateDefaultMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en">
      <head>
        <Schema schema={organizationSchema} />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <ModelViewerProvider preload={true}>{children}</ModelViewerProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
