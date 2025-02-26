import type { Product } from "../types"

const API_URL = "https://fakestoreapi.com"

export async function getProducts(): Promise<Product[]> {
  try {
    // Use absolute URL in production, relative in development
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
      : '';
    const res = await fetch(`${baseUrl}/api/products`)

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
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
      : '';
    const res = await fetch(`${baseUrl}/api/product/${id}`)

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

