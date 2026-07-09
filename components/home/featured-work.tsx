'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// 每個方案的作品集圖片放在 public/portfolio/<plan>/ 資料夾，plan id 對應 services.tsx 的三大服務
const featuredWorks = [
  {
    id: 1,
    plan: 'static',
    title: '人車寫真',
    category: '靜態攝影',
    image: '/OGF/40.jpg',
    href: '/portfolio?category=static',
  },
  {
    id: 2,
    plan: 'motion',
    title: 'Rolling Shot',
    category: '動態攝影',
    image: '/OGF/20.jpg',
    href: '/portfolio?category=motion',
  },
  {
    id: 3,
    plan: 'cinematic',
    title: 'Reels Edit',
    category: '短片製作',
    image: '/portfolio/cinematic/01-night-chase.jpg',
    href: '/portfolio?category=cinematic',
  },
]

export function FeaturedWork() {
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
    <section ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span
              className={cn(
                'inline-block text-primary uppercase tracking-[0.3em] text-sm mb-4 opacity-0',
                isVisible && 'animate-fade-up'
              )}
            >
              Portfolio
            </span>
            <h2
              className={cn(
                'font-serif text-4xl md:text-5xl lg:text-6xl font-light opacity-0',
                isVisible && 'animate-fade-up animation-delay-100'
              )}
            >
              Featured Work
            </h2>
          </div>
          <Link
            href="/portfolio"
            className={cn(
              'group inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 opacity-0',
              isVisible && 'animate-fade-up animation-delay-200'
            )}
          >
            View All Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 三方案作品集 — 與 Our Services 相同的三欄結構 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {featuredWorks.map((work, index) => (
            <Link
              key={work.id}
              href={work.href}
              className={cn(
                'group relative overflow-hidden rounded-lg opacity-0',
                isVisible && 'animate-scale-in'
              )}
              style={{ animationDelay: `${200 + index * 150}ms` }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs uppercase tracking-wider rounded-full mb-3">
                    {work.category}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl font-medium text-foreground group-hover:text-primary transition-colors">
                    {work.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
