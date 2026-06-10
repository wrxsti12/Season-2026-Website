'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Camera, Video, Film, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: Camera,
    title: 'Static Frame',
    subtitle: '靜態攝影',
    description: '靜態影像・風格建立方案。基礎人車紀念到完整細節特寫，用影像定格你與愛車最純粹的樣子。',
    image: '/2.jpg',
    href: '/pricing',
    plan: 'static',
  },
  {
    icon: Video,
    title: 'Motion Frame',
    subtitle: '動態攝影',
    description: 'Rolling Shot・動態美學方案。騎行中最帥的瞬間，用動態影像捕捉速度與激情的美感。',
    image: '/3.jpg',
    href: '/pricing',
    plan: 'motion',
  },
  {
    icon: Film,
    title: 'Cinematic Reels',
    subtitle: '短片製作',
    description: 'Reels 短片・個人敘事影像。騎行加遙鏡，打造屬於你與愛車的專屬電影感短片。',
    image: '/4.jpg',
    href: '/pricing',
    plan: 'cinematic',
  },
]

export function Services() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span
            className={cn(
              'inline-block text-primary uppercase tracking-[0.3em] text-sm mb-5 opacity-0',
              isVisible && 'animate-fade-up'
            )}
          >
            服務項目
          </span>
          <h2
            className={cn(
              'font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-5 opacity-0',
              isVisible && 'animate-fade-up animation-delay-100'
            )}
          >
            Our Services
          </h2>
          {/* 金線展開 */}
          <div
            className={cn(
              'w-12 h-px bg-primary/60 mx-auto mb-6 origin-center scale-x-0',
              isVisible && 'transition-transform duration-700 delay-200 scale-x-100'
            )}
          />
          <p
            className={cn(
              'text-muted-foreground text-lg leading-relaxed opacity-0',
              isVisible && 'animate-fade-up animation-delay-300'
            )}
          >
            靜態・動態・短片，三種方案滿足不同需求。每一格畫面都是你與愛車的故事。
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className={cn(
                'group relative overflow-hidden rounded-lg bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 opacity-0',
                isVisible && 'animate-card-in'
              )}
              style={{ animationDelay: `${300 + index * 180}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${service.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6 md:p-8 -mt-16">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20 shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-0.5 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-primary/70 text-xs uppercase tracking-widest mb-2">{service.subtitle}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <span className="inline-flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    立即預約
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className={cn(
            'text-center mt-16 opacity-0',
            isVisible && 'animate-fade-up animation-delay-700'
          )}
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300"
          >
            查看完整報價方案
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
