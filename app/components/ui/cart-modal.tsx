"use client";

import { X, RotateCcw, BadgeCheck, Wallet, ShoppingCart } from "lucide-react";
import Image from "next/image";
// import { useCart } from "@/contexts/CartContext";
import { useCart } from "@/contexts/LocalStorageCartContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartModal() {
  const { isOpen, closeCart, items, removeItem, subtotal, itemCount } =
    useCart();

  const router = useRouter();

  // Lock scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${scrollY}px`;
    } else {
      // Restore scroll position when cart is closed
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    // For now, we'll directly navigate to checkout
    router.push("/checkout");
    closeCart();

    /* Commented API integration for later
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          subtotal,
          userId: "user123", // In a real app, get this from auth context
        }),
      });

      const { sessionId } = await response.json();
      if (sessionId) {
        router.push(`/checkout?session=${sessionId}`);
        closeCart();
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      // Show error toast or message to user
    }
    */
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={closeCart} />

      <div className="absolute inset-y-0 right-0 flex max-w-full">
        <div className="w-screen max-w-[600px] transform transition-transform duration-500 ease-in-out translate-x-0">
          <div className="flex h-full flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-6 border-b">
              <h2 className="text-lg font-medium">Cart ({itemCount} items)</h2>
              <button onClick={closeCart} className="p-2 hover:opacity-70">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col justify-between flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <div className="w-24 h-24 mb-6 text-gray-300">
                    <ShoppingCart className="w-full h-full" strokeWidth={1} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-8">
                    You have no items in your shopping cart.
                  </p>
                  <button
                    onClick={closeCart}
                    className="bg-black text-white px-8 py-3 rounded font-medium hover:bg-black/90 transition-colors"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    {/* Cart Items */}
                    <div className="divide-y divide-gray-100">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 pb-0 bg-white shadow-sm hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex gap-4">
                            <div className="w-24 h-24 relative flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h3 className="text-sm font-medium">
                                    {item.name}
                                  </h3>
                                  {item.isLabGrown && (
                                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded mt-1">
                                      Lab Grown Diamond
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="mt-2 space-y-1 text-sm text-gray-600">
                                <p>
                                  <span className="font-bold text-black">
                                    Diamond Size:{" "}
                                  </span>
                                  {item.diamondSize}
                                </p>
                                <p>
                                  <span className="font-bold text-black">
                                    Metal Type:{" "}
                                  </span>
                                  {item.metalType}
                                </p>
                                <p>
                                  <span className="font-bold text-black">
                                    Ring Size(US):
                                  </span>
                                  {item.ringSize}
                                </p>
                                <div className="flex items-center gap-4 mb-2">
                                  <p className="font-bold text-black">
                                    Price: Rs. {item.price}
                                  </p>
                                  <p className=" text-gray-500 line-through font-bold">
                                    Rs. {item.originalPrice}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 mt-2 flex items-center justify-end">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm underline uppercase flex items-center gap-1"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Policies */}
                  <div>
                    <div className="p-4">
                      <div className="flex justify-center gap-4 text-sm">
                        <button className="underline">REFUND POLICY</button>
                        <button className="underline">SHIPPING POLICY</button>
                        <button className="underline">PRIVACY POLICY</button>
                        <button className="underline">TERMS OF SERVICE</button>
                      </div>
                    </div>

                    {/* Guarantees */}
                    <div className="p-4 grid grid-cols-3 gap-4 text-center border-t">
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          <RotateCcw className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium">
                          30 Days return policy
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          <Wallet className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium">
                          100% Money back guarantee
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-center">
                          <BadgeCheck className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium">Quality assured</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex items-center justify-between text-lg font-medium">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-3 font-medium rounded hover:bg-black/90 transition-colors"
                >
                  CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
