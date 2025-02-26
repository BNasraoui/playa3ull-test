import ProductList from "@/components/product-list"
import { getProducts } from "@/lib/api"
import { unstable_noStore as noStore } from 'next/cache'

export default async function Home() {
  // Tell Next.js not to cache or pre-render this page
  noStore()
  
  const products = await getProducts()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider uppercase font-chakra" data-text="PLAY, SHOP, COLLECT">
          PLAY, <span className="text-primary">SHOP</span>, COLLECT
        </h1>
        <p className="text-white max-w-2xl mx-auto">
          Experience the future of gaming merchandise with our exclusive collection of products pulled from a random API...
        </p>
      </div>
      <ProductList initialProducts={products} />
    </main>
  )
}
