'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface RecommendedProductsProps {
    products: any[]
}

export default function RecommendedProducts({ products }: RecommendedProductsProps) {
    if (!products || products.length === 0) return null

    // Ensure we consistently show 2 or 3 items to fill the grid
    const displayProducts = products.slice(0, 3)

    return (
        <div className="w-full bg-white border-t border-slate-100">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col lg:grid lg:grid-cols-[350px_1fr] h-auto lg:h-[500px]">

                    {/* LEFT SIDEBAR (Red Branding) */}
                    <div className="bg-red-600 p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden shrink-0 h-[400px] lg:h-auto">
                        {/* Decor - Industrial Pattern Overlay */}
                        <div className="absolute inset-0 bg-[url('/images/pattern-grid.png')] opacity-10 mix-blend-overlay" />

                        {/* Circles */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-red-500 rounded-full translate-x-1/2 -translate-y-1/2 opacity-30 mix-blend-overlay" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-800 rounded-full -translate-x-1/3 translate-y-1/3 opacity-30 mix-blend-multiply" />

                        <div className="relative z-10">
                            <h2 className="text-3xl lg:text-4xl font-black text-white uppercase leading-tight mb-6 tracking-tight">
                                Recommended<br /> Products
                            </h2>
                            <div className="w-16 h-1 bg-white mb-10 opacity-80" />

                            <div className="flex gap-3">
                                <button className="w-12 h-12 border-2 border-white/20 bg-red-700/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-600 hover:border-white transition-all active:scale-95 shadow-lg">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button className="w-12 h-12 border-2 border-white/20 bg-red-700/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-600 hover:border-white transition-all active:scale-95 shadow-lg">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT GRID (Products) - Always Grid */}
                    <div className="bg-slate-50 border-l border-slate-100 h-full">
                        <div className={`grid grid-cols-1 md:grid-cols-2 ${displayProducts.length > 2 ? 'lg:grid-cols-3' : ''} h-full divide-y md:divide-y-0 md:divide-x divide-slate-200`}>
                            {displayProducts.map((sim: any) => (
                                <Link key={sim._id} href={`/products/${sim.slug}`} className="group bg-white h-full flex flex-col items-center text-center p-8 lg:p-12 hover:z-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:relative transition-all duration-300">

                                    {/* Image Area - Fixed Height for alignment */}
                                    <div className="relative w-full h-[200px] mb-6 flex items-end justify-center">
                                        {sim.imageUrl ? (
                                            <Image
                                                src={sim.imageUrl}
                                                alt={sim.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-500 origin-bottom"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-slate-50 flex items-center justify-center text-xs text-slate-400">No Image</div>
                                        )}
                                    </div>

                                    <div className="mt-auto w-full">
                                        <h4 className="text-lg font-bold text-slate-900 uppercase mb-2 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight tracking-wide">
                                            {sim.name}
                                        </h4>

                                        {/* Quick Specs */}
                                        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-6">
                                            {sim.specifications?.load_capacity && (
                                                <span>{sim.specifications.load_capacity}kg</span>
                                            )}
                                            {sim.specifications?.load_capacity && sim.specifications?.power_type && (
                                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                            )}
                                            {sim.specifications?.power_type && (
                                                <span>{sim.specifications.power_type}</span>
                                            )}
                                        </div>

                                        <div className="inline-block px-8 py-3 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all rounded-sm">
                                            View Details
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
