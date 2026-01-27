'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Package } from 'lucide-react'

interface ProductImageGalleryProps {
  images: string[]
  name: string
}

export default function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-rotate images every 4 seconds unless hovered
  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (images.length <= 1 || isHovered) return
    const timer = setInterval(nextImage, 4000)
    return () => clearInterval(timer)
  }, [images.length, isHovered, nextImage])

  const mainImage = images[currentIndex]

  return (
    <div 
      className="space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image Stage - Compact Aspect Ratio */}
      <div className="relative aspect-[4/3] w-full bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center p-4 shadow-sm group">
        {mainImage ? (
          <Image 
            src={mainImage} 
            alt={name} 
            fill 
            className="object-contain transition-transform duration-500 group-hover:scale-105"
            priority
          />
        ) : (
          <div className="text-slate-400 flex flex-col items-center">
            <Package className="h-10 w-10 mb-2 opacity-50" />
            <span className="text-sm">No Image</span>
          </div>
        )}
      </div>
      
      {/* Thumbnails Grid - Compact */}
      {images?.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img: string, idx: number) => (
            <button 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 w-16 flex-shrink-0 bg-white rounded-md border overflow-hidden transition-all ${
                currentIndex === idx 
                  ? 'border-red-600 ring-1 ring-red-600' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Image src={img} alt={`thumb ${idx}`} fill className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}