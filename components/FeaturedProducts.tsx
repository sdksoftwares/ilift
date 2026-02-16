'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import FeaturedProductCard from '@/components/FeaturedProductCard'



const TABS = [
    { id: 'all', label: 'All Equipment' },
    { id: 'forklift', label: 'Forklifts' },
    { id: 'stacker', label: 'Stackers' },
    { id: 'pallet_truck', label: 'Pallet Trucks' },
    { id: 'solid_tyre', label: 'Solid Tyres' },
]

interface Product {
    _id: string
    name: string | { en: string }
    slug: string | { current: string }
    imageUrl?: string // or generic
    images?: string[] // sanity response
    category?: string
    price?: number
    specifications?: Record<string, unknown> // simplify for now or import
    [key: string]: unknown
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
    const [activeTab, setActiveTab] = useState('all')

    // Filter Logic
    const filteredProducts = activeTab === 'all'
        ? products
        : products.filter(p => p.category === activeTab || (activeTab === 'forklift' && p.category?.includes('forklift')))

    return (
        <section id="featured" className="relative bg-slate-50 py-24 lg:py-32">
            <div className="relative z-10 max-w-[1440px] mx-auto px-4 lg:px-6">

                {/* Section Header & Tabs */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
                        Our Top Machinery Products
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">
                        Discover our premium range of industrial equipment, engineered for performance and reliability.
                    </p>

                    {/* TABS */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20 scale-105'
                                    : 'bg-white text-slate-600 border border-slate-200 hover:border-red-200 hover:text-red-600 hover:bg-red-50'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}

                        {/* Full Catalogue Button */}
                        <Link
                            href="/products"
                            className="px-6 py-2.5 rounded-full text-sm font-bold bg-slate-900 text-white border border-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Full Catalogue
                        </Link>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.slice(0, 8).map((product: Product) => (
                            <FeaturedProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <div className="inline-flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-dashed border-slate-300">
                                <p className="text-lg text-slate-400 font-medium">No products found for this category.</p>
                                <button onClick={() => setActiveTab('all')} className="mt-4 text-red-600 font-bold hover:underline">
                                    View All Products
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* View Full Catalog Link */}
                <div className="mt-16 text-center">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-red-600 transition-colors uppercase tracking-widest text-sm border-b-2 border-slate-200 hover:border-red-600 pb-1"
                    >
                        View All Products <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

            </div>
        </section>
    )
}
