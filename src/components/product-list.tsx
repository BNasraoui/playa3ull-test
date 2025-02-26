"use client"

import { useState } from "react"
import { getProducts } from "@/lib/api"
import ProductCard from "@/components/product-card"
import type { Product } from "../types"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useQuery } from '@tanstack/react-query'

const ITEMS_PER_PAGE = 8

interface ProductListProps {
  initialProducts?: Product[]
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data: products = initialProducts || [], isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
    initialData: initialProducts
  })

  const paginatedProducts = products.slice(0, page * ITEMS_PER_PAGE)

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    setHasMore(products.length > nextPage * ITEMS_PER_PAGE)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-playa-light text-playa-dark">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-playa-light text-playa-dark">
        <p className="text-destructive">{(error as Error).message}</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-8 bg-playa-light text-playa-dark p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore}>Load More</Button>
        </div>
      )}
    </div>
  )
}

