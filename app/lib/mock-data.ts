import { Product } from "./types";

interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
  description?: string;
  featured?: boolean;
  height?: "short" | "tall" | "extra-tall";
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    slug: "classic-cotton-t-shirt",
    description: "A comfortable and stylish cotton t-shirt for everyday wear.",
    shortDescription: "Classic cotton t-shirt",
    price: 1299,
    salePrice: 999,
    sku: "TSHIRT001",
    stock: 100,
    rating: 4.8,
    images: [
      "https://st.mngbcn.com/rcs/pics/static/T3/fotos/S20/37095138_99.jpg?ts=1695384514690&imwidth=422&imdensity=2",
      "https://st.mngbcn.com/rcs/pics/static/T3/fotos/S20/37095138_99_B.jpg?ts=1695384514690&imwidth=422&imdensity=2",
    ],
    categoryIds: ["clothing", "t-shirts"],
    tags: ["cotton", "casual", "basics"],
    featured: true,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Summer Dress",
    slug: "summer-dress",
    description: "A light and airy summer dress perfect for warm days.",
    shortDescription: "Light summer dress",
    price: 2499,
    salePrice: 1999,
    sku: "DRESS001",
    stock: 50,
    rating: 4.9,
    images: [
      "https://st.mngbcn.com/rcs/pics/static/T3/fotos/S20/37095138_99.jpg?ts=1695384514690&imwidth=422&imdensity=2",
      "https://st.mngbcn.com/rcs/pics/static/T3/fotos/S20/37095138_99_B.jpg?ts=1695384514690&imwidth=422&imdensity=2",
    ],
    categoryIds: ["clothing", "dresses"],
    tags: ["summer", "casual", "dress"],
    featured: true,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Casual Sneakers",
    slug: "casual-sneakers",
    description: "Comfortable and stylish sneakers for everyday wear.",
    shortDescription: "Casual sneakers",
    price: 1999,
    salePrice: 1499,
    sku: "SHOES001",
    stock: 75,
    rating: 4.7,
    images: [
      "https://st.mngbcn.com/rcs/pics/static/T3/fotos/T3/37095138_99_R.jpg?ts=1695384514690&imwidth=422&imdensity=2",
      "https://st.mngbcn.com/rcs/pics/static/T3/fotos/T3/37095138_99_D0.jpg?ts=1695384514690&imwidth=422&imdensity=2",
    ],
    categoryIds: ["shoes", "sneakers"],
    tags: ["casual", "shoes", "comfort"],
    featured: false,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Designer Handbag",
    slug: "designer-handbag",
    description: "A luxurious designer handbag for any occasion.",
    shortDescription: "Designer handbag",
    price: 3999,
    salePrice: 2999,
    sku: "BAG001",
    stock: 25,
    rating: 4.8,
    images: [
      "https://st.mngbcn.com/rcs/pics/static/T3/fotos/S20/37095138_99.jpg?ts=1695384514690&imwidth=422&imdensity=2",
      "https://st.mngbcn.com/rcs/pics/static/T3/fotos/S20/37095138_99_B.jpg?ts=1695384514690&imwidth=422&imdensity=2",
    ],
    categoryIds: ["accessories", "bags"],
    tags: ["luxury", "designer", "bags"],
    featured: true,
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockFeaturedProducts = products.filter(product => product.featured);

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Engagement Rings",
    href: "/collections/engagement-rings",
    description: "Beautiful lab grown diamond engagement rings",
    image: "/categories/engagement-rings.jpg",
    featured: true,
    height: "tall"
  },
  {
    id: "2",
    name: "Wedding Bands",
    href: "/collections/wedding-bands",
    description: "Elegant wedding bands for your special day",
    image: "/categories/wedding-bands.jpg",
    featured: true,
    height: "tall"
  },
  {
    id: "3",
    name: "Earrings",
    href: "/collections/earrings",
    description: "Stunning lab grown diamond earrings",
    image: "/categories/earrings.jpg",
    featured: false,
    height: "short"
  },
  {
    id: "4",
    name: "Necklaces",
    href: "/collections/necklaces",
    description: "Beautiful lab grown diamond necklaces",
    image: "/categories/necklaces.jpg",
    featured: false,
    height: "short"
  }
];

export const mockReviews = [
  {
    id: "1",
    rating: 5,
    title: "Exceptional Quality and Service!",
    comment: "This ring is even more beautiful in person! The craftsmanship is outstanding, and the customer service was exceptional. The sparkle and detail are exactly what I was hoping for. Shipping was super quick, and the ring paperwork actually shows that the ring is even better than described!",
    author: "Rebecca M.",
    date: "2024-03-15",
    isVerified: true,
    helpfulCount: 12,
    media: [
      "https://images.pexels.com/photos/1721937/pexels-photo-1721937.jpeg",
      "https://images.pexels.com/photos/1721938/pexels-photo-1721938.jpeg"
    ],
    storeResponse: {
      response: "Thank you for your fantastic feedback and for sharing the photos! We're thrilled to hear that you love the ring even more in person. It was a pleasure working with you, and we're glad the shipping was quick. Enjoy your beautiful ring!",
      date: "2024-03-16"
    }
  },
  {
    id: "2",
    rating: 5,
    title: "Dream Ring Come True",
    comment: "Can not say enough good things about this jeweler! They created my dream ring, and it's even more beautiful in person! The communication was excellent every step of the way and the ring came relatively quickly! The band is sturdy, the prongs are perfect, and the sparkle is unreal! Everything checks out and I couldn't be more happy! I've received so many compliments!",
    author: "Kristin W.",
    date: "2024-03-10",
    isVerified: true,
    helpfulCount: 15,
    media: [
      "https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg"
    ],
    storeResponse: {
      response: "Your glowing review means the world to us, Kristin! We're overjoyed to hear your dream ring surpassed expectations and that our communication and craftsmanship met your needs. Thank you for choosing us and sharing your happiness!",
      date: "2024-03-11"
    }
  },
  {
    id: "3",
    rating: 4,
    title: "Beautiful Ring, Slightly Delayed Shipping",
    comment: "The ring is absolutely gorgeous and exactly what I wanted. The only reason for 4 stars instead of 5 is that shipping took a bit longer than expected. However, the quality and craftsmanship more than make up for the wait. The diamonds are incredibly sparkly and the setting is very secure.",
    author: "Sarah L.",
    date: "2024-03-05",
    isVerified: true,
    helpfulCount: 8,
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    storeResponse: {
      response: "Thank you for your honest feedback, Sarah. We apologize for the shipping delay and appreciate your patience. We're delighted that you're happy with the ring's quality and will continue to work on improving our shipping times.",
      date: "2024-03-06"
    }
  },
  {
    id: "4",
    rating: 5,
    title: "Perfect Anniversary Gift",
    comment: "Ordered this as an anniversary gift for my wife and she absolutely loves it! The attention to detail is remarkable, and the sizing was perfect. The presentation box was also very elegant. Definitely exceeded our expectations!",
    author: "Michael P.",
    date: "2024-03-01",
    isVerified: true,
    helpfulCount: 10,
    media: [
      "https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg"
    ]
  },
  {
    id: "5",
    rating: 3,
    title: "Nice Ring, Size Issue",
    comment: "The ring itself is beautiful, but I had to return it for resizing. The process was a bit complicated and took longer than I would have liked. The customer service was helpful though, and they covered the shipping costs for the resize.",
    author: "Emma R.",
    date: "2024-02-28",
    isVerified: true,
    helpfulCount: 6,
    storeResponse: {
      response: "We appreciate your feedback, Emma. We're sorry for any inconvenience with the sizing process. We've noted your comments and are working to streamline our resizing service. Thank you for your patience and understanding.",
      date: "2024-02-29"
    }
  },
  // {
  //   id: "6",
  //   rating: 5,
  //   title: "Stunning Engagement Ring",
  //   comment: "My fiancée was absolutely speechless when I proposed with this ring! The sparkle is incredible and the craftsmanship is top-notch. The video really doesn't do it justice - it's even more beautiful in person. The whole process from ordering to delivery was smooth and professional.",
  //   author: "James K.",
  //   date: "2024-02-25",
  //   isVerified: true,
  //   helpfulCount: 20,
  //   media: [
  //     "https://images.pexels.com/photos/1457802/pexels-photo-1457802.jpeg"
  //   ],
  //   youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  // },
  // {
  //   id: "7",
  //   rating: 5,
  //   title: "Worth Every Penny",
  //   comment: "This piece is simply stunning! The quality is exceptional and it looks even better than the photos. I was a bit hesitant about ordering jewelry online, but this exceeded all my expectations. The packaging was secure and elegant too.",
  //   author: "Patricia N.",
  //   date: "2024-02-20",
  //   isVerified: true,
  //   helpfulCount: 14,
  //   media: [
  //     "https://images.pexels.com/photos/1457803/pexels-photo-1457803.jpeg",
  //     "https://images.pexels.com/photos/1457804/pexels-photo-1457804.jpeg"
  //   ]
  // },
  // {
  //   id: "8",
  //   rating: 4,
  //   title: "Beautiful but Pricy",
  //   comment: "The quality and craftsmanship are undeniable, and the ring is beautiful. However, I feel it's a bit overpriced compared to similar options I've seen. That said, the customer service and attention to detail were excellent.",
  //   author: "David M.",
  //   date: "2024-02-15",
  //   isVerified: true,
  //   helpfulCount: 9
  // },
  // {
  //   id: "9",
  //   rating: 5,
  //   title: "Perfect Custom Design",
  //   comment: "I had a specific design in mind and they brought it to life perfectly! The communication throughout the custom design process was excellent, and they were very patient with my revisions. The final product is exactly what I envisioned.",
  //   author: "Rachel B.",
  //   date: "2024-02-10",
  //   isVerified: true,
  //   helpfulCount: 16,
  //   media: [
  //     "https://images.pexels.com/photos/1457805/pexels-photo-1457805.jpeg"
  //   ],
  //   storeResponse: {
  //     response: "Thank you for trusting us with your custom design, Rachel! We enjoyed working with you to create your perfect piece and are thrilled that you're happy with the result.",
  //     date: "2024-02-11"
  //   }
  // },
  // {
  //   id: "10",
  //   rating: 2,
  //   title: "Disappointed with Durability",
  //   comment: "While the ring looked beautiful initially, one of the small stones fell out after just two months of normal wear. The warranty process was straightforward and they fixed it free of charge, but I'm concerned about long-term durability.",
  //   author: "Lisa T.",
  //   date: "2024-02-05",
  //   isVerified: true,
  //   helpfulCount: 11,
  //   storeResponse: {
  //     response: "We sincerely apologize for this issue, Lisa. While this is uncommon, we stand behind our products and are glad we could repair it under warranty. We've noted your concerns and have performed additional quality checks on this design.",
  //     date: "2024-02-06"
  //   }
  // }
];

export const mockReviewSummary = {
  totalRating: 4.3,
  ratingDistribution: {
    5: 6,
    4: 2,
    3: 1,
    2: 1,
    1: 0
  }
}; 