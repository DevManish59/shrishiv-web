"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Product } from "@/lib/types";

interface Props {
  product: Product;
}

export default function RowlistItem({ product }: Props) {
  const [hovered, setHovered] = useState(false);

  const discount = Math.round(
    100 - (product.salePrice || 0 / product.price) * 100
  );

  return (
    <div
      className="w-full max-w-xs rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-[300px] w-full">
        <motion.img
          src={hovered ? product.images[1] : product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300"
          key={hovered ? "hover" : "normal"}
        />
        <span className="absolute bottom-2 right-2 bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full">
          {product.tags.join(", ")}
        </span>
      </div>

      <div className="p-4 space-y-2">
        <p className="text-sm font-medium leading-tight line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm">
            Rs. {product.price.toLocaleString()}
          </p>
          <p className="line-through text-sm text-gray-400">
            Rs. {product.price.toLocaleString()}
          </p>
          <p className="text-sm text-red-500">({discount}% off)</p>
        </div>
        <div className="flex items-center text-yellow-500 text-sm gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current" />
          ))}
          <span className="text-gray-700 text-xs ml-1">{product.rating}</span>
        </div>
      </div>
    </div>
  );
}
