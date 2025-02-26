import ProductList from "@/components/product-list"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      <ProductList />
    </main>
  )
}
