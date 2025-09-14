"use client";

import { useState, useMemo, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import SizeGuideModal from "@/components/ui/size-guide-modal";
import { calculateProductPrice, getCombinedAttributeImages } from "@/lib/utils";
import { AttributeValue } from "@/lib/types";

interface ProductFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    images: string[];
    metalTypes: {
      key: string;
      name: string;
      value: string;
      color: string;
      textColor: string;
      price: number;
    }[];
    diamondSizes: {
      size: string;
      available: boolean;
      price: number;
    }[];
    ringSizes: {
      size: string;
      available: boolean;
    }[];
    attributeValues: AttributeValue[];
  };
  onAttributeChange?: (selectedAttributes: {
    metalType: string;
    diamondSize: string;
    images: string[];
    price: number;
  }) => void;
  showPrice?: boolean;
}

export default function ProductForm({
  product,
  onAttributeChange,
}: ProductFormProps) {
  const [selectedMetalType, setSelectedMetalType] = useState("SL");
  const [selectedDiamondSize, setSelectedDiamondSize] = useState<string | null>(
    null
  );
  const [selectedRingSize, setSelectedRingSize] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  // Calculate dynamic price based on selected attributes
  const calculatedPrice = useMemo(() => {
    const selectedAttributes: { [key: string]: number } = {};

    // Add metal type price
    const selectedMetal = product.metalTypes.find(
      (m) => m.key === selectedMetalType
    );
    if (selectedMetal) {
      selectedAttributes.metal = selectedMetal.price;
    }

    // Add diamond size price
    const selectedDiamond = product.diamondSizes.find(
      (d) => d.size === selectedDiamondSize
    );
    if (selectedDiamond) {
      selectedAttributes.diamond = selectedDiamond.price;
    }

    return calculateProductPrice(product.price, selectedAttributes);
  }, [
    product.price,
    product.metalTypes,
    product.diamondSizes,
    selectedMetalType,
    selectedDiamondSize,
  ]);

  // Get selected attribute IDs for image fetching
  const selectedAttributeIds = useMemo(() => {
    const ids: number[] = [];

    // Get metal type attribute ID
    const selectedMetal = product.metalTypes.find(
      (m) => m.key === selectedMetalType
    );
    if (selectedMetal && selectedMetal.key.startsWith("ATTR-")) {
      const attrId = parseInt(selectedMetal.key.replace("ATTR-", ""));
      if (!isNaN(attrId)) ids.push(attrId);
    }

    // Get diamond size attribute ID
    const selectedDiamond = product.diamondSizes.find(
      (d) => d.size === selectedDiamondSize
    );
    if (selectedDiamond) {
      // Find the corresponding attribute value
      const attrValue = product.attributeValues.find(
        (attr) =>
          attr.attributeName === selectedDiamond.size ||
          `Option ${attr.id}` === selectedDiamond.size
      );
      if (attrValue) ids.push(attrValue.id);
    }

    return ids;
  }, [
    selectedMetalType,
    selectedDiamondSize,
    product.metalTypes,
    product.diamondSizes,
    product.attributeValues,
  ]);

  // Get combined images from selected attributes
  const combinedImages = useMemo(() => {
    return getCombinedAttributeImages(
      selectedAttributeIds,
      product.attributeValues
    );
  }, [selectedAttributeIds, product.attributeValues]);

  // Notify parent component of attribute changes
  useEffect(() => {
    if (onAttributeChange) {
      onAttributeChange({
        metalType: selectedMetalType,
        diamondSize: selectedDiamondSize || "",
        images: combinedImages,
        price: calculatedPrice,
      });
    }
  }, [
    selectedMetalType,
    selectedDiamondSize,
    combinedImages,
    calculatedPrice,
    onAttributeChange,
  ]);

  const handleAddToCart = () => {
    if (!selectedDiamondSize || !selectedRingSize) {
      // Show inline validation instead of alert
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: calculatedPrice, // Use calculated price instead of base price
      originalPrice: product.originalPrice,
      image: product.images[0],
      metalType:
        product.metalTypes.find((m) => m.key === selectedMetalType)?.value ||
        "",
      diamondSize: selectedDiamondSize,
      ringSize: selectedRingSize,
      isLabGrown: true,
    });

    // Navigate to checkout page
    router.push("/checkout");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Metal Type Selection */}
      <div>
        <p className="text-sm mb-3">
          Metal Type:{" "}
          {product.metalTypes.find((m) => m.key === selectedMetalType)?.value}
        </p>
        <div className="flex flex-wrap gap-2">
          {product.metalTypes.map((metal) => (
            <button
              key={metal.key}
              onClick={() => setSelectedMetalType(metal.key)}
              data-metal-key={metal.key}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium
                ${
                  selectedMetalType === metal.key
                    ? "border-black"
                    : "border-gray-200"
                }`}
              style={{
                backgroundColor: metal?.color || "transparent",
                color: metal?.textColor || "black",
              }}
            >
              {metal.name}
            </button>
          ))}
        </div>
      </div>

      {/* Diamond Size Selection */}
      <div>
        <div className="text-sm mb-3">
          <p className={`${selectedDiamondSize ? "" : "text-red-500"}`}>
            Diamond Size: Choose option
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {product.diamondSizes.map((size) => (
            <button
              key={size.size}
              onClick={() => setSelectedDiamondSize(size.size)}
              className={`py-2 px-4 text-sm border rounded-lg ${
                selectedDiamondSize === size.size
                  ? "border-black bg-black text-white"
                  : "border-gray-200 hover:border-gray-300"
              } ${!size.available ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!size.available}
            >
              {size.size}
            </button>
          ))}
        </div>
      </div>

      {/* Ring Size Selection */}
      <div className="w-full lg:w-[50%]">
        <div className="flex justify-between items-center mb-3">
          <p className={`${selectedRingSize ? "" : "text-red-500"} text-sm`}>
            Ring Size (US)
          </p>
          <button
            onClick={() => setShowSizeGuide(true)}
            className="text-sm underline cursor-pointer"
          >
            SIZE CHART
          </button>
        </div>
        <select
          value={selectedRingSize || ""}
          onChange={(e) => setSelectedRingSize(e.target.value)}
          className="w-full border border-gray-200 p-2 text-sm"
        >
          <option value="">Choose Ring size</option>
          {product.ringSizes.map((size) => (
            <option
              key={size.size}
              value={size.size}
              disabled={!size.available}
            >
              {size.size}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className="w-full bg-black text-white py-3 hover:bg-black/90 cursor-pointer"
        >
          ADD TO CART
        </button>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
      />
    </div>
  );
}
