"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
// import { useCart } from "@/contexts/CartContext";
import { useCart } from "@/contexts/LocalStorageCartContext";
import { useRouter } from "next/navigation";
import { calculateProductPrice } from "@/lib/utils";

interface ProductStickyBarProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    images: string[];
    metalTypes: {
      key: string;
      name: string;
      value: string;
      color: string;
      textColor: string;
      price: number;
    }[];
    diamondSizes: {
      size: string;
      available: boolean;
      price: number;
    }[];
    ringSizes: {
      size: string;
      available: boolean;
    }[];
  };
}

export default function ProductStickyBar({ product }: ProductStickyBarProps) {
  const [showSticky, setShowSticky] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  // Calculate dynamic price based on selected attributes
  const calculatedPrice = useMemo(() => {
    // Get current selected values from the DOM
    const selectedMetalType =
      document
        ?.querySelector('button[class*="border-black"]')
        ?.getAttribute("data-metal-key") || "SL";

    const selectedDiamondSize = document
      ?.querySelector('button[class*="border-black bg-black text-white"]')
      ?.textContent?.trim();

    const selectedAttributes: { [key: string]: number } = {};

    // Add metal type price
    const selectedMetal = product.metalTypes.find(
      (m) => m.key === selectedMetalType
    );
    if (selectedMetal) {
      selectedAttributes.metal = selectedMetal.price;
    }

    // Add diamond size price
    const selectedDiamond = product.diamondSizes.find(
      (d) => d.size === selectedDiamondSize
    );
    if (selectedDiamond) {
      selectedAttributes.diamond = selectedDiamond.price;
    }

    return calculateProductPrice(product.price, selectedAttributes);
  }, [product.price, product.metalTypes, product.diamondSizes]);

  useEffect(() => {
    const handleScroll = () => {
      const productDetails = document.getElementById("product-details");
      if (productDetails) {
        const rect = productDetails.getBoundingClientRect();
        // Show sticky when we've scrolled past the product details section
        setShowSticky(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAddToCart = () => {
    // Get the current selected values from the form
    const selectedDiamondSize = document
      .querySelector('button[class*="border-black bg-black text-white"]')
      ?.textContent?.trim();
    const selectedRingSize = (
      document.querySelector("select") as HTMLSelectElement
    )?.value;

    // Check if required fields are selected
    if (!selectedDiamondSize || !selectedRingSize) {
      // Scroll to top to show the form
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Add visual feedback for missing fields
      if (!selectedDiamondSize) {
        const diamondLabel = document.querySelector("p.text-red-500");
        if (diamondLabel) {
          diamondLabel.classList.add("animate-pulse");
          setTimeout(
            () => diamondLabel.classList.remove("animate-pulse"),
            2000
          );
        }
      }

      if (!selectedRingSize) {
        const ringLabel = document.querySelector("p.text-red-500");
        if (ringLabel) {
          ringLabel.classList.add("animate-pulse");
          setTimeout(() => ringLabel.classList.remove("animate-pulse"), 2000);
        }
      }

      return;
    }

    // Get the metal type value
    const metalTypeElement = document.querySelector(
      'button[class*="border-black"]'
    );
    const metalTypeKey = metalTypeElement?.getAttribute("data-metal-key");
    const metalType =
      product.metalTypes.find((m) => m.key === metalTypeKey)?.value || "";

    // Add item to cart with calculated price
    addItem({
      id: product.id,
      name: product.name,
      price: calculatedPrice, // Use calculated price
      originalPrice: product.originalPrice,
      image: product.images[0],
      metalType: metalType,
      diamondSize: selectedDiamondSize,
      ringSize: selectedRingSize,
      isLabGrown: true,
    });

    // Navigate to cart page
    router.push("/checkout");
  };

  if (!showSticky) return null;

  return (
    <div className="fixed top-[64px] left-0 right-0 z-50 bg-white shadow-md py-3 px-4 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="hidden md:block h-16 w-16 relative rounded-md overflow-hidden">
            <Image
              src={imageError ? "/logo.png" : product?.images[0]}
              alt={product.name}
              fill
              className={`object-${imageError ? "contain" : "cover"}`}
              onError={() => setImageError(true)}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900">
                Rs. {calculatedPrice.toLocaleString()}
              </span>
              {calculatedPrice !== product.price && (
                <span className="text-xs text-gray-500">
                  Base: Rs. {product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-4 py-2 text-sm md:text-base cursor-pointer"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
