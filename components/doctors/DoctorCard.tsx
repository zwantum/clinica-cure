'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Calendar, Clock } from 'lucide-react'
import type { SEED_DOCTORS } from '@/config/constants'

export type DoctorType = (typeof SEED_DOCTORS)[number] & {
  schedule_sessions?: Array<{
    day: string
    timings?: string
    shift1?: string
    shift2?: string
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

export const WEEK_DAYS = [
  { key: 'Monday', label: 'Mo', full: 'Monday' },
  { key: 'Tuesday', label: 'Tu', full: 'Tuesday' },
  { key: 'Wednesday', label: 'We', full: 'Wednesday' },
  { key: 'Thursday', label: 'Th', full: 'Thursday' },
  { key: 'Friday', label: 'Fr', full: 'Friday' },
  { key: 'Saturday', label: 'Sa', full: 'Saturday' },
  { key: 'Sunday', label: 'Su', full: 'Sunday' },
]

export interface DayScheduleDetail {
  dayName: string
  isAvailable: boolean
  shift1?: string
  shift2?: string
  timings?: string
  type?: string
}

export function cleanTimings(t?: string): string {
  if (!t) return ''
  return t
    .replace(/\b0([1-9]:)/g, '$1')
    .replace(/\s*-\s*/g, ' – ')
    .trim()
}

export function resolveDoctorDaySchedules(
  sessions?: Array<{
    day: string
    timings?: string
    shift1?: string
    shift2?: string
    status?: string
    type?: string
  }>
): Record<string, DayScheduleDetail> {
  type ScheduleItem = {
    day: string
    timings?: string
    shift1?: string
    shift2?: string
    status?: string
    type?: string
  }

  const DEFAULT_SESSIONS: ScheduleItem[] = [
    { day: 'Monday – Friday', timings: '10:00 AM – 4:00 PM', shift1: '10:00 AM – 4:00 PM', shift2: '', status: 'Available', type: 'Regular OPD Consultation' },
    { day: 'Saturday', timings: '10:00 AM – 2:00 PM', shift1: '10:00 AM – 2:00 PM', shift2: '', status: 'Available', type: 'Specialist & Review Clinic' },
    { day: 'Sunday', timings: 'Not Available', shift1: '', shift2: '', status: 'Unavailable', type: '—' },
  ]

  const activeSessions: ScheduleItem[] = sessions && sessions.length > 0 ? (sessions as ScheduleItem[]) : DEFAULT_SESSIONS
  const result: Record<string, DayScheduleDetail> = {}

  for (const day of WEEK_DAYS) {
    const cleanDay = day.full.toLowerCase()

    // Find direct or range match in sessions
    const matched = activeSessions.find((s) => {
      if (!s || !s.day) return false
      const sDay = s.day.toLowerCase().trim()

      if (sDay === cleanDay) return true
      if (sDay.includes('mon') && sDay.includes('fri') && ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(cleanDay)) return true
      if (sDay.includes('mon') && sDay.includes('sat') && ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].includes(cleanDay)) return true
      if ((sDay.includes('mon') && sDay.includes('sun')) || sDay.includes('daily') || sDay.includes('all days')) return true
      if (sDay.includes(cleanDay.slice(0, 3))) return true
      return false
    })

    if (!matched) {
      result[day.full] = {
        dayName: day.full,
        isAvailable: false,
        timings: 'Not Available',
        type: 'Regular OPD Consultation',
      }
      continue
    }

    const status = (matched.status || '').toLowerCase()
    const rawTimings = (matched.timings || '').toLowerCase()
    const isUnavailable =
      status === 'unavailable' ||
      status === 'off' ||
      status === 'on leave' ||
      rawTimings.includes('not available') ||
      rawTimings.includes('off') ||
      rawTimings.trim() === '—' ||
      rawTimings.trim() === '-' ||
      rawTimings.trim() === ''

    if (isUnavailable) {
      result[day.full] = {
        dayName: day.full,
        isAvailable: false,
        timings: 'Not Available',
        type: matched.type || 'Regular OPD Consultation',
      }
      continue
    }

    let shift1 = matched.shift1 ? cleanTimings(matched.shift1) : ''
    let shift2 = matched.shift2 ? cleanTimings(matched.shift2) : ''
    let timings = matched.timings ? cleanTimings(matched.timings) : ''

    // If shift1 is not explicitly set, split timings by '&' or ','
    if (!shift1 && timings) {
      const parts = timings.split(/[&,]/).map(cleanTimings).filter(Boolean)
      shift1 = parts[0] || timings
      if (parts.length > 1) {
        shift2 = parts[1]
      }
    }

    // Standardize combined timings
    if (shift1 && shift2 && (!timings || timings === shift1)) {
      timings = `${shift1} & ${shift2}`
    } else if (!timings && shift1) {
      timings = shift1
    }

    result[day.full] = {
      dayName: day.full,
      isAvailable: true,
      shift1,
      shift2,
      timings: timings || '10:00 AM – 4:00 PM',
      type: matched.type || 'Regular OPD Consultation',
    }
  }

  return result
}

export default function DoctorCard({ doctor: doc, variant = 'default' }: DoctorCardProps) {
  const isCore = variant === 'core-partner'

  const [currentDoc, setCurrentDoc] = useState<any>(doc)

  // Hydrate full doctor data if customized in admin roster
  useEffect(() => {
    const hydrateDoc = () => {
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
    }

    hydrateDoc()

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'clinicacure_admin_doctors') {
        hydrateDoc()
      }
    }
    window.addEventListener('storage', handleStorage)
    window.addEventListener('clinicacure_doctors_updated', hydrateDoc)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('clinicacure_doctors_updated', hydrateDoc)
    }
  }, [doc.slug, (doc as any).id])

  // Resolve daily schedules dynamically
  const daySchedules = useMemo(
    () => resolveDoctorDaySchedules(currentDoc.schedule_sessions),
    [currentDoc.schedule_sessions]
  )

  const availableDaysCount = useMemo(
    () => Object.values(daySchedules).filter((d) => d.isAvailable).length,
    [daySchedules]
  )

  // No day selected by default
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  // If currently selected day becomes unavailable after edit, reset it
  useEffect(() => {
    if (selectedDay && !daySchedules[selectedDay]?.isAvailable) {
      setSelectedDay(null)
    }
  }, [daySchedules, selectedDay])

  const currentDaySchedule = selectedDay ? daySchedules[selectedDay] : null

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

      {/* OPD Schedule & Interactive Day Selector */}
      <div className={`border-t border-[#DDEAE7]/70 ${isCore ? 'mt-3.5 pt-3' : 'mt-4 pt-3.5'}`}>
        <p className="text-[10.5px] sm:text-[11px] font-display font-bold text-slate-700/80 uppercase tracking-wider mb-1.5">
          OPD Timings
        </p>

        {availableDaysCount === 0 ? (
          <div className="text-slate-500 py-0.5 text-xs font-semibold flex items-center gap-2">
            <span>On Call • 24x7 Emergency Consultations</span>
          </div>
        ) : (
          <>
            {/* 7 Days Row - Tight clean gap without capsules */}
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
                    className={`flex flex-col items-center justify-center min-w-[24px] py-1 transition-all select-none ${
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

            {/* Dynamic Timings Display - Appears only when day is clicked */}
            {selectedDay && currentDaySchedule?.isAvailable && (
              <div className="mt-1.5 text-xs text-slate-700 flex flex-wrap items-center gap-1.5">
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
          </>
        )}
      </div>

      {/* Qualifications */}
      <div className={`border-t border-[#DDEAE7]/70 ${isCore ? 'mt-3.5 pt-3' : 'mt-4 pt-3.5'}`}>
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
