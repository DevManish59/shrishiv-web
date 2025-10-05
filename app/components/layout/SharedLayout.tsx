"use client";

import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import TopHeader from "@/components/layout/TopHeader";
import ReviewSection from "@/components/review-section";
import CommitmentSection from "@/components/commitment-section";
import FAQSection from "@/components/faqs";
import Newsletter from "@/components/newsletter";

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
    <AuthProvider>
      <CartProvider>
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
      </CartProvider>
    </AuthProvider>
  );
}
