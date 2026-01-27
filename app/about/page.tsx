import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  CheckCircle2, TrendingUp, Users, Target,
  Award, Globe, ShieldCheck, ArrowRight
} from 'lucide-react'

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
    { label: "Years of Excellence", value: "15+" },
    { label: "Happy Clients", value: "500+" },
    { label: "Products Catalog", value: "2000+" },
    { label: "Support Centers", value: "12" },
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

      {/* 2. STATS BAR */}
      <section className="bg-white border-b border-slate-100 relative z-20 -mt-8 mx-6 rounded-2xl shadow-xl max-w-6xl lg:mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 px-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-slate-900 mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MISSION SECTION */}
      <section id="mission" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Empowering Your Supply Chain
            </h2>
            <div className="space-y-6 text-lg text-slate-500 leading-relaxed">
              <p>
                At iLift, we understand that in logistics and manufacturing, downtime is not an option.
                Before we existed, procuring heavy machinery was a complex web of dealers,
                opaque pricing, and uncertain delivery timelines.
              </p>
              <p>
                <span className="text-slate-900 font-semibold">We changed that.</span> By digitizing the catalog
                and building a robust nationwide support network, we've made buying a forklift as simple
                as buying office supplies—but with the technical backing required for heavy industry.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100 flex gap-12">
              <div>
                <Target className="h-8 w-8 text-red-600 mb-3" />
                <h4 className="font-bold text-slate-900">Our Vision</h4>
                <p className="text-sm text-slate-500 mt-1">To be Asia's most trusted industrial equipment partner.</p>
              </div>
              <div>
                <Award className="h-8 w-8 text-amber-500 mb-3" />
                <h4 className="font-bold text-slate-900">Our Promise</h4>
                <p className="text-sm text-slate-500 mt-1">100% Genuine Parts & Certified Machinery.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-50 rounded-[40px] transform rotate-3" />
            <div className="relative bg-white p-2 rounded-[40px] shadow-2xl overflow-hidden aspect-[4/3] flex items-center justify-center">
              <div className="bg-slate-50 w-full h-full rounded-[32px] flex items-center justify-center border border-slate-100">
                {/* Placeholder for About Image */}
                <div className="text-center p-8">
                  <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">Team at Work</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Values</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              The principles that drive our decisions and define our culture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                <div className={`h-14 w-14 ${val.bg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <val.icon className={`h-7 w-7 ${val.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEAM / LEADERSHIP (Placeholder) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Leadership Team</h2>
            <p className="text-slate-500">Meet the experts behind iLift.</p>
          </div>
          <Link href="/contact" className="text-red-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            Join our Team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-slate-100 rounded-2xl mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-200 animate-pulse" /> {/* Placeholder Skeleton */}
                {/* Image would go here */}
              </div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">Executive Name</h4>
              <p className="text-sm text-slate-500">Position Title</p>
            </div>
          ))}
        </div>
      </section>

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