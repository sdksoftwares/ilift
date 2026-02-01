import React from 'react'

interface TechnicalIconProps {
    path: string
    viewBox?: string
    size?: number
    className?: string
}

export default function TechnicalIcon({
    path,
    viewBox = "0 0 100 100",
    size = 24,
    className = ""
}: TechnicalIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox={viewBox}
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d={path} />
        </svg>
    )
}
