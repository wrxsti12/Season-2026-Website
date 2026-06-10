'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  {
    question: 'What is included in the editing process?',
    answer: 'All photos undergo professional editing including color correction, exposure adjustment, and basic retouching. Premium packages include advanced skin retouching, background enhancement, and creative color grading. We ensure every image meets our high-quality standards.',
  },
  {
    question: 'How long until I receive my photos?',
    answer: 'Standard delivery is 2-4 weeks for portrait sessions and 4-6 weeks for weddings. We offer rush delivery options for an additional fee. You\'ll receive a sneak peek of 10-15 images within 48 hours of your session.',
  },
  {
    question: 'Do you travel for destination shoots?',
    answer: 'Yes! We love destination work. Travel fees are calculated based on distance and duration. For international shoots, we typically charge airfare, accommodation, and a per diem. Contact us for a custom quote for your destination.',
  },
  {
    question: 'What is your payment and cancellation policy?',
    answer: 'We require a 30% deposit to secure your date, with the remaining balance due 14 days before the event. Cancellations made 30+ days in advance receive a full refund minus the deposit. We highly recommend date change insurance for weddings.',
  },
  {
    question: 'Can I print my photos anywhere?',
    answer: 'Absolutely! All packages include a print release that allows you to print your photos at any lab of your choice. We also partner with premium print labs and can arrange professional prints, albums, and wall art at competitive prices.',
  },
  {
    question: 'Do you offer video services?',
    answer: 'Yes, we offer both photography and videography services. Our combined packages provide significant savings. Video packages include highlight reels, full ceremony footage, and optional drone coverage. Check our pricing page for video add-ons.',
  },
  {
    question: 'What happens if it rains on my wedding day?',
    answer: 'Don\'t worry! We\'ve shot countless weddings in various weather conditions and always come prepared with backup plans. Rainy photos can actually be incredibly romantic and unique. We\'ll work with you and your venue to ensure beautiful results.',
  },
  {
    question: 'How do I prepare for my session?',
    answer: 'We\'ll send you a detailed preparation guide after booking. This includes tips on clothing choices, skincare, and what to expect on the day. For weddings, we recommend a timeline consultation 4-6 weeks before your date.',
  },
]

export function PricingFAQ() {
  const [isVisible, setIsVisible] = useState(false)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span
              className={cn(
                'inline-block text-primary uppercase tracking-[0.3em] text-sm mb-4 opacity-0',
                isVisible && 'animate-fade-up'
              )}
            >
              FAQ
            </span>
            <h2
              className={cn(
                'font-serif text-3xl md:text-4xl font-light opacity-0',
                isVisible && 'animate-fade-up animation-delay-100'
              )}
            >
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Items */}
          <div
            className={cn(
              'space-y-4 opacity-0',
              isVisible && 'animate-fade-up animation-delay-200'
            )}
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-background hover:bg-secondary/50 transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300',
                      openIndex === index && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-all duration-300',
                    openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="p-5 pt-0 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
