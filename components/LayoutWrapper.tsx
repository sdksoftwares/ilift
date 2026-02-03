'use client'

import { usePathname } from 'next/navigation'

interface LayoutWrapperProps {
    children: React.ReactNode
    navbar: React.ReactNode
    footer: React.ReactNode
    widgets: React.ReactNode
}

export default function LayoutWrapper({
    children,
    navbar,
    footer,
    widgets
}: LayoutWrapperProps) {
    const pathname = usePathname()
    const isStudio = pathname?.startsWith('/studio')

    if (isStudio) {
        return <>{children}</>
    }

    return (
        <>
            {navbar}
            {children}
            {footer}
            {widgets}
        </>
    )
}
