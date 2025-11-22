import { Metadata } from "next";
import ProductPageWrapper from "./product-page-wrapper";
import SimilarProducts from "@/components/similar-products";
import CartModal from "@/components/ui/cart-modal";
import ReviewsPage from "@/components/reviews-page";
import { ApiProduct } from "@/types/product";

// Force dynamic rendering - disable static generation
export const dynamic = "force-dynamic";

// Transform API product to match the expected format
const transformApiProduct = (apiProduct: ApiProduct) => {
  // Group attribute values by attributeId to create attribute options
  const attributeGroups =
    apiProduct.attributeValues?.reduce((groups, attr) => {
      const key = attr.attributeId;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(attr);
      return groups;
    }, {} as Record<number, typeof apiProduct.attributeValues>) || {};

  // Sort attribute groups by attributeId to ensure consistent ordering
  const sortedAttributeGroups = Object.entries(attributeGroups)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .reduce((acc, [key, value]) => {
      acc[parseInt(key)] = value;
      return acc;
    }, {} as Record<number, typeof apiProduct.attributeValues>);

  // Get the first attribute group's first option as default
  const firstAttributeGroup = Object.values(sortedAttributeGroups)[0];
  const defaultAttribute = firstAttributeGroup?.[0];

  // Calculate base price from default attribute or fallback to salesPrice/mrpPrice
  let basePrice = apiProduct.salesPrice || apiProduct.mrpPrice || 0;
  if (defaultAttribute) {
    basePrice = defaultAttribute.price;
  }

  // Get default images from the first attribute or fallback to product images
  const defaultImages =
    defaultAttribute?.imageFiles?.length > 0
      ? defaultAttribute.imageFiles
      : apiProduct.imageFiles?.length > 0
      ? apiProduct.imageFiles
      : apiProduct.images || [];

  console.log("🚀 Product Page: Default Images =", defaultImages);

  // Extract slug from URL or generate from ID
  let slug: string;
  if (apiProduct.slug) {
    slug = `product/${apiProduct.slug}`;
  } else if (apiProduct.url) {
    // Extract slug from URL like "${process.env.NEXT_PUBLIC_BASE_URL}/product/sample-testing-product"
    const urlParts = apiProduct.url.split("/");
    slug = urlParts[urlParts.length - 1];
  } else {
    slug = `product-${apiProduct.id}`;
  }

  // Transform sorted attribute groups into the format expected by the form
  const transformedAttributes = Object.entries(sortedAttributeGroups).map(
    ([attributeId, values]) => {
      const firstValue = values[0];
      return {
        attributeId: parseInt(attributeId),
        attributeName: firstValue.attributeName || `Attribute ${attributeId}`,
        options: values.map((attr) => ({
          id: attr.id,
          name: attr.attributeName || `Option ${attr.id}`,
          color: attr.attributeColor,
          price: attr.price,
          isDefault: attr.isDefault,
          images: attr.imageFiles || [],
          attributeId: attr.attributeId,
        })),
      };
    }
  );

  return {
    id: apiProduct.id,
    name: apiProduct.productName,
    description: apiProduct.shortDescription,
    shortDescription: apiProduct.shortDescription,
    price: basePrice,
    originalPrice: apiProduct.mrpPrice || 0,
    image: defaultImages[0] || "/placeholder-image.jpg",
    images: defaultImages,
    slug: slug,

    // Add other fields as needed
    stock: apiProduct.stock || 0,
    sku: apiProduct.sku || "",
    ageGroup: apiProduct.ageGroup || "",
    gender: apiProduct.gender || "",
    discount: apiProduct.discount || 0,
    attributeValues: apiProduct.attributeValues,
    transformedAttributes: transformedAttributes,
    // Add required fields for SEO and components
    title: apiProduct.productName,
    is3DViewEnabled: false,
    rating: 4.5,
    reviewCount: 10,
    isFeatured: apiProduct.isFeatured,
    points: [
      apiProduct.pointOne,
      apiProduct.pointTwo,
      apiProduct.pointThree,
      apiProduct.pointFour,
      apiProduct.pointFive,
    ],
    shipDay: apiProduct.shipDay,
    categoryIds: apiProduct?.categoryIds,
    sizeChartId: apiProduct.sizeChartId,
    // Legacy format for backward compatibility
    metalTypes:
      transformedAttributes[0]?.options?.map((option) => ({
        key: `ATTR-${option.id}`,
        name: option.name,
        value: option.name,
        color: option.color,
        textColor: "#000000",
        price: option.price,
      })) || [],
    diamondSizes:
      transformedAttributes[1]?.options?.map((option) => ({
        size: option.name,
        available: true,
        price: option.price,
      })) || [],
    ringSizes: [
      { size: "6", available: true, price: basePrice },
      { size: "7", available: true, price: basePrice },
      { size: "8", available: true, price: basePrice },
    ],
  };
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Fetch data from our API route (following consistent pattern)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/products/${slug}`;

    const response = await fetch(apiUrl, {
      cache: "no-store", // Disable caching for dynamic data
    });

    if (!response.ok) {
      return {
        title: `Product | Our Store`,
        description: `Product details`,
      };
    }

    const product: ApiProduct = await response.json();

    return {
      title: `${product.productName} | Our Store`,
      description:
        product.shortDescription ||
        `Product details for ${product.productName}`,
      openGraph: {
        title: product.productName,
        description: product.shortDescription,
        images: product.images || product.imageFiles || [],
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: `Product | Our Store`,
      description: `Product details`,
    };
  }
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const externalApiUrl = process.env.EXTERNAL_API_URL;

  if (!externalApiUrl) {
    console.warn(
      "⚠️ Product Page: EXTERNAL_API_URL not set, using fallback data"
    );
  }

  let product: any = {};

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/products/${slug}`;
    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product data: ${response.statusText}`);
    }

    const data = await response.json();

    const apiProduct: ApiProduct = data;
    product = transformApiProduct(apiProduct);
  } catch (error) {
    console.error(
      "❌ Product Page: Failed to fetch data, using fallback:",
      error
    );
  }

  return (
    <div className="bg-white">
      {/* <Schema schema={productSchema} /> */}
      {/* <Schema schema={breadcrumbSchema} /> */}
      <div className="mx-auto">
        <ProductPageWrapper product={product} />
      </div>

      {/* Similar Products */}
      {product?.categoryIds?.[0] && (
        <SimilarProducts
          currentCategoryId={product?.categoryIds?.[0]}
          pathUrl={slug}
        />
      )}

      {/* Reviews Section */}
      <ReviewsPage />

      {/* Cart Modal */}
      <CartModal />
    </div>
  );
}
