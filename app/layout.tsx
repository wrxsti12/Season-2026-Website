import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Image from 'next/image'
import './globals.css'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ONE2FRAME | Professional Photography & Videography',
  description: 'Capturing your precious moments with artistic vision. Professional photography and videography services for weddings, portraits, events, and commercial projects.',
  keywords: ['photography', 'videography', 'wedding photography', 'portrait', 'events', 'professional photographer'],
  authors: [{ name: 'ONE2FRAME' }],
  openGraph: {
    title: 'ONE2FRAME | Professional Photography & Videography',
    description: 'Capturing your precious moments with artistic vision.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${cormorantGaramond.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">
        {/* 全域固定背景 — 純黑，Services 以下背景色 */}
        <div className="fixed inset-0 -z-10 bg-black" aria-hidden="true" />

        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
