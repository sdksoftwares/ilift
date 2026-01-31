'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// --- SLIDE DATA ---
type Slide = {
  id: number
  type: 'image' | 'video'
  src: string
  alt?: string
  title?: string
  description?: string
  ctaPrimary?: { text: string; href: string }
  ctaSecondary?: { text: string; href: string }
  objectPosition?: string // Allow per-slide positioning
}

const SLIDES: Slide[] = [
  {
    id: 1,
    type: 'image',
    src: "/images/herobanner1.png",
    alt: "Hero Banner 1",
    objectPosition: '50% 80%'
  },
  {
    id: 2,
    type: 'image',
    src: "/images/herobanner2.jpeg",
    alt: "Hero Banner 2",
    title: "Power. Precision. Performance.",
    description: "Dominating the industry with a versatile range: Electric, Diesel, LPG, and Reach Trucks. Engineered for maximum productivity in every environment.",
    ctaPrimary: { text: "Explore Our Fleet", href: "/products" },
    ctaSecondary: { text: "Fast Enquiry", href: "/enquiry" },
    objectPosition: '50% 80%'
  },
  {
    id: 3,
    type: 'video',
    src: "/images/vft1.mp4",
    title: "Advanced Material Handling Solutions",
    description: "Experience superior performance with our next-generation forklifts, built for reliability and global industrial demands.",
    ctaPrimary: { text: "View Products", href: "/products" },
    ctaSecondary: { text: "Contact Sales", href: "/contact" },
    objectPosition: 'center top' // Fix video cropping
  },
  {
    id: 4,
    type: 'video',
    src: "/images/stacker.mp4",
    title: "Maximize Your Space",
    description: "Electric & Manual Stackers designed for precision in tight aisles and vertical storage optimization.",
    ctaPrimary: { text: "View Stackers", href: "/products?category=stacker" },
    ctaSecondary: { text: "Download Brochure", href: "/resources" },
    objectPosition: 'center center'
  },
  {
    id: 5,
    type: 'video',
    src: "/images/tyre.mp4",
    title: "Unstoppable Durability",
    description: "Premium solid and pneumatic industrial tyres engineered for long life, traction, and efficiency on any terrain.",
    ctaPrimary: { text: "View Tyres", href: "/products?category=solid_tyre" },
    ctaSecondary: { text: "Get Quote", href: "/enquiry" },
    objectPosition: 'center center'
  }
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // --- NAVIGATION ---
  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))
  }, [])

  // --- SWIPE LOGIC ---
  const onDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      prevSlide()
    } else if (info.offset.x < -100) {
      nextSlide()
    }
  }

  // Auto-play with Pause
  useEffect(() => {
    if (isPaused) return

    const duration = SLIDES[current].type === 'video' ? 8000 : 6000
    const timer = setInterval(nextSlide, duration)
    return () => clearInterval(timer)
  }, [nextSlide, current, isPaused])

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  }

  return (
    <section
      className="relative w-full h-[calc(100vh-5rem)] bg-black overflow-hidden group focus:outline-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Hero Banner Carousel"
    >

      {/* --- CAROUSEL --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={onDragEnd}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Media Content */}
          <div className="relative w-full h-full">
            {SLIDES[current].type === 'video' ? (
              <video
                src={SLIDES[current].src}
                className="w-full h-full object-cover"
                style={{ objectPosition: SLIDES[current].objectPosition || 'center center' }}
                autoPlay
                muted
                loop
                playsInline
                aria-hidden="true"
              />
            ) : (
              <Image
                src={SLIDES[current].src}
                alt={SLIDES[current].alt || ''}
                fill
                className="object-cover"
                style={{ objectPosition: SLIDES[current].objectPosition || 'center center' }}
                priority
                quality={100}
              />
            )}

            {/* Dark Overlay */}
            <div className={`absolute inset-0 ${SLIDES[current].type === 'video' ? 'bg-black/30' : 'bg-black/5'} transition-opacity duration-300`} />

            {/* --- TEXT CONTENT OVERLAY --- */}
            {SLIDES[current].title && (
              <div className={`absolute inset-0 flex items-center px-6 md:px-16 container mx-auto pointer-events-none 
                ${SLIDES[current].type === 'video' ? 'justify-center text-center' : 'justify-start text-left'}
              `}>
                <div className={`max-w-2xl space-y-6 pointer-events-auto select-none`}>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white drop-shadow-xl leading-none"
                  >
                    {SLIDES[current].title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-base sm:text-lg md:text-xl text-white/90 font-medium drop-shadow-md leading-relaxed"
                  >
                    {SLIDES[current].description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`flex flex-wrap gap-4 pt-4 ${SLIDES[current].type === 'video' ? 'justify-center' : 'justify-start'}`}
                  >
                    {SLIDES[current].ctaPrimary && (
                      <a href={SLIDES[current].ctaPrimary.href} className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded shadow-lg transition-colors border-2 border-red-600">
                        {SLIDES[current].ctaPrimary.text}
                      </a>
                    )}
                    {SLIDES[current].ctaSecondary && (
                      <a href={SLIDES[current].ctaSecondary.href} className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-transparent hover:bg-white/10 text-white font-bold uppercase tracking-wider rounded shadow-lg transition-colors border-2 border-white backdrop-blur-sm">
                        {SLIDES[current].ctaSecondary.text}
                      </a>
                    )}
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* --- CONTROLS --- */}
      {SLIDES.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            type="button"
            aria-label="Previous Slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all z-20 opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            onClick={nextSlide}
            type="button"
            aria-label="Next Slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all z-20 opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* --- INDICATORS --- */}
      {SLIDES.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20" role="tablist">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === current}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === current
                ? 'w-12 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]'
                : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
            />
          ))}
        </div>
      )}

    </section>
  )
}