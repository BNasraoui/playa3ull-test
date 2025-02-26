import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"
import Background from "@/components/background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-commerce Store",
  description: "Browse our amazing products",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Background />
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

