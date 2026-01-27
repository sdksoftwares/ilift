'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Globe, Component } from 'lucide-react'

// --- 1. SLIDE DATA CONFIGURATION ---
const SLIDES = [
  {
    id: 1,
    category: "Industrial Equipment",
    title: "Industrial Machinery & Genuine Spare Parts Supplier",
    description: "Authorized supply of Forklifts, Stackers, and OEM Spare Parts. Supporting warehouses worldwide.",
    image: "/images/hero_forklift.png",
    ctaPrimary: "Contact Us",
    ctaSecondary: "Browse Full Catalog"
  },
  {
    id: 2,
    category: "Warehouse Solutions",
    title: "High-Performance Electric Stackers",
    description: "Optimize vertical storage with precision-engineered stackers. Ready for heavy-duty industrial application.",
    image: "/images/hero_stacker.png",
    ctaPrimary: "Contact Us",
    ctaSecondary: "Browse Full Catalog"
  },
  {
    id: 3,
    category: "Material Handling",
    title: "Durable Pallet Movers",
    description: "The backbone of global logistics. Manual and battery-operated pallet trucks for seamless operations.",
    image: "/images/hero_pallet.png",
    ctaPrimary: "Contact Us",
    ctaSecondary: "Browse Full Catalog"
  },
  {
    id: 4,
    category: "Components",
    title: "Genuine OEM Spare Parts",
    description: "Global supply of tires, batteries, and hydraulic components for all major industrial brands.",
    image: "/images/hero_parts.png",
    ctaPrimary: "Contact Us",
    ctaSecondary: "Browse Full Catalog"
  }
]

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
}

const floatingImageVariants: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// --- PARTICLE COMPONENT ---
const Sparkles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; style: { left: string; top: string; width: number; height: number }; duration: number; delay: number }>>([])

  useEffect(() => {
    // Generate static initial positions to avoid hydration mismatch
    const newParticles = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: Math.random() * 4 + 1, // 1-5px size
        height: Math.random() * 4 + 1,
      },
      duration: Math.random() * 5 + 3, // 3-8s duration
      delay: Math.random() * 5, // 0-5s delay
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-orange-500/80 blur-[0.5px]"
          style={p.style}
          animate={{
            y: [0, -200], // Float up
            x: [0, Math.random() * 50 - 25], // Drift side to side
            opacity: [0, 1, 0], // Fade in/out
            scale: [0, 1.2, 0], // Grow and shrink
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // --- 2. CAROUSEL LOGIC ---
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))
  }

  // Auto-slide effect (5 seconds)
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [isPaused, nextSlide])

  return (
    <section
      className="relative bg-slate-950 text-white overflow-hidden group min-h-[85vh] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Cinematic Banner Background */}

      {/* 1. Base Dark Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 z-0" />

      {/* 2. Industrial Texture Overlay */}
      <div className="absolute inset-0 bg-[url('/grid-texture.png')] opacity-[0.03] mix-blend-overlay z-0" />

      {/* 3. Global Light Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-red-900/20 rounded-full blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 4. Fire Particles */}
      <Sparkles />

      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 relative z-10 h-full">
        <div className="grid lg:grid-cols-2 gap-0 h-full items-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 lg:py-0 lg:col-span-2"
            >

              {/* --- LEFT SEGMENT: TEXT & CTAs --- */}
              <div className="text-center lg:text-left space-y-8 order-2 lg:order-1 relative z-20">
                <div className="space-y-6">
                  {/* Category Badge */}
                  <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-red-600/10 border-l-4 border-red-600 text-red-500 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                      {SLIDES[current].category}
                    </div>
                  </motion.div>

                  {/* Headline */}
                  <motion.h1
                    variants={itemVariants}
                    className="text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] text-white drop-shadow-xl min-h-[2.2em] flex items-center lg:items-end justify-center lg:justify-start"
                  >
                    {SLIDES[current].title}
                  </motion.h1>

                  {/* Subheading */}
                  <motion.p
                    variants={itemVariants}
                    className="text-lg lg:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md font-medium"
                  >
                    {SLIDES[current].description}
                  </motion.p>
                </div>

                {/* CTAs */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold h-14 px-10 text-lg shadow-xl shadow-red-900/30 rounded-md uppercase tracking-wide border-2 border-transparent transition-all hover:scale-105 active:scale-95">
                      {SLIDES[current].ctaPrimary}
                    </Button>
                  </Link>
                  <Link href="/products" className="group flex items-center gap-2 text-white/80 hover:text-white font-semibold transition-colors uppercase tracking-wider text-sm">
                    {SLIDES[current].ctaSecondary}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>

                {/* Trust Strip */}
                <motion.div
                  variants={itemVariants}
                  className="pt-8 border-t border-white/10 flex flex-wrap justify-center lg:justify-start gap-x-10 gap-y-4"
                >
                  <div className="flex items-center gap-3 text-slate-300 group/item">
                    <div className="p-2 rounded-full bg-slate-900/50 group-hover/item:bg-red-600/20 transition-colors">
                      <Component className="h-5 w-5 text-red-500" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide">Multi-Brand Supply</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 group/item">
                    <div className="p-2 rounded-full bg-slate-900/50 group-hover/item:bg-red-600/20 transition-colors">
                      <ShieldCheck className="h-5 w-5 text-red-500" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide">Genuine Spare Parts</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 group/item">
                    <div className="p-2 rounded-full bg-slate-900/50 group-hover/item:bg-red-600/20 transition-colors">
                      <Globe className="h-5 w-5 text-red-500" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wide">Global Delivery</span>
                  </div>
                </motion.div>
              </div>

              {/* --- RIGHT SEGMENT: PRODUCT VISUAL --- */}
              <motion.div
                variants={itemVariants}
                className="relative order-1 lg:order-2 flex justify-center lg:justify-end h-full items-center"
              >
                {/* Cinematic Image Container */}
                <div className="relative w-full max-w-[500px] lg:max-w-full h-[400px] lg:h-[650px] flex items-center justify-center lg:justify-end">

                  {/* Ground Shadow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[70%] h-[15%] bg-black/60 blur-2xl rounded-[100%]"
                  />

                  {/* Gradient Light Spill */}
                  <motion.div
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute center inset-0 bg-gradient-to-l from-red-600/10 to-transparent blur-3xl"
                  />

                  {/* Image */}
                  <motion.div
                    variants={floatingImageVariants}
                    animate="animate"
                    className="relative w-full h-full flex items-center justify-center p-4 lg:p-0"
                  >
                    <Image
                      src={SLIDES[current].image}
                      alt={SLIDES[current].title}
                      fill
                      className="object-contain object-center drop-shadow-2xl"
                      priority
                    />
                  </motion.div>
                </div>
              </motion.div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* --- 3. NAVIGATION CONTROLS --- */}

      {/* Side Arrows (Visible on Hover) */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-red-600 text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/10 shadow-lg hover:scale-110 z-30"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-red-600 text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/10 shadow-lg hover:scale-110 z-30"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Bottom Dots with Progress Timer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30 p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/5">
        {SLIDES.map((_, index) => {
          const isActive = index === current;
          return (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-300 bg-white/20 hover:bg-white/40"
              style={{ width: isActive ? '3rem' : '0.5rem' }}
            >
              {isActive && !isPaused && (
                <motion.div
                  className="absolute inset-0 bg-red-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  layoutId="progress"
                />
              )}
              {isActive && isPaused && (
                <div className="absolute inset-0 bg-red-600 w-full" />
              )}
            </button>
          )
        })}
      </div>

    </section>
  )
}