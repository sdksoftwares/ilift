'use client'

import { motion } from 'framer-motion'
import { FileText, Play, Wrench, BookOpen, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

// Dynamically import Hero3D to avoid SSR issues with Canvas
const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false })

const TRAINING_MODULES = [
    {
        title: "Forklift Series",
        description: "Complete operation manuals, safety checklists, and maintenance guides for all i-Lift forklift models.",
        icon: (
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h2l2-7h6l2 7h2v5h-2M15 13v5M19 18h2v-5h-2M5 18H3v-5h2M9 13v5M5 18a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h6m-3-7v7" />
            </svg>
        ),
        fallbackIcon: "forklift", // Just metadata for reference
        link: "/i-school/access?category=forklift"
    },
    {
        title: "Stacker Series",
        description: "Best practices for efficient stacking, battery charging protocols, and common troubleshooting.",
        icon: (
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1" />
            </svg>
        ),
        link: "/i-school/access?category=stacker"
    },
    {
        title: "Pallet Trucks",
        description: "Daily inspection guides and quick-fix tutorials to keep your pallet trucks rolling smoothly.",
        icon: (
            <svg className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16h2l1-4h8l1 4h2v3h-2M16 16v3M20 19h1.5v-3h-1.5M4 19h-1.5v-3h1.5M8 16v3M6 19a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
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
        <div className="min-h-screen bg-slate-50 font-sans">

            {/* 1. HERO SECTION */}
            <section className="relative bg-slate-900 text-white overflow-hidden py-24 lg:py-32">
                {/* 3D Background */}
                <Hero3D />

                {/* Subtle gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50 z-0 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl pt-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="inline-block py-1 px-4 rounded-full bg-slate-800/80 backdrop-blur-sm text-sky-400 text-sm font-bold tracking-[0.2em] mb-8 border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                        >
                            i-SCHOOL TRAINING FACILITY
                        </motion.span>

                        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight drop-shadow-2xl">
                            <motion.span
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="block text-white"
                            >
                                MASTER YOUR
                            </motion.span>
                            <motion.span
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-500 animate-gradient-x py-2"
                                style={{ textShadow: '0 0 30px rgba(220, 38, 38, 0.4)' }}
                            >
                                FLEET PERFORMANCE
                            </motion.span>
                        </h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                            className="text-lg md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            Immersive technical training and operational certification for the next generation of logistics professionals.
                        </motion.p>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.0, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                        >
                            <Link href="/i-school/access">
                                <Button size="lg" className="bg-red-600 hover:bg-red-500 text-white rounded-full px-10 h-14 text-lg font-bold shadow-[0_0_30px_rgba(220,38,38,0.4)] hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] transition-all transform hover:scale-105">
                                    Start Training
                                </Button>
                            </Link>
                            <Link href="#training-modules">
                                <Button size="lg" variant="outline" className="border-slate-600 bg-slate-900/50 backdrop-blur-md text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-500 rounded-full px-10 h-14 text-lg transition-all">
                                    Explore Modules
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section >

            {/* 2. ABOUT SECTION */}
            <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
                {/* Dot Pattern Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-50 z-0" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-sky-500/20 rounded-2xl blur-xl opacity-70 z-0" />
                                <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/50 shadow-2xl">
                                    <div className="space-y-8">
                                        {FEATURES.map((feature, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.2, duration: 0.5 }}
                                                className="flex gap-5 items-start group"
                                            >
                                                <div className="mt-1 h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                                                <div>
                                                    <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-red-600 transition-colors">{feature.title}</h3>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{feature.text}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                        <div className="lg:w-1/2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
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
                            </motion.div>
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
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">TRAINING LIBRARY</h2>
                            <p className="text-slate-400 text-xl font-light">Select a category to explore our extensive collection of manuals and guides.</p>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {TRAINING_MODULES.map((module, idx) => (
                            <Link key={idx} href={module.link} className="block group">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -10 }}
                                    className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-red-500/50 hover:shadow-[0_10px_40px_-10px_rgba(220,38,38,0.2)] transition-all duration-300 h-full flex flex-col relative overflow-hidden"
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
                                </motion.div>
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
