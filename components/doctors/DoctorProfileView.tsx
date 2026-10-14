'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CalendarDays,
  Phone,
  Clock,
  Award,
  Stethoscope,
  ArrowRight,
  UserCheck,
  Activity,
  ScanLine,
  Scan,
  FileText,
  Heart,
  BriefcaseMedical,
  Bone,
  ClipboardCheck,
  Users,
  Quote,
  CheckCircle2,
  Info,
  HelpCircle,
  Building2,
  BadgeCheck,
} from 'lucide-react'
import { DoctorAppointmentSidebar } from '@/components/doctors/DoctorAppointmentSidebar'
import { DoctorTabsNav } from '@/components/doctors/DoctorTabsNav'
import { DoctorFaqAccordion } from '@/components/doctors/DoctorFaqAccordion'
import DepartmentDoctorCard from '@/components/departments/DepartmentDoctorCard'
import { DoctorRecord, DoctorExpertiseItem, DoctorScheduleItem } from '@/app/admin/types'
import { departments as navDepartments } from '@/config/navigation'
import { getDepartmentData } from '@/config/department-details'

interface DepartmentInfo {
  name: string
  slug: string
  image_url?: string
}

interface DoctorProfileViewProps {
  initialDoctor: any
  allDoctors: any[]
  department: DepartmentInfo | null
}

export function DoctorProfileView({
  initialDoctor,
  allDoctors,
  department,
}: DoctorProfileViewProps) {
  const [doctor, setDoctor] = useState<DoctorRecord>(initialDoctor)
  const [doctorRoster, setDoctorRoster] = useState<any[]>(allDoctors)

  // Hydrate client-side from admin local storage if customized
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('clinicacure_admin_doctors')
      if (cached) {
        try {
          const list: DoctorRecord[] = JSON.parse(cached)
          if (Array.isArray(list) && list.length > 0) {
            const map = new Map<string, any>()
            allDoctors.forEach((d) => map.set(d.slug, d))
            list.forEach((d) => map.set(d.slug, d))
            setDoctorRoster(Array.from(map.values()))

            const found = list.find(
              (d) => d.slug === initialDoctor.slug || d.id === initialDoctor.id
            )
            if (found) {
              setDoctor(found)
            }
          }
        } catch {}
      }
    }
  }, [initialDoctor.slug, initialDoctor.id, allDoctors])

  // Clean qualifications for meta line
  const cleanQualifications = (doctor.qualifications || []).filter(
    (q: string) => !q.toLowerCase().includes('gold medalist')
  )

  // Areas of expertise list (falls back to specializations or default)
  const expertiseList: DoctorExpertiseItem[] =
    doctor.expertise && doctor.expertise.length > 0
      ? doctor.expertise
      : (initialDoctor.specializations || []).length > 0
      ? initialDoctor.specializations.map((spec: string) => ({
          title: spec,
          description: `Specialized clinical evaluation, diagnostic interpretation and patient care.`,
        }))
      : [
          { title: 'Clinical Diagnosis', description: 'Comprehensive patient assessment and clinical diagnostic evaluation.' },
          { title: 'Specialist Consultation', description: 'Evidence-based therapeutic planning and ongoing management.' },
          { title: 'Advanced Procedural Care', description: 'Modern interventions with minimal patient discomfort.' },
          { title: 'Preventive Follow-up', description: 'Long-term health monitoring and preventive counseling.' },
        ]

  // Schedule sessions table (falls back to default schedule, showing active consultation days)
  const rawSchedule =
    doctor.schedule_sessions && doctor.schedule_sessions.length > 0
      ? doctor.schedule_sessions
      : [
          { day: 'Monday – Friday', timings: '10:00 AM – 4:00 PM', type: 'Regular OPD Consultation', status: 'Available' as const },
          { day: 'Saturday', timings: '10:00 AM – 2:00 PM', type: 'Specialist & Review Clinic', status: 'Available' as const },
        ]
  const scheduleSessions: DoctorScheduleItem[] = rawSchedule.filter((s) => s.status !== 'Unavailable')

  // Dynamic department resolution for this doctor
  const activeDeptSlug =
    doctor.department_slug ||
    (doctor.departments && doctor.departments[0]) ||
    initialDoctor.department_slug ||
    initialDoctor.departments?.[0] ||
    department?.slug ||
    'general-medicine'

  const matchingNavDept = navDepartments.find(
    (d) =>
      d.slug.toLowerCase() === activeDeptSlug.toLowerCase() ||
      d.aliases?.some((a) => a.toLowerCase() === activeDeptSlug.toLowerCase()) ||
      (doctor.department_name && d.name.toLowerCase() === doctor.department_name.toLowerCase())
  )

  const departmentName =
    matchingNavDept?.name ||
    doctor.department_name ||
    department?.name ||
    'Hospital Medicine'

  const departmentSlug =
    matchingNavDept?.slug ||
    doctor.department_slug ||
    department?.slug ||
    'general-medicine'

  // Filter Related Doctors strictly in the same department
  const deptSlugSet = new Set<string>()
  if (doctor.department_slug) deptSlugSet.add(doctor.department_slug.toLowerCase().trim())
  if (doctor.departments && Array.isArray(doctor.departments)) {
    doctor.departments.forEach((s: string) => s && deptSlugSet.add(s.toLowerCase().trim()))
  }
  if (initialDoctor.department_slug) deptSlugSet.add(initialDoctor.department_slug.toLowerCase().trim())
  if (initialDoctor.departments && Array.isArray(initialDoctor.departments)) {
    initialDoctor.departments.forEach((s: string) => s && deptSlugSet.add(s.toLowerCase().trim()))
  }
  if (department?.slug) deptSlugSet.add(department.slug.toLowerCase().trim())
  if (departmentSlug) deptSlugSet.add(departmentSlug.toLowerCase().trim())

  navDepartments.forEach((d) => {
    const isMatched =
      deptSlugSet.has(d.slug.toLowerCase()) ||
      d.aliases?.some((a) => deptSlugSet.has(a.toLowerCase()))
    if (isMatched) {
      deptSlugSet.add(d.slug.toLowerCase())
      d.aliases?.forEach((a) => deptSlugSet.add(a.toLowerCase()))
    }
  })

  const relatedDoctors = doctorRoster
    .filter((d) => {
      if (d.slug === doctor.slug) return false
      if (d.id && doctor.id && d.id === doctor.id) return false
      if (d.is_active === false) return false

      if (d.department_slug && deptSlugSet.has(d.department_slug.toLowerCase().trim())) {
        return true
      }
      if (
        Array.isArray(d.departments) &&
        d.departments.some((s: string) => s && deptSlugSet.has(s.toLowerCase().trim()))
      ) {
        return true
      }
      if (
        d.department_name &&
        departmentName &&
        d.department_name.toLowerCase().trim() === departmentName.toLowerCase().trim()
      ) {
        return true
      }
      return false
    })
    .slice(0, 4)

  // FAQs
  const faqs =
    doctor.faqs && doctor.faqs.length > 0
      ? doctor.faqs.map((f) => ({ question: f.question, answer: f.answer }))
      : undefined

  return (
    <div className="relative bg-white min-h-screen text-slate-800 overflow-x-hidden">
      {/* ── Top Hero Pattern Background Band ── */}
      <div className="absolute top-0 inset-x-0 h-[870px] sm:h-[720px] md:h-[560px] lg:h-[485px] bg-[#F4F9F8] border-b border-[#DDEAE7] pointer-events-none -z-0 overflow-hidden" />

      {/* ── Main Container ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-6"
        >
          <Link href="/" className="hover:text-[#0E746D] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-[#0E746D] transition-colors">
            Doctors
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{doctor.name}</span>
        </nav>

        {/* ── Two Column Master Layout ── */}
        <div className="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: HERO, TABS, ABOUT, EXPERTISE, SCHEDULE, RELATED DOCTORS, FAQS, CTA */}
          <div className="min-w-0">
            {/* 1. Doctor Profile Hero */}
            <div className="grid md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">
              {/* Doctor Portrait */}
              <div className="relative">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-[260px] sm:h-[320px] md:h-auto w-full md:aspect-[4/5] bg-white border-2 border-white shadow-md relative">
                  <img
                    src={
                      doctor.profile_image ||
                      (initialDoctor.gender === 'Female'
                        ? '/images/doctors/doctor-female.svg'
                        : '/images/doctors/doctor-male.svg')
                    }
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Doctor Details */}
              <div className="flex flex-col justify-between pt-1">
                <div>
                  {/* Pills: Department & Seniority Badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E746D] bg-[#EAF7F4] border border-[#26B09A]/25 px-3 py-1 rounded-full">
                      <Stethoscope className="w-3.5 h-3.5 text-[#0E746D]" />
                      <span>{departmentName}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E746D] bg-[#EAF7F4] border border-[#26B09A]/25 px-3 py-1 rounded-full">
                      <UserCheck className="w-3.5 h-3.5 text-[#0E746D]" />
                      <span>{doctor.seniority_badge || 'Senior Consultant'}</span>
                    </span>
                  </div>

                  {/* Doctor Name */}
                  <h1 className="font-display font-bold text-slate-900 text-3xl sm:text-4xl lg:text-[40px] leading-tight tracking-tight mt-1">
                    {doctor.name}
                  </h1>

                  {/* Designation */}
                  <p className="mt-1 text-base sm:text-lg font-semibold text-[#0E746D]">
                    {doctor.designation}
                  </p>

                  {/* Meta Line */}
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium mt-2">
                    <span>{doctor.seniority_badge || 'Senior Consultant'}</span>
                    {cleanQualifications.length > 0 && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span>{cleanQualifications.join(', ')}</span>
                      </>
                    )}
                    {doctor.qualifications?.some((q: string) => q.toLowerCase().includes('gold medalist')) && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="text-[#0E746D] font-semibold">Gold Medalist</span>
                      </>
                    )}
                  </div>

                  {/* Hero Bio Summary */}
                  <p className="text-[14px] sm:text-sm text-slate-600 mt-3.5 leading-relaxed max-w-2xl">
                    {doctor.short_bio ||
                      `${doctor.name} is a dedicated ${doctor.designation} at Clinica Cure Hospital, Ranchi. Known for clinical precision, patient-first care, and commitment to delivering the highest quality medical outcomes.`}
                  </p>
                </div>

                {/* 4 Highlight Metric Badges (Dynamic Title & Subtitle) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {((doctor.metric_badges && doctor.metric_badges.length === 4)
                    ? doctor.metric_badges
                    : [
                        { title: doctor.experience_years || '10+ Years', subtitle: 'Years of Experience' },
                        { title: doctor.procedures_count || '5,000+', subtitle: 'Procedures Done' },
                        { title: doctor.expertise_highlight || 'Advanced Clinical Expertise', subtitle: 'Clinical Focus' },
                        { title: doctor.care_approach || 'Patient-Centric Approach', subtitle: 'Care Philosophy' },
                      ]
                  ).map((badge, idx) => {
                    const icons = [Clock, ScanLine, Award, Heart]
                    const IconComp = icons[idx % icons.length]
                    return (
                      <div key={idx} className="flex flex-col items-center text-center p-2">
                        <div className="w-9 h-9 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-1.5">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <span className="font-display font-semibold text-slate-900 text-xs sm:text-sm">
                          {badge.title}
                        </span>
                        <span className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                          {badge.subtitle}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* 2. Navigation Tabs Bar */}
            <div className="mt-4 sm:mt-8">
              <DoctorTabsNav />
            </div>

            {/* Content Sections Below Tabs */}
            <div className="space-y-6 sm:space-y-8 mt-3 sm:mt-6">
              {/* 3. About Doctor Section */}
              <section
                id="overview"
                className="bg-white rounded-3xl border border-[#DDEAE7] p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center">
                    <Stethoscope className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl">
                    About {doctor.name}
                  </h2>
                </div>

                <div className="space-y-4 text-[14px] sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-900 font-semibold">{doctor.name}</strong> is a dedicated{' '}
                    <span className="text-[#0E746D] font-medium">{doctor.designation}</span> at Clinica Cure Hospital, Bariatu, Ranchi.
                    {doctor.qualifications && doctor.qualifications.length > 0 && (
                      <> Holding qualifications in <strong className="text-slate-800">{doctor.qualifications.join(', ')}</strong>,</>
                    )}
                    {' '}he brings high clinical precision, advanced procedural acumen, and a compassionate bedside approach to patient care.
                  </p>

                  {doctor.bio && (
                    <p className="whitespace-pre-line text-slate-600 leading-relaxed">
                      {doctor.bio}
                    </p>
                  )}

                  {/* Quote Callout Box */}
                  {doctor.quote && (
                    <div className="relative mt-5 p-8 rounded-2xl bg-[#F8FAF9] border-[#0E746D]">
                      <Quote className="w-6 h-6 text-[#0E746D]/20 absolute top-4 left-4 -scale-x-100" />
                      <p className="text-[14px] sm:text-sm font-medium italic text-slate-700 leading-relaxed pl-5">
                        {doctor.quote}
                      </p>
                      <div className="mt-2 pl-5 text-xs font-bold text-slate-900">
                        — {doctor.name}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* 4. Areas of Expertise Section (Dynamic 2-column grid supporting 4, 5, 6+ cards) */}
              <section
                id="expertise"
                className="bg-white rounded-3xl border border-[#DDEAE7] p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center">
                    <BriefcaseMedical className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl">
                      Areas of Expertise
                    </h2>
                  </div>
                </div>
                <p className="text-[14px] sm:text-sm text-slate-500 mt-1 mb-6 ml-12">
                  Specialised clinical treatments and diagnostic services with advanced hospital technology:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {expertiseList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4.5 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] flex items-start gap-3.5 hover:border-[#0E746D]/30 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
                        <BadgeCheck className="w-5 h-5" />
                      </div>
                        <div>
                          <h4 className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                            {item.title}
                          </h4>
                          <p className="text-[13.5px] sm:text-xs text-slate-500 mt-1 leading-snug">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* 5. Consultation Schedule & Timings Table */}
              <section
                id="consultation"
                className="bg-white rounded-3xl border border-[#DDEAE7] p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center">
                      <CalendarDays className="w-4.5 h-4.5" />
                    </div>
                    <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl">
                      Consultation Schedule &amp; Timings
                    </h2>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EAF7F4] text-[#0E746D] border border-[#26B09A]/20">
                    Bariatu, Ranchi Campus
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-xs sm:text-sm text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold border-b border-slate-200">
                        <th className="py-3 px-4 sm:px-6">Day</th>
                        <th className="py-3 px-4 sm:px-6">OPD Timings</th>
                        <th className="py-3 px-4 sm:px-6">Type</th>
                        <th className="py-3 px-4 sm:px-6 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {scheduleSessions.map((row, idx) => {
                        const isAvailable = row.status === 'Available' || row.status === 'On-Duty'
                        return (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                            <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                              {row.day}
                            </td>
                            <td className={`py-3.5 px-4 sm:px-6 ${isAvailable ? '' : 'text-slate-400'}`}>
                              {row.timings}
                            </td>
                            <td className={`py-3.5 px-4 sm:px-6 ${isAvailable ? 'text-slate-600' : 'text-slate-400'}`}>
                              {row.type}
                            </td>
                            <td className="py-3.5 px-4 sm:px-6 text-right">
                              <span
                                className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${
                                  isAvailable
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#0E746D] shrink-0" />
                  <span>Timings may be subject to change. Please confirm while booking your consultation.</span>
                </div>
              </section>

              {/* 6. Related Doctors (Filtered according to department) */}
              <section className="bg-white rounded-3xl border border-[#DDEAE7] p-4 sm:p-6 lg:p-8 shadow-xs">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center">
                      <Users className="w-4.5 h-4.5" />
                    </div>
                    <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl">
                      Related Doctors in {departmentName}
                    </h2>
                  </div>

                  <Link
                    href="/doctors"
                    className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#0E746D] hover:underline shrink-0 pt-1"
                  >
                    <span>View All Doctors</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {relatedDoctors.length > 0 ? (
                  <>
                    <p className="text-[14px] sm:text-sm text-slate-500 mt-1 mb-2 sm:mb-6 ml-12">
                      You may also consult these specialists:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                      {relatedDoctors.map((doc) => (
                        <DepartmentDoctorCard key={doc.slug} doctor={doc} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="p-6 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] text-center space-y-2 mt-4 ml-12">
                    <p className="text-sm font-semibold text-slate-700">
                      {doctor.name} is currently the lead specialist in {departmentName}.
                    </p>
                    <p className="text-xs text-slate-500">
                      You can explore specialists across our other clinical departments.
                    </p>
                    <div className="pt-2">
                      <Link
                        href="/doctors"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0E746D] text-white text-xs font-semibold hover:bg-[#0b5c57] transition-all shadow-xs"
                      >
                        <span>View All Hospital Specialists</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </section>

              {/* 7. Frequently Asked Questions (Dynamic FAQs) */}
              <section
                id="faqs"
                className="bg-white rounded-3xl border border-[#DDEAE7] p-6 sm:p-8 shadow-xs scroll-mt-28"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-9 h-9 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center">
                    <HelpCircle className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl">
                    Frequently Asked Questions
                  </h2>
                </div>
                <p className="text-[14px] sm:text-sm text-slate-500 mt-1 mb-2 ml-12">
                  Find answers to common questions about consultation, procedures and reports.
                </p>

                <DoctorFaqAccordion doctorName={doctor.name} faqs={faqs} />
              </section>

              {/* 8. Bottom Consultation CTA Banner */}
              <section className="rounded-3xl bg-[#F4F9F8] border border-[#C5E8E0] p-6 sm:p-8 overflow-hidden relative shadow-xs">
                <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8 items-center">
                  <div>
                    <span className="text-[11px] font-bold text-[#0E746D] uppercase tracking-wider block">
                      {doctor.cta_banner?.eyebrow || 'Clinica Cure Hospital'}
                    </span>
                    <h3 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl leading-tight mt-1.5">
                      {doctor.cta_banner?.title || `Need a ${departmentName} Consultation?`}
                    </h3>
                    <p className="text-[14px] sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {doctor.cta_banner?.description || `Book an appointment with ${doctor.name} and get accurate, expert clinical care.`}
                    </p>

                    <a
                      href="#book-appointment"
                      className="inline-flex items-center gap-2 mt-5 px-6 py-3.5 rounded-xl bg-[#0E746D] hover:bg-[#0b5c57] text-white font-display font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#0E746D]/15 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Book Appointment</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 pt-5 border-t border-[#0E746D]/15 text-xs text-slate-700">
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E746D]" />
                        <span>Advanced Technology</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <FileText className="w-3.5 h-3.5 text-[#0E746D]" />
                        <span>Expert Diagnosis</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Heart className="w-3.5 h-3.5 text-[#0E746D]" />
                        <span>Patient-Centric Care</span>
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-white/60 border border-white/80 shadow-sm">
                    <img
                      src={
                        doctor.cta_banner?.image ||
                        department?.image_url ||
                        getDepartmentData(departmentSlug, departmentName).aboutImage ||
                        getDepartmentData(departmentSlug, departmentName).heroImage ||
                        '/images/facilities/mri-scanner-suite.jpg'
                      }
                      alt={doctor.cta_banner?.title || `${departmentName} Facility`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY APPOINTMENT SIDEBAR */}
          <DoctorAppointmentSidebar
            doctorName={doctor.name}
            doctorSlug={doctor.slug}
            departmentName={departmentName}
            departmentSlug={departmentSlug}
            scheduleSessions={doctor.schedule_sessions}
          />
        </div>
      </div>
    </div>
  )
}
