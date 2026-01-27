'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function SupportFloatingButtons() {
    return (
        <div className="fixed bottom-[90px] right-6 z-40 flex flex-col gap-3 pointer-events-auto items-center w-12">
            {/* WhatsApp Button */}
            <motion.a
                href="https://wa.me/919876543210" // Replace with actual number
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="h-12 w-12 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#20bd5a] transition-colors"
                title="Chat on WhatsApp"
            >
                <MessageCircle className="h-6 w-6" />
            </motion.a>

            {/* Contact Button */}
            <Link href="/contact">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-12 w-12 bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-700 transition-colors"
                    title="Contact Support"
                >
                    <Phone className="h-5 w-5" />
                </motion.div>
            </Link>
        </div>
    )
}
