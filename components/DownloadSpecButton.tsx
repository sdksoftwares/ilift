'use client'

import { FileDown } from 'lucide-react'

interface DownloadSpecButtonProps {
    productName: string
    description: string
    specifications: Record<string, any>
    logistics?: {
        lead_time?: string
        shipping_details?: string
    }
    support?: {
        warranty_period?: string
        support_coverage?: string
    }
    variant?: 'primary' | 'ghost'
    label?: string
}

export default function DownloadSpecButton({
    productName,
    description,
    specifications,
    logistics,
    support,
    variant = 'primary',
    label = 'Download Full Spec Sheet'
}: DownloadSpecButtonProps) {

    const handleDownload = () => {
        // 1. Construct the content
        let content = `PRODUCT SPECIFICATION SHEET: ${productName.toUpperCase()}\n`
        content += `Generated on ${new Date().toLocaleDateString()}\n\n`
        content += `=================================================================\n`
        content += `1. PRODUCT DESCRIPTION\n`
        content += `=================================================================\n\n`
        content += `${description}\n\n`

        content += `=================================================================\n`
        content += `2. TECHNICAL SPECIFICATIONS\n`
        content += `=================================================================\n\n`

        if (specifications) {
            Object.entries(specifications).forEach(([key, value]) => {
                content += `${key.replace(/_/g, ' ').toUpperCase()}: ${value}\n`
            })
        } else {
            content += `Technical specifications available upon request.\n`
        }
        content += `\n`

        content += `=================================================================\n`
        content += `3. LOGISTICS & SUPPORT\n`
        content += `=================================================================\n\n`

        content += `Global Shipping:\n`
        content += `${logistics?.shipping_details || "Shipping details available upon request."}\n`
        if (logistics?.lead_time) {
            content += `Typical lead time: ${logistics.lead_time}\n`
        }
        content += `\n`

        content += `Warranty & Support:\n`
        if (support?.warranty_period) {
            content += `Warranty Period: ${support.warranty_period}\n`
        }
        content += `${support?.support_coverage || "Support coverage details available upon request."}\n`

        // 2. Create Blob and download
        const blob = new Blob([content], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${productName.replace(/\s+/g, '_')}_Spec_Sheet.txt`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const baseStyles = "inline-flex items-center justify-center px-6 py-3 font-bold uppercase tracking-wider rounded-lg transition-all"
    const variants = {
        primary: "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white",
        ghost: "border-2 border-transparent text-slate-500 hover:text-red-600 hover:bg-red-50"
    }

    return (
        <button
            onClick={handleDownload}
            className={`${baseStyles} ${variants[variant]}`}
        >
            {label}
            <FileDown className="ml-2 w-4 h-4" />
        </button>
    )
}
