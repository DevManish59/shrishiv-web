"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Check,
  Plus,
  Minus,
  Share2,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";

interface ProductInfoProps {
  product: {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    rating: number;
    reviews: number;
    description: string;
    colors: { name: string; value: string }[];
    sizes: string[];
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 mb-2"
        >
          {product.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center space-x-4 mb-4"
        >
          <div className="flex items-center space-x-1">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600 text-sm">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          <span className="text-green-600 text-sm font-medium">In Stock</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center space-x-4 mb-6"
        >
          <span className="text-3xl font-bold text-gray-900">
            {product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              {product.originalPrice}
            </span>
          )}
          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-semibold">
            29% OFF
          </span>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-gray-700"
      >
        {product.description}
      </motion.p>

      {/* Color Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="pt-4"
      >
        <h3 className="text-lg font-semibold mb-3">Color</h3>
        <div className="flex space-x-3">
          {product.colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(index)}
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedColor === index
                  ? "border-blue-500 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {selectedColor === index && (
                <Check size={16} className="text-white" />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Size Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="pt-4"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Size</h3>
          <button className="text-sm text-blue-600 hover:underline">
            Size Guide
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 px-4 border rounded-lg font-medium transition-all ${
                selectedSize === size
                  ? "border-blue-500 bg-blue-50 text-blue-600 ring-2 ring-blue-200"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Quantity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="pt-4"
      >
        <h3 className="text-lg font-semibold mb-3">Quantity</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 hover:bg-gray-100 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 font-medium w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {quantity > 1 ? `${quantity} items` : `${quantity} item`}
          </span>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="space-y-3 pt-6"
      >
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
              isAddedToCart
                ? "bg-green-600 text-white"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {isAddedToCart ? (
              <>
                <Check size={18} />
                Added to Cart
              </>
            ) : (
              "Add to Cart"
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
          >
            <Share2 size={20} />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Buy Now
        </motion.button>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200 mt-6"
      >
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
          <div className="p-2 bg-blue-100 rounded-full mb-2">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-center">Free Shipping</p>
          <p className="text-xs text-gray-500 text-center">
            On orders over $50
          </p>
        </div>
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
          <div className="p-2 bg-green-100 rounded-full mb-2">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm font-medium text-center">Secure Payment</p>
          <p className="text-xs text-gray-500 text-center">100% protected</p>
        </div>
        <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
          <div className="p-2 bg-purple-100 rounded-full mb-2">
            <RefreshCw className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm font-medium text-center">Easy Returns</p>
          <p className="text-xs text-gray-500 text-center">30-day policy</p>
        </div>
      </motion.div>
    </div>
  );
}
