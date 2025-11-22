import { usePathname } from "next/navigation";
import ProductGrid from "./product-grid";

interface ApiProduct {
  id: number;
  productName: string;
  shortDescription: string;
  pointOne: string;
  pointTwo: string;
  pointThree: string;
  pointFour: string;
  pointFive: string;
  url: string;
  slug?: string;
  stock: number | null;
  shipDay: number;
  categoryIds: number[];
  sizeChartId: number;
  sku: string;
  hsnCode: string;
  ageGroup: string;
  gender: string;
  googleProductCategory: string | null;
  mrpPrice: number | null;
  discount: number;
  salesPrice: number | null;
  isFeatured: boolean;
  images: string[] | null;
  imageFiles: string[];
  attributeValues: Array<{
    id: number;
    attributeId: number;
    parentAttributeId: number | null;
    attributeName: string | null;
    attributeColor: string;
    price: number;
    isDefault: boolean;
    images: string[] | null;
    existingImages: string[] | null;
    imageFiles: string[];
  }>;
  createdAt: string;
  updatedAt: string;
}

interface TransformedProduct {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug?: string;
}

const transformProducts = (products: ApiProduct[]): TransformedProduct[] => {
  return products.map((product) => {
    const slug = product.slug ? product.slug : `product-${product.id}`;
    //  let slug: string;
    //   if (product.url) {
    //     // Extract slug from URL like "${process.env.NEXT_PUBLIC_BASE_URL}/product/sample-testing-product"
    //     const urlParts = product.url.split("/");
    //     slug = urlParts[urlParts.length - 1];
    //   } else {
    //     slug = `product-${product.id}`;
    //   }

    // Get price from attributeValues if available, otherwise use salesPrice/mrpPrice
    let price = product.salesPrice || product.mrpPrice || 0;
    if (product.attributeValues && product.attributeValues.length > 0) {
      price = Math.min(...product.attributeValues.map((attr) => attr.price));
    }

    return {
      id: slug, // Use slug as id for routing
      name: product.productName || "Product",
      price: price,
      originalPrice: product.mrpPrice || undefined,
      image:
        product.attributeValues?.[0]?.imageFiles?.[0] ||
        product.images?.[0] ||
        product.imageFiles?.[0] ||
        "/placeholder-image.jpg",
      slug: slug,
    };
  });
};

export default async function SimilarProducts({
  currentCategoryId,
  pathUrl,
}: {
  currentCategoryId: string | number;
  pathUrl: string;
}) {
  const currentCategory = await currentCategoryId;
  console.log("currentCategoryId", currentCategory);
  // Fetch category products from API (server-side)
  const response = await fetch(
    `${process.env.EXTERNAL_API_URL}/product/by-category/${currentCategory}`,
    {
      cache: "no-store", // or "force-cache" if you want caching
    }
  );

  const products = await response.json();
  console.log("products++", products);

  // Limit to 8 items
  const productsList = transformProducts(products);
  console.log("productsList", productsList);
  const displayProducts =
    productsList?.filter((data) => data.slug !== pathUrl).slice(0, 8) ?? [];

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="md:text-4xl text-3xl font-bold text-gray-900 mb-4">
          Similar Products
        </h2>
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <ProductGrid products={displayProducts} />
      </div>
    </section>
  );
}
