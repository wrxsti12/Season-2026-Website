import { Suspense } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PortfolioHero } from '@/components/portfolio/portfolio-hero'
import { PortfolioGallery } from '@/components/portfolio/portfolio-gallery'

export const metadata = {
  title: 'Portfolio | ONE2FRAME Photography',
  description: 'Explore our photography portfolio featuring weddings, portraits, events, and commercial work. See our best shots and get inspired for your next session.',
}

export default function PortfolioPage() {
  return (
    <>
      <Navigation />
      <main>
        <PortfolioHero />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <PortfolioGallery />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
