'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-playa-light text-playa-dark">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-6">We apologize for the inconvenience.</p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          variant="default"
        >
          Try again
        </Button>
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
        >
          Go home
        </Button>
      </div>
    </div>
  )
} 