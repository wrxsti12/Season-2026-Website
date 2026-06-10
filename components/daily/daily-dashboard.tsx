'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { format } from 'date-fns'
import {
  Plus, Trash2, ChevronDown, ChevronRight,
  Sun, Moon, Save, CheckCircle2, Circle,
  AlertCircle, Calendar, Clock, RefreshCw, Loader2,
  BookOpen, RotateCcw,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type Status = '完成' | '進行中' | '未開始' | '規劃中' | '等待中'

type Habit = { id: string; name: string; status: Status }
type UrgentTask = { id: string; name: string; status: Status }
type WeekendGoal = { id: string; goal: string; status: Status; notice: string; date: string }
type FeedbackEntry = { id: string; title: string; type: string; collapsed: boolean; content?: string }

// ─── Status Badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  '完成':  'bg-emerald-50 text-emerald-700 border-emerald-200',
  '進行中':'bg-blue-50 text-blue-700 border-blue-200',
  '未開始':'bg-gray-100 text-gray-500 border-gray-200',
  '規劃中':'bg-purple-50 text-purple-700 border-purple-200',
  '等待中':'bg-amber-50 text-amber-700 border-amber-200',
}

function StatusBadge({ status, onClick }: { status: Status; onClick?: () => void }) {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border tracking-wide whitespace-nowrap
        ${STATUS_STYLES[status] ?? 'bg-gray-100 text-gray-500 border-gray-200'}
        ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
    >
      {status}
    </span>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function todayLabel() {
  const now = new Date()
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  return `${months[now.getMonth()]} ${now.getDate()}, ${String(now.getFullYear()).slice(2)}`
}

function nextStatus(s: Status, opts: Status[]): Status {
  const i = opts.indexOf(s)
  return opts[(i + 1) % opts.length]
}

// ─── Section Heading ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-gray-400 mb-2 px-1">
      {children}
    </p>
  )
}

// ─── Divider ─────────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-px bg-gray-100 my-4" />
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DailyDashboard() {
  const today = new Date()
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT']
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const dateStr = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`

  const [time, setTime] = useState(format(today, 'HH:mm'))
  const [reportType, setReportType] = useState<'晨報' | '晚報'>(() =>
    today.getHours() < 14 ? '晨報' : '晚報'
  )
  const [todayReport, setTodayReport] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // data
  const [habits, setHabits] = useState<Habit[]>([])
  const [urgent, setUrgent] = useState<UrgentTask[]>([])
  const [goals, setGoals] = useState<WeekendGoal[]>([])
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([])

  // loading
  const [loadingHabits, setLoadingHabits] = useState(true)
  const [loadingUrgent, setLoadingUrgent] = useState(true)
  const [loadingGoals, setLoadingGoals] = useState(true)
  const [loadingFeedback, setLoadingFeedback] = useState(true)
  const [notionReady, setNotionReady] = useState(true)

  // add-new inputs
  const [newHabit, setNewHabit] = useState('')
  const [newUrgent, setNewUrgent] = useState('')
  const [newGoal, setNewGoal] = useState({ goal: '', notice: '', date: '' })
  const [showAddGoal, setShowAddGoal] = useState(false)

  // Clock
  useEffect(() => {
    const t = setInterval(() => setTime(format(new Date(), 'HH:mm')), 30000)
    return () => clearInterval(t)
  }, [])

  // ── Fetch helpers ──────────────────────────────────────────────────────────

  async function fetchWithTimeout(url: string, ms = 10000) {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), ms)
    try {
      const r = await fetch(url, { signal: ctrl.signal })
      clearTimeout(t)
      return r
    } catch (e) {
      clearTimeout(t)
      throw e
    }
  }

  const fetchHabits = useCallback(async () => {
    setLoadingHabits(true)
    try {
      const r = await fetchWithTimeout('/api/notion/habits')
      if (!r.ok) throw new Error()
      setHabits(await r.json())
    } catch {
      setNotionReady(false)
    } finally {
      setLoadingHabits(false)
    }
  }, [])

  const fetchUrgent = useCallback(async () => {
    setLoadingUrgent(true)
    try {
      const r = await fetchWithTimeout('/api/notion/urgent')
      if (!r.ok) throw new Error()
      setUrgent(await r.json())
    } catch {
      setNotionReady(false)
    } finally {
      setLoadingUrgent(false)
    }
  }, [])

  const fetchGoals = useCallback(async () => {
    setLoadingGoals(true)
    try {
      const r = await fetchWithTimeout('/api/notion/goals')
      if (!r.ok) throw new Error()
      setGoals(await r.json())
    } catch {
      setNotionReady(false)
    } finally {
      setLoadingGoals(false)
    }
  }, [])

  const fetchFeedback = useCallback(async () => {
    setLoadingFeedback(true)
    try {
      const r = await fetchWithTimeout('/api/notion/feedback', 15000)
      if (!r.ok) throw new Error()
      setFeedback(await r.json())
    } catch {
      setNotionReady(false)
    } finally {
      setLoadingFeedback(false)
    }
  }, [])

  useEffect(() => {
    fetchHabits()
    fetchUrgent()
    fetchGoals()
    fetchFeedback()
  }, [fetchHabits, fetchUrgent, fetchGoals, fetchFeedback])

  // ── Actions ────────────────────────────────────────────────────────────────

  async function toggleHabit(h: Habit) {
    const next = nextStatus(h.status, ['進行中', '完成', '未開始'])
    setHabits(prev => prev.map(x => x.id === h.id ? { ...x, status: next } : x))
    await fetch('/api/notion/habits', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: h.id, status: next }),
    })
  }

  async function addHabit() {
    if (!newHabit.trim()) return
    const r = await fetch('/api/notion/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newHabit.trim() }),
    })
    const { id } = await r.json()
    setHabits(prev => [...prev, { id, name: newHabit.trim(), status: '進行中' }])
    setNewHabit('')
  }

  async function deleteHabit(id: string) {
    setHabits(prev => prev.filter(x => x.id !== id))
    await fetch('/api/notion/habits', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
  }

  async function toggleUrgent(u: UrgentTask) {
    const next = nextStatus(u.status, ['進行中', '完成', '未開始'])
    setUrgent(prev => prev.map(x => x.id === u.id ? { ...x, status: next } : x))
    await fetch('/api/notion/urgent', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: u.id, status: next }),
    })
  }

  async function addUrgent() {
    if (!newUrgent.trim()) return
    const r = await fetch('/api/notion/urgent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newUrgent.trim() }),
    })
    const { id } = await r.json()
    setUrgent(prev => [...prev, { id, name: newUrgent.trim(), status: '進行中' }])
    setNewUrgent('')
  }

  async function deleteUrgent(id: string) {
    setUrgent(prev => prev.filter(x => x.id !== id))
    await fetch('/api/notion/urgent', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
  }

  async function toggleGoal(g: WeekendGoal) {
    const next = nextStatus(g.status, ['進行中', '完成', '規劃中', '等待中'])
    setGoals(prev => prev.map(x => x.id === g.id ? { ...x, status: next } : x))
    await fetch('/api/notion/goals', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: g.id, status: next }),
    })
  }

  async function addGoal() {
    if (!newGoal.goal.trim()) return
    const r = await fetch('/api/notion/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal),
    })
    const { id } = await r.json()
    setGoals(prev => [...prev, { id, goal: newGoal.goal.trim(), status: '進行中', notice: newGoal.notice, date: newGoal.date }])
    setNewGoal({ goal: '', notice: '', date: '' })
    setShowAddGoal(false)
  }

  async function deleteGoal(id: string) {
    setGoals(prev => prev.filter(x => x.id !== id))
    await fetch('/api/notion/goals', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
  }

  async function saveReport() {
    if (!todayReport.trim() || saving) return
    setSaving(true)
    try {
      await fetch('/api/notion/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dateLabel: todayLabel(),
          reportType,
          content: todayReport,
        }),
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      await fetchFeedback()
    } finally {
      setSaving(false)
    }
  }

  async function toggleFeedback(entry: FeedbackEntry) {
    if (!entry.collapsed) {
      setFeedback(prev => prev.map(x => x.id === entry.id ? { ...x, collapsed: true } : x))
      return
    }
    if (entry.content !== undefined) {
      setFeedback(prev => prev.map(x => x.id === entry.id ? { ...x, collapsed: false } : x))
      return
    }
    setFeedback(prev => prev.map(x => x.id === entry.id ? { ...x, collapsed: false, content: '' } : x))
    try {
      const r = await fetch(`/api/notion/feedback/${entry.id}`)
      const { content } = await r.json()
      setFeedback(prev => prev.map(x => x.id === entry.id ? { ...x, content } : x))
    } catch {}
  }

  const doneHabits = habits.filter(h => h.status === '完成').length
  const isNotionConfigured = notionReady

  // ── Skeleton ──────────────────────────────────────────────────────────────

  function Skeleton({ lines = 3 }: { lines?: number }) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-8 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  // ── Input Row ─────────────────────────────────────────────────────────────

  function AddRow({ value, onChange, onAdd, placeholder }: {
    value: string; onChange: (v: string) => void; onAdd: () => void; placeholder: string
  }) {
    return (
      <div className="flex items-center gap-1.5 mt-2">
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onAdd()}
          placeholder={placeholder}
          className="flex-1 text-xs px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-gray-400 focus:bg-white placeholder:text-gray-300 text-gray-700 transition-colors"
        />
        <button
          onClick={onAdd}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        >
          <Plus size={13} className="text-gray-500" />
        </button>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-medium text-gray-400 tracking-widest uppercase">{days[today.getDay()]}</span>
              <h1 className="text-base font-semibold text-gray-900 tracking-tight">{dateStr}</h1>
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <Clock size={12} />
            <span className="text-xs font-mono">{time}</span>
          </div>
          {/* Notion status */}
          {!isNotionConfigured && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
              Notion 未連線
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Habit progress */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <CheckCircle2 size={13} className="text-emerald-500" />
            <span className="font-medium">{doneHabits}<span className="text-gray-300 mx-0.5">/</span>{habits.length}</span>
            <span className="text-gray-400">習慣</span>
          </div>

          {/* Report type */}
          <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs">
            <button
              onClick={() => setReportType('晨報')}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                reportType === '晨報'
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Sun size={11} />晨報
            </button>
            <button
              onClick={() => setReportType('晚報')}
              className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors ${
                reportType === '晚報'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >
              <Moon size={11} />晚報
            </button>
          </div>

          {/* Refresh */}
          <button
            onClick={() => { fetchHabits(); fetchUrgent(); fetchGoals(); fetchFeedback() }}
            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            title="重新整理 Notion 資料"
          >
            <RefreshCw size={13} className="text-gray-400" />
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="grid grid-cols-[280px_1fr] min-h-[calc(100vh-53px)]">

        {/* ── LEFT PANEL ── */}
        <aside className="border-r border-gray-100 bg-gray-50/50 overflow-y-auto p-4 space-y-1">

          {/* 要事第一 */}
          <SectionLabel>要事第一</SectionLabel>
          {loadingHabits ? <Skeleton /> : (
            <ul className="space-y-1">
              {habits.map(h => (
                <li key={h.id} className="group flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white transition-colors">
                  <button onClick={() => toggleHabit(h)} className="flex-shrink-0">
                    {h.status === '完成'
                      ? <CheckCircle2 size={15} className="text-emerald-500" />
                      : <Circle size={15} className="text-gray-300" />
                    }
                  </button>
                  <span className={`flex-1 text-sm leading-snug ${h.status === '完成' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {h.name}
                  </span>
                  <StatusBadge status={h.status} onClick={() => toggleHabit(h)} />
                  <button
                    onClick={() => deleteHabit(h.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} className="text-gray-300 hover:text-red-400" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <AddRow
            value={newHabit}
            onChange={setNewHabit}
            onAdd={addHabit}
            placeholder="新增要事..."
          />

          <Divider />

          {/* 急迫事件 */}
          <SectionLabel>急迫事件</SectionLabel>
          {loadingUrgent ? <Skeleton /> : (
            <ul className="space-y-1">
              {urgent.map(u => (
                <li key={u.id} className="group flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-gray-100">
                  <AlertCircle size={13} className={u.status === '完成' ? 'text-gray-300' : 'text-red-400'} />
                  <span className={`flex-1 text-sm leading-snug ${u.status === '完成' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {u.name}
                  </span>
                  <StatusBadge status={u.status} onClick={() => toggleUrgent(u)} />
                  <button
                    onClick={() => deleteUrgent(u.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={12} className="text-gray-300 hover:text-red-400" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <AddRow
            value={newUrgent}
            onChange={setNewUrgent}
            onAdd={addUrgent}
            placeholder="新增急迫事件..."
          />
        </aside>

        {/* ── RIGHT PANEL ── */}
        <div className="flex flex-col overflow-hidden">

          {/* Morning Report */}
          <section className="flex-1 flex flex-col p-6 border-b border-gray-100" style={{ maxHeight: '52vh' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-gray-400" />
                <span className="text-sm font-semibold text-gray-700 tracking-wide">
                  {todayLabel()} &nbsp;<span className="text-gray-300">|</span>&nbsp; {reportType}
                </span>
              </div>
              <button
                onClick={saveReport}
                disabled={saving || !todayReport.trim()}
                className={`flex items-center gap-1.5 text-xs px-4 py-1.5 rounded-lg font-medium transition-all
                  ${saved
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-900 text-white hover:bg-gray-700 disabled:bg-gray-100 disabled:text-gray-400'
                  }`}
              >
                {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                {saved ? '已存入 Notion' : saving ? '儲存中...' : '存入 Notion'}
              </button>
            </div>
            <textarea
              value={todayReport}
              onChange={e => setTodayReport(e.target.value)}
              placeholder={`今天的${reportType}從這裡開始...`}
              className="flex-1 w-full resize-none outline-none text-sm leading-relaxed text-gray-700 placeholder:text-gray-300 bg-transparent"
            />
          </section>

          {/* Weekend Goals */}
          <section className="overflow-y-auto p-6" style={{ maxHeight: '48vh' }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar size={13} className="text-gray-400" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400">Weekend Goal</span>
              </div>
              <button
                onClick={() => setShowAddGoal(s => !s)}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-700 transition-colors"
              >
                <Plus size={12} />新增目標
              </button>
            </div>

            {showAddGoal && (
              <div className="mb-4 flex flex-wrap gap-2 p-3 rounded-xl border border-gray-200 bg-gray-50">
                <input value={newGoal.goal} onChange={e => setNewGoal(p => ({ ...p, goal: e.target.value }))}
                  placeholder="目標名稱" className="flex-1 min-w-[140px] text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-gray-400 placeholder:text-gray-300" />
                <input value={newGoal.notice} onChange={e => setNewGoal(p => ({ ...p, notice: e.target.value }))}
                  placeholder="提醒 (MON 9:00)" className="w-36 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-gray-400 placeholder:text-gray-300" />
                <input value={newGoal.date} onChange={e => setNewGoal(p => ({ ...p, date: e.target.value }))}
                  placeholder="日期 (2026-05-10)" type="date" className="w-36 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white outline-none focus:border-gray-400 text-gray-600" />
                <button onClick={addGoal}
                  className="px-4 py-1.5 rounded-lg text-xs font-medium bg-gray-900 text-white hover:bg-gray-700 transition-colors">
                  新增
                </button>
              </div>
            )}

            {loadingGoals ? <Skeleton lines={5} /> : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-[10px] text-gray-400 uppercase tracking-widest">
                    <th className="text-left pb-2 font-medium">Goal</th>
                    <th className="text-left pb-2 font-medium w-20">Status</th>
                    <th className="text-left pb-2 font-medium w-36 hidden sm:table-cell">Notice</th>
                    <th className="text-left pb-2 font-medium w-28 hidden md:table-cell">日期</th>
                    <th className="w-6" />
                  </tr>
                </thead>
                <tbody>
                  {goals.map(g => (
                    <tr key={g.id} className="group border-t border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-2.5 pr-4">
                        <span className={`text-sm ${g.status === '完成' ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                          {g.goal}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4">
                        <StatusBadge status={g.status} onClick={() => toggleGoal(g)} />
                      </td>
                      <td className="py-2.5 pr-4 hidden sm:table-cell">
                        <span className="text-xs text-gray-400 font-mono">{g.notice}</span>
                      </td>
                      <td className="py-2.5 pr-4 hidden md:table-cell">
                        <span className="text-xs text-gray-400">{g.date}</span>
                      </td>
                      <td className="py-2.5">
                        <button onClick={() => deleteGoal(g.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={12} className="text-gray-300 hover:text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      </main>

      {/* ── FEEDBACK HISTORY ── */}
      <section className="border-t border-gray-100 bg-gray-50/30">
        <div className="px-6 py-5">
          <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gray-400 mb-4">
            2026 Feedback
          </p>

          {loadingFeedback ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-7 bg-gray-100 rounded animate-pulse max-w-xs" />
              ))}
            </div>
          ) : (
            <div className="space-y-0.5">
              {feedback.map(entry => (
                <div key={entry.id}>
                  <button
                    onClick={() => toggleFeedback(entry)}
                    className="w-full flex items-center gap-2 py-1.5 group text-left"
                  >
                    {entry.collapsed
                      ? <ChevronRight size={13} className="text-gray-300 flex-shrink-0" />
                      : <ChevronDown size={13} className="text-gray-500 flex-shrink-0" />
                    }
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {entry.title}
                    </span>
                  </button>

                  {!entry.collapsed && (
                    <div className="ml-5 mb-3 mt-1">
                      {entry.content === '' ? (
                        <div className="flex items-center gap-2 text-xs text-gray-400 py-2">
                          <Loader2 size={12} className="animate-spin" />
                          載入中...
                        </div>
                      ) : entry.content ? (
                        <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line pl-3 border-l border-gray-200 max-w-2xl py-1">
                          {entry.content}
                        </div>
                      ) : (
                        <p className="text-xs text-gray-400 pl-3 border-l border-gray-100 py-1">（無內容）</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
