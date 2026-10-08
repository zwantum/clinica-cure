import { GOOGLE_REVIEWS } from '@/config/constants'
import { siteConfig } from '@/config/site'

export default function GoogleReviewsSection() {
  return (
    <section id="reviews" className="py-10 sm:py-14 bg-white border-t border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Rating Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-2xl text-slate-900 leading-none">
                  {siteConfig.googleRating}
                </span>
                <div className="flex text-amber-500 text-sm">
                  {'★'.repeat(5)}
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Based on <span className="font-bold text-slate-700">{siteConfig.googleReviewCount}</span> authentic patient reviews on Google
              </p>
            </div>
          </div>

          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all shrink-0 w-fit"
          >
            <span>Review Us on Google</span>
            <span className="text-xs">↗</span>
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GOOGLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] flex flex-col justify-between hover:shadow-sm transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0E746D] text-white font-bold text-xs flex items-center justify-center">
                      {rev.avatar_initial}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-slate-900 leading-tight">
                        {rev.reviewer_name}
                      </h4>
                      <span className="text-[10px] text-slate-400">{rev.time_ago}</span>
                    </div>
                  </div>
                  <div className="text-amber-500 text-xs">
                    {'★'.repeat(rev.rating)}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  &ldquo;{rev.review_text}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
