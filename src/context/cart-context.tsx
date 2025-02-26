"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface CartItem {
  id: number
  quantity: number
  price: number
  image?: string
  title: string
  category: string
}

interface CartContextType {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  removeFromCart: (id: number) => void
  getTotalPrice: () => number
}
  
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + (item.price ? item.price * item.quantity : 0),
      0
    )
  }

  return (
    <CartContext.Provider value={{ cart, setCart, removeFromCart, getTotalPrice }}>
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

