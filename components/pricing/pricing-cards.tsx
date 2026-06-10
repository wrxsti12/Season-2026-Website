'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    id: 'static',
    name: 'Static Frame',
    subtitle: '靜態影像・風格建立方案',
    tiers: [
      { label: 'Complete 完整', price: '$2,500', note: '著重特寫，完整收藏' },
    ],
    extra: '',
    bookParam: 'static',
  },
  {
    id: 'motion',
    name: 'Motion Frame',
    subtitle: 'Rolling Shot・動態美學方案',
    tiers: [
      { label: 'Complete 完整', price: '$3,000', note: '' },
    ],
    extra: '',
    bookParam: 'motion',
  },
  {
    id: 'cinematic',
    name: 'Cinematic Reels',
    subtitle: 'Reels 短片・個人敘事影像',
    tiers: [
      { label: '1Min 短片', price: '$5,000', note: '含剪輯' },
    ],
    extra: '',
    bookParam: 'cinematic',
  },
]

export function PricingCards() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={cn(
                'relative flex flex-col p-6 md:p-8 rounded-lg border transition-all duration-300 cursor-pointer opacity-0',
                'bg-card border-border hover:border-primary/50',
                selectedPlan === plan.id && 'border-primary ring-1 ring-primary/40',
                isVisible && 'animate-fade-up'
              )}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >


              <div className="text-center mb-6 pb-6 border-b border-border">
                <h3 className="font-serif text-2xl font-medium mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-5">{plan.subtitle}</p>

                <div className="space-y-3">
                  {plan.tiers.map((tier, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-2">
                      <span className="text-sm text-muted-foreground text-left">
                        {tier.label}
                        {tier.note && <span className="text-xs ml-1 opacity-70">（{tier.note}）</span>}
                      </span>
                      <span className="font-serif text-2xl font-semibold text-foreground shrink-0">{tier.price}</span>
                    </div>
                  ))}
                </div>

                {plan.extra && (
                  <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border/50">
                    {plan.extra}
                  </p>
                )}
              </div>

              <div className="flex-1" />

              <div
                className={cn(
                  'mt-4 text-center py-3 rounded-sm text-sm uppercase tracking-widest font-medium transition-all duration-300',
                  selectedPlan === plan.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground'
                )}
              >
                {selectedPlan === plan.id ? '已選擇' : '選擇方案'}
              </div>
            </div>
          ))}
        </div>

        {/* Promotions & Policy Box */}
        <div
          className={cn(
            'max-w-2xl mx-auto bg-card border border-border rounded-lg p-6 md:p-8 opacity-0',
            isVisible && 'animate-fade-up animation-delay-400'
          )}
        >
          <h3 className="text-center font-medium text-foreground mb-5">
            🏷️ 優惠與方案說明
          </h3>

          {/* SPECIAL 2026 */}
          <div className="mb-6">
            <p className="text-primary text-sm font-medium mb-3">✨ SPECIAL 2026：</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>靜態 ／ 動態 同日拍攝 → 享 <span className="text-foreground font-medium">9 折優惠</span></span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>ONE2FRAME ACT（曾合作車友）→ 享 <span className="text-foreground font-medium">NT$200 抵用券</span></span>
              </div>
            </div>
          </div>

          <hr className="border-border mb-6" />

          {/* 靜態攝影交付說明 */}
          <div>
            <p className="text-primary text-sm font-medium mb-3">📷 靜態攝影交付說明</p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="shrink-0 mt-0.5">•</span>
                <span>基礎方案涵蓋人車與車輛之所有照片精修，完整方案則額外包含細節特寫照片</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>照片交付採非固定張數制，會依與車主溝通後的拍攝重點彈性調整</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <span>基礎方案保底 15 張，若車主對特定角度或畫面有明確想法，總數可能追加至 20–25 張</span>
              </div>
            </div>
          </div>
        </div>

        {/* Book CTA */}
        <div
          className={cn(
            'mt-10 text-center opacity-0',
            isVisible && 'animate-fade-up animation-delay-500'
          )}
        >
          <p className="text-muted-foreground text-sm mb-4">請先選擇一個方案才能預約</p>
          <Link
            href={selectedPlan ? `/contact?plan=${selectedPlan}` : '#'}
            onClick={(e) => {
              if (!selectedPlan) {
                e.preventDefault()
                const el = sectionRef.current
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className={cn(
              'inline-flex items-center justify-center px-10 py-4 font-sans text-sm uppercase tracking-widest transition-all duration-300',
              selectedPlan
                ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                : 'bg-secondary text-muted-foreground cursor-not-allowed opacity-60'
            )}
          >
            我要預約
          </Link>
        </div>
      </div>
    </section>
  )
}
