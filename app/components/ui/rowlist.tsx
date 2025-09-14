"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import ProductCard from "../product-card";

const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: "$49",
    originalPrice: "$69",
    image:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    rating: 4.8,
    reviews: 124,
    colors: ["#000000", "#FFFFFF", "#FF6B6B"],
  },
  {
    id: 2,
    name: "Elegant Summer Dress",
    price: "$89",
    originalPrice: "$129",
    image:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    rating: 4.9,
    reviews: 89,
    colors: ["#FF69B4", "#87CEEB", "#98FB98"],
  },
  {
    id: 3,
    name: "Classic Denim Jacket",
    price: "$129",
    originalPrice: "$179",
    image:
      "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    rating: 4.7,
    reviews: 156,
    colors: ["#4169E1", "#000080", "#87CEEB"],
  },
  {
    id: 4,
    name: "Casual Sneakers",
    price: "$99",
    originalPrice: "$149",
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    rating: 4.6,
    reviews: 203,
    colors: ["#FFFFFF", "#000000", "#FF6B6B"],
  },
  {
    id: 5,
    name: "Wool Blend Sweater",
    price: "$79",
    originalPrice: "$119",
    image:
      "https://images.pexels.com/photos/7679471/pexels-photo-7679471.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    rating: 4.8,
    reviews: 167,
    colors: ["#8B4513", "#2F4F4F", "#F5DEB3"],
  },
  {
    id: 6,
    name: "Designer Handbag",
    price: "$199",
    originalPrice: "$299",
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    rating: 4.9,
    reviews: 134,
    colors: ["#8B4513", "#000000", "#D2691E"],
  },
  {
    id: 7,
    name: "Silk Blouse",
    price: "$69",
    originalPrice: "$99",
    image:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    rating: 4.7,
    reviews: 98,
    colors: ["#FFB6C1", "#FFFFFF", "#E6E6FA"],
  },
  {
    id: 8,
    name: "Athletic Shorts",
    price: "$39",
    originalPrice: "$59",
    image:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    rating: 4.5,
    reviews: 76,
    colors: ["#000000", "#808080", "#FF6B6B"],
  },
];

interface ProductRowProps {
  title: string;
  subtitle?: string;
}

export default function ProductRow({ title, subtitle }: ProductRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180 cursor-pointer" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowRight className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto overflow-y-hidden scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 w-72 group cursor-pointer"
            >
              <ProductCard index={index} product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
          >
            View More Products
            <ArrowRight className="ml-2" size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
