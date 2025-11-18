import { ApiProduct } from "@/types/product";
import { UnifiedItem } from "./types";
import { DynamicCategory } from "@/types/header";

// Fallback data for when API fails
export const fallbackGridItems: UnifiedItem[] = [
  {
    id: "shirts",
    title: "SHIRTS",
    subtitle: "New Collection",
    image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
    href: "/men/shirts",
    size: "half",
  },
  {
    id: "trousers",
    title: "TROUSERS",
    subtitle: "Spring/Summer 2024",
    image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
    href: "/men/trousers",
    size: "half",
  },
  {
    id: "dresses",
    title: "DRESSES",
    subtitle: "Elegant Collection",
    image:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    href: "/women/dresses",
    size: "half",
  },
  {
    id: "kids",
    title: "KIDS",
    subtitle: "New Collection",
    image:
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    href: "/kids/shirts",
    size: "half",
  },
  {
    id: "trousers-kids",
    title: "TROUSERS",
    subtitle: "Spring/Summer 2024",
    image:
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    href: "/kids/trousers",
    size: "half",
  },
  {
    id: "dresses-kids",
    title: "DRESSES",
    subtitle: "Elegant Collection",
    image:
      "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
    href: "/kids/dresses",
    size: "half",
  },
];

export const fallbackBannerData: any = {
  id: "main-banner",
  title: "Exclusive Sale",
  subtitle: "Up to 70% off on selected items. Don't miss out!",
  storeName: "Shrishiv Jewelry",
  description: "Diamond Jewelry for Both Fall & Spooky Sparkle",
  mobileBanner:
    "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop",
  desktopBanner:
    "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop",
  buttonText: "Shop Sale",
  slug: "",
};

export const homepgeMetadata = {
  title: "Home | Shrishiv Jewelry",
  description:
    "Discover our premium collection of lab-grown diamond jewelry with exceptional craftsmanship and ethical sourcing. Exclusive sales and new collections available.",
  keywords: [
    "jewelry",
    "diamond jewelry",
    "lab grown diamonds",
    "engagement rings",
    "wedding jewelry",
    "fine jewelry",
    "ethical jewelry",
  ],
  openGraph: {
    title: "Home | Shrishiv Jewelry",
    description: "Discover our premium collection of lab-grown diamond jewelry",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | Shrishiv Jewelry",
    description: "Discover our premium collection of lab-grown diamond jewelry",
  },
};

export const mockApiProduct: ApiProduct = {
  id: 1,
  slug: "sample-chain-necklace",
  productName: "Sample Chain Necklace",
  shortDescription:
    "Beautiful chain necklace design with premium quality material",
  pointOne: "Premium quality material",
  pointTwo: "Elegant design",
  pointThree: "Perfect for any occasion",
  pointFour: "Adjustable length",
  pointFive: "Includes gift box",
  url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/sample-chain-necklace`,
  stock: 10,
  shipDay: 3,
  categoryIds: [1],
  sizeChartId: 1,
  sku: "NECK001",
  hsnCode: "711319",
  ageGroup: "Adult",
  gender: "Female",
  googleProductCategory: "Jewelry",
  mrpPrice: 5000,
  discount: 20,
  salesPrice: 4000,
  isFeatured: true,
  images: [
    "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
  ],
  imageFiles: [],
  attributeValues: [
    {
      id: 1,
      attributeId: 1,
      parentAttributeId: null,
      attributeName: "Gold Plated",
      attributeColor: "#FFD700",
      price: 4000,
      isDefault: true,
      images: [
        "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
      ],
      existingImages: null,
      imageFiles: [],
    },
  ],
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
};

export const headerMenuStaticData = {
  menuData: {
    women: {
      categories: [
        {
          label: "Topwear",
          slug: "topwear",
        },
        {
          label: "Bottomwear",
          slug: "bottomwear",
        },
      ],
      featured: [
        {
          label: "SALE 50% OFF",
          href: "/women/sale",
          className: "text-red-600 font-bold",
        },
        { label: "NEW COLLECTION", href: "/women/new" },
      ],
    },
    men: {
      categories: [
        {
          label: "Topwear",
          slug: "topwear",
        },
        {
          label: "Bottomwear",
          slug: "bottomwear",
        },
      ],
      featured: [
        {
          label: "SALE",
          href: "/men/sale",
          className: "text-red-600 font-bold",
        },
        { label: "NEW COLLECTION", href: "/men/new" },
      ],
    },
    kids: {
      categories: [
        {
          label: "Boys Clothing",
          slug: "boys-clothing",
        },
        {
          label: "Girls Clothing",
          slug: "girls-clothing",
        },
      ],
      featured: [
        { label: "BABY", href: "/kids/baby" },
        { label: "GIRLS", href: "/kids/girls" },
        { label: "BOYS", href: "/kids/boys" },
      ],
    },
  },
  isLoading: false,
  error: null,
};

export const headerFallbackData: DynamicCategory[] = [
  {
    id: 1,
    name: "Rings",
    slug: "rings",
    categories: [
      { label: "Diamond Rings", slug: "diamond-rings" },
      { label: "Gold Rings", slug: "gold-rings" },
      { label: "Silver Rings", slug: "silver-rings" },
      { label: "Platinum Rings", slug: "platinum-rings" },
    ],
    featured: [
      { label: "ENGAGEMENT RINGS", slug: "engagement" },
      { label: "WEDDING BANDS", slug: "wedding-bands" },
    ],
  },
  {
    id: 2,
    name: "Necklaces",
    slug: "necklaces",
    categories: [
      { label: "Diamond Necklaces", slug: "diamond-necklaces" },
      { label: "Gold Necklaces", slug: "gold-necklaces" },
      { label: "Pearl Necklaces", slug: "pearl-necklaces" },
    ],
    featured: [
      { label: "PENDANTS", slug: "pendants" },
      { label: "CHAINS", slug: "chains" },
    ],
  },
  {
    id: 3,
    name: "Earrings",
    slug: "earrings",
    categories: [
      { label: "Diamond Earrings", slug: "diamond-earrings" },
      { label: "Gold Earrings", slug: "gold-earrings" },
      { label: "Silver Earrings", slug: "silver-earrings" },
    ],
    featured: [
      { label: "STUD EARRINGS", slug: "studs" },
      { label: "HOOP EARRINGS", slug: "hoops" },
    ],
  },
  {
    id: 4,
    name: "Bracelets",
    slug: "bracelets",
    categories: [
      { label: "Diamond Bracelets", slug: "diamond-bracelets" },
      { label: "Gold Bracelets", slug: "gold-bracelets" },
      { label: "Silver Bracelets", slug: "silver-bracelets" },
    ],
    featured: [
      { label: "BANGLES", slug: "bangles" },
      { label: "CHAIN BRACELETS", slug: "chains" },
    ],
  },
];

export const generateDummyData = (
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
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${subcategory}-sample-1`,
      slug: `${subcategory}-sample-1`,
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
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${subcategory}-sample-2`,
      slug: `${subcategory}-sample-2`,
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
