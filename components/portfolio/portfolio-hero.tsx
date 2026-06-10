'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function PortfolioHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
      
      <div className="relative container mx-auto px-6 text-center">
        <span
          className={cn(
            'inline-block text-primary uppercase tracking-[0.3em] text-sm mb-4 opacity-0',
            isLoaded && 'animate-fade-up'
          )}
        >
          Our Work
        </span>
        <h1
          className={cn(
            'font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 opacity-0',
            isLoaded && 'animate-fade-up animation-delay-100'
          )}
        >
          Portfolio
        </h1>
        <p
          className={cn(
            'text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-0',
            isLoaded && 'animate-fade-up animation-delay-200'
          )}
        >
          A curated collection of our finest work. Each image tells a unique story, 
          captured with passion and artistic vision.
        </p>
      </div>
    </section>
  )
}
