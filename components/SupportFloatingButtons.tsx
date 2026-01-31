'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function SupportFloatingButtons() {
    return (
        <div className="fixed bottom-[90px] right-6 z-40 flex flex-col gap-4 pointer-events-auto items-end">

            {/* WhatsApp Button */}
            <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                whileHover="hover"
                className="flex items-center gap-3 group"
            >
                <div className="bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm mr-1">
                    Chat on WhatsApp
                </div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-12 w-12 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#20bd5a] transition-colors"
                >
                    <MessageCircle className="h-6 w-6" />
                </motion.div>
            </motion.a>

            {/* Contact Button */}
            <Link href="/contact">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover="hover"
                    className="flex items-center gap-3 group"
                >
                    <div className="bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm mr-1">
                        Contact Support
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="h-12 w-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                    >
                        <Phone className="h-5 w-5" />
                    </motion.div>
                </motion.div>
            </Link>
        </div>
    )
}
