'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Stethoscope,
  Phone,
  ArrowRight,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Building2,
} from 'lucide-react'
import { BlogContent, CommentSection, BlogProvider } from '@zwantum/blog/react'
import '@zwantum/blog-editor/content.css'
import { blogClient } from '@/lib/blogClient'
import BlogShareBar from '@/components/blog/BlogShareBar'
import { siteConfig } from '@/config/site'

interface DynamicBlogArticleViewProps {
  post: any
  settings?: any
  relatedPosts?: any[]
  categories?: any[]
}

function getAuthorInitials(name?: string): string {
  if (!name || !name.trim()) return 'SA'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function formatDate(dateString?: string): string {
  if (!dateString) return 'Oct 2026'
  try {
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return 'Oct 2026'
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return 'Oct 2026'
  }
}

export default function DynamicBlogArticleView({
  post,
  settings,
  relatedPosts = [],
  categories = [],
}: DynamicBlogArticleViewProps) {
  const authorImage =
    post.author?.profile_image_url || post.author?.image || post.author?.avatar_url || ''
  const authorName = post.author?.name || 'Clinica Cure Medical Board'
  const authorDesignation = post.author?.designation || post.author?.title || 'Hospital Editorial Board'
  const categoryName =
    post.categories?.[0]?.name || (typeof post.category === 'string' ? post.category : '')

  const tagsList: string[] = useMemo(() => {
    if (!post.tags || !Array.isArray(post.tags)) return []
    return post.tags
      .map((t: any) => {
        const raw = typeof t === 'string' ? t : t.name
        return typeof raw === 'string' ? raw.replace(/^#+\s*/, '').trim() : ''
      })
      .filter(Boolean)
  }, [post.tags])

  // Live feature module toggles from Dashboard Settings -> Modules & Toggles
  const enableDropCap = Boolean(settings?.enableDropCap)
  const enableComments = Boolean(settings?.enableComments)

  return (
    <BlogProvider client={blogClient}>
      <div className="bg-white min-h-screen text-slate-800">
        {/* ── 1. ARTICLE HEADER & HERO ── */}
        <section className="bg-[#F8FAFC] border-b border-slate-200/80 pt-8 sm:pt-10 pb-8 sm:pb-12">
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 sm:mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
              <Link href="/" className="hover:text-[#0E746D] transition-colors shrink-0">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#0E746D] transition-colors shrink-0">
                Health Blog
              </Link>
              <span>/</span>
              {categoryName && (
                <>
                  <span className="text-slate-400 shrink-0">{categoryName}</span>
                  <span>/</span>
                </>
              )}
              <span className="text-slate-700 font-medium truncate max-w-xs">{post.title}</span>
            </div>

            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
                {categoryName && (
                  <>
                    <span className="font-bold text-[#0E746D] uppercase tracking-wider text-xs sm:text-[13px]">
                      {categoryName}
                    </span>
                    <span className="text-slate-300" aria-hidden="true">•</span>
                  </>
                )}
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatDate(post.published_at || post.created_at)}</span>
                </span>
                <span className="text-slate-300" aria-hidden="true">•</span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.reading_time || 5} min read</span>
                </span>
              </div>

              <h1 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.2] tracking-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── 2. ARTICLE MAIN BODY & SIDEBAR ── */}
        <main className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ════ LEFT COLUMN: ARTICLE CONTENT ════ */}
            <div className="lg:col-span-8">
              {post.featured_image?.url && (
                <figure className="mb-8">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm max-h-[480px] bg-slate-100">
                    <img
                      src={post.featured_image.url}
                      alt={post.featured_image.alt_text || post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {(post.featured_image_caption || post.featured_image?.caption) && (
                    <figcaption className="text-center text-xs sm:text-sm text-slate-500 italic mt-2.5 px-2">
                      {post.featured_image_caption || post.featured_image?.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Natural Article Content */}
              <div className="w-full">
                <BlogContent
                  content={post.content}
                  enableTableOfContents={false}
                  enableDropCap={enableDropCap}
                />
              </div>

              {/* Bottom Section: Divider, Share, Tags, Author */}
              <div className="border-t border-slate-200/90 my-8 pt-6 space-y-5">
                {/* 1. Share: [ 𝕏 Post ] [ WhatsApp ] [ LinkedIn ] [ Copy Link ] */}
                <BlogShareBar title={post.title} slug={post.slug} variant="pills" />

                {/* 2. TAGS */}
                {tagsList.length > 0 && (
                  <div className="flex items-center gap-2.5 flex-wrap pt-2">
                    <span className="text-xs font-semibold text-slate-500 mr-1 select-none">
                      TAGS:
                    </span>
                    {tagsList.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#F1F5F9] text-slate-700 hover:bg-slate-200 transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Comments Section */}
              {enableComments && (
                <div className="mt-8 pt-8 border-t border-slate-200/90">
                  <CommentSection postId={post.id} />
                </div>
              )}
            </div>

            {/* ════ RIGHT COLUMN: RICH SIDEBAR WIDGETS ════ */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* WIDGET 1: SPECIALIST DOCTOR CONSULTATION CARD */}
              <div className="bg-[#0E746D] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
                <div className="flex items-center gap-2 text-white/90 font-bold text-xs uppercase tracking-wider mb-2">
                  <Stethoscope className="w-4 h-4 text-white" />
                  <span>{categoryName ? `${categoryName} Clinic` : 'Specialist Consultation'}</span>
                </div>
                <h3 className="font-bold text-white text-lg sm:text-xl mb-2 leading-snug">
                  Need Expert Medical Advice?
                </h3>
                <p className="text-xs text-white/85 mb-5 leading-relaxed">
                  Book an outpatient consultation directly with senior specialist doctors at Clinica Cure Hospital, Bariatu, Ranchi.
                </p>
                <Link
                  href="/book-appointment"
                  className="w-full py-3 px-4 bg-[#FFCC00] text-[#172033] font-bold text-xs rounded-xl shadow-xs hover:bg-[#f0c000] transition-colors flex items-center justify-center gap-2 group"
                >
                  <span>Book Doctor Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <div className="my-4 border-t border-white/15" />
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex items-center gap-3 text-white group hover:text-emerald-200 transition-colors cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[10.5px] text-white/75 block">OPD Helpline</span>
                    <span className="font-bold text-sm text-white">{siteConfig.phone}</span>
                  </div>
                </a>
              </div>

              {/* WIDGET 3: 24/7 EMERGENCY & AMBULANCE DISPATCH */}
              <div className="bg-rose-50 border border-rose-200/90 rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider mb-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>24/7 Emergency &amp; Trauma</span>
                </div>
                <p className="text-xs text-rose-950 font-semibold mb-3">
                  Dedicated Cardiac, Stroke &amp; Critical Care Emergency Unit on standby.
                </p>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Emergency Ambulance</span>
                </a>
              </div>

              {/* WIDGET 4: BROWSE HEALTH SPECIALTIES / CATEGORIES */}
              {categories.length > 0 && (
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2ECE9] shadow-xs">
                  <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-slate-100">
                    <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider">
                      Medical Specialties
                    </span>
                    <Link href="/blog" className="text-[11px] font-semibold text-[#0E746D] hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-1.5">
                    {categories.map((cat: any) => (
                      <Link
                        key={cat.id || cat.slug}
                        href={`/blog?category=${cat.slug}`}
                        className="flex items-center justify-between py-2 px-3 rounded-xl text-xs text-slate-700 hover:bg-[#F0F8F6] hover:text-[#0E746D] transition-colors group font-medium"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0E746D] opacity-60 group-hover:scale-125 transition-transform" />
                          <span>{cat.name}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0E746D] group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* HOSPITAL LOCATION & OPD TIMINGS */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2ECE9] shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0E746D] uppercase tracking-wider mb-2">
                  <Building2 className="w-4 h-4 text-[#0E746D]" />
                  <span>Hospital Campus</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">
                  Clinica Cure Hospital Ranchi
                </h4>
                <p className="text-xs text-slate-600 mb-3 flex items-start gap-1.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>Booty More, Bariatu Road, Ranchi, Jharkhand 834009</span>
                </p>
                <div className="p-3 bg-[#F8FAF9] rounded-xl text-[11px] text-slate-600 space-y-1 mb-3.5 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-700">OPD Timings:</span>
                    <span>Mon – Sat: 9 AM – 8 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-700">Emergency &amp; ICU:</span>
                    <span className="text-emerald-700 font-semibold">24/7 Available</span>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Clinica+Cure+Hospital+Bariatu+Ranchi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 bg-white border border-slate-200 hover:border-[#0E746D] text-slate-700 hover:text-[#0E746D] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </aside>
          </div>
        </main>

        {/* ── 3. RELATED ARTICLES SECTION (BELOW BLOG ARTICLE) ── */}
        {relatedPosts.length > 0 && (
          <section className="py-12 sm:py-16 bg-[#F8FAF9] border-t border-slate-200/90 mt-8">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
                <div>
                  <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider block mb-1">
                    EXPLORE MORE HEALTH TOPICS
                  </span>
                  <h3 className="font-display font-bold text-slate-900 text-xl sm:text-2xl md:text-3xl">
                    Related Clinical Articles &amp; Insights
                  </h3>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0E746D] hover:underline cursor-pointer shrink-0"
                >
                  <span>View all articles</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 3 Related Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                {relatedPosts.map((rPost: any) => {
                  const rCategory =
                    rPost.categories?.[0]?.name || (typeof rPost.category === 'string' ? rPost.category : '')
                  const rImage = rPost.featured_image?.url || '/images/blog-featured-universal.jpg'
                  const rDate = formatDate(rPost.published_at || rPost.created_at)

                  return (
                    <article
                      key={rPost.id || rPost.slug}
                      className="bg-white rounded-2xl border border-slate-200/80 hover:border-[#0E746D]/40 transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between overflow-hidden group"
                    >
                      <div>
                        {/* Cover Image */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          <img
                            src={rImage}
                            alt={rPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                          {rCategory && (
                            <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-md text-[#0E746D] text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                              {rCategory}
                            </div>
                          )}
                          <div className="absolute bottom-3 right-3 bg-slate-900/75 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                            <Clock className="w-3 h-3 text-emerald-300" />
                            <span>{rPost.reading_time || 5} min read</span>
                          </div>
                        </div>

                        {/* Text Content */}
                        <div className="p-5 sm:p-6 pb-2">
                          <div className="flex items-center text-xs text-slate-500 mb-2.5">
                            <span className="flex items-center gap-1.5 text-[11.5px]">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>{rDate}</span>
                            </span>
                          </div>

                          <Link href={`/blog/${rPost.slug}`}>
                            <h4 className="font-display font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#0E746D] transition-colors line-clamp-2">
                              {rPost.title}
                            </h4>
                          </Link>

                          {rPost.excerpt && (
                            <p className="mt-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-3">
                              {rPost.excerpt}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Card Bottom CTA */}
                      <div className="p-5 sm:p-6 pt-3">
                        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
                          <span className="text-[11.5px] font-medium text-slate-500 truncate">
                            Clinica Cure Medical Board
                          </span>
                          <Link
                            href={`/blog/${rPost.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#0E746D] hover:text-[#0A635B] transition-colors group/btn"
                          >
                            <span>Read Article</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </BlogProvider>
  )
}
