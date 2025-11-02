"use client";

import { useState } from "react";
import Link from "next/link";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError(true);
      return;
    }
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
    setError(false);
  };

  return (
    <div className="w-full bg-white py-10 md:py-16">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="text-center">
          <h2 className="text-sm font-normal tracking-wider mb-6">
            10% OFF YOUR NEXT PURCHASE BY SUBSCRIBING TO THE NEWSLETTER
          </h2>

          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(false);
                  }}
                  placeholder="E-mail"
                  className={`w-full px-4 py-2 border text-sm ${
                    error ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:border-gray-500`}
                />
                {error && (
                  <p className="text-xs text-red-500 mt-1 text-left">
                    Complete this field to continue
                  </p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  // className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition-colors text-sm cursor-pointer"
                  className="md:w-auto w-full px-6 py-[9px] bg-black text-white hover:bg-gray-800 transition-colors text-sm cursor-pointer self-start"
                >
                  Sign up now
                </button>
              </div>
            </div>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            By subscribing you confirm that you have read the{" "}
            <Link href="/p/privacy-policy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
