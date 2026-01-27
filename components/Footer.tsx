'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  Facebook, Linkedin, Twitter, Mail, Phone, MapPin,
  ArrowRight, ChevronDown, Download, ShieldCheck, Youtube, Instagram
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // Mobile Accordion State
  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans relative overflow-hidden">

      {/* Top Gradient Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-slate-800 to-slate-900" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* 1. TOP SECTION: BRAND & MAIN INFO */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">

        {/* BRAND COLUMN (Lg: col-span-4) */}
        <div className="lg:col-span-4 space-y-8">
          <Link href="/" className="inline-block group">
            <span className="text-3xl font-black text-white tracking-tight group-hover:opacity-90 transition-opacity">
              <span className="text-red-600">i</span>-Lift.
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-slate-500 max-w-sm">
            Premier distributor of industrial material handling equipment.
            We supply certified forklifts, stackers, and genuine spare parts to
            keep your operations moving efficiently.
          </p>

          {/* Contact Info (Clickable) */}
          <div className="space-y-4 pt-2">
            <a href="tel:+919876543210" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group">
              <div className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-xs uppercase font-bold tracking-wider text-slate-600 group-hover:text-slate-400 transition-colors">Call Us</span>
                <span className="font-bold text-slate-200">+91 98765 43210</span>
              </div>
            </a>
            <a href="mailto:sales@ilift.in" className="flex items-center gap-4 text-slate-400 hover:text-white transition-colors group">
              <div className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-xs uppercase font-bold tracking-wider text-slate-600 group-hover:text-slate-400 transition-colors">Email Us</span>
                <span className="font-bold text-slate-200">sales@ilift.in</span>
              </div>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-2">
            {[
              { Icon: Youtube, href: "https://www.youtube.com/channel/UCqp9JX1C8WiC4nz8RfyVgog" },
              { Icon: Instagram, href: "https://www.instagram.com/ilift.global/" },
              { Icon: Facebook, href: "https://www.facebook.com/people/I-Lift/61587190494660/?sk=directory_intro" },
            ].map(({ Icon, href }, i) => (
              <Link
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-800 hover:border-slate-700 hover:-translate-y-1"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* NAVIGATION COLUMNS (Lg: col-span-8) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 pt-2">

          {/* Column 1: Machinery */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Machinery <div className="h-1 w-1 rounded-full bg-red-600" />
            </h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="/products?category=forklift" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-red-600" /> Forklifts</Link></li>
              <li><Link href="/products?category=stacker" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-red-600" /> Electric Stackers</Link></li>
              <li><Link href="/products?category=pallet_truck" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-red-600" /> Pallet Trucks</Link></li>
              <li><Link href="/products?category=crane" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-red-600" /> Hydraulic Cranes</Link></li>
              <li><Link href="/products?category=warehouse" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-red-600" /> Warehouse Equipment</Link></li>
            </ul>
          </div>

          {/* Column 2: Parts & Support */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Parts & Support <div className="h-1 w-1 rounded-full bg-red-600" />
            </h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="/products?category=parts_hydraulic" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-red-600" /> Hydraulic Parts</Link></li>
              <li><Link href="/products?category=parts_electrical" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-red-600" /> Electrical Components</Link></li>
              <li><Link href="/products?category=parts_tyres" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-red-600" /> Tyres & Wheels</Link></li>
              <li><Link href="/services/amc" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-red-600" /> Annual Maintenance</Link></li>
              <li><Link href="/services/installation" className="hover:text-red-500 transition-colors flex items-center gap-2 group"><ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all text-red-600" /> Installation Service</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              Stay Updated <div className="h-1 w-1 rounded-full bg-red-600" />
            </h4>
            <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800">
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                Subscribe to get the latest machinery updates, maintenance tips, and exclusive offers tailored for your industry.
              </p>
              <div className="flex gap-2">
                <Input
                  placeholder="Email address"
                  className="bg-slate-950 border-slate-800 text-slate-200 h-10 text-xs focus-visible:ring-red-600 focus-visible:border-red-600"
                />
                <Button size="sm" className="bg-red-600 hover:bg-red-700 h-10 w-10 p-0 shrink-0">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ul className="space-y-3 text-sm mt-8 text-slate-500 border-t border-slate-900 pt-6">
              <li><Link href="/about" className="hover:text-white transition-colors">About iLift</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/studio" target="_blank" className="hover:text-white transition-colors">Employee Login</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* 2. BOTTOM BAR: LEGAL & TRUST */}
      <div className="bg-slate-950 border-t border-slate-900 relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">

          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <p>&copy; {currentYear} iLift Equipment Pvt. Ltd.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link href="#" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span className="font-semibold text-slate-400">ISO 9001:2015</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <span className="font-semibold text-slate-400">Verified Supplier</span>
          </div>

        </div>
      </div>
    </footer>
  )
}