import Image from "next/image"
import Link from "next/link"
import type { Product } from "../types"
import { formatPrice } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col bg-playa-light text-playa-dark flex-col transition-all duration-300 hover:glow-border rounded-lg">
      <Link href={`/products/${product.id}`} className="relative block aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-contain rounded-lg border border-playa-green p-4 transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <CardContent className="flex-grow p-4">
        <Link href={`/products/${product.id}`} className="hover:underline">
          <h2 className="font-medium line-clamp-2 h-12">{product.title}</h2>
        </Link>
        <p className="text-sm text-muted-foreground mt-2">{product.category}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="font-semibold">{formatPrice(product.price)}</p>
      </CardFooter>
    </Card>
  )
}