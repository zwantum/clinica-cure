import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  slug: string
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'pineapple',
    title: 'Is Pineapple Good for You? Health Benefits, Nutrition Facts & Side Effects',
    excerpt: 'Explore the key nutritional values, key vitamins, health advantages, and potential digestive side effects of eating pineapples.',
    date: 'Aug 19, 2026',
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80',
    slug: 'is-pineapple-good-for-you',
  },
  {
    id: 'heart-failure',
    title: 'What Happens in Advanced Heart Failure? Warning Signs & Management',
    excerpt: 'Understand what occurs when heart failure worsens, the key symptoms of advanced stages, and modern treatment options.',
    date: 'Aug 18, 2026',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    slug: 'what-happens-in-advanced-heart-failure',
  },
  {
    id: 'mumps',
    title: 'Mumps Disease: Symptoms, Causes, Treatment and Prevention Guide',
    excerpt: 'Learn about the symptoms, viral causes, vaccine prevention, and supportive care for mumps.',
    date: 'Jul 31, 2026',
    image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=300&q=80',
    slug: 'mumps-disease-guide',
  },
  {
    id: 'aloe-vera',
    title: 'Aloe Vera Juice Benefits: Reasons to Add It to Your Daily Routine',
    excerpt: 'Discover how aloe vera juice improves digestion, skin health, and hydration levels daily.',
    date: 'Jul 30, 2026',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=300&q=80',
    slug: 'aloe-vera-juice-benefits',
  },
  {
    id: 'skin-tags',
    title: 'Skin Tags: What Causes Them, How to Remove Them and Prevention',
    excerpt: 'Understand what causes skin tags to form and safe, professional options for removal.',
    date: 'Jul 30, 2026',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=300&q=80',
    slug: 'skin-tags-causes-removal',
  },
]

export default function BlogUpdatesSection() {
  const bigBlogs = BLOG_POSTS.slice(0, 2)
  const smallBlogs = BLOG_POSTS.slice(2, 5)

  return (
    <section id="blog" className="py-8 sm:py-6 md:py-7 lg:py-14 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header: Latest Blogs & View All Blogs */}
        <div className="flex items-center justify-between border-b border-[#E2ECE9] pb-4 mb-6 sm:mb-5 md:mb-6 lg:mb-8">
          <h2 className="font-display font-semibold text-slate-900 text-[22px] sm:text-[30px] md:text-[30px] lg:text-3xl">
            Latest Blogs
          </h2>
          <Link
            href="/blogs"
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
                <Link href={`/blogs/${b.slug}`}>
                  <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base md:text-[1.125rem] leading-snug hover:text-[#00A88F] transition-colors cursor-pointer">
                    {b.title}
                  </h4>
                </Link>
                <p className="text-[14px] sm:text-xs md:text-sm text-slate-600 mt-2 sm:mt-2.5 leading-relaxed flex-1">
                  {b.excerpt}
                </p>

                {/* Bottom Meta */}
                <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 flex items-center justify-between border-t border-[#E2ECE9]/80">
                  <span className="text-[11px] sm:text-xs text-slate-500 font-medium">
                    {b.date}
                  </span>
                  <Link
                    href={`/blogs/${b.slug}`}
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
                    <Link href={`/blogs/${b.slug}`}>
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
                      href={`/blogs/${b.slug}`}
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
