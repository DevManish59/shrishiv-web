import { NextRequest, NextResponse } from "next/server";
import { UnifiedPageData, UnifiedItem } from "@/lib/types";

// Mock unified data combining category header and products
const subcategoryData: Record<string, Record<string, UnifiedPageData>> = {
  men: {
    shirts: {
      items: [
        // First item is the category header
        {
          id: "header-men-shirts",
          title: "Men's Shirts",
          description: "Discover our collection of stylish men's shirts for every occasion.",
          image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
          buttonText: "Shop All Shirts",
          slug: "men-shirts",
        },
        // Remaining items are products
        {
          id: "ms-1",
          title: "Classic White Shirt",
          description: "A timeless white shirt perfect for any occasion.",
          image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
          price: 49.99,
          originalPrice: 69.99,
          rating: 4.7,
          reviewCount: 89,
          isNew: false,
          colors: ["#FFFFFF", "#F5F5DC", "#D3D3D3"],
          sizes: ["S", "M", "L", "XL"],
        },
        {
          id: "ms-2",
          title: "Blue Oxford Shirt",
          description: "Comfortable and stylish blue oxford shirt.",
          image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
          price: 59.99,
          originalPrice: 79.99,
          rating: 4.5,
          reviewCount: 124,
          isNew: true,
          colors: ["#191970", "#1E90FF", "#4682B4"],
          sizes: ["S", "M", "L", "XL"],
        },
        {
          id: "ms-3",
          title: "Striped Business Shirt",
          description: "Professional striped shirt for the office.",
          image: "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
          price: 69.99,
          originalPrice: 89.99,
          rating: 4.8,
          reviewCount: 156,
          isNew: false,
          colors: ["#000080", "#FFFFFF", "#808080"],
          sizes: ["S", "M", "L", "XL"],
        },
      ],
    },
    trousers: {
      items: [
        {
          id: "header-men-trousers",
          title: "Men's Trousers",
          description: "Comfortable and stylish trousers for the modern man.",
          image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
          buttonText: "Shop All Trousers",
          slug: "men-trousers",
        },
        {
          id: "mt-1",
          title: "Slim Fit Chinos",
          description: "Modern slim fit chinos in various colors.",
          image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
          price: 79.99,
          originalPrice: 99.99,
          rating: 4.6,
          reviewCount: 203,
          isNew: true,
          colors: ["#8B4513", "#000000", "#696969"],
          sizes: ["30", "32", "34", "36"],
        },
        {
          id: "mt-2",
          title: "Classic Dress Pants",
          description: "Elegant dress pants for formal occasions.",
          image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
          price: 89.99,
          originalPrice: 119.99,
          rating: 4.9,
          reviewCount: 145,
          isNew: false,
          colors: ["#000000", "#696969", "#D3D3D3"],
          sizes: ["30", "32", "34", "36"],
        },
      ],
    },
  },
  women: {
    dresses: {
      items: [
        {
          id: "header-women-dresses",
          title: "Women's Dresses",
          description: "Elegant dresses for every occasion and season.",
          image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
          buttonText: "Shop All Dresses",
          slug: "women-dresses",
        },
        {
          id: "wd-1",
          title: "Summer Floral Dress",
          description: "Beautiful floral dress perfect for summer.",
          image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
          price: 89.99,
          originalPrice: 119.99,
          rating: 4.8,
          reviewCount: 267,
          isNew: true,
          colors: ["#FF69B4", "#FFA07A", "#FFD700"],
          sizes: ["XS", "S", "M", "L"],
        },
        {
          id: "wd-2",
          title: "Evening Gown",
          description: "Elegant evening gown for special occasions.",
          image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
          price: 199.99,
          originalPrice: 249.99,
          rating: 4.9,
          reviewCount: 89,
          isNew: false,
          colors: ["#000000", "#800080", "#FF1493"],
          sizes: ["XS", "S", "M", "L", "XL"],
        },
      ],
    },
  },
  kids: {
    shirts: {
      items: [
        {
          id: "header-kids-shirts",
          title: "Kids' Shirts",
          description: "Comfortable and fun shirts for children.",
          image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
          buttonText: "Shop All Kids Shirts",
          slug: "kids-shirts",
        },
        {
          id: "ks-1",
          title: "Fun Graphic T-Shirt",
          description: "Comfortable and fun graphic t-shirt for kids.",
          image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
          price: 24.99,
          originalPrice: 29.99,
          rating: 4.7,
          reviewCount: 156,
          isNew: true,
          colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
          sizes: ["4", "6", "8", "10"],
        },
      ],
    },
  },
  rings: {
    ring: {
      items: [
        {
          id: "header-rings-ring",
          title: "Rings Collection",
          description: "Discover our exquisite collection of rings for every occasion.",
          image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
          buttonText: "Shop All Rings",
          slug: "rings-collection",
        },
        {
          id: "r-1",
          title: "Diamond Engagement Ring",
          description: "Beautiful diamond engagement ring with lab-grown diamonds.",
          image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
          price: 999.99,
          originalPrice: 1299.99,
          rating: 4.9,
          reviewCount: 245,
          isNew: false,
          colors: ["#FFFFFF", "#F5F5DC", "#FFD700"],
          sizes: ["5", "6", "7", "8", "9"],
        },
        {
          id: "r-2",
          title: "Gold Wedding Band",
          description: "Classic gold wedding band, perfect for your special day.",
          image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
          price: 499.99,
          originalPrice: 699.99,
          rating: 4.8,
          reviewCount: 189,
          isNew: true,
          colors: ["#FFD700", "#FFFFFF", "#C0C0C0"],
          sizes: ["5", "6", "7", "8", "9"],
        },
        {
          id: "r-3",
          title: "Silver Promise Ring",
          description: "Elegant silver promise ring with intricate design.",
          image: "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg",
          price: 199.99,
          originalPrice: 249.99,
          rating: 4.7,
          reviewCount: 312,
          isNew: false,
          colors: ["#C0C0C0", "#FFFFFF", "#FFD700"],
          sizes: ["5", "6", "7", "8", "9"],
        },
      ],
    },
  },
  necklaces: {
    necklace: {
      items: [
        {
          id: "header-necklaces-necklace",
          title: "Necklaces Collection",
          description: "Elegant necklaces to complement any outfit.",
          image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
          buttonText: "Shop All Necklaces",
          slug: "necklaces-collection",
        },
        {
          id: "n-1",
          title: "Gold Chain Necklace",
          description: "Classic gold chain necklace, perfect for everyday wear.",
          image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
          price: 149.99,
          originalPrice: 199.99,
          rating: 4.6,
          reviewCount: 178,
          isNew: false,
          colors: ["#FFD700", "#FFFFFF", "#C0C0C0"],
          sizes: ["16\"", "18\"", "20\"", "24\""],
        },
        {
          id: "n-2",
          title: "Diamond Pendant",
          description: "Elegant diamond pendant with delicate chain.",
          image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
          price: 299.99,
          originalPrice: 399.99,
          rating: 4.8,
          reviewCount: 134,
          isNew: true,
          colors: ["#FFFFFF", "#FFD700", "#C0C0C0"],
          sizes: ["16\"", "18\"", "20\""],
        },
      ],
    },
  },
  earrings: {
    earring: {
      items: [
        {
          id: "header-earrings-earring",
          title: "Earrings Collection",
          description: "Beautiful earrings for every style and occasion.",
          image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
          buttonText: "Shop All Earrings",
          slug: "earrings-collection",
        },
        {
          id: "e-1",
          title: "Gold Stud Earrings",
          description: "Classic gold stud earrings, timeless elegance.",
          image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
          price: 89.99,
          originalPrice: 119.99,
          rating: 4.7,
          reviewCount: 256,
          isNew: false,
          colors: ["#FFD700", "#FFFFFF", "#C0C0C0"],
          sizes: ["Standard"],
        },
        {
          id: "e-2",
          title: "Diamond Drop Earrings",
          description: "Sparkling diamond drop earrings for special occasions.",
          image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg",
          price: 399.99,
          originalPrice: 499.99,
          rating: 4.9,
          reviewCount: 89,
          isNew: true,
          colors: ["#FFFFFF", "#FFD700", "#C0C0C0"],
          sizes: ["Standard"],
        },
      ],
    },
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string; subcategory: string } }
) {
  const { category, subcategory } = params;

  try {
    // Check if category and subcategory exist
    if (!subcategoryData[category as keyof typeof subcategoryData]) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const categoryInfo = subcategoryData[category as keyof typeof subcategoryData];
    if (!categoryInfo[subcategory as keyof typeof categoryInfo]) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    const data = categoryInfo[subcategory as keyof typeof categoryInfo];

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Subcategory API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategory data' },
      { status: 500 }
    );
  }
} 