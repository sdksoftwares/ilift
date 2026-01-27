'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Search, ChevronDown,
  HelpCircle, FileText
} from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import LanguageSwitcher from '@/components/LanguageSwitcher'

// --- NAVIGATION DATA ---
const PRODUCTS_MENU = [
  { name: "Forklifts", href: "/products?category=forklift" },
  { name: "Cranes", href: "/products?category=crane" },
  { name: "Stackers", href: "/products?category=stacker" },
  { name: "Pallet Trucks", href: "/products?category=pallet_truck" },
  { name: "Warehouse Equipment", href: "/products?category=warehouse" },
]

const SPARE_PARTS_MENU = [
  { name: "Hydraulic Parts", href: "/products?category=parts_hydraulic" },
  { name: "Electrical Components", href: "/products?category=parts_electrical" },
  { name: "Tyres & Wheels", href: "/products?category=parts_tyres" },
  { name: "Batteries & Chargers", href: "/products?category=parts_battery" },
  { name: "Controllers & Accessories", href: "/products?category=parts_controller" },
]

const SERVICES_MENU = [
  { name: "Installation Support", href: "/services/installation" },
  { name: "Maintenance & AMC", href: "/services/amc" },
  { name: "Part Sourcing", href: "/services/sourcing" },
  { name: "On-site Inspection", href: "/services/inspection" },
]

const BRANDS_MENU = [
  { name: "Toyota", href: "/products?brand=toyota" },
  { name: "Godrej", href: "/products?brand=godrej" },
  { name: "Nilkamal", href: "/products?brand=nilkamal" },
  { name: "Voltas", href: "/products?brand=voltas" },
]

export default function Navbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const cartCount = useCartStore((state) => state.items.length)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)

  useEffect(() => {
    setSearchQuery(searchParams.get('query') || '')
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?query=${encodeURIComponent(searchQuery)}`)
      setIsMobileMenuOpen(false)
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
          className="flex-shrink-0 cursor-pointer select-none flex items-center mr-8"
          title="Double-click for Admin"
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/logo2.png"
              alt="i-Lift Logo"
              width={240}
              height={80}
              className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>
        </div>

        {/* 2. SEARCH BAR (Hidden on Mobile) */}
        <div className="hidden md:block flex-1 max-w-lg mx-auto px-6">
          <form onSubmit={handleSearch} className="relative w-full group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-500 transition-colors h-4 w-4" />
            <Input
              placeholder="Search machines or spare parts..."
              className="pl-10 bg-slate-100/50 border-transparent focus:bg-white focus:border-red-500/20 focus:ring-4 focus:ring-red-500/5 h-11 text-sm rounded-full w-full transition-all duration-300 placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* 3. MENU & ACTIONS */}
        <div className="flex items-center justify-end gap-2">

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden xl:flex items-center gap-1 text-[15px] font-medium text-slate-700 mr-6">
            <Link href="/" className="px-3 py-2 hover:bg-slate-50 hover:text-red-700 rounded-lg transition-colors">Home</Link>

            {/* Products Dropdown */}
            <div className="relative group">
              <Link href="/products" className="flex items-center gap-1 px-3 py-2 hover:bg-slate-50 hover:text-red-700 rounded-lg group-hover:text-red-700 transition-all">
                Products <ChevronDown className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              <div className="hidden group-hover:block absolute top-full right-0 w-64 bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-xl pt-2 z-50 ring-1 ring-black/5 p-2">
                <div className="space-y-0.5">
                  {PRODUCTS_MENU.map((item) => (
                    <Link key={item.name} href={item.href} className="block px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-red-700 rounded-sm">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Spare Parts Dropdown */}
            <div className="relative group">
              <Link href="/products?category=spare_parts" className="flex items-center gap-1 px-3 py-2 hover:bg-slate-50 hover:text-red-700 rounded-lg group-hover:text-red-700 transition-all">
                Spare Parts <ChevronDown className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              <div className="hidden group-hover:block absolute top-full right-0 w-64 bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-xl pt-2 z-50 ring-1 ring-black/5 p-2">
                <div className="space-y-0.5">
                  {SPARE_PARTS_MENU.map((item) => (
                    <Link key={item.name} href={item.href} className="block px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-red-700 rounded-sm">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* i-School Link */}
            <Link href="/i-school" className="px-3 py-2 hover:bg-slate-50 hover:text-red-700 rounded-lg transition-colors">
              i-School
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <Link href="/services" className="flex items-center gap-1 px-3 py-2 hover:bg-slate-50 hover:text-red-700 rounded-lg group-hover:text-red-700 transition-all">
                Services <ChevronDown className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-300" />
              </Link>
              <div className="hidden group-hover:block absolute top-full right-0 w-64 bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-xl pt-2 z-50 ring-1 ring-black/5 p-2">
                <div className="space-y-0.5">
                  {SERVICES_MENU.map((item) => (
                    <Link key={item.name} href={item.href} className="block px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-red-700 rounded-sm">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/about" className="px-3 py-2 hover:bg-slate-50 hover:text-red-700 rounded-lg transition-colors">About</Link>
            <Link href="/contact" className="px-3 py-2 hover:bg-slate-50 hover:text-red-700 rounded-lg transition-colors">Contact</Link>
          </div>

          {/* LANGUAGE SWITCHER (Hidden on small mobile, visible on desktop) */}
          <div className="hidden sm:block mr-2">
            <LanguageSwitcher />
          </div>

          {/* Need Help (Desktop) */}
          <button
            onClick={handleHelpClick}
            className="hidden lg:flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors text-sm font-semibold mr-6"
          >
            <HelpCircle className="h-5 w-5" />
            <span className="hidden xl:inline">Need Help?</span>
          </button>

          {/* Get Quote */}
          <Link href="/enquiry">
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all duration-300 rounded-full h-11 px-6 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline font-semibold">Get Quote</span>
              {cartCount > 0 && (
                <Badge variant="secondary" className="bg-white text-red-600 hover:bg-white ml-1 px-1.5 h-5 min-w-[20px] flex items-center justify-center">
                  {cartCount}
                </Badge>
              )}
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
                    <div className="pl-4 space-y-1 bg-slate-50 rounded-lg mb-2">
                      {PRODUCTS_MENU.map((item) => (
                        <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block p-3 text-slate-600 hover:text-red-600">
                          {item.name}
                        </Link>
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
                    <div className="pl-4 space-y-1 bg-slate-50 rounded-lg mb-2">
                      {SPARE_PARTS_MENU.map((item) => (
                        <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block p-3 text-slate-600 hover:text-red-600">
                          {item.name}
                        </Link>
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