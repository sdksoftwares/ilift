import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  CheckCircle2, TrendingUp, Users, Target,
  Award, Globe, ShieldCheck, ArrowRight
} from 'lucide-react'
import { CoreExpertise } from '@/components/about/CoreExpertise'
import { CoreValues } from '@/components/about/CoreValues'

export const metadata = {
  title: 'About Us | iLift - Elevating Industrial Standards',
  description: 'Learn about iLift, the premier B2B platform for certified industrial lifting equipment, spare parts, and machinery.',
  keywords: ['industrial lifting equipment', 'material handling', 'forklift supplier', 'warehouse machinery'],
  openGraph: {
    title: 'About iLift | Elevating Industrial Standards',
    description: 'Bridging the gap between heavy machinery manufacturers and businesses.',
    type: 'website',
  }
}

export default function AboutPage() {
  const stats = [
    { label: "Global Network", value: "Global" },
    { label: "Quality Assurance", value: "100%" },
    { label: "Support System", value: "24/7" },
    { label: "Parts Availability", value: "Instant" },
  ]

  const values = [
    {
      title: "Safety First",
      desc: "We never compromise on safety standards. Every machine is certified and rigorously tested.",
      icon: ShieldCheck,
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      title: "Integrity",
      desc: "Transparent pricing, honest timelines, and genuine spare parts. We build trust through clarity.",
      icon: CheckCircle2,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Innovation",
      desc: "We constantly update our inventory with the latest electric and automated lifting solutions.",
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50"
    }
  ]

  return (
    <main className="min-h-screen bg-white font-sans">

      {/* 1. HERO SECTION */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] -mr-40 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wide mb-6 backdrop-blur-md">
            <Globe className="h-3.5 w-3.5" /> Premier Equipment Partner
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Elevating Industrial <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Standards.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            iLift bridges the gap between top-tier heavy machinery manufacturers and the businesses that power the economy.
            We make procurement digital, transparent, and efficient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#mission">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold h-12 px-8 rounded-full">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR (Redesigned) */}
      <section className="relative z-20 -mt-12 mx-6 max-w-6xl lg:mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 bg-white">
            {stats.map((stat, i) => (
              <div key={i} className="text-center py-10 px-4 group hover:bg-slate-50 transition-colors cursor-default">
                <div className="text-3xl md:text-5xl font-black text-slate-900 mb-2 group-hover:text-red-600 transition-colors tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
          {/* Decorative bottom strip */}
          <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-slate-900 to-red-500" />
        </div>
      </section>

      {/* 3. CORE EXPERTISE SECTION */}
      {/* 3. CORE EXPERTISE SECTION - Cleaned Layout */}
      {/* 3. CORE EXPERTISE SECTION */}
      <CoreExpertise />

      {/* 4. CORE VALUES */}
      <CoreValues />



      {/* 6. BOTTOM CTA */}
      <section className="bg-slate-900 py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to work with the best?</h2>
          <p className="text-slate-400 mb-10 text-lg">
            Join thousands of satisfied customers who have upgraded their operations with iLift.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold h-14 px-10 rounded-full text-lg">
              Explore Catalog
            </Button>
          </Link>
        </div>
      </section>

    </main>
  )
}