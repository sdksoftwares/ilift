'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Info, Plus, ShoppingCart, Eye } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ProductProps {
  product: {
    _id: string
    name: string | { en: string }
    slug: string
    imageUrl: string
    category: string
    price?: number
    specifications?: {
      load_capacity?: number
      power_type?: string
      tyre_size?: string
      tyre_type?: string
      compatible_brands?: string
    }
  }
}

export default function FeaturedProductCard({ product }: ProductProps) {
  const { addItem, items, toggleCart } = useCartStore()
  const [isAdded, setIsAdded] = useState(false)

  // Handle Name (Safety check for object vs string)
  const productName = typeof product.name === 'object' ? product.name.en : product.name

  // Sync with Cart Store
  useEffect(() => {
    setIsAdded(items.some((item) => item._id === product._id))
  }, [items, product._id])

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent link navigation
    if (isAdded) {
      toggleCart()
      return
    }
    addItem({
      _id: product._id,
      name: productName,
      slug: product.slug,
      imageUrl: product.imageUrl,
      category: product.category,
      price: product.price
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative flex flex-col h-full"
    >
      <Link href={`/products/${product.slug}`} className="flex-1 flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 hover:border-slate-200 hover:-translate-y-1">

        {/* 1. IMAGE AREA */}
        <div className="relative h-80 w-full bg-slate-50 flex items-center justify-center overflow-hidden">

          {/* Decorative Gradient Blob */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.imageUrl ? (
            <div className="relative w-full h-full z-10">
              <Image
                src={product.imageUrl}
                alt={productName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 drop-shadow-sm group-hover:drop-shadow-md"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full text-slate-400 text-sm">
              No Image Available
            </div>
          )}

          {/* Quick Actions Overlay (Appears on Hover) */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
            <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-slate-700 font-semibold text-xs uppercase tracking-wide flex items-center gap-2">
              <Eye className="h-3 w-3" /> Quick View
            </div>
          </div>


          {/* Category Tag - REMOVED */}

        </div>

        {/* 2. CONTENT AREA */}
        <div className="p-6 flex flex-col gap-4 flex-1 bg-white relative">

          {/* Name & Divider */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-red-700 transition-colors min-h-[3rem]">
              {productName}
            </h3>

            {/* SPECIFICATIONS GRID - Dynamic based on Category */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 min-h-[1.5rem]">
              {/* 1. Machinery Logic (Forklift, Stacker, etc.) */}
              {(product.category === 'forklift' || product.category === 'stacker' || product.category === 'pallet_truck') && (
                <>
                  {product.specifications?.load_capacity && (
                    <span className="flex items-center">
                      <span className="font-semibold text-slate-700 mr-1">Load:</span> {product.specifications.load_capacity}kg
                    </span>
                  )}
                  {product.specifications?.power_type && (
                    <span className="flex items-center before:content-['•'] before:mx-2 before:text-slate-300">
                      {product.specifications.power_type}
                    </span>
                  )}
                </>
              )}

              {/* 2. Tyres Logic */}
              {(product.category === 'tyres') && (
                <>
                  {product.specifications?.tyre_size && (
                    <span className="font-semibold text-slate-700">{product.specifications.tyre_size}</span>
                  )}
                  {product.specifications?.tyre_type && (
                    <span className="before:content-['•'] before:mx-2 before:text-slate-300">
                      {product.specifications.tyre_type}
                    </span>
                  )}
                </>
              )}

              {/* 3. Parts Logic */}
              {(product.category === 'spare_parts') && product.specifications?.compatible_brands && (
                <span className="text-xs truncate">
                  Fits: <span className="font-medium text-slate-700">{product.specifications.compatible_brands}</span>
                </span>
              )}

              {/* Fallback Empty Space if no specs (Maintains card height) */}
              {!product.specifications && <span className="opacity-0">Standard Specification</span>}
            </div>

            <div className="w-10 h-0.5 bg-slate-100 group-hover:bg-red-500 transition-colors duration-500" />
          </div>

          <div className="mt-auto pt-2 flex items-center justify-between">
            {/* Price */}
            <div>
              {product.price ? (
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-medium uppercase">Price</span>
                  <span className="text-xl font-black text-slate-800">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>
              ) : (
                <div className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                  Quote on Request
                </div>
              )}
            </div>

            {/* 3. ADD BUTTON */}
            <Button
              onClick={handleAdd}
              size="sm"
              variant={isAdded ? "secondary" : "default"}
              className={`h-10 px-5 rounded-lg font-bold transition-all shadow-md hover:shadow-lg ${isAdded
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-slate-900 text-white hover:bg-red-600 hover:scale-105'
                }`}
            >
              {isAdded ? (
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> Added</span>
              ) : (
                <span className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add</span>
              )}
            </Button>
          </div>
        </div>
      </Link>
    </motion.div >
  )
}