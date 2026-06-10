'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { X, ChevronLeft, ChevronRight, Camera, Video, Grid, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/utils'

type Category = 'all' | 'static' | 'dynamic'

const categories = [
  { id: 'all' as const, label: 'All Work', icon: Grid },
  { id: 'static' as const, label: '靜態攝影', icon: Camera },
  { id: 'dynamic' as const, label: '動態攝影', icon: Video },
]

const portfolioItems = [
  // 靜態攝影
  { id: 1, category: 'static', title: 'Static Frame Vol.1', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80', aspectRatio: 'tall' },
  { id: 2, category: 'static', title: 'Static Frame Vol.2', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', aspectRatio: 'square' },
  { id: 3, category: 'static', title: 'Static Frame Vol.3', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', aspectRatio: 'wide' },
  { id: 4, category: 'static', title: 'Static Frame Vol.4', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', aspectRatio: 'square' },
  { id: 5, category: 'static', title: 'Static Frame Vol.5', image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80', aspectRatio: 'tall' },
  { id: 6, category: 'static', title: 'Static Frame Vol.6', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', aspectRatio: 'tall' },
  { id: 7, category: 'static', title: 'Static Frame Vol.7', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', aspectRatio: 'square' },
  { id: 8, category: 'static', title: 'Static Frame Vol.8', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80', aspectRatio: 'wide' },
  { id: 9, category: 'static', title: 'Static Frame Vol.9', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', aspectRatio: 'square' },
  { id: 10, category: 'static', title: 'Static Frame Vol.10', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80', aspectRatio: 'wide' },

  // 動態攝影
  { id: 11, category: 'dynamic', title: 'Motion Rolling Vol.1', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', aspectRatio: 'wide' },
  { id: 12, category: 'dynamic', title: 'Motion Rolling Vol.2', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80', aspectRatio: 'square' },
  { id: 13, category: 'dynamic', title: 'Motion Rolling Vol.3', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80', aspectRatio: 'tall' },
  { id: 14, category: 'dynamic', title: 'Cinematic Reels Vol.1', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80', aspectRatio: 'wide' },
  { id: 15, category: 'dynamic', title: 'Cinematic Reels Vol.2', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80', aspectRatio: 'square' },
  { id: 16, category: 'dynamic', title: 'Cinematic Reels Vol.3', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80', aspectRatio: 'tall' },
  { id: 17, category: 'dynamic', title: 'Motion Rolling Vol.4', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', aspectRatio: 'square' },
  { id: 18, category: 'dynamic', title: 'Motion Rolling Vol.5', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', aspectRatio: 'wide' },
  { id: 19, category: 'dynamic', title: 'Cinematic Reels Vol.4', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80', aspectRatio: 'square' },
  { id: 20, category: 'dynamic', title: 'Cinematic Reels Vol.5', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', aspectRatio: 'wide' },
]

export function PortfolioGallery() {
  const searchParams = useSearchParams()
  const initialCategory = (searchParams.get('category') as Category) || 'all'

  const [activeCategory, setActiveCategory] = useState<Category>(initialCategory)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)

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

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (selectedImage === null) return
    if (e.key === 'Escape') {
      setSelectedImage(null)
    } else if (e.key === 'ArrowLeft') {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage)
      if (currentIndex > 0) setSelectedImage(filteredItems[currentIndex - 1].id)
    } else if (e.key === 'ArrowRight') {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedImage)
      if (currentIndex < filteredItems.length - 1) setSelectedImage(filteredItems[currentIndex + 1].id)
    }
  }, [selectedImage, filteredItems])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    document.body.style.overflow = selectedImage !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedImage])

  const selectedItem = portfolioItems.find(item => item.id === selectedImage)
  const currentIndex = filteredItems.findIndex(item => item.id === selectedImage)

  return (
    <>
      <section ref={sectionRef} className="py-8 md:py-16 bg-background">
        <div className="container mx-auto px-6">
          {/* Filters & View Toggle */}
          <div
            className={cn(
              'flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 md:mb-12 opacity-0',
              isVisible && 'animate-fade-up'
            )}
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300',
                    activeCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
                  )}
                >
                  <category.icon size={14} />
                  {category.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('masonry')}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'masonry' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground'
                )}
                aria-label="Masonry view"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground hover:text-foreground'
                )}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div
            className={cn(
              viewMode === 'masonry'
                ? 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            )}
          >
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setSelectedImage(item.id)}
                className={cn(
                  'group relative overflow-hidden rounded-lg w-full text-left opacity-0',
                  viewMode === 'masonry' ? 'break-inside-avoid' : '',
                  isVisible && 'animate-scale-in'
                )}
                style={{ animationDelay: `${(index % 8) * 50}ms` }}
              >
                <div className={cn('relative overflow-hidden', viewMode === 'grid' && 'aspect-square')}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={cn(
                      'w-full object-cover transition-transform duration-700 group-hover:scale-110',
                      viewMode === 'masonry' && (
                        item.aspectRatio === 'tall' ? 'h-[400px]' :
                        item.aspectRatio === 'wide' ? 'h-[250px]' :
                        'h-[300px]'
                      ),
                      viewMode === 'grid' && 'h-full'
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs uppercase tracking-wider rounded mb-2">
                      {item.category === 'static' ? '靜態攝影' : '動態攝影'}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-foreground">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 text-muted-foreground hover:text-foreground transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              if (currentIndex > 0) setSelectedImage(filteredItems[currentIndex - 1].id)
            }}
            disabled={currentIndex === 0}
            className={cn(
              'absolute left-4 md:left-8 p-3 text-muted-foreground hover:text-foreground transition-colors z-10',
              currentIndex === 0 && 'opacity-30 cursor-not-allowed'
            )}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              if (currentIndex < filteredItems.length - 1) setSelectedImage(filteredItems[currentIndex + 1].id)
            }}
            disabled={currentIndex === filteredItems.length - 1}
            className={cn(
              'absolute right-4 md:right-8 p-3 text-muted-foreground hover:text-foreground transition-colors z-10',
              currentIndex === filteredItems.length - 1 && 'opacity-30 cursor-not-allowed'
            )}
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          <div className="max-w-6xl max-h-[85vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs uppercase tracking-wider rounded-full mb-2">
                {selectedItem.category === 'static' ? '靜態攝影' : '動態攝影'}
              </span>
              <h3 className="font-serif text-xl font-medium text-foreground">{selectedItem.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{currentIndex + 1} of {filteredItems.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
