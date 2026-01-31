'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PRODUCTS_MENU, SPARE_PARTS_MENU } from '@/lib/constants'
import { Square, CheckSquare, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductSidebar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    // Get active category from URL
    const activeCategory = searchParams.get('category') || 'all'

    // Helper to handle category selection
    const handleCategoryClick = (categoryHref: string) => {
        // Create new URLSearchParams from current params to preserve 'query' etc.
        const params = new URLSearchParams(searchParams.toString())

        // Extract actual category slug from href (e.g. /products?category=forklifts -> forklifts)
        const match = categoryHref.match(/category=([^&]*)/)

        if (match && match[1]) {
            const slug = match[1]
            if (activeCategory === slug) {
                // Toggle off: Remove category param, keep others
                params.delete('category')
            } else {
                // Set new category
                params.set('category', slug)
            }
        } else {
            // Fallback for clean links if any (though usually we use ?category=)
            // If the href is just a path like '/products', clear category
            if (categoryHref === '/products') {
                params.delete('category')
            }
        }

        // Push new URL
        router.push(`/products?${params.toString()}`)
    }

    // Flattened list for easier rendering if needed, but nested is better for visual hierarchy
    // We will render sections matching the "Zoomlion" style: "A SERIES OF"

    return (
        <div className="bg-slate-50 p-6 rounded-none min-h-[600px] border-r border-slate-200">

            {/* Header */}
            <h2 className="text-2xl font-normal text-red-600 mb-8 tracking-wide uppercase">
                Quickly Find
            </h2>

            {/* Section: PRODUCT SERIES */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                    A Series Of
                </h3>

                <div className="space-y-1">
                    {PRODUCTS_MENU.map((item) => {
                        // Extract slug for comparison
                        const slugMatch = item.href.match(/category=([^&]*)/)
                        const slug = slugMatch ? slugMatch[1] : ''
                        const isActive = activeCategory === slug || (item.subcategories?.some(sub => sub.href.includes(`category=${activeCategory}`)))

                        return (
                            <div key={item.name} className="group">
                                {/* Main Category Item */}
                                <div
                                    onClick={() => handleCategoryClick(item.href)}
                                    className={`
                    flex items-center gap-3 py-2 cursor-pointer transition-colors
                    ${isActive ? 'text-red-600 font-bold' : 'text-slate-600 hover:text-red-600'}
                  `}
                                >
                                    <div className={`
                    w-4 h-4 border flex items-center justify-center shrink-0 transition-colors
                    ${isActive ? 'bg-red-600 border-red-600' : 'border-slate-300 group-hover:border-red-400 bg-white'}
                  `}>
                                        {isActive && <CheckSquare className="w-3 h-3 text-white" />}
                                    </div>
                                    <span className="text-sm uppercase">{item.name}</span>
                                </div>

                                {/* Subcategories (Expanded if active or if parent is active) */}
                                {isActive && item.subcategories && (
                                    <div className="ml-7 mt-1 space-y-1 mb-2 border-l border-slate-200 pl-3">
                                        {item.subcategories.map(sub => {
                                            const subSlugMatch = sub.href.match(/category=([^&]*)/)
                                            const subSlug = subSlugMatch ? subSlugMatch[1] : ''
                                            const isSubActive = activeCategory === subSlug

                                            return (
                                                <div
                                                    key={sub.name}
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleCategoryClick(sub.href)
                                                    }}
                                                    className={`
                             py-1 cursor-pointer text-xs uppercase
                             ${isSubActive ? 'text-red-600 font-bold' : 'text-slate-400 hover:text-red-500'}
                          `}
                                                >
                                                    {sub.name}
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Section: SPARE PARTS */}
            <div className="mb-8">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">
                    Spare Parts
                </h3>
                <div className="space-y-1">
                    {SPARE_PARTS_MENU.map((item) => {
                        const slugMatch = item.href.match(/category=([^&]*)/)
                        const slug = slugMatch ? slugMatch[1] : ''
                        const isActive = activeCategory === slug

                        return (
                            <div
                                key={item.name}
                                onClick={() => handleCategoryClick(item.href)}
                                className={`
                  flex items-center gap-3 py-2 cursor-pointer transition-colors
                  ${isActive ? 'text-red-600 font-bold' : 'text-slate-600 hover:text-red-600'}
                `}
                            >
                                <div className={`
                  w-4 h-4 border flex items-center justify-center shrink-0 transition-colors
                  ${isActive ? 'bg-red-600 border-red-600' : 'border-slate-300 group-hover:border-red-400 bg-white'}
                `}>
                                    {isActive && <CheckSquare className="w-3 h-3 text-white" />}
                                </div>
                                <span className="text-sm uppercase">{item.name}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Reset Filter Button */}
            {activeCategory !== 'all' && (
                <Button
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString())
                        params.delete('category')
                        router.push(`/products?${params.toString()}`)
                    }}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white uppercase text-xs font-bold tracking-widest py-6 rounded-none"
                >
                    Clear Filter
                </Button>
            )}

        </div>
    )
}
