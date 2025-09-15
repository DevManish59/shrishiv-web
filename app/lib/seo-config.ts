import { Metadata } from "next";

// SEO Configuration
export const SEO_CONFIG = {
  siteName: "Shrishiv",
  siteDescription:
    "Lab Grown Diamond Jewelry - Premium quality diamonds, ethical sourcing, and stunning designs for every occasion.",
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://mabji-india.vercel.app",
  siteImage: "/logo.png",
  twitterHandle: "@shrishiv",
  facebookPage: "https://facebook.com/shrishiv",
  instagramPage: "https://instagram.com/shrishiv",
  phone: "+1-555-0123",
  email: "info@shrishiv.com",
  address: {
    street: "123 Jewelry Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US",
  },
  businessHours: {
    open: "09:00",
    close: "18:00",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
};

// Default metadata for pages
export function generateDefaultMetadata(): Metadata {
  return {
    title: {
      default: SEO_CONFIG.siteName,
      template: `%s | ${SEO_CONFIG.siteName}`,
    },
    description: SEO_CONFIG.siteDescription,
    keywords: [
      "lab grown diamonds",
      "diamond jewelry",
      "engagement rings",
      "wedding rings",
      "diamond necklaces",
      "ethical jewelry",
      "lab grown diamond rings",
      "diamond earrings",
      "diamond bracelets",
    ],
    authors: [{ name: SEO_CONFIG.siteName }],
    creator: SEO_CONFIG.siteName,
    publisher: SEO_CONFIG.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SEO_CONFIG.siteUrl),
    alternates: {
      canonical: SEO_CONFIG.siteUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SEO_CONFIG.siteUrl,
      title: SEO_CONFIG.siteName,
      description: SEO_CONFIG.siteDescription,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: `${SEO_CONFIG.siteUrl}${SEO_CONFIG.siteImage}`,
          width: 1200,
          height: 630,
          alt: SEO_CONFIG.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SEO_CONFIG.siteName,
      description: SEO_CONFIG.siteDescription,
      images: [`${SEO_CONFIG.siteUrl}${SEO_CONFIG.siteImage}`],
      creator: SEO_CONFIG.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
      yahoo: "your-yahoo-verification-code",
    },
  };
}

// Product metadata generator
export function generateProductMetadata(product: {
  name: string;
  description: string;
  price: number;
  images: string[];
  slug: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
}): Metadata {
  const productUrl = `${SEO_CONFIG.siteUrl}/products/${product.slug}`;
  const productImage = product.images[0] || SEO_CONFIG.siteImage;

  return {
    title: `${product.name} - ${SEO_CONFIG.siteName}`,
    description: product.description,
    keywords: [
      product.name.toLowerCase(),
      "lab grown diamond",
      "jewelry",
      product.category?.toLowerCase(),
      "engagement ring",
      "diamond ring",
    ].filter(Boolean),
    openGraph: {
      title: product.name,
      description: product.description,
      url: productUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [productImage],
    },
    alternates: {
      canonical: productUrl,
    },
    other: {
      "product:price:amount": product.price.toString(),
      "product:price:currency": "USD",
      "product:availability": "in stock",
      "product:condition": "new",
    },
  };
}

// Category metadata generator
export function generateCategoryMetadata(category: {
  name: string;
  description: string;
  slug: string;
  image?: string;
}): Metadata {
  const categoryUrl = `${SEO_CONFIG.siteUrl}/collections/${category.slug}`;
  const categoryImage = category.image || SEO_CONFIG.siteImage;

  return {
    title: `${category.name} - ${SEO_CONFIG.siteName}`,
    description: category.description,
    keywords: [
      category.name.toLowerCase(),
      "jewelry",
      "diamond jewelry",
      "lab grown diamonds",
      category.slug,
    ],
    openGraph: {
      title: category.name,
      description: category.description,
      url: categoryUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: categoryImage,
          width: 1200,
          height: 630,
          alt: category.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: category.name,
      description: category.description,
      images: [categoryImage],
    },
    alternates: {
      canonical: categoryUrl,
    },
  };
}

// Collection metadata generator
export function generateCollectionMetadata(collection: {
  name: string;
  description: string;
  slug: string;
  image?: string;
}): Metadata {
  const collectionUrl = `${SEO_CONFIG.siteUrl}/${collection.slug}`;
  const collectionImage = collection.image || SEO_CONFIG.siteImage;

  return {
    title: `${collection.name} - ${SEO_CONFIG.siteName}`,
    description: collection.description,
    keywords: [
      collection.name.toLowerCase(),
      "jewelry",
      "diamond jewelry",
      "lab grown diamonds",
      collection.slug,
    ],
    openGraph: {
      title: collection.name,
      description: collection.description,
      url: collectionUrl,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: collectionImage,
          width: 1200,
          height: 630,
          alt: collection.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: collection.name,
      description: collection.description,
      images: [collectionImage],
    },
    alternates: {
      canonical: collectionUrl,
    },
  };
}
