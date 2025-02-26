export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
}

export interface CartItem {
  id: number
  quantity: number
  price: number | string
  image?: string
  title: string
  category: string
}

export interface CartContextType {
  cart: CartItem[]
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  removeFromCart: (id: number) => void
  getTotalPrice: () => number
  incrementItem: (id: number) => void
  decrementItem: (id: number) => void
}
  
  