export interface ApiProduct {
  id: number | string;
  productName: string;
  shortDescription: string;
  pointOne: string | null;
  pointTwo: string | null;
  pointThree: string | null;
  pointFour: string | null;
  pointFive: string | null;
  url: string | null;
  slug: string | null;
  stock: number | null;
  shipDay: number | null;
  categoryIds: number[];
  sizeChartId: number | null;
  sku: string | null;
  hsnCode: string | null;
  ageGroup: string | null;
  gender: string | null;
  googleProductCategory: string | null;
  mrpPrice: number | null;
  discount: number | null;
  salesPrice: number | null;
  isFeatured: boolean | null;
  images: string[] | null;
  imageFiles: string[];
  meta_title: string | null;
  meta_description: string | null;
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

export interface FilterAttribute {
  attributeId: number;
  name: string;
  count: number;
}

export interface FilterParentGroup {
  parentId: number;
  parentName: string;
  attributes: FilterAttribute[];
}

export interface FilterTransformedData {
  [key: string]: { value: string; label: string }[];
}

export interface ProductGridProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string[] | string;
  images?: string[] | string;
}
