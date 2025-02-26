"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/types"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Check, ShoppingCart } from "lucide-react"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { cart, setCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    setCart([...cart, { id: product.id, quantity: 1 }])
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-contain" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-sm text-muted-foreground mt-2">{product.category}</p>
          <div className="mt-4">
            <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
          </div>
          <div className="mt-8">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          <div className="mt-8">
            <Button className="w-full md:w-auto" onClick={handleAddToCart} disabled={added}>
              {added ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}