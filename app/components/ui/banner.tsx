"use client";

import { useSharedCookie } from "@/hooks/useSharedCookie";
import { fallbackBannerData } from "@/lib/constant";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

interface SingleBannerProps {
  data?: {
    id: string;
    title: string;
    name: string;
    slug: string;
    subtitle: string;
    storeName: string;
    description: string;
    shortDescription: string;
    notificationDetail: string;
    mobileBanner?: string;
    desktopBanner?: string;
    buttonText?: string;
  };
}

export default function SingleBanner({ data }: SingleBannerProps) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { cookieData, updateCookie } = useSharedCookie();

  useEffect(() => {
    const message = data?.notificationDetail;
    if (message && message !== cookieData?.message) {
      updateCookie({ message });
    }
  }, [data?.notificationDetail]);

  // Default data if no data is provided
  const bannerData = data || fallbackBannerData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div
        className="h-svh bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: `url('${
            isMobile ? bannerData.mobileBanner : bannerData.desktopBanner
          }')`,
        }}
      >
        {/* Fixed gradient overlay - managed on frontend */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              {bannerData.title || bannerData?.storeName}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl mb-8"
              dangerouslySetInnerHTML={{
                __html: bannerData?.description ?? "",
              }}
            />
            {bannerData.slug && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/${bannerData.slug}`}
                  className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold text-lg transition-all hover:bg-gray-100 shadow-lg"
                >
                  {bannerData.buttonText || "Shop Now"}
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
