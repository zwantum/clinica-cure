'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { SEED_DOCTORS } from '@/config/constants'

export type DoctorType = (typeof SEED_DOCTORS)[number]

interface Props {
  doctor: DoctorType
}

export default function DepartmentDoctorCard({ doctor: doc }: Props) {
  return (
    <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] flex flex-col justify-between hover:border-[#0E746D]/40 hover:shadow-xs transition-all duration-300 group">
      <div>
        {/* Doctor Image Container with soft mint bg and subtle + badge */}
        <div className="rounded-xl overflow-hidden aspect-[4/3] bg-[#E8F5F2] border border-[#C5E8E0]/70 mb-3 relative flex items-center justify-center">
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
          <span className="absolute top-2.5 right-2.5 text-[#26B09A]/40 text-lg font-bold leading-none select-none pointer-events-none">
            +
          </span>
        </div>

        {/* Doctor Name & Designation */}
        <h4 className="font-display font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0E746D] transition-colors line-clamp-1">
          {doc.name}
        </h4>
        <p className="text-[11px] font-semibold text-[#0E746D] mt-0.5 line-clamp-1">
          {doc.designation}
        </p>
        <p className="text-[10.5px] text-slate-400 mt-1 line-clamp-1">
          {Array.isArray(doc.qualifications)
            ? doc.qualifications.join(', ')
            : doc.qualifications}
        </p>
      </div>

      {/* View Profile Action Button */}
      <Link
        href={`/doctors/${doc.slug}`}
        className="mt-4 w-full py-2 px-3 rounded-xl border border-slate-200 bg-white hover:border-[#0E746D] hover:text-[#0E746D] hover:bg-slate-50 text-slate-700 font-display font-semibold text-[11px] text-center transition-all inline-flex items-center justify-center gap-1.5 shadow-2xs group-hover:border-[#0E746D]/60"
      >
        <span>View Profile</span>
        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  )
}
