import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Heart,
  Microscope,
  Scale,
  Clock,
  Building2,
  ShieldCheck,
  Award,
  Activity,
  Scan,
  Stethoscope,
  ChevronRight,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  CalendarDays,
  Users,
  UserCheck,
  HeartPulse,
  Compass,
  Eye,
  BadgeCheck,
} from 'lucide-react'
import { HOMEPAGE_STATS } from '@/config/constants'
import { siteConfig } from '@/config/site'
import DepartmentsSection from '@/components/home/DepartmentsSection'

export const metadata: Metadata = {
  title: 'About Clinica Cure Hospital | Bariatu, Ranchi',
  description:
    'Discover Clinica Cure Hospital in Bariatu, Ranchi — a premier multi-speciality healthcare institution combining 11+ acres campus, modular OTs, 24x7 ICU, and expert medical faculty.',
}

const HERO_FEATURES = [
  {
    title: 'Multi-Speciality',
    subtitle: 'Hospital',
    icon: Building2,
  },
  {
    title: 'Experienced',
    subtitle: 'Doctors',
    icon: Users,
  },
  {
    title: 'Advanced',
    subtitle: 'Technology',
    icon: Scan,
  },
  {
    title: 'Patient-Centric',
    subtitle: 'Care',
    icon: Heart,
  },
]

const CORE_VALUES = [
  {
    icon: Heart,
    title: 'Patient-First Compassion',
    desc: 'We place patient dignity, comfort, and clinical recovery outcomes at the heart of every diagnosis and treatment pathway.',
    color: 'bg-rose-50 text-rose-600 border-rose-100',
  },
  {
    icon: Microscope,
    title: 'Clinical Precision',
    desc: 'Evidence-based protocols, precision diagnostic imaging, and modular sterile environments for optimal surgical safety.',
    color: 'bg-emerald-50 text-[#0E746D] border-emerald-100',
  },
  {
    icon: Scale,
    title: 'Ethics & Transparency',
    desc: 'Honest clinical counsel, straightforward pricing, and comprehensive cashless insurance & TPA coverage support.',
    color: 'bg-amber-50 text-amber-600 border-amber-100',
  },
  {
    icon: Clock,
    title: '24x7 Critical Readiness',
    desc: 'Always on standby with advanced trauma care, rapid ICU life support, and dedicated emergency doctors in Bariatu.',
    color: 'bg-sky-50 text-sky-600 border-sky-100',
  },
]

const HOSPITAL_FACILITIES = [
  {
    title: 'Modular Operation Theatres',
    subtitle: 'Advanced Surgical Suites',
    desc: 'Equipped with laminar airflow, HEPA filtration, and advanced endoscopic & laparoscopic surgical towers for infection-free procedures.',
    image: '/images/hospital-ot.webp',
    tag: 'Surgical Excellence',
    icon: Building2,
  },
  {
    title: 'Advanced ICU & Critical Care',
    subtitle: 'Round-the-Clock Monitoring',
    desc: 'High-dependency units with dedicated invasive ventilators, multi-channel monitors, and round-the-clock intensivist coverage.',
    image: '/images/hospital-ward.webp',
    tag: '24/7 Life Support',
    icon: Activity,
  },
  {
    title: 'Radiology & Imaging Suite',
    subtitle: 'Diagnostic Precision',
    desc: 'High-resolution digital X-rays, Doppler ultrasonography, and dedicated MRI/CT scanning for prompt and reliable diagnosis.',
    image: '/images/facilities/mri-scanner-suite.jpg',
    tag: 'Fast Diagnostic Reports',
    icon: Scan,
  },
]

const ABOUT_CTA_HIGHLIGHTS = [
  '24x7 Emergency & Critical Care',
  'Cashless Insurance & TPA Desk',
  'Experienced Senior Specialists',
  'Minimal OPD Consultation Waiting',
  'Modular Infection-Free OTs',
  'In-House Diagnostics & Radiology',
  'Zero Hidden Treatment Charges',
  'Compassionate Post-Care Follow-up',
]

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ── 1. HERO SECTION: FULL BACKGROUND IMAGE (CONSISTENT WITH DOCTORS & PATIENT STORIES) ── */}
      <section className="relative overflow-hidden bg-[#F0F8FC] border-b border-slate-200/80 py-6 sm:py-8 md:py-9 lg:py-16 min-h-[380px] sm:min-h-[420px] md:min-h-[460px] lg:min-h-[520px] flex items-center">
        {/* Full Right-anchored Hospital Building Image with smooth fade mask */}
        <div className="absolute top-0 bottom-0 right-0 w-full sm:w-[85%] md:w-[72%] lg:w-[64%] xl:w-[58%] 2xl:w-[54%] pointer-events-none select-none z-0">
          <img
            src="/images/contact-hero-hospital.webp"
            alt="Clinica Cure Hospital Building in Bariatu, Ranchi"
            className="w-full h-full object-cover object-right lg:object-[center_right] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.25)_8%,rgba(0,0,0,0.85)_20%,black_35%,black_100%)] opacity-35 sm:opacity-50 md:opacity-95 lg:opacity-100"
          />
        </div>

        {/* Seamless Unified Overlay across the section — ensuring text readability on all viewports */}
        <div className="absolute inset-0 pointer-events-none select-none z-[1] bg-gradient-to-r from-[#F0F8FC] via-[#F0F8FC]/95 via-35% md:via-[#F0F8FC]/80 md:via-48% lg:via-[#F0F8FC]/35 lg:via-58% to-transparent" />



        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="max-w-xl md:max-w-[500px] lg:max-w-xl">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-xs text-slate-500 mb-3 sm:mb-4"
            >
              <Link
                href="/"
                className="hover:text-[#0E746D] transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">About Us</span>
            </nav>

            {/* Tag */}
            <span className="text-xs sm:text-[13px] font-bold text-[#0E746D] uppercase tracking-wider block mb-2 sm:mb-2.5">
              OUR STORY
            </span>

            {/* Main Heading */}
            <h1 className="font-display font-bold text-slate-900 text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] leading-[1.12] tracking-tight">
              Compassionate Care. <br />
              <span className="text-[#0E746D]">A Healthier Tomorrow.</span>
            </h1>

            {/* Description */}
            <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
              At Clinica Cure Hospital, we combine advanced medical technology, experienced
              specialists, and a patient-first approach to provide comprehensive, compassionate care
              for you and your family.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-3.5">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0E746D] hover:bg-[#0b5c57] text-white font-display font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#0E746D]/20 active:scale-[0.98] cursor-pointer"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/departments"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-200 bg-white hover:border-[#0E746D] hover:text-[#0E746D] text-slate-700 font-display font-semibold text-xs sm:text-sm transition-all shadow-2xs hover:shadow-xs cursor-pointer"
              >
                <span>Explore Our Departments</span>
              </Link>
            </div>

            {/* 4 Feature Badges in a Single Row (Grid on mobile, flex on desktop) */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 grid grid-cols-4 gap-1.5 sm:gap-6 md:gap-7 lg:gap-8 w-full sm:w-fit max-w-lg sm:max-w-none">
              {HERO_FEATURES.map((item) => {
                const IconComp = item.icon
                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center text-center group min-w-0"
                  >
                    <div className="w-9.5 h-9.5 sm:w-11 sm:h-11 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-1.5 sm:mb-2 shadow-2xs border border-[#26B09A]/20 group-hover:scale-105 transition-transform shrink-0">
                      <IconComp className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#0E746D]" strokeWidth={2} />
                    </div>
                    <div className="font-display font-bold text-[10px] sm:text-xs text-slate-900 leading-tight sm:whitespace-nowrap text-center">
                      {item.title}
                    </div>
                    <div className="text-[9.5px] sm:text-[11px] text-slate-500 font-medium leading-tight mt-0.5 sm:whitespace-nowrap text-center">
                      {item.subtitle}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Hospital Story & Medical Integrity Section ── */}
      <section className="py-8 sm:py-7 md:py-8 lg:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          {/* Real Hospital Showcase Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-slate-200/50 border border-[#DDEAE7] relative group">
              <img
                src="/images/hospital-reception.webp"
                alt="Clinica Cure Hospital Campus & Reception in Ranchi"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Story Narrative */}
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E746D] uppercase tracking-wider mb-2">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Our Heritage &amp; Commitment</span>
            </div>

            <h2 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Serving Ranchi and Jharkhand with Trust and Clinical Precision
            </h2>

            <div className="w-14 h-1 bg-[#0E746D] my-4 rounded-full" />

            <div className="space-y-4 text-slate-600 text-[14px] sm:text-sm leading-relaxed">
              <p>
                Clinica Cure was founded with a dedicated mission: to bring advanced multi-speciality
                tertiary care within easy reach of every family in Ranchi and surrounding regions.
                Over the years, our hospital has evolved into a premier healthcare destination
                renowned for its clinical precision, ethical care, and compassionate bedside approach.
              </p>
              <p>
                Spread across an expansive 11-acre campus in Bariatu, our hospital complex incorporates
                a modern 3-storey main facility, modular operating theatres, an advanced Intensive Care
                Unit (ICU), dedicated emergency and trauma centres, and comprehensive radiology imaging.
              </p>
              <p>
                Our multidisciplinary medical board brings together verified senior consultants across
                General &amp; Laparoscopic Surgery, Critical Care, Neurosurgery, Orthopaedics,
                Cardiology, Gynaecology, Paediatrics, and Diagnostic Imaging.
              </p>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-5 border-t border-[#DDEAE7]">
              <div className="flex items-center gap-2.5 text-[14px] sm:text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#0E746D] shrink-0" />
                <span>24x7 Critical Care &amp; Trauma Unit</span>
              </div>
              <div className="flex items-center gap-2.5 text-[14px] sm:text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#0E746D] shrink-0" />
                <span>30+ Cashless TPA &amp; Insurance Partners</span>
              </div>
              <div className="flex items-center gap-2.5 text-[14px] sm:text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#0E746D] shrink-0" />
                <span>Verified Senior Medical Faculty</span>
              </div>
              <div className="flex items-center gap-2.5 text-[14px] sm:text-xs font-semibold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-[#0E746D] shrink-0" />
                <span>Modern Diagnostic Imaging In-House</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Why Choose Clinica Cure: Care Beyond Treatment ── */}
      <section className="py-8 sm:py-7 md:py-8 lg:py-18 bg-[#F4F9F8]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-[1fr_2.2fr] xl:grid-cols-[1fr_2.4fr] gap-8 lg:gap-12 xl:gap-14 items-center">
            {/* Left Content */}
            <div className="max-w-xl">
              <span className="text-xs sm:text-[13px] font-bold text-[#0E746D] uppercase tracking-wider block mb-2 sm:mb-2.5">
                WHY CHOOSE CLINICA CURE
              </span>
              <h2 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-[34px] leading-tight tracking-tight">
                Care Beyond Treatment
              </h2>
              <p className="mt-3 text-[14px] sm:text-sm text-slate-600 leading-relaxed">
                We go beyond just treating illnesses. Our focus is on overall well-being, combining
                medical expertise, technology, and empathy to deliver the best outcomes.
              </p>
            </div>

            {/* Right 4 Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-6 lg:gap-7">
              {/* Feature 1: Expert Specialists */}
              <div className="flex flex-col items-start group">
                <div className="w-12 h-12 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-3.5 shadow-2xs border border-[#26B09A]/20 group-hover:scale-105 transition-transform">
                  <UserCheck className="w-6 h-6 text-[#0E746D]" strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Expert Specialists
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Experienced doctors across multiple specialities
                </p>
              </div>

              {/* Feature 2: Modern Infrastructure */}
              <div className="flex flex-col items-start group">
                <div className="w-12 h-12 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-3.5 shadow-2xs border border-[#26B09A]/20 group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6 text-[#0E746D]" strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Modern Infrastructure
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Advanced technology for accurate diagnosis and treatment
                </p>
              </div>

              {/* Feature 3: Personalised Care */}
              <div className="flex flex-col items-start group">
                <div className="w-12 h-12 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-3.5 shadow-2xs border border-[#26B09A]/20 group-hover:scale-105 transition-transform">
                  <HeartPulse className="w-6 h-6 text-[#0E746D]" strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Personalised Care
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Treatment plans focused on your unique needs
                </p>
              </div>

              {/* Feature 4: Family-Friendly Environment */}
              <div className="flex flex-col items-start group">
                <div className="w-12 h-12 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-3.5 shadow-2xs border border-[#26B09A]/20 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 text-[#0E746D]" strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  Family-Friendly Environment
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  A safe, comfortable, and supportive atmosphere
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Medical Specialities / Departments (From Home Page) ── */}
      <DepartmentsSection />

      {/* ── 6. A Hospital Built Around People (Hospital Overview & Metrics) ── */}
      <section className="py-7 sm:py-6 md:py-7 lg:py-4 relative overflow-hidden">
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
              {/* Tagline Badge */}
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

      {/* ── 7. Call To Action (Care & Appointment Booking) ── */}
      <section className="py-8 sm:py-7 md:py-8 lg:py-16 bg-white border-t border-[#DDEAE7]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#0B5C56] via-[#0E746D] to-[#074742] text-white p-5 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
            {/* Background Texture Accents */}
            <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-10 -top-10 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-200 block">
                  PRIORITISE YOUR HEALTH
                </span>
                <h2 className="font-display font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl mt-2 leading-tight">
                  Ready to Consult Our Medical Specialists?
                </h2>
                <p className="mt-3 text-[14px] sm:text-sm text-white/85 leading-relaxed">
                  Book a confirmed consultation with our senior doctors or reach our round-the-clock emergency desk. At Clinica Cure, compassionate care is always within your reach.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/book-appointment"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#0B5C56] hover:bg-slate-100 font-display font-bold text-xs sm:text-sm transition-all shadow-md active:scale-[0.98]"
                  >
                    <CalendarDays className="w-4 h-4 text-[#0B5C56]" />
                    <span>Book Consultation</span>
                  </Link>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/20 text-white font-display font-semibold text-xs sm:text-sm border border-white/25 transition-all"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-300" />
                    <span>Call Helpline: {siteConfig.phone}</span>
                  </a>
                </div>
              </div>

              {/* Patient Trust & Care Highlights Badges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ABOUT_CTA_HIGHLIGHTS.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 text-white text-xs font-semibold hover:bg-white/15 transition-colors"
                  >
                    <BadgeCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                    <span className="truncate">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
