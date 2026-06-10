import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/home/hero'
import { Services } from '@/components/home/services'
import { About } from '@/components/home/about'
import { FeaturedWork } from '@/components/home/featured-work'
import { Testimonials } from '@/components/home/testimonials'
import { CTA } from '@/components/home/cta'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <About />
        <FeaturedWork />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
