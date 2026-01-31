'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AddToCartButton from '@/components/AddToCartButton'
import DownloadSpecButton from '@/components/DownloadSpecButton'
import { Badge } from '@/components/ui/badge'
import { Scale, ArrowUp, Zap, Circle } from 'lucide-react'

interface ProductDetailHeroProps {
    product: any
}

// Helper function to convert portable text to plain text
function toPlainText(blocks: any[] = []) {
    if (!blocks || !Array.isArray(blocks)) return ''
    return blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) {
                return ''
            }
            return block.children.map((child: any) => child.text).join('')
        })
        .join('\n\n')
}

export default function ProductDetailHero({ product }: ProductDetailHeroProps) {
    const productName = product.name?.en || product.name || "Unknown Product"
    // Safe Access to specs
    const specs = product.specifications || {}

    // Use first image or fallback
    const mainImage = product.images?.[0] || product.imageUrl || null

    return (
        <div className="relative w-full bg-slate-50 overflow-hidden border-b border-slate-200">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100 skew-x-12 translate-x-32 z-0" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-grid.png')] opacity-[0.03] z-0" />

            <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

                    {/* LEFT: TEXT CONTENT with Background */}
                    <div className="bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 p-8 lg:p-16 min-h-[500px] flex items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6 w-full"
                        >
                            <Badge variant="outline" className="text-white bg-red-600 border-red-600 uppercase tracking-widest text-xs font-bold px-3 py-1">
                                {product.category?.replace(/_/g, ' ') || 'Industrial Series'}
                            </Badge>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 uppercase leading-none tracking-tight">
                                {productName}
                            </h1>

                            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                                Engineered for maximum efficiency and durability. The {productName} delivers superior performance for your most demanding warehouse operations.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-4">
                                <div className="w-48">
                                    <AddToCartButton product={product} />
                                </div>
                                <DownloadSpecButton
                                    productName={productName}
                                    description={toPlainText(product.description)}
                                    specifications={product.specifications || {}}
                                    logistics={product.logistics}
                                    support={product.support}
                                    variant="ghost"
                                    label="Technical Datasheet"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT: HERO IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[300px] md:h-[500px] w-full flex items-center justify-center bg-slate-50"
                    >
                        {/* Enhanced Ground Shadow */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-slate-900/20 blur-2xl rounded-full" />

                        {mainImage ? (
                            <Image
                                src={mainImage}
                                alt={productName}
                                fill
                                className="object-contain drop-shadow-2xl relative z-10"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 font-bold">
                                No Image Available
                            </div>
                        )}
                    </motion.div>

                </div>
            </div>

            {/* STATS BAR (Attached Bottom) */}
            <div className="w-full bg-gradient-to-r from-slate-50 to-white border-t border-slate-200 relative z-20 shadow-md">
                <div className="max-w-[1440px] mx-auto px-6 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                        {/* Stat 1: Capacity */}
                        <div className="text-center px-6 py-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 hover:shadow-lg transition-shadow">
                            <Scale className="w-7 h-7 text-blue-600 mx-auto mb-3" />
                            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Rated Capacity</p>
                            <p className="text-3xl md:text-4xl font-black text-slate-900">
                                {specs.load_capacity ? <>{specs.load_capacity}<span className="text-base font-medium text-slate-600 ml-1">kg</span></> : '-'}
                            </p>
                        </div>

                        {/* Stat 2: Lift Height */}
                        <div className="text-center px-6 py-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-100 hover:shadow-lg transition-shadow">
                            <ArrowUp className="w-7 h-7 text-green-600 mx-auto mb-3" />
                            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Max Height</p>
                            <p className="text-3xl md:text-4xl font-black text-slate-900">
                                {specs.lift_height ? <>{specs.lift_height}<span className="text-base font-medium text-slate-600 ml-1">mm</span></> : '-'}
                            </p>
                        </div>

                        {/* Stat 3: Power */}
                        <div className="text-center px-6 py-6 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 hover:shadow-lg transition-shadow">
                            <Zap className="w-7 h-7 text-amber-600 mx-auto mb-3" />
                            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Power Source</p>
                            <p className="text-2xl md:text-3xl font-bold text-slate-900 truncate">
                                {specs.power_type || (product.category?.includes('electric') ? 'Electric' : 'Manual')}
                            </p>
                        </div>

                        {/* Stat 4: Tyre */}
                        <div className="text-center px-6 py-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 hover:shadow-lg transition-shadow">
                            <Circle className="w-7 h-7 text-purple-600 mx-auto mb-3" />
                            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Tyre Type</p>
                            <p className="text-xl md:text-2xl font-bold text-slate-900 truncate">
                                {specs.tyre_type || 'Industrial'}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
