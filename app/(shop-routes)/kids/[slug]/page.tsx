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
  // Mock products array for kids' fashion (boys and girls)
  return [
    {
      id: 1,
      slug: "kids-cotton-tshirt-blue",
      name: "Kids Cotton T-Shirt - Blue",
      price: "$24",
      originalPrice: "$32",
      image:
        "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 89,
      isNew: true,
      colors: ["#1E90FF", "#4169E1", "#0000CD", "#191970"],
      sizes: ["2T", "3T", "4T", "5T", "6T"],
      gender: "unisex",
    },
    {
      id: 2,
      slug: "girls-floral-dress-pink",
      name: "Girls Floral Dress - Pink",
      price: "$39",
      originalPrice: "$49",
      image:
        "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 156,
      isNew: true,
      colors: ["#FF69B4", "#FFB6C1", "#FFC0CB", "#FF1493"],
      sizes: ["2T", "3T", "4T", "5T", "6T"],
      gender: "girls",
    },
    {
      id: 3,
      slug: "boys-cargo-pants-khaki",
      name: "Boys Cargo Pants - Khaki",
      price: "$34",
      originalPrice: "$44",
      image:
        "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 123,
      isNew: false,
      colors: ["#F4A460", "#D2B48C", "#8B4513", "#DEB887"],
      sizes: ["2T", "3T", "4T", "5T", "6T"],
      gender: "boys",
    },
    {
      id: 4,
      slug: "kids-hoodie-gray",
      name: "Kids Hoodie - Gray",
      price: "$29",
      originalPrice: "$39",
      image:
        "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 98,
      isNew: true,
      colors: ["#808080", "#696969", "#A9A9A9", "#2F4F4F"],
      sizes: ["2T", "3T", "4T", "5T", "6T"],
      gender: "unisex",
    },
    {
      id: 5,
      slug: "girls-tutu-skirt-white",
      name: "Girls Tutu Skirt - White",
      price: "$19",
      originalPrice: "$25",
      image:
        "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 67,
      isNew: true,
      colors: ["#FFFFFF", "#F5F5DC", "#F0F8FF", "#FFFAFA"],
      sizes: ["2T", "3T", "4T", "5T", "6T"],
      gender: "girls",
    },
    {
      id: 6,
      slug: "boys-polo-shirt-red",
      name: "Boys Polo Shirt - Red",
      price: "$22",
      originalPrice: "$28",
      image:
        "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.5,
      reviews: 78,
      isNew: false,
      colors: ["#DC143C", "#B22222", "#8B0000", "#FF0000"],
      sizes: ["2T", "3T", "4T", "5T", "6T"],
      gender: "boys",
    },
    {
      id: 7,
      slug: "kids-sneakers-white",
      name: "Kids Sneakers - White",
      price: "$45",
      originalPrice: "$59",
      image:
        "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 134,
      isNew: true,
      colors: ["#FFFFFF", "#F5F5DC", "#F0F8FF", "#FFFAFA"],
      sizes: ["8", "9", "10", "11", "12", "13"],
      gender: "unisex",
    },
    {
      id: 8,
      slug: "girls-leggings-purple",
      name: "Girls Leggings - Purple",
      price: "$16",
      originalPrice: "$22",
      image:
        "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 67,
      isNew: true,
      colors: ["#F5F5DC", "#D2B48C", "#8B4513"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 8,
      slug: "linen-pants-beige",
      name: "Linen Pants - Beige",
      price: "$55",
      originalPrice: "$75",
      image:
        "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      rating: 4.7,
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
    // category: [
    //   { value: "tops", label: "Tops" },
    //   { value: "bottoms", label: "Bottoms" },
    //   { value: "dresses", label: "Dresses" },
    //   { value: "outerwear", label: "Outerwear" },
    //   { value: "accessories", label: "Accessories" },
    //   { value: "footwear", label: "Footwear" },
    // ],
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
    // category: searchParams.category
    //   ? Array.isArray(searchParams.category)
    //     ? searchParams.category
    //     : searchParams.category.split(",")
    //   : [],
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

  const sortBy = searchParams.sort?.toString() || "featured";

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
