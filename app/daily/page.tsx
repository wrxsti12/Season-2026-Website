import type { Metadata } from 'next'
import DailyDashboard from '@/components/daily/daily-dashboard'

export const metadata: Metadata = {
  title: 'Daily Note | 每日記錄',
  description: '每日習慣、急迫事件、晨報晚報、週目標追蹤',
}

export default function DailyPage() {
  return <DailyDashboard />
}
