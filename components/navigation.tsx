'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Book Now' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToServices = () => {
    setIsMobileMenuOpen(false)
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  const bookNowClass = (mobile = false) =>
    cn(
      'font-sans text-sm uppercase tracking-widest transition-all duration-300',
      mobile
        ? 'block text-center mt-2 px-5 py-3 bg-primary text-primary-foreground rounded-sm'
        : 'px-5 py-2.5 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90'
    )

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50 py-4'
          : 'bg-transparent py-6'
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-serif text-2xl md:text-3xl font-semibold tracking-wider text-foreground group-hover:text-primary transition-colors">
            ONE<span className="text-primary">2</span>FRAME
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isBookNow = link.href === '/pricing'

            if (isBookNow) {
              return (
                <li key={link.href}>
                  {isHome ? (
                    // Homepage → scroll to Our Services
                    <button onClick={scrollToServices} className={bookNowClass()}>
                      {link.label}
                    </button>
                  ) : (
                    // Other pages → go to /pricing
                    <Link href="/pricing" className={bookNowClass()}>
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'relative font-sans text-sm uppercase tracking-widest transition-colors duration-300',
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground/80 hover:text-primary'
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md border-b border-border/50 transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <ul className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isBookNow = link.href === '/pricing'

            if (isBookNow) {
              return (
                <li key={link.href}>
                  {isHome ? (
                    <button onClick={scrollToServices} className={bookNowClass(true)}>
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href="/pricing"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={bookNowClass(true)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              )
            }

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block py-2 font-sans text-sm uppercase tracking-widest transition-colors',
                    pathname === link.href
                      ? 'text-primary'
                      : 'text-foreground/80 hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
