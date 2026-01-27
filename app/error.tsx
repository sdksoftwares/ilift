'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-6 text-center">

            <div className="bg-red-50 p-6 rounded-full mb-6">
                <AlertTriangle className="h-16 w-16 text-red-600" />
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Something went wrong!</h2>

            <p className="text-slate-500 max-w-md mb-8">
                We encountered an unexpected error while processing your request.
                Our engineering team has been notified.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    onClick={reset}
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white gap-2 h-12"
                >
                    <RefreshCcw className="h-4 w-4" /> Try Again
                </Button>

                <Link href="/">
                    <Button size="lg" variant="outline" className="gap-2 h-12 border-slate-300">
                        <Home className="h-4 w-4" /> Return Home
                    </Button>
                </Link>
            </div>

            {error.digest && (
                <p className="mt-8 text-xs text-slate-400 font-mono">
                    Error ID: {error.digest}
                </p>
            )}
        </div>
    )
}
