"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface ProductGalleryProps {
  product: {
    id: number;
    name: string;
    images: string[];
  };
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="aspect-square overflow-hidden rounded-xl bg-gray-100 relative"
      >
        <Image
          src={product.images[selectedImage]}
          alt={product.name}
          width={400}
          height={100}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`transition-colors ${
              isWishlisted ? "text-red-500" : "text-gray-400"
            }`}
          >
            <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-4 gap-3">
        {product.images.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square overflow-hidden rounded-lg transition-all duration-200 ${
              selectedImage === index
                ? "ring-2 ring-blue-500 ring-offset-2"
                : "border border-gray-200 hover:border-gray-400"
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} ${index + 1}`}
              width={400}
              height={100}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
