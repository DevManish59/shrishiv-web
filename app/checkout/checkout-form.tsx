"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";

// PayPal types
declare global {
  interface Window {
    paypal: {
      Buttons: (config: {
        createOrder: (
          data: unknown,
          actions: {
            order: { create: (orderData: unknown) => Promise<unknown> };
          }
        ) => Promise<unknown>;
        onApprove: (
          data: unknown,
          actions: { order: { capture: () => Promise<unknown> } }
        ) => Promise<unknown>;
        onError: (err: unknown) => void;
      }) => {
        render: (selector: string) => void;
      };
    };
  }
}

interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  country: string;
  // Billing address fields
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingApartment: string;
  billingCity: string;
  billingState: string;
  billingPinCode: string;
  billingCountry: string;
}

interface CheckoutFormProps {
  initialSubtotal: number;
}

export default function CheckoutForm({ initialSubtotal }: CheckoutFormProps) {
  const { items } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    country: "India",
    // Billing address fields
    billingFirstName: "",
    billingLastName: "",
    billingAddress: "",
    billingApartment: "",
    billingCity: "",
    billingState: "",
    billingPinCode: "",
    billingCountry: "India",
  });
  const [discountCode, setDiscountCode] = useState("");
  const [emailSubscribed, setEmailSubscribed] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "credit" | "paypal"
  >("credit");
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);
  const [tipAmount, setTipAmount] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState("");
  const [showTipSupport, setShowTipSupport] = useState(false);

  const subtotal = initialSubtotal;
  const estimatedTax = subtotal * 0.03; // 3% tax
  const total = subtotal + estimatedTax + (tipAmount || 0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTipSelection = (percentage: number | null) => {
    if (percentage === null) {
      setTipAmount(null);
      setCustomTip("");
    } else {
      const amount = (subtotal * percentage) / 100;
      setTipAmount(amount);
      setCustomTip(amount.toString());
    }
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomTip(value);
    setTipAmount(value ? parseFloat(value) : null);
  };

  const handlePayment = () => {
    // Handle payment here
    // For now, redirect to success page
    window.location.href = "/order-success";
  };

  // PayPal integration
  useEffect(() => {
    // Load PayPal script
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=INR";
    script.async = true;
    script.onload = () => {
      // Initialize PayPal buttons
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: function (
              _data: unknown,
              actions: {
                order: { create: (orderData: unknown) => Promise<unknown> };
              }
            ) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: total.toFixed(2),
                      currency_code: "INR",
                    },
                    description: "Shrishiv Jewellery Purchase",
                  },
                ],
              });
            },
            onApprove: function (
              _data: unknown,
              actions: { order: { capture: () => Promise<unknown> } }
            ) {
              return actions.order.capture().then(function (details: unknown) {
                // Handle successful payment
                console.log("Payment completed:", details);
                window.location.href = "/order-success";
              });
            },
            onError: function (err: unknown) {
              console.error("PayPal error:", err);
              alert("Payment failed. Please try again.");
            },
          })
          .render("#paypal-button-container");
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src*="paypal.com"]'
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [total]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 p-4">
      {/* Left Column - Form */}
      <div className="space-y-8">
        {/* Contact Section */}
        <div>
          <h2 className="text-lg font-medium mb-4">Contact</h2>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full border p-3 rounded"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={emailSubscribed}
                onChange={(e) => setEmailSubscribed(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Email me with news and offers</span>
            </label>
          </div>
        </div>

        {/* Delivery Section */}
        <div>
          <h2 className="text-lg font-medium mb-4">Delivery</h2>
          <div className="space-y-4">
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full border p-3 rounded"
            >
              <option value="India">India</option>
            </select>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="border p-3 rounded"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="border p-3 rounded"
              />
            </div>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full border p-3 rounded"
            />

            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleInputChange}
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full border p-3 rounded"
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border p-3 rounded"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border p-3 rounded"
              />
              <input
                type="text"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                placeholder="PIN code"
                className="border p-3 rounded"
              />
            </div>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone (optional)"
              className="w-full border p-3 rounded"
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useShippingAsBilling}
                onChange={(e) => setUseShippingAsBilling(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">
                Use shipping address as billing address
              </span>
            </label>
          </div>
        </div>

        {/* Shipping Address Section - Only show when checkbox is unchecked */}
        {!useShippingAsBilling && (
          <div>
            <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full border p-3 rounded"
              >
                <option value="India">India</option>
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="border p-3 rounded"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="border p-3 rounded"
                />
              </div>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border p-3 rounded"
              />

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="border p-3 rounded"
                />
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="border p-3 rounded"
                />
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  placeholder="PIN code"
                  className="border p-3 rounded"
                />
              </div>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone (optional)"
                className="w-full border p-3 rounded"
              />
            </div>
          </div>
        )}

        {/* Payment Section */}
        <div>
          <h2 className="text-lg font-medium mb-4">Payment</h2>
          <p className="text-sm text-gray-600 mb-4">
            All transactions are secure and encrypted.
          </p>

          <div className="space-y-4">
            <div className="border rounded p-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={selectedPaymentMethod === "credit"}
                  onChange={() => setSelectedPaymentMethod("credit")}
                  className="rounded"
                />
                <span>Credit card</span>
                <div className="flex gap-2 ml-auto">
                  <Image src="/visa.png" alt="Visa" width={32} height={20} />
                  <Image
                    src="/mastercard.png"
                    alt="Mastercard"
                    width={32}
                    height={20}
                  />
                  <Image
                    src="/amex.png"
                    alt="American Express"
                    width={32}
                    height={20}
                  />
                </div>
              </label>

              {selectedPaymentMethod === "credit" && (
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Card number"
                    className="w-full border p-3 rounded"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Expiration date (MM / YY)"
                      className="border p-3 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Security code"
                      className="border p-3 rounded"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Name on card"
                    className="w-full border p-3 rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pay Now Button */}
        <div className="space-y-4">
          <button
            onClick={handlePayment}
            className="w-full bg-black text-white py-3 rounded font-medium hover:bg-black/90 transition-colors"
          >
            Pay now
          </button>

          {/* PayPal Button */}
          <div className="w-full">
            <div
              id="paypal-button-container"
              className="w-full"
              data-amount={total.toFixed(2)}
              data-currency="INR"
            ></div>
          </div>
        </div>

        {/* Tip Section */}
        {showTipSupport && (
          <div>
            <h2 className="text-lg font-medium mb-4">Add tip</h2>
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={showTipSupport}
                onChange={(e) => setShowTipSupport(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">
                Show your support for the team at Shrishiv
              </span>
            </label>

            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={() => handleTipSelection(5)}
                className={`p-2 border rounded text-center ${
                  tipAmount === subtotal * 0.05
                    ? "border-black bg-black text-white"
                    : ""
                }`}
              >
                <div>5%</div>
                <div className="text-sm">
                  ₹{(subtotal * 0.05).toLocaleString()}
                </div>
              </button>
              <button
                onClick={() => handleTipSelection(10)}
                className={`p-2 border rounded text-center ${
                  tipAmount === subtotal * 0.1
                    ? "border-black bg-black text-white"
                    : ""
                }`}
              >
                <div>10%</div>
                <div className="text-sm">
                  ₹{(subtotal * 0.1).toLocaleString()}
                </div>
              </button>
              <button
                onClick={() => handleTipSelection(15)}
                className={`p-2 border rounded text-center ${
                  tipAmount === subtotal * 0.15
                    ? "border-black bg-black text-white"
                    : ""
                }`}
              >
                <div>15%</div>
                <div className="text-sm">
                  ₹{(subtotal * 0.15).toLocaleString()}
                </div>
              </button>
              <button
                onClick={() => handleTipSelection(null)}
                className={`p-2 border rounded text-center ${
                  tipAmount === null ? "border-black bg-black text-white" : ""
                }`}
              >
                None
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-600">Custom tip</label>
                <div className="flex items-center border rounded">
                  <span className="px-3 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={customTip}
                    onChange={handleCustomTipChange}
                    className="flex-1 p-2 border-0 focus:ring-0"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <button
                onClick={() =>
                  handleTipSelection((parseFloat(customTip) / subtotal) * 100)
                }
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Add tip
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              Thank you, we appreciate it.
            </p>
          </div>
        )}
      </div>

      {/* Right Column - Order Summary */}
      <div className="relative">
        <div className="sticky top-12 bg-gray-50 rounded-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
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
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.diamondSize} / {item.metalType}
                  </p>
                  <p className="text-sm">Ring Size(US): {item.ringSize}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Discount code or gift card"
                  className="flex-1 border p-2 rounded"
                />
                <button className="px-4 py-2 border rounded hover:bg-gray-50">
                  Apply
                </button>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free shipping</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated taxes</span>
                <span>₹{estimatedTax.toLocaleString()}</span>
              </div>
              {tipAmount && (
                <div className="flex justify-between">
                  <span>Tip</span>
                  <span>₹{tipAmount.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <div className="text-right">
                  <span className="text-sm text-gray-600">INR</span>{" "}
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
