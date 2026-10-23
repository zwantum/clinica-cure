import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  PhoneCall,
  Phone,
  MessageCircle,
  MapPin,
  AlertTriangle,
  Lightbulb,
  Info,
  HelpCircle,
  Stethoscope,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'
import { BLOG_POSTS, BlogPost } from '@/config/blogs'
import { siteConfig } from '@/config/site'
import { generatePostMetadata } from '@zwantum/blog/seo'
import { blogClient } from '@/lib/blogClient'
import BlogShareBar from '@/components/blog/BlogShareBar'
import BlogCard from '@/components/blog/BlogCard'
import DynamicBlogArticleView from '@/components/blog/DynamicBlogArticleView'

export const dynamicParams = true
export const revalidate = 0

export async function generateStaticParams() {
  const staticSlugs = BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))

  try {
    const dynamicResult = await blogClient.posts.list({ status: 'published', limit: 100 })
    if (dynamicResult?.data && Array.isArray(dynamicResult.data)) {
      const dynamicSlugs = dynamicResult.data.map((p) => ({ slug: p.slug }))
      return [...staticSlugs, ...dynamicSlugs]
    }
  } catch {}

  return staticSlugs
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const dynamicPost = await blogClient.posts.getBySlug(slug)
    if (dynamicPost) {
      const meta = generatePostMetadata(dynamicPost)
      return {
        title: meta.title,
        description: meta.description,
        alternates: { canonical: meta.canonical },
        robots: meta.robots,
        openGraph: meta.openGraph as any,
        twitter: meta.twitter as any,
      }
    }
  } catch {}

  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return { title: 'Health Article Not Found | Clinica Cure Hospital' }

  return {
    title: `${post.title} | Clinica Cure Health Blog`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author.name],
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  // 1. Check for dynamic post and live module settings from @zwantum/blog
  let dynamicPost = null
  let settings = null
  let dynamicRelatedPosts: any[] = []
  let categories: any[] = []

  try {
    const [postResult, settingsResult, allPostsResult, categoriesResult] = await Promise.all([
      blogClient.posts.getBySlug(slug),
      blogClient.settings.get(),
      blogClient.posts.list({ status: 'published', limit: 8 }),
      blogClient.categories.list(),
    ])
    dynamicPost = postResult
    settings = settingsResult
    if (allPostsResult?.data && Array.isArray(allPostsResult.data)) {
      dynamicRelatedPosts = allPostsResult.data.filter((p: any) => p.slug !== slug).slice(0, 3)
    }
    if (categoriesResult?.data && Array.isArray(categoriesResult.data)) {
      categories = categoriesResult.data
    }
  } catch (err) {
    console.warn('Could not fetch post or settings from blogClient:', err)
  }

  if (dynamicPost) {
    return (
      <DynamicBlogArticleView
        post={dynamicPost}
        settings={settings}
        relatedPosts={dynamicRelatedPosts}
        categories={categories}
      />
    )
  }

  // 2. Fallback to existing static post if present
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  if (!post) {
    console.log('Post not found for slug:', slug)
    notFound()
  }
  console.log('Successfully found static post:', post.title)

  // Find previous and next articles
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null

  // Related articles in same category or recent
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <div className="bg-[#F8FAF9] min-h-screen text-slate-800">

      {/* ── 1. ARTICLE HEADER & HERO ── */}
      <section className="bg-[#F0F8FC] border-b border-slate-200/80 pt-8 sm:pt-6 md:pt-7 lg:pt-12 pb-10 sm:pb-6 md:pb-7 lg:pb-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 sm:mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link href="/" className="hover:text-[#0E746D] transition-colors shrink-0">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#0E746D] transition-colors shrink-0">
              Health Blog
            </Link>
            <span>/</span>
            <span className="text-slate-400 shrink-0">{post.category}</span>
            <span>/</span>
            <span className="text-slate-700 font-medium truncate max-w-xs">{post.title}</span>
          </div>

          <div className="max-w-4xl">
            {/* Normal metadata: Category, Date & Read Time without capsule layout */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
              <span className="font-bold text-[#0E746D] uppercase tracking-wider text-xs sm:text-[13px]">
                {post.category}
              </span>
              <span className="text-slate-300" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.publishDate}</span>
              </span>
              <span className="text-slate-300" aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{post.readTime}</span>
              </span>
            </div>

            {/* Main H1 Title */}
            <h1 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.2] tracking-tight">
              {post.title}
            </h1>

            {/* Excerpt / Lead Paragraph */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            {/* Author Byline & Share Bar Row */}
            <div className="mt-6 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Author info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden shadow-2xs">
                  {post.author.image ? (
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Written by</span>
                  </div>
                  {post.author.doctorSlug ? (
                    <Link
                      href={`/doctors/${post.author.doctorSlug}`}
                      className="font-display font-bold text-slate-900 text-sm sm:text-base hover:text-[#0E746D] transition-colors"
                    >
                      {post.author.name}
                    </Link>
                  ) : (
                    <span className="font-display font-bold text-slate-900 text-sm sm:text-base">
                      {post.author.name}
                    </span>
                  )}
                  <p className="text-xs text-slate-500">
                    {post.author.designation}
                  </p>
                </div>
              </div>

              {/* Share Bar */}
              <BlogShareBar title={post.title} slug={post.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED IMAGE COVER BANNER ── */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        <div className="relative rounded-3xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(18,48,44,0.12)] border border-[#E2ECE9] h-[260px] sm:h-[380px] md:h-[460px] lg:h-[500px] bg-slate-100">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ── 3. MAIN CONTENT: 2-COLUMN GRID ── */}
      <section className="py-10 sm:py-7 md:py-8 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-start">

            {/* ══════════════════════════════════════════════
                LEFT / MAIN COLUMN: ARTICLE BODY
            ══════════════════════════════════════════════ */}
            <main className="lg:col-span-8 space-y-8">
              {/* Main Content Sections */}
              <div className="bg-white rounded-3xl border border-[#E2ECE9] p-6 sm:p-8 md:p-10 shadow-[0_4px_24px_-4px_rgba(18,48,44,0.06)] space-y-8">
                {post.content.map((sec, idx) => (
                  <div key={idx} id={sec.sectionId} className="scroll-mt-28 space-y-4">
                    {sec.heading && (
                      <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl pt-2 border-t border-slate-100 first:border-t-0 first:pt-0">
                        {sec.heading}
                      </h2>
                    )}

                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-700 leading-relaxed text-sm sm:text-base">
                        {p}
                      </p>
                    ))}

                    {/* Bullets if present */}
                    {sec.bullets && sec.bullets.length > 0 && (
                      <ul className="space-y-2.5 my-4 bg-[#F8FAF9] p-5 sm:p-6 rounded-2xl border border-slate-200/80">
                        {sec.bullets.map((b, bIdx) => {
                          const [boldPrefix, ...rest] = b.split(':')
                          return (
                            <li key={bIdx} className="flex items-start gap-2.5 text-[14px] sm:text-sm text-slate-700">
                              <span className="w-2 h-2 rounded-full bg-[#0E746D] shrink-0 mt-2" />
                              <span className="leading-relaxed">
                                {rest.length > 0 ? (
                                  <>
                                    <strong className="text-slate-900">{boldPrefix}:</strong>
                                    {rest.join(':')}
                                  </>
                                ) : (
                                  b
                                )}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    )}

                    {/* Callout box if present */}
                    {sec.callout && (
                      <div
                        className={`p-5 sm:p-6 rounded-2xl border my-5 ${sec.callout.type === 'warning'
                          ? 'bg-rose-50 border-rose-200 text-rose-950'
                          : sec.callout.type === 'tip'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                            : 'bg-blue-50 border-blue-200 text-blue-950'
                          }`}
                      >
                        <div className="flex items-center gap-2 font-display font-bold text-sm sm:text-base mb-1.5">
                          {sec.callout.type === 'warning' ? (
                            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                          ) : sec.callout.type === 'tip' ? (
                            <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0" />
                          ) : (
                            <Info className="w-5 h-5 text-blue-600 shrink-0" />
                          )}
                          <span>{sec.callout.title}</span>
                        </div>
                        <p className="text-[14px] sm:text-sm leading-relaxed">
                          {sec.callout.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {/* FAQ section if present */}
                {post.faqs && post.faqs.length > 0 && (
                  <div className="pt-8 border-t border-slate-100 space-y-4">
                    <div className="flex items-center gap-2 text-[#0E746D] font-display font-bold text-lg sm:text-xl">
                      <HelpCircle className="w-5 h-5" />
                      <span>Frequently Asked Clinical Questions</span>
                    </div>

                    <div className="space-y-3">
                      {post.faqs.map((faq, fIdx) => (
                        <div key={fIdx} className="bg-[#F8FAF9] border border-slate-200/90 rounded-2xl p-4 sm:p-5">
                          <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                            Q: {faq.q}
                          </h4>
                          <p className="text-[14px] sm:text-sm text-slate-600 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medical Disclaimer Note */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  <strong>Medical Disclaimer:</strong> The information contained in this health guide is intended solely for educational purposes and is not a substitute for clinical diagnosis, consultation, or treatment by a licensed physician. If you are experiencing acute medical distress, please contact Clinica Cure Hospital Emergency Services immediately at <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#0E746D] font-semibold underline">{siteConfig.phone}</a>.
                </div>
              </div>

              {/* Author Bio & Doctor Consultation Card */}
              <div className="bg-white rounded-3xl border border-[#E2ECE9] p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(18,48,44,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center font-bold text-xl shrink-0 overflow-hidden shadow-xs">
                    {post.author.image ? (
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0E746D] block">
                      ARTICLE AUTHOR &amp; CLINICAL FACULTY
                    </span>
                    <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg">
                      {post.author.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {post.author.designation}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Available for Outpatient (OPD) Consultations at Clinica Cure Hospital
                    </p>
                  </div>
                </div>

                <Link
                  href={post.author.doctorSlug ? `/book-appointment?doctor=${post.author.doctorSlug}` : '/book-appointment'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#0E746D] hover:bg-[#0A635B] text-white font-display font-bold text-xs sm:text-sm transition-all shadow-sm shrink-0 cursor-pointer"
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Book Consultation</span>
                </Link>
              </div>

              {/* Tags & Bottom Share Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Tags:
                  </span>
                  {post.tags.map((tag) => {
                    const cleanTag = tag.replace(/^#+\s*/, '').trim()
                    return (
                      <span
                        key={tag}
                        className="bg-white border border-slate-200 text-slate-700 text-xs px-3 py-1 rounded-xl"
                      >
                        {cleanTag}
                      </span>
                    )
                  })}
                </div>

                <BlogShareBar title={post.title} slug={post.slug} />
              </div>

              {/* Previous / Next Article Navigation Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#0E746D] transition-all group flex items-center gap-3"
                  >
                    <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-[#0E746D] transition-colors shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">
                        PREVIOUS ARTICLE
                      </span>
                      <p className="font-display font-bold text-slate-900 text-xs sm:text-sm truncate group-hover:text-[#0E746D] transition-colors">
                        {prevPost.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#0E746D] transition-all group flex items-center justify-between text-right gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">
                        NEXT ARTICLE
                      </span>
                      <p className="font-display font-bold text-slate-900 text-xs sm:text-sm truncate group-hover:text-[#0E746D] transition-colors">
                        {nextPost.title}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#0E746D] transition-colors shrink-0" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </main>

            {/* ══════════════════════════════════════════════
                RIGHT COLUMN: SIDEBAR WIDGETS
            ══════════════════════════════════════════════ */}
            <aside className="lg:col-span-4 space-y-6">

              {/* BOOK A CONSULTATION CARD */}
              <div className="bg-[#0E746D] rounded-3xl p-6 sm:p-7 text-white shadow-[0_8px_30px_-4px_rgba(14,116,109,0.3)] relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-white stroke-[2.2]" />
                  <h3 className="font-display font-bold text-white text-lg sm:text-xl tracking-tight">
                    Book a Consultation
                  </h3>
                </div>

                <p className="text-[14px] sm:text-[13px] text-white/85 mt-2 leading-relaxed">
                  Schedule your appointment with our {post.category} specialists.
                </p>

                <Link
                  href={`/book-appointment?department=${post.categorySlug}`}
                  className="mt-5 w-full py-3.5 px-5 rounded-full bg-white hover:bg-emerald-50 text-[#0E746D] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs group cursor-pointer"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <div className="my-5 border-t border-white/15" />

                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] sm:text-xs text-white/75 block">
                      Or call us directly at
                    </span>
                    <span className="font-display font-bold text-white text-base sm:text-lg tracking-wide block group-hover:text-emerald-200 transition-colors">
                      {siteConfig.phone}
                    </span>
                  </div>
                </a>
              </div>

              {/* HOSPITAL LOCATION & GOOGLE MAPS */}
              <div className="bg-white rounded-3xl border border-[#E2ECE9] p-6 shadow-[0_4px_24px_-4px_rgba(18,48,44,0.06)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider">
                    HOSPITAL LOCATION
                  </span>
                  <a
                    href={siteConfig.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#0E746D] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl mt-1.5 mb-1">
                  Clinica Cure Hospital
                </h3>
                <p className="text-[14px] sm:text-xs text-slate-600 mb-4">
                  {siteConfig.address}
                </p>

                {/* Embedded Google Map */}
                <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-200">
                  <iframe
                    src={siteConfig.mapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Clinica Cure Hospital Location"
                  />
                </div>
              </div>

            </aside>
          </div>
        </div>
      </section>

      {/* ── 4. RELATED ARTICLES AT BOTTOM ── */}
      <section className="py-12 sm:py-7 md:py-8 lg:py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <div>
              <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider">
                EXPLORE MORE HEALTH TOPICS
              </span>
              <h3 className="font-display font-bold text-slate-900 text-xl sm:text-2xl mt-1">
                Recommended Clinical Articles
              </h3>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0E746D] hover:underline cursor-pointer"
            >
              <span>View all articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {relatedPosts.map((rPost) => (
              <BlogCard key={rPost.slug} post={rPost} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
