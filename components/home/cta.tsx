'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CTA() {
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
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* 使用全域固定背景（1.jpg → 3.jpeg 過渡）+ 半透明遮罩 */}
      <div className="absolute inset-0 bg-background/50" />

      {/* Content */}
      <div className="relative container mx-auto px-6 text-center">
        <span
          className={cn(
            'inline-block text-primary uppercase tracking-[0.3em] text-sm mb-6 opacity-0',
            isVisible && 'animate-fade-up'
          )}
        >
          準備好了嗎
        </span>

        <h2
          className={cn(
            'font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-6 max-w-4xl mx-auto opacity-0',
            isVisible && 'animate-fade-up animation-delay-100'
          )}
        >
          讓我們一起
          <span className="block text-gradient">記錄你的風格</span>
        </h2>

        <p
          className={cn(
            'text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed opacity-0',
            isVisible && 'animate-fade-up animation-delay-200'
          )}
        >
          選擇方案，挑選日期，剩下的交給 ONE2FRAME。<br className="hidden md:block" />
          服務桃園以北地區，名額有限，歡迎提前預約。
        </p>

        <div
          className={cn(
            'flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 opacity-0',
            isVisible && 'animate-fade-up animation-delay-300'
          )}
        >
          <Link
            href="/pricing"
            className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <Calendar size={18} />
            我要預約
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border border-foreground/30 text-foreground font-sans text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Trust Badges */}
        <div
          className={cn(
            'flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-muted-foreground opacity-0',
            isVisible && 'animate-fade-up animation-delay-400'
          )}
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full" />
            服務桃園以北地區
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full" />
            靜態 ✕ 動態 ✕ 短片
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full" />
            SPECIAL 2026 優惠進行中
          </span>
        </div>
      </div>
    </section>
  )
}
