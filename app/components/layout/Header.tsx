"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useClickOutside } from "@/hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";
import LocalizedLink from "./LocalizedLink";
// import { useCart } from "@/contexts/CartContext";
import { useCart } from "@/contexts/LocalStorageCartContext";
import LoginModal from "../ui/login-modal";
import CartModal from "../ui/cart-modal";
import {
  Menu,
  Search,
  User,
  ShoppingBag,
  X,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { DynamicCategory } from "@/types/header";
interface ApiMenuData {
  categories: DynamicCategory[];
}

export default function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [menuData, setMenuData] = useState<DynamicCategory[]>([]);
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null!);
  const menuRef = useRef<HTMLDivElement>(null!);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);

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

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
        // if (data.categories.length > 0) {
        //   setSelectedMobileCategory(data.categories[0].slug);
        // }
      } catch (error) {
        console.error("Error fetching header data:", error);
        setMenuError("Failed to load menu data");
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden cursor-pointer"
            onClick={() => handleMobileMenu(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <nav className="hidden md:flex items-center absolute left-0 space-x-6 h-full">
            {menuLoading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-gray-500">Loading...</span>
              </div>
            ) : menuError ? (
              <span className="text-sm text-red-500">Error loading menu</span>
            ) : (
              menuData.slice(0, 5).map((category) => (
                <div
                  key={category.slug}
                  className="relative h-full flex items-center cursor-pointer uppercase text-sm font-semibold hover:text-gray-600 transition-colors"
                  onMouseEnter={() => handleMenuEnter(category.slug)}
                  onMouseLeave={handleMenuLeave}
                  // onClick={Router.push}
                >
                  {category.name}
                </div>
              ))
            )}
          </nav>

          {/* Center: Logo */}
          <div className="sm:mx-auto mr-[30%] text-center">
            <LocalizedLink
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
            </LocalizedLink>
          </div>

          {/* Right: Search + Auth */}
          <div className="absolute right-0 flex items-center sm:space-x-4 space-x-2">
            {/* Search Input */}
            <div ref={searchRef} className="relative flex items-center">
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
            <div className="flex items-center sm:space-x-4 space-x-2">
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
            <div className="container mx-auto px-8 py-6">
              <div className="grid grid-cols-2 gap-8">
                {(() => {
                  // Find hovered category once, not twice
                  const hoveredCategory = menuData.find(
                    (cat) => cat.slug === hoveredMenu
                  );

                  if (!hoveredCategory) return null;

                  const { categories = [], featured = [] } = hoveredCategory;

                  return (
                    <>
                      {/* Categories Section */}
                      <div>
                        <h3 className="font-semibold mb-4">Categories</h3>
                        {categories.length ? (
                          <div className="grid grid-cols-2 gap-2">
                            {categories.map((item) => (
                              <LocalizedLink
                                key={item.slug}
                                href={`/${hoveredMenu}/${item.slug}`}
                                className="hover:text-gray-600 transition-colors"
                              >
                                {item.label}
                              </LocalizedLink>
                            ))}
                          </div>
                        ) : (
                          <div>
                            <h3 className="text-gray-500 text-sm my-2">
                              No Categories Found
                            </h3>
                          </div>
                        )}
                      </div>

                      {/* Featured Section */}
                      <div>
                        <h3 className="font-semibold mb-4">Featured</h3>
                        {featured.length ? (
                          <div className="grid grid-cols-2 gap-2">
                            {featured.map((item) => (
                              <LocalizedLink
                                key={item.slug}
                                href={`/${hoveredMenu}/${item.slug}`}
                                className="hover:text-gray-600 transition-colors"
                              >
                                {item.label}
                              </LocalizedLink>
                            ))}
                          </div>
                        ) : (
                          <div>
                            <h3 className="text-gray-500 text-sm my-2">
                              No Featured Found
                            </h3>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
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
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 flex justify-between items-center px-2.5 py-1">
              <LocalizedLink href="/">
                <Image
                  src="/logo.png"
                  alt="SHRISHIV"
                  width={150}
                  height={30}
                  className="h-[50px] w-[150px] object-cover"
                  priority
                />
              </LocalizedLink>{" "}
              <button
                onClick={() => handleMobileMenu(false)}
                className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>{" "}
            </div>
            <div className="p-3 h-auto">
              {menuData.map((category, index) => (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white text-black border-b border-b-gray-200 overflow-hidden"
                >
                  <button
                    className="w-full px-2 py-3 text-left flex items-center justify-between transition-colors cursor-pointer"
                    onClick={() => toggleItem(category.slug)}
                  >
                    <span className="font-semibold text-sm uppercase">
                      {category.name}
                    </span>
                    <motion.div
                      animate={{
                        rotate: openItems.includes(category.slug) ? 180 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={20} className="text-black" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: openItems.includes(category.slug) ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-sm"
                  >
                    <div className="px-5 pb-4">
                      {category?.categories.length > 0 && (
                        <div>
                          <h3 className="text-gray-500 font-semibold my-2">
                            Categories
                          </h3>

                          {category?.categories.map((item) => (
                            <div
                              className="flex flex-col gap-1.5"
                              key={item.slug}
                            >
                              <LocalizedLink
                                href={`/${category.slug}/${item.slug}`}
                                className="hover:text-gray-600 transition-colors"
                                onClick={() => setShowMobileMenu(false)}
                              >
                                {item.label}
                              </LocalizedLink>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Featured Section */}
                      {category?.featured.length > 0 && (
                        <div>
                          <h3 className="text-gray-500 font-semibold my-2">
                            Featured
                          </h3>
                          {category?.featured.map((item) => (
                            <div
                              className="flex flex-col gap-1.5"
                              key={item.slug}
                            >
                              <LocalizedLink
                                href={`/${category.slug}/${item.slug}`}
                                className="hover:text-gray-600 transition-colors mb-2"
                                onClick={() => setShowMobileMenu(false)}
                              >
                                {item.label}
                              </LocalizedLink>
                            </div>
                          ))}
                        </div>
                      )}
                      {!category?.featured.length &&
                        !category?.categories.length && (
                          <div>
                            <h3 className="text-gray-500 font-medium text-center">
                              No Items Found
                            </h3>
                          </div>
                        )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
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
