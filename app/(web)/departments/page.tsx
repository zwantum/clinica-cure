import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ShieldCheck,
  Users,
  Award,
  Clock,
  PhoneCall,
  Calendar,
  ArrowRight,
  Heart,
  Stethoscope,
  Activity,
  HelpCircle,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import DepartmentsDirectory from '@/components/departments/DepartmentsDirectory'

export const metadata: Metadata = {
  title: 'Medical Specialities & Clinical Departments | Clinica Cure Hospital Ranchi',
  description:
    'Explore 20+ specialized clinical departments at Clinica Cure Hospital Bariatu Ranchi — Neurosurgery, Joint Replacement, Cardiology, Laparoscopy, Critical Care, Maternity and more.',
}

// Clinical excellence pillars for departments
const CLINICAL_PILLARS = [
  {
    title: 'Multidisciplinary Medical Boards',
    description:
      'Complex surgical and trauma cases are reviewed collaboratively by senior department heads to determine the safest clinical course.',
    icon: Stethoscope,
  },
  {
    title: 'Minimally Invasive Care',
    description:
      'Advanced 4K laparoscopy, keyhole arthroscopy, and endoscopic neurosurgery ensure shorter hospital stays and rapid recovery.',
    icon: Activity,
  },
  {
    title: '24x7 Emergency & Critical Care',
    description:
      'Every major speciality is supported around the clock by our dedicated emergency physicians, intensivists, and modern ICUs.',
    icon: ShieldCheck,
  },
  {
    title: 'Transparent Clinical Practice',
    description:
      'Ethical patient counseling, clear diagnostic explanations, and complete transparency with cashless insurance support.',
    icon: Heart,
  },
]

export default function DepartmentsPage() {
  return (
    <div className="bg-white min-h-screen text-slate-800">
      {/* ── 1. FULL-WIDTH HERO SECTION (Matching Site Standard) ── */}
      <section className="relative overflow-hidden bg-[#F0F8FC] border-b border-slate-200/80 py-6 sm:py-8 md:py-9 lg:py-16 min-h-[320px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[460px] flex items-center">
        {/* Department / Medical Team Hero Image with subtle fade */}
        <div className="absolute top-0 bottom-0 right-0 w-full sm:w-[85%] md:w-[72%] lg:w-[66%] xl:w-[62%] 2xl:w-[58%] pointer-events-none select-none z-0">
          <img
            src="/images/core-partners-team.webp"
            alt="Clinica Cure Medical Specialists Faculty"
            className="w-full h-full object-cover object-[20%_top] md:object-[26%_top] lg:object-[30%_top] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.25)_8%,rgba(0,0,0,0.85)_18%,black_30%,black_100%)] opacity-35 sm:opacity-50 md:opacity-95 lg:opacity-100"
          />
        </div>

        {/* Seamless Unified Overlay across the section */}
        <div className="absolute inset-0 pointer-events-none select-none z-[1] bg-gradient-to-r from-[#F0F8FC] via-[#F0F8FC]/95 via-30% md:via-[#F0F8FC]/75 md:via-42% lg:via-transparent to-transparent" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="max-w-xl md:max-w-[500px] lg:max-w-xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 mb-3 sm:mb-4">
              <Link href="/" className="hover:text-[#0E746D] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-700 font-medium">Departments</span>
            </nav>

            {/* Category Tagline */}
            <span className="text-xs sm:text-sm font-bold text-[#0E746D] uppercase tracking-wider block mb-2 sm:mb-2.5">
              CLINICAL SPECIALITIES &amp; DIVISIONS
            </span>

            {/* Heading */}
            <h1 className="font-display font-semibold text-slate-900 text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] leading-[1.14] tracking-tight">
              Medical
              <span className="text-[#0E746D]"> Specialities</span>
            </h1>

            {/* Description */}
            <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
              From round-the-clock emergency and intensive critical care to advanced laparoscopic surgeries, brain &amp; spine neurosurgery, cardiology, and maternity - discover our multidisciplinary medical departments in Bariatu, Ranchi.
            </p>

            {/* 4 Feature Badges in ONE SINGLE ROW */}
            <div className="mt-6 sm:mt-7 pt-4 sm:pt-5 border-t border-slate-200/80 flex flex-wrap sm:flex-nowrap items-center gap-3.5 sm:gap-4 md:gap-5 lg:gap-6 w-fit">
              {/* Badge 1 */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-full bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-display font-bold text-xs sm:text-xs lg:text-[13px] text-slate-900 leading-tight whitespace-nowrap">
                    20 Divisions
                  </div>
                  <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                    Specialised Care
                  </div>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-full bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center shrink-0 shadow-2xs">
                  <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-display font-bold text-xs sm:text-xs lg:text-[13px] text-slate-900 leading-tight whitespace-nowrap">
                    34+ Doctors
                  </div>
                  <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                    Senior Faculty
                  </div>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-full bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center shrink-0 shadow-2xs">
                  <Award className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-display font-bold text-xs sm:text-xs lg:text-[13px] text-slate-900 leading-tight whitespace-nowrap">
                    Modern OTs
                  </div>
                  <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                    Modular Suites
                  </div>
                </div>
              </div>

              {/* Badge 4 */}
              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 lg:w-9 lg:h-9 rounded-full bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center shrink-0 shadow-2xs">
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-display font-bold text-xs sm:text-xs lg:text-[13px] text-slate-900 leading-tight whitespace-nowrap">
                    24x7 Critical Care
                  </div>
                  <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                    Emergency &amp; ICU
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN DIRECTORY SECTION (Filter Tabs + Search + Cards) ── */}
      <section className="bg-[#F6FBFA] py-6 sm:py-7 md:py-8 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Section Introduction */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider block mb-1">
                EXPLORE BY SPECIALITY
              </span>
              <h2 className="font-display font-semibold text-slate-900 text-2xl sm:text-3xl leading-tight">
                Browse Clinical Departments
              </h2>
              <p className="text-slate-600 text-[14px] sm:text-sm mt-1 max-w-xl">
                Filter by medical division, surgical speciality, or search by specific symptoms and treatments.
              </p>
            </div>
          </div>

          {/* Interactive Client Directory Component */}
          <DepartmentsDirectory />
        </div>
      </section>

      {/* ── 3. CLINICAL EXCELLENCE PILLARS ── */}
      <section className="py-8 sm:py-7 md:py-8 lg:py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#0E746D] uppercase tracking-wider block mb-2">
              WHY CHOOSE CLINICA CURE
            </span>
            <h2 className="font-display font-semibold text-slate-900 text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Hospital Standards Backing Every Speciality
            </h2>
            <p className="mt-3 text-[14px] sm:text-sm md:text-base text-slate-600 leading-relaxed">
              Every medical consultation, diagnostic test, and surgical intervention adheres to strict clinical protocols and empathetic patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLINICAL_PILLARS.map((pillar) => {
              const Icon = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="bg-[#F8FAF9] hover:bg-white rounded-3xl p-6 sm:p-7 border border-[#DDEAE7]/80 hover:border-[#0E746D]/30 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF7F4] text-[#0E746D] group-hover:bg-[#0E746D] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-2xs mb-5">
                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#0E746D] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-[14px] sm:text-sm text-slate-600 leading-relaxed mt-2.5">
                    {pillar.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. NEED HELP CHOOSING A DEPARTMENT BANNER ── */}
      <section className="pb-8 sm:pb-8 md:pb-10 lg:pb-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-r from-[#0E746D] to-[#0A534B] text-white rounded-3xl p-5 sm:p-10 md:p-12 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Glow effect */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#A7F3D0]/10 blur-2xl pointer-events-none" />

            <div className="max-w-2xl relative z-10">
              <span className="text-xs font-bold text-[#A7F3D0] uppercase tracking-wider block mb-2">
                HOSPITAL HELPDESK
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                Not Sure Which Department You Need?
              </h3>
              <p className="text-white/85 text-[14px] sm:text-sm mt-3 leading-relaxed">
                Our patient care coordination team can help evaluate your symptoms and schedule you directly with the right clinical specialist.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
              <Link
                href="/book-appointment"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F0FAF7] text-[#0E746D] font-display font-bold text-xs sm:text-sm shadow-md transition-all inline-flex items-center gap-2 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="px-5 py-3.5 rounded-xl border border-white/30 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Helpline: {siteConfig.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
