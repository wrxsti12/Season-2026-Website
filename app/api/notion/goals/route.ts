import { NextRequest, NextResponse } from 'next/server'
import { notion, NOTION_IDS, richTextToString } from '@/lib/notion'

export async function GET() {
  try {
    const res = await notion.databases.query({
      database_id: NOTION_IDS.goals,
      sorts: [{ property: '日期', direction: 'ascending' }],
    })
    const items = res.results.map((page: any) => ({
      id: page.id,
      goal: richTextToString(page.properties.Goal.title),
      status: page.properties.Status?.select?.name ?? '進行中',
      notice: richTextToString(page.properties.Notice?.rich_text ?? []),
      date: page.properties['日期']?.date?.start ?? '',
    }))
    return NextResponse.json(items)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { goal, notice, date } = await req.json()
  try {
    const page = await notion.pages.create({
      parent: { database_id: NOTION_IDS.goals },
      properties: {
        Goal: { title: [{ text: { content: goal } }] },
        Status: { select: { name: '進行中' } },
        ...(notice ? { Notice: { rich_text: [{ text: { content: notice } }] } } : {}),
        ...(date ? { '日期': { date: { start: date } } } : {}),
      },
    })
    return NextResponse.json({ id: (page as any).id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json()
  try {
    await notion.pages.update({
      page_id: id,
      properties: { Status: { select: { name: status } } },
    })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json()
  try {
    await notion.pages.update({ page_id: id, archived: true })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
