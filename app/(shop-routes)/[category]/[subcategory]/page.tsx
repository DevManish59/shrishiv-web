import type { Metadata } from "next";
import ProductGrid from "@/components/product-grid";
import CollectionHeader from "@/components/collection-header";
import ActiveFilters from "@/components/active-filter";
import StickyFilterBar from "@/components/sticky-filter-bar";

interface PageProps {
  params: {
    category: string;
    subcategory: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Define the product interface based on your API response
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

// Define the transformed product interface for UI - matches ProductCard expectations
interface TransformedProduct {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug?: string;
}

// Define the collection interface
interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

// Define the category data interface
interface CategoryData {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  attributeValues?: Array<{
    id: number;
    attributeId: number;
    parentAttributeId: number | null;
    attributeName: string | null;
    attributeColor: string;
    price: number;
    isDefault: boolean;
    images: string[] | null;
    imageFiles: string[];
  }>;
}

const getFilterOptions = () => {
  return {
    price: [
      { value: "0-30", label: "Under $30" },
      { value: "30-50", label: "$30 - $50" },
      { value: "50-100", label: "$50 - $100" },
      { value: "100+", label: "$100+" },
    ],
    category: [
      { value: "tops", label: "Tops" },
      { value: "bottoms", label: "Bottoms" },
      { value: "dresses", label: "Dresses" },
      { value: "outerwear", label: "Outerwear" },
      { value: "accessories", label: "Accessories" },
      { value: "footwear", label: "Footwear" },
    ],
    size: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "xxl", label: "XXL" },
    ],
    color: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "blue", label: "Blue" },
      { value: "red", label: "Red" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "beige", label: "Beige" },
    ],
  };
};

// Generate dummy data in the correct API format when API fails
const generateDummyData = (
  category: string,
  subcategory: string
): ApiProduct[] => {
  return [
    {
      id: 1,
      productName: `${subcategory} Sample Product 1`,
      shortDescription: `Beautiful ${subcategory} from ${category} collection`,
      pointOne: "High quality material",
      pointTwo: "Elegant design",
      pointThree: "Perfect fit",
      pointFour: "Durable construction",
      pointFive: "Trendy style",
      url: `mabji-india.vercel.app/product/${subcategory}-sample-1`,
      stock: 50,
      shipDay: 3,
      categoryIds: [1],
      sizeChartId: 1,
      sku: "SKU001",
      hsnCode: "123456",
      ageGroup: "Adult",
      gender: "Female",
      googleProductCategory: "Jewelry",
      mrpPrice: 1000,
      discount: 10,
      salesPrice: 900,
      isFeatured: true,
      images: ["/placeholder-image.jpg"],
      imageFiles: [],
      attributeValues: [
        {
          id: 1,
          attributeId: 1,
          parentAttributeId: null,
          attributeName: "Gold",
          attributeColor: "#FFD700",
          price: 900,
          isDefault: true,
          images: null,
          existingImages: null,
          imageFiles: [],
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      productName: `${subcategory} Sample Product 2`,
      shortDescription: `Elegant ${subcategory} for ${category} lovers`,
      pointOne: "Premium quality",
      pointTwo: "Modern design",
      pointThree: "Comfortable wear",
      pointFour: "Long lasting",
      pointFive: "Versatile style",
      url: `mabji-india.vercel.app/product/${subcategory}-sample-2`,
      stock: 30,
      shipDay: 2,
      categoryIds: [1],
      sizeChartId: 1,
      sku: "SKU002",
      hsnCode: "123456",
      ageGroup: "Adult",
      gender: "Female",
      googleProductCategory: "Jewelry",
      mrpPrice: 800,
      discount: 15,
      salesPrice: 680,
      isFeatured: false,
      images: ["/placeholder-image.jpg"],
      imageFiles: [],
      attributeValues: [
        {
          id: 2,
          attributeId: 2,
          parentAttributeId: null,
          attributeName: "Silver",
          attributeColor: "#C0C0C0",
          price: 680,
          isDefault: true,
          images: null,
          existingImages: null,
          imageFiles: [],
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

// Transform external API products to match ProductCard component format
const transformProducts = (products: ApiProduct[]): TransformedProduct[] => {
  return products.map((product) => {
    // Extract slug from URL or generate from ID
    let slug: string;
    if (product.url) {
      // Extract slug from URL like "mabji-india.vercel.app/product/sample-testing-product"
      const urlParts = product.url.split("/");
      slug = urlParts[urlParts.length - 1];
    } else {
      slug = `product-${product.id}`;
    }

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

export async function generateMetadata({
  params,
}: {
  params: { category: string; subcategory: string };
}): Promise<Metadata> {
  const { category, subcategory } = await params;

  try {
    // Fetch data from our API route (following home page pattern)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/subcategory/${category}/${subcategory}`;

    const response = await fetch(apiUrl, {
      cache: "no-store", // Disable caching for dynamic data
    });

    if (!response.ok) {
      return {
        title: `${subcategory} | Our Store`,
        description: `Browse our collection of ${subcategory}`,
      };
    }

    const data = await response.json();
    const categoryData = data.category || {};

    const title = categoryData.name || subcategory;
    const description =
      categoryData.description || `Browse our collection of ${subcategory}`;
    const image = categoryData.image || "";

    return {
      title: `${title} | Our Store`,
      description: description,
      openGraph: {
        title: title,
        description: description,
        images: image ? [image] : [],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: `${subcategory} | Our Store`,
      description: `Browse our collection of ${subcategory}`,
    };
  }
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { category, subcategory } = await params;

  // Check if external API is configured
  const externalApiUrl = process.env.EXTERNAL_API_URL;
  console.log("🏠 Subcategory Page: EXTERNAL_API_URL =", externalApiUrl);

  if (!externalApiUrl) {
    console.warn(
      "⚠️ Subcategory Page: EXTERNAL_API_URL not set, using fallback data"
    );
  }

  let productsData: ApiProduct[];
  let categoryData: CategoryData = {};

  try {
    // Fetch data from our API route (following home page pattern)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/subcategory/${category}/${subcategory}`;

    console.log("🚀 Subcategory Page: Calling API route:", apiUrl);

    const response = await fetch(apiUrl, {
      cache: "no-store", // Disable caching for dynamic data
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch subcategory data: ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("🔍 Subcategory Page: API response data:", data);
    // Extract products and category data from the response
    productsData = data || [];
    categoryData = data?.[0] || {};

    // If no products from API, use fallback data
    if (!productsData || productsData.length === 0) {
      console.log(
        "🔄 Subcategory Page: No products from API, using fallback data"
      );
      productsData = generateDummyData(category, subcategory);
    }
  } catch (error) {
    console.error(
      "❌ Subcategory Page: Failed to fetch data, using fallback:",
      error
    );

    // Use fallback data if API fails
    productsData = generateDummyData(category, subcategory);
    categoryData = {};
  }

  // Create collection object for CollectionHeader
  const collection: Collection = {
    slug: `${category}/${subcategory}`,
    name: categoryData.name || subcategory,
    description:
      categoryData.description || `Browse our collection of ${subcategory}`,
    image: categoryData.attributeValues?.[0]?.imageFiles?.[0] || "",
    productCount: productsData.length,
  };

  // Transform products for ProductGrid component
  const products = transformProducts(productsData);

  // Ensure we always have products
  if (!products || products.length === 0) {
    const dummyProducts = transformProducts(
      generateDummyData(category, subcategory)
    );
    return (
      <div className="mx-auto">
        <CollectionHeader collection={collection} />
        <div className="relative min-h-[80vh]">
          <StickyFilterBar
            filterOptions={getFilterOptions()}
            activeFilters={{ price: [], category: [], size: [], color: [] }}
            searchParams={searchParams}
          />
          <ActiveFilters
            activeFilters={{ price: [], category: [], size: [], color: [] }}
            filterOptions={getFilterOptions()}
            searchParams={searchParams}
          />
          <ProductGrid products={dummyProducts} basePath="/products" />
        </div>
      </div>
    );
  }

  const filterOptions = getFilterOptions();

  // Extract filter params from URL
  const activeFilters = {
    price: searchParams.price
      ? Array.isArray(searchParams.price)
        ? searchParams.price
        : searchParams.price.split(",")
      : [],
    category: searchParams.category
      ? Array.isArray(searchParams.category)
        ? searchParams.category
        : searchParams.category.split(",")
      : [],
    size: searchParams.size
      ? Array.isArray(searchParams.size)
        ? searchParams.size
        : searchParams.size.split(",")
      : [],
    color: searchParams.color
      ? Array.isArray(searchParams.color)
        ? searchParams.color
        : searchParams.color.split(",")
      : [],
  };

  return (
    <div className="mx-auto">
      <CollectionHeader collection={collection} />

      {/* Container for sticky behavior */}
      <div className="relative min-h-[80vh]">
        <StickyFilterBar
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          searchParams={searchParams}
        />
        <ActiveFilters
          activeFilters={activeFilters}
          filterOptions={filterOptions}
          searchParams={searchParams}
        />
        <ProductGrid products={products} basePath="/products" />
      </div>
    </div>
  );
}
