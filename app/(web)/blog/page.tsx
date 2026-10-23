import type { Metadata } from 'next'
import BlogHeroSection from '@/components/blog/BlogHeroSection'
import BlogDirectory from '@/components/blog/BlogDirectory'
import { blogClient } from '@/lib/blogClient'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Health Blog & Medical Insights | Clinica Cure Hospital Ranchi',
  description:
    'Explore doctor-verified healthcare articles, clinical guides, preventive wellness advice, and surgical advancements from senior specialists at Clinica Cure Hospital, Bariatu, Ranchi.',
  keywords: [
    'Clinica Cure Hospital blog',
    'medical articles Ranchi',
    'health tips Ranchi',
    'cardiology guide Ranchi',
    'knee replacement tips',
    'slip disc treatment Ranchi',
    'pregnancy care Ranchi',
    'pediatric advice',
  ],
}

export default async function BlogPage() {
  let dynamicPosts: any[] = []
  let dynamicCategories: any[] = []

  try {
    const [settingsRes, catsRes] = await Promise.all([
      blogClient.settings.get(),
      blogClient.categories.list(),
    ])

    const limit = settingsRes?.postsPerPage || 12
    const postsRes = await blogClient.posts.list({ status: 'published', page: 1, limit })

    if (postsRes && Array.isArray(postsRes.data)) {
      dynamicPosts = postsRes.data
    }
    if (catsRes && Array.isArray(catsRes.data)) {
      dynamicCategories = catsRes.data
    }
  } catch (err) {
    console.warn('Could not fetch posts/categories/settings from Supabase database:', err)
  }

  return (
    <div className="bg-[#F8FAF9] min-h-screen text-slate-800">
      {/* ── 1. FULL-WIDTH HERO SECTION (Matching Site Design) ── */}
      <BlogHeroSection />

      {/* ── 2. INTERACTIVE BLOG SEARCH, CATEGORY DIRECTORY & GRID ── */}
      <BlogDirectory
        initialPosts={dynamicPosts}
        initialCategories={dynamicCategories}
      />
    </div>
  )
}
