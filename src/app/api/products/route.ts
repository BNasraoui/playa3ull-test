import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Replace with your external API URL.
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) {
      return NextResponse.error();
    }
    const products = await res.json();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.error();
  }
} 