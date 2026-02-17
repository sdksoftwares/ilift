import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface RangeValue {
  min?: number
  max?: number
  unit?: string
  displayValue?: string
}

export function formatRange(val: RangeValue | number | string | undefined | null): string {
  if (val === undefined || val === null) return 'N/A'

  if (typeof val === 'object' && 'min' in val) {
    if (val.displayValue) return val.displayValue
    const unit = val.unit ? ` ${val.unit}` : ''
    if (val.min !== undefined && val.max !== undefined) {
      if (val.min === val.max) return `${val.min}${unit}`
      return `${val.min} - ${val.max}${unit}`
    }
    if (val.min !== undefined) return `${val.min}${unit}`
    if (val.max !== undefined) return `Up to ${val.max}${unit}`
    return 'N/A'
  }

  return String(val)
}
