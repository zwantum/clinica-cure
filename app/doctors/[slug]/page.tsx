import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  CalendarDays,
  Phone,
  Clock,
  Award,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Building2,
  HelpCircle,
  ArrowRight,
  UserCheck,
  Star,
  Activity,
  ScanLine,
  Scan,
  FileText,
  Monitor,
  Heart,
  BriefcaseMedical,
  Bone,
  ClipboardCheck,
  Users,
  Quote,
  CheckCircle2,
  Info,
} from 'lucide-react'
import { SEED_DOCTORS } from '@/config/constants'
import { departments } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { DoctorAppointmentSidebar } from '@/components/doctors/DoctorAppointmentSidebar'
import { DoctorTabsNav } from '@/components/doctors/DoctorTabsNav'
import { DoctorFaqAccordion } from '@/components/doctors/DoctorFaqAccordion'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const doctor = SEED_DOCTORS.find((d) => d.slug === slug)
  if (!doctor) return { title: 'Doctor Not Found | Clinica Cure Hospital' }

  return {
    title: `${doctor.name} - ${doctor.designation} | Clinica Cure Hospital`,
    description: `Consult ${doctor.name} (${doctor.qualifications.join(
      ', '
    )}), ${doctor.designation} at Clinica Cure Hospital, Bariatu Road, Ranchi.`,
  }
}

export default async function DoctorProfilePage({ params }: PageProps) {
  const { slug } = await params
  const doctor = SEED_DOCTORS.find((d) => d.slug === slug)

  if (!doctor) {
    notFound()
  }

  // Find primary department
  const primaryDeptSlug = doctor.departments[0]
  const departmentObj = departments.find(
    (d) => d.slug === primaryDeptSlug || d.aliases?.includes(primaryDeptSlug)
  )

  // Target related doctors list (exact 4 as shown in the mockup design)
  const relatedSlugs = [
    'dr-syed-altamash',
    'dr-aftab-alam',
    'dr-tarique-jameel-hasan',
    'dr-soniya-bansal',
  ]
  const relatedDoctors = relatedSlugs
    .map((s) => SEED_DOCTORS.find((d) => d.slug === s))
    .filter((d): d is (typeof SEED_DOCTORS)[0] => Boolean(d && d.slug !== doctor.slug))

  // In case the current doctor is one of the 4, add another doctor to maintain 4 cards
  if (relatedDoctors.length < 4) {
    const filler = SEED_DOCTORS.filter(
      (d) => d.slug !== doctor.slug && !relatedDoctors.some((rd) => rd.slug === d.slug)
    ).slice(0, 4 - relatedDoctors.length)
    relatedDoctors.push(...filler)
  }

  // Filter out any duplicate "Gold Medalist" from qualifications to match design
  const cleanQualifications = doctor.qualifications.filter(
    (q) => !q.toLowerCase().includes('gold medalist')
  )

  return (
    <div className="relative bg-white min-h-screen text-slate-800 overflow-x-hidden">
      {/* ── Top Hero Pattern Background Band (Only behind Hero, ends above tabs) ── */}
      <div className="absolute top-0 inset-x-0 h-[770px] sm:h-[680px] md:h-[560px] lg:h-[485px] bg-[#F4F9F8] border-b border-[#DDEAE7] pointer-events-none -z-0 overflow-hidden" />

      {/* ── Main Container (Renders on Top of Hero Band, and on Pure White Below) ── */}
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

        {/* ── Two Column Master Layout (Left: Hero & Content, Right: Sticky Appointment Sidebar) ── */}
        <div className="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] gap-8 lg:gap-10 items-start">
          {/* ═══════════════════════════════════════════════════════════════
              LEFT COLUMN: HERO (OPEN FULL WIDTH), TABS, ABOUT, EXPERTISE,
                           SCHEDULE, REVIEWS, RELATED DOCTORS, FAQS, CTA
             ═══════════════════════════════════════════════════════════════ */}
          <div className="min-w-0">
            {/* ── 1. Doctor Profile Hero (Open Layout, NO Box Container) ── */}
            <div className="grid md:grid-cols-[260px_1fr] lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">
              {/* Doctor Portrait with 10+ Years Floating Badge */}
              <div className="relative">
                <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-white border-2 border-white shadow-md relative">
                  <img
                    src={
                      doctor.profile_image ||
                      (doctor.gender === 'Female'
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
                  {/* Pills: Department & Senior Consultant */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E746D] bg-[#EAF7F4] border border-[#26B09A]/25 px-3 py-1 rounded-full">
                      <Stethoscope className="w-3.5 h-3.5 text-[#0E746D]" />
                      <span>{departmentObj?.name || 'Radiology'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E746D] bg-[#EAF7F4] border border-[#26B09A]/25 px-3 py-1 rounded-full">
                      <UserCheck className="w-3.5 h-3.5 text-[#0E746D]" />
                      <span>Senior Consultant</span>
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
                    <span>Senior Consultant</span>
                    <span className="text-slate-300">•</span>
                    <span>{cleanQualifications.join(', ')}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[#0E746D] font-semibold">Gold Medalist</span>
                  </div>

                  {/* Bio Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-3.5 leading-relaxed max-w-2xl">
                    {doctor.name} is a highly experienced radiologist specialising in advanced
                    diagnostic imaging. He is known for his precision, patient-centric approach
                    and commitment to delivering accurate diagnosis that help guide the right
                    treatment for better outcomes.
                  </p>
                </div>

                {/* 4 Metric Badges in a horizontal row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#DCEBE7] shadow-2xs">
                    <div className="w-9 h-9 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-1.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                      10+
                    </span>
                    <span className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      Years of Experience
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#DCEBE7] shadow-2xs">
                    <div className="w-9 h-9 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-1.5">
                      <ScanLine className="w-4 h-4" />
                    </div>
                    <span className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                      5,000+
                    </span>
                    <span className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      Imaging Procedures
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#DCEBE7] shadow-2xs">
                    <div className="w-9 h-9 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-1.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <span className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                      Advanced
                    </span>
                    <span className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      Imaging Expertise
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-white/90 backdrop-blur-xs border border-[#DCEBE7] shadow-2xs">
                    <div className="w-9 h-9 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-1.5">
                      <Heart className="w-4 h-4" />
                    </div>
                    <span className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                      Patient-Centric
                    </span>
                    <span className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      Approach
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 2. Navigation Tabs Bar (Anchor Navigation) ── */}
            <div className="mt-8">
              <DoctorTabsNav />
            </div>

            {/* ── Content Sections (White Cards) Below Tabs ── */}
            <div className="space-y-8 mt-6">

              {/* ── 3. About Dr. Abid Raza Section ── */}
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

                {/* Bio paragraphs and Quote callout */}
                <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <p>
                    <strong className="text-slate-900 font-semibold">{doctor.name}</strong> is a
                    dedicated{' '}
                    <span className="text-[#0E746D] font-medium">
                      Consultant Radiologist &amp; Imaging Specialist
                    </span>{' '}
                    at Clinica Cure Hospital, Bariatu, Ranchi. Holding qualifications in{' '}
                    <strong className="text-slate-800">MBBS, MD (Radio Diagnosis)</strong> and being
                    a <strong className="text-slate-800">Gold Medalist</strong>, he brings high
                    clinical precision, advanced procedural acumen, and a compassionate bedside
                    approach to patient care.
                  </p>
                  <p>
                    Specialising in comprehensive diagnosis and treatment of conditions spanning{' '}
                    <strong className="text-slate-800">
                      Radio Diagnosis, Ultrasound &amp; Colour Doppler, Digital X-Ray, CT &amp; MRI
                      Reporting and Image-Guided Procedures
                    </strong>
                    , {doctor.name} works closely with multidisciplinary teams to ensure timely and
                    accurate diagnosis.
                  </p>

                  {/* Quote Callout Box */}
                  <div className="relative mt-5 p-8 rounded-2xl bg-[#F8FAF9] border-[#0E746D]">
                    <Quote className="w-6 h-6 text-[#0E746D]/20 absolute top-4 left-4 -scale-x-100" />
                    <p className="text-xs sm:text-sm font-medium italic text-slate-700 leading-relaxed pl-5">
                      “Accurate diagnosis is the first step towards the right treatment. My focus is
                      to provide precise, patient-centered imaging services with compassion and
                      clarity.”
                    </p>
                    <div className="mt-2 pl-5 text-xs font-bold text-slate-900">
                      — {doctor.name}
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 4. Areas of Expertise Section ── */}
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
                <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6 ml-12">
                  Specialised imaging and diagnostic services with advanced technology:
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Card 1: Radio Diagnosis */}
                  <div className="p-4.5 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] flex items-start gap-3.5 hover:border-[#0E746D]/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
                      <Scan className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                        Radio Diagnosis
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">
                        Comprehensive X-ray and imaging interpretation
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Ultrasound & Colour Doppler */}
                  <div className="p-4.5 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] flex items-start gap-3.5 hover:border-[#0E746D]/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                        Ultrasound &amp; Colour Doppler
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">
                        High-resolution ultrasound and vascular studies
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Digital X-Ray */}
                  <div className="p-4.5 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] flex items-start gap-3.5 hover:border-[#0E746D]/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
                      <Bone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                        Digital X-Ray
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">
                        Advanced digital radiography for accurate diagnosis
                      </p>
                    </div>
                  </div>

                  {/* Card 4: CT & MRI Reporting */}
                  <div className="p-4.5 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] flex items-start gap-3.5 hover:border-[#0E746D]/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
                      <ClipboardCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                        CT &amp; MRI Reporting
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-snug">
                        Detailed reporting with clinical insights
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 5. Consultation Schedule & Timings Table ── */}
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
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">
                          Monday – Friday
                        </td>
                        <td className="py-3.5 px-4 sm:px-6">10:00 AM – 4:00 PM</td>
                        <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                          Regular OPD Consultation
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Available
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">Saturday</td>
                        <td className="py-3.5 px-4 sm:px-6">10:00 AM – 2:00 PM</td>
                        <td className="py-3.5 px-4 sm:px-6 text-slate-600">
                          Specialist &amp; Review Clinic
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Available
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-slate-900">Sunday</td>
                        <td className="py-3.5 px-4 sm:px-6 text-slate-400">Not Available</td>
                        <td className="py-3.5 px-4 sm:px-6 text-slate-400">—</td>
                        <td className="py-3.5 px-4 sm:px-6 text-right">
                          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                            Unavailable
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#0E746D] shrink-0" />
                  <span>Timings may be subject to change. Please confirm while booking.</span>
                </div>
              </section>



              {/* ── 7. Related Doctors Section ── */}
              <section className="bg-white rounded-3xl border border-[#DDEAE7] p-6 sm:p-8 shadow-xs">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-1">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center">
                      <Users className="w-4.5 h-4.5" />
                    </div>
                    <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl">
                      Related Doctors
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href="/doctors"
                      className="text-xs sm:text-sm font-semibold text-[#0E746D] hover:underline flex items-center gap-1 group"
                    >
                      <span>View All Doctors</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>

                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6 ml-12">
                  You may also like to consult these specialists:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedDoctors.map((doc) => (
                    <div
                      key={doc.slug}
                      className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] flex flex-col justify-between hover:border-[#0E746D]/30 transition-all group"
                    >
                      <div>
                        {/* Doctor Image */}
                        <div className="rounded-xl overflow-hidden aspect-[4/3] bg-white border border-slate-200/80 mb-3 relative">
                          <img
                            src={
                              doc.profile_image ||
                              (doc.gender === 'Female'
                                ? '/images/doctors/doctor-female.svg'
                                : '/images/doctors/doctor-male.svg')
                            }
                            alt={doc.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        {/* Doctor Name & Designation */}
                        <h4 className="font-display font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0E746D] transition-colors line-clamp-1">
                          {doc.name}
                        </h4>
                        <p className="text-[11px] font-semibold text-[#0E746D] mt-0.5 line-clamp-1">
                          {doc.designation}
                        </p>
                        <p className="text-[10.5px] text-slate-400 mt-1 line-clamp-1">
                          {doc.qualifications.join(', ')}
                        </p>
                      </div>

                      <Link
                        href={`/doctors/${doc.slug}`}
                        className="mt-4 w-full py-2 px-3 rounded-xl border border-slate-200 bg-white hover:border-[#0E746D] hover:text-[#0E746D] text-slate-700 font-display font-semibold text-[11px] text-center transition-all inline-flex items-center justify-center gap-1.5"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── 8. Frequently Asked Questions Section ── */}
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
                <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-2 ml-12">
                  Find answers to common questions about consultation, procedures and reports.
                </p>

                <DoctorFaqAccordion doctorName={doctor.name} />
              </section>

              {/* ── 9. Bottom Consultation CTA Banner ── */}
              <section className="rounded-3xl bg-[#F4F9F8] border border-[#C5E8E0] p-6 sm:p-8 overflow-hidden relative shadow-xs">
                <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-8 items-center">
                  <div>
                    <span className="text-[11px] font-bold text-[#0E746D] uppercase tracking-wider block">
                      Clinica Cure Hospital
                    </span>
                    <h3 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl leading-tight mt-1.5">
                      Need a Radiology Consultation?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      Book an appointment with {doctor.name} and get accurate, expert imaging
                      services.
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
                        <span>Expert Reporting</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-medium">
                        <Heart className="w-3.5 h-3.5 text-[#0E746D]" />
                        <span>Patient-Centric Care</span>
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-white/60 border border-white/80 shadow-sm">
                    <img
                      src="/images/facilities/mri-scanner-suite.jpg"
                      alt="Radiology Consultation Suite"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT COLUMN: INTERACTIVE STICKY APPOINTMENT SIDEBAR
             ═══════════════════════════════════════════════════════════════ */}
          <DoctorAppointmentSidebar
            doctorName={doctor.name}
            doctorSlug={doctor.slug}
            departmentName={departmentObj?.name || 'Radiology & Imaging'}
            departmentSlug={departmentObj?.slug || 'radiology'}
          />
        </div>
      </div>
    </div>
  )
}
