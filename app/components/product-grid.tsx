import ProductCard from "./product-card";

// Define the product interface that ProductCard actually expects
interface ProductGridProduct {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface ProductGridProps {
  products: ProductGridProduct[];
  basePath?: string;
}

export default function ProductGrid({
  products,
  basePath = "/products",
}: ProductGridProps) {
  // Limit number of products based on grid size
  const maxProducts = {
    "2x2": 4,
    "4x4": 16,
    "6x6": 36,
  }["4x4"];

  const displayProducts = products?.slice(0, maxProducts) || [];

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 gap-1 py-10 px-5`}
    >
      {displayProducts.map((product, index) => {
        return (
          <ProductCard
            key={`${product.id}-${index}`}
            product={product}
            basePath={basePath}
            index={index}
          />
        );
      })}
    </div>
  );
}
