'use client'

import { Button } from '@/components/ui/button'
import { Plus, Check, FileText } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useState, useEffect } from 'react'

export default function AddToCartButton({ product }: { product: any }) {
  // 1. Get both the adder function and the list of current items
  const { addItem, items, toggleCart } = useCartStore()
  const [isAdded, setIsAdded] = useState(false)

  // 2. Persistent Check: Watch the cart state to see if this product is inside
  useEffect(() => {
    const exists = items.some((item) => item._id === product._id)
    setIsAdded(exists)
  }, [items, product._id])

  const handleAdd = () => {
    if (isAdded) {
      // If already added, clicking opens the cart instead of adding again
      toggleCart()
      return
    }

    // Map Sanity data to our Cart structure
    addItem({
      _id: product._id,
      // Handle localized name if it exists, otherwise fallback
      name: product.name?.en || product.name || 'Unknown Product', 
      slug: product.slug?.current || product.slug,
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
      className={`flex-1 h-14 text-lg font-bold transition-all ${
        isAdded 
          ? 'bg-green-600 hover:bg-green-700 text-white' 
          : 'bg-slate-900 hover:bg-slate-800 text-white'
      }`}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-5 w-5" /> In Quote List
        </>
      ) : (
        <>
          <Plus className="mr-2 h-5 w-5" /> Add to Enquiry List
        </>
      )}
    </Button>
  )
}