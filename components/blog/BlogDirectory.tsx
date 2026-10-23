'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  User,
  BookOpen,
  CalendarDays,
  PhoneCall,
} from 'lucide-react'
import type { BlogPost } from '@/config/blogs'
import { siteConfig } from '@/config/site'
import BlogCard from '@/components/blog/BlogCard'

interface BlogDirectoryProps {
  initialPosts?: any[]
  initialCategories?: any[]
}

export default function BlogDirectory({
  initialPosts = [],
  initialCategories = [],
}: BlogDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // 1. Strictly map dynamic posts from database (Supabase)
  const allPosts = useMemo(() => {
    return initialPosts.map((p) => {
      const catName =
        p.categories?.[0]?.name ||
        (typeof p.category === 'string' && p.category ? p.category : '')
      const catSlug =
        p.categories?.[0]?.slug ||
        (catName
          ? catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          : '')

      return {
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt || '',
        category: catName,
        categorySlug: catSlug,
        coverImage:
          p.featured_image?.url ||
          p.coverImage ||
          '/images/patient-stories-hero-clean.webp',
        readTime: `${p.reading_time || 4} min read`,
        publishDate: p.published_at
          ? new Date(p.published_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })
          : 'Recent',
        author: {
          name: p.author?.name || 'Staff Author',
          designation: p.author?.designation || 'Editorial Faculty',
          image: p.author?.profile_image_url || p.author?.image || p.author?.avatar_url || '',
        },
        featured: Boolean(p.is_featured),
        tags: Array.isArray(p.tags)
          ? p.tags.map((t: any) => (typeof t === 'string' ? t : t.name))
          : [],
        tableOfContents: [],
        keyTakeaways: [],
        content: [],
      }
    })
  }, [initialPosts])

  // 2. Dynamically extract and generate category filter tabs
  const categories = useMemo(() => {
    const list: { name: string; slug: string }[] = [{ name: 'All', slug: 'all' }]
    const seen = new Set<string>(['all'])

    // Categories from Supabase database (created by user in Dashboard)
    if (Array.isArray(initialCategories)) {
      for (const cat of initialCategories) {
        if (!cat || !cat.name) continue
        const slug =
          cat.slug ||
          cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        if (slug && !seen.has(slug)) {
          seen.add(slug)
          list.push({ name: cat.name, slug })
        }
      }
    }

    // Categories explicitly assigned to active posts
    for (const post of allPosts) {
      if (post.category && post.categorySlug && !seen.has(post.categorySlug)) {
        seen.add(post.categorySlug)
        list.push({ name: post.category, slug: post.categorySlug })
      }
    }

    return list
  }, [initialCategories, allPosts])

  // 3. Filter posts based on selected category & search input
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'all' || post.categorySlug === selectedCategory

      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [allPosts, searchQuery, selectedCategory])

  return (
    <section className="py-8 sm:py-6 md:py-7 lg:py-12 bg-[#F8FAF9]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">

        {/* ── DYNAMIC CATEGORIES & SEARCH BAR ── */}
        <div
          className={`flex flex-col md:flex-row items-stretch md:items-center ${
            categories.length > 1 ? 'justify-between' : 'justify-end'
          } gap-4 mb-8 sm:mb-10`}
        >
          {/* Dynamic Category Tabs - only rendered if categories exist */}
          {categories.length > 1 ? (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.slug
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#0E746D] text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/90'
                    }`}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>
          ) : null}

          {/* Clean Search Input */}
          <div className="relative w-full md:w-72 lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-8 h-10.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#0E746D] transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── ARTICLES GRID WITH IMPROVED CARD UI ── */}
        <div>
          {allPosts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center max-w-lg mx-auto shadow-2xs">
              <BookOpen className="w-12 h-12 text-[#0E746D]/60 mx-auto mb-3" />
              <h4 className="font-display font-bold text-slate-800 text-lg">
                No health articles published yet
              </h4>
              <p className="text-[14px] sm:text-xs text-slate-500 mt-1 mb-2">
                Our clinical faculty will be publishing medical guides, surgical breakthroughs, and wellness advice soon.
              </p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-2xs">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h4 className="font-display font-bold text-slate-800 text-lg">
                No health articles found
              </h4>
              <p className="text-[14px] sm:text-xs text-slate-500 mt-1 mb-5">
                Try searching for different symptoms, medical terms, or choose another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="px-4 py-2.5 rounded-xl bg-[#0E746D] text-white text-xs font-semibold cursor-pointer"
              >
                Show all articles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* ── CONSULTATION & APPOINTMENT BANNER ── */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#0E746D] to-[#0A635B] rounded-3xl p-6 sm:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider py-1 rounded-full text-white inline-block mb-3">
              NEED MEDICAL GUIDANCE?
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
              Consult Our Specialists at Clinica Cure Hospital
            </h3>
            <p className="mt-2 text-[14px] sm:text-sm text-emerald-100 leading-relaxed">
              If you or a family member are experiencing symptoms discussed in these health articles, book a priority OPD consultation with senior physicians in Bariatu, Ranchi.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0E746D] font-display font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-all shadow-sm cursor-pointer"
              >
                <CalendarDays className="w-4 h-4" />
                <span>Book Hospital Appointment</span>
              </Link>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Helpline: {siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
