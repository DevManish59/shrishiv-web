"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { HelpCategory, HelpItem } from "@/lib/types";

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
  const [faqListdata, setFaqListdata] = useState<HelpCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [openItems, setOpenItems] = useState<number[]>([]);

  const activeFaqs = useMemo(() => {
    const category = faqListdata.find(
      (cat) => cat?.displayOrder === activeCategory
    );
    // ✅ filter helpItems by published
    return category?.helpItems?.filter((faq: HelpItem) => faq.published) || [];
  }, [faqListdata, activeCategory]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const fetchFaqData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/faq`);
      const faqListdata = await response.json();
      setFaqListdata(faqListdata);
      // set the first published category active by default
      if (faqListdata.length > 0) {
        setActiveCategory(faqListdata?.[0].displayOrder);
      }
    } catch (error) {
      console.error("Error fetching header data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqData();
  }, []);

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

        {isLoading ? (
          <p className="text-gray-500 text-xl font-medium py-10">Loading...</p>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-center mb-6 pb-2">
              {faqListdata?.map((cat: HelpCategory) => (
                <button
                  key={cat?.id}
                  onClick={() => {
                    setActiveCategory(cat?.displayOrder);
                    setOpenItems([]);
                  }}
                  className={`px-5 py-2.5 rounded-md font-medium cursor-pointer transition-colors ${
                    activeCategory === cat?.displayOrder
                      ? "bg-gray-100 text-black"
                      : "text-gray-600"
                  }`}
                >
                  {cat?.name}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {activeFaqs.map((faq: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-100 text-black border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors cursor-pointer"
                    onClick={() => toggleItem(faq.displayOrder)}
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <motion.div
                      animate={{
                        rotate: openItems.includes(faq.displayOrder) ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={20} className="text-black" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: openItems.includes(faq.displayOrder) ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {/* <div className="px-6 pb-4">
                  <p className="text-black leading-relaxed">{faq.answer}</p>
                </div> */}
                    <div
                      className="px-6 pb-4 text-black leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* 
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
        )} */}
      </div>
    </section>
  );
}
