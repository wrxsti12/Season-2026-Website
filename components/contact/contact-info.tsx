'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube } from 'lucide-react'
import { cn } from '@/lib/utils'

const contactDetails = [
  {
    icon: MapPin,
    label: 'Studio Location',
    value: '123 Photography Lane\nLos Angeles, CA 90001',
    href: 'https://maps.google.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (234) 567-890',
    href: 'tel:+1234567890',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@one2frame.com',
    href: 'mailto:hello@one2frame.com',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon - Fri: 9am - 6pm\nSat: 10am - 4pm',
  },
]

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/one2frame', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/one2frame', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com/one2frame', label: 'YouTube' },
]

export function ContactInfo() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
    <div ref={sectionRef}>
      {/* Contact Details */}
      <div
        className={cn(
          'space-y-8 mb-12 opacity-0',
          isVisible && 'animate-slide-in-right'
        )}
      >
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-light mb-2">
            Contact Information
          </h2>
          <p className="text-muted-foreground">
            Reach out through any of these channels.
          </p>
        </div>

        <div className="space-y-6">
          {contactDetails.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-foreground hover:text-primary transition-colors whitespace-pre-line"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-foreground whitespace-pre-line">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div
        className={cn(
          'opacity-0',
          isVisible && 'animate-slide-in-right animation-delay-200'
        )}
      >
        <h3 className="font-medium mb-4">Follow Us</h3>
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card border border-border hover:border-primary hover:text-primary rounded-lg transition-all"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <div
        className={cn(
          'mt-12 h-64 rounded-lg overflow-hidden border border-border opacity-0',
          isVisible && 'animate-slide-in-right animation-delay-300'
        )}
      >
        <div className="w-full h-full bg-card flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Interactive map coming soon
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm hover:underline underline-offset-4 mt-2 inline-block"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>

      {/* Book Now CTA */}
      <div
        className={cn(
          'mt-12 p-6 bg-primary/10 border border-primary/30 rounded-lg opacity-0',
          isVisible && 'animate-slide-in-right animation-delay-400'
        )}
      >
        <h3 className="font-serif text-xl font-medium mb-2">
          Ready to Book?
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Skip the form and schedule your session directly.
        </p>
        <Link
          href="/booking"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest hover:bg-primary/90 transition-all"
        >
          Book Now
        </Link>
      </div>
    </div>
  )
}
