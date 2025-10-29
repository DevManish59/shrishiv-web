"use client";

import { useState, useEffect, useCallback } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  metalType: string;
  diamondSize: string;
  ringSize: string;
  isLabGrown?: boolean;
}

interface CartData {
  userId: number;
  items: CartItem[];
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  subtotal: number;
  itemCount: number;
  totalItems: number;
  getCartData: () => CartData;
}

const CART_STORAGE_KEY = "shrishiv-cart";
const CART_OPEN_STORAGE_KEY = "shrishiv-cart-open";

// Default user ID - you can modify this or get it from auth context
const DEFAULT_USER_ID = 1;

// Utility function to get cart data from localStorage directly
export function getCartDataFromStorage(): CartData | null {
  try {
    if (typeof window !== "undefined") {
      const savedCartData = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCartData) {
        return JSON.parse(savedCartData) as CartData;
      }
    }
  } catch (error) {
    console.error("Error getting cart data from localStorage:", error);
  }
  return null;
}

export function useLocalStorageCart(): CartContextType {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart data from localStorage on mount
  useEffect(() => {
    try {
      // Check if we're in the browser environment
      if (typeof window !== "undefined") {
        const savedCartData = localStorage.getItem(CART_STORAGE_KEY);
        const savedIsOpen = localStorage.getItem(CART_OPEN_STORAGE_KEY);

        if (savedCartData) {
          const cartData: CartData = JSON.parse(savedCartData);
          setItems(cartData.items || []);
        }

        if (savedIsOpen) {
          setIsOpen(JSON.parse(savedIsOpen));
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
  }, []);

  // Save items to localStorage whenever items change
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const cartData: CartData = {
          userId: DEFAULT_USER_ID,
          items: items,
        };
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartData));
      }
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [items]);

  // Save cart open state to localStorage whenever it changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(CART_OPEN_STORAGE_KEY, JSON.stringify(isOpen));
      }
    } catch (error) {
      console.error("Error saving cart state to localStorage:", error);
    }
  }, [isOpen]);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (i) =>
          i.id === item.id &&
          i.metalType === item.metalType &&
          i.diamondSize === item.diamondSize &&
          i.ringSize === item.ringSize
      );

      if (existingItem) {
        return currentItems.map((i) =>
          i === existingItem ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const getCartData = useCallback((): CartData => {
    return {
      userId: DEFAULT_USER_ID,
      items: items,
    };
  }, [items]);

  return {
    items,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
    totalItems: itemCount,
    getCartData,
  };
}
