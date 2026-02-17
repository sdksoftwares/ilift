'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import AddToCartButton from '@/components/AddToCartButton'
import DownloadSpecButton from '@/components/DownloadSpecButton'
import { Badge } from '@/components/ui/badge'
import { formatRange, RangeValue } from '@/lib/utils'

interface Product {
    _id: string
    slug: string | { current: string }
    name: string | { en: string }
    images?: string[]
    imageUrl?: string
    specifications?: {
        load_capacity?: RangeValue | number
        lift_height?: RangeValue | number
        power_type?: string
        tyre_type?: string
        fork_length?: RangeValue | number
        [key: string]: unknown
    }
    tyre_specifications?: {
        size?: string
        type?: string
        width?: RangeValue | number
        diameter?: RangeValue | number
        [key: string]: unknown
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description?: any[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logistics?: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    support?: any
    category?: string
    price?: number
    specSheetUrl?: string // New field for attached file
    brochureUrl?: string
    [key: string]: unknown
}

interface ProductDetailHeroProps {
    product: Product
}

// Helper function to convert portable text to plain text
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toPlainText(blocks: any[] = []) {
    if (!blocks || !Array.isArray(blocks)) return ''
    return blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) {
                return ''
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return block.children.map((child: any) => child.text).join('')
        })
        .join('\n\n')
}

export default function ProductDetailHero({ product }: ProductDetailHeroProps) {
    const productName = typeof product.name === 'object' ? product.name.en : (product.name || "Unknown Product")
    // Safe Access to specs
    const specs = product.specifications || {}
    const tyreSpecs = product.tyre_specifications || {}
    const isTyre = product.category === 'parts_tyres'

    // Use first image or fallback
    const mainImage = product.images?.[0] || product.imageUrl || null

    return (
        <div className="relative w-full overflow-hidden bg-white border-b border-slate-200">

            {/* SPLIT BACKGROUND LAYOUT (Zoomlion Style) */}
            <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-red-600 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-black/40 via-transparent to-transparent">
                {/* Texture / Grid */}
                <div className="absolute inset-0 bg-[url('/images/pattern-grid.png')] opacity-10 mix-blend-overlay" />
                {/* Decorative Big Text */}
                <div className="absolute top-10 right-10 text-[15rem] lg:text-[20rem] font-bold text-black/10 leading-none select-none pointer-events-none overflow-hidden mix-blend-overlay">
                    {product.category?.substring(0, 2).toUpperCase() || 'iL'}
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[500px]">

                    {/* LEFT: TEXT CONTENT (On Red) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8 w-full text-white lg:pr-12"
                    >
                        <Badge variant="outline" className="text-white border-white/30 bg-black/20 backdrop-blur-sm uppercase tracking-widest text-xs font-bold px-4 py-1.5 rounded-full">
                            {product.category?.replace(/_/g, ' ') || 'Industrial Series'}
                        </Badge>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter drop-shadow-lg">
                            {productName}
                        </h1>

                        <p className="text-lg md:text-xl text-red-50 max-w-lg leading-relaxed font-medium">
                            Engineered for maximum efficiency and durability. The {productName} delivers superior performance for your most demanding warehouse operations.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-6">
                            <div className="w-52">
                                <AddToCartButton
                                    product={product}
                                    className="bg-slate-900 text-white hover:bg-black hover:text-white border-none shadow-xl"
                                />
                            </div>
                            {/* DEBUG: Remove later */}
                            <div className="hidden">
                                Spec: {product.specSheetUrl || 'None'} | Brochure: {product.brochureUrl || 'None'}
                            </div>
                            <DownloadSpecButton
                                productName={productName}
                                description={toPlainText(product.description)}
                                specifications={product.specifications || {}}
                                logistics={product.logistics}
                                support={product.support}
                                variant="outline"
                                label="Technical Datasheet"
                                className="border-2 border-white text-white hover:bg-white hover:text-red-700 font-bold shadow-none"
                                fileUrl={product.specSheetUrl || product.brochureUrl}
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT: HERO IMAGE (Breakout) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-end lg:-ml-20 pointer-events-none"
                    >
                        {mainImage ? (
                            <Image
                                src={mainImage}
                                alt={productName}
                                fill
                                className="object-contain drop-shadow-2xl relative z-10 origin-center lg:origin-left scale-125 hover:scale-130 transition-transform duration-700"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/50 font-bold border border-white/10">
                                No Image Available
                            </div>
                        )}
                    </motion.div>

                </div>
            </div>

            {/* STATS BAND (Clean White Strip at Bottom) */}
            <div className="w-full bg-white relative z-20">
                <div className="max-w-[1440px] mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">

                        {!isTyre ? (
                            <>
                                {/* Stat 1: Capacity */}
                                <div className="text-center px-4 py-8 md:py-10 group hover:bg-slate-50 transition-colors">
                                    <p className="text-4xl md:text-5xl font-light text-slate-900 mb-2 group-hover:text-red-600 transition-colors tracking-tight">
                                        {(() => {
                                            const val = formatRange(specs.load_capacity)
                                            if (val === 'N/A') return '-'
                                            if (val.toLowerCase().includes('kg')) return val
                                            return <>{val}<span className="text-lg font-medium text-slate-400 ml-1">kg</span></>
                                        })()}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rated Capacity</p>
                                </div>

                                {/* Stat 2: Lift Height OR Fork Length (for Pallet Trucks) */}
                                <div className="text-center px-4 py-8 md:py-10 group hover:bg-slate-50 transition-colors">
                                    <p className="text-4xl md:text-5xl font-light text-slate-900 mb-2 group-hover:text-red-600 transition-colors tracking-tight">
                                        {(() => {
                                            // Pallet Truck Override: Show Fork Length if Lift Height is missing or N/A
                                            if (product.category === 'pallet_truck') {
                                                const val = formatRange(specs.fork_length)
                                                if (val === 'N/A') return '-'
                                                // If value already has a unit (like "inch"), don't add "mm"
                                                if (/[a-zA-Z]/.test(val)) return val
                                                return <>{val}<span className="text-lg font-medium text-slate-400 ml-1">mm</span></>
                                            }

                                            // Default: Lift Height
                                            const val = formatRange(specs.lift_height)
                                            if (val === 'N/A') return '-'
                                            if (val.toLowerCase().includes('mm')) return val
                                            return <>{val}<span className="text-lg font-medium text-slate-400 ml-1">mm</span></>
                                        })()}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        {product.category === 'pallet_truck' ? 'Fork Length' : 'Max Height'}
                                    </p>
                                </div>

                                {/* Stat 3: Power Source */}
                                <div className="text-center px-4 py-8 md:py-10 group hover:bg-slate-50 transition-colors">
                                    <p className="text-4xl md:text-5xl font-light text-slate-900 mb-2 group-hover:text-red-600 transition-colors tracking-tight truncate px-2">
                                        {String(specs.power_type || (product.category?.includes('electric') ? 'Electric' : 'Manual'))}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Power Source</p>
                                </div>

                                {/* Stat 4: Tyre Type */}
                                <div className="text-center px-4 py-8 md:py-10 group hover:bg-slate-50 transition-colors bg-slate-50">
                                    <p className="text-3xl md:text-4xl font-light text-slate-900 mb-2 group-hover:text-red-600 transition-colors tracking-tight truncate">
                                        {(() => {
                                            if (specs.tyre_type) return String(specs.tyre_type)

                                            // Defaults based on category
                                            if (product.category === 'pallet_truck' || product.category === 'stacker') return 'Polyurethane'

                                            return 'Industrial'
                                        })()}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Tyre Type
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Tyre Stat 1: Size */}
                                <div className="text-center px-4 py-8 md:py-10 group hover:bg-slate-50 transition-colors">
                                    <p className="text-3xl md:text-5xl font-light text-slate-900 mb-2 group-hover:text-red-600 transition-colors tracking-tight">
                                        {tyreSpecs.size || '-'}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tyre Size</p>
                                </div>

                                {/* Tyre Stat 2: Diameter */}
                                <div className="text-center px-4 py-8 md:py-10 group hover:bg-slate-50 transition-colors">
                                    <p className="text-4xl md:text-5xl font-light text-slate-900 mb-2 group-hover:text-red-600 transition-colors tracking-tight">
                                        {formatRange(tyreSpecs.diameter) !== 'N/A' ? formatRange(tyreSpecs.diameter) : '-'}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Diameter</p>
                                </div>

                                {/* Tyre Stat 3: Type */}
                                <div className="text-center px-4 py-8 md:py-10 group hover:bg-slate-50 transition-colors">
                                    <p className="text-3xl md:text-5xl font-light text-slate-900 mb-2 group-hover:text-red-600 transition-colors tracking-tight truncate">
                                        {tyreSpecs.type || 'Solid'}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Type</p>
                                </div>

                                {/* Tyre Stat 4: Pattern */}
                                <div className="text-center px-4 py-8 md:py-10 group hover:bg-slate-50 transition-colors bg-slate-50">
                                    <p className="text-3xl md:text-4xl font-light text-slate-900 mb-2 group-hover:text-red-600 transition-colors tracking-tight truncate">
                                        {String(tyreSpecs.pattern || 'Standard')}
                                    </p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        Pattern
                                    </p>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>

        </div>
    )
}
