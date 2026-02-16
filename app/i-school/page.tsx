'use client'

import { Play, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import NextImage from 'next/image'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

// Dynamically import Hero3D to avoid SSR issues with Canvas
const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false })

const TRAINING_MODULES = [
    {
        title: "Forklifts",
        description: "Complete operation manuals, safety checklists, and maintenance guides for all i-Lift forklift models.",
        icon: (
            <NextImage
                src="/Icons/forklift.svg"
                alt="Forklift"
                width={24}
                height={24}
                className="w-full h-full object-contain invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
        ),
        link: "/i-school/access?category=forklift"
    },
    {
        title: "Reach Trucks",
        description: "Specialized training for high-reach operations, stability control, and aisle maneuvering.",
        icon: (
            <NextImage
                src="/Icons/reachtruck.svg"
                alt="Reach Truck"
                width={24}
                height={24}
                className="w-full h-full object-contain invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
        ),
        link: "/i-school/access?category=reach_truck"
    },
    {
        title: "Stackers",
        description: "Best practices for efficient stacking, battery charging protocols, and common troubleshooting.",
        icon: (
            <NextImage
                src="/Icons/stacker.svg"
                alt="Stacker"
                width={24}
                height={24}
                className="w-full h-full object-contain invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
        ),
        link: "/i-school/access?category=stacker"
    },
    {
        title: "Heavy Duty",
        description: "Advanced safety protocols for handling heavy loads and operating high-capacity machinery.",
        icon: (
            <NextImage
                src="/Icons/heavyduty.svg"
                alt="Heavy Duty"
                width={24}
                height={24}
                className="w-full h-full object-contain invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
        ),
        link: "/i-school/access?category=heavy_duty"
    },
    {
        title: "Pallet Trucks",
        description: "Daily inspection guides and quick-fix tutorials to keep your pallet trucks rolling smoothly.",
        icon: (
            <NextImage
                src="/Icons/pallettruck.svg"
                alt="Pallet Truck"
                width={24}
                height={24}
                className="w-full h-full object-contain invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
        ),
        link: "/i-school/access?category=pallet_truck"
    },
    {
        title: "Video Tutorials",
        description: "Visual step-by-step guides for operation and basic repairs. Watch and learn from our experts.",
        icon: <Play className="h-6 w-6 text-red-600" />,
        link: "/i-school/access?category=video"
    }
]

const FEATURES = [
    {
        title: "Maximize Lifespan",
        text: "Proper usage and maintenance can extend your equipment's life by years."
    },
    {
        title: "Reduce Errors",
        text: "Well-trained operators make fewer mistakes, reducing damage and accidents."
    },
    {
        title: "Official Resources",
        text: "Get information directly from the manufacturer, ensuring accuracy and safety."
    }
]

export default function ISchoolPage() {
    return (
        <div className="min-h-screen bg-slate-950 font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative bg-[#020617] text-white overflow-hidden py-24 lg:py-32">
                {/* 3D Background - Removed */}
                <Hero3D />

                {/* ANIMATED BACKGROUND ELEMENTS (CSS Only - Zero Lag) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Deep Blue Aurora (Top Left) */}
                    <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />

                    {/* Safety Orange Glow (Bottom Right) */}
                    <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[60%] bg-[#FF4D00]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

                    {/* Central Depth Vingette */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] z-10" />
                </div>

                {/* TECH GRID OVERLAY */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none z-10" />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] z-10 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl pt-10">
                    <div>
                        <span
                            className="inline-block py-1 px-4 rounded-full bg-[#1e1b4b]/80 backdrop-blur-sm border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.3)] mb-8"
                        >
                            <span className="text-sky-400 font-bold tracking-[0.2em] text-sm drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
                                i-SCHOOL TRAINING FACILITY
                            </span>
                        </span>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight drop-shadow-2xl">
                            <span
                                className="block bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent pb-2"
                            >
                                MASTER YOUR
                            </span>
                            <span
                                className="block bg-gradient-to-r from-[#FF4D00] to-[#FF8000] bg-clip-text text-transparent py-2 font-mono tracking-widest uppercase"
                            >
                                FLEET PERFORMANCE
                            </span>
                        </h1>

                        <p
                            className="text-lg md:text-2xl text-[#E2E8F0] mb-12 max-w-2xl mx-auto leading-relaxed font-light"
                        >
                            Immersive technical training and operational certification for the next generation of logistics professionals.
                        </p>

                        <div
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                        >
                            <Link href="/i-school/access">
                                <Button size="lg" className="bg-gradient-to-r from-[#FF4D00] to-[#FF8000] hover:brightness-110 text-white rounded-full px-8 h-14 text-lg font-bold shadow-lg shadow-orange-500/20 transition-all border-0 flex items-center gap-2">
                                    Start Training <Zap className="h-5 w-5 fill-current" />
                                </Button>
                            </Link>
                            <Link href="#training-modules">
                                <Button size="lg" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/30 rounded-full px-8 h-14 text-lg transition-all flex items-center gap-2">
                                    Explore Modules <ArrowRight className="h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section >

            {/* 2. ABOUT SECTION */}
            <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
                {/* Dot Pattern Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-50 z-0" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-sky-500/20 rounded-2xl blur-xl opacity-70 z-0" />
                                <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/50 shadow-2xl">
                                    <div className="space-y-8">
                                        {FEATURES.map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className="flex gap-5 items-start group"
                                            >
                                                <div className="mt-1 h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                                                <div>
                                                    <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-red-600 transition-colors">{feature.title}</h3>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{feature.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 space-y-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
                                    WHY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500">i-SCHOOL</span>?
                                </h2>
                                <p className="text-slate-600 text-xl leading-relaxed mb-6 font-light">
                                    At i-Lift, we believe that providing the best equipment is just the start. <strong className="font-semibold text-slate-800">Empowering your team</strong> with the knowledge to operate and maintain that equipment safely and efficiently is key to your success.
                                </p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    i-School offers a centralized library of official i-Lift resources, from quick-start guides to deep-dive repair tutorials, ensuring your operations never miss a beat.
                                </p>
                                <Link href="/contact" className="inline-flex items-center text-red-600 font-bold hover:text-red-700 hover:underline mt-4 group text-lg">
                                    Request Custom Training <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. TRAINING MODULES */}
            <section id="training-modules" className="py-24 bg-slate-900 relative overflow-hidden">
                {/* Subtle Background Elements */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50" />
                <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">TRAINING LIBRARY</h2>
                            <p className="text-slate-400 text-xl font-light">Select a category to explore our extensive collection of manuals and guides.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {TRAINING_MODULES.map((module, idx) => (
                            <Link key={idx} href={module.link} className="block group">
                                <div
                                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-red-500/50 transition-all duration-300 h-full flex flex-col relative overflow-hidden"
                                >
                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-transparent transition-all duration-500" />

                                    <div className="h-14 w-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-8 group-hover:border-red-500/50 group-hover:bg-red-900/10 transition-colors duration-300 relative z-10">
                                        <div className="text-slate-300 group-hover:text-red-500 transition-colors duration-300 transform group-hover:scale-110">
                                            {module.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-red-400 transition-colors relative z-10">
                                        {module.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow relative z-10">
                                        {module.description}
                                    </p>

                                    <div className="flex items-center text-sm font-bold text-slate-500 group-hover:text-white transition-colors mt-auto relative z-10">
                                        View Resources <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CTA */}
            < section className="py-24 bg-white border-t border-slate-200" >
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to empower your team?</h2>
                    <p className="text-slate-600 text-lg mb-8">
                        Access the full i-School library today or contact us for on-site training opportunities.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/i-school/access">
                            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-12">
                                Access Library
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline" className="border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full px-8 h-12">
                                Contact Support
                            </Button>
                        </Link>
                    </div>
                </div>
            </section >

        </div >
    )
}
