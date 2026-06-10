import { NextRequest, NextResponse } from 'next/server'
import { notion, richTextToString } from '@/lib/notion'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ blockId: string }> }
) {
  const { blockId } = await params
  try {
    const res = await notion.blocks.children.list({ block_id: blockId, page_size: 100 })
    const lines = res.results
      .filter((b: any) => b.type === 'paragraph' || b.type === 'heading_1' || b.type === 'heading_2' || b.type === 'heading_3')
      .map((b: any) => richTextToString(b[b.type]?.rich_text ?? []))
      .filter(Boolean)
    return NextResponse.json({ content: lines.join('\n') })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
