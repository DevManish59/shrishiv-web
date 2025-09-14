"use client";

import { useState } from "react";
import AttributeProductForm from "./attribute-product-form";
import ProductForm from "./product-form";
import ProductHeader from "./product-header";
import ProductStickyBar from "./product-sticky-bar";

interface AttributeOption {
  id: number;
  name: string;
  color: string;
  price: number;
  isDefault: boolean;
  images: string[];
  attributeId: number;
}

interface ClientProductFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  onImagesChange?: (images: string[]) => void;
}

export function ClientProductForm({
  product,
  onImagesChange,
}: ClientProductFormProps) {
  const [dynamicPrice, setDynamicPrice] = useState(product.price);

  const handleAttributeChange = (selectedAttributes: {
    selectedOptions: Record<number, AttributeOption>;
    images: string[];
    price: number;
  }) => {
    setDynamicPrice(selectedAttributes.price);

    // Notify parent component about image changes
    if (onImagesChange) {
      onImagesChange(selectedAttributes.images);
    }
  };

  // Use the new attribute-based form if we have transformed attributes
  const hasTransformedAttributes =
    product.transformedAttributes && product.transformedAttributes.length > 0;

  return (
    <>
      {/* Product Header with dynamic price */}
      <ProductHeader product={{ ...product, price: dynamicPrice }} />

      {/* Product Form with dynamic functionality */}
      {hasTransformedAttributes ? (
        <AttributeProductForm
          product={product}
          onAttributeChange={handleAttributeChange}
        />
      ) : (
        <ProductForm
          product={product}
          onAttributeChange={(attrs) => {
            handleAttributeChange({
              selectedOptions: {},
              images: attrs.images,
              price: attrs.price,
            });
          }}
        />
      )}

      {/* Sticky Bar with dynamic price */}
      <ProductStickyBar product={{ ...product, price: dynamicPrice }} />
    </>
  );
}
