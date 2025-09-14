"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Home } from "lucide-react";

// Mock order data - in real app, this would come from URL params or API
const mockOrderData = {
  orderId: "ORD-2024-001",
  orderDate: "2024-02-15",
  status: "confirmed",
  items: [
    {
      id: "1",
      name: "Lab Grown Diamond Solitaire Ring",
      price: 29800,
      originalPrice: 39900,
      image: "https://example.com/image1.jpg",
      quantity: 1,
      metalType: "14K Gold",
      diamondSize: "1.00 CT",
      ringSize: "6",
      isLabGrown: true,
    },
  ],
  customer: {
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main Street",
    apartment: "Apt 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400001",
    phone: "+91 98765 43210",
    country: "India",
  },
  billing: {
    firstName: "John",
    lastName: "Doe",
    address: "456 Business Avenue",
    apartment: "Suite 200",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400002",
    country: "India",
  },
  payment: {
    method: "Credit Card",
    status: "paid",
    transactionId: "TXN-2024-001",
  },
  pricing: {
    subtotal: 29800,
    shipping: 0,
    tax: 894,
    tip: 0,
    total: 30694,
  },
  delivery: {
    method: "Standard Shipping",
    estimatedDelivery: "3-5 business days",
  },
};

export default function CheckoutSuccessClient() {
  const router = useRouter();

  const handleHappyShopping = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thank you for your order!
          </h1>
          <p className="text-gray-600 mb-4">
            Your order has been confirmed and will be processed shortly.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <p className="text-green-800 font-medium">
              Order #{mockOrderData.orderId}
            </p>
            <p className="text-green-600 text-sm">
              Confirmed on{" "}
              {new Date(mockOrderData.orderDate).toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Order Details
          </h2>

          {/* Products */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Products</h3>
            <div className="space-y-4">
              {mockOrderData.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/logo.png";
                        target.className = "object-contain rounded";
                      }}
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      {item.diamondSize} / {item.metalType}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ring Size(US): {item.ringSize}
                    </p>
                    {item.isLabGrown && (
                      <p className="text-sm text-green-600">
                        Lab Grown Diamond
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ₹{item.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Shipping Address
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">
                  {mockOrderData.customer.firstName}{" "}
                  {mockOrderData.customer.lastName}
                </p>
                <p className="text-gray-600">
                  {mockOrderData.customer.address}
                </p>
                {mockOrderData.customer.apartment && (
                  <p className="text-gray-600">
                    {mockOrderData.customer.apartment}
                  </p>
                )}
                <p className="text-gray-600">
                  {mockOrderData.customer.city}, {mockOrderData.customer.state}{" "}
                  {mockOrderData.customer.pinCode}
                </p>
                <p className="text-gray-600">
                  {mockOrderData.customer.country}
                </p>
                <p className="text-gray-600">{mockOrderData.customer.phone}</p>
                <p className="text-gray-600">{mockOrderData.customer.email}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Billing Address
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">
                  {mockOrderData.billing.firstName}{" "}
                  {mockOrderData.billing.lastName}
                </p>
                <p className="text-gray-600">{mockOrderData.billing.address}</p>
                {mockOrderData.billing.apartment && (
                  <p className="text-gray-600">
                    {mockOrderData.billing.apartment}
                  </p>
                )}
                <p className="text-gray-600">
                  {mockOrderData.billing.city}, {mockOrderData.billing.state}{" "}
                  {mockOrderData.billing.pinCode}
                </p>
                <p className="text-gray-600">{mockOrderData.billing.country}</p>
              </div>
            </div>
          </div>

          {/* Pricing Summary and Payment Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      ₹{mockOrderData.pricing.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free shipping</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{mockOrderData.pricing.tax.toLocaleString()}</span>
                  </div>
                  {mockOrderData.pricing.tip > 0 && (
                    <div className="flex justify-between">
                      <span>Tip</span>
                      <span>₹{mockOrderData.pricing.tip.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>
                        ₹{mockOrderData.pricing.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Payment Information
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{mockOrderData.payment.method}</p>
                <p className="text-green-600 capitalize">
                  {mockOrderData.payment.status}
                </p>
                <p className="text-sm text-gray-600">
                  Transaction ID: {mockOrderData.payment.transactionId}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Happy Shopping Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={handleHappyShopping}
            className="bg-black text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto"
          >
            <Home className="w-5 h-5" />
            Happy Shopping
          </button>
        </motion.div>
      </div>
    </div>
  );
}
