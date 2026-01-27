import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import HelpWidget from '@/components/HelpWidget'
import SupportFloatingButtons from '@/components/SupportFloatingButtons'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "i-lift",
  description: "Industrial Lifting Equipment Marketplace",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<div className="h-20 bg-white" />}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
        <HelpWidget />
        <SupportFloatingButtons />
      </body>
    </html>
  );
}
