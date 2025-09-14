"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useClickOutside } from "@/hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import LoginModal from "../ui/login-modal";
import CartModal from "../ui/cart-modal";
import { Menu, Search, User, ShoppingBag, X, Loader2 } from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  className?: string;
}

interface Category {
  label: string;
  slug: string;
}

interface DynamicCategory {
  id: number;
  name: string;
  slug: string;
  categories: Category[];
  featured: MenuItem[];
}

interface ApiMenuData {
  categories: DynamicCategory[];
}

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedMobileCategory, setSelectedMobileCategory] =
    useState<string>("");
  const [menuData, setMenuData] = useState<DynamicCategory[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null!);
  const menuRef = useRef<HTMLDivElement>(null!);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { itemCount, openCart } = useCart();

  useClickOutside(searchRef, () => setShowSearch(false));
  useClickOutside(menuRef, () => setHoveredMenu(null));

  // Handle menu hover with delay
  const handleMenuEnter = (menuSlug: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    setHoveredMenu(menuSlug);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 150); // 150ms delay before closing
  };

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  // Fetch header data on component mount
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        setMenuLoading(true);
        setMenuError(null);
        const response = await fetch("/api/header-data");

        if (!response.ok) {
          throw new Error("Failed to fetch header data");
        }

        const data: ApiMenuData = await response.json();
        setMenuData(data.categories);
        // Set the first category as selected for mobile menu
        if (data.categories.length > 0) {
          setSelectedMobileCategory(data.categories[0].slug);
        }
      } catch (error) {
        console.error("Error fetching header data:", error);
        setMenuError("Failed to load menu data");
        // Fallback to static jewelry data
        const fallbackData: DynamicCategory[] = [
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
              { label: "ENGAGEMENT RINGS", href: "/rings/engagement" },
              { label: "WEDDING BANDS", href: "/rings/wedding-bands" },
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
              { label: "PENDANTS", href: "/necklaces/pendants" },
              { label: "CHAINS", href: "/necklaces/chains" },
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
              { label: "STUD EARRINGS", href: "/earrings/studs" },
              { label: "HOOP EARRINGS", href: "/earrings/hoops" },
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
              { label: "BANGLES", href: "/bracelets/bangles" },
              { label: "CHAIN BRACELETS", href: "/bracelets/chains" },
            ],
          },
        ];
        setMenuData(fallbackData);
        if (fallbackData.length > 0) {
          setSelectedMobileCategory(fallbackData[0].slug);
        }
      } finally {
        setMenuLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  // Handle mobile menu open/close
  const handleMobileMenu = (isOpen: boolean) => {
    setShowMobileMenu(isOpen);
    setShowOverlay(isOpen);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSelectedMobileCategory("women"); // Reset to women when opening
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const menuAnimation = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
    transition: { duration: 0.2 },
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm text-black">
      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => handleMobileMenu(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Left: Categories for Desktop */}
          <nav className="hidden md:flex items-center space-x-6 h-full">
            {menuLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-gray-500">Loading...</span>
              </div>
            ) : menuError ? (
              <span className="text-sm text-red-500">Error loading menu</span>
            ) : (
              menuData.map((category) => (
                <div
                  key={category.slug}
                  className="relative h-full flex items-center cursor-pointer uppercase text-sm font-semibold hover:text-gray-600 transition-colors"
                  onMouseEnter={() => handleMenuEnter(category.slug)}
                  onMouseLeave={handleMenuLeave}
                >
                  {category.name}
                </div>
              ))
            )}
          </nav>

          {/* Center: Logo */}
          <Link
            href="/"
            // className="absolute left-1/2 transform -translate-x-1/2"
          >
            <Image
              src="/logo.png"
              alt="SHRISHIV"
              width={150}
              height={30}
              className="h-[60px] w-[150px] object-cover"
              priority
            />
          </Link>

          {/* Right: Search + Auth */}
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div ref={searchRef} className="relative">
              <AnimatePresence>
                {showSearch ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center bg-white overflow-hidden border rounded-md px-2 py-1"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search..."
                      className="w-full bg-transparent outline-none text-sm text-black"
                    />
                    <button
                      className="ml-2 text-gray-500"
                      onClick={() => setShowSearch(false)}
                    >
                      ✕
                    </button>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setShowSearch(true)}
                    className="hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Auth Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="hover:text-gray-600 transition-colors cursor-pointer"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={openCart}
                className="hover:text-gray-600 transition-colors relative cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu */}
      <AnimatePresence>
        {hoveredMenu && menuData && (
          <motion.div
            ref={menuRef}
            className="absolute left-0 right-0 bg-white shadow-lg border-t hidden md:block"
            onMouseEnter={() => handleMenuEnter(hoveredMenu)}
            onMouseLeave={handleMenuLeave}
            {...menuAnimation}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Categories</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(() => {
                      const hoveredCategory = menuData.find(
                        (cat) => cat.slug === hoveredMenu
                      );
                      return hoveredCategory
                        ? hoveredCategory.categories.map((item) => (
                            <Link
                              key={item.label}
                              href={`/${hoveredMenu}/${item.slug}`}
                              className="hover:text-gray-600 transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))
                        : null;
                    })()}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Featured</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(() => {
                      const hoveredCategory = menuData.find(
                        (cat) => cat.slug === hoveredMenu
                      );
                      return hoveredCategory
                        ? hoveredCategory.featured.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className={`hover:text-gray-600 transition-colors ${
                                item.className || ""
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))
                        : null;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => handleMobileMenu(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-white z-50 md:hidden overflow-y-auto"
          >
            <div className="p-4">
              {/* Close Button */}
              <div className="flex justify-between items-center mb-6">
                {/* Main Categories */}
                <div className="flex space-x-6">
                  {menuLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-500">Loading...</span>
                    </div>
                  ) : menuError ? (
                    <span className="text-sm text-red-500">
                      Error loading menu
                    </span>
                  ) : (
                    menuData.map((category) => (
                      <button
                        key={category.slug}
                        onClick={() => setSelectedMobileCategory(category.slug)}
                        className={`uppercase cursor-pointer ${
                          selectedMobileCategory === category.slug
                            ? "font-bold border-b-2 border-black"
                            : ""
                        }`}
                      >
                        {category.name}
                      </button>
                    ))
                  )}
                </div>
                <button
                  onClick={() => handleMobileMenu(false)}
                  className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-6">
                {/* Category Specific Items */}
                {menuData &&
                  (() => {
                    const selectedCategory = menuData.find(
                      (cat) => cat.slug === selectedMobileCategory
                    );
                    return selectedCategory ? (
                      <div className="space-y-6">
                        {selectedCategory.categories.map((category, idx) => (
                          <div key={idx} className="space-y-3">
                            <h3 className="font-bold text-sm uppercase">
                              {category.label}
                            </h3>
                            <div className="space-y-2 pl-4">
                              <Link
                                href={`/${selectedMobileCategory}/${category.slug}`}
                                className="block text-sm text-gray-600 hover:text-black transition-colors"
                              >
                                View All {category.label}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null;
                  })()}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <CartModal />
    </header>
  );
}
