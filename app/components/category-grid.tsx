"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
  description?: string;
  featured?: boolean;
  height?: "short" | "tall" | "extra-tall";
}

interface CategoryGridProps {
  categories: Category[];
  title: string;
  subtitle: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CategoryGrid({
  categories,
  title,
  subtitle,
}: CategoryGridProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Parallax */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-64 md:h-96 bg-gray-900 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-cover bg-center"
        ></motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
            <p className="text-xl md:text-2xl">{subtitle}</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              className={`
                ${category.featured ? "sm:col-span-2" : ""}
                ${category.height === "tall" ? "row-span-2" : ""}
                ${category.height === "extra-tall" ? "row-span-3" : ""}
                relative
              `}
              style={{
                minHeight:
                  category.height === "short"
                    ? "200px"
                    : category.height === "tall"
                    ? "400px"
                    : category.height === "extra-tall"
                    ? "600px"
                    : "300px",
              }}
            >
              <Link href={category.href} className="block h-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative h-full rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <motion.div
                    initial={{ opacity: 0.7, y: 20 }}
                    whileHover={{ opacity: 0.9, y: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6"
                  >
                    <div>
                      <motion.h2
                        initial={{ y: 10 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold text-white"
                      >
                        {category.name}
                      </motion.h2>
                      {category.description && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-white/90 mt-2"
                        >
                          {category.description}
                        </motion.p>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-8 right-8 z-10"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-black text-white rounded-full p-4 shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
