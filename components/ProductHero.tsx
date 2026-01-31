'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShieldCheck, Globe, Truck, CheckCircle } from 'lucide-react'

export default function ProductHero() {
    return (
        <div className="relative h-[350px] md:h-[400px] w-full overflow-hidden bg-slate-900 border-b-4 border-red-600">

            {/* 1. Background Image with Parallax-like feel (Static) */}
            <div className="absolute inset-0">
                <Image
                    src="/images/herobanner1.png" // Using the user's banner
                    alt="Industrial Warehouse"
                    fill
                    className="object-cover opacity-40 mix-blend-overlay"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-red-900/40" />
            </div>

            {/* 2. Content Container */}
            <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 flex flex-col justify-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-200 text-xs font-bold uppercase tracking-widest mb-4">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        Wait-less Delivery
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-tight mb-4">
                        Equip Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Workforce</span> <br />
                        With The Best.
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mb-8">
                        Explore our comprehensive catalog of certified lifting solutions.
                        Engineered for durability, designed for efficiency.
                    </p>

                    {/* TRUST SIGNALS Grid */}
                    <div className="flex flex-wrap gap-6 md:gap-10">
                        <div className="flex items-center gap-3 text-white/80">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <ShieldCheck className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white uppercase tracking-wide">Certified</span>
                                <span className="text-xs text-slate-400">Quality Assurance</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-white/80">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Globe className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white uppercase tracking-wide">Global</span>
                                <span className="text-xs text-slate-400">Shipping Support</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-white/80">
                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                <Truck className="w-6 h-6 text-red-400" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white uppercase tracking-wide">Fast</span>
                                <span className="text-xs text-slate-400">Delivery Network</span>
                            </div>
                        </div>
                    </div>

                </motion.div>

            </div>
        </div>
    )
}
