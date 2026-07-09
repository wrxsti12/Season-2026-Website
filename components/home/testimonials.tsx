'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: '202',
    role: 'Honda CBR650R',
    image: '/Clients/202.jpg',
    quote: '藝術 就是 藝術🔥😥',
    rating: 5,
  },
  {
    id: 2,
    name: 'HDY',
    role: 'Yamaha R1',
    image: '/Clients/hdy.jpg',
    quote: '照片真的頂🔥白天再找時間弄貼文😆🤙',
    rating: 5,
  },
  {
    id: 3,
    name: 'KEN',
    role: 'Yamaha R6',
    image: '/Clients/ken.jpg',
    quote: '我一直很想幫車子拍這種 你拍的好好看！2500太便宜了草',
    rating: 5,
  },
  {
    id: 4,
    name: 'LAWA',
    role: 'BMW S1000RR',
    image: '/Clients/lawa.jpg',
    quote: '太水了啦 拍的太好看了😍❤️',
    rating: 5,
  },
  {
    id: 5,
    name: 'SHA',
    role: 'Yamaha R6',
    image: '/Clients/sha.jpg',
    quote: '愛了😍',
    rating: 5,
  },
]

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-background/55" />
      <div className="relative container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span
            className={cn(
              'inline-block text-primary uppercase tracking-[0.3em] text-sm mb-4 opacity-0',
              isVisible && 'animate-fade-up'
            )}
          >
            Testimonials
          </span>
          <h2
            className={cn(
              'font-serif text-4xl md:text-5xl lg:text-6xl font-light mb-6 opacity-0',
              isVisible && 'animate-fade-up animation-delay-100'
            )}
          >
            What Our Riders Say
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div
          className={cn(
            'relative max-w-4xl mx-auto opacity-0',
            isVisible && 'animate-fade-up animation-delay-200'
          )}
        >
          {/* Quote Icon */}
          <Quote className="absolute -top-4 left-0 w-16 h-16 text-primary/20" />

          {/* Testimonial Content */}
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  'transition-all duration-500',
                  index === currentIndex
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 absolute inset-0 translate-x-8 pointer-events-none'
                )}
              >
                <div className="text-center px-8 md:px-16">
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-8">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 text-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative w-14 h-14 shrink-0">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        sizes="56px"
                        className="rounded-full object-cover border-2 border-primary/30"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prevTestimonial}
              className="p-3 border border-border hover:border-primary hover:text-primary transition-colors rounded-full"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === currentIndex ? 'bg-primary w-6' : 'bg-border hover:bg-muted-foreground'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 border border-border hover:border-primary hover:text-primary transition-colors rounded-full"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
