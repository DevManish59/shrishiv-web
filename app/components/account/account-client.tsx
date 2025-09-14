"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Package, LogOut } from "lucide-react";
import { Order } from "@/lib/types";

export default function AccountClient() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"orders" | "logout">("orders");

  // Mock user data for testing
  const mockUser = {
    id: "user123",
    email: "john.doe@example.com",
    createdAt: "2024-01-01T00:00:00.000Z",
  };

  // Use mock user if no real user is logged in
  const currentUser = user || mockUser;

  const handleLogout = () => {
    if (user) {
      logout();
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-serif text-gray-900 mb-4">
            Hi, {currentUser.email.split("@")[0]}
          </h1>
          <p className="text-gray-600">Welcome to your account dashboard</p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="flex bg-white rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab("orders")}
              className={`cursor-pointer flex items-center space-x-2 px-6 py-3 rounded-l-lg transition-colors ${
                activeTab === "orders"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order History</span>
            </button>
            <div className="w-px bg-gray-200"></div>
            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center space-x-2 px-6 py-3 rounded-r-lg text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6"
        >
          {activeTab === "orders" && <OrderHistory />}
        </motion.div>
      </div>
    </div>
  );
}

function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for testing - replace with real API calls when authentication is implemented
    const mockOrders: Order[] = [
      {
        id: "1",
        userId: "user1",
        items: [
          {
            id: "item1",
            productId: "prod1",
            quantity: 1,
            price: 2500,
          },
        ],
        subtotal: 2500,
        taxAmount: 250,
        shippingAmount: 0,
        couponDiscount: 0,
        total: 2750,
        status: "delivered",
        paymentStatus: "paid",
        paymentMethod: "card",
        shippingAddress: {
          firstName: "John",
          lastName: "Doe",
          address1: "123 Main St",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "USA",
        },
        billingAddress: {
          firstName: "John",
          lastName: "Doe",
          address1: "123 Main St",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "USA",
        },
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        id: "2",
        userId: "user1",
        items: [
          {
            id: "item2",
            productId: "prod2",
            quantity: 2,
            price: 1800,
          },
        ],
        subtotal: 3600,
        taxAmount: 360,
        shippingAmount: 0,
        couponDiscount: 200,
        total: 3760,
        status: "processing",
        paymentStatus: "paid",
        paymentMethod: "card",
        shippingAddress: {
          firstName: "John",
          lastName: "Doe",
          address1: "123 Main St",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "USA",
        },
        billingAddress: {
          firstName: "John",
          lastName: "Doe",
          address1: "123 Main St",
          city: "New York",
          state: "NY",
          postalCode: "10001",
          country: "USA",
        },
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-01"),
      },
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-lg p-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No orders yet
        </h3>
        <p className="text-gray-600">
          When you place your first order, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Order History</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const isExpanded = true;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* Order Header */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-gray-900">Order #{order.id}</h3>
            <p className="text-sm text-gray-600">
              Placed on {order.createdAt.toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Order Details */}
      {isExpanded && (
        <div className="px-6 py-4">
          {/* Products Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Products</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="relative w-20 h-20">
                    <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Product</span>
                    </div>
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      Product {item.productId}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Address Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Shipping Address
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>
                <p className="text-gray-600">
                  {order.shippingAddress.address1}
                </p>
                {order.shippingAddress.address2 && (
                  <p className="text-gray-600">
                    {order.shippingAddress.address2}
                  </p>
                )}
                <p className="text-gray-600">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && (
                  <p className="text-gray-600">{order.shippingAddress.phone}</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Billing Address
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">
                  {order.billingAddress.firstName}{" "}
                  {order.billingAddress.lastName}
                </p>
                <p className="text-gray-600">{order.billingAddress.address1}</p>
                {order.billingAddress.address2 && (
                  <p className="text-gray-600">
                    {order.billingAddress.address2}
                  </p>
                )}
                <p className="text-gray-600">
                  {order.billingAddress.city}, {order.billingAddress.state}{" "}
                  {order.billingAddress.postalCode}
                </p>
                <p className="text-gray-600">{order.billingAddress.country}</p>
                {order.billingAddress.phone && (
                  <p className="text-gray-600">{order.billingAddress.phone}</p>
                )}
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
                    <span>₹{order.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{order.shippingAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{order.taxAmount.toLocaleString()}</span>
                  </div>
                  {order.couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{order.couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{order.total.toLocaleString()}</span>
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
                <p className="font-medium capitalize">{order.paymentMethod}</p>
                <p
                  className={`capitalize ${
                    order.paymentStatus === "paid"
                      ? "text-green-600"
                      : order.paymentStatus === "failed"
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {order.paymentStatus}
                </p>
                {order.paymentId && (
                  <p className="text-sm text-gray-600">
                    Transaction ID: {order.paymentId}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
