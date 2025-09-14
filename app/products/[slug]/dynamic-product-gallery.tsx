"use client";

import { useState, useEffect } from "react";
import ProductGallery from "./product-gallery";

interface DynamicProductGalleryProps {
  product: {
    name: string;
    images: string[];
    is3DViewEnabled: boolean;
  };
  dynamicImages?: string[];
}

export default function DynamicProductGallery({
  product,
  dynamicImages,
}: DynamicProductGalleryProps) {
  const [currentImages, setCurrentImages] = useState(product.images);

  // Update images when dynamic images change
  useEffect(() => {
    if (dynamicImages && dynamicImages.length > 0) {
      setCurrentImages(dynamicImages);
    } else {
      setCurrentImages(product.images);
    }
  }, [dynamicImages, product.images]);

  return (
    <ProductGallery
      product={{
        ...product,
        images: currentImages,
      }}
    />
  );
}
