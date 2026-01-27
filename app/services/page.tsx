import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Wrench, Truck, Search, ClipboardCheck, ArrowRight,
  ShieldCheck, Clock, Settings, Phone, CheckCircle2
} from 'lucide-react'

export const metadata = {
  title: 'Industrial Services & Support | iLift',
  description: 'Expert installation, AMC, safety inspections, and spare part sourcing for heavy machinery and material handling equipment.',
  keywords: ['forklift amc', 'machinery installation', 'industrial safety inspection', 'spare part sourcing'],
  openGraph: {
    title: 'Industrial Services & Support | iLift',
    description: 'Expert technical support to keep your operations running safely and efficiently.',
    type: 'website',
  }
}

export default function ServicesIndexPage() {
  const services = [
    {
      title: "Installation & Commissioning",
      slug: "installation",
      icon: Wrench,
      description: "Expert setup for your new heavy machinery. We ensure everything is calibrated for peak performance from day one.",
      features: ["Site Readiness Check", "Calibration & Testing", "Operator Training"]
    },
    {
      title: "Preventive Maintenance (AMC)",
      slug: "amc",
      icon: ClipboardCheck,
      description: "Comprehensive maintenance contracts designed to minimize downtime and extend the lifespan of your fleet.",
      features: ["Scheduled Service", "Priority Breakdown Support", "Genuine Parts"]
    },
    {
      title: "Spare Part Sourcing",
      slug: "sourcing",
      icon: Search,
      description: "We track down hard-to-find OEM spare parts for all major brands, ensuring your equipment never stays idle.",
      features: ["Global Supplier Network", "Obsolete Part Recovery", "Fast Logistics"]
    },
    {
      title: "Safety Audits & Inspection",
      slug: "inspection",
      icon: ShieldCheck,
      description: "Rigorous health checks and safety audits to comply with industrial regulations and ensure operator safety.",
      features: ["Load Testing", "Hydraulic System Check", "Safety Certification"]
    }
  ]

  const processSteps = [
    { title: "Consultation", desc: "We analyze your fleet and operational needs." },
    { title: "Proposal", desc: "Tailored service plan with transparent pricing." },
    { title: "Execution", desc: "Certified engineers perform the required work." },
    { title: "Support", desc: "Ongoing monitoring and rapid response." }
  ]

  return (
    <main className="min-h-screen bg-slate-50">

      {/* 1. HERO SECTION */}
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-red-900/20" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wide mb-6 backdrop-blur-sm">
            <Settings className="h-3.5 w-3.5 text-red-500" /> Technical Excellence
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            We Keep Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Operations Moving.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Downtime is costly. Trust iLift for certified installation, preventive maintenance,
            and rapid spare part sourcing. We are your technical partners in productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold h-12 px-8 rounded-full">
                Schedule Service
              </Button>
            </Link>
            <Link href="#services-grid">
              <Button size="lg" variant="outline" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-12 px-8 rounded-full">
                View Capabilities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section id="services-grid" className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group bg-white p-8 lg:p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-red-100 hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                  <service.icon className="h-8 w-8 text-slate-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="h-10 w-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:border-red-100 transition-colors">
                  <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-red-600 -ml-1 group-hover:ml-0 transition-all duration-300" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-red-700 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-8 flex-1">
                {service.description}
              </p>

              {/* Sub-features */}
              <ul className="space-y-3 pt-6 border-t border-slate-50">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> {feature}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. PROCESS SECTION */}
      <section className="bg-slate-950 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">How We Work</h2>
            <p className="text-slate-400">A streamlined process to ensure your machinery performs at its best.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-slate-800 -z-10" />
                )}

                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center text-xl font-bold text-white mb-6 shadow-lg shadow-black/50 z-10">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 max-w-[200px]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-4 bg-red-50 rounded-full mb-6">
            <Phone className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Running into technical issues?</h2>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed">
            Don't let equipment failure halt your production. Our team is ready to deploy
            for on-site inspections and emergency repairs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919876543210">
              <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white h-14 px-8 text-lg rounded-xl w-full sm:w-auto">
                Call +91 98765 43210
              </Button>
            </a>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50 h-14 px-8 text-lg rounded-xl w-full sm:w-auto">
                Request Callback
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}