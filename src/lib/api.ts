import type { Product } from "../types"

export async function getProducts(): Promise<Product[]> {
  try {
    // Use your Next.js API route
    const res = await fetch(`https://fakestoreapi.com/products`)

    if (!res.ok) {
      throw new Error("Failed to fetch products")
    }

    return res.json()
  } catch (error) {
    console.error('Error:', error)
    throw new Error("Failed to fetch products")
  }
}

export async function getProduct(id: number): Promise<Product | null> {
  try {
    // Use your Next.js API route
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

