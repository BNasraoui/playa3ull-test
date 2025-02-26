"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/cart-context";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create the QueryClient on the client using useState to avoid re-creation
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        {children}
      </CartProvider>
    </QueryClientProvider>
  );
} 