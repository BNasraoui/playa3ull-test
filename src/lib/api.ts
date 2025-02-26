import type { Product } from "../types"

const API_URL = "https://fakestoreapi.com"

export async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products`)

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  const data = await res.json()
  return data
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status}`)
  }

  return response.json()
}

