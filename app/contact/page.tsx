import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: "Contact Us | iLift - Get a Quote",
  description: "Contact iLift for industrial lifting equipment queries, bulk orders, and technical support. Located in Okhla, New Delhi.",
  keywords: ["contact ilift", "customer support", "forklift sales inquiry", "delhi machinery supplier"],
  openGraph: {
    title: "Contact iLift | Industrial Machinery Support",
    description: "Get in touch with our sales and support team closest to you.",
    type: 'website',
  }
}

export default function ContactPage() {
  return <ContactForm />
}