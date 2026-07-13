'use client'

import { useState, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, Check, Car, Instagram, Mail, CalendarDays, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import emailjs from '@emailjs/browser'

// ── EmailJS 設定 ───────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY     = '3DH3YZGxSTMbs0gwQ'          // ← 填入 EmailJS Public Key
const EMAILJS_SERVICE_ID     = 'service_sutp5s9'          // 主通知（寄給攝影師）
const EMAILJS_TEMPLATE_ID    = 'template_gw85rci'         // ← 填入通知 Template ID
const EMAILJS_THANKS_SERVICE  = 'service_hymhlfm'         // 感謝信（寄給客戶）
const EMAILJS_THANKS_TEMPLATE = 'template_k0bj3t8' // ← 填入感謝信 Template ID
// ──────────────────────────────────────────────────────────────

const planInfo: Record<string, { name: string; type: string }> = {
  static:    { name: 'Static Frame',    type: '靜態攝影' },
  motion:    { name: 'Motion Frame',    type: '動態攝影' },
  cinematic: { name: 'Cinematic Reels', type: '短片製作' },
}

const planLabels: Record<string, string> = Object.fromEntries(
  Object.entries(planInfo).map(([k, v]) => [k, v.name])
)

// EmailJS 透過 Gmail API 轉寄時，非 ASCII 字元（中文等）在轉寄過程中會被誤判編碼而變亂碼。
// 將中文內容轉成 HTML 數字字元實體，繞過轉寄端的編碼問題，信件範本會正確還原成中文字。
function escapeForEmailBody(str: string): string {
  return Array.from(str)
    .map((ch) => {
      const code = ch.codePointAt(0)!
      return code > 127 ? `&#${code};` : ch
    })
    .join('')
}

const timeSlots = [
  '上午場　08:00 – 12:00',
  '下午場　13:00 – 17:00',
  '傍晚場　17:00 – 20:00',
]

const DAYS_ZH  = ['日', '一', '二', '三', '四', '五', '六']
const MONTHS   = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']

function getMinBookingDate(): Date {
  const d = new Date()
  d.setDate(d.getDate() + 4)
  d.setHours(0, 0, 0, 0)
  return d
}

function isSelectable(date: Date): boolean {
  if (date < getMinBookingDate()) return false // 至少 4 天後
  return true
}

export function ContactForm() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan') || ''

  const [formData, setFormData] = useState({
    carModel: '',
    igName:   '',
    email:    '',
  })
  const [plan,          setPlan]          = useState(planParam)
  const [selectedDate,  setSelectedDate]  = useState<Date | null>(null)
  const [selectedTime,  setSelectedTime]  = useState('')
  const [currentMonth,  setCurrentMonth]  = useState(new Date().getMonth())
  const [currentYear,   setCurrentYear]   = useState(new Date().getFullYear())
  const [isSubmitting,  setIsSubmitting]  = useState(false)
  const [isSubmitted,   setIsSubmitted]   = useState(false)
  const [error,         setError]         = useState('')

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth     = new Date(currentYear, currentMonth + 1, 0).getDate()

  const prevMonth = useCallback(() => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }, [currentMonth])

  const nextMonth = useCallback(() => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }, [currentMonth])

  const handleDateSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    if (isSelectable(date)) setSelectedDate(date)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!plan || !selectedDate || !selectedTime) {
      setError('請填寫所有必填欄位')
      return
    }
    setIsSubmitting(true)
    setError('')

    const dateStr = selectedDate.toLocaleDateString('zh-TW', {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
    })
    const info = planInfo[plan] || { name: plan, type: plan }
    const planDisplay = `${info.name} · ${info.type}`
    const fullTime    = `${dateStr}　${selectedTime}`

    const templateParams = {
      // 郵件標頭用途（收件人／回覆地址）— 保持原始 ASCII，不做實體編碼
      to_email:    formData.email,
      email:       formData.email,
      name:        'ONE2FRAME',
      user_email:  formData.email,
      user_ig:     formData.igName,

      // 信件內文顯示用途 — 轉成 HTML 數字實體，避免轉寄時中文變亂碼
      user_name:       escapeForEmailBody(formData.carModel),
      shoot_type:      escapeForEmailBody(info.type),
      shoot_plan:      escapeForEmailBody(info.name),
      plan_display:    escapeForEmailBody(planDisplay),
      shoot_date:      escapeForEmailBody(dateStr),
      shoot_clock:     escapeForEmailBody(selectedTime),
      shoot_full_time: escapeForEmailBody(fullTime),
    }

    try {
      // 主通知信（寄給攝影師）為關鍵信件，失敗才視為預約失敗
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      setIsSubmitted(true)

      // 感謝信（寄給車主）為非關鍵信件，背景寄送、失敗不影響預約成功畫面
      emailjs.send(EMAILJS_THANKS_SERVICE, EMAILJS_THANKS_TEMPLATE, templateParams, EMAILJS_PUBLIC_KEY)
        .catch((err) => console.error('感謝信寄送失敗:', err))
    } catch {
      setError('送出失敗，請稍後再試。')
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Success State ──────────────────────────────────────────
  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto bg-card border border-border rounded-lg p-8 md:p-12 text-center animate-scale-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
          <Check className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-serif text-2xl font-light mb-3">預約已確認</h3>
        <p className="text-muted-foreground text-sm mb-2">
          感謝你選擇 ONE2FRAME，你的專屬拍攝已經排入我們的行程。
        </p>
        <p className="text-muted-foreground text-sm mb-6">我們將於 24 小時內與你聯繫，確認拍攝細節。</p>
        <div className="text-left p-4 bg-secondary/50 border border-border rounded-lg text-sm space-y-1 text-muted-foreground mb-6">
          <p><span className="text-foreground">方案：</span>{planLabels[plan] || plan}</p>
          <p><span className="text-foreground">日期：</span>{selectedDate?.toLocaleDateString('zh-TW', { year:'numeric', month:'long', day:'numeric', weekday:'long' })}</p>
          <p><span className="text-foreground">時段：</span>{selectedTime}</p>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false)
            setFormData({ carModel: '', igName: '', email: '' })
            setSelectedDate(null)
            setSelectedTime('')
            setPlan('')
          }}
          className="text-primary hover:underline underline-offset-4 text-sm"
        >
          再次預約
        </button>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      {plan && (
        <p className="text-center text-sm text-muted-foreground mb-2 tracking-wide">
          你選擇的方案：<span className="text-primary font-medium">{planLabels[plan] || plan}</span>
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl font-light text-center mb-8">立即預約拍攝</h2>

      <form onSubmit={handleSubmit}>
        <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-4">

          {/* 車款名稱 */}
          <div>
            <div className="relative">
              <Car size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                value={formData.carModel}
                onChange={(e) => setFormData({ ...formData, carModel: e.target.value })}
                placeholder="請輸入您的車款名稱"
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
          </div>

          {/* IG 名稱 */}
          <div>
            <div className="relative">
              <Instagram size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                value={formData.igName}
                onChange={(e) => setFormData({ ...formData, igName: e.target.value })}
                placeholder="請輸入 IG 名稱"
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="請輸入 常用Email（每季優惠通知）"
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
          </div>

          {/* 方案顯示 */}
          <div>
            <div className="px-4 py-3 bg-background border border-border rounded-lg text-sm text-muted-foreground">
              {plan
                ? <span>【方案】<span className="text-foreground">{planLabels[plan] || plan}</span></span>
                : <select
                    required
                    value={plan}
                    onChange={(e) => setPlan(e.target.value)}
                    className="w-full bg-transparent focus:outline-none"
                  >
                    <option value="" disabled>請選擇方案</option>
                    {Object.entries(planLabels).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
              }
            </div>
          </div>

          {/* 服務類型 */}
          {plan && (
            <div>
              <div className="px-4 py-3 bg-background border border-border rounded-lg text-sm text-foreground">
                {planInfo[plan]?.type || plan}
              </div>
            </div>
          )}

          {/* 拍攝日期 — 自製日曆（只開放六日，至少 4 天後） */}
          <div>
            <div className="bg-background border border-border rounded-lg p-2.5 sm:p-4">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-3">
                <button type="button" onClick={prevMonth} className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <span className="text-sm font-medium flex items-center gap-2">
                  <CalendarDays size={14} className="text-primary" />
                  {currentYear} 年 {MONTHS[currentMonth]}
                </span>
                <button type="button" onClick={nextMonth} className="p-1.5 hover:bg-secondary rounded-lg transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-1">
                {DAYS_ZH.map((d, i) => (
                  <div key={d} className={cn('text-center text-xs py-1', i === 0 || i === 6 ? 'text-primary' : 'text-muted-foreground')}>
                    {d}
                  </div>
                ))}
              </div>

              {/* Day cells */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const date = new Date(currentYear, currentMonth, day)
                  const selectable = isSelectable(date)
                  const isSelected = selectedDate?.getDate() === day &&
                                     selectedDate?.getMonth() === currentMonth &&
                                     selectedDate?.getFullYear() === currentYear
                  const isWeekend  = date.getDay() === 0 || date.getDay() === 6

                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => handleDateSelect(day)}
                      disabled={!selectable}
                      className={cn(
                        'h-10 flex items-center justify-center text-sm rounded-md transition-all',
                        isSelected
                          ? 'bg-primary text-primary-foreground font-medium'
                          : selectable
                          ? isWeekend
                            ? 'text-primary hover:bg-primary/20 font-medium'
                            : 'text-foreground hover:bg-secondary'
                          : 'text-muted-foreground/30 cursor-not-allowed'
                      )}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>

              <p className="text-xs text-muted-foreground text-center mt-3 pt-3 border-t border-border">
                須提前 4 天以上預約
              </p>
            </div>

            {selectedDate && (
              <p className="text-xs text-primary mt-2 text-center">
                已選：{selectedDate.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
              </p>
            )}
          </div>

          {/* 拍攝時段 */}
          <div>
            <select
              required
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-sm appearance-none cursor-pointer"
            >
              <option value="" disabled>
                請選擇拍攝時段
              </option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-4 bg-primary text-primary-foreground font-sans text-sm uppercase tracking-widest hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                送出中...
              </>
            ) : (
              <>
                <Clock size={16} />
                提交預約
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
