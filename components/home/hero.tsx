'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
      {/* 英雄專屬背景 — 3.jpeg 景深模糊，只在此區顯示 */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/3.jpeg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          style={{ filter: 'blur(8px)', transform: 'scale(1.08)' }}
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* 上方輕壓、中段透出、下方漸黑過渡到 1.jpg 全域背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/75 pointer-events-none" />

      {/* 文字內容 */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">

        <h1
          className={cn(
            'font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.18em] text-white mb-4 opacity-0',
            isLoaded && 'animate-fade-up'
          )}
          style={{ textShadow: '0 2px 32px rgba(0,0,0,0.5)' }}
        >
          ONE<span className="text-primary">2</span>FRAME
        </h1>

        <p
          className={cn(
            'text-white/60 text-xs md:text-sm tracking-[0.6em] uppercase mb-10 opacity-0',
            isLoaded && 'animate-fade-up animation-delay-200'
          )}
        >
          攝 影 預 約 表 單
        </p>

        <div
          className={cn(
            'w-16 h-px bg-primary/70 mb-8 opacity-0',
            isLoaded && 'animate-fade-in animation-delay-300'
          )}
        />

        <div
          className={cn(
            'space-y-2 mb-10 opacity-0',
            isLoaded && 'animate-fade-up animation-delay-400'
          )}
        >
          <p className="text-white/40 text-xs tracking-[0.35em] uppercase mb-3">ONE2FRAME</p>
          <p className="text-white/90 text-sm md:text-base leading-relaxed">
            來自於「One to Frame」的概念
          </p>
          <p className="text-white/65 text-sm md:text-base leading-relaxed">
            代表一個人走向創作者的旅程。
          </p>
        </div>

        {/* CTA → 滾動到 Our Services 讓使用者選擇方案 */}
        <div
          className={cn(
            'opacity-0',
            isLoaded && 'animate-fade-up animation-delay-500'
          )}
        >
          <button
            onClick={scrollToServices}
            className="inline-block px-10 py-3.5 border border-white/35 text-white/85 font-sans text-sm tracking-[0.2em] hover:border-primary hover:text-primary transition-all duration-300 backdrop-blur-sm bg-white/5 cursor-pointer"
          >
            立 即 預 約
          </button>
        </div>

        <a
          href="#services"
          onClick={scrollToServices}
          className={cn(
            'absolute bottom-10 flex flex-col items-center gap-2 text-white/30 hover:text-primary transition-colors opacity-0',
            isLoaded && 'animate-fade-in animation-delay-600'
          )}
        >
          <ArrowDown size={18} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
