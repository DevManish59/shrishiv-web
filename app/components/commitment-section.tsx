"use client";

import { motion } from "framer-motion";

export default function CommitmentSection() {
  const features = [
    {
      title: "Free Shipping",
      description: "Free shipping on orders over $99",
    },
    {
      title: "Secure Payment",
      description: "100% secure payment methods",
    },
    {
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer service",
    },
    {
      title: "Shrishiv's Trust",
      description: "100% satisfaction guaranteed",
    },
    {
      title: "Unbeatable Market Price",
      description: "We offer the best prices in the market",
    },
  ];
  return (
    <section className="sm:py-16 py-10 bg-gradient-to-r">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 md:gap-6 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center rounded-xl bg-gray-100 md:p-6 p-4 text-center hover:bg-gray-200 transition shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
