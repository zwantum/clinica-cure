import { blogClient } from '@/lib/blogClient'

export async function GET() {
  const sitemap = await blogClient.seo.getSitemap()
  return new Response(sitemap, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
