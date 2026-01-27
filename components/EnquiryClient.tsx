'use client'

import { useCartStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Send, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function EnquiryClient() {
    const { items, removeItem, clearCart } = useCartStore()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Send data to our API endpoint
            const res = await fetch('/api/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user: formData,
                    items: items
                })
            })

            if (res.ok) {
                setSuccess(true)
                clearCart() // Clear the cart after success
            } else {
                alert('Failed to send enquiry. Please try again.')
            }
        } catch (error) {
            console.error(error)
            alert('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    // Success View
    if (success) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
                <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-green-100">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Quote Requested!</h1>
                    <p className="text-slate-600 mb-8">
                        Thank you, <strong>{formData.name}</strong>. Our engineering team has received your request for {items.length} items. We will contact you shortly.
                    </p>
                    <Link href="/">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12">
                            Back to Catalog
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    // Empty Cart View
    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
                <div className="text-center max-w-md">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Your Quote Cart is Empty</h1>
                    <p className="text-slate-500 mb-8">
                        Browse our catalog and add machinery to your enquiry list to get a custom quote.
                    </p>
                    <Link href="/">
                        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 text-lg">
                            Browse Machinery
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <ArrowLeft className="h-6 w-6 text-slate-600" />
                    </Link>
                    <h1 className="text-3xl font-bold text-slate-900">Finalize Request</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* LEFT: Item Summary */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-700">Selected Equipment ({items.length})</h2>
                        </div>

                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item._id} className="flex gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="h-20 w-20 relative bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                                        {item.imageUrl ? (
                                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No Image</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-slate-900 truncate">{item.name}</h3>
                                        <p className="text-sm text-slate-500 capitalize">{item.category}</p>
                                        {item.price && <p className="text-xs text-slate-400 mt-1">Ref Price: ₹{item.price}</p>}
                                    </div>
                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                        title="Remove item"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: Contact Form */}
                    <Card className="shadow-lg border-0 h-fit overflow-hidden">
                        <CardHeader className="bg-slate-900 text-white p-6">
                            <CardTitle className="flex items-center gap-2">
                                Business Details
                            </CardTitle>
                            <p className="text-slate-400 text-sm font-normal mt-1">
                                We will send a formal quotation to the email provided below.
                            </p>
                        </CardHeader>
                        <CardContent className="p-6 md:p-8">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Full Name <span className="text-red-500">*</span></label>
                                        <Input
                                            required
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-slate-50 border-slate-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Company Name</label>
                                        <Input
                                            required
                                            placeholder="Industrial Corp"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="bg-slate-50 border-slate-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Work Email <span className="text-red-500">*</span></label>
                                    <Input
                                        required
                                        type="email"
                                        placeholder="john@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-slate-50 border-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                                    <Input
                                        required
                                        type="tel"
                                        placeholder="+91 98765 00000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-slate-50 border-slate-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Additional Requirements</label>
                                    <Textarea
                                        placeholder="E.g. We need delivery to Mumbai, installation required..."
                                        className="h-32 bg-slate-50 border-slate-200 resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-14 text-lg mt-2 transition-all shadow-md hover:shadow-lg"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        <>
                                            Submit Quote Request <Send className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                                <p className="text-center text-xs text-slate-400 mt-4">
                                    By clicking submit, you agree to our privacy policy.
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </main>
    )
}
