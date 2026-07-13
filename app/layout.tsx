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
  metadataBase: new URL('https://season-2026-website.vercel.app'),
  title: 'ONE2FRAME | 重機攝影・靜態動態・短片製作',
  description: '桃園以北重機攝影工作室，靜態攝影、動態Rolling、短片製作三大方案，用鏡頭記錄你與愛車最純粹的樣子。',
  keywords: ['重機攝影', '機車攝影', '重機拍攝', 'Motorcycle Photography', 'Rolling Shot', '桃園攝影', '新北攝影'],
  authors: [{ name: 'ONE2FRAME' }],
  openGraph: {
    title: 'ONE2FRAME | 重機攝影・靜態動態・短片製作',
    description: '桃園以北重機攝影工作室，靜態攝影、動態Rolling、短片製作三大方案，用鏡頭記錄你與愛車最純粹的樣子。',
    type: 'website',
    locale: 'zh_TW',
    images: [{ url: '/OGF/20.jpg' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW" data-scroll-behavior="smooth" className={`${cormorantGaramond.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">
        {/* 全域固定背景 — 純黑，Services 以下背景色 */}
        <div className="fixed inset-0 -z-10 bg-black" aria-hidden="true" />

        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
