"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface CountrySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Country {
  name: string;
  languages: { code: string; name: string }[];
}

export default function CountrySelectorModal({
  isOpen,
  onClose,
}: CountrySelectorModalProps) {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const countries: Country[] = [
    {
      name: "India",
      languages: [
        { code: "en", name: "English" },
        { code: "hi", name: "Hindi" },
      ],
    },
    {
      name: "United States",
      languages: [
        { code: "en", name: "English" },
        { code: "es", name: "Español" },
      ],
    },
    // Add more countries as needed
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg">
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-lg">WHICH COUNTRY WOULD LIKE TO SHOP IN?</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6 mb-6">
            <div>
              <label className="block text-sm mb-2">
                Select a country or region
              </label>
              <div className="relative">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full border p-2 pr-8 appearance-none bg-white cursor-pointer"
                >
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Select a language</label>
              <div className="relative">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full border p-2 pr-8 appearance-none bg-white cursor-pointer"
                >
                  {countries
                    .find((country) => country.name === selectedCountry)
                    ?.languages.map((language) => (
                      <option key={language.code} value={language.code}>
                        {language.name}
                      </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-black text-white py-3 hover:opacity-90 cursor-pointer"
          >
            Accept
          </button>

          <p className="mt-4 text-sm text-gray-600">
            By continuing, you accept the{" "}
            <button className="underline cursor-pointer">
              Terms & Conditions
            </button>{" "}
            of your chosen country or region.
          </p>
        </div>
      </div>
    </div>
  );
}
