import ProductDetail from "@/components/product-detail"
import { getProduct } from "@/lib/api"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const product = await getProduct(Number.parseInt(params.id))

    if (!product) {
      notFound()
    }

    return <ProductDetail product={product} />
  } catch (error) {
    notFound()
  }
}