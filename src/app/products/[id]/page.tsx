import ProductDetail from "@/components/product-detail"
import { getProduct } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const product = await getProduct(Number.parseInt(resolvedParams.id))

    if (!product) {
      notFound()
    }

    return <ProductDetail product={product} />
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound()
  }
}