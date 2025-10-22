"use client";

import React, { createContext, useContext } from "react";
import { useLocalStorageCart } from "@/hooks/useLocalStorageCart";

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

export interface CartData {
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

const CartContext = createContext<CartContextType | undefined>(undefined);

export function LocalStorageCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartData = useLocalStorageCart();

  return (
    <CartContext.Provider value={cartData}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a LocalStorageCartProvider");
  }
  return context;
}
