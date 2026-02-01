'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function ExploreCategories() {

    // 1. Data Config
    const MACHINERY = [
        { name: "ForkLifts", icon: "/Icons/forklift.svg", href: "/products?category=forklift" },
        { name: "Stacker", icon: "/Icons/stacker.svg", href: "/products?category=stacker" },
        { name: "Reach Truck", icon: "/Icons/reachtruck.svg", href: "/products?category=reach_truck" },
        { name: "Heavy Duty ForkLift", icon: "/Icons/heavyduty.svg", href: "/products?category=heavy_duty" },
        { name: "Pallet Truck", icon: "/Icons/pallettruck.svg", href: "/products?category=pallet_truck" },
        { name: "Solid Tyre", icon: "/Icons/solidtyre.svg", href: "/products?category=solid_tyre" },
    ]

    const SPARES = [
        { name: "Consumables", icon: "/Icons/consumables.svg", href: "/products?category=consumables" },
        { name: "Engine Parts", icon: "/Icons/engine.svg", href: "/products?category=engine_parts" },
        { name: "Hydraulic Parts", icon: "/Icons/hydraulic.svg", href: "/products?category=hydraulic_parts" },
        { name: "Electrical Parts", icon: "/Icons/electrical.svg", href: "/products?category=electrical_parts" },
        { name: "Battery", icon: "/Icons/battery.svg", href: "/products?category=battery" },
        { name: "Brake Parts", icon: "/Icons/brakes.svg", href: "/products?category=brake_parts" },
        { name: "Transmission", icon: "/Icons/transmission.svg", href: "/products?category=transmission" },
        { name: "Wheels", icon: "/Icons/wheels.svg", href: "/products?category=wheels" },
    ]

    return (
        <section className="bg-slate-50 py-20 border-b border-slate-200">
            <div className="max-w-[1440px] mx-auto px-4 lg:px-6 space-y-16">

                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        Explore Products
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Navigate our comprehensive engineering database.
                    </p>
                </div>

                {/* 1. SECTION A: MACHINERY (Hero Category) */}
                <div>
                    {/* Header with Left Border Accent */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-10 bg-red-600 rounded-sm" />
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-wide">
                            Machinery
                        </h3>
                    </div>

                    {/* Single Line Grid: 6 columns on desktop */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {MACHINERY.map((cat) => (
                            <Link
                                key={cat.name}
                                href={cat.href}
                                className="group bg-white rounded-lg border border-slate-200 shadow-sm p-4 flex flex-col items-center text-center gap-4 hover:border-red-500 transition-all duration-300 cursor-pointer min-h-[160px]"
                            >
                                {/* Grounded Icon Anchor */}
                                <div className="h-20 w-20 rounded-xl bg-slate-50 group-hover:bg-red-50 flex items-center justify-center transition-colors duration-300 p-2">
                                    <Image
                                        src={cat.icon}
                                        alt={cat.name}
                                        width={48}
                                        height={48}
                                        className="object-contain w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>

                                {/* Content - INCREASED TEXT SIZE */}
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base md:text-lg leading-tight">
                                        {cat.name}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 2. SECTION B: SPARE PARTS (Quick-Access) */}
                <div>
                    {/* Header with Left Border Accent */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-1.5 h-10 bg-slate-700 rounded-sm" />
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-wide">
                            Spare Parts
                        </h3>
                    </div>

                    {/* Single Line Grid: 8 columns on extra large screens */}
                    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
                        {SPARES.map((cat) => (
                            <Link
                                key={cat.name}
                                href={cat.href}
                                className="group flex flex-col items-center gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 text-center"
                            >
                                {/* Icon (More Compact) */}
                                <div className="h-12 w-12 flex items-center justify-center">
                                    <Image
                                        src={cat.icon}
                                        alt={cat.name}
                                        width={36}
                                        height={36}
                                        className="object-contain w-full h-full opacity-70 group-hover:opacity-100 transition-opacity"
                                    />
                                </div>

                                {/* Text Below - INCREASED TEXT SIZE */}
                                <span className="font-bold text-slate-700 group-hover:text-slate-900 transition-colors text-sm md:text-base">
                                    {cat.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
