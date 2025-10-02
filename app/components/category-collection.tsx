"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Dresses",
    image:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
    itemCount: "120+ items",
  },
  {
    id: 2,
    name: "Accessories",
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
    itemCount: "85+ items",
  },
  {
    id: 3,
    name: "Shoes",
    image:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
    itemCount: "200+ items",
  },
  {
    id: 4,
    name: "Bags",
    image:
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
    itemCount: "95+ items",
  },
  {
    id: 5,
    name: "Tops",
    image:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
    itemCount: "150+ items",
  },
  {
    id: 6,
    name: "Jewelry",
    image:
      "https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
    itemCount: "75+ items",
  },
];

export default function CategoryCollection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="md:text-4xl text-3xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600">
            Discover our curated collections
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={100}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute inset-0 flex items-end p-4">
                  <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.itemCount}
                    </p>
                  </div>
                </div>
              </div>
              <motion.h3
                whileHover={{ scale: 1.05 }}
                className="text-center font-medium text-gray-900"
              >
                {category.name}
              </motion.h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
