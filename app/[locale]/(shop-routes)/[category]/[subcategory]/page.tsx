import type { Metadata } from "next";
import ProductGrid from "@/components/product-grid";
// import CollectionHeader from "@/components/collection-header";
import ActiveFilters from "@/components/active-filter";
import StickyFilterBar from "@/components/sticky-filter-bar";
import Image from "next/image";
import { FilterParentGroup, FilterTransformedData } from "@/types/product";
import { mockFilters } from "@/lib/mock-data";
import { cookies } from "next/headers";
import {
  COOKIE_KEY_COUNTRY_ISO,
  COOKIE_KEY_LANGUAGE_ISO,
} from "@/lib/cookie-constant";

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

// Define the transformed product interface for UI - matches ProductCard expectations
interface TransformedProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
}

// Define the collection interface
interface Collection {
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  productCount: number;
}

// Define the category data interface
interface CategoryData {
  id: number;
  name: string;
  slug: string;
  parentCategoryName: string;
  displayOrder: string;
  shortDescription: string;
  longDescription: string;
  images: string;
  imageUrls: string;
  metaTitle: string;
  metaKeyword: string[];
  metaTag: string[];
  metaDescription: string;
  url: string;
  published: boolean;
  featured: boolean;
  existingImages?: undefined;
  deleted: string | null;
  createdAt: string;
  updatedAt: string | null;
  subCategories: [];
  // attributeValues?: Array<{
  //   id: number;
  //   attributeId: number;
  //   parentAttributeId: number | null;
  //   attributeName: string | null;
  //   attributeColor: string;
  //   price: number;
  //   isDefault: boolean;
  //   images: string[] | null;
  //   imageFiles: string[];
  // }>;
}

const getFilterOptions = (
  filterData?: FilterParentGroup[]
): FilterTransformedData => {
  if (filterData && filterData?.length > 0) {
    const transformed = filterData?.reduce(
      (acc: FilterTransformedData, item: FilterParentGroup) => {
        acc[item.parentName.toLowerCase().replace(/\s+/g, "_")] =
          item.attributes.map((attr) => ({
            value: attr.name.toLowerCase().replace(/\s+/g, "-"),
            label: attr.name,
          }));
        return acc;
      },
      {}
    );
    return transformed;
  }
  return mockFilters;
};

// Create a mapping from filter category key to parentName
const getFilterCategoryMap = (
  filterData?: FilterParentGroup[]
): Record<string, string> => {
  if (!filterData || filterData.length === 0) return {};

  return filterData.reduce(
    (acc: Record<string, string>, item: FilterParentGroup) => {
      const categoryKey = item.parentName.toLowerCase().replace(/\s+/g, "_");
      acc[categoryKey] = item.parentName;
      return acc;
    },
    {}
  );
};

// Filter products based on active filters
const filterProducts = (
  products: ApiProduct[],
  activeFilters: { [key: string]: string[] },
  filterData?: FilterParentGroup[],
  filterOptions?: FilterTransformedData
): ApiProduct[] => {
  // If no active filters, return all products
  const hasActiveFilters = Object.values(activeFilters).some(
    (filters) => filters.length > 0
  );
  if (!hasActiveFilters) {
    return products;
  }

  // Create mapping from filter category to parentName
  const categoryMap = getFilterCategoryMap(filterData);

  return products.filter((product) => {
    // Check each active filter category
    return Object.entries(activeFilters).every(
      ([categoryKey, filterValues]) => {
        // If no filters for this category, skip
        if (!filterValues || filterValues.length === 0) {
          return true;
        }

        // Get the parentName for this category (e.g., "Color" for "color")
        const parentName = categoryMap[categoryKey];
        if (!parentName) {
          return true; // Unknown category, don't filter
        }

        // Get filter labels for matching
        const categoryOptions = filterOptions?.[categoryKey] || [];
        const filterLabels = filterValues.map((value) => {
          const option = categoryOptions.find((opt) => opt.value === value);
          return option
            ? option.label.toLowerCase().trim()
            : value.toLowerCase().trim();
        });

        // Get the filter attribute names from filterData for this category
        const filterGroup = filterData?.find(
          (group) =>
            group.parentName.toLowerCase().replace(/\s+/g, "_") === categoryKey
        );
        const filterAttributeNames =
          filterGroup?.attributes.map((attr) =>
            attr.name.toLowerCase().trim()
          ) || [];

        // Check if product has any attributeValue that matches the filters
        const matchingAttributes = product.attributeValues?.filter((attr) => {
          if (!attr.attributeName) return false;

          const normalizedAttrName = attr.attributeName.toLowerCase().trim();

          // Match against filter labels (from filterOptions)
          const matchesLabel = filterLabels.some(
            (label) => label === normalizedAttrName
          );

          // Also match against filter attribute names directly
          const matchesAttributeName = filterAttributeNames.some(
            (name) => name === normalizedAttrName
          );

          return matchesLabel || matchesAttributeName;
        });

        // Product matches if it has at least one matching attribute
        return matchingAttributes && matchingAttributes.length > 0;
      }
    );
  });
};

// Transform external API products to match ProductCard component format
const transformProducts = (products: ApiProduct[]): TransformedProduct[] => {
  return products.map((product) => {
    // Extract slug from URL or generate from ID
    const slug = product.slug || `product-${product.id}`;

    // Get price from attributeValues if available, otherwise use salesPrice/mrpPrice
    let price = product.salesPrice || product.mrpPrice || 0;
    if (product.attributeValues && product.attributeValues.length > 0) {
      price = Math.min(...product.attributeValues.map((attr) => attr.price));
    }

    return {
      id: typeof product.id === "number" ? product.id : Number(product.id) || 0,
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
  params: { category: string; subcategory: string; locale: string };
}): Promise<Metadata> {
  const { category, subcategory, locale } = await params;

  const cookieStore = await cookies();
  const currentLanguage =
    cookieStore.get(COOKIE_KEY_LANGUAGE_ISO)?.value || "en";
  try {
    // Fetch data from our API route (following home page pattern)
    const baseUrl = process.env.EXTERNAL_API_URL;
    // const apiUrl = `${baseUrl}/api/subcategory/${category}/${subcategory}`;
    const apiUrl = `${baseUrl}/web/category/by-slug?slug=${subcategory}`;

    const response = await fetch(apiUrl, {
      cache: "no-store", // Disable caching for dynamic data
      headers: {
        ...(currentLanguage !== "en" && { languageCode: currentLanguage }),
      },
    });

    if (!response.ok) {
      return {
        title: `${subcategory} | Our Store`,
        description: `Browse our collection of ${subcategory}`,
      };
    }

    const categoryData = await response.json();

    const title = categoryData.metaTitle || categoryData.name || subcategory;
    const description =
      categoryData.metaDescription ||
      categoryData.shortDescription ||
      `Browse our collection of ${categoryData.name}`;
    const image = categoryData.imageUrls?.[0] || "";

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/${category}/${subcategory}/`,
        images: image ? [{ url: image }] : [],
        locale: locale,
        type: "website",
      },
      twitter: {
        title: title,
        description: description,
        card: "summary_large_image",
        site: "@shrishiv",
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${currentLanguage}/${category}/${subcategory}`,
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
  const resolvedSearchParams = await searchParams;
  const { category, subcategory } = await params;
  const cookieStore = await cookies();
  const currentLanguage =
    cookieStore.get(COOKIE_KEY_LANGUAGE_ISO)?.value || "en";
  const currentCountryCode =
    cookieStore.get(COOKIE_KEY_COUNTRY_ISO)?.value || "en";

  const externalApiUrl =
    process.env.EXTERNAL_API_URL ?? "http://localhost:3000";

  if (!externalApiUrl)
    console.warn(
      "⚠️ Subcategory Page: EXTERNAL_API_URL not set, using fallback data"
    );

  const categoryApiUrl = `${externalApiUrl}/web/category/by-slug?slug=${subcategory}`;
  const productApiUrl = `${externalApiUrl}/web/product/by-category?slug=${subcategory}`;
  const filterApiUrl = `${externalApiUrl}/web/filters?categorySlug=${subcategory}`;

  let filterData = [];

  let categoryData: CategoryData = {
    id: 0,
    name: "",
    slug: "",
    parentCategoryName: "",
    displayOrder: "",
    shortDescription: "",
    longDescription: "",
    images: "",
    imageUrls: "",
    metaTitle: "",
    metaKeyword: [],
    metaTag: [],
    metaDescription: "",
    url: "",
    published: false,
    featured: false,
    existingImages: undefined,
    deleted: null,
    createdAt: "",
    updatedAt: null,
    subCategories: [],
  };
  let allProductsData: ApiProduct[] = [];
  try {
    // Fetch category & products concurrently
    const [categoryResponse, productResponse, filterResponse] =
      await Promise.all([
        fetch(categoryApiUrl, {
          cache: "no-store",
          headers: {
            ...(currentLanguage !== "en" && { languageCode: currentLanguage }),
          },
        }),
        fetch(productApiUrl, {
          cache: "no-store",
          headers: {
            ...(currentLanguage !== "en" && { languageCode: currentLanguage }),
            ...(currentCountryCode !== "in" && {
              countryCode: currentCountryCode,
            }),
          },
        }),
        fetch(filterApiUrl, {
          cache: "no-store",
          headers: {
            ...(currentLanguage !== "en" && { languageCode: currentLanguage }),
          },
        }),
      ]);

    // Validate responses
    if (!categoryResponse.ok) {
      throw new Error(
        `Failed to fetch data: category=${categoryResponse.status}, product=${productResponse.status}`
      );
    }
    if (!productResponse.ok) {
      allProductsData = [];
    }
    if (!filterResponse.ok) {
    }

    [categoryData, allProductsData, filterData] = await Promise.all([
      categoryResponse.json(),
      productResponse.json(),
      filterResponse.json(),
    ]);
  } catch (error) {
    console.error(
      "❌ Subcategory Page: Fetch failed, using fallback data:",
      error
    );
    allProductsData = [];
  }

  // Create collection object for CollectionHeader
  const collection: Collection = {
    slug: `${category}/${subcategory}`,
    name: categoryData.name || subcategory,
    shortDescription:
      categoryData.shortDescription ||
      `Browse our collection of ${categoryData.name}`,
    image: categoryData.imageUrls?.[0] || "",
    productCount: allProductsData.length,
  };

  const filterOptions = getFilterOptions(filterData);

  // Extract filter params from URL
  const activeFilters: { [key: string]: string[] } = {
    price: resolvedSearchParams.price
      ? Array.isArray(resolvedSearchParams.price)
        ? resolvedSearchParams.price
        : resolvedSearchParams.price?.split(",")
      : [],
    size: resolvedSearchParams.size
      ? Array.isArray(resolvedSearchParams.size)
        ? resolvedSearchParams.size
        : resolvedSearchParams.size.split(",")
      : [],
    color: resolvedSearchParams.color
      ? Array.isArray(resolvedSearchParams.color)
        ? resolvedSearchParams.color
        : resolvedSearchParams.color.split(",")
      : [],
  };

  // Add any other filter categories from filterOptions
  Object.keys(filterOptions).forEach((category) => {
    if (!activeFilters[category]) {
      const paramValue = resolvedSearchParams[category];
      activeFilters[category] = paramValue
        ? Array.isArray(paramValue)
          ? paramValue
          : paramValue.split(",")
        : [];
    }
  });

  // Filter products based on active filters
  const filteredProducts = filterProducts(
    allProductsData,
    activeFilters,
    filterData,
    filterOptions
  );

  // Transform filtered products for ProductGrid component
  const products = transformProducts(filteredProducts);
  const hasProducts = products && products.length > 0;

  return (
    <div className="mx-auto">
      {/* <CollectionHeader collection={collection} /> */}
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={collection.image}
          alt={"banner-image"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-3xl font-bold mb-4">{collection.name}</h1>
            <p className="text-lg leading-relaxed">
              {collection.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Container for sticky behavior */}
      <div
        className={`relative ${hasProducts ? "min-h-[80vh]" : "min-h-[50vh]"}`}
      >
        {hasProducts ? (
          <>
            <StickyFilterBar
              filterOptions={filterOptions}
              activeFilters={activeFilters}
              searchParams={resolvedSearchParams}
            />
            <ActiveFilters
              activeFilters={activeFilters}
              filterOptions={filterOptions}
              searchParams={resolvedSearchParams}
            />
            <ProductGrid products={products} basePath="/product" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[30vh]">
            <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
            <p className="text-gray-600 text-center max-w-md">
              Try adjusting your filters or exploring other collections.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
