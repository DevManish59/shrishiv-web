"use client";

import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";

// import { CartProvider } from "@/contexts/CartContext";
// import { LocalStorageCartProvider } from "@/contexts/LocalStorageCartContext";
import { Toaster } from "@/components/ui/sonner";
import TopHeader from "@/components/layout/TopHeader";

const ReviewSection = dynamic(() => import("@/components/review-section"));
const CommitmentSection = dynamic(
  () => import("@/components/commitment-section")
);
const FAQSection = dynamic(() => import("@/components/faqs"));
const Newsletter = dynamic(() => import("@/components/newsletter"));
const Footer = dynamic(() => import("@/components/layout/Footer"));

const inter = Inter({ subsets: ["latin"] });

interface SharedLayoutProps {
  children: React.ReactNode;
  includeReviews?: boolean;
}

export default function SharedLayout({
  children,
  includeReviews = false,
}: SharedLayoutProps) {
  return (
    <div className={inter.className}>
      <TopHeader />
      <Header />
      <main className="flex-1">{children}</main>
      {includeReviews && <ReviewSection />}
      <CommitmentSection />
      <FAQSection />
      <Newsletter />
      <Footer />
      <Toaster />
    </div>
  );
}

{
  /* <AuthProvider>
      <CartProvider> 
       <LocalStorageCartProvider> 
       </LocalStorageCartProvider>
      </CartProvider> 
    </AuthProvider> 
*/
}
