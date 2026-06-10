import { Suspense } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ContactHero } from '@/components/contact/contact-hero'
import { ContactForm } from '@/components/contact/contact-form'

export const metadata = {
  title: 'Book Now | ONE2FRAME Photography',
  description: '立即預約 ONE2FRAME 拍攝服務。選擇方案、挑選日期，完成預約。',
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContactHero />
        <div className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-6">
            <Suspense fallback={<div className="min-h-[60vh] bg-background" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
