import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Calendar,
  ChevronRight,
  Phone,
  ArrowRight,
  Smile,
  Activity,
  Zap,
  Baby,
  HeartPulse,
  Eye,
  Users,
  Scissors,
  Clock,
  ShieldCheck,
  Award,
  Stethoscope,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import { SEED_DOCTORS, CORE_PARTNER_SLUGS } from '@/config/constants'
import DoctorCard from '@/components/doctors/DoctorCard'

export const metadata: Metadata = {
  title: 'Our Core Partners | Clinica Cure Hospital Ranchi',
  description:
    'Meet the core partner doctors and specialists at Clinica Cure Hospital, Ranchi. Experienced surgeons and physicians delivering comprehensive, patient-centric healthcare.',
}

// 8 Main Services matching reference design
const CORE_SERVICES = [
  {
    name: 'Dental Surgery',
    icon: Smile,
    href: '/departments/dental-surgery',
  },
  {
    name: 'Neurosurgery and Spine Surgery',
    icon: Activity,
    href: '/departments/neurology-neurosurgery',
  },
  {
    name: 'Laser Surgery for Piles/Fistula',
    icon: Zap,
    href: '/departments/general-laparoscopic-surgery',
  },
  {
    name: 'Neonatal and Child Care',
    icon: Baby,
    href: '/departments/pediatrics-neonatology',
  },
  {
    name: 'Preventive Health Checkup',
    icon: HeartPulse,
    href: '/services',
  },
  {
    name: 'Ophthalmology',
    icon: Eye,
    href: '/departments/ophthalmology',
  },
  {
    name: 'Obstetrics and Gynaecology',
    icon: Users,
    href: '/departments/obstetrics-gynaecology',
  },
  {
    name: 'General and Laparoscopic Surgery',
    icon: Scissors,
    href: '/departments/general-laparoscopic-surgery',
  },
]

export default function CorePartnersPage() {
  // Retrieve the 4 core partner doctors in exact order
  const coreDoctors = CORE_PARTNER_SLUGS.map((slug) =>
    SEED_DOCTORS.find((doc) => doc.slug === slug)
  ).filter(Boolean) as (typeof SEED_DOCTORS)[number][]

  return (
    <div className="bg-[#F8FAF9] min-h-screen">
      {/* ── 1. HERO SECTION: MEET OUR CORE PARTNERS ── */}
      <section className="relative overflow-hidden bg-[#F0F8FC] border-b border-slate-200/80 py-12 sm:py-8 md:py-9 lg:py-20 min-h-[380px] sm:min-h-[380px] md:min-h-[400px] lg:min-h-[480px] flex items-center">
        {/* Doctor Team Image — anchored to the complete right edge of the screen, starting right beside the text with zero right-side gap */}
        <div className="absolute top-0 bottom-0 right-0 w-full sm:w-[85%] md:w-[72%] lg:w-[66%] xl:w-[62%] 2xl:w-[58%] pointer-events-none select-none z-0">
          <img
            src="/images/core-partners-team.webp"
            alt="Clinica Cure Core Partners Doctor Team"
            className="w-full h-full object-cover object-[20%_top] md:object-[26%_top] lg:object-[30%_top] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.25)_8%,rgba(0,0,0,0.85)_18%,black_30%,black_100%)] opacity-35 sm:opacity-50 md:opacity-95 lg:opacity-100"
          />
        </div>

        {/* Seamless Unified Overlay across the section — subtle gradient ensuring text readability */}
        <div className="absolute inset-0 pointer-events-none select-none z-[1] bg-gradient-to-r from-[#F0F8FC] via-[#F0F8FC]/95 via-30% md:via-[#F0F8FC]/75 md:via-42% lg:via-transparent to-transparent" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="max-w-xl md:max-w-[480px] lg:max-w-xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 sm:mb-4">
              <Link href="/" className="hover:text-[#0E746D] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-700 font-medium">Core Partners</span>
            </div>

            {/* Category Tagline */}
            <span className="text-xs sm:text-sm font-bold text-[#0E746D] uppercase tracking-wider block mb-2 sm:mb-2.5">
              OUR CORE PARTNERS
            </span>

            {/* Heading */}
            <h1 className="font-display font-semibold text-slate-900 text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] leading-[1.15] tracking-tight">
              Meet Our <br className="hidden sm:inline" />
              <span className="text-[#0E746D]">Core Partners</span>
            </h1>

            {/* Description */}
            <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
              Our core partners are experienced and dedicated doctors who work together to provide the best possible care for our patients. Their expertise, collaboration and patient-centric approach are the foundation of Clinica Cure.
            </p>

            {/* Key highlights / quick trust stats */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-slate-200/80">
              <div className="flex items-center gap-2 text-[14px] sm:text-sm text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#0E746D]" />
                <span>Senior Consultants</span>
              </div>
              <div className="flex items-center gap-2 text-[14px] sm:text-sm text-slate-700 font-medium">
                <Award className="w-4 h-4 text-[#0E746D]" />
                <span>Gold Medalist Surgeons</span>
              </div>
              <div className="flex items-center gap-2 text-[14px] sm:text-sm text-slate-700 font-medium">
                <Clock className="w-4 h-4 text-[#0E746D]" />
                <span>24x7 Critical Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DOCTOR PROFILES SECTION: A TEAM OF DEDICATED SPECIALISTS ── */}
      <section className="py-12 sm:py-7 md:py-8 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs sm:text-sm font-bold text-[#0E746D] uppercase tracking-wider block">
              OUR CORE PARTNERS
            </span>
            <h2 className="mt-2 font-display font-semibold text-slate-900 text-2xl sm:text-3xl md:text-[34px] lg:text-4xl leading-tight">
              A Team of Dedicated Specialists
            </h2>
            <p className="mt-3 text-[14px] sm:text-sm md:text-base text-slate-600 leading-relaxed">
              Our core partners bring diverse expertise, working together to deliver comprehensive and high-quality care for every patient.
            </p>
          </div>

          {/* 4 Doctor Cards Grid — Core Partners Card Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-4.5">
            {coreDoctors.map((doc) => (
              <DoctorCard key={doc.slug} doctor={doc} variant="core-partner" />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. A HOSPITAL BUILT AROUND PEOPLE SECTION (FROM CONTACT PAGE) ── */}
      <section className="py-8 sm:py-6 md:py-7 lg:py-10 bg-[#F8FAF9] border-t border-[#DDEAE7] relative overflow-hidden">
        {/* Light Faded Clinica Cure Favicon Watermark on Right Side Edge */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-8 sm:-right-12 md:-right-8 lg:-right-6 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 pointer-events-none select-none z-0 opacity-[0.04]">
          <img
            src="/images/icons/favicon-clinicacure.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid md:grid-cols-[290px_1fr] lg:grid-cols-[360px_1fr] xl:grid-cols-[440px_1fr] gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Side: 3 Hospital Images (Same Widths, Small Gap) */}
            <div className="w-full max-w-[440px] md:max-w-none mx-auto lg:mx-0 space-y-2.5">
              {/* Top Reception Image (Spans Full Width to Match Bottom Row) */}
              <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-100 aspect-[16/9] group">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                  alt="Clinica Cure Hospital Modern Reception and Waiting Area"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Bottom Row: 2 Images (OT & Treatment Room) with small gap */}
              <div className="w-full grid grid-cols-2 gap-2.5">
                <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-100 aspect-[4/3] group">
                  <img
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
                    alt="Clinica Cure Inpatient Ward and Patient Beds"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-100 aspect-[4/3] group">
                  <img
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80"
                    alt="Clinica Cure Advanced Operation Theatre and Surgeons"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Hospital Info & 4 Metrics with Lucide Icons */}
            <div className="flex flex-col justify-center">
              {/* Tagline Badge (Dot removed) */}
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E8F7F4] text-[#0E746D] text-[11px] font-bold tracking-wider uppercase mb-2 w-fit">
                <span>Clinica Cure Hospital</span>
              </div>

              {/* Main Heading */}
              <h2 className="font-display font-semibold text-slate-900 text-2xl sm:text-3xl md:text-[28px] lg:text-[34px] xl:text-[38px] leading-tight">
                A Hospital Built Around People
              </h2>

              {/* Subtext */}
              <p className="mt-2.5 text-[14px] sm:text-sm md:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl">
                Modern infrastructure, advanced technology and a compassionate team — all under one roof at Bariatu, Ranchi.
              </p>

              {/* 4 Stats Grid with Lucide Icons & Dividers */}
              <div className="mt-6 sm:mt-7 md:mt-6 lg:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-slate-200/90">
                {/* Stat 1: Happy Patients */}
                <div className="flex flex-col sm:pr-3 md:pr-2 lg:pr-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                    <Users className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                  </div>
                  <span className="font-display font-bold text-xl sm:text-2xl md:text-[22px] lg:text-[28px] text-[#0E746D] leading-none">
                    50,000+
                  </span>
                  <span className="mt-1.5 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                    Happy Patients
                  </span>
                </div>

                {/* Stat 2: Medical Specialities */}
                <div className="flex flex-col sm:px-3 md:px-2 lg:px-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                    <Stethoscope className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                  </div>
                  <span className="font-display font-bold text-xl sm:text-2xl md:text-[22px] lg:text-[28px] text-[#0E746D] leading-none">
                    25+
                  </span>
                  <span className="mt-1.5 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                    Medical Specialities
                  </span>
                </div>

                {/* Stat 3: Successful Surgeries */}
                <div className="flex flex-col sm:px-3 md:px-2 lg:px-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                    <Activity className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                  </div>
                  <span className="font-display font-bold text-xl sm:text-2xl md:text-[22px] lg:text-[28px] text-[#0E746D] leading-none">
                    7,500+
                  </span>
                  <span className="mt-1.5 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                    Successful Surgeries
                  </span>
                </div>

                {/* Stat 4: Years of Care */}
                <div className="flex flex-col sm:pl-3 md:pl-2 lg:pl-6">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                    <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                  </div>
                  <span className="font-display font-bold text-xl sm:text-2xl md:text-[22px] lg:text-[28px] text-[#0E746D] leading-none">
                    8+
                  </span>
                  <span className="mt-1.5 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                    Years of Care
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
