'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const featuredWorks = [
  {
    id: 1,
    title: 'A Love Story in Tuscany',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    href: '/portfolio/tuscany-wedding',
  },
  {
    id: 2,
    title: 'Urban Fashion Portrait',
    category: 'Portrait',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
    href: '/portfolio/urban-fashion',
  },
  {
    id: 3,
    title: 'Tech Summit 2025',
    category: 'Event',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    href: '/portfolio/tech-summit',
  },
  {
    id: 4,
    title: 'Luxury Brand Campaign',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    href: '/portfolio/luxury-brand',
  },
  {
    id: 5,
    title: 'Intimate Garden Wedding',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    href: '/portfolio/garden-wedding',
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

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Featured Image */}
          <Link
            href={featuredWorks[0].href}
            className={cn(
              'group relative overflow-hidden rounded-lg md:col-span-2 md:row-span-2 opacity-0',
              isVisible && 'animate-scale-in animation-delay-200'
            )}
          >
            <div className="relative h-[400px] md:h-full min-h-[500px]">
              <img
                src={featuredWorks[0].image}
                alt={featuredWorks[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs uppercase tracking-wider rounded-full mb-3">
                  {featuredWorks[0].category}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-foreground group-hover:text-primary transition-colors">
                  {featuredWorks[0].title}
                </h3>
              </div>
            </div>
          </Link>

          {/* Smaller Images */}
          {featuredWorks.slice(1).map((work, index) => (
            <Link
              key={work.id}
              href={work.href}
              className={cn(
                'group relative overflow-hidden rounded-lg opacity-0',
                isVisible && 'animate-scale-in'
              )}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="relative h-64">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs uppercase tracking-wider rounded-full mb-2">
                    {work.category}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
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
