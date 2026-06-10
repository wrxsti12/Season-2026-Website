import { Client } from '@notionhq/client'

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  timeoutMs: 8000,
  notionVersion: '2022-06-28',
})

export const NOTION_IDS = {
  habits:   '2c981e08da2080e1be06e23f58561cb8', // 要事第一 database
  urgent:   '2c981e08da208080b680f50fd3f5f25f', // 急迫事件 database
  goals:    '2c981e08da208080b1cdc2971c3f7662', // WEEKEND GOAL database
  feedback: '2ee81e08da2080a7a283c7d3bb77404a', // 2026 FEEDBACK page
}

export function richTextToString(rt: Array<{ plain_text: string }>) {
  return rt.map((t) => t.plain_text).join('')
}
