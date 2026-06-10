'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MessageSquare, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PricingCTA() {
  const [isVisible, setIsVisible] = useState(false)
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div
          className={cn(
            'max-w-4xl mx-auto text-center opacity-0',
            isVisible && 'animate-fade-up'
          )}
        >
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            We&apos;re here to help you make the best decision for your needs. 
            Schedule a free consultation or give us a call.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
            >
              <MessageSquare size={18} />
              Get in Touch
            </Link>
            <a
              href="tel:+1234567890"
              className="flex items-center gap-3 px-8 py-4 border border-border text-foreground font-sans text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300"
            >
              <Phone size={18} />
              +1 (234) 567-890
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
