"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import { CartContextType, CartItem } from "../types";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      // Sanitize the price.
      let price: number;
      if (typeof item.price === "number") {
        price = item.price;
      } else if (typeof item.price === "string") {
        const sanitizedPrice = item.price.replace(/[^\d.-]/g, "");
        const parsedPrice = parseFloat(sanitizedPrice);
        price = isNaN(parsedPrice) ? 0 : parsedPrice;
      } else {
        price = 0;
      }

      // Also ensure quantity is a number.
      const quantity =
        typeof item.quantity === "number"
          ? item.quantity
          : parseFloat(item.quantity) || 0;

      return total + price * quantity;
    }, 0);
  }

  const incrementItem = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementItem = (id: number) => {
    setCart((prevCart) =>
      prevCart.reduce<CartItem[]>((acc, item) => {
        if (item.id === id) {
          const newQuantity = item.quantity - 1;
          if (newQuantity > 0) {
            acc.push({ ...item, quantity: newQuantity });
          }
          // If newQuantity is 0, item is removed.
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  return (
    <CartContext.Provider value={{ cart, setCart, removeFromCart, getTotalPrice, incrementItem, decrementItem }}>
      {children}
    </CartContext.Provider>
  )
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

