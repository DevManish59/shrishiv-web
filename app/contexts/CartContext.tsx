"use client";

import React, { createContext, useContext, useState } from "react";

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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (item: Omit<CartItem, "quantity">) => {
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
    openCart();
  };

  const removeItem = (id: string) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
