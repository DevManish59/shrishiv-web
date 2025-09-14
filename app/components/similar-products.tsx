import ProductGrid from "./product-grid";
import { Product } from "@/lib/types";

interface SimilarProductsProps {
  products: Product[];
  currentProductId?: string; // To exclude current product from similar products if needed
}

export default function SimilarProducts({
  products = [],
  currentProductId,
}: SimilarProductsProps) {
  // Filter out current product if ID is provided and limit to 8 items
  const displayProducts = currentProductId
    ? products.filter((product) => product.id !== currentProductId).slice(0, 8)
    : products.slice(0, 8);

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Similar Products
        </h2>
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid products={displayProducts} />
      </div>
    </section>
  );
}
