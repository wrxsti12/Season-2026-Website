import { redirect } from 'next/navigation'

// /booking → 統一導向 /pricing 選方案，再從 pricing 跳 /contact?plan=xxx
export default function BookingPage() {
  redirect('/pricing')
}
