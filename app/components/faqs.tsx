"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

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

const helpCategories = [
  {
    name: "General",
    display_order: 1,
  },
  {
    name: "Shipping",
    display_order: 2,
  },
  {
    name: "Payments",
    display_order: 3,
  },
  {
    name: "Return And Exchanges",
    display_order: 4,
  },
];

const help = [
  {
    categoryId: 1,
    displayOrder: 1,
    question: "What are lab grown diamonds or lab created diamonds?",
    answer:
      "Lab-grown or lab-created diamonds are artificially produced in a laboratory, using advanced techniques that replicate the natural diamond formation process. They possess the same chemical, physical, and optical characteristics as mined diamonds. The two main methods are High Pressure, High Temperature (HPHT) and Chemical Vapor Deposition (CVD). These diamonds offer an ethical and environmentally friendly alternative to traditional mining, avoiding the associated conflicts and ecological impacts.",
  },
  {
    categoryId: 1,
    displayOrder: 2,
    question: "Is the metal in this product solid or plated?",
    answer:
      "All our rings are crafted from genuine solid sterling silver, 10k, 14k, 18k, and 950 Platinum.",
  },
  {
    categoryId: 1,
    displayOrder: 3,
    question: "Can you create bespoke engagement rings upon request?",
    answer:
      "Yes, we specialize in crafting custom engagement rings. Please reach out to us with your dream engagement ring design, and we will assist in bringing your vision to life.",
  },
  {
    categoryId: 1,
    displayOrder: 4,
    question: "Do you provide engraving services?",
    answer:
      "Yes, we do provide engraving services. You can specify your engraving details in the notes during checkout. If you haven't provided engraving instructions during checkout, please email us the details before the ring is shipped out.",
  },
  {
    categoryId: 1,
    displayOrder: 5,
    question: "Is there a warranty for the rings?",
    answer:
      "Indeed, we offer a 6-month warranty and lifetime servicing for our rings.",
  },
  {
    categoryId: 1,
    displayOrder: 6,
    question: "Do your lab-grown diamonds come with certifications?",
    answer:
      "Yes, we offer IGI certification for lab-grown diamond rings that are over 1 carat. For diamonds below 1 carat, certification is available for an additional fee of USD 94. We provide these certificates to ensure transparency and authenticity, which can also be used for jewelry appraisal purposes.",
  },
  {
    categoryId: 1,
    displayOrder: 7,
    question: "Do you provide pictures of the ring prior to dispatching it?",
    answer:
      "Yes, we will send you pictures of the ring for your approval before it is shipped out.",
  },
  {
    categoryId: 1,
    displayOrder: 8,
    question: "Is it possible to resize my ring?",
    answer:
      "Certainly, we offer ring resizing services. Please contact us for further information and assistance with the process.",
  },
  {
    categoryId: 2,
    displayOrder: 1,
    question: "What is the estimated shipping time for the product?",
    answer:
      "The product requires 7-8 days for shipping. The precise ship-out date for each product is provided on its detail page, where you can refer for an estimated timeline.",
  },
  {
    categoryId: 2,
    displayOrder: 2,
    question: "Is international shipping available?",
    answer:
      "Yes, we offer global shipping, covering major countries such as the USA, Canada, the UK, Australia, Middle Eastern countries, Hong Kong, New Zealand, Japan, Singapore, Malaysia, India, Germany, France, Italy, Sweden, Spain, Belgium, the Netherlands, Brazil, Argentina, Mexico, Denmark, Ireland, Switzerland, Portugal, and many others.",
  },
  {
    categoryId: 2,
    displayOrder: 3,
    question: "How will my order be shipped?",
    answer:
      "We offer two shipping options: economy shipping, which is free and takes about 2 weeks for delivery after the product is shipped, and express shipping, which delivers within 5-7 days after shipment. You can choose your preferred shipping method at checkout. If you didn't select a shipping option, please send us a message and we will provide further instructions.",
  },
  {
    categoryId: 2,
    displayOrder: 4,
    question: "Is a rush order service available?",
    answer:
      "Yes, we offer a rush order service that decreases the shipping time for an additional fee of USD 50. Please get in touch with us before placing your order for this service.",
  },
  {
    categoryId: 3,
    displayOrder: 1,
    question: "What payment methods do you accept?",
    answer:
      "We accept a wide range of payment methods, including all major credit/debit cards (VISA, Mastercard, JCB, Amex, Maestro), as well as PayPal, Google Pay, Apple Pay, Shop Pay, and Bread Payments.",
  },
  {
    categoryId: 3,
    displayOrder: 2,
    question: "Do you provide layaway payment options?",
    answer:
      "Certainly, we offer installment payments through Bread Payments, similar to an after-pay service. The interest may vary depending on the customer, and in some cases, it may be interest-free. If you prefer not to use Bread Payments, you can email us, and we can send you an invoice for 50% of the payment at the time of the order and the remaining 50% at the time of shipping.",
  },
  {
    categoryId: 4,
    displayOrder: 1,
    question: "What is your return policy?",
    answer:
      "We have a 30-day return and exchange policy. If you have any questions or need instructions regarding returns, please contact us. Please ensure that you return the ring with its original packaging.",
  },
  {
    categoryId: 4,
    displayOrder: 2,
    question: "What is the process for exchanging the product?",
    answer:
      "If for any reason you are not satisfied with the product or require modifications, we offer a 30-day exchange policy. Kindly email us for further details and instructions on how to proceed with the exchange.",
  },
  {
    categoryId: 4,
    displayOrder: 3,
    question:
      "How long does it take to receive a refund after the return has been initiated?",
    answer:
      "The refund will be processed within 2 days after we have received and inspected the return.",
  },
];

export default function FAQSection() {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState(
    helpCategories[0].display_order
  );

  const activeFaqs = help
    .filter((faq) => faq.categoryId === activeCategory)
    .sort((a, b) => a.displayOrder - b.displayOrder);
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

        {pathname.includes("/rings/") ? (
          <>
            <div className="flex items-center justify-center mb-6 pb-2">
              {helpCategories.map((cat) => (
                <button
                  key={cat.display_order}
                  onClick={() => {
                    setActiveCategory(cat.display_order);
                    setOpenItems([]);
                  }}
                  className={`px-5 py-2.5 rounded-md font-medium cursor-pointer transition-colors ${
                    activeCategory === cat.display_order
                      ? "bg-gray-100 text-black"
                      : "text-gray-600"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              {activeFaqs.map((faq, index) => (
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
                    <div className="px-6 pb-4">
                      <p className="text-black leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
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
        )}
      </div>
    </section>
  );
}
