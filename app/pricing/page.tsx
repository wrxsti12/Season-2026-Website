import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { PricingHero } from '@/components/pricing/pricing-hero'
import { PricingCards } from '@/components/pricing/pricing-cards'

export const metadata = {
  title: 'Pricing | ONE2FRAME Photography',
  description: '報價方案 — Static Frame、Motion Frame、Cinematic Reels。服務桃園以北地區。',
}

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main>
        <PricingHero />
        <PricingCards />
      </main>
      <Footer />
    </>
  )
}
