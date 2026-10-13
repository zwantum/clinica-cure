'use client'

import Link from 'next/link'
import { ChevronRight, Calendar } from 'lucide-react'
import type { SEED_DOCTORS } from '@/config/constants'

export type DoctorType = (typeof SEED_DOCTORS)[number]

interface DoctorCardProps {
  doctor: DoctorType
  variant?: 'default' | 'core-partner'
}

export default function DoctorCard({ doctor: doc, variant = 'default' }: DoctorCardProps) {
  const isCore = variant === 'core-partner'

  return (
    <div
      key={doc.slug}
      className={`doctor-card bg-white rounded-3xl border border-[#DDEAE7] shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300 group ${
        isCore ? 'p-4 sm:p-5 lg:p-4.5 xl:p-5' : 'p-5 sm:p-6 lg:p-7'
      }`}
    >
      {/* Doctor Header: Thumbnail + Name/Dept/Experience */}
      <div className={`flex items-center ${isCore ? 'gap-3 sm:gap-3.5' : 'gap-4 sm:gap-5'}`}>
        <div
          className={`rounded-2xl overflow-hidden border-2 border-[#26B09A]/20 bg-slate-50 shrink-0 shadow-sm relative aspect-square ${
            isCore ? 'w-20 h-20 sm:w-22 sm:h-22' : 'w-24 h-24 sm:w-28 sm:h-28'
          }`}
        >
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
          <h3
            className={`font-display font-bold text-slate-900 leading-snug group-hover:text-[#0E6B60] transition-colors ${
              isCore ? 'text-base sm:text-[17px] break-words' : 'text-base sm:text-lg lg:text-xl truncate'
            }`}
          >
            {doc.name}
          </h3>
          <p
            className={`text-[#0E6B60] font-normal leading-snug ${
              isCore
                ? 'text-xs sm:text-[13px] mt-1'
                : 'text-[14px] sm:text-sm mt-1.5 line-clamp-2'
            }`}
          >
            {doc.designation}
          </p>
        </div>
      </div>

      {/* Qualifications */}
      <div className={`border-t border-[#DDEAE7]/70 ${isCore ? 'mt-4 pt-3.5' : 'mt-5 pt-4'}`}>
        <p className="text-[10.5px] sm:text-[11px] font-display font-bold text-slate-700/70 uppercase tracking-wider">
          Qualifications
        </p>
        <p
          className={`text-slate-600 font-medium mt-1 leading-relaxed ${
            isCore ? 'text-[13px] sm:text-xs' : 'text-[14px] sm:text-sm line-clamp-2'
          }`}
        >
          {Array.isArray(doc.qualifications)
            ? doc.qualifications.join(', ')
            : doc.qualifications}
        </p>
      </div>

      {/* Areas of Expertise */}
      <div className={isCore ? 'mt-3.5' : 'mt-4'}>
        <p className="text-[10.5px] sm:text-[11px] font-display font-bold text-slate-700/70 uppercase tracking-wider">
          Areas of Expertise
        </p>
        <div className={`flex flex-wrap mt-2 ${isCore ? 'gap-1.5' : 'gap-2'}`}>
          {doc.specializations.map((tag) => (
            <span
              key={tag}
              className={`chip bg-[#EEF9F7] text-[#0E6B60] font-medium rounded-lg border border-[#26B09A]/15 ${
                isCore
                  ? 'text-[10.5px] sm:text-[11px] px-2 py-0.5'
                  : 'text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions: View Profile & Book Appointment */}
      <div
        className={`mt-auto ${
          isCore
            ? 'flex flex-row items-center gap-2 pt-4 sm:pt-5'
            : 'flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 pt-6 sm:pt-7'
        }`}
      >
        <Link
          href={`/doctors/${doc.slug}`}
          className={`rounded-xl inline-flex items-center justify-center font-display font-semibold border border-slate-200 text-slate-700 hover:text-[#0E6B60] hover:border-[#0E6B60] bg-white whitespace-nowrap transition-all ${
            isCore
              ? 'flex-1 h-9 gap-1 text-[11px] sm:text-xs px-1.5 sm:px-2 shadow-2xs'
              : 'w-full sm:flex-1 h-10 sm:h-11 gap-1.5 text-xs sm:text-[13px] px-2.5'
          }`}
        >
          <span>View Profile</span>
          <ChevronRight className={isCore ? 'w-3 h-3' : 'w-3.5 h-3.5'} strokeWidth={2.2} />
        </Link>
        <Link
          href={`/book-appointment?doctor=${doc.slug}`}
          className={`rounded-xl inline-flex items-center justify-center font-display font-semibold shadow-sm whitespace-nowrap transition-all bg-[#0E746D] hover:bg-[#0b5c57] text-white ${
            isCore
              ? 'flex-1 h-9 gap-1 text-[10.5px] sm:text-[11.5px] tracking-tight px-1.5 sm:px-2'
              : 'w-full sm:flex-1 h-10 sm:h-11 gap-1.5 text-xs sm:text-[13px] px-2.5'
          }`}
        >
          <Calendar className={isCore ? 'w-3 h-3' : 'w-3.5 h-3.5'} strokeWidth={2} />
          <span>Book Appointment</span>
        </Link>
      </div>
    </div>
  )
}
