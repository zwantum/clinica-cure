'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Stethoscope,
  Scan,
} from 'lucide-react'
import { WEEK_DAYS, resolveDoctorDaySchedules } from './DoctorCard'

export interface FeaturedDoctor {
  name: string
  slug: string
  departmentName: string
  designation: string
  qualifications: string
  image: string
  focusTitle: string
  highlights: string[]
  icon: typeof Stethoscope
  schedule_sessions?: any[]
}

export const FEATURED_CORE_DOCTORS: FeaturedDoctor[] = [
  {
    name: 'Dr. Abid Raza',
    slug: 'dr-abid-raza',
    departmentName: 'Radiology & Imaging',
    designation: 'Consultant Radiologist & Imaging Specialist',
    qualifications: 'MBBS, MD (Radio Diagnosis)',
    image: '/images/doctors/dr-abid-raza.jpg',
    focusTitle: 'Advanced Diagnostic & Cross-Sectional Imaging',
    highlights: [
      'High-Resolution Ultrasound & Colour Doppler',
      'Advanced 1.5T MRI & Multi-Slice CT Reporting',
      'Image-Guided Fine Needle Aspiration & Biopsy',
    ],
    icon: Scan,
    schedule_sessions: [
      { day: 'Monday – Saturday', timings: '10:00 AM – 4:00 PM', shift1: '10:00 AM – 4:00 PM', status: 'Available' },
      { day: 'Sunday', timings: 'Not Available', status: 'Unavailable' },
    ],
  },
  {
    name: 'Dr. Syed Altamash',
    slug: 'dr-syed-altamash',
    departmentName: 'General & Laparoscopic Surgery',
    designation: 'General & Laparoscopic Surgeon',
    qualifications: 'MBBS, MS, FIAGES, FMAS',
    image: '/images/doctors/doctor-male.svg',
    focusTitle: 'Minimally Invasive & Laser Surgical Interventions',
    highlights: [
      'Advanced Laparoscopic GI & Gallbladder Surgeries',
      'Complex Inguinal & Ventral Hernia Reconstruction',
      'Laser Treatment for Piles, Fissure & Fistula',
    ],
    icon: Stethoscope,
    schedule_sessions: [
      { day: 'Monday – Saturday', timings: '10:00 AM – 4:00 PM', shift1: '10:00 AM – 4:00 PM', status: 'Available' },
      { day: 'Sunday', timings: 'Not Available', status: 'Unavailable' },
    ],
  },
]

function FeaturedCoreDoctorCard({ doc }: { doc: FeaturedDoctor }) {
  const Icon = doc.icon
  const [docData, setDocData] = useState<any>(doc)

  // Hydrate full doctor data if customized in admin roster
  useEffect(() => {
    const hydrate = () => {
      if (typeof window !== 'undefined') {
        try {
          const cached = localStorage.getItem('clinicacure_admin_doctors')
          if (cached) {
            const list = JSON.parse(cached)
            const match = list.find((d: any) => d.slug === doc.slug)
            if (match) {
              setDocData((prev: any) => ({ ...prev, ...match }))
            }
          }
        } catch { }
      }
    }
    hydrate()
    window.addEventListener('storage', hydrate)
    window.addEventListener('clinicacure_doctors_updated', hydrate)
    return () => {
      window.removeEventListener('storage', hydrate)
      window.removeEventListener('clinicacure_doctors_updated', hydrate)
    }
  }, [doc.slug])

  const daySchedules = useMemo(
    () => resolveDoctorDaySchedules(docData.schedule_sessions || doc.schedule_sessions),
    [docData.schedule_sessions, doc.schedule_sessions]
  )

  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const currentDaySchedule = selectedDay ? daySchedules[selectedDay] : null

  return (
    <div
      key={doc.slug}
      className="bg-white rounded-3xl border border-[#DDEAE7] p-5 sm:p-6 shadow-[0_4px_24px_-4px_rgba(14,116,109,0.06)] hover:shadow-[0_12px_36px_-6px_rgba(14,116,109,0.14)] hover:border-[#0E746D]/40 transition-all duration-300 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start group"
    >
      {/* Doctor Portrait Visual */}
      <div className="w-full sm:w-48 md:w-52 aspect-[4/4.2] sm:aspect-[4/4.8] rounded-2xl overflow-hidden bg-[#F4FAF8] border border-[#E2ECE9] relative shrink-0 shadow-2xs">
        <img
          src={doc.image}
          alt={doc.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = '/images/doctors/doctor-male.svg'
          }}
        />
      </div>

      {/* Doctor Bio & Capabilities */}
      <div className="flex-1 flex flex-col justify-between h-full w-full">
        <div>
          {/* Department Tag */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#0E746D] uppercase tracking-wider mb-1">
            <Icon className="w-3.5 h-3.5" />
            <span>{doc.departmentName}</span>
          </div>

          {/* Name */}
          <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl group-hover:text-[#0E746D] transition-colors leading-snug">
            {doc.name}
          </h3>

          {/* Designation */}
          <p className="text-xs font-semibold text-slate-700 mt-0.5">
            {doc.designation}
          </p>

          {/* OPD Schedule - Clean tight day picker (Above Qualifications) */}
          <div className="mt-2.5 pt-2 border-t border-slate-100">
            <p className="text-[10px] sm:text-[10.5px] font-display font-bold text-slate-700/80 uppercase tracking-wider mb-1">
              OPD Timings
            </p>

            {/* 7 Days Row */}
            <div className="flex items-center gap-2 sm:gap-2.5 py-0.5">
              {WEEK_DAYS.map((day) => {
                const daySched = daySchedules[day.full]
                const isAvail = daySched?.isAvailable
                const isSelected = selectedDay === day.full

                return (
                  <button
                    key={day.full}
                    type="button"
                    onClick={() => {
                      if (!isAvail) return
                      setSelectedDay((prev) => (prev === day.full ? null : day.full))
                    }}
                    disabled={!isAvail}
                    title={`${day.full}: ${isAvail ? daySched.timings : 'Not Available (Off Day)'}`}
                    className={`flex flex-col items-center justify-center min-w-[24px] py-0.5 transition-all select-none ${
                      isAvail
                        ? isSelected
                          ? 'text-[#0E746D] font-bold cursor-pointer'
                          : 'text-[#0E746D] font-semibold hover:text-[#0b5c57] cursor-pointer'
                        : 'text-slate-300 font-normal cursor-not-allowed'
                    }`}
                  >
                    <span className="text-xs sm:text-[13px] leading-tight">
                      {day.label}
                    </span>
                    <span
                      className={`w-3.5 h-0.5 rounded-full mt-0.5 transition-all ${
                        isSelected ? 'bg-[#0E746D]' : 'bg-transparent'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            {/* Dynamic Timings Display */}
            {selectedDay && currentDaySchedule?.isAvailable && (
              <div className="mt-1 text-xs text-slate-700 flex flex-wrap items-center gap-1.5 animate-fadeIn">
                <span className="font-bold text-[#0E746D]">{selectedDay}:</span>
                {currentDaySchedule.shift1 && currentDaySchedule.shift2 ? (
                  <span className="font-mono text-slate-800 text-[11.5px]">
                    {currentDaySchedule.shift1} & {currentDaySchedule.shift2}
                  </span>
                ) : (
                  <span className="font-mono text-slate-800 text-[11.5px]">
                    {currentDaySchedule.timings || currentDaySchedule.shift1 || '10:00 AM – 4:00 PM'}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Qualifications (Below OPD Timings) */}
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            <span className="font-semibold text-slate-700">Qualifications: </span>
            {doc.qualifications}
          </p>

          {/* Divider */}
          <div className="my-2.5 border-t border-slate-100" />

          {/* Highlights */}
          <div className="space-y-1.5 mb-4">
            {doc.highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 text-[11.5px] sm:text-xs text-slate-600 leading-snug"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0E746D] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-slate-100/90">
          <Link
            href={`/doctors/${doc.slug}`}
            className="flex-1 min-w-[120px] py-2.5 px-3 rounded-xl bg-[#EAF7F4] hover:bg-[#0E746D] text-[#0E746D] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 group/btn"
          >
            <span>View Profile</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href={`/book-appointment?doctor=${doc.slug}`}
            className="py-2.5 px-4 rounded-xl border border-slate-200 hover:border-[#0E746D] bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0E746D]" />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedCoreDoctorsSection() {
  return (
    <section className="bg-gradient-to-b from-[#F0F8FC] to-white border-b border-[#DDEAE7] py-8 sm:py-10 md:py-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl leading-tight">
            Our Core Doctors
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 max-w-2xl leading-relaxed">
            Meet our primary core doctors leading advanced diagnostic radiology and specialized laparoscopic surgical care at Clinica Cure Hospital.
          </p>
        </div>

        {/* 2 Featured Spotlight Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
          {FEATURED_CORE_DOCTORS.map((doc) => (
            <FeaturedCoreDoctorCard key={doc.slug} doc={doc} />
          ))}
        </div>
      </div>
    </section>
  )
}
