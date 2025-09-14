"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all unworn items in their original condition with tags attached. Returns are free and easy through our online portal.",
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days. International shipping varies by location but typically takes 7-14 business days.",
  },
  {
    id: 3,
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by destination. Check our shipping page for specific details.",
  },
  {
    id: 4,
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history.",
  },
  {
    id: 5,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay for your convenience.",
  },
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-200 text-black border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors cursor-pointer"
                onClick={() => toggleItem(faq.id)}
              >
                <span className="font-semibold">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} className="text-black" />
                </motion.div>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openItems.includes(faq.id) ? "auto" : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-black leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
