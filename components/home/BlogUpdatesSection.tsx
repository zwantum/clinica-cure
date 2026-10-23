import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { blogClient } from '@/lib/blogClient'

interface BlogPostItem {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
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

// Curated fallbacks matching hospital specialties in case database is empty or loading
const FALLBACK_POSTS: BlogPostItem[] = [
  {
    id: 'heart-care',
    title: 'Warning Signs of Heart Disease You Should Never Ignore: A Cardiologist’s Guide',
    excerpt: 'Learn the subtle early signs, risk factors, and proactive steps to protect your cardiovascular health.',
    date: 'Oct 22, 2026',
    image: '/images/blog-featured-universal.jpg',
    slug: 'warning-signs-heart-disease-never-ignore',
  },
  {
    id: 'knee-pain',
    title: 'Chronic Knee and Joint Pain: Non-Surgical Therapies vs. Joint Replacement',
    excerpt: 'Discover the full spectrum of modern orthopedic care—from targeted physical therapy to robotic-assisted joint replacement.',
    date: 'Oct 21, 2026',
    image: '/images/blog-featured-universal.jpg',
    slug: 'chronic-knee-joint-pain-treatments-surgery',
  },
  {
    id: 'stroke-awareness',
    title: 'Stroke Prevention and Emergency Response: Why Every Second Matters',
    excerpt: 'Learn how to recognize the BE-FAST signs and how rapid treatment saves lives and preserves brain function.',
    date: 'Oct 20, 2026',
    image: '/images/blog-featured-universal.jpg',
    slug: 'stroke-symptoms-prevention-be-fast-protocol',
  },
  {
    id: 'prenatal-guide',
    title: 'The Essential Trimester-by-Trimester Prenatal Care Guide for Expectant Mothers',
    excerpt: 'Explore our comprehensive trimester-by-trimester guide to essential medical check-ups, nutrition, and wellness.',
    date: 'Oct 19, 2026',
    image: '/images/blog-featured-universal.jpg',
    slug: 'essential-prenatal-care-guide-trimester-by-trimester',
  },
  {
    id: 'blood-donation',
    title: 'The Life-Saving Power of Blood Donation: Health Benefits, Myths, and Eligibility',
    excerpt: 'Explore the biological benefits of donating, dispel common myths, and understand the simple steps to becoming a regular donor.',
    date: 'Oct 18, 2026',
    image: '/images/blog-featured-universal.jpg',
    slug: 'life-saving-power-blood-donation-benefits-myths',
  },
]

export default async function BlogUpdatesSection() {
  let displayBlogs: BlogPostItem[] = []

  try {
    const res = await blogClient.posts.list({
      status: 'published',
      page: 1,
      limit: 5,
    })

    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      displayBlogs = res.data.map((p: any) => ({
        id: p.id,
        title: p.title,
        excerpt: p.excerpt || '',
        date: formatDate(p.published_at || p.created_at),
        image: p.featured_image?.url || '/images/blog-featured-universal.jpg',
        slug: p.slug,
      }))
    }
  } catch (err) {
    console.warn('Could not fetch dynamic blog posts for homepage:', err)
  }

  // If fewer than 5 posts fetched, fill remaining with curated fallback articles
  if (displayBlogs.length < 5) {
    const existingSlugs = new Set(displayBlogs.map((b) => b.slug))
    for (const fb of FALLBACK_POSTS) {
      if (!existingSlugs.has(fb.slug) && displayBlogs.length < 5) {
        displayBlogs.push(fb)
      }
    }
  }

  const bigBlogs = displayBlogs.slice(0, 2)
  const smallBlogs = displayBlogs.slice(2, 5)

  return (
    <section id="blog" className="py-8 sm:py-6 md:py-7 lg:py-14 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header: Latest Blogs & View All Blogs */}
        <div className="flex items-center justify-between border-b border-[#E2ECE9] pb-4 mb-6 sm:mb-5 md:mb-6 lg:mb-8">
          <h2 className="font-display font-semibold text-slate-900 text-[22px] sm:text-[30px] md:text-[30px] lg:text-3xl">
            Latest Blogs
          </h2>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#00A88F] transition-colors group"
          >
            <span>View All Blogs</span>
            <span className="w-7 h-7 rounded-full bg-[#00A88F] text-white flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:translate-x-0.5">
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </span>
          </Link>
        </div>

        {/* Custom Grid Container: 2 big cards in columns 1 & 2 + 1 column of small items */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1.2fr] gap-5 sm:gap-5 md:gap-6 items-stretch">
          {/* 2 Big Blogs */}
          {bigBlogs.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-[#E2ECE9] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#E2ECE9] bg-slate-50 shrink-0">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-1">
                <Link href={`/blog/${b.slug}`}>
                  <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base md:text-[1.125rem] leading-snug hover:text-[#00A88F] transition-colors cursor-pointer line-clamp-2">
                    {b.title}
                  </h4>
                </Link>
                <p className="text-[14px] sm:text-xs md:text-sm text-slate-600 mt-2 sm:mt-2.5 leading-relaxed flex-1 line-clamp-3">
                  {b.excerpt}
                </p>

                {/* Bottom Meta */}
                <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 flex items-center justify-between border-t border-[#E2ECE9]/80">
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    {b.date}
                  </span>
                  <Link
                    href={`/blog/${b.slug}`}
                    className="flex items-center gap-2 text-slate-900 font-display font-extrabold text-[11px] sm:text-xs hover:text-[#00A88F] transition-all group/btn"
                  >
                    <span>Read More</span>
                    <span className="w-7 h-7 rounded-full bg-[#00A88F] text-white flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover/btn:translate-x-0.5">
                      <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Third Column: 3 Small Stacked Blogs */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-3 sm:gap-3.5 justify-between h-full">
            {smallBlogs.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-[#E2ECE9] rounded-2xl p-3 sm:p-3.5 flex gap-3 sm:gap-3.5 items-center shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex-1"
              >
                {/* Small Thumbnail */}
                <div className="w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-[#E2ECE9] bg-slate-50 relative">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Text Details */}
                <div className="flex-1 flex flex-col h-full justify-between py-0.5 min-w-0">
                  <div>
                    <Link href={`/blog/${b.slug}`}>
                      <h5 className="font-display font-semibold text-slate-900 text-[12.5px] sm:text-[13px] md:text-sm leading-snug line-clamp-1 hover:text-[#00A88F] transition-colors cursor-pointer">
                        {b.title}
                      </h5>
                    </Link>
                    <p className="text-[13.5px] sm:text-[11.5px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {b.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2 sm:mt-2.5">
                    <span className="text-[10.5px] sm:text-[11px] text-slate-500 font-medium">
                      {b.date}
                    </span>
                    <Link
                      href={`/blog/${b.slug}`}
                      className="flex items-center gap-1.5 text-slate-900 font-display font-extrabold text-[10.5px] sm:text-[11px] hover:text-[#00A88F] transition-all group/btn"
                    >
                      <span>Read More</span>
                      <span className="w-6 h-6 rounded-full bg-[#00A88F] text-white flex items-center justify-center shrink-0 transition-transform group-hover/btn:translate-x-0.5">
                        <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
