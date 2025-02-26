"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const { cart } = useCart()
  const itemCount = cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-playa-green bg-playa-dark/95 backdrop-blur">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center bg-playa-light text-playa-dark rounded-md px-4 py-2 tracking-tighter shadow-lg transform transition duration-300 hover:scale-105">
          <Image
            src="/hero-emblem.webp"
            alt="Hero Emblem"
            width={40}
            height={40}
          />
          <span
            className="ml-2 text-3xl font-extrabold font-chakra"
            style={{ textShadow: "0 0 8px #aaff00" }}
          >
            PLAYA3ULL<span className="text-primary">SH0P</span>
          </span>
        </Link>
        <Link href="/cart">
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                {itemCount}
              </Badge>
            )}
            <span className="sr-only">Cart</span>
          </Button>
        </Link>
      </div>
    </header>
  )
}