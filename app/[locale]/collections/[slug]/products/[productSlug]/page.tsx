import { ChevronRight } from "lucide-react";

import Link from "next/link";
import ProductStickyBar from "./product-sticky-bar";
import ProductGallery from "./product-gallery";
import ProductInfo from "./product-info";
import ProductDescription from "./product-description";
// import SimilarProducts from "@/components/similar-products";
// import { mockFeaturedProducts } from "@/lib/mock-data";

// Mock product data
const product = {
  id: 1,
  name: "Premium Cotton T-Shirt",
  price: "$49",
  originalPrice: "$69",
  rating: 4.8,
  reviews: 124,
  description:
    "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this versatile piece features a classic fit that's perfect for any occasion. The soft, breathable fabric ensures all-day comfort while maintaining its shape wash after wash.",
  features: [
    "100% Organic Cotton",
    "Pre-shrunk fabric",
    "Reinforced seams",
    "Machine washable",
    "Available in multiple colors",
  ],
  images: [
    "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    "https://images.pexels.com/photos/7679471/pexels-photo-7679471.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    "https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
  ],
  colors: [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Navy", value: "#000080" },
    { name: "Gray", value: "#808080" },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
};

export default function ProductDetails() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href="/collections"
            className="hover:text-gray-900 transition-colors"
          >
            Collections
          </Link>
          <ChevronRight size={14} />
          <Link
            href="/product"
            className="hover:text-gray-900 transition-colors"
          >
            Products
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          id="product-details"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-xl shadow-sm p-6"
        >
          {/* Product Images */}
          <ProductGallery product={product} />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Product Description */}
        <ProductDescription product={product} />
      </div>

      {/* Client component for sticky bar */}
      <ProductStickyBar product={product} />

      {/* Similar Products */}
      {/* <SimilarProducts
        products={mockFeaturedProducts}
        currentProductId={product.id.toString()}
      /> */}
    </div>
  );
}
