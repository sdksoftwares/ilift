'use client'

import { CalendarCheck, PhoneCall, Wrench, Settings } from 'lucide-react'
import Link from 'next/link'

export default function ProductFeatures() {
    const features = [
        {
            icon: <CalendarCheck className="w-10 h-10 text-red-600 mb-2" />,
            title: "Book a Demo",
            desc: "Schedule a live demonstration to see the machine in action.",
            href: "/contact"
        },
        {
            icon: <PhoneCall className="w-10 h-10 text-red-600 mb-2" />,
            title: "Request Pricing",
            desc: "Get an instant quote tailored to your business needs.",
            href: "/enquiry"
        },
        {
            icon: <Wrench className="w-10 h-10 text-red-600 mb-2" />,
            title: "Service & Maintenance",
            desc: "Expert maintenance plans and rapid-response repair services.",
            href: "/services"
        },
        {
            icon: <Settings className="w-10 h-10 text-red-600 mb-2" />,
            title: "Browse Other Products",
            desc: "Explore our full range of industrial machinery and solutions.",
            href: "/products"
        }
    ]

    return (
        <div className="w-full bg-white py-20 border-t border-slate-100 mt-10">
            <div className="max-w-[1280px] mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {features.map((feat, idx) => (
                        <Link
                            key={idx}
                            href={feat.href}
                            className="flex flex-col items-center text-center group cursor-pointer hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className="mb-3 p-4 bg-slate-50 rounded-full group-hover:bg-red-50 transition-colors">
                                {feat.icon}
                            </div>
                            <h4 className="text-lg font-black text-slate-800 mb-2 uppercase tracking-tight group-hover:text-red-600 transition-colors">
                                {feat.title}
                            </h4>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[220px]">
                                {feat.desc}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
