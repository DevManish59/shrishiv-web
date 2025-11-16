"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProductStickyBarProps {
  product: {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    images: string[];
    colors?: { name: string; value: string }[];
  };
}

export default function ProductStickyBar({ product }: ProductStickyBarProps) {
  const [showSticky, setShowSticky] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const productDetails = document.getElementById("product-details");
      console.log(productDetails);
      if (productDetails) {
        const rect = productDetails.getBoundingClientRect();
        console.log(rect);
        // Show sticky when we've scrolled past the product details section
        setShowSticky(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showSticky) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3 px-4 transition-all duration-300 transform translate-y-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 relative rounded-md overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-900">{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              {product.colors && product.colors.length > 0 && (
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: product.colors[selectedColor].value,
                  }}
                />
              )}
              {selectedSize && (
                <span className="text-sm text-gray-600">
                  Size: {selectedSize}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className={`bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-medium transition-colors ${
            isAddedToCart ? "bg-green-600" : ""
          }`}
        >
          {isAddedToCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
