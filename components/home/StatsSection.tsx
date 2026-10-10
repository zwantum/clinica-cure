import { HOMEPAGE_STATS } from '@/config/constants'

export default function StatsSection() {
  return (
    <section id="hospital-stats" className="py-8 sm:pt-6 sm:pb-10 md:pt-6 md:pb-12 lg:pt-6 lg:pb-12 xl:py-16 bg-white border-t border-slate-100/90">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        {/* Left-Aligned Section Header */}
        <div className="text-left max-w-2xl mb-6 sm:mb-8 lg:mb-12">
          <h2 className="font-display font-semibold text-slate-900 text-[22px] sm:text-3xl lg:text-[34px] leading-tight">
            Trusted Care. Proven Experience.
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-[#64748B] leading-relaxed">
            Delivering comprehensive multi-speciality care with compassion, advanced medical facilities and experienced specialists.
          </p>
        </div>

        {/* 4 Metrics: List View on mobile, 2x2 on tablet, 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-slate-100">
          {HOMEPAGE_STATS.map((stat) => (
            <div key={stat.label} className="lg:px-7 lg:first:pl-0 lg:last:pr-0 flex flex-col justify-start">
              <div className="font-display font-bold text-[20px] sm:text-[30px] md:text-[32px] text-[#0e746d] tracking-tight leading-none inline-flex items-start">
                <span>{stat.value}</span>
                <sup className="text-[#0e746d] text-[13px] sm:text-[1.55rem] font-bold leading-none ml-0.5 relative -top-0.5 sm:-top-1 select-none">
                  {stat.suffix}
                </sup>
              </div>
              <h3 className="mt-1.5 sm:mt-2.5 font-display font-semibold text-sm sm:text-base text-slate-900 leading-snug">
                {stat.label}
              </h3>
              <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
