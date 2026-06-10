'use client'

import { useEffect, useState } from 'react'
import { Calendar, Clock, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { icon: Calendar, label: 'Choose Date' },
  { icon: Clock, label: 'Select Time' },
  { icon: CheckCircle2, label: 'Confirm' },
]

export function BookingHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card to-background" />
      
      <div className="relative container mx-auto px-6 text-center">
        <span
          className={cn(
            'inline-block text-primary uppercase tracking-[0.3em] text-sm mb-4 opacity-0',
            isLoaded && 'animate-fade-up'
          )}
        >
          Schedule Your Session
        </span>
        <h1
          className={cn(
            'font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 opacity-0',
            isLoaded && 'animate-fade-up animation-delay-100'
          )}
        >
          Book Your Session
        </h1>
        <p
          className={cn(
            'text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 opacity-0',
            isLoaded && 'animate-fade-up animation-delay-200'
          )}
        >
          Select your preferred date and time, and we&apos;ll create magic together.
          Our booking process is simple and secure.
        </p>

        {/* Progress Steps */}
        <div
          className={cn(
            'flex items-center justify-center gap-4 md:gap-8 opacity-0',
            isLoaded && 'animate-fade-up animation-delay-300'
          )}
        >
          {steps.map((step, index) => (
            <div key={step.label} className="flex items-center gap-4 md:gap-8">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs md:text-sm text-muted-foreground">{step.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-8 md:w-16 h-px bg-border -mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
