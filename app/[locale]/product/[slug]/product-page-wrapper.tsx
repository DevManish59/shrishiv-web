"use client";

import { useEffect, useState } from "react";
import { TransformedProduct } from "@/lib/types";
import ProductGallery from "./product-gallery";
import { useLocale } from "@/contexts/LocalProvider";
import { useCart } from "@/contexts/LocalStorageCartContext";
import SizeGuideModal from "@/components/ui/size-guide-modal";

interface ProductPageWrapperProps {
  product: TransformedProduct;
  sizeChartData?: any;
}

export default function ProductPageWrapper({
  product,
  sizeChartData,
}: ProductPageWrapperProps) {
  const { currentCountry } = useLocale();
  const { addItem } = useCart();

  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const [dynamicImages, setDynamicImages] = useState<string[]>(
    product.images || []
  );
  const [selectedRingSize, setSelectedRingSize] = useState<string | null>(null);
  const [selectedAttr, setSelectedAttr] = useState(product.attributeValues[0]);
  const [currentImages, setCurrentImages] = useState(product.images);

  const handleImagesChange = (images: string[]) => {
    setDynamicImages(images);
  };

  useEffect(() => {
    if (dynamicImages && dynamicImages.length > 0) {
      setCurrentImages(dynamicImages);
    } else {
      setCurrentImages(product.images);
    }
  }, [dynamicImages, product.images]);

  console.log("productInformation++", product);

  const handleAddToCart = () => {
    if (!selectedRingSize) {
      return;
    }

    // Create a description of selected attributes
    // const attributeDescription = Object.values(selectedOptions)
    //   .map((option) => option.name)
    //   .join(", ");

    addItem({
      id: product.id,
      name: product.name,
      price: selectedAttr.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      // metalType: attributeDescription,
      diamondSize: selectedRingSize,
      ringSize: selectedRingSize,
      isLabGrown: true,
    });

    // Navigate to checkout page
    // router.push("/checkout");
  };

  return (
    <>
      <div
        id="product-details"
        className="grid grid-cols-1 lg:grid-cols-5 gap-8"
      >
        {/* Left Column - Image Gallery */}
        <ProductGallery
          product={{
            ...product,
            images: currentImages,
          }}
        />

        {/* Right Column - Product Details */}
        <div className="lg:col-span-2 w-full lg:w-[90%] p-4">
          <div className="relative">
            <div className="h-full overflow-y-auto hide-scrollbar">
              <div className="space-y-6 pb-8">
                <div>
                  <h1 className="text-2xl font-medium mb-4">{product?.name}</h1>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <p className="text-lg">
                        From {currentCountry?.currencySymbol || "Rs."}
                        {product?.discount > 0
                          ? (
                              selectedAttr.price -
                              (selectedAttr.price * product.discount) / 100
                            ).toLocaleString()
                          : selectedAttr.price.toLocaleString()}
                      </p>
                      {product.discount > 0 && (
                        <p className="text-2xl font-medium text-gray-500 line-through">
                          {currentCountry?.currencySymbol || "Rs."}{" "}
                          {selectedAttr.price.toLocaleString()}
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
                            i < product.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
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

                <div className="space-y-6 pb-8">
                  {product.attributeValues.map((attr) => (
                    <div key={attr.id}>
                      <p className="text-sm mb-3">
                        {attr.attributeName}: {attr.attributeName}
                      </p>

                      {/* Color Swatches */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedAttr(attr)}
                          className={`cursor-pointer ml-2 w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-medium
                  ${
                    selectedAttr.id === attr.id
                      ? "ring-1 ring-black"
                      : "border-gray-200"
                  }`}
                          style={{ backgroundColor: attr?.attributeColor }}
                        >
                          {" "}
                          {attr.attributeName.charAt(0).toUpperCase()}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Ring Size */}
                <div className="w-full lg:w-[50%]">
                  <div className="flex justify-between items-center mb-3">
                    <p
                      className={`${
                        selectedRingSize ? "" : "text-red-500"
                      } text-sm`}
                    >
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

                {/* Add to Cart */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedRingSize}
                    className="w-full bg-black text-white py-3 hover:bg-black/90 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    ADD TO CART
                  </button>
                </div>

                {/* Description */}
                <div className="mt-10">
                  <h2 className="text-lg font-semibold">Description</h2>
                  <p className="mt-2 text-gray-700">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Key Features */}
                <div className="mt-8">
                  <h2 className="text-lg font-semibold">Key Features</h2>
                  <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700">
                    {product?.points.map((data, index) => {
                      return <li key={index}>{data}</li>;
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SizeGuideModal
        isOpen={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        sizeChartData={sizeChartData}
      />
    </>
  );
}
