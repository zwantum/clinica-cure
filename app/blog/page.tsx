import type { Metadata } from 'next'
import BlogHeroSection from '@/components/blog/BlogHeroSection'
import BlogDirectory from '@/components/blog/BlogDirectory'

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

export default function BlogPage() {
  return (
    <div className="bg-[#F8FAF9] min-h-screen text-slate-800">
      {/* ── 1. FULL-WIDTH HERO SECTION (Matching Site Design) ── */}
      <BlogHeroSection />

      {/* ── 2. INTERACTIVE BLOG SEARCH, CATEGORY DIRECTORY & GRID ── */}
      <BlogDirectory />
    </div>
  )
}
