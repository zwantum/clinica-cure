'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export interface CorePartner {
  name: string
  slug: string
  designation: string
  qualifications: string
  image: string
  focusAreas: string[]
}

export const CORE_PARTNERS: CorePartner[] = [
  {
    name: 'Dr. Syed Altamash',
    slug: 'dr-syed-altamash',
    designation: 'General & Laparoscopic Surgeon',
    qualifications: 'MBBS, MS, FIAGES, FMAS',
    image:
      'https://clinicacure.com/wp-content/uploads/2023/05/Dr.-Syed-Altamash-at-clinica-cure-profile-image.webp',
    focusAreas: [
      'Advanced Laparoscopic Surgery',
      'Gallbladder & Appendix Surgery',
      'Hernia Repair & Laser Proctology',
    ],
  },
  {
    name: 'Dr. Aftab Alam',
    slug: 'dr-aftab-alam',
    designation: 'Critical Care Physician & Intensivist',
    qualifications: 'MBBS, DA (Critical Care Physician)',
    image: 'https://clinicacure.com/wp-content/uploads/2024/01/Dr-Aftab-Alam.jpeg',
    focusAreas: [
      'ICU & Critical Care Management',
      'Emergency Resuscitation & Trauma Care',
      'Mechanical Ventilation & Hemodynamics',
    ],
  },
  {
    name: 'Dr. Vivek Goswami',
    slug: 'dr-vivek-goswami',
    designation: 'Consultant Plastic & Reconstructive Surgeon',
    qualifications: 'MBBS, DNB (Plastic Surgery), MHA',
    image: '/images/doctors/doctor-male.svg',
    focusAreas: [
      'Plastic & Reconstructive Surgery',
      'Burns & Craniofacial Trauma Repair',
      'Microvascular & Hand Surgery',
    ],
  },
  {
    name: 'Dr. Mujtaba Ahmad',
    slug: 'dr-mujtaba-ahmad',
    designation: 'Consultant Orthopaedic Surgeon',
    qualifications: 'MBBS, MS (Orthopaedics)',
    image: '/images/doctors/doctor-male.svg',
    focusAreas: [
      'Trauma & Fracture Care',
      'Joint Replacement Surgery',
      'Arthroscopic & Sports Injury Care',
    ],
  },
]

export default function CorePartnersShowcase() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
      {CORE_PARTNERS.map((partner) => (
        <div
          key={partner.slug}
          className="bg-white rounded-2xl border border-[#DDEAE7] overflow-hidden flex flex-col justify-between shadow-2xs hover:border-[#0E746D]/40 hover:shadow-md transition-all duration-300 group"
        >
          <div>
            {/* Portrait Container — Clean, uncluttered with simple Core Partner badge */}
            <div className="relative aspect-[4/3.4] overflow-hidden bg-[#F4F9F8] border-b border-[#EAF2F0] flex items-center justify-center">
              <img
                src={partner.image}
                alt={partner.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.src = '/images/doctors/doctor-male.svg'
                }}
              />
            </div>

            {/* Partner Details */}
            <div className="p-4 sm:p-5">
              <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#0E746D] transition-colors line-clamp-1">
                {partner.name}
              </h3>
              <p className="text-xs font-semibold text-[#0E746D] mt-1 line-clamp-1">
                {partner.designation}
              </p>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {partner.qualifications}
              </p>

              {/* Divider */}
              <div className="my-3.5 border-t border-slate-100" />

              {/* Focus Areas */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  AREAS OF FOCUS
                </span>
                <ul className="space-y-1.5">
                  {partner.focusAreas.map((area, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-700 leading-snug"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0E746D] shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="p-4 sm:p-5 pt-0">
            <Link
              href={`/doctors/${partner.slug}`}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-[#0E746D] hover:bg-[#EAF7F4] hover:text-[#0E746D] text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs group/btn"
            >
              <span>View Profile</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
