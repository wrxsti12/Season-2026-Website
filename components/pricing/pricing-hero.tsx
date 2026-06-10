'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function PricingHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
      {/* 半透明漸層：讓全域背景圖從上方透出，下方銜接內容區塊 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-background/60 to-background" />
      
      <div className="relative container mx-auto px-6 text-center">
        <span
          className={cn(
            'inline-block text-primary uppercase tracking-[0.3em] text-sm mb-4 opacity-0',
            isLoaded && 'animate-fade-up'
          )}
        >
          服務桃園以北地區 📮
        </span>
        <h1
          className={cn(
            'font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 opacity-0',
            isLoaded && 'animate-fade-up animation-delay-100'
          )}
        >
          報價方案
        </h1>
        <p
          className={cn(
            'text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-0',
            isLoaded && 'animate-fade-up animation-delay-200'
          )}
        >
          選擇最符合你需求的方案，或聯繫我們討論客製化拍攝計畫。
        </p>
      </div>
    </section>
  )
}
