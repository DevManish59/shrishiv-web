"use client";

import { useState } from "react";
import DynamicProductGallery from "./dynamic-product-gallery";
import { ClientProductForm } from "./client-product-form";
import ProductDescription from "./product-description";
import { TransformedProduct } from "@/lib/types";

interface ProductPageWrapperProps {
  product: TransformedProduct;
}

export default function ProductPageWrapper({
  product,
}: ProductPageWrapperProps) {
  const [dynamicImages, setDynamicImages] = useState<string[]>(
    product.images || []
  );

  const handleImagesChange = (images: string[]) => {
    setDynamicImages(images);
  };

  return (
    <div id="product-details" className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left Column - Image Gallery */}
      <DynamicProductGallery
        product={{ ...product, images: product.images }}
        dynamicImages={dynamicImages}
      />

      {/* Right Column - Product Details */}
      <div className="lg:col-span-2 w-full lg:w-[90%] p-4">
        <div className="relative lg:h-[calc(100vh-100px)]">
          <div className="h-full overflow-y-auto hide-scrollbar">
            <div className="space-y-6 pb-8">
              {/* Client-side interactive components with dynamic pricing */}
              <ClientProductForm
                product={product}
                onImagesChange={handleImagesChange}
              />

              {/* Description */}
              <ProductDescription description={product.description} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
