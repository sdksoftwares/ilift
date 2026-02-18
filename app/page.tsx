import { getFeaturedProducts } from '@/lib/sanity'
import FeaturedProducts from '@/components/FeaturedProducts'
import Hero from '@/components/Hero'
import ExploreCategories from '@/components/ExploreCategories'

import CartDrawer from '@/components/CartDrawer'
import Link from 'next/link'
import {
  ArrowRight, ShieldCheck, Clock, Layers, Factory, Wrench, Globe,
  Search, ShoppingCart, Send, Phone, CheckCircle2,
  MapPin, Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Revalidate data every hour
export const revalidate = 3600;

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "iLift | Premium Industrial Machinery & Lifting Equipment",
  description: "Leading supplier of forklifts, pallet trucks, and warehouse machinery. Get genuine parts and expert service.",
  keywords: ["forklift", "pallet truck", "stacker", "industrial machinery", "spare parts"],
  openGraph: {
    title: "iLift Industrial Solutions",
    description: "Premium lifting equipment and machinery for your warehouse.",
    // images: ['/og-image.jpg'], // TODO: Add default OG image
    type: 'website',
  }
}

export default async function Home() {
  // 1. Fetch Featured Products
  const products = await getFeaturedProducts()

  return (
    <main className="min-h-screen bg-slate-50 font-sans">

      {/* 1. HERO SECTION (Carousel) */}
      <Hero />

      {/* 2. EXPLORE CATEGORIES */}
      <ExploreCategories />

      {/* 2. FEATURED MACHINERY & PARTS (Interactive Component) */}
      <FeaturedProducts products={products} />

      {/* 3. WHY CHOOSE iLIFT (Trust Signals) */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Why Industry Leaders Choose i-Lift</h2>
            <p className="text-slate-500 text-lg">We deliver more than just machinery. We provide the reliability and support that powers your productivity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-200">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="h-7 w-7 text-slate-600 group-hover:text-red-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reliable & Genuine</h3>
              <p className="text-slate-500 leading-relaxed">Certified industrial machinery and 100% genuine OEM spare parts guaranteed. We never compromise on quality or safety standards.</p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-200">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-7 w-7 text-slate-600 group-hover:text-red-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Rapid Response</h3>
              <p className="text-slate-500 leading-relaxed">Minimize downtime with our fast quotation turnaround and priority logistics. We understand that every minute counts in your operations.</p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-200">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                <Layers className="h-7 w-7 text-slate-600 group-hover:text-red-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Our Ecosystem</h3>
              <p className="text-slate-500 leading-relaxed">Experience full-scale visibility with our Fleet Management System, designed to sync your entire supply chain into one seamless dashboard.</p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-200">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                <Factory className="h-7 w-7 text-slate-600 group-hover:text-red-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Industrial Expertise</h3>
              <p className="text-slate-500 leading-relaxed">Deep domain knowledge in warehouse and factory requirements. Our team helps you choose the exact right equipment for your specific needs.</p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-200">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                <Wrench className="h-7 w-7 text-slate-600 group-hover:text-red-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">After-Sales Support</h3>
              <p className="text-slate-500 leading-relaxed">Dedicated maintenance guidance, installation assistance, and technical troubleshooting to ensure performance.</p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-slate-50 hover:bg-white p-8 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-slate-200">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-7 w-7 text-slate-600 group-hover:text-red-600 transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Logistics</h3>
              <p className="text-slate-500 leading-relaxed">Seamless international shipping and compliance handling. We deliver machinery to any corner of the globe efficiently.</p>
            </div>
          </div>
        </div>
      </section>


      {/* 5. HOW IT WORKS (Enquiry Process) */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How to get Quote</h2>
            <p className="text-slate-400">Simple 4-step process to get your machinery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-0.5 bg-slate-700 -z-0" />

            {[
              { title: "Browse", desc: "Search machines or parts", icon: Search },
              { title: "Add to Quote", desc: "Select items you need", icon: ShoppingCart },
              { title: "Submit", desc: "Send your requirements", icon: Send },
              { title: "We Contact", desc: "Get best price & availability", icon: Phone },
            ].map((step) => (
              <div key={step.title} className="relative z-10 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-slate-800 border-4 border-slate-900 rounded-full flex items-center justify-center mb-6">
                  <step.icon className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICE & SUPPORT (Enterprise Layout) */}
      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-wide mb-6">
                <CheckCircle2 className="h-4 w-4" /> World-Class Support
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                We Keep Your Business Moving.
              </h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                Downtime is not an option. Our dedicated support network ensures your machinery operates at peak efficiency with rapid response times and expert care.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Total Care Support", desc: "Full-time certified engineers available 24/7 for Online 360° service support.", icon: MapPin },
                  { title: "Operational Continuity Support", desc: "Continuous operational support with Maintenance Schedules and Fleet Management System.", icon: ShieldCheck },
                  { title: "Genuine Parts Guarantee", desc: "100% original spares directly from OEMs for maximum longevity.", icon: CheckCircle2 },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-red-50 group-hover:border-red-100 transition-colors">
                      <item.icon className="h-6 w-6 text-slate-400 group-hover:text-red-600 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/services">
                  <Button variant="outline" className="h-12 px-8 border-slate-200 text-slate-900 font-bold hover:bg-slate-50 hover:border-slate-300">
                    Explore Service Plans
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual (Interactive Support Card) */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-50 to-slate-50 rounded-3xl transform rotate-3 scale-[0.98] -z-10" />
              <div className="bg-slate-900 text-white p-10 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">

                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600 rounded-full blur-[80px] opacity-20 -ml-10 -mb-10 pointer-events-none" />

                <Phone className="h-12 w-12 text-red-500 mb-6" />

                <h3 className="text-2xl font-bold mb-2">Need Immediate Assistance?</h3>
                <p className="text-slate-400 mb-8">Our Technical and Commercial team is available 24/7.</p>

                <div className="flex flex-col gap-4">
                  <a href="tel:+919876543210" className="flex items-center justify-between p-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Sales & Support</span>
                        <span className="text-lg font-bold text-white group-hover:text-green-400 transition-colors"></span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
                  </a>

                  <a href="mailto:support@ilift.co.in" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email Us</span>
                        <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">support@ilift.co.in</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. PRIMARY CTA (Enterprise Grade) */}
      <section className="py-24 bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 text-white px-8 md:px-20 py-20 text-center shadow-2xl">

            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" /> {/* Optional Texture */}

            <div className="relative z-10 max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Ready to Upgrade Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">Operations?</span>
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                Get a competitive quote for premium machinery and spare parts today.
                Experience the i-Lift difference.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/enquiry">
                  <Button size="lg" className="h-14 px-10 text-lg font-bold bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-red-900/20 transition-all hover:scale-105">
                    Get a Free Quote
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold bg-transparent border-slate-700 text-white hover:bg-white/10 hover:border-white rounded-full transition-all">
                    Contact Sales
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-slate-500 pt-6">
                • Response within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Global Components */}

      <CartDrawer />

    </main>
  )
}