'use client'

import Link from 'next/link'
import { ChevronRight, Calendar } from 'lucide-react'
import type { SEED_DOCTORS } from '@/config/constants'

export type DoctorType = (typeof SEED_DOCTORS)[number]

interface DoctorCardProps {
  doctor: DoctorType
}

export default function DoctorCard({ doctor: doc }: DoctorCardProps) {
  return (
    <div
      key={doc.slug}
      className="doctor-card bg-white rounded-3xl border border-[#DDEAE7] shadow-sm p-5 sm:p-6 lg:p-7 flex flex-col h-full hover:shadow-lg transition-all duration-300 group"
    >
      {/* Doctor Header: Thumbnail + Name/Dept/Experience */}
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#26B09A]/20 bg-slate-50 shrink-0 shadow-sm relative aspect-square">
          <img
            src={doc.profile_image}
            alt={doc.name}
            className="w-full h-full object-cover object-top block group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src =
                doc.gender === 'Female'
                  ? '/images/doctors/doctor-female.svg'
                  : '/images/doctors/doctor-male.svg'
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-base sm:text-lg lg:text-xl text-slate-900 leading-snug truncate group-hover:text-[#0E6B60] transition-colors">
            {doc.name}
          </h3>
          <p className="text-[#0E6B60] text-[14px] sm:text-sm font-normal mt-1.5 leading-snug line-clamp-2">
            {doc.designation}
          </p>
        </div>
      </div>

      {/* Qualifications */}
      <div className="mt-5 pt-4 border-t border-[#DDEAE7]/70">
        <p className="text-[10.5px] sm:text-[11px] font-display font-bold text-slate-700/70 uppercase tracking-wider">
          Qualifications
        </p>
        <p className="text-[14px] sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed line-clamp-2">
          {Array.isArray(doc.qualifications)
            ? doc.qualifications.join(', ')
            : doc.qualifications}
        </p>
      </div>

      {/* Areas of Expertise */}
      <div className="mt-4">
        <p className="text-[10.5px] sm:text-[11px] font-display font-bold text-slate-700/70 uppercase tracking-wider">
          Areas of Expertise
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {doc.specializations.map((tag) => (
            <span
              key={tag}
              className="chip text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1 bg-[#EEF9F7] text-[#0E6B60] font-medium rounded-lg border border-[#26B09A]/15"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions: View Profile & Book Appointment */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 mt-auto pt-6 sm:pt-7">
        <Link
          href={`/doctors/${doc.slug}`}
          className="w-full sm:flex-1 rounded-xl h-10 sm:h-11 inline-flex items-center justify-center gap-1.5 font-display font-semibold text-xs sm:text-[13px] border border-slate-200 text-slate-700 hover:text-[#0E6B60] hover:border-[#0E6B60] bg-white px-2.5 whitespace-nowrap transition-all"
        >
          <span>View Profile</span>
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.2} />
        </Link>
        <Link
          href={`/book-appointment?doctor=${doc.slug}`}
          className="w-full sm:flex-1 rounded-xl h-10 sm:h-11 inline-flex items-center justify-center gap-1.5 font-display font-semibold text-xs sm:text-[13px] shadow-sm px-2.5 whitespace-nowrap transition-all bg-[#0E746D] hover:bg-[#0b5c57] text-white"
        >
          <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
          <span>Book Appointment</span>
        </Link>
      </div>
    </div>
  )
}
