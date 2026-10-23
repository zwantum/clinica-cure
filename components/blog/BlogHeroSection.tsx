import Link from 'next/link'
import { ShieldCheck, HeartHandshake, BookOpen, Stethoscope } from 'lucide-react'

export default function BlogHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F0F8FC] border-b border-slate-200/80 py-8 sm:py-6 md:py-7 lg:py-14">
      {/* Background Graphic / Ambient Hospital Image */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[48%] lg:w-[50%] xl:w-[52%] pointer-events-none select-none z-0">
        <div className="relative w-full h-full">
          <img
            src="/images/patient-stories-hero-clean.webp"
            alt="Clinica Cure Medical Library & Health Insights"
            className="w-full h-full object-cover object-right lg:object-center [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_100%)] opacity-25 md:opacity-85 lg:opacity-95"
          />
        </div>
      </div>

      {/* Seamless Unified Overlay across the section */}
      <div className="absolute inset-0 pointer-events-none select-none z-[1] bg-gradient-to-r from-[#F0F8FC] via-[#F0F8FC]/95 via-35% md:via-[#F0F8FC]/75 md:via-45% lg:via-transparent to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
            <Link href="/" className="hover:text-[#0E746D] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Health Blog &amp; Medical Library</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 py-1 text-[#0E746D] text-xs font-bold tracking-wide uppercase mb-3">

            EVIDENCE-BASED HEALTH ARTICLES &amp; CLINICAL GUIDES
          </div>

          {/* Heading */}
          <h1 className="font-display font-semibold text-slate-900 text-2xl sm:text-3xl md:text-[34px] lg:text-[42px] leading-[1.16] tracking-tight">
            Clinica Cure <span className="text-[#0E746D]">Health &amp; Wellness</span> Blog
          </h1>

          {/* Description */}
          <p className="mt-2.5 text-[14px] sm:text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-xl">
            Doctor-verified medical insights, symptom explanations, surgical advances, and preventive wellness strategies curated directly by the clinical faculty at Clinica Cure Hospital, Bariatu, Ranchi.
          </p>

          {/* Open unboxed highlights with separators */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-y-2.5 gap-x-4 sm:gap-x-6 text-xs sm:text-[13px] text-slate-700 font-medium">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-[#0E746D] shrink-0" />
              <span className="font-semibold text-slate-800">Doctor-Verified</span>
            </div>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0E746D] shrink-0" />
              <span className="font-semibold text-slate-800">Evidence-Based</span>
            </div>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0E746D] shrink-0" />
              <span className="font-semibold text-slate-800">Free Patient Guides</span>
            </div>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-[#0E746D] shrink-0" />
              <span className="font-semibold text-slate-800">Ranchi Community Care</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
