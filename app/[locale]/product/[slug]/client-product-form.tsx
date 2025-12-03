"use client";

import { useState } from "react";
import AttributeProductForm from "./attribute-product-form";
import ProductForm from "./product-form";
// import ProductHeader from "./product-header";
import ProductStickyBar from "./product-sticky-bar";
import { useLocale } from "@/contexts/LocalProvider";

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
  sizeChartData?: any;
}

export function ClientProductForm({
  product,
  onImagesChange,
  sizeChartData,
}: ClientProductFormProps) {
  const { currentCountry } = useLocale();
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

  console.log("product+DynamicPrice", dynamicPrice);

  return (
    <>
      {/* Product Header with dynamic price */}
      {/* <ProductHeader product={{ ...product, price: dynamicPrice }} /> */}
      <div>
        <h1 className="text-2xl font-medium mb-4">{product.name}</h1>
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2">
            <p className="text-lg">
              From {currentCountry?.currencySymbol || "Rs."}{" "}
              {product.discount > 0
                ? (
                    dynamicPrice -
                    (dynamicPrice * product.discount) / 100
                  ).toLocaleString()
                : dynamicPrice.toLocaleString()}
            </p>{" "}
            {product.discount > 0 && (
              <p className="text-2xl font-medium text-gray-500 line-through">
                {currentCountry?.currencySymbol || "Rs."}{" "}
                {dynamicPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2">{product.reviewCount}</span>
          </div>
          <p className="text-sm">SKU: {product.sku}</p>
        </div>
      </div>

      {/* Product Form with dynamic functionality */}
      {hasTransformedAttributes ? (
        <AttributeProductForm
          product={product}
          onAttributeChange={(selectedAttributes) => {
            console.log("selectedAttributes+NNNNNN", selectedAttributes);
            handleAttributeChange(selectedAttributes);
          }}
          sizeChartData={sizeChartData}
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
