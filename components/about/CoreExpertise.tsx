import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Globe, Award, Zap, BarChart3, ArrowRight } from 'lucide-react';

export const CoreExpertise = () => {
    return (
        <section id="mission" className="py-24 relative overflow-hidden bg-white">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-slate-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-red-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT COLUMN: Narrative & Trust (5 cols) */}
                    <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center h-full">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit border border-red-100/50">
                            <ShieldCheck className="h-4 w-4" />
                            <span>Unmatched Quality</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
                            Premium Material <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500">Handling Solutions</span>
                        </h2>

                        <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                            <p>
                                We define what it means to be a <span className="text-slate-900 font-bold decoration-red-500/30 underline decoration-2 underline-offset-4">premium supplier</span>. Our engineering philosophy centers on resilience, precision, and longevity.
                            </p>
                            <p>
                                Specializing in high-performance <span className="text-slate-900 font-semibold">Forklifts, Pallet Trucks, and Stackers</span>, we deliver machinery that thrives in the most punishing industrial environments.
                            </p>
                            <p>
                                Our specialized <span className="text-slate-900 font-semibold">Solid Tyres</span> utilize advanced rubber compounds for puncture-proof durability and massive load-bearing capacity.
                            </p>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted By Professionals</p>
                            <div className="flex flex-wrap gap-4">
                                {['Distributors', 'Dealers', 'Rental Providers'].map((item) => (
                                    <div key={item} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 font-semibold text-sm hover:bg-white hover:shadow-md transition-all duration-300 cursor-default">
                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Feature Grid (7 cols) */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <div className="grid md:grid-cols-2 gap-6">

                            {/* Card 1: Global Reach (Dark/Premium) -> No Link, purely informational */}
                            <div className="group relative p-8 rounded-3xl bg-slate-900 text-white overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(15,23,42,0.3)] transition-all duration-300 hover:-translate-y-1 h-full min-h-[320px] flex flex-col justify-between">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <Globe className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="mt-auto">
                                        <h3 className="text-2xl font-bold mb-3">Global Reach</h3>
                                        <p className="text-slate-400 leading-relaxed text-sm">
                                            A unified digital platform connecting dealers and heavy industries across borders seamlessly.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: i-School (Brand Color/Action) -> Clickable Link */}
                            <Link href="/i-school" className="block h-full">
                                <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-red-600 to-red-700 text-white overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(220,38,38,0.3)] transition-all duration-300 hover:-translate-y-1 h-full min-h-[320px] flex flex-col justify-between cursor-pointer">
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-16 -mb-16 group-hover:bg-black/20 transition-colors duration-500" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10 mb-6 group-hover:rotate-12 transition-transform duration-300">
                                            <Award className="h-7 w-7 text-white" />
                                        </div>
                                        <div className="mt-auto">
                                            <h3 className="text-2xl font-bold mb-3">i-School</h3>
                                            <p className="text-red-100 leading-relaxed text-sm mb-6">
                                                Empowering operators with specialized training programs to maximize efficiency and safety.
                                            </p>
                                            <div className="flex items-center text-sm font-bold text-white/70 group-hover:text-white transition-colors">
                                                Start Learning <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Card 3: Genuine Spares (Clean/Technical) -> Polished White Card */}
                            <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 h-full min-h-[280px] flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-50 transition-colors duration-500" />
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <ShieldCheck className="h-7 w-7 text-blue-600" />
                                    </div>
                                    <div className="mt-auto">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">Genuine Spares</h3>
                                        <p className="text-slate-500 leading-relaxed text-sm">
                                            Guaranteed 100% genuine parts that match original factory specifications for perfect compatibility.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 4: Fleet Manager (Modern/Data) -> Polished White Card */}
                            <div className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 h-full min-h-[280px] flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-amber-50 transition-colors duration-500" />
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <BarChart3 className="h-7 w-7 text-amber-600" />
                                    </div>
                                    <div className="mt-auto">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">Fleet Manager</h3>
                                        <p className="text-slate-500 leading-relaxed text-sm">
                                            Advanced telematics and data-driven insights to optimize logistics and automate maintenance.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
