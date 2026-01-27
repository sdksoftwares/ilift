import type { Metadata } from 'next'
import EnquiryClient from '@/components/EnquiryClient'

export const metadata: Metadata = {
  title: "Request a Quote | iLift",
  description: "Submit your requirement for forklifts, stackers, or spare parts. Get a custom quotation within 24 hours.",
  keywords: ["request quote", "machinery price enquiry", "bulk order"],
  openGraph: {
    title: "Request a Quote | iLift",
    description: "Finalize your equipment selection and get a fast quotation.",
    type: 'website',
  }
}

export default function EnquiryPage() {
  return <EnquiryClient />
}