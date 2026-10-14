'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Calendar, Clock } from 'lucide-react'
import type { SEED_DOCTORS } from '@/config/constants'

export type DoctorType = (typeof SEED_DOCTORS)[number] & {
  schedule_sessions?: Array<{
    day: string
    timings: string
    status?: string
    type?: string
  }>
  expertise?: Array<{
    title: string
    description?: string
  }>
  gender?: string
}

interface DoctorCardProps {
  doctor: DoctorType
  variant?: 'default' | 'core-partner'
}

// Clean and shorten day strings (e.g. Monday -> Mon, Monday – Friday -> Mon – Fri)
function toShortDay(d: string): string {
  return d
    .replace(/Monday/gi, 'Mon')
    .replace(/Tuesday/gi, 'Tue')
    .replace(/Wednesday/gi, 'Wed')
    .replace(/Thursday/gi, 'Thu')
    .replace(/Friday/gi, 'Fri')
    .replace(/Saturday/gi, 'Sat')
    .replace(/Sunday/gi, 'Sun')
    .replace(/\s*-\s*/g, ' – ')
    .trim()
}

// Clean timing strings (e.g. 04:00 PM -> 4:00 PM)
function cleanTimings(t: string): string {
  return t
    .replace(/\b0([1-9]:)/g, '$1')
    .replace(/\s*-\s*/g, ' – ')
    .trim()
}

// Condense schedule into a single short summary row so cards NEVER grow tall
function getScheduleSummary(
  sessions?: Array<{ day: string; timings: string; status?: string }>
): { days: string; timings: string } {
  const DEFAULT = {
    days: 'Mon – Sat',
    timings: '10:00 AM – 4:00 PM',
  }

  if (!sessions || sessions.length === 0) {
    return DEFAULT
  }

  // Filter out unavailable/off sessions
  const available = sessions.filter((s) => {
    if (!s || !s.timings) return false
    const status = (s.status || '').toLowerCase()
    const timings = s.timings.toLowerCase()
    if (status === 'unavailable' || status === 'off') return false
    if (timings.includes('not available') || timings.includes('off') || timings.trim() === '—') return false
    return true
  })

  if (available.length === 0) {
    return { days: 'On Call', timings: 'Emergency Care' }
  }

  // If only 1 session (e.g. Dr. Abid Raza: Monday 10:00 AM – 1:00 PM & 4:00 PM – 6:00 PM)
  if (available.length === 1) {
    return {
      days: toShortDay(available[0].day),
      timings: cleanTimings(available[0].timings),
    }
  }

  // Collect all days across available sessions
  const allDaysRaw = available.map((s) => s.day.toLowerCase())
  const hasMon = allDaysRaw.some((d) => d.includes('mon'))
  const hasTue = allDaysRaw.some((d) => d.includes('tue'))
  const hasWed = allDaysRaw.some((d) => d.includes('wed'))
  const hasThu = allDaysRaw.some((d) => d.includes('thu'))
  const hasFri = allDaysRaw.some((d) => d.includes('fri'))
  const hasSat = allDaysRaw.some((d) => d.includes('sat'))
  const hasSun = allDaysRaw.some((d) => d.includes('sun'))

  let days = 'Mon – Sat'

  // If doctor comes all 7 days
  if (hasMon && hasTue && hasWed && hasThu && hasFri && hasSat && hasSun) {
    days = 'Mon – Sun'
  } else if (hasMon && hasSat && !hasSun) {
    days = 'Mon – Sat'
  } else if (hasMon && hasFri && !hasSat && !hasSun) {
    days = 'Mon – Fri'
  } else {
    // Specific custom days (e.g. Mon, Wed, Fri)
    const activeDayList: string[] = []
    const DAY_CHECKS = [
      { ok: hasMon, name: 'Mon' },
      { ok: hasTue, name: 'Tue' },
      { ok: hasWed, name: 'Wed' },
      { ok: hasThu, name: 'Thu' },
      { ok: hasFri, name: 'Fri' },
      { ok: hasSat, name: 'Sat' },
      { ok: hasSun, name: 'Sun' },
    ]
    DAY_CHECKS.forEach((d) => {
      if (d.ok) activeDayList.push(d.name)
    })

    if (activeDayList.length === 7) {
      days = 'Mon – Sun'
    } else if (activeDayList.length === 6 && !hasSun) {
      days = 'Mon – Sat'
    } else if (activeDayList.length === 5 && !hasSat && !hasSun) {
      days = 'Mon – Fri'
    } else if (activeDayList.length > 0 && activeDayList.length <= 3) {
      days = activeDayList.join(', ')
    } else if (activeDayList.length > 3) {
      days = `${activeDayList[0]} – ${activeDayList[activeDayList.length - 1]}`
    } else {
      days = toShortDay(available[0].day)
    }
  }

  // Primary timings (weekday or primary shift timings)
  const primaryTimings = cleanTimings(available[0].timings)

  return {
    days: days || 'Mon – Sat',
    timings: primaryTimings || '10:00 AM – 4:00 PM',
  }
}

export default function DoctorCard({ doctor: doc, variant = 'default' }: DoctorCardProps) {
  const isCore = variant === 'core-partner'

  const [currentDoc, setCurrentDoc] = useState<any>(doc)

  // Hydrate full doctor data if customized in admin roster
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('clinicacure_admin_doctors')
        if (cached) {
          const list = JSON.parse(cached)
          const match = list.find((d: any) => d.slug === doc.slug || d.id === (doc as any).id)
          if (match) {
            setCurrentDoc((prev: any) => ({ ...prev, ...match }))
            return
          }
        }
      } catch { }
    }
    setCurrentDoc(doc)
  }, [doc.slug, (doc as any).id])

  const schedule = getScheduleSummary(currentDoc.schedule_sessions)

  // Extract expertise titles dynamically (only title from admin expertise cards or specializations)
  const expertiseTitles: string[] =
    Array.isArray(currentDoc.expertise) && currentDoc.expertise.length > 0
      ? currentDoc.expertise
          .map((item: any) => (typeof item === 'string' ? item : item?.title))
          .filter(Boolean)
      : Array.isArray(currentDoc.specializations) && currentDoc.specializations.length > 0
      ? currentDoc.specializations
      : []

  return (
    <div
      key={currentDoc.slug || doc.slug}
      className={`doctor-card bg-white rounded-3xl border border-[#DDEAE7] shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300 group ${isCore ? 'p-4 sm:p-5 lg:p-4.5 xl:p-5' : 'p-5 sm:p-6 lg:p-7'
        }`}
    >
      {/* Doctor Header: Thumbnail + Name/Dept/Experience */}
      <div className={`flex items-center ${isCore ? 'gap-3 sm:gap-3.5' : 'gap-4 sm:gap-5'}`}>
        <div
          className={`rounded-2xl overflow-hidden border-2 border-[#26B09A]/20 bg-slate-50 shrink-0 shadow-sm relative aspect-square ${isCore ? 'w-20 h-20 sm:w-22 sm:h-22' : 'w-24 h-24 sm:w-28 sm:h-28'
            }`}
        >
          <img
            src={
              currentDoc.profile_image ||
              (currentDoc.gender === 'Female'
                ? '/images/doctors/doctor-female.svg'
                : '/images/doctors/doctor-male.svg')
            }
            alt={currentDoc.name}
            className="w-full h-full object-cover object-top block group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src =
                currentDoc.gender === 'Female'
                  ? '/images/doctors/doctor-female.svg'
                  : '/images/doctors/doctor-male.svg'
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className={`font-display font-bold text-slate-900 leading-snug group-hover:text-[#0E6B60] transition-colors ${isCore ? 'text-base sm:text-[17px] break-words' : 'text-base sm:text-lg lg:text-xl truncate'
              }`}
          >
            {currentDoc.name}
          </h3>
          <p
            className={`text-[#0E6B60] font-normal leading-snug ${isCore
              ? 'text-xs sm:text-[13px] mt-1'
              : 'text-[14px] sm:text-sm mt-1.5 line-clamp-2'
              }`}
          >
            {currentDoc.designation}
          </p>
        </div>
      </div>


      {/* Qualifications */}
      <div className={`border-t border-[#DDEAE7]/70 ${isCore ? 'mt-4 pt-3.5' : 'mt-5 pt-4'}`}>
        <p className="text-[10.5px] sm:text-[11px] font-display font-bold text-slate-700/70 uppercase tracking-wider">
          Qualifications
        </p>
        <p
          className={`text-slate-600 font-medium mt-1 leading-relaxed ${isCore ? 'text-[13px] sm:text-xs' : 'text-[14px] sm:text-sm line-clamp-2'
            }`}
        >
          {Array.isArray(currentDoc.qualifications)
            ? currentDoc.qualifications.join(', ')
            : currentDoc.qualifications}
        </p>
      </div>


      {/* OPD Schedule / Availability (Single compact row) */}
      <div className={`border-t border-[#DDEAE7]/70 ${isCore ? 'mt-3.5 pt-3' : 'mt-4 pt-3.5'}`}>
        <p className="text-[10.5px] sm:text-[11px] font-display font-bold text-slate-700/70 uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#0E746D]" />
          <span>OPD Timings</span>
        </p>
        <div className="mt-2">
          <span
            className={`inline-flex items-center gap-1.5 bg-[#EEF9F7] text-slate-800 border border-[#26B09A]/20 rounded-lg max-w-full ${isCore ? 'text-[10.5px] px-2 py-0.5' : 'text-[11px] sm:text-[11.5px] px-2.5 py-1'
              }`}
          >
            <span className="font-bold text-slate-900 shrink-0">{schedule.days}:</span>
            <span className="font-mono text-[#0E746D] font-semibold truncate">{schedule.timings}</span>
          </span>
        </div>
      </div>

      {/* Areas of Expertise */}
      <div className={isCore ? 'mt-3.5' : 'mt-4'}>
        <p className="text-[10.5px] sm:text-[11px] font-display font-bold text-slate-700/70 uppercase tracking-wider">
          Areas of Expertise
        </p>
        <div className={`flex flex-wrap mt-2 ${isCore ? 'gap-1.5' : 'gap-2'}`}>
          {expertiseTitles.map((tag) => (
            <span
              key={tag}
              className={`chip bg-[#EEF9F7] text-[#0E6B60] font-medium rounded-lg border border-[#26B09A]/15 ${isCore
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
        className={`mt-auto ${isCore
          ? 'flex flex-row items-center gap-2 pt-4 sm:pt-5'
          : 'flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 pt-5 sm:pt-6'
          }`}
      >
        <Link
          href={`/doctors/${currentDoc.slug || doc.slug}`}
          className={`rounded-xl inline-flex items-center justify-center font-display font-semibold border border-slate-200 text-slate-700 hover:text-[#0E6B60] hover:border-[#0E6B60] bg-white whitespace-nowrap transition-all ${isCore
            ? 'flex-1 h-9 gap-1 text-[11px] sm:text-xs px-1.5 sm:px-2 shadow-2xs'
            : 'w-full sm:flex-1 h-10 sm:h-11 gap-1.5 text-xs sm:text-[13px] px-2.5'
            }`}
        >
          <span>View Profile</span>
          <ChevronRight className={isCore ? 'w-3 h-3' : 'w-3.5 h-3.5'} strokeWidth={2.2} />
        </Link>
        <Link
          href={`/book-appointment?doctor=${currentDoc.slug || doc.slug}`}
          className={`rounded-xl inline-flex items-center justify-center font-display font-semibold shadow-sm whitespace-nowrap transition-all bg-[#0E746D] hover:bg-[#0b5c57] text-white ${isCore
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
