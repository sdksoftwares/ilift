'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
    MapPin, Phone, Clock, Send, Loader2, Building2,
    Mail, MessageSquare, ChevronDown
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactForm() {
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            setSubmitted(true)
            setFormData({ name: '', email: '', phone: '', company: '', message: '' })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-slate-50 font-sans">

            {/* 1. HERO SECTION */}
            <section className="bg-slate-900 py-24 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05]" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wide mb-6 backdrop-blur-sm">
                        <MessageSquare className="h-3.5 w-3.5 text-red-500" /> We're Here to Help
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Have a question about our machinery, need a bulk quote, or require technical support?
                        Our team is ready to assist you.
                    </p>
                </div>
            </section>

            {/* 2. CONTACT INFO GRID */}
            <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid md:grid-cols-3 gap-6">

                    {/* Card 1: Sales */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                        <div className="h-14 w-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                            <Phone className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Sales Department</h3>
                        <p className="text-slate-500 text-sm mb-6">For quotes, catalog, and bulk orders</p>
                        <a href="tel:+919876543210" className="text-lg font-bold text-slate-900 hover:text-red-600 transition-colors">
                            +91 98765 43210
                        </a>
                        <a href="mailto:sales@ilift.in" className="text-sm font-medium text-slate-500 hover:text-red-600 mt-1 transition-colors">
                            sales@ilift.in
                        </a>
                    </div>

                    {/* Card 2: HQ Address */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                        <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <MapPin className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Headquarters</h3>
                        <p className="text-slate-500 text-sm mb-6">Main Office & Experience Center</p>
                        <p className="text-slate-900 font-medium max-w-[220px] leading-relaxed">
                            Lagos, Nigeria
                        </p>
                    </div>

                    {/* Card 3: Support */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                        <div className="h-14 w-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                            <Clock className="h-7 w-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Operating Hours</h3>
                        <p className="text-slate-500 text-sm mb-6">Mon - Sat (Sunday Closed)</p>
                        <p className="text-slate-900 font-bold text-lg">
                            9:00 AM - 6:00 PM
                        </p>
                        <p className="text-xs text-slate-400 mt-1 font-medium bg-slate-100 px-2 py-1 rounded">IST (Indian Standard Time)</p>
                    </div>

                </div>
            </section>

            {/* 3. FORM & MAP SECTION */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT: Contact Form */}
                    <div>
                        <div className="mb-10">
                            <h2 className="text-3xl font-bold text-slate-900">Send us a Message</h2>
                            <p className="text-slate-500 mt-3 text-lg">
                                Fill out the form below and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center"
                            >
                                <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-800 mb-3">Message Sent Successfully!</h3>
                                <p className="text-green-700 mb-8 max-w-sm mx-auto">
                                    Thank you for contacting iLift. Our team has received your inquiry and will respond correctly to your email address.
                                </p>
                                <Button
                                    onClick={() => setSubmitted(false)}
                                    variant="outline"
                                    className="bg-white border-green-200 text-green-700 hover:bg-green-100 font-semibold"
                                >
                                    Send Another Message
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Your Name</label>
                                        <Input
                                            required
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-2 focus:ring-red-600/20 focus:border-red-600 focus:bg-white transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Phone Number</label>
                                        <Input
                                            required
                                            type="tel"
                                            placeholder="+91 98765 00000"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-2 focus:ring-red-600/20 focus:border-red-600 focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Email Address</label>
                                    <Input
                                        required
                                        type="email"
                                        placeholder="john@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-2 focus:ring-red-600/20 focus:border-red-600 focus:bg-white transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Company (Optional)</label>
                                    <Input
                                        placeholder="Company Name"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="bg-slate-50 border-slate-200 h-12 rounded-xl focus:ring-2 focus:ring-red-600/20 focus:border-red-600 focus:bg-white transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Message</label>
                                    <Textarea
                                        required
                                        placeholder="Tell us about your requirements..."
                                        className="min-h-[140px] bg-slate-50 border-slate-200 rounded-xl resize-y focus:ring-2 focus:ring-red-600/20 focus:border-red-600 focus:bg-white transition-all p-4"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-1 transition-all"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* RIGHT: Visual Map Placeholder & FAQ */}
                    <div className="space-y-10">

                        {/* Map Container */}
                        <div className="bg-slate-900 w-full h-[450px] rounded-3xl relative overflow-hidden border border-slate-800 shadow-2xl group">
                            <iframe
                                width="100%"
                                height="100%"
                                title="iLift Location"
                                src="https://maps.google.com/maps?q=Lagos%2C%20Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                className="w-full h-full grayscale-[0.8] contrast-[1.1] opacity-80 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-700 ease-in-out"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                            {/* Overlay Pointer Hint (Disappears on Hover) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                                <div className="bg-slate-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700 flex items-center gap-2 text-white text-sm font-medium shadow-xl">
                                    <MapPin className="h-4 w-4 text-red-500" />
                                    Lagos, Nigeria
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <span className="text-red-600">FAQ.</span> Common Questions
                            </h3>
                            <div className="space-y-4">
                                <FAQItem
                                    question="Do you ship across India?"
                                    answer="Yes, we have logistics partners covering all major industrial hubs in India including Mumbai, Chennai, Delhi NCR, and Gujarat."
                                />
                                <FAQItem
                                    question="Do you provide installation support?"
                                    answer="Absolutely. For heavy machinery like Forklifts and Cranes, our certified engineers provide on-site installation and commissioning services."
                                />
                                <FAQItem
                                    question="How can I get a spare parts catalog?"
                                    answer="You can browse our Spare Parts section in the menu or contact our sales team directly for a specific OEM part number."
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    )
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full p-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
            >
                {question}
                <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-5 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-50">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
