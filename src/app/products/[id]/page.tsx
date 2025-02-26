import ProductDetail from "@/components/product-detail"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    // Fetch directly from external API in server component
    const response = await fetch(`https://fakestoreapi.com/products/${resolvedParams.id}`)
    if (!response.ok) {
      notFound()
    }
    const product = await response.json()

    if (!product) {
      notFound()
    }

    return <ProductDetail product={product} />
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound()
  }
}