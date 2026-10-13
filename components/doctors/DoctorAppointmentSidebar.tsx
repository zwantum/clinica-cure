'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  CalendarDays,
  Phone,
  PhoneCall,
  Building2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import { getDoctorSchedule } from '@/config/doctor-schedules'

interface DoctorAppointmentSidebarProps {
  doctorName: string
  doctorSlug: string
  departmentName: string
  departmentSlug: string
}

export function DoctorAppointmentSidebar({
  doctorName,
  doctorSlug,
  departmentName,
  departmentSlug,
}: DoctorAppointmentSidebarProps) {
  const doctorSchedule = getDoctorSchedule(doctorSlug)
  const today = new Date()

  // Calendar state based on current date
  const [currentDate, setCurrentDate] = useState(today)
  const [selectedDay, setSelectedDay] = useState(today.getDate())

  const timeSlots = [
    ...doctorSchedule.slots.morning,
    ...doctorSchedule.slots.evening,
  ]
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[0] || '10:00 AM')

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  // Get total days in month and starting day index (0 = Sun, 1 = Mon...)
  const firstDayIndex = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d)
  }

  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      {/* ── 1. Book an Appointment Master Card ── */}
      <div
        id="book-appointment"
        className="scroll-mt-28 rounded-[28px] border border-[#DDEAE7] overflow-hidden shadow-xl shadow-[#0E746D]/8 bg-white transition-all"
      >
        {/* Rich Header with Background Texture / Watermark Accent */}
        <div className="relative bg-gradient-to-br from-[#0B5C56] via-[#0E746D] to-[#074742] text-white p-5 sm:p-6 pb-9 sm:pb-10 overflow-hidden">
          {/* Subtle medical curve & geometric watermark pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.14] pointer-events-none overflow-hidden"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 400 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-20 60 Q 100 10 220 50 T 440 60"
                stroke="white"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M-20 110 Q 100 60 220 100 T 440 110"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <circle cx="340" cy="40" r="65" stroke="white" strokeWidth="1.5" />
              <circle
                cx="340"
                cy="40"
                r="95"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <circle
                cx="50"
                cy="170"
                r="55"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          {/* Soft ambient blur glow */}
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header Content */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/20 shadow-sm shrink-0">
                <CalendarDays className="w-4.5 h-4.5 text-emerald-100" />
              </div>
              <h3 className="font-display font-bold text-lg text-white tracking-tight">
                Book an Appointment
              </h3>
            </div>
            <p className="mt-2 text-xs text-white/85 leading-relaxed">
              Consult with {doctorName} for expert radiology and imaging services.
            </p>
          </div>
        </div>

        {/* Card Body - Elevated with prominent rounded top border radius overlapping into the teal header */}
        <div className="relative z-10 -mt-5 sm:-mt-6 rounded-t-[26px] sm:rounded-t-[30px] bg-white p-5 sm:p-6 space-y-6 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          {/* Select Date */}
          <div>
            <div className="mb-3">
              <span className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                Select Date
              </span>
            </div>

            {/* Month & Year Navigator */}
            <div className="flex items-center justify-between px-1 mb-2.5">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {monthNames[month]} {year}
              </span>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar Table */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10.5px]">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="py-1 font-semibold text-slate-400">
                  {d}
                </div>
              ))}
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="h-7" />
                }
                const dayDate = new Date(year, month, day)
                const isAvailable = doctorSchedule.availableDays.includes(dayDate.getDay())
                const isSelected = day === selectedDay

                return (
                  <button
                    key={day}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => isAvailable && setSelectedDay(day)}
                    title={isAvailable ? `Available on ${monthNames[month]} ${day}` : `Dr. ${doctorName} is not scheduled on this day`}
                    className={`h-7 w-7 mx-auto rounded-full text-xs flex items-center justify-center font-medium transition-all ${
                      isSelected
                        ? 'bg-[#0E746D] text-white font-bold shadow-md shadow-[#0E746D]/20 scale-105'
                        : isAvailable
                        ? 'text-slate-700 hover:bg-[#EAF7F4] hover:text-[#0E746D] cursor-pointer'
                        : 'text-slate-300 opacity-35 cursor-not-allowed'
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Select Time Slot */}
          <div className="pt-4 border-t border-slate-100">
            <div className="mb-3">
              <span className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                Select Time Slot
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = slot === selectedSlot
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-1 text-[11px] font-semibold rounded-xl border text-center transition-all cursor-pointer ${isSelected
                        ? 'bg-white border-1 border-[#0E746D] text-[#0E746D] shadow-xs font-bold'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Buttons INSIDE the box */}
          <div className="pt-2 space-y-2.5">
            {/* 1. Book Appointment CTA Button */}
            <Link
              href={`/book-appointment?doctor=${doctorSlug}&date=${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}&slot=${encodeURIComponent(
                selectedSlot
              )}`}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#0E746D] hover:bg-[#0b5c57] text-white font-display font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#0E746D]/20 active:scale-[0.98] cursor-pointer"
            >
              <CalendarDays className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. 24/7 Emergency Call Card ── */}
      <a
        href={`tel:${siteConfig.phoneRaw}`}
        className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-[#FFF5F5] via-[#FFF8F6] to-[#FFF5F5] p-3.5 sm:p-4 flex items-center justify-between shadow-2xs group hover:border-rose-300 hover:shadow-xs transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <PhoneCall className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <div className="text-xs font-bold text-red-600 uppercase tracking-wide">
              24/7 Emergency
            </div>
            <div className="text-sm sm:text-base font-display font-bold text-slate-900 mt-0.5">
              {siteConfig.phone}
            </div>
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-red-500 group-hover:translate-x-1 transition-transform shrink-0" />
      </a>

      {/* ── 3. Department Card ── */}
      <div className="bg-white rounded-3xl border border-[#DDEAE7] p-5 sm:p-6 shadow-2xs">
        <div className="w-9 h-9 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-3">
          <Building2 className="w-4.5 h-4.5" />
        </div>
        <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
          DEPARTMENT
        </span>
        <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg mt-0.5">
          {departmentName || 'Radiology & Imaging'}
        </h3>
        <p className="text-[14px] sm:text-xs text-slate-600 mt-2 leading-relaxed">
          Comprehensive diagnostic imaging services with advanced technology and expert interpretation.
        </p>
        <Link
          href={`/departments/${departmentSlug || 'radiology'}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E746D] hover:underline mt-4 group"
        >
          <span>Explore Department</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* ── 4. Hospital Facilities Card ── */}
      <div className="bg-white rounded-3xl border border-[#DDEAE7] p-5 sm:p-6 shadow-2xs">
        <div className="w-9 h-9 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-3">
          <Building2 className="w-4.5 h-4.5" />
        </div>
        <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
          HOSPITAL FACILITIES
        </span>
        <div className="mt-3 rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-100">
          <img
            src="/images/facilities/mri-scanner-suite.jpg"
            alt="Hospital Facilities"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-[14px] sm:text-xs text-slate-600 mt-3 leading-relaxed">
          Advanced imaging technology for accurate and timely diagnosis.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E746D] bg-[#EAF7F4] hover:bg-[#ddf2ed] px-3.5 py-1.5 rounded-xl transition-colors mt-3"
        >
          <span>View Our Facilities</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  )
}
