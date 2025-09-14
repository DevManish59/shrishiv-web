"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({
  isOpen,
  onClose,
}: SizeGuideModalProps) {
  const [selectedLine, setSelectedLine] = useState("Man");
  const [selectedCategory, setSelectedCategory] = useState("Shirts");
  const [unit, setUnit] = useState<"cm" | "in">("cm");
  const [selectedRegion, setSelectedRegion] = useState("EUR");
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);

  const regions = ["EUR", "CN", "MEX", "IT", "US", "GB"];

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".region-dropdown") &&
        !target.closest(".region-button")
      ) {
        setShowRegionDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sizeData = {
    headers: ["SIZE", "NECK", "BUST", "WAIST"],
    rows: [
      { size: "XS", neck: "36.6", bust: "96", waist: "76" },
      { size: "S", neck: "37.8", bust: "100", waist: "80" },
      { size: "M", neck: "39", bust: "104", waist: "84" },
      { size: "L", neck: "40.2", bust: "110", waist: "90" },
      { size: "XL", neck: "41.4", bust: "116", waist: "96" },
      { size: "XXL", neck: "42.6", bust: "120", waist: "100" },
    ],
  };

  const internationalSizes = {
    headers: ["CN", "DE", "EUR", "FR", "GB", "IT", "KR", "MEX", "US"],
    rows: [
      {
        cn: "175/92A",
        de: "XS",
        eur: "XS",
        fr: "XS",
        gb: "XS",
        it: "XS",
        kr: "90",
        mex: "ECH",
        us: "XS",
      },
      {
        cn: "180/96A",
        de: "S",
        eur: "S",
        fr: "S",
        gb: "S",
        it: "S",
        kr: "95",
        mex: "CH",
        us: "S",
      },
      {
        cn: "180/100A",
        de: "M",
        eur: "M",
        fr: "M",
        gb: "M",
        it: "M",
        kr: "100",
        mex: "M",
        us: "M",
      },
      {
        cn: "185/104A",
        de: "L",
        eur: "L",
        fr: "L",
        gb: "L",
        it: "L",
        kr: "105",
        mex: "G",
        us: "L",
      },
      {
        cn: "190/108A",
        de: "XL",
        eur: "XL",
        fr: "XL",
        gb: "XL",
        it: "XL",
        kr: "110",
        mex: "EG",
        us: "XL",
      },
      {
        cn: "190/112A",
        de: "XXL",
        eur: "XXL",
        fr: "XXL",
        gb: "XXL",
        it: "XXL",
        kr: "115",
        mex: "EEG",
        us: "XXL",
      },
    ],
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-medium">SIZE GUIDE</h2>
            <button
              onClick={onClose}
              className="p-2 hover:opacity-70 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-64px)]">
          <div className="p-6">
            {/* Line and Category Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm mb-2">LINE</label>
                <div className="relative">
                  <select
                    value={selectedLine}
                    onChange={(e) => setSelectedLine(e.target.value)}
                    className="w-full border p-2 pr-8 appearance-none bg-white cursor-pointer"
                  >
                    <option value="Man">Man</option>
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
                <label className="block text-sm mb-2">
                  GARMENTS AND ACCESSORIES
                </label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full border p-2 pr-8 appearance-none bg-white cursor-pointer"
                  >
                    <option value="Shirts">Shirts</option>
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

            {/* Region and Unit Selection */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <button
                  onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                  className="region-button flex items-center gap-1 p-2 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  {selectedRegion}
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      showRegionDropdown ? "rotate-180" : ""
                    }`}
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
                </button>
                {showRegionDropdown && (
                  <div className="region-dropdown absolute top-full left-0 mt-1 w-24 bg-white border shadow-lg z-20">
                    {regions.map((region) => (
                      <button
                        key={region}
                        onClick={() => {
                          setSelectedRegion(region);
                          setShowRegionDropdown(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer ${
                          selectedRegion === region ? "bg-gray-100" : ""
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={unit === "cm"}
                    onChange={() => setUnit("cm")}
                    className="form-radio"
                  />
                  <span>cm</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={unit === "in"}
                    onChange={() => setUnit("in")}
                    className="form-radio"
                  />
                  <span>in</span>
                </label>
              </div>
            </div>

            {/* Size Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {sizeData.headers.map((header) => (
                      <th
                        key={header}
                        className="text-left p-3 border-b font-medium"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeData.rows.map((row) => (
                    <tr key={row.size} className="border-b last:border-b-0">
                      <td className="p-3">{row.size}</td>
                      <td className="p-3">
                        {unit === "cm"
                          ? row.neck
                          : (parseFloat(row.neck) / 2.54).toFixed(1)}
                      </td>
                      <td className="p-3">
                        {unit === "cm"
                          ? row.bust
                          : (parseFloat(row.bust) / 2.54).toFixed(1)}
                      </td>
                      <td className="p-3">
                        {unit === "cm"
                          ? row.waist
                          : (parseFloat(row.waist) / 2.54).toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* How to Measure */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-4">
                HOW TO MEASURE YOURSELF
              </h3>
              <div className="flex flex-wrap gap-4">
                <div className="w-[132px]">
                  <div className="w-full h-[96px] relative mb-2 bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      Neck measurement
                    </div>
                  </div>
                  <h4 className="w-full text-sm font-medium mb-1">Neck</h4>
                  <p className="w-full text-xs text-gray-600">
                    Measure around your neck where you are going to button the
                    shirt.
                  </p>
                </div>
                <div className="w-[132px]">
                  <div className="h-[96px] relative mb-2 bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      Bust measurement
                    </div>
                  </div>
                  <h4 className="w-full text-sm font-medium mb-1">Bust</h4>
                  <p className="w-full text-xs text-gray-600">
                    Measure around the bust at the most protruding point.
                  </p>
                </div>
                <div className="w-[132px]">
                  <div className="h-[96px] relative mb-2 bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                      Waist measurement
                    </div>
                  </div>
                  <h4 className="w-full text-sm font-medium mb-1">Waist</h4>
                  <p className="w-full text-xs text-gray-600">
                    Measure round the narrowest part of the abdomen.
                  </p>
                </div>
              </div>
            </div>

            {/* International Size Equivalents */}
            <div>
              <h3 className="text-sm font-medium mb-4">
                INTERNATIONAL SIZE EQUIVALENTS
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      {internationalSizes.headers.map((header) => (
                        <th
                          key={header}
                          className="text-left p-3 border-b font-medium"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {internationalSizes.rows.map((row, index) => (
                      <tr key={index} className="border-b last:border-b-0">
                        <td className="p-3">{row.cn}</td>
                        <td className="p-3">{row.de}</td>
                        <td className="p-3">{row.eur}</td>
                        <td className="p-3">{row.fr}</td>
                        <td className="p-3">{row.gb}</td>
                        <td className="p-3">{row.it}</td>
                        <td className="p-3">{row.kr}</td>
                        <td className="p-3">{row.mex}</td>
                        <td className="p-3">{row.us}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
