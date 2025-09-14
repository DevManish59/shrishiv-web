import { NextResponse } from "next/server";

export async function GET() {
  // Mock featured categories data
  const featuredCategories = [
    {
      id: "featured-sale",
      title: "EXCLUSIVE SALE",
      subtitle: "Up to 70% off on selected items. Don't miss out!",
      image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1600&h=800&fit=crop",
      href: "/sale",
      size: "full" as const,
    },
    {
      id: "shirts",
      title: "SHIRTS",
      subtitle: "New Collection",
      image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
      href: "/men/shirts",
      size: "half" as const,
    },
    {
      id: "trousers",
      title: "TROUSERS",
      subtitle: "Spring/Summer 2024",
      image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
      href: "/men/trousers",
      size: "half" as const,
    },
    {
      id: "dresses",
      title: "DRESSES",
      subtitle: "Elegant Collection",
      image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
      href: "/women/dresses",
      size: "half" as const,
    },
    {
      id: "kids",
      title: "KIDS",
      subtitle: "New Collection",
      image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
      href: "/kids/shirts",
      size: "half" as const,
    },
    {
      id: "accessories",
      title: "ACCESSORIES",
      subtitle: "Complete Your Look",
      image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop",
      href: "/accessories",
      size: "half" as const,
    },
  ];

  return NextResponse.json(featuredCategories, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate', // 5 minutes
    },
  });
} 