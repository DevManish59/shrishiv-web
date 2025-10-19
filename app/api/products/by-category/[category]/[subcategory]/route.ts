import { NextRequest, NextResponse } from "next/server";

// Mock product data
const productData = {
  men: {
    shirts: {
      products: [
        {
          id: "ms-1",
          name: "Classic White Shirt",
          description: "A timeless white shirt perfect for any occasion.",
          price: 49.99,
          images: [
            "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
          ],
        },
        {
          id: "ms-2",
          name: "Blue Oxford Shirt",
          description: "Comfortable and stylish blue oxford shirt.",
          price: 59.99,
          images: [
            "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
          ],
        },
        {
          id: "ms-3",
          name: "Striped Business Shirt",
          description: "Professional striped shirt for the office.",
          price: 69.99,
          images: [
            "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
          ],
        },
      ],
    },
    trousers: {
      products: [
        {
          id: "mt-1",
          name: "Slim Fit Chinos",
          description: "Modern slim fit chinos in various colors.",
          price: 79.99,
          images: [
            "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
          ],
        },
        {
          id: "mt-2",
          name: "Classic Dress Pants",
          description: "Elegant dress pants for formal occasions.",
          price: 89.99,
          images: [
            "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
          ],
        },
      ],
    },
    jeans: {
      products: [
        {
          id: "mj-1",
          name: "Slim Fit Jeans",
          description: "Comfortable slim fit jeans for everyday wear.",
          price: 89.99,
          images: [
            "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
          ],
        },
      ],
    },
    jackets: {
      products: [
        {
          id: "mjk-1",
          name: "Leather Jacket",
          description: "Classic leather jacket for a bold look.",
          price: 199.99,
          images: [
            "https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg",
          ],
        },
      ],
    },
    accessories: {
      products: [
        {
          id: "ma-1",
          name: "Leather Belt",
          description: "High-quality leather belt.",
          price: 29.99,
          images: [
            "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
          ],
        },
      ],
    },
  },
  women: {
    dresses: {
      products: [
        {
          id: "wd-1",
          name: "Summer Floral Dress",
          description: "Beautiful floral dress perfect for summer.",
          price: 89.99,
          images: [
            "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
          ],
        },
        {
          id: "wd-2",
          name: "Evening Gown",
          description: "Elegant evening gown for special occasions.",
          price: 199.99,
          images: [
            "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
          ],
        },
      ],
    },
    tops: {
      products: [
        {
          id: "wt-1",
          name: "Silk Blouse",
          description: "Elegant silk blouse for professional wear.",
          price: 79.99,
          images: [
            "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
          ],
        },
      ],
    },
    skirts: {
      products: [
        {
          id: "ws-1",
          name: "A-Line Skirt",
          description: "Versatile A-line skirt for work and leisure.",
          price: 69.99,
          images: [
            "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
          ],
        },
      ],
    },
    jeans: {
      products: [
        {
          id: "wj-1",
          name: "High-Waist Jeans",
          description: "Trendy high-waist jeans for women.",
          price: 99.99,
          images: [
            "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
          ],
        },
      ],
    },
    accessories: {
      products: [
        {
          id: "wa-1",
          name: "Statement Necklace",
          description: "Beautiful statement necklace to complete your look.",
          price: 39.99,
          images: [
            "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
          ],
        },
      ],
    },
  },
  kids: {
    shirts: {
      products: [
        {
          id: "ks-1",
          name: "Fun Graphic T-Shirt",
          description: "Comfortable and fun graphic t-shirt for kids.",
          price: 24.99,
          images: [
            "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
          ],
        },
      ],
    },
    dresses: {
      products: [
        {
          id: "kd-1",
          name: "Party Dress",
          description: "Adorable party dress for special occasions.",
          price: 49.99,
          images: [
            "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
          ],
        },
      ],
    },
    trousers: {
      products: [
        {
          id: "kt-1",
          name: "Comfortable Pants",
          description: "Durable and comfortable pants for active kids.",
          price: 34.99,
          images: [
            "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
          ],
        },
      ],
    },
    accessories: {
      products: [
        {
          id: "ka-1",
          name: "Fun Backpack",
          description: "Colorful and fun backpack for school.",
          price: 29.99,
          images: [
            "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
          ],
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
    if (!productData[category as keyof typeof productData]) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const categoryProducts = productData[category as keyof typeof productData];
    if (!categoryProducts[subcategory as keyof typeof categoryProducts]) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      );
    }

    const data = categoryProducts[subcategory as keyof typeof categoryProducts];

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
