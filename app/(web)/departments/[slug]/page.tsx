import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  CalendarDays,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
  Microscope,
  HeartPulse,
  MapPin,
  Clock,
  ShieldAlert,
  ArrowRight,
  ChevronRight,
  HelpCircle,
} from 'lucide-react'
import { departments } from '@/config/navigation'
import { SEED_DOCTORS } from '@/config/constants'
import { siteConfig } from '@/config/site'
import DepartmentDoctorsSection from '@/components/departments/DepartmentDoctorsSection'
import DepartmentFaqAccordion from '@/components/departments/DepartmentFaqAccordion'
import {
  getDepartmentData,
  getRelatedDepartmentInfo,
} from '@/config/department-details'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const dept = departments.find((d) => d.slug === slug || d.aliases?.includes(slug))
  if (!dept) return { title: 'Department Not Found' }

  return {
    title: `${dept.name} Department | Clinica Cure Hospital Ranchi`,
    description: `Expert clinical care, OPD consultation and advanced treatment in ${dept.name} at Clinica Cure Hospital, Bariatu, Ranchi. 24x7 emergency and intensive care support.`,
  }
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { slug } = await params
  const dept = departments.find((d) => d.slug === slug || d.aliases?.includes(slug))

  if (!dept) {
    notFound()
  }

  // Curated department data with fallbacks
  const deptData = getDepartmentData(dept.slug, dept.name)

  // Find doctors associated strictly with this department or its aliases (no cross-department fillers)
  const allDeptSlugs = [dept.slug, ...(dept.aliases || [])].map((s) => s.toLowerCase())
  const initialDeptDoctors = SEED_DOCTORS.filter((doc) =>
    doc.departments?.some((d) => allDeptSlugs.includes(d.toLowerCase()))
  )

  // Related departments list
  const relatedSlugs = deptData.relatedSlugs || []
  const relatedDepts = relatedSlugs
    .map((s) => {
      const match = departments.find((d) => d.slug === s || d.aliases?.includes(s))
      if (!match) return null
      const info = getRelatedDepartmentInfo(match.slug, match.name)
      return {
        slug: match.slug,
        name: info.title,
        subtitle: info.subtitle,
        image: info.image,
      }
    })
    .filter(Boolean) as Array<{
      slug: string
      name: string
      subtitle: string
      image: string
    }>

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ── 1. FULL-WIDTH HERO SECTION (OPEN LAYOUT, NO BOXED CONTAINER) ── */}
      <section className="bg-[#F4F9F8] border-b border-[#DDEAE7] pt-4 pb-6 sm:pt-5 sm:pb-7 md:pb-8 lg:pb-14">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-slate-500 mb-6"
          >
            <Link href="/" className="hover:text-[#0E746D] transition-colors">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link href="/departments" className="hover:text-[#0E746D] transition-colors">
              Departments
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-900 font-semibold">{dept.name}</span>
          </nav>

          {/* Hero Open Grid: Left Content + Right Visual */}
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div>
              <span className="inline-block text-[11px] sm:text-xs font-bold text-[#0E746D] bg-[#EAF7F4] px-3.5 py-1 rounded-full uppercase tracking-wider">
                DEPARTMENT
              </span>
              <h1 className="mt-3 font-display font-bold text-slate-900 text-3xl sm:text-4xl lg:text-[46px] leading-[1.14] tracking-tight">
                {dept.name}
              </h1>
              <p className="mt-2.5 text-[#0E746D] font-display font-semibold text-base sm:text-lg lg:text-xl">
                {deptData.subtitle}
              </p>
              <p className="mt-3.5 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed max-w-xl">
                {deptData.heroDesc}
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href={`/book-appointment?department=${dept.slug}`}
                  className="px-6 py-3.5 rounded-xl bg-[#0E746D] hover:bg-[#0b5c57] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all inline-flex items-center gap-2"
                >
                  <span>Book Department Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="px-5 py-3.5 rounded-xl border border-[#D2E7E3] hover:bg-white text-slate-800 font-semibold text-xs sm:text-sm transition-all inline-flex items-center gap-2 bg-white/80"
                >
                  <PhoneCall className="w-4 h-4 text-[#0E746D]" />
                  <span>Talk to Our Team</span>
                </a>
              </div>
            </div>

            {/* Right Visual with Floating 24/7 Badge */}
            <div className="relative mx-auto lg:ml-auto w-full max-w-[540px]">
              <div className="rounded-3xl overflow-hidden aspect-[16/11] relative shadow-md border-2 border-white bg-slate-100">
                <img
                  src={deptData.heroImage}
                  alt={`${dept.name} Consultation`}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

          {/* 4 Pillars Highlights (Open layout with separators, without individual boxes) */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-[#DDEAE7]">
            <div className="flex items-start gap-3.5 lg:px-6 first:lg:pl-0">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                  Preventive &amp; Routine Care
                </h3>
                <p className="text-[13.5px] sm:text-xs text-slate-500 mt-1 leading-snug">
                  Regular check-ups for a healthier tomorrow
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 lg:px-6">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                  Expert Physicians
                </h3>
                <p className="text-[13.5px] sm:text-xs text-slate-500 mt-1 leading-snug">
                  Experienced and compassionate doctors
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 lg:px-6">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
                <Microscope className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                  Advanced Diagnostics
                </h3>
                <p className="text-[13.5px] sm:text-xs text-slate-500 mt-1 leading-snug">
                  Accurate diagnosis with modern technology
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 lg:px-6 last:lg:pr-0">
              <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
                <HeartPulse className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-slate-900 leading-snug">
                  Holistic Treatment
                </h3>
                <p className="text-[13.5px] sm:text-xs text-slate-500 mt-1 leading-snug">
                  Personalised care for long-term wellness
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN BODY SECTION (CRISP WHITE BACKGROUND & TWO-COLUMN LAYOUT) ── */}
      <section className="bg-white py-6 sm:py-7 md:py-8 lg:py-14">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-8 lg:gap-10 items-start">
            {/* ═════════ LEFT MAIN COLUMN ═════════ */}
            <div className="space-y-8 sm:space-y-10 min-w-0">
              {/* 1. About Department Card */}
              <div className="bg-[#F8FAF9] rounded-3xl border border-[#DDEAE7] p-6 sm:p-8 shadow-2xs">
                <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl">
                  About {dept.name}
                </h2>

                <div className="grid md:grid-cols-[1.25fr_1fr] gap-6 items-center mt-4">
                  <div className="space-y-3.5">
                    <p className="text-[14px] sm:text-sm text-slate-600 leading-relaxed">
                      {deptData.aboutDesc1}
                    </p>
                    <p className="text-[14px] sm:text-sm text-slate-600 leading-relaxed">
                      {deptData.aboutDesc2}
                    </p>
                  </div>

                  <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-white border border-slate-100 shadow-2xs">
                    <img
                      src={deptData.aboutImage}
                      alt={`Clinica Cure ${dept.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Our Doctors in Department Section (Dynamic & Live) */}
              <DepartmentDoctorsSection
                departmentName={dept.name}
                departmentSlug={dept.slug}
                aliases={dept.aliases}
                initialDoctors={initialDeptDoctors}
              />

              {/* 3. Conditions We Treat */}
              <div>
                <div className="mb-2">
                  <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl">
                    Conditions We Treat
                  </h2>
                  <div className="w-12 h-1 bg-[#0E746D] mt-2 rounded-full" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6">
                  {deptData.conditions.map((item) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={item.name}
                        className="bg-white rounded-2xl border border-[#DDEAE7] p-3.5 sm:p-4 flex items-center gap-3 hover:border-[#0E746D]/40 hover:shadow-xs transition-all duration-200 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-[#EAF7F4] text-[#0E746D] group-hover:bg-[#0E746D] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-4 h-4" strokeWidth={2} />
                        </div>
                        <span className="font-display font-semibold text-xs sm:text-[13px] text-slate-800 leading-snug group-hover:text-[#0E746D] transition-colors">
                          {item.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* 4. Frequently Asked Questions */}
              <div>
                <div className="mb-2">
                  <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl">
                    Frequently Asked Questions
                  </h2>
                  <div className="w-12 h-1 bg-[#0E746D] mt-2 rounded-full" />
                </div>

                <DepartmentFaqAccordion faqs={deptData.faqs} />
              </div>
            </div>

            {/* ═════════ RIGHT SIDEBAR COLUMN ═════════ */}
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* 1. Book a Consultation Dark Card */}
              <div className="bg-[#0A635B] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="w-5 h-5 text-white/90" />
                  <h3 className="font-display font-bold text-lg text-white">
                    Book a Consultation
                  </h3>
                </div>

                <p className="text-white/80 text-[14px] sm:text-xs mt-1.5 leading-relaxed">
                  Schedule your appointment with our {dept.name} specialists.
                </p>

                {/* Enhanced Book Now Button with Hover Effects */}
                <Link
                  href={`/book-appointment?department=${dept.slug}`}
                  className="w-fit inline-flex sm:w-full sm:flex items-center justify-center gap-2 bg-white hover:bg-[#F0FAF7] text-[#0A635B] hover:text-[#064a44] font-display font-bold text-sm py-3 px-10 sm:py-3.5 sm:px-5 rounded-2xl mt-5 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group/btn"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>

                {/* Prominent Clickable Phone Helpline Banner */}
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="mt-5 pt-5 border-t border-white/15 flex items-center gap-3.5 group/call transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/15 group-hover/call:bg-white text-white group-hover/call:text-[#0A635B] flex items-center justify-center shrink-0 transition-all duration-300 shadow-inner group-hover/call:shadow-xs">
                    <PhoneCall className="w-5 h-5 transition-transform duration-300 group-hover/call:scale-110" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-white/75 text-xs block font-medium">
                      Or call us directly at
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white tracking-wide block leading-tight mt-0.5 group-hover/call:text-[#A7F3D0] transition-colors">
                      {siteConfig.phone}
                    </span>
                  </div>
                </a>
              </div>



              {/* 3. Related Departments Card */}
              <div className="bg-white rounded-3xl border border-[#DDEAE7] p-6 shadow-xs">
                <h3 className="font-display font-bold text-base text-slate-900 mb-4">
                  Related Departments
                </h3>

                <div className="space-y-2.5">
                  {relatedDepts.slice(0, 4).map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/departments/${rel.slug}`}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F4F9F8] transition-colors group"
                    >
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                        <img
                          src={rel.image}
                          alt={rel.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display font-bold text-xs text-slate-800 group-hover:text-[#0E746D] transition-colors truncate">
                          {rel.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {rel.subtitle}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0E746D] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* 4. Not Sure Which Department? Assistance Box */}
              <div className="bg-gradient-to-br from-[#EBF5F3] to-[#F4F9F8] rounded-3xl border border-[#D2E7E3] p-5 sm:p-6 shadow-xs relative overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-white text-[#0E746D] flex items-center justify-center shadow-2xs mb-3.5">
                  <HelpCircle className="w-5 h-5" strokeWidth={2} />
                </div>
                <h4 className="font-display font-bold text-slate-900 text-base leading-snug">
                  Not Sure Which Department?
                </h4>
                <p className="text-[14px] sm:text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Our team can help you find the right specialist for your symptoms and health concerns.
                </p>

                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E746D] hover:bg-[#0b5c57] text-white text-xs font-semibold shadow-xs transition-colors mt-4"
                >
                  <span>Talk to Our Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
