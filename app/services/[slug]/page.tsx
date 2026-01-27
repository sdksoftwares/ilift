import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Wrench, Truck, Search, ClipboardCheck,
  CheckCircle2, ArrowRight, Phone
} from 'lucide-react'

// --- SERVICE DATA KNOWLEDGE BASE ---
const SERVICES_DATA: Record<string, any> = {
  "installation": {
    title: "Professional Installation Support",
    subtitle: "Expert setup and commissioning for heavy machinery.",
    icon: Wrench,
    description: "Proper installation is critical for the longevity and safety of industrial equipment. Our certified engineers ensure your forklifts, stackers, and cranes are set up according to OEM specifications, calibrated for performance, and compliant with safety standards.",
    features: [
      "On-site assembly and commissioning",
      "Load testing and safety verification",
      "Operator training during handover",
      "Site readiness assessment"
    ],
    ctaText: "Schedule Installation"
  },
  "amc": {
    title: "Maintenance & AMC",
    subtitle: "Prevent downtime with Annual Maintenance Contracts.",
    icon: ClipboardCheck,
    description: "Unexpected breakdowns cost time and money. Our comprehensive AMC packages provide scheduled preventive maintenance to keep your fleet running smoothly. We identify wear and tear early to prevent major failures.",
    features: [
      "Scheduled preventive maintenance visits",
      "Priority breakdown support",
      "Discounted spare parts",
      "Detailed health reports for every machine"
    ],
    ctaText: "Get AMC Quote"
  },
  "sourcing": {
    title: "Part Sourcing Service",
    subtitle: "Hard-to-find parts delivered to your doorstep.",
    icon: Search,
    description: "Struggling to find a specific part for an older machine? Our global supply chain network allows us to source genuine OEM and high-quality aftermarket parts for almost any material handling brand.",
    features: [
      "Global network of OEM suppliers",
      "Cross-referencing for compatible alternatives",
      "Express air-freight options",
      "Verification of part authenticity"
    ],
    ctaText: "Find My Part"
  },
  "inspection": {
    title: "On-site Safety Inspection",
    subtitle: "Certified audits for compliance and safety.",
    icon: Truck,
    description: "Ensure your warehouse is safe and compliant. Our inspectors visit your facility to conduct rigorous safety audits on your lifting equipment, identifying potential risks and certifying machines that meet safety standards.",
    features: [
      "Load chain and hydraulic testing",
      "Structural integrity checks",
      "Safety certification issuance",
      "Compliance reporting for auditors"
    ],
    ctaText: "Book Inspection"
  }
}

import type { Metadata } from 'next'

// Next.js 15: params is a Promise
interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES_DATA[slug]

  if (!service) {
    return {
      title: 'Service Not Found | iLift',
    }
  }

  return {
    title: `${service.title} | iLift Services`,
    description: service.subtitle || service.description.substring(0, 160),
    openGraph: {
      title: service.title,
      description: service.subtitle,
    }
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const service = SERVICES_DATA[slug]

  if (!service) {
    notFound() // Returns 404 if slug doesn't exist
  }

  const Icon = service.icon

  return (
    <main className="min-h-screen bg-slate-50">

      {/* 1. HERO SECTION */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -mr-20 -mt-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-16 w-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-900/50">
              <Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2 font-medium">
                <Link href="/services" className="hover:text-white transition-colors">Services</Link>
                <span>/</span>
                <span className="text-white capitalize">{slug.replace('-', ' ')}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold">{service.title}</h1>
              <p className="text-xl text-slate-300 mt-4 max-w-2xl">
                {service.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">

        {/* Left Column: Description */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Overview</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              {service.description}
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">What's Included?</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {service.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: CTA Box */}
        <div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 sticky top-24">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Interested in this service?</h3>
            <p className="text-slate-500 text-sm mb-6">
              Our service team typically responds within 4 hours.
            </p>

            <div className="space-y-3">
              <Link href="/enquiry">
                <Button className="w-full bg-red-600 hover:bg-red-700 h-12 text-lg">
                  {service.ctaText}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full border-slate-200 h-12">
                  <Phone className="mr-2 h-4 w-4" /> Contact Support
                </Button>
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <h4 className="font-semibold text-sm text-slate-900 mb-3">Why choose iLift Services?</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5" />Certified Engineers</li>
                <li className="flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5" />Genuine Parts Guarantee</li>
                <li className="flex gap-2"><div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5" />Pan-India Coverage</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}