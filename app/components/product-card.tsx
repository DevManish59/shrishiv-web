"use client";

import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import LocalizedLink from "./layout/LocalizedLink";
import { useLocale } from "@/contexts/LocalProvider";

interface Props {
  product: {
    id: number;
    slug: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
  };
  basePath?: string;
  index?: number;
}

export default function ProductCard({ product, basePath = "/product" }: Props) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const { currentCountry } = useLocale();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
  });

  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi || isLargeScreen) return;
  }, [emblaApi, isLargeScreen]);

  useEffect(() => {
    if (!emblaApi || isLargeScreen) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect, isLargeScreen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <LocalizedLink href={`${basePath}/${product.slug}`} className="block">
        <div
          className={`aspect-[3/4] w-full overflow-hidden relative ${
            imageError || !imageLoaded || !product.image
              ? "bg-gray-200"
              : "bg-gray-100"
          }`}
        >
          <div
            className={`h-full ${
              isLargeScreen ? "pointer-events-none touch-none" : ""
            }`}
            ref={emblaRef}
          >
            <div
              className={`flex h-full ${isLargeScreen ? "" : "touch-pan-y"}`}
            >
              <div
                className={`relative ${
                  isLargeScreen ? "w-full" : "flex-[0_0_100%] min-w-0"
                }`}
              >
                {!imageError &&
                  product.image &&
                  product.image.trim() !== "" && (
                    <Image
                      src={product.image}
                      alt={`${product.name}`}
                      fill
                      className={`object-cover object-center transition-all duration-300 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={true}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                    />
                  )}
              </div>
            </div>
          </div>

          {product.originalPrice && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-medium rounded z-10">
              Sale
            </div>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <div className="text-sm text-gray-500">
            {product.originalPrice ? (
              <>
                <span className="line-through">
                  {currentCountry?.currencySymbol || "Rs."}{" "}
                  {product.originalPrice.toLocaleString()}
                </span>
                <span className="ml-2 text-red-500">
                  {currentCountry?.currencySymbol || "Rs."}{" "}
                  {product?.price?.toLocaleString()}
                </span>
              </>
            ) : (
              <span>
                {currentCountry?.currencySymbol || "Rs."}{" "}
                {product?.price?.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </LocalizedLink>
    </motion.div>
  );
}
