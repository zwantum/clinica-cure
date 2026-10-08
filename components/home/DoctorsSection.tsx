'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SEED_DOCTORS } from '@/config/constants'
import { Search } from 'lucide-react'
import DoctorCard from '@/components/doctors/DoctorCard'

export default function DoctorsSection() {
  const [selectedDept, setSelectedDept] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDoctors = SEED_DOCTORS.filter((doc) => {
    const matchesDept =
      selectedDept === 'all' ||
      doc.departments.includes(selectedDept) ||
      (selectedDept === 'neurosurgery' && (doc.departments.includes('neurology-neurosurgery') || doc.departments.includes('neurosurgery'))) ||
      (selectedDept === 'orthopedics-joint-replacement' && (doc.departments.includes('orthopaedics') || doc.departments.includes('orthopedics-joint-replacement'))) ||
      (selectedDept === 'obstetrics-gynecology' && (doc.departments.includes('obstetrics-gynaecology') || doc.departments.includes('obstetrics-gynecology')))

    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      doc.name.toLowerCase().includes(q) ||
      doc.designation.toLowerCase().includes(q) ||
      doc.qualifications.some((qual) => qual.toLowerCase().includes(q)) ||
      doc.specializations.some((s) => s.toLowerCase().includes(q))

    return matchesDept && matchesQuery
  })

  return (
    <section id="doctors" className="py-10 sm:py-14 md:py-16 bg-[#F6FBFA]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-left max-w-2xl">
            <p className="text-[#0e746d] font-display font-bold text-xs md:text-sm tracking-wider uppercase">
              EXPERT SPECIALISTS
            </p>
            <h2 className="mt-2 font-display font-semibold text-slate-900 text-[22px] sm:text-[30px] md:text-3xl lg:text-4xl leading-tight">
              Experienced Doctors You Can Trust
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our multidisciplinary team of qualified physicians and surgeons brings decades of clinical expertise across critical and general specialities.
            </p>
          </div>

          <Link
            href="/doctors"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0E746D] hover:underline shrink-0"
          >
            <span>View All Doctors ({SEED_DOCTORS.length})</span>
            <span>→</span>
          </Link>
        </div>

        {/* Search & Department Filters */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Department Filter Pills */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => setSelectedDept('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === 'all'
                  ? 'bg-[#0E746D] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Specialities
            </button>
            <button
              type="button"
              onClick={() => setSelectedDept('orthopedics-joint-replacement')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === 'orthopedics-joint-replacement'
                  ? 'bg-[#0E746D] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Orthopaedics &amp; Joint
            </button>
            <button
              type="button"
              onClick={() => setSelectedDept('neurosurgery')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === 'neurosurgery'
                  ? 'bg-[#0E746D] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Brain &amp; Spine
            </button>
            <button
              type="button"
              onClick={() => setSelectedDept('general-laparoscopic-surgery')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === 'general-laparoscopic-surgery'
                  ? 'bg-[#0E746D] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Surgery &amp; Laparoscopy
            </button>
            <button
              type="button"
              onClick={() => setSelectedDept('cardiology')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === 'cardiology'
                  ? 'bg-[#0E746D] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Cardiology
            </button>
            <button
              type="button"
              onClick={() => setSelectedDept('general-medicine')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === 'general-medicine'
                  ? 'bg-[#0E746D] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              General Medicine &amp; ICU
            </button>
            <button
              type="button"
              onClick={() => setSelectedDept('obstetrics-gynecology')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === 'obstetrics-gynecology'
                  ? 'bg-[#0E746D] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Gynaecology &amp; Maternity
            </button>
            <button
              type="button"
              onClick={() => setSelectedDept('urology')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDept === 'urology'
                  ? 'bg-[#0E746D] text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Urology
            </button>
          </div>

            <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search by doctor or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 pl-9 text-xs sm:text-[13px] outline-none focus:border-[#0E746D] shadow-xs"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" strokeWidth={2} />
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc.slug} doctor={doc} />
          ))}
        </div>
      </div>
    </section>
  )
}
