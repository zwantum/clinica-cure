'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { SEED_DOCTORS } from '@/config/constants'

export type DoctorType = (typeof SEED_DOCTORS)[number] | any

interface Props {
  doctor: any
}

export default function DepartmentDoctorCard({ doctor: doc }: Props) {
  return (
    <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] flex flex-col justify-between hover:border-[#0E746D]/40 hover:shadow-xs transition-all duration-300 group">
      <div>
        {/* Doctor Image Container with soft mint bg and subtle + badge */}
        <div className="rounded-lg sm:rounded-xl overflow-hidden aspect-[4/3] bg-[#E8F5F2] border border-[#C5E8E0]/70 mb-2 sm:mb-3 relative flex items-center justify-center">
          <img
            src={
              doc.profile_image ||
              (doc.gender === 'Female'
                ? '/images/doctors/doctor-female.svg'
                : '/images/doctors/doctor-male.svg')
            }
            alt={doc.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src =
                doc.gender === 'Female'
                  ? '/images/doctors/doctor-female.svg'
                  : '/images/doctors/doctor-male.svg'
            }}
          />
          {/* Subtle mint plus icon in top right corner matching reference image */}
          <span className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 text-[#26B09A]/40 text-base sm:text-lg font-bold leading-none select-none pointer-events-none">
            +
          </span>
        </div>

        {/* Doctor Name & Designation */}
        <h4 className="font-display font-bold text-slate-900 text-[13px] sm:text-sm group-hover:text-[#0E746D] transition-colors line-clamp-1">
          {doc.name}
        </h4>
        <p className="text-[11px] font-semibold text-[#0E746D] mt-0.5 sm:mt-1 line-clamp-2 min-h-[26px] sm:min-h-[28px] leading-tight sm:leading-snug">
          {doc.designation}
        </p>
        <p className="text-[10px] sm:text-[10.5px] text-slate-500 mt-0.5 sm:mt-1 line-clamp-3 min-h-[26px] sm:min-h-[28px] leading-tight sm:leading-snug">
          {Array.isArray(doc.qualifications)
            ? doc.qualifications.join(', ')
            : doc.qualifications}
        </p>
      </div>

      {/* View Profile Action Button */}
      <Link
        href={`/doctors/${doc.slug}`}
        className="mt-2.5 sm:mt-4 w-full py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl border border-slate-200 bg-white hover:border-[#0E746D] hover:text-[#0E746D] hover:bg-slate-50 text-slate-700 font-display font-semibold text-[10.5px] sm:text-[11px] text-center transition-all inline-flex items-center justify-center gap-1 sm:gap-1.5 shadow-2xs group-hover:border-[#0E746D]/60"
      >
        <span>View Profile</span>
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
