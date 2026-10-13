'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Search,
  Users,
  UserRound,
  ChevronDown,
  ChevronRight,
  Calendar,
  X,
  RotateCcw,
  ShieldCheck,
  Award,
  Clock,
  Heart,
  Stethoscope,
  HelpCircle,
  Plus,
  Minus,
  Activity,
} from 'lucide-react'
import { SEED_DOCTORS } from '@/config/constants'
import { departments } from '@/config/navigation'
import DoctorCard from '@/components/doctors/DoctorCard'

// Clinical excellence pillars
const EXCELLENCE_PILLARS = [
  {
    title: 'Multidisciplinary Medical Boards',
    description:
      'Complex neurosurgical, trauma, and surgical cases are reviewed collaboratively by senior consultants to determine the safest treatment plan.',
    icon: Stethoscope,
  },
  {
    title: 'Minimally Invasive & Laparoscopic Care',
    description:
      'Advanced laparoscopic and keyhole interventions ensure minimal tissue trauma, lesser pain, reduced blood loss, and rapid post-op discharge.',
    icon: Activity,
  },
  {
    title: '24x7 Critical Care & Anaesthesia',
    description:
      'Every major surgery and high-risk outpatient consultation is backed by round-the-clock intensive care physicians and state-of-the-art ICU monitoring.',
    icon: ShieldCheck,
  },
  {
    title: 'Transparent & Empathetic Practice',
    description:
      'Clear medical explanations, evidence-based diagnostic prescriptions, and transparent patient counseling with zero hidden charges or unnecessary tests.',
    icon: Heart,
  },
]

// Frequently asked questions
const DOCTOR_FAQS = [
  {
    q: 'How do I book an OPD appointment with a specialist at Clinica Cure?',
    a: 'You can book an appointment online by clicking "Book Appointment" on any doctor card, using our instant WhatsApp desk, or by calling our hospital reception at +91 92633 97076. Walk-in appointments are also accommodated during OPD hours.',
  },
  {
    q: 'What documents should I bring for my first consultation?',
    a: 'Please carry your valid government ID, past medical records, discharge summaries, previous prescription slips, diagnostic reports (X-rays, blood tests, MRI/CT scans), and current medication details.',
  },
  {
    q: 'Can I see a specialist immediately in case of an emergency?',
    a: 'Yes. Our 24x7 Emergency & Trauma Care Department is always operational with dedicated medical officers and on-call surgeons. Critical cases are attended to immediately without waiting for an OPD slot.',
  },
  {
    q: 'Do Clinica Cure doctors provide second opinions for planned surgeries?',
    a: 'Yes. Our senior consultants in Neurosurgery, Orthopaedics, General Surgery, Gynaecology, and Cardiology regularly review external reports to offer unbiased, expert second clinical opinions.',
  },
  {
    q: 'Are follow-up consultations available after surgery or treatment?',
    a: 'Yes, our departments maintain structured post-operative and chronic care follow-ups. You can schedule follow-up appointments both in-person and via tele-consultation coordinators.',
  },
]

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('')
  const [selectedGender, setSelectedGender] = useState('')

  const [deptOpen, setDeptOpen] = useState(false)
  const [genderOpen, setGenderOpen] = useState(false)
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0)

  const deptRef = useRef<HTMLDivElement>(null)
  const genderRef = useRef<HTMLDivElement>(null)

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (deptRef.current && !deptRef.current.contains(e.target as Node)) {
        setDeptOpen(false)
      }
      if (genderRef.current && !genderRef.current.contains(e.target as Node)) {
        setGenderOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Filter doctors based on query, department, and gender
  const q = searchQuery.trim().toLowerCase()
  const selectedDeptItem = departments.find((d) => d.slug === selectedDept)
  const selectedDeptSlugs = selectedDeptItem
    ? [selectedDeptItem.slug, ...(selectedDeptItem.aliases || [])]
    : [selectedDept]

  const filteredDoctors = SEED_DOCTORS.filter((doc) => {
    const matchesQ =
      !q ||
      doc.name.toLowerCase().includes(q) ||
      doc.designation.toLowerCase().includes(q) ||
      doc.qualifications.some((qual) => qual.toLowerCase().includes(q)) ||
      doc.specializations.some((tag) => tag.toLowerCase().includes(q))

    const matchesDept =
      !selectedDept || doc.departments.some((d) => selectedDeptSlugs.includes(d))
    const matchesGender = !selectedGender || doc.gender === selectedGender

    return matchesQ && matchesDept && matchesGender
  })

  const hasActiveFilters = searchQuery !== '' || selectedDept !== '' || selectedGender !== ''

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedDept('')
    setSelectedGender('')
    setDeptOpen(false)
    setGenderOpen(false)
  }

  const selectedDeptObj = departments.find((d) => d.slug === selectedDept)

  return (
    <div className="bg-white min-h-screen">
      {/* ── 1. HERO SECTION (Consistent with Patient Stories & Core Partners) ── */}
      <section className="relative overflow-hidden bg-[#F0F8FC] border-b border-slate-200/80 py-10 sm:py-8 md:py-9 lg:py-16 min-h-[380px] sm:min-h-[390px] md:min-h-[410px] lg:min-h-[460px] flex items-center">
        {/* Doctor Team Hero Image with subtle fade */}
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
          <div className="max-w-xl md:max-w-[480px] lg:max-w-xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 sm:mb-4">
              <Link href="/" className="hover:text-[#0E746D] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-700 font-medium">Doctors</span>
            </div>

            {/* Category Tagline */}
            <span className="text-xs sm:text-sm font-bold text-[#0E746D] uppercase tracking-wider block mb-2 sm:mb-2.5">
              OUR MEDICAL FACULTY
            </span>

            {/* Heading */}
            <h1 className="font-display font-semibold text-slate-900 text-3xl sm:text-4xl md:text-[42px] lg:text-[48px] leading-[1.14] tracking-tight">
              Find the Right Doctor <br className="hidden sm:inline" />
              <span className="text-[#0E746D]">for Your Specialized Care</span>
            </h1>

            {/* Description */}
            <p className="mt-3.5 sm:mt-4 text-[14px] sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-xl">
              Connect with over 34+ renowned surgeons, physicians, and consultants across 20 specialized departments at Clinica Cure Hospital. Evidence-based care tailored to your recovery.
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
                    34+ Doctors
                  </div>
                  <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                    Senior Faculty
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
                    20 Specialities
                  </div>
                  <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                    Clinical Departments
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
                    Gold Medalists
                  </div>
                  <div className="text-[10px] sm:text-[11px] lg:text-xs text-slate-500 font-medium leading-tight mt-0.5 whitespace-nowrap">
                    AIIMS &amp; Top Institutes
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
                    Emergency OPD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN DIRECTORY SECTION (Filter Bar + Pills + Cards) ── */}
      <section className="bg-[#F6FBFA] py-8 sm:py-6 md:py-7 lg:py-14">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          {/* Section Introduction */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider block mb-1">
                DOCTOR DIRECTORY
              </span>
              <h2 className="font-display font-semibold text-slate-900 text-2xl sm:text-3xl leading-tight">
                Browse Specialists &amp; Consultants
              </h2>
              <p className="text-slate-600 text-[14px] sm:text-sm mt-1 max-w-xl">
                Filter by department, doctor name, qualifications, or gender to find your preferred physician.
              </p>
            </div>
            <div className="text-xs text-slate-500 font-medium shrink-0">
              Showing <span className="font-bold text-slate-900">{filteredDoctors.length}</span> of{' '}
              <span className="font-bold text-slate-900">{SEED_DOCTORS.length}</span> verified specialists
            </div>
          </div>

          {/* ── Filter Bar (Preserved Layout & IDs) ── */}
          <div className="relative z-30 bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-[#DDEAE7] p-1.5 flex flex-col md:flex-row gap-2 md:gap-0 md:divide-x md:divide-[#E2ECE9]">
            {/* 1. Search Input */}
            <div className="flex items-center gap-2.5 px-4 py-2.5 md:flex-1 hover:bg-[#F4FAF8]/80 rounded-xl transition-all focus-within:bg-[#F4FAF8]/80 group">
              <Search
                className="w-4 h-4 text-slate-400 shrink-0 group-hover:text-[#0E746D] transition-colors"
                strokeWidth={2.2}
              />
              <input
                id="doc-search"
                type="text"
                placeholder="Search by doctor name, qualification, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full outline-none text-sm bg-transparent placeholder:text-slate-400 text-slate-900 border-0 p-0 focus:ring-0"
                style={{ outline: 'none' }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Clear search text"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 2. Department Dropdown */}
            <div className="relative md:w-64" ref={deptRef}>
              <button
                type="button"
                id="dept-dropdown-trigger"
                onClick={() => {
                  setDeptOpen((v) => !v)
                  setGenderOpen(false)
                }}
                className="w-full h-full flex items-center gap-2.5 px-4 py-3 hover:bg-[#F4FAF8]/80 rounded-xl transition-all text-left text-sm text-slate-800 font-medium outline-none cursor-pointer"
              >
                <Users className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.8} />
                <span id="dept-dropdown-label" className="truncate flex-1 text-slate-800">
                  {selectedDeptObj ? selectedDeptObj.name : 'All Departments'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${deptOpen ? 'rotate-180' : ''
                    }`}
                  strokeWidth={2.2}
                />
              </button>

              {deptOpen && (
                <div
                  id="dept-dropdown-menu"
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#DDEAE7] shadow-xl p-1.5 z-50 max-h-64 overflow-y-auto"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDept('')
                      setDeptOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-[#F4FAF8] hover:text-[#0E746D] transition-colors cursor-pointer ${!selectedDept ? 'bg-[#F4FAF8] text-[#0E746D] font-semibold' : 'text-slate-700'
                      }`}
                  >
                    All Departments
                  </button>
                  {departments.map((dept) => (
                    <button
                      key={dept.slug}
                      type="button"
                      onClick={() => {
                        setSelectedDept(dept.slug)
                        setDeptOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-[#F4FAF8] hover:text-[#0E746D] transition-colors cursor-pointer ${selectedDept === dept.slug
                        ? 'bg-[#F4FAF8] text-[#0E746D] font-semibold'
                        : 'text-slate-700'
                        }`}
                    >
                      {dept.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Gender Dropdown */}
            <div className="relative md:w-48" ref={genderRef}>
              <button
                type="button"
                id="gender-dropdown-trigger"
                onClick={() => {
                  setGenderOpen((v) => !v)
                  setDeptOpen(false)
                }}
                className="w-full h-full flex items-center gap-2.5 px-4 py-3 hover:bg-[#F4FAF8]/80 rounded-xl transition-all text-left text-sm text-slate-800 font-medium outline-none cursor-pointer"
              >
                <UserRound className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={1.8} />
                <span id="gender-dropdown-label" className="truncate flex-1 text-slate-800">
                  {selectedGender ? selectedGender : 'All Genders'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${genderOpen ? 'rotate-180' : ''
                    }`}
                  strokeWidth={2.2}
                />
              </button>

              {genderOpen && (
                <div
                  id="gender-dropdown-menu"
                  className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-[#DDEAE7] shadow-xl p-1.5 z-50"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGender('')
                      setGenderOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-[#F4FAF8] hover:text-[#0E746D] transition-colors cursor-pointer ${!selectedGender ? 'bg-[#F4FAF8] text-[#0E746D] font-semibold' : 'text-slate-700'
                      }`}
                  >
                    All Genders
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGender('Male')
                      setGenderOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-[#F4FAF8] hover:text-[#0E746D] transition-colors cursor-pointer ${selectedGender === 'Male'
                      ? 'bg-[#F4FAF8] text-[#0E746D] font-semibold'
                      : 'text-slate-700'
                      }`}
                  >
                    Male Doctors
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGender('Female')
                      setGenderOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-[#F4FAF8] hover:text-[#0E746D] transition-colors cursor-pointer ${selectedGender === 'Female'
                      ? 'bg-[#F4FAF8] text-[#0E746D] font-semibold'
                      : 'text-slate-700'
                      }`}
                  >
                    Female Doctors
                  </button>
                </div>
              )}
            </div>

            {/* 4. Search Doctor Button */}
            <button
              id="doc-search-btn"
              type="button"
              className="rounded-2xl px-6 h-12 m-1 inline-flex items-center justify-center gap-2 font-display font-semibold text-sm shrink-0 bg-[#0E746D] hover:bg-[#0b5c57] text-white transition-all shadow-md shadow-[#0E746D]/10 hover:shadow-lg hover:shadow-[#0E746D]/20 active:scale-[0.98] cursor-pointer"
            >
              <span>Search Doctor</span>
              <ChevronRight className="w-4 h-4" strokeWidth={2.2} />
            </button>
          </div>

          {/* Active Filter Indicators */}
          {hasActiveFilters && (
            <div className="mt-4 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2 flex-wrap text-slate-600">
                <span className="font-semibold text-slate-700">Active Filters:</span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DDEAE7] text-slate-800 shadow-2xs">
                    Keyword: &ldquo;{searchQuery}&rdquo;
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedDeptObj && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DDEAE7] text-slate-800 shadow-2xs">
                    Dept: {selectedDeptObj.name}
                    <button
                      type="button"
                      onClick={() => setSelectedDept('')}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedGender && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DDEAE7] text-slate-800 shadow-2xs">
                    Gender: {selectedGender}
                    <button
                      type="button"
                      onClick={() => setSelectedGender('')}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 font-semibold text-[#0E746D] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

          {/* ── Doctor Cards Grid (EXACT UI PRESERVED WITHOUT MODIFICATION) ── */}
          <div
            id="doctor-grid"
            className="mt-8 grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredDoctors.map((doc) => (
              <DoctorCard key={doc.slug} doctor={doc} />
            ))}
          </div>

          {/* Empty State */}
          {filteredDoctors.length === 0 && (
            <div id="doctor-empty" className="text-center py-16 px-4 bg-white rounded-3xl border border-[#DDEAE7] mt-8">
              <div className="w-14 h-14 rounded-2xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <UserRound className="w-7 h-7" strokeWidth={1.8} />
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg">No doctors found</h3>
              <p className="text-slate-600 text-[14px] sm:text-sm mt-1 max-w-md mx-auto">
                No specialists matched your current search filters. Try clearing filters or searching with different keywords.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-4 px-5 py-2.5 rounded-xl bg-[#0E746D] text-white text-xs font-semibold hover:bg-[#0b5c57] transition-all cursor-pointer shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. CLINICAL EXCELLENCE PILLARS (Why Choose Our Faculty) ── */}
      <section className="py-14 sm:py-7 md:py-8 lg:py-20 bg-white border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#0E746D] uppercase tracking-wider block mb-2">
              CLINICAL EXCELLENCE
            </span>
            <h2 className="font-display font-semibold text-slate-900 text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Why Patients Trust Clinica Cure Specialists
            </h2>
            <p className="mt-3 text-[14px] sm:text-sm md:text-base text-slate-600 leading-relaxed">
              Every consultation and surgical intervention is guided by rigorous clinical standards, ethical medical counsel, and advanced hospital technology.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXCELLENCE_PILLARS.map((pillar) => {
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

      {/* ── 4. FREQUENTLY ASKED QUESTIONS (Accordion) ── */}
      <section className="py-14 sm:py-7 md:py-8 lg:py-20 bg-[#F6FBFA] border-t border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12">
          {/* Left Column (Sticky heading) */}
          <div className="relative">
            <div className="lg:sticky lg:top-32">
              <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider block mb-2">
                HOSPITAL FAQS
              </span>
              <h2 className="font-display font-semibold text-slate-900 text-2xl sm:text-3xl lg:text-4xl leading-tight">
                Frequently Asked Questions About Consultations
              </h2>
              <p className="mt-3 text-[14px] sm:text-sm md:text-base text-slate-600 leading-relaxed">
                Everything you need to know about booking an appointment, medical records, emergency OPD, and second opinions at Clinica Cure Hospital.
              </p>

              <div className="mt-6 p-5 rounded-2xl bg-white border border-[#DDEAE7] shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Have a Specific Question?</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Speak with our patient care representative.</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E746D] hover:underline"
                >
                  <span>Contact Patient Desk</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column (FAQ Accordion Items) */}
          <div className="space-y-3.5">
            {DOCTOR_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-[#DDEAE7] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold text-slate-900 text-sm sm:text-base leading-snug">
                      {faq.q}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0 transition-transform">
                      {isOpen ? (
                        <Minus className="w-4 h-4" strokeWidth={2.2} />
                      ) : (
                        <Plus className="w-4 h-4" strokeWidth={2.2} />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-[14px] sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

