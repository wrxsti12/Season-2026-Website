import { NextRequest, NextResponse } from 'next/server'
import { notion, NOTION_IDS, richTextToString } from '@/lib/notion'

export async function GET() {
  try {
    const res = await notion.databases.query({
      database_id: NOTION_IDS.urgent,
      sorts: [{ timestamp: 'created_time', direction: 'ascending' }],
    })
    const items = res.results.map((page: any) => ({
      id: page.id,
      name: richTextToString(page.properties.Name.title),
      status: page.properties.Status?.select?.name ?? '進行中',
    }))
    return NextResponse.json(items)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { name } = await req.json()
  try {
    const page = await notion.pages.create({
      parent: { database_id: NOTION_IDS.urgent },
      properties: {
        Name: { title: [{ text: { content: name } }] },
        Status: { select: { name: '進行中' } },
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
