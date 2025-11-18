"use client";

import { motion } from "framer-motion";

interface ProductDescriptionProps {
  product: {
    description: string;
    features: string[];
  };
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
          Product Details
        </h2>
        <p className="text-gray-700 leading-relaxed mb-6">
          {product.description}
        </p>

        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
        <ul className="space-y-3">
          {product.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start text-gray-700 space-x-3"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
          Size & Fit
        </h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-3">Size Guide</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-medium">Size</th>
                  <th className="text-left py-3 px-4 font-medium">
                    Chest (in)
                  </th>
                  <th className="text-left py-3 px-4 font-medium">
                    Length (in)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">XS</td>
                  <td className="py-3 px-4">32-34</td>
                  <td className="py-3 px-4">26</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">S</td>
                  <td className="py-3 px-4">36-38</td>
                  <td className="py-3 px-4">27</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">M</td>
                  <td className="py-3 px-4">38-40</td>
                  <td className="py-3 px-4">28</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4">L</td>
                  <td className="py-3 px-4">40-42</td>
                  <td className="py-3 px-4">29</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">XL</td>
                  <td className="py-3 px-4">42-44</td>
                  <td className="py-3 px-4">30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Fabric & Care</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>100% organic cotton</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Machine wash cold with similar colors</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Tumble dry low or line dry</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>•</span>
              <span>Iron on low heat if needed</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
