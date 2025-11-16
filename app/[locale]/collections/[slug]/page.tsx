import type { Metadata } from "next";
import { ChevronDown, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import CollectionHeader from "./collection-header";
import ProductViewToggle from "./product-view-toggle";
import ProductSort from "./product-sort";
import ProductFilters from "./product-filter";
import ActiveFilters from "./active-filter";
import ProductGrid from "@/components/product-grid";

// Mock data (in a real app, this would come from an API or CMS)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCollectionData = (slug: string) => {
  const collection = {
    slug: "summer-collection",
    name: "Summer Collection",
    description:
      "Discover our vibrant summer collection featuring lightweight fabrics, breathable materials, and trendy designs perfect for the sunny season. From casual wear to beach essentials, we've got you covered.",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop",
    productCount: 56,
  };

  // In a real app, you would fetch this based on the slug
  return collection;
};

const getProducts = () => {
  // Mock products array (same as in your original code)
  return [
    {
      id: 1,
      slug: "linen-shirt-white",
      name: "Linen Shirt - White",
      price: "$49",
      originalPrice: "$69",
      image:
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 89,
      isNew: true,
      colors: ["#FFFFFF", "#F5F5DC", "#D3D3D3"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      slug: "denim-shorts-blue",
      name: "Denim Shorts - Blue",
      price: "$39",
      originalPrice: "$49",
      image:
        "https://images.pexels.com/photos/588604/pexels-photo-588604.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.5,
      reviews: 124,
      isNew: false,
      colors: ["#191970", "#1E90FF", "#4682B4"],
      sizes: ["S", "M", "L"],
    },
    {
      id: 3,
      slug: "cotton-dress-floral",
      name: "Cotton Dress - Floral",
      price: "$59",
      originalPrice: "$79",
      image:
        "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 156,
      isNew: true,
      colors: ["#FF69B4", "#FFA07A", "#FFD700"],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      id: 4,
      slug: "swim-trunks-navy",
      name: "Swim Trunks - Navy",
      price: "$35",
      originalPrice: "$45",
      image:
        "https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 78,
      isNew: false,
      colors: ["#000080", "#4169E1", "#4682B4"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 5,
      slug: "straw-hat-natural",
      name: "Straw Hat - Natural",
      price: "$29",
      originalPrice: "$39",
      image:
        "https://images.pexels.com/photos/35185/hats-fedora-hat-manufacture-stack.jpg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.4,
      reviews: 112,
      isNew: true,
      colors: ["#D2B48C", "#F5DEB3", "#8B4513"],
      sizes: ["One Size"],
    },
    {
      id: 6,
      slug: "canvas-sneakers-white",
      name: "Canvas Sneakers - White",
      price: "$45",
      originalPrice: "$65",
      image:
        "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 203,
      isNew: false,
      colors: ["#FFFFFF", "#F5F5F5", "#D3D3D3"],
      sizes: ["7", "8", "9", "10", "11"],
    },
    {
      id: 7,
      slug: "linen-pants-beige",
      name: "Linen Pants - Beige",
      price: "$55",
      originalPrice: "$75",
      image:
        "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 67,
      isNew: true,
      colors: ["#F5F5DC", "#D2B48C", "#8B4513"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 8,
      slug: "graphic-t-shirt-black",
      name: "Graphic T-Shirt - Black",
      price: "$25",
      originalPrice: "$35",
      image:
        "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.5,
      reviews: 145,
      isNew: false,
      colors: ["#000000", "#696969", "#808080"],
      sizes: ["S", "M", "L", "XL"],
    },
  ]; // Your products array here
};

const getFilterOptions = () => {
  // Mock filter options (same as in your original code)
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
  }; // Your filterOptions object here
};

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const collection = getCollectionData(params.slug);

  return {
    title: `${collection.name} | Our Store`,
    description: collection.description,
    openGraph: {
      title: collection.name,
      description: collection.description,
      images: [collection.image],
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: "summer-collection" },
    { slug: "new-arrivals" },
    { slug: "mens-fashion" },
    { slug: "womens-fashion" },
    { slug: "casual-wear" },
    { slug: "formal-wear" },
  ];
}

export default function CollectionPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const collection = getCollectionData(params.slug);
  const products = getProducts();
  const filterOptions = getFilterOptions();

  // Extract filter params from URL
  const activeFilters = {
    price: searchParams.price
      ? Array.isArray(searchParams.price)
        ? searchParams.price
        : [searchParams.price]
      : [],
    category: searchParams.category
      ? Array.isArray(searchParams.category)
        ? searchParams.category
        : [searchParams.category]
      : [],
    size: searchParams.size
      ? Array.isArray(searchParams.size)
        ? searchParams.size
        : [searchParams.size]
      : [],
    color: searchParams.color
      ? Array.isArray(searchParams.color)
        ? searchParams.color
        : [searchParams.color]
      : [],
  };

  const sortBy = searchParams.sort || "featured";
  const viewMode = searchParams.view === "list" ? "list" : "grid";
  const showFilters = searchParams.filters === "open";

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={14} />
            </li>
            <li>
              <Link
                href="/collections"
                className="hover:text-gray-900 transition-colors"
              >
                Collections
              </Link>
            </li>
            <li>
              <ChevronRight size={14} />
            </li>
            <li aria-current="page" className="text-gray-900 font-medium">
              {collection.name}
            </li>
          </ol>
        </div>
      </nav>

      <CollectionHeader collection={collection} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <Link
              href={`/collections/${collection.slug}?${new URLSearchParams({
                ...Object.fromEntries(
                  Object.entries(searchParams).filter(
                    ([key]) => key !== "filters"
                  )
                ),
                filters: "open",
              })}`}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Open filters"
            >
              <Filter size={16} className="mr-2" />
              Filters
              <ChevronDown size={16} className="ml-2" />
            </Link>
            <span className="text-gray-600">
              {collection.productCount} products
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <ProductViewToggle
              viewMode={viewMode}
              searchParams={searchParams}
              slug={collection.slug}
            />
            <ProductSort
              sortBy={sortBy.toString()}
              sortOptions={sortOptions}
              searchParams={searchParams}
              slug={collection.slug}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <ProductFilters
            filterOptions={filterOptions}
            activeFilters={activeFilters}
            searchParams={searchParams}
            slug={collection.slug}
            showFilters={showFilters}
          />

          {/* Products Grid */}
          <div className="flex-1">
            <ActiveFilters
              activeFilters={activeFilters}
              filterOptions={filterOptions}
              searchParams={searchParams}
              slug={collection.slug}
            />

            <ProductGrid
              products={products}
              viewMode={viewMode}
              basePath={`/women/${params.slug}`}
            />

            {/* Load More */}
            <div className="text-center mt-12">
              <Link
                href="#"
                className="inline-block px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                aria-label="Load more products"
              >
                Load More Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
