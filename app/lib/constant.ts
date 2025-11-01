import { UnifiedItem } from "./types";

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
