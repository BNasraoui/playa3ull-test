"use client"

import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { cart, removeFromCart, getTotalPrice, incrementItem, decrementItem } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <p className="text-lg mb-8">Your cart is empty</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg"
          >
            <div className="relative w-24 h-24 flex-shrink-0">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-contain" />
            </div>
            <div className="flex-grow">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.category}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="font-semibold">
                  {formatPrice(
                    typeof item.price === "string"
                      ? (parseFloat(item.price.replace(/[^\d.-]/g, "")) || 0)
                      : item.price
                  )}
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => decrementItem(item.id)}>-</Button>
                  <span className="text-sm">Quantity: {item.quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => incrementItem(item.id)}>+</Button>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeFromCart(item.id)}>
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Remove item</span>
            </Button>
          </div>
        ))}

        <div className="mt-8 p-4 border rounded-lg">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(getTotalPrice())}</span>
          </div>
          <Button className="w-full mt-4">Proceed to Checkout</Button>
        </div>

        <div className="mt-4 flex justify-center">
          <Link href="/">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}