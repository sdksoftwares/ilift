import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingUp, Zap } from 'lucide-react';

export const CoreValues = () => {
    const values = [
        {
            title: "Safety First",
            desc: "We never compromise on safety standards. Every machine is certified and rigorously tested.",
            icon: ShieldCheck,
            color: "text-red-600",
            bg: "bg-red-50",
            border: "border-red-100"
        },
        {
            title: "Integrity",
            desc: "Transparent pricing, honest timelines, and genuine spare parts. We build trust through clarity.",
            icon: CheckCircle2,
            color: "text-blue-600",
            bg: "bg-blue-50",
            border: "border-blue-100"
        },
        {
            title: "Innovation",
            desc: "We constantly update our inventory with the latest electric and automated lifting solutions.",
            icon: TrendingUp,
            color: "text-green-600",
            bg: "bg-green-50",
            border: "border-green-100"
        }
    ];

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-slate-500 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-slate-200 shadow-sm">
                        <Zap className="h-3.5 w-3.5 text-amber-500" />
                        <span>Our DNA</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Core Values</h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        The principles that drive our decisions, define our culture, and ensure your success.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {values.map((val, i) => (
                        <div key={i} className={`bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group hover:-translate-y-2 relative overflow-hidden`}>
                            {/* Hover Gradient Overlay */}
                            <div className={`absolute top-0 left-0 w-full h-1 ${val.bg.replace('bg-', 'bg-gradient-to-r from-transparent via-')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className={`h-16 w-16 ${val.bg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm`}>
                                <val.icon className={`h-8 w-8 ${val.color}`} />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors">{val.title}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                {val.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
