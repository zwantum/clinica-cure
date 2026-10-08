import type { Metadata } from 'next'
import { Heart, Users, ShieldCheck, Star } from 'lucide-react'
import PatientStoriesSection from '@/components/home/PatientStoriesSection'

export const metadata: Metadata = {
  title: 'Patient Stories & Recovery Experiences | Clinica Cure Hospital',
  description:
    'Read and watch real patient recovery stories from Clinica Cure Hospital Ranchi — orthopaedic surgeries, neurotrauma rehabilitation, cardiac interventions and maternity care.',
}

export default function PatientStoriesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ── HERO SECTION: PATIENT STORIES & TESTIMONIALS ── */}
      <section className="relative overflow-hidden bg-[#F0F8FC] border-b border-slate-200/80 py-10 sm:py-12 md:py-14 lg:py-16 min-h-[380px] sm:min-h-[420px] md:min-h-[460px] flex items-center">
        {/* Doctor & Patient Photo with "Grateful for a Second Chance" quote */}
        <div className="absolute top-0 bottom-0 right-0 w-full sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[54%] pointer-events-none select-none z-0">
          <img
            src="/images/patient-stories-hero-clean.webp"
            alt="Patient recovery and compassionate care at Clinica Cure Hospital"
            className="w-full h-full object-cover object-[center_top] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.25)_8%,rgba(0,0,0,0.85)_20%,black_35%,black_100%)] opacity-35 sm:opacity-50 md:opacity-95 lg:opacity-100"
          />
        </div>

        {/* Seamless Unified Overlay across the section — ensuring text readability on smaller screens */}
        <div className="absolute inset-0 pointer-events-none select-none z-[1] bg-gradient-to-r from-[#F0F8FC] via-[#F0F8FC]/95 via-30% md:via-[#F0F8FC]/75 md:via-42% lg:via-transparent to-transparent" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full">
          {/* Heading & Subtitle Block */}
          <div className="max-w-xl md:max-w-[500px] lg:max-w-xl">
            {/* Tagline */}
            <span className="text-xs sm:text-sm font-bold text-[#0E746D] uppercase tracking-wider block mb-2 sm:mb-2.5">
              REAL PATIENT RECOVERIES
            </span>

            {/* Main Heading */}
            <h1 className="font-display font-semibold text-slate-900 text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] leading-[1.12] tracking-tight">
              Patient Stories &amp; <br />
              <span className="text-[#0E746D]">Testimonials</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
              Behind every surgery, consultation, and treatment at Clinica Cure Hospital is a personal story of trust, resilience, and recovery.
            </p>
          </div>

          {/* 4 Feature Badges in ONE SINGLE ROW with compact spacing */}
          <div className="mt-6 sm:mt-7 pt-4 sm:pt-5 border-t border-slate-200/80 flex flex-wrap sm:flex-nowrap items-center gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 w-fit">
            {/* Badge 1: Real Patients */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-full bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center shrink-0 shadow-2xs">
                <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
              </div>
              <div>
                <div className="font-display font-bold text-xs sm:text-xs lg:text-[13px] text-slate-900 leading-tight whitespace-nowrap">
                  Real Patients
                </div>
                <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                  Real Experiences
                </div>
              </div>
            </div>

            {/* Badge 2: Expert Care */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-full bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center shrink-0 shadow-2xs">
                <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
              </div>
              <div>
                <div className="font-display font-bold text-xs sm:text-xs lg:text-[13px] text-slate-900 leading-tight whitespace-nowrap">
                  Expert Care
                </div>
                <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                  You Can Trust
                </div>
              </div>
            </div>

            {/* Badge 3: Better Health */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-full bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
              </div>
              <div>
                <div className="font-display font-bold text-xs sm:text-xs lg:text-[13px] text-slate-900 leading-tight whitespace-nowrap">
                  Better Health
                </div>
                <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                  Happier Lives
                </div>
              </div>
            </div>

            {/* Badge 4: Stories That */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-full bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center shrink-0 shadow-2xs">
                <Star className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
              </div>
              <div>
                <div className="font-display font-bold text-xs sm:text-xs lg:text-[13px] text-slate-900 leading-tight whitespace-nowrap">
                  Stories That
                </div>
                <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                  Inspire Others
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Stories Section with Hospital Built Around People & Reviews */}
      <PatientStoriesSection showHeading={false} showHospitalSection={true} />

    </div>
  )
}
