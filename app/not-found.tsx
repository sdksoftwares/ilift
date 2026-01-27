import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4 text-center">

            {/* Visual Icon */}
            <div className="bg-white p-6 rounded-full shadow-sm mb-6 border border-slate-100">
                <div className="bg-red-50 p-6 rounded-full">
                    <Search className="h-16 w-16 text-red-600" />
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Page Not Found
            </h1>

            <p className="text-lg text-slate-500 max-w-md mb-8">
                We couldn't locate the machinery or page you were looking for. It might have been moved or doesn't exist.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                    <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white gap-2 h-12">
                        <Home className="h-4 w-4" /> Go to Homepage
                    </Button>
                </Link>
                <Link href="/products">
                    <Button size="lg" variant="outline" className="border-slate-300 gap-2 h-12">
                        <ArrowLeft className="h-4 w-4" /> View Catalog
                    </Button>
                </Link>
            </div>

        </div>
    )
}
