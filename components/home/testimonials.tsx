'use client'

import { useEffect, useRef, useState } from 'react'
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: 'Sarah & Michael Johnson',
    role: 'Wedding Couple',
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&q=80',
    quote: 'ONE2FRAME captured our wedding day perfectly. Every photo tells a story and brings back beautiful memories. We could not have asked for a better photographer.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Emily Chen',
    role: 'Portrait Client',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    quote: 'The portrait session was incredibly comfortable and fun. The final photos exceeded all my expectations. I felt like a model throughout the entire shoot!',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Martinez',
    role: 'Corporate Client',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    quote: 'Professional, creative, and incredibly easy to work with. Our corporate headshots and brand imagery have never looked better. Highly recommend!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Jennifer & Robert Lee',
    role: 'Event Coverage',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&q=80',
    quote: 'They captured every special moment at our anniversary celebration. The attention to detail and ability to find the perfect angles was remarkable.',
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
            What Our Clients Say
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
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                    />
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
