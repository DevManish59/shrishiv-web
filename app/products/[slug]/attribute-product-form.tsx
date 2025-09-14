"use client";

import { useState, useMemo, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import SizeGuideModal from "@/components/ui/size-guide-modal";
import { AttributeValue } from "@/lib/types";

interface AttributeOption {
  id: number;
  name: string;
  color: string;
  price: number;
  isDefault: boolean;
  images: string[];
  attributeId: number;
}

interface AttributeGroup {
  attributeId: number;
  attributeName: string;
  options: AttributeOption[];
}

interface AttributeProductFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    images: string[];
    discount: number;
    transformedAttributes: AttributeGroup[];
    attributeValues: AttributeValue[];
  };
  onAttributeChange?: (selectedAttributes: {
    selectedOptions: Record<number, AttributeOption>;
    images: string[];
    price: number;
  }) => void;
}

export default function AttributeProductForm({
  product,
  onAttributeChange,
}: AttributeProductFormProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<number, AttributeOption>
  >({});
  const [selectedRingSize, setSelectedRingSize] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  // Initialize with default selections
  useEffect(() => {
    const defaultSelections: Record<number, AttributeOption> = {};

    product.transformedAttributes.forEach((attribute) => {
      const defaultOption =
        attribute.options.find((opt) => opt.isDefault) || attribute.options[0];
      if (defaultOption) {
        defaultSelections[attribute.attributeId] = defaultOption;
      }
    });

    setSelectedOptions(defaultSelections);
  }, [product.transformedAttributes]);

  // Calculate dynamic price based on selected attributes
  const calculatedPrice = useMemo(() => {
    // Get price from the first selected attribute (primary attribute for pricing)
    const firstAttributeId = product.transformedAttributes[0]?.attributeId;
    const firstSelectedOption = firstAttributeId
      ? selectedOptions[firstAttributeId]
      : null;

    return firstSelectedOption ? firstSelectedOption.price : product.price;
  }, [selectedOptions, product.price, product.transformedAttributes]);

  // Get combined images from selected attributes
  const combinedImages = useMemo(() => {
    // Prioritize images from the first selected attribute group
    const firstAttributeId = product.transformedAttributes[0]?.attributeId;
    const firstSelectedOption = firstAttributeId
      ? selectedOptions[firstAttributeId]
      : null;

    if (firstSelectedOption && firstSelectedOption.images.length > 0) {
      return firstSelectedOption.images;
    }

    // Fallback to collecting all images from selected attributes
    const allImages: string[] = [];
    Object.values(selectedOptions).forEach((option) => {
      if (option.images && option.images.length > 0) {
        allImages.push(...option.images);
      }
    });

    // If no attribute images, fall back to product images
    return allImages.length > 0 ? allImages : product.images;
  }, [selectedOptions, product.images, product.transformedAttributes]);

  // Notify parent component of attribute changes
  useEffect(() => {
    if (onAttributeChange && Object.keys(selectedOptions).length > 0) {
      onAttributeChange({
        selectedOptions,
        images: combinedImages,
        price: calculatedPrice,
      });
    }
  }, [selectedOptions, combinedImages, calculatedPrice, onAttributeChange]);

  const handleOptionSelect = (attributeId: number, option: AttributeOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [attributeId]: option,
    }));
  };

  const handleAddToCart = () => {
    if (!selectedRingSize) {
      return;
    }

    // Create a description of selected attributes
    const attributeDescription = Object.values(selectedOptions)
      .map((option) => option.name)
      .join(", ");

    addItem({
      id: product.id,
      name: product.name,
      price: calculatedPrice,
      originalPrice: product.originalPrice,
      image: combinedImages[0] || product.images[0],
      metalType: attributeDescription,
      diamondSize: selectedRingSize,
      ringSize: selectedRingSize,
      isLabGrown: true,
    });

    // Navigate to checkout page
    router.push("/checkout");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Dynamic Attribute Selection */}
      {product.transformedAttributes.map((attribute) => (
        <div key={attribute.attributeId}>
          <p className="text-sm mb-3">
            {attribute.attributeName}:{" "}
            {selectedOptions[attribute.attributeId]?.name || "Choose option"}
          </p>
          <div className="flex flex-wrap gap-2">
            {attribute.options.map((option) => (
              <button
                key={option.id}
                onClick={() =>
                  handleOptionSelect(attribute.attributeId, option)
                }
                className={`cursor-pointer w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                  selectedOptions[attribute.attributeId]?.id === option.id
                    ? "border-black"
                    : "border-gray-200"
                }`}
                style={{
                  backgroundColor: option.color || "transparent",
                  color: option.color ? "#000000" : "black",
                }}
                title={`${option.name} - Rs. ${option.price.toLocaleString()}`}
              >
                {option.name.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      ))}

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
          {["6", "7", "8", "9", "10", "11", "12"].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={!selectedRingSize}
          className="w-full bg-black text-white py-3 hover:bg-black/90 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
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
