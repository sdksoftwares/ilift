'use client'

import { Button } from '@/components/ui/button'
import { Check, FileText } from 'lucide-react'
import { useCartStore } from '@/lib/store'

import { twMerge } from 'tailwind-merge'

interface Product {
  _id: string
  name: string | { en: string }
  slug: string | { current: string }
  imageUrl?: string // or generic
  images?: string[] // sanity response
  category?: string
  price?: number
  [key: string]: unknown
}

export default function AddToCartButton({ product, className }: { product: Product, className?: string }) {
  // 1. Get both the adder function and the list of current items
  const { addItem, items, toggleCart } = useCartStore()


  // 2. Persistent Check: Derived directly from store state
  const isAdded = items.some((item) => item._id === product._id)

  const handleAdd = () => {
    if (isAdded) {
      // If already added, clicking opens the cart instead of adding again
      toggleCart()
      return
    }

    const productName = typeof product.name === 'object' ? product.name.en : product.name || 'Unknown Product'
    const productSlug = typeof product.slug === 'object' ? product.slug.current : product.slug

    // Map Sanity data to our Cart structure
    addItem({
      _id: product._id,
      name: productName,
      slug: productSlug,
      // Handle the image array (Product page returns "images": [...urls])
      imageUrl: Array.isArray(product.images) ? product.images[0] : product.imageUrl || '',
      category: product.category || 'General',
      price: product.price
    })
  }

  return (
    <Button
      size="lg"
      onClick={handleAdd}
      className={twMerge(
        `flex-1 h-12 text-base font-bold uppercase tracking-wider rounded-full transition-all shadow-lg hover:shadow-xl`,
        isAdded
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-red-600 hover:bg-red-700 text-white',
        className
      )}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-5 w-5" /> Quote Requested
        </>
      ) : (
        <>
          Get Quote <FileText className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  )
}