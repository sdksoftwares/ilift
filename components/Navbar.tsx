'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Search, ChevronDown,
  HelpCircle
} from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import LanguageSwitcher from '@/components/LanguageSwitcher'

// --- NAVIGATION DATA ---
interface ProductMenuItem {
  name: string
  href: string
  image: string
  subcategories?: { name: string; href: string }[]
}

const PRODUCTS_MENU: ProductMenuItem[] = [
  {
    name: "Fork Lifts",
    href: "/products?category=forklifts",
    image: "/images/fk2.png",
    subcategories: [
      { name: "Electric", href: "/products?category=forklifts_electric" },
      { name: "Diesel", href: "/products?category=forklifts_diesel" },
      { name: "LPG", href: "/products?category=forklifts_lpg" },
    ]
  },
  {
    name: "Stacker",
    href: "/products?category=stacker",
    image: "/images/stac.png",
    subcategories: [
      { name: "Electric", href: "/products?category=stacker_electric" },
      { name: "Manual", href: "/products?category=stacker_manual" },
    ]
  },
  {
    name: "Reach Truck",
    href: "/products?category=reach_truck",
    image: "/images/rchtrk.png" // Fallback image
  },
  {
    name: "Heavy Duty Fork Lift",
    href: "/products?category=heavy_duty_forklift",
    image: "/images/fk1.png" // Fallback image
  },
  {
    name: "Pallet Truck",
    href: "/products?category=pallet_truck",
    image: "/images/pllt.png",
    subcategories: [
      { name: "Fully Electric", href: "/products?category=pallet_truck_electric" },
      { name: "Semi Electric", href: "/products?category=pallet_truck_semi_electric" },
      { name: "Manual Hand Pallet", href: "/products?category=pallet_truck_manual" },
    ]
  },
  {
    name: "Solid Tyre",
    href: "/products?category=solid_tyre",
    image: "/images/tym.png", // Fallback image
    subcategories: [
      { name: "Solid Resilient", href: "/products?category=solid_tyre_resilient" },
      { name: "Solid Press-on", href: "/products?category=solid_tyre_press_on" },
      { name: "Solid Non Marking", href: "/products?category=solid_tyre_non_marking" },
      { name: "Solid Skid Steer", href: "/products?category=solid_tyre_skid_steer" },
      { name: '18 x 7 - 8 / 4.33"', href: "/products?category=solid_tyre_18x7-8_4.33" },
      { name: '6.00 - 9 / 4.00"', href: "/products?category=solid_tyre_600-9_4.00" },
      { name: '6.50 - 10 / 5.00"', href: "/products?category=solid_tyre_650-10_5.00" },
      { name: '7.00 - 12 / 5.00"', href: "/products?category=solid_tyre_700-12_5.00" },
      { name: '8.15 - 15 / 7.00"', href: "/products?category=solid_tyre_815-15_7.00" },
      { name: '8.25 - 15 / 6.50"', href: "/products?category=solid_tyre_825-15_6.50" },
    ]
  },
]

const SPARE_PARTS_MENU = [
  { name: "Consumables", href: "/products?category=spares_consumables" },
  { name: "Engine", href: "/products?category=spares_engine" },
  { name: "Hydraulic Parts", href: "/products?category=spares_hydraulic" },
  { name: "Electrical Parts", href: "/products?category=spares_electrical" },
  {
    name: "Battery",
    href: "/products?category=spares_battery",
    subcategories: [
      { name: "Wet Cell", href: "/products?category=spares_battery_wet" },
      { name: "Lithium ion", href: "/products?category=spares_battery_lithium" },
    ]
  },
  { name: "Brake Parts", href: "/products?category=spares_brake" },
  { name: "Transmission", href: "/products?category=spares_transmission" },
  { name: "Wheels", href: "/products?category=spares_wheels" },
]

const SERVICES_MENU = [
  { name: "Installation Support", href: "/services/installation" },
  { name: "Maintenance & AMC", href: "/services/amc" },
  { name: "Part Sourcing", href: "/services/sourcing" },
  { name: "On-site Inspection", href: "/services/inspection" },
]



export default function Navbar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)

  // Track the active category for the desktop mega-menu
  const [activeProductCategory, setActiveProductCategory] = useState<ProductMenuItem>(PRODUCTS_MENU[0])
  const [activeSparePartCategory, setActiveSparePartCategory] = useState(SPARE_PARTS_MENU[0])

  useEffect(() => {
    const query = searchParams.get('query') || ''
    if (query !== searchQuery) {
      setSearchQuery(query)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?query=${encodeURIComponent(searchQuery)}`)
      setIsMobileMenuOpen(false)
      setIsSearchOpen(false)
    }
  }

  const handleHelpClick = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-chat'))
    }
    // Also try to find and click the floating button as backup
    const chatContainer = document.querySelector('.fixed.bottom-6.right-6');
    if (chatContainer) {
      const btn = chatContainer.querySelector('button');
      if (btn) btn.click();
    }
    setIsMobileMenuOpen(false)
  }

  const handleLogoDoubleClick = () => {
    window.open('/studio', '_blank')
  }

  const toggleMobileSubmenu = (menu: string) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu)
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] font-sans transition-all duration-300">
      <div className="w-full px-4 lg:px-8 h-20 flex items-center justify-between gap-4">

        {/* 1. LOGO */}
        <div
          onDoubleClick={handleLogoDoubleClick}
          className="flex-shrink-0 cursor-pointer select-none flex items-center"
          title="Double-click for Admin"
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/logo2.png"
              alt="i-Lift Logo"
              width={240}
              height={80}
              className="h-14 w-auto object-contain hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>
        </div>

        {/* 2. CENTER NAVIGATION (Desktop) */}
        <div className="hidden xl:flex items-center gap-8 text-base font-bold tracking-tight text-slate-700 mx-auto">
          <Link href="/" className="flex items-center text-base font-bold hover:text-red-700 transition-colors py-2 uppercase">Home</Link>

          {/* Products Dropdown - MEGA MENU */}
          <div className="relative group h-20 flex items-center">
            <Link href="/products" className="flex items-center gap-1 hover:text-red-700 transition-colors py-2 uppercase">
              Products <ChevronDown className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-300" />
            </Link>

            {/* Mega Menu Container */}
            <div className="hidden group-hover:block fixed top-20 left-1/2 -translate-x-1/2 bg-white border-t border-slate-100 shadow-2xl shadow-slate-900/20 rounded-b-xl z-50 w-[1300px] max-w-[95vw] cursor-default">
              <div className="flex min-h-[500px]">

                {/* 1. LEFT COLUMN: Categories */}
                <div className="w-[30%] bg-slate-50 py-0 border-r border-slate-100 flex flex-col">
                  {PRODUCTS_MENU.map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => setActiveProductCategory(item)}
                      className={`
                        px-6 py-4 cursor-pointer flex items-center gap-4 group transition-all duration-200 border-b border-slate-100 last:border-0
                        ${activeProductCategory.name === item.name
                          ? 'bg-red-600 text-white shadow-md z-10'
                          : 'text-slate-700 hover:bg-white hover:text-red-600'}
                      `}
                    >
                      <div className={`
                        relative w-12 h-10 p-1 rounded bg-white flex items-center justify-center
                         ${activeProductCategory.name === item.name ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}
                      `}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <span className="font-bold uppercase text-sm tracking-wider flex-1">{item.name}</span>
                      {activeProductCategory.name === item.name && (
                        <span className="text-white text-lg font-bold">›</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* 2. MIDDLE COLUMN: Subcategories */}
                <div className="w-[35%] p-8 bg-white overflow-y-auto max-h-[600px] border-r border-slate-50">
                  <h3 className="text-red-600 font-bold uppercase text-xl mb-6 border-b-2 border-red-100 pb-2 inline-block">
                    {activeProductCategory.name} Models
                  </h3>

                  {activeProductCategory.subcategories ? (
                    <div className="space-y-3">
                      {activeProductCategory.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block p-3 text-base font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 hover:pl-5 rounded transition-all duration-300 border-b border-slate-50 last:border-0"
                        >
                          {sub.name}
                        </Link>
                      ))}
                      <div className="mt-8">
                        <Link
                          href={activeProductCategory.href}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white text-xs font-bold uppercase rounded hover:bg-red-700 transition-colors shadow-md shadow-red-200"
                        >
                          View All {activeProductCategory.name}
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-400 text-sm italic py-4">
                      No specific sub-models listed.
                      <div className="mt-8">
                        <Link
                          href={activeProductCategory.href}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white text-xs font-bold uppercase rounded hover:bg-red-700 transition-colors shadow-md shadow-red-200"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. RIGHT COLUMN: Image Preview */}
                <div className="w-[35%] p-8 bg-white flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Background pattern/accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -z-10 opacity-50 translate-x-1/3 -translate-y-1/3"></div>

                  <motion.div
                    key={activeProductCategory.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full aspect-square max-w-[350px]"
                  >
                    <Image
                      src={activeProductCategory.image}
                      alt={activeProductCategory.name}
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                  <div className="mt-8 text-center z-10">
                    <h4 className="font-bold text-2xl text-slate-800 uppercase tracking-tight">{activeProductCategory.name}</h4>
                    <div className="h-1 w-20 bg-red-600 mx-auto my-3 rounded-full"></div>
                    <p className="text-sm text-slate-500 font-medium">Professional Construction & Industrial Support</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Spare Parts Dropdown - MEGA MENU */}
          <div className="relative group h-20 flex items-center">
            <Link href="/products?category=spare_parts" className="flex items-center gap-1 hover:text-red-700 transition-colors py-2 uppercase">
              Spare Parts <ChevronDown className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-300" />
            </Link>

            {/* Spare Parts Mega Menu Container */}
            <div className="hidden group-hover:block fixed top-20 left-1/2 -translate-x-1/2 bg-white border-t border-slate-100 shadow-2xl shadow-slate-900/20 z-50 w-[900px] max-w-[95vw] cursor-default rounded-none">
              <div className="flex min-h-[400px]">

                {/* 1. LEFT COLUMN: Categories */}
                <div className="w-[40%] bg-slate-50 border-r border-slate-100 flex flex-col py-0">
                  {SPARE_PARTS_MENU.map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => setActiveSparePartCategory(item)}
                      className={`
                        px-6 py-3.5 cursor-pointer flex items-center gap-4 group transition-all duration-200 border-b border-slate-100 last:border-0
                        ${activeSparePartCategory.name === item.name
                          ? 'bg-red-600 text-white shadow-md z-10'
                          : 'text-slate-700 hover:bg-white hover:text-red-600'}
                      `}
                    >
                      <span className="font-bold uppercase text-sm tracking-wider flex-1">{item.name}</span>
                      {activeSparePartCategory.name === item.name && (
                        <span className="text-white text-lg font-bold">›</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* 2. RIGHT COLUMN: Content */}
                <div className="w-[60%] p-8 bg-white relative">
                  <h3 className="text-red-600 font-bold uppercase text-xl mb-6 border-b-2 border-red-100 pb-2 inline-block">
                    {activeSparePartCategory.name}
                  </h3>

                  {'subcategories' in activeSparePartCategory && activeSparePartCategory.subcategories ? (
                    <div className="space-y-3">
                      {activeSparePartCategory.subcategories.map((sub: any) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block p-3 text-base font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 hover:pl-5 transition-all duration-300 border-b border-slate-50 last:border-0"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Find high-quality {activeSparePartCategory.name.toLowerCase()} for your equipment. Genuine parts ensure longevity and performance.
                      </p>
                      <div className="mt-4">
                        <Link
                          href={activeSparePartCategory.href}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white text-xs font-bold uppercase hover:bg-red-700 transition-colors shadow-md shadow-red-200 rounded-none"
                        >
                          View {activeSparePartCategory.name} Catalog
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Decorative faint background text/icon */}
                  <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none">
                    <h1 className="text-8xl font-black text-slate-900 uppercase tracking-tighter truncate max-w-[400px]">
                      PARTS
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Dropdown - MEGA MENU */}
          <div className="relative group h-20 flex items-center">
            <Link href="/services" className="flex items-center gap-1 hover:text-red-700 transition-colors py-2 uppercase">
              Services <ChevronDown className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-300" />
            </Link>

            <div className="hidden group-hover:block fixed top-20 left-1/2 -translate-x-1/2 bg-white border-t border-slate-100 shadow-2xl shadow-slate-900/20 z-50 w-[800px] max-w-[95vw] cursor-default rounded-none">
              <div className="p-8 grid grid-cols-2 gap-6">
                {SERVICES_MENU.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group block p-6 border border-slate-100 hover:border-red-600 hover:shadow-lg transition-all duration-300 bg-slate-50 hover:bg-white"
                  >
                    <h4 className="font-bold text-lg text-slate-800 group-hover:text-red-600 uppercase mb-2 flex items-center gap-2">
                      {item.name}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600">→</span>
                    </h4>
                    <p className="text-sm text-slate-500 group-hover:text-slate-600">
                      Professional {item.name.toLowerCase()} solutions for your heavy machinery needs.
                    </p>
                  </Link>
                ))}
              </div>
              {/* Footer strip */}
              <div className="bg-slate-900 text-white px-8 py-3 flex justify-between items-center text-sm font-medium">
                <span>Need immediate assistance?</span>
                <Link href="/contact" className="hover:text-red-400 transition-colors uppercase text-xs font-bold tracking-wider">
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>

          <Link href="/i-school" className="hover:text-red-700 transition-colors uppercase">i-School</Link>
          <Link href="/about" className="hover:text-red-700 transition-colors uppercase">About Us</Link>
          <Link href="/contact" className="hover:text-red-700 transition-colors uppercase">Contact</Link>
        </div>

        {/* 3. RIGHT UTILITIES */}
        <div className="flex items-center justify-end gap-1 md:gap-4">

          {/* Search Toggle */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[200px] md:w-[300px] flex items-center">
                <form onSubmit={handleSearch} className="w-full relative">
                  <Input
                    placeholder="Search..."
                    className="pr-8 h-10 bg-white border-slate-200 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    onBlur={() => !searchQuery && setIsSearchOpen(false)}
                  />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X className="h-4 w-4" />
                  </button>
                </form>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-600 hover:text-red-600 transition-colors rounded-full hover:bg-slate-50"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          {/* Language Switcher */}
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          {/* Need Help (Desktop) */}
          <button
            onClick={handleHelpClick}
            className="hidden lg:flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors text-sm font-semibold"
            title="Need Help?"
          >
            <HelpCircle className="h-5 w-5" />
          </button>

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          {/* Quote Button */}
          <Link href="/enquiry" className="hidden sm:block">
            <Button className="bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 rounded-md h-10 px-6 font-semibold text-sm">
              Get Quote
            </Button>
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className="xl:hidden p-2 text-slate-700 hover:text-red-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* =======================
          4. MOBILE MENU (Full Overlay)
         ======================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 right-0 bottom-0 z-40 bg-white overflow-y-auto pb-20 border-t border-slate-200 xl:hidden"
            style={{ height: 'calc(100vh - 5rem)' }}
          >
            <div className="p-6 space-y-6">

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search machines..."
                  className="pl-10 bg-slate-50 border-slate-200 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>

              <div className="py-2 border-b border-slate-100 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Language</span>
                <LanguageSwitcher />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-1">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 font-medium text-lg text-slate-800 hover:bg-slate-50 rounded-lg">
                  Home
                </Link>

                {/* Mobile Products Accordion */}
                <div>
                  <button onClick={() => toggleMobileSubmenu('products')} className="flex items-center justify-between w-full p-3 font-medium text-lg text-slate-800 hover:bg-slate-50 rounded-lg">
                    Products <ChevronDown className={`h-5 w-5 transition-transform ${mobileSubmenu === 'products' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSubmenu === 'products' && (
                    <div className="pl-4 space-y-4 bg-slate-50 rounded-lg mb-2 py-3">
                      {PRODUCTS_MENU.map((item) => (
                        <div key={item.name} className="space-y-2">
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 font-semibold text-slate-800 hover:text-red-600"
                          >
                            {item.name}
                          </Link>
                          {'subcategories' in item && item.subcategories && (
                            <div className="pl-3 space-y-1 border-l-2 border-slate-200 ml-3">
                              {item.subcategories.map((sub: any) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-3 py-1.5 text-sm text-slate-600 hover:text-red-600"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Mobile Spare Parts Accordion */}
                <div>
                  <button onClick={() => toggleMobileSubmenu('parts')} className="flex items-center justify-between w-full p-3 font-medium text-lg text-slate-800 hover:bg-slate-50 rounded-lg">
                    Spare Parts <ChevronDown className={`h-5 w-5 transition-transform ${mobileSubmenu === 'parts' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSubmenu === 'parts' && (
                    <div className="pl-4 space-y-3 bg-slate-50 rounded-lg mb-2 py-3">
                      {SPARE_PARTS_MENU.map((item) => (
                        <div key={item.name} className="space-y-1">
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block p-2 text-slate-700 hover:text-red-600 font-medium"
                          >
                            {item.name}
                          </Link>
                          {'subcategories' in item && item.subcategories && (
                            <div className="pl-3 space-y-1 border-l-2 border-slate-200 ml-3">
                              {item.subcategories.map((sub: any) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-3 py-1 text-sm text-slate-500 hover:text-red-600"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/i-school" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 font-medium text-lg text-slate-800 hover:bg-slate-50 rounded-lg">
                  i-School
                </Link>

                {/* Mobile Services Accordion */}
                <div>
                  <button onClick={() => toggleMobileSubmenu('services')} className="flex items-center justify-between w-full p-3 font-medium text-lg text-slate-800 hover:bg-slate-50 rounded-lg">
                    Services <ChevronDown className={`h-5 w-5 transition-transform ${mobileSubmenu === 'services' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileSubmenu === 'services' && (
                    <div className="pl-4 space-y-1 bg-slate-50 rounded-lg mb-2">
                      {SERVICES_MENU.map((item) => (
                        <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block p-3 text-slate-600 hover:text-red-600">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 font-medium text-lg text-slate-800 hover:bg-slate-50 rounded-lg">
                  About Us
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 font-medium text-lg text-slate-800 hover:bg-slate-50 rounded-lg">
                  Contact
                </Link>

                {/* Mobile Need Help */}
                <button
                  onClick={handleHelpClick}
                  className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 font-medium mt-4 w-full text-left"
                >
                  <HelpCircle className="h-5 w-5" /> Need Help?
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}