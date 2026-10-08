import Link from 'next/link'
import { Clock, ShieldCheck, Users, Building2, Activity, HeartPulse, ChevronRight, type LucideIcon } from 'lucide-react'

const ABOUT_FEATURES: { title: string; desc: string; Icon: LucideIcon }[] = [
  {
    title: '24x7 Emergency & Critical Care',
    desc: 'Always here when you need us',
    Icon: Clock,
  },
  {
    title: 'Comprehensive Multi-speciality Care',
    desc: 'Multiple medical specialties and services under one roof.',
    Icon: ShieldCheck,
  },
  {
    title: 'Experienced & Qualified Specialists',
    desc: 'Skilled medical experts committed to compassionate care.',
    Icon: Users,
  },
  {
    title: 'Modular & Advanced Operation Theatres',
    desc: 'Modern surgical facilities designed for safe and precise procedures.',
    Icon: Building2,
  },
  {
    title: 'Advanced ICU & Life Support',
    desc: 'Specialised critical care with advanced life-support systems.',
    Icon: Activity,
  },
  {
    title: 'Advanced Diagnostic Equipment',
    desc: 'Latest technology supporting accurate and timely diagnosis.',
    Icon: HeartPulse,
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="pt-2 sm:pt-4 md:pt-6 pb-8 sm:pb-10 md:pb-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.1fr_0.9fr] gap-6 sm:gap-6 md:gap-8 lg:gap-10 items-center">
        {/* 1. Real Hospital Patient Consultation Image */}
        <div className="rounded-3xl overflow-hidden aspect-[4/3.8] sm:aspect-[4/4.5] md:aspect-[4/4.2] lg:aspect-[4/5] shadow-[0_12px_36px_-6px_rgba(15,107,94,0.08)] border border-[#e2ece9] lg:sticky lg:top-28 z-10">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
            alt="Doctor consulting patient at Clinica Cure Hospital"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
        </div>

        {/* 2. Central Content Block */}
        <div className="flex flex-col justify-center">
          <p className="text-[#0d9488] font-display font-bold text-xs md:text-sm tracking-wider uppercase">
            ABOUT CLINICA CURE
          </p>
          <div className="w-12 h-0.5 bg-[#0d9488] mt-2 mb-4 sm:mb-5"></div>

          <h2 className="font-display font-semibold text-[#1e293b] text-[22px] sm:text-2xl md:text-[28px] lg:text-[2.2rem] leading-[1.3] lg:leading-[2.85rem] tracking-tight">
            Healthcare built around <span className="text-[#0d9488]">people, expertise</span> and trust.
          </h2>

          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-[15px] lg:text-[15px] text-slate-600 leading-relaxed">
            Clinica Cure Hospital, Bariatu, Ranchi is a leading multi-speciality hospital providing comprehensive medical care with compassion, advanced technology and a patient-first approach.
          </p>
          <p className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-[15px] lg:text-[15px] text-slate-600 leading-relaxed">
            Spread across 11acers, the hospital complex features a 3-storey main building, a dedicated trauma centre, and spacious emergency blocks, designed to provide comprehensive medical care with compassion and advanced technology.
          </p>
          <p className="mt-3 sm:mt-3.5 text-xs sm:text-sm md:text-[15px] lg:text-[15px] text-slate-600 leading-relaxed">
            Our experienced team of doctors, modern infrastructure and advanced facilities ensure that you and your family receive the best possible care, every time.
          </p>

          <Link
            href="/about"
            className="mt-6 sm:mt-7 inline-flex items-center gap-2.5 rounded-xl px-6 sm:px-7 h-11 sm:h-12 font-display font-semibold text-xs sm:text-sm bg-[#0e746d] hover:bg-[#0b5c57] text-white shadow-sm transition-all w-fit"
          >
            <span>Know More About Us</span>
            <ChevronRight className="w-4 h-4" strokeWidth={2.2} />
          </Link>
        </div>

        {/* 3. Key Feature Cards List Column */}
        <div className="bg-white rounded-3xl shadow-[0_12px_36px_-6px_rgba(15,107,94,0.06)] border border-[#e2ece9] overflow-hidden py-4 sm:py-5 sm:col-span-2 lg:col-span-1">
          {ABOUT_FEATURES.map((f, idx) => (
            <div key={f.title}>
              <div className="flex items-center gap-3 lg:gap-3.5 xl:gap-4 py-3 sm:py-3.5 px-4 sm:px-6">
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EEF9F7] flex items-center justify-center text-[#0F6B5E] shrink-0">
                  <f.Icon className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-display font-semibold text-slate-900 text-xs sm:text-sm lg:text-[13px] xl:text-sm leading-snug">
                    {f.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 lg:hidden xl:block">
                    {f.desc}
                  </p>
                </div>
              </div>
              {idx < ABOUT_FEATURES.length - 1 && (
                <div className="mx-4 sm:mx-6 h-px bg-slate-100/80"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
