import { Suspense } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PortfolioHero } from '@/components/portfolio/portfolio-hero'
import { PortfolioGallery } from '@/components/portfolio/portfolio-gallery'

export const metadata = {
  title: 'Portfolio | ONE2FRAME Photography',
  description: '探索 ONE2FRAME 重機攝影作品集，靜態攝影、動態攝影、短片製作三大方案，記錄你與愛車最純粹的樣子。',
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
