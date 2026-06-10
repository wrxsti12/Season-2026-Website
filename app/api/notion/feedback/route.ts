import { NextRequest, NextResponse } from 'next/server'
import { notion, NOTION_IDS, richTextToString } from '@/lib/notion'

export async function GET() {
  try {
    const res = await notion.blocks.children.list({
      block_id: NOTION_IDS.feedback,
      page_size: 100,
    })

    const entries = res.results
      .filter((b: any) => {
        const type = b.type
        const block = b[type]
        return block?.is_toggleable === true && block?.rich_text?.length > 0
      })
      .map((b: any) => {
        const type = b.type
        const block = b[type]
        const title = richTextToString(block.rich_text)
        return {
          id: b.id,
          title,
          type: b.type,
          collapsed: true,
        }
      })
      .reverse()

    return NextResponse.json(entries)
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { dateLabel, reportType, content } = await req.json()
  const title = `${dateLabel}｜${reportType}`

  try {
    const paragraphs = content
      .split('\n')
      .filter((line: string) => line.trim() !== '')
      .map((line: string) => ({
        type: 'paragraph' as const,
        paragraph: {
          rich_text: [{ type: 'text' as const, text: { content: line } }],
        },
      }))

    const appendRes = await notion.blocks.children.append({
      block_id: NOTION_IDS.feedback,
      children: [
        {
          type: 'heading_1',
          heading_1: {
            is_toggleable: true,
            rich_text: [
              { type: 'text', text: { content: title }, annotations: { bold: true } },
            ],
          },
        } as any,
      ],
    })

    const newBlockId = (appendRes.results[0] as any).id

    if (paragraphs.length > 0) {
      await notion.blocks.children.append({
        block_id: newBlockId,
        children: paragraphs,
      })
    }

    return NextResponse.json({ ok: true, id: newBlockId })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
