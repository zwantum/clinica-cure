import { blogClient } from '@/lib/blogClient'

export async function GET() {
  const rss = await blogClient.seo.getRss()
  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
