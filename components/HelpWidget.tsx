'use client'

import { useState } from 'react'
import { HelpCircle, X, ExternalLink, ChevronRight, FileText, ShoppingCart, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

const HELP_LINKS = [
    { label: "View Products", href: "/products", icon: ShoppingCart, desc: "Browse our full inventory" },
    { label: "How to Order", href: "/#how-to-order", icon: FileText, desc: "Simple 4-step process" },
    { label: "Services", href: "/services", icon: Truck, desc: "Repair & maintenance" },
    { label: "Contact Us", href: "/contact", icon: ExternalLink, desc: "Get in touch directly" },
]

export default function HelpWidget() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-row items-end gap-4 pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-0 w-[300px] pointer-events-auto order-first"
                    >
                        <Card className="shadow-2xl border-0 ring-1 ring-slate-200 overflow-hidden">
                            <CardHeader className="bg-slate-900 text-white p-4 flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                                        <HelpCircle className="h-4 w-4" />
                                        Help & Support
                                    </CardTitle>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-slate-400 hover:text-white hover:bg-white/10 h-6 w-6 rounded-full"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0 bg-white">
                                <div className="flex flex-col">
                                    {HELP_LINKS.map((link, idx) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`
                        flex items-center gap-3 p-4 hover:bg-slate-50 transition-colors group
                        ${idx !== HELP_LINKS.length - 1 ? 'border-b border-slate-100' : ''}
                      `}
                                        >
                                            <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                                                <link.icon className="h-5 w-5 text-slate-500 group-hover:text-red-600" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-slate-900 group-hover:text-red-700">{link.label}</h4>
                                                <p className="text-xs text-slate-500">{link.desc}</p>
                                            </div>
                                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-red-400" />
                                        </Link>
                                    ))}
                                </div>
                                <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                                    <p className="text-xs text-slate-500">
                                        Need more help? <Link href="/contact" className="text-red-600 hover:underline font-medium">Contact Support</Link>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto h-12 w-12 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 flex items-center justify-center transition-all ring-4 ring-white shrink-0"
                aria-label="Open Help"
            >
                <HelpCircle className="h-6 w-6" />
            </motion.button>
        </div>
    )
}
