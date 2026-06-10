'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function BackgroundManager() {
  const pathname = usePathname()

  useEffect(() => {
    const layer2 = document.getElementById('bg-layer-2') as HTMLDivElement | null
    if (!layer2) return

    if (pathname !== '/') {
      layer2.style.opacity = '0'
      return
    }

    const aboutEl = document.getElementById('about-section')
    if (!aboutEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          // About section has fully scrolled off the top — switch to 3.jpeg
          layer2.style.opacity = '1'
        } else {
          // Back to 1.jpg
          layer2.style.opacity = '0'
        }
      },
      { threshold: 0 }
    )

    observer.observe(aboutEl)
    return () => observer.disconnect()
  }, [pathname])

  return null
}
