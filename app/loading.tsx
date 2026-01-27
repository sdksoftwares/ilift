import { Loader2 } from 'lucide-react'

export default function Loading() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50">
            <div className="relative">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />

                {/* Spinning Ring */}
                <Loader2 className="h-12 w-12 text-red-600 animate-spin" />
            </div>
            <p className="mt-4 text-slate-500 font-medium animate-pulse">
                Loading...
            </p>
        </div>
    )
}
