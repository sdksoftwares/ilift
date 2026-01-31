'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { MessageSquare, CheckSquare, BarChart2 } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { useState, useEffect } from 'react'

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
      lift_height?: string
      tyre_size?: string
      tyre_type?: string
      compatible_brands?: string
    }
  }
}

export default function ProductCard({ product }: ProductProps) {
  // Handle Name (Safety check for object vs string)
  const productName = typeof product.name === 'object' ? product.name.en : product.name

  // Format Category Name for display (e.g., "forklifts_electric" -> "Electric Forklift")
  const formatCategory = (cat: string) => {
    return cat.replace(/_/g, ' ').replace('forklifts', 'forklift').toUpperCase()
  }

  const router = useRouter()
  const { addItem } = useCartStore()

  // Handle Get Quote Click
  const handleGetQuote = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      _id: product._id,
      name: productName,
      slug: product.slug,
      imageUrl: product.imageUrl,
      category: product.category,
      price: product.price
    })

    router.push('/enquiry')
  }



  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white flex flex-col items-center text-center p-6 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-slate-100 min-h-[450px]"
    >
      <Link href={`/products/${product.slug}`} className="w-full flex-1 flex flex-col items-center">

        {/* 1. IMAGE */}
        <div className="relative w-full h-[220px] mb-6 flex items-center justify-center">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={productName}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-300 text-sm">
              No Image
            </div>
          )}
        </div>

        {/* 2. HEADER INFO */}
        <div className="w-full mb-4">
          <h3 className="text-xl font-bold text-slate-900 uppercase mb-2 group-hover:text-red-600 transition-colors">
            {productName}
          </h3>
          <p className="text-xs font-bold text-red-500 uppercase tracking-wider">
            {formatCategory(product.category)}
          </p>
        </div>

        {/* 3. SPECIFICATIONS LIST */}
        <div className="w-full text-left space-y-1.5 mb-6 px-2">
          {product.specifications?.load_capacity && (
            <div className="flex text-xs text-slate-500">
              <span className="w-1/2">Rated Capacity :</span>
              <span className="w-1/2 font-semibold text-red-600">{product.specifications.load_capacity}kg</span>
            </div>
          )}
          {product.specifications?.lift_height && (
            <div className="flex text-xs text-slate-500">
              <span className="w-1/2">Max. Lifting Height :</span>
              <span className="w-1/2 font-semibold text-red-600">{product.specifications.lift_height}</span>
            </div>
          )}
          {product.specifications?.power_type && (
            <div className="flex text-xs text-slate-500">
              <span className="w-1/2">Power Type :</span>
              <span className="w-1/2 font-semibold text-red-600">{product.specifications.power_type}</span>
            </div>
          )}
          {/* Fallback for parts/tyres if primary specs missing */}
          {(!product.specifications?.load_capacity && product.specifications?.compatible_brands) && (
            <div className="flex text-xs text-slate-500">
              <span className="w-1/2">Components :</span>
              <span className="w-1/2 font-semibold text-red-600">Genuine Parts</span>
            </div>
          )}
        </div>

      </Link>

      {/* 4. ACTIONS FOOTER */}
      <div className="w-full flex items-center justify-between border-t border-slate-100 pt-5 mt-auto">

        {/* View Details Arrow (Replaces Comparison) */}
        <Link
          href={`/products/${product.slug}`}
          className="flex items-center gap-2 group/view text-slate-400 hover:text-red-600 transition-colors"
        >
          <span className="text-xs font-bold tracking-wider uppercase">View Details</span>

        </Link>

        {/* Get Quote Button */}
        <button
          onClick={handleGetQuote}
          className="flex items-center gap-2 text-white bg-red-600 hover:bg-red-700 border border-transparent hover:shadow-lg px-5 py-2.5 rounded-full transition-all duration-300 font-bold text-xs uppercase tracking-wide group/inquiry"
        >
          Get Quote <MessageSquare className="w-4 h-4" />
        </button>

      </div>

    </motion.div>
  )
}