import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ApiProduct, TransformedProduct, AttributeValue } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Transform API product response to UI-compatible format
 */
export function transformApiProduct(
  apiProduct: ApiProduct
): TransformedProduct {
  // Base price from the product (salesPrice or mrpPrice)
  const basePrice = apiProduct.salesPrice || apiProduct.mrpPrice || 0;
  const originalPrice = apiProduct.mrpPrice || basePrice;

  // Use imageFiles if available, otherwise fallback to images
  const images =
    apiProduct.imageFiles?.length > 0
      ? apiProduct.imageFiles
      : apiProduct.images || [];

  // Create description from points if available
  const description =
    [
      apiProduct.pointOne,
      apiProduct.pointTwo,
      apiProduct.pointThree,
      apiProduct.pointFour,
      apiProduct.pointFive,
    ]
      .filter(Boolean)
      .join("\n\n") || apiProduct.shortDescription;

  // Group attributes by attributeId to create different categories
  const attributeGroups = groupAttributesByType(apiProduct.attributeValues);

  // Generate metal types from attributeValues if available
  const metalTypes = generateMetalTypesFromAttributes(
    attributeGroups.metalTypes || []
  );

  // Generate diamond sizes from attributeValues if available
  const diamondSizes = generateDiamondSizesFromAttributes(
    attributeGroups.diamondSizes || []
  );

  return {
    id: apiProduct.id.toString(),
    name: apiProduct.productName,
    price: basePrice, // This will be the base price, actual price calculated dynamically
    originalPrice: originalPrice,
    sku: apiProduct.sku || `SKU-${apiProduct.id}`,
    description,
    shortDescription: apiProduct.shortDescription,
    stock: apiProduct.stock || 0,
    images,
    attributeValues: apiProduct.attributeValues,
    rating: 5, // Default rating
    reviewCount: 0, // Default review count
    is3DViewEnabled: false, // Default 3D view setting
    metalTypes,
    diamondSizes,
    ringSizes: Array.from({ length: 13 }, (_, i) => ({
      size: (i + 4).toString(),
      available: true,
    })),
  };
}

/**
 * Group attributes by their type based on attributeId
 */
function groupAttributesByType(attributeValues: AttributeValue[]) {
  const groups: {
    metalTypes: AttributeValue[];
    diamondSizes: AttributeValue[];
    other: AttributeValue[];
  } = {
    metalTypes: [],
    diamondSizes: [],
    other: [],
  };

  attributeValues.forEach((attr) => {
    // Group by attributeId - you can customize this logic based on your data structure
    if (attr.attributeId === 1 || attr.attributeId === 2) {
      groups.metalTypes.push(attr);
    } else if (
      attr.attributeId === 3 ||
      attr.attributeId === 4 ||
      attr.attributeId === 5
    ) {
      groups.diamondSizes.push(attr);
    } else {
      groups.other.push(attr);
    }
  });

  return groups;
}

/**
 * Get images for a specific attribute
 */
export function getAttributeImages(
  attributeId: number,
  attributeValues: AttributeValue[]
): string[] {
  const attribute = attributeValues.find((attr) => attr.id === attributeId);
  return attribute?.imageFiles || [];
}

/**
 * Get all available images for selected attributes
 */
export function getCombinedAttributeImages(
  selectedAttributeIds: number[],
  attributeValues: AttributeValue[]
): string[] {
  const allImages: string[] = [];

  selectedAttributeIds.forEach((attributeId) => {
    const images = getAttributeImages(attributeId, attributeValues);
    allImages.push(...images);
  });
  return allImages;
}

/**
 * Calculate total price based on base price and selected attributes
 */
export function calculateProductPrice(
  basePrice: number,
  selectedAttributes: { [key: string]: number } = {}
): number {
  let totalPrice = basePrice;
  // Add prices from selected attributes
  Object.values(selectedAttributes).forEach((attributePrice) => {
    totalPrice += attributePrice;
  });
  return totalPrice;
}

/**
 * Get attribute price by ID
 */
export function getAttributePrice(
  attributeId: number,
  attributeValues: AttributeValue[]
): number {
  const attribute = attributeValues.find((attr) => attr.id === attributeId);
  return attribute?.price || 0;
}

/**
 * Generate metal types from attribute values with pricing
 */
function generateMetalTypesFromAttributes(attributeValues: AttributeValue[]) {
  // If no attribute values, return default metal types
  if (!attributeValues || attributeValues.length === 0) {
    return [
      {
        key: "SL",
        name: "SL",
        value: "925 Silver",
        color: "transparent",
        textColor: "black",
        price: 0, // No additional cost for default
      },
      {
        key: "10K-G",
        name: "10K",
        value: "10K Gold",
        color: "transparent",
        textColor: "black",
        price: 500, // Additional cost for gold
      },
      {
        key: "14K-G",
        name: "14K",
        value: "14K Gold",
        color: "transparent",
        textColor: "black",
        price: 800, // Additional cost for 14K gold
      },
      {
        key: "18K-G",
        name: "18K",
        value: "18K Gold",
        color: "transparent",
        textColor: "black",
        price: 1200, // Additional cost for 18K gold
      },
    ];
  }

  // Convert attribute values to metal types with their prices
  return attributeValues.map((attr, index) => ({
    key: `ATTR-${attr.id}`,
    name: attr.attributeName || `Option ${index + 1}`,
    value: attr.attributeName || `Option ${index + 1}`,
    color: "transparent",
    textColor: "black",
    price: attr.price, // Use the actual price from attribute
  }));
}

/**
 * Generate diamond sizes from attribute values with pricing
 */
function generateDiamondSizesFromAttributes(attributeValues: AttributeValue[]) {
  // If no attribute values, return default diamond sizes
  if (!attributeValues || attributeValues.length === 0) {
    return [
      { size: "0.50 CT", available: true, price: 0 },
      { size: "0.80 CT", available: true, price: 200 },
      { size: "1.00 CT", available: true, price: 500 },
      { size: "1.50 CT", available: true, price: 1000 },
      { size: "2.00 CT", available: true, price: 2000 },
    ];
  }

  // Convert attribute values to diamond sizes with their prices
  return attributeValues.map((attr) => ({
    size: attr.attributeName || `Option ${attr.id}`,
    available: true,
    price: attr.price, // Use the actual price from attribute
  }));
}

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
