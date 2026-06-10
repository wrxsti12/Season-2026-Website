'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.06 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about-section" ref={sectionRef} className="bg-transparent overflow-hidden">

      {/* ── Block 1: 個人照 + 品牌故事 ──────────────── */}
      <div className="container mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20 items-start">

          {/* Headshot */}
          <div className={cn('relative opacity-0', isVisible && 'animate-slide-in-left')}>
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src="/5.jpg"
                alt="品樺 — ONE2FRAME"
                width={560}
                height={700}
                loading="lazy"
                className="w-full h-[480px] md:h-[580px] object-cover object-top"
              />
              <div className="absolute inset-0 border border-primary/10 rounded-sm pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card/70 to-transparent pointer-events-none" />
            </div>
            <p className="mt-4 text-[10px] text-muted-foreground/35 tracking-[0.25em] uppercase text-center">
              © 2026 ONE2FRAME · NEW TAIPEI
            </p>
          </div>

          {/* 文字區 */}
          <div className="flex flex-col justify-center lg:pt-8">
            <span className={cn(
              'inline-block text-primary uppercase tracking-[0.35em] text-xs mb-6 opacity-0',
              isVisible && 'animate-fade-up'
            )}>
              About
            </span>

            <h2 className={cn(
              'font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-3 opacity-0',
              isVisible && 'animate-fade-up animation-delay-100'
            )}>
              我是品樺
            </h2>

            <p className={cn(
              'font-serif text-lg md:text-xl font-light text-primary/75 mb-8 leading-snug opacity-0',
              isVisible && 'animate-fade-up animation-delay-200'
            )}>
              一名重機攝影師，但我做的事，不只是拍照
            </p>

            <div className={cn(
              'space-y-5 leading-relaxed mb-10 opacity-0',
              isVisible && 'animate-fade-up animation-delay-300'
            )}>
              <p className="text-muted-foreground text-base">
                我正在打造自己的審美系統，從這個網站的每一個排版細節，到每一張作品的調性，再到整個預約流程的每一個環節，我都在刻意設計它應該是什麼感覺。
              </p>
              <p className="text-muted-foreground/80 text-base">
                這麼做，是希望能找到跟我審美一致的車主。
              </p>
              <p className="text-foreground/70 text-base">
                喜歡偏黑的調性，在意細節，不想要那種一眼看起來就是「拍照留念」的照片——如果這些你有感，那你找對人了。
                <span className="text-primary"> 剩下的事情都很簡單。</span>
              </p>
            </div>

            {/* Stats */}
            <div className={cn(
              'border-t border-border/40 pt-8 mb-10 opacity-0',
              isVisible && 'animate-fade-up animation-delay-400'
            )}>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                {[
                  { main: 'Since', sub: '2024', dot: true },
                  { main: 'Season', sub: '2026' },
                  { main: '100+', sub: 'Clients' },
                  { main: 'Biker Meeting', sub: '2+' },
                ].map((s, i) => (
                  <div key={i} className="flex items-baseline gap-1.5">
                    <span className="text-primary font-serif text-lg font-medium leading-none">
                      {s.main}
                    </span>
                    {s.dot && <span className="text-primary/50 text-sm">·</span>}
                    <span className="text-foreground/50 text-sm tracking-wide">{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className={cn('opacity-0', isVisible && 'animate-fade-up animation-delay-500')}>
              <Link
                href="/contact"
                className="inline-block px-9 py-3.5 border border-primary/50 text-primary font-sans text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                填寫預約表單
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Block 2: 宣言全幅 ──────────────────────── */}
      <div className={cn(
        'relative py-16 md:py-20 opacity-0',
        isVisible && 'animate-fade-in animation-delay-400'
      )}>
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
        <div className="relative container mx-auto px-6 text-center">
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white/85 leading-relaxed tracking-wide">
            如果你喜歡偏黑一點的調性
            <br />
            那我想，<span className="text-primary">你找對人了</span>
          </p>
          <div className="w-10 h-px bg-primary/40 mx-auto mt-7" />
        </div>
      </div>

      {/* ── Block 3: 電影分鏡圖片牆 ─────────────────── */}
      {/*
        4 portrait photos (all ~3:4 ratio) in a horizontal contact-sheet strip.
        Desktop: 4 columns — full cinematic spread.
        Mobile: 2 columns — clean 2×2.
        All cells: aspect-[3/4] + object-contain + bg-zinc-950 → zero cropping.
        Staggered photo-in entrance on scroll.
      */}
      <div className="grid grid-cols-3 gap-[2px]">
        {[
          {
            src: '/whysoserious.jpg',
            alt: 'Why So Serious',
            label: 'WHY SO SERIOUS',
            sub: null,
            delay: 'animation-delay-400',
          },
          {
            src: '/7.jpeg',
            alt: '',
            label: null,
            sub: null,
            delay: 'animation-delay-500',
          },
          {
            src: '/8.jpeg',
            alt: '',
            label: 'ONE2FRAME',
            sub: '2026',
            delay: 'animation-delay-600',
          },
        ].map((photo) => (
          <div
            key={photo.src}
            className={cn(
              'relative aspect-[3/4] overflow-hidden bg-zinc-950 group opacity-0',
              isVisible && `animate-photo-in ${photo.delay}`
            )}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
            />
            {photo.label && (
              <>
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3">
                  <span className="block text-white/35 text-[8px] tracking-[0.35em] uppercase font-sans leading-tight">
                    {photo.label}
                  </span>
                  {photo.sub && (
                    <span className="block text-white/20 text-[7px] tracking-[0.25em] uppercase font-sans mt-0.5">
                      {photo.sub}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

    </section>
  )
}
