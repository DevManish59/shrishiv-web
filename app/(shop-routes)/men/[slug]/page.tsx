/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import { ChevronDown, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProductGrid from "@/components/product-grid";
import CollectionHeader from "@/components/collection-header";
import ProductViewToggle from "@/components/product-view-toggle";
import ProductSort from "@/components/product-sort";
import ProductFilters from "@/components/product-filter";
import ActiveFilters from "@/components/active-filter";
import FilterDialog from "@/components/filter-dialog";
import FilterButton from "@/components/filter-button";
import StickyFilterBar from "@/components/sticky-filter-bar";

// Mock data (in a real app, this would come from an API or CMS)
const getCollectionData = (slug: string) => {
  const collection = {
    slug: "summer-collection",
    name: "Summer Collection",
    description:
      "Discover our vibrant summer collection featuring lightweight fabrics, breathable materials, and trendy designs perfect for the sunny season. From casual wear to beach essentials, we've got you covered.",
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop",
    productCount: 56,
  };

  // In a real app, you would fetch this based on the slug
  return collection;
};

const getProducts = () => {
  // Mock products array (same as in your original code)
  return [
    {
      id: 1,
      slug: "linen-shirt-white",
      name: "Linen Shirt - White",
      price: "$49",
      originalPrice: "$69",
      image:
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 89,
      isNew: true,
      colors: ["#FFFFFF", "#F5F5DC", "#D3D3D3"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      slug: "denim-shorts-blue",
      name: "Denim Shorts - Blue",
      price: "$39",
      originalPrice: "$49",
      image:
        "https://images.pexels.com/photos/588604/pexels-photo-588604.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.5,
      reviews: 124,
      isNew: false,
      colors: ["#191970", "#1E90FF", "#4682B4"],
      sizes: ["S", "M", "L"],
    },
    {
      id: 3,
      slug: "cotton-dress-floral",
      name: "Cotton Dress - Floral",
      price: "$59",
      originalPrice: "$79",
      image:
        "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 156,
      isNew: true,
      colors: ["#FF69B4", "#FFA07A", "#FFD700"],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      id: 4,
      slug: "swim-trunks-navy",
      name: "Swim Trunks - Navy",
      price: "$35",
      originalPrice: "$45",
      image:
        "https://images.pexels.com/photos/1484807/pexels-photo-1484807.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 78,
      isNew: false,
      colors: ["#000080", "#4169E1", "#4682B4"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 5,
      slug: "straw-hat-natural",
      name: "Straw Hat - Natural",
      price: "$29",
      originalPrice: "$39",
      image:
        "https://images.pexels.com/photos/35185/hats-fedora-hat-manufacture-stack.jpg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.4,
      reviews: 112,
      isNew: true,
      colors: ["#D2B48C", "#F5DEB3", "#8B4513"],
      sizes: ["One Size"],
    },
    {
      id: 6,
      slug: "canvas-sneakers-white",
      name: "Canvas Sneakers - White",
      price: "$45",
      originalPrice: "$65",
      image:
        "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 203,
      isNew: false,
      colors: ["#FFFFFF", "#F5F5F5", "#D3D3D3"],
      sizes: ["7", "8", "9", "10", "11"],
    },
    {
      id: 7,
      slug: "linen-pants-beige",
      name: "Linen Pants - Beige",
      price: "$55",
      originalPrice: "$75",
      image:
        "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 67,
      isNew: true,
      colors: ["#F5F5DC", "#D2B48C", "#8B4513"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 8,
      slug: "graphic-t-shirt-black",
      name: "Graphic T-Shirt - Black",
      price: "$25",
      originalPrice: "$35",
      image:
        "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.5,
      reviews: 145,
      isNew: false,
      colors: ["#000000", "#696969", "#808080"],
      sizes: ["S", "M", "L", "XL"],
    },
  ]; // Your products array here
};

const getFilterOptions = () => {
  // Mock filter options (same as in your original code)
  return {
    price: [
      { value: "0-30", label: "Under $30" },
      { value: "30-50", label: "$30 - $50" },
      { value: "50-100", label: "$50 - $100" },
      { value: "100+", label: "$100+" },
    ],
    category: [
      { value: "tops", label: "Tops" },
      { value: "bottoms", label: "Bottoms" },
      { value: "dresses", label: "Dresses" },
      { value: "outerwear", label: "Outerwear" },
      { value: "accessories", label: "Accessories" },
      { value: "footwear", label: "Footwear" },
    ],
    size: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "xxl", label: "XXL" },
    ],
    color: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "blue", label: "Blue" },
      { value: "red", label: "Red" },
      { value: "green", label: "Green" },
      { value: "yellow", label: "Yellow" },
      { value: "beige", label: "Beige" },
    ],
  }; // Your filterOptions object here
};

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const collection = getCollectionData(params.slug);

  return {
    title: `${collection.name} | Our Store`,
    description: collection.description,
    openGraph: {
      title: collection.name,
      description: collection.description,
      images: [collection.image],
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: "summer-collection" },
    { slug: "new-arrivals" },
    { slug: "mens-fashion" },
    { slug: "womens-fashion" },
    { slug: "casual-wear" },
    { slug: "formal-wear" },
  ];
}

export default function CollectionPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const collection = getCollectionData(params.slug);
  const products = getProducts();
  const filterOptions = getFilterOptions();

  // Extract filter params from URL
  const activeFilters = {
    price: searchParams.price
      ? Array.isArray(searchParams.price)
        ? searchParams.price
        : searchParams.price.split(",")
      : [],
    category: searchParams.category
      ? Array.isArray(searchParams.category)
        ? searchParams.category
        : searchParams.category.split(",")
      : [],
    size: searchParams.size
      ? Array.isArray(searchParams.size)
        ? searchParams.size
        : searchParams.size.split(",")
      : [],
    color: searchParams.color
      ? Array.isArray(searchParams.color)
        ? searchParams.color
        : searchParams.color.split(",")
      : [],
  };

  return (
    <div className="mx-auto">
      <CollectionHeader collection={collection} />

      {/* Container for sticky behavior */}
      <div className="relative min-h-[80vh]">
        <StickyFilterBar
          filterOptions={filterOptions}
          activeFilters={activeFilters}
          searchParams={searchParams}
        />
        <ActiveFilters
          activeFilters={activeFilters}
          filterOptions={filterOptions}
          searchParams={searchParams}
        />
        {/* <div className="max-w-full mx-auto"> */}
        <ProductGrid products={products} />
        {/* </div> */}
      </div>
    </div>
  );
}
