'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CalendarDays, Phone, Building2, Search, ChevronRight } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function FloatingActions() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Floating Left Sticky Actions Bar (Desktop / Large Tablet) */}
      <aside
        id="left-sticky-actions"
        aria-label="Quick Actions"
        className={`fixed left-2 lg:left-3 top-1/2 -translate-y-1/2 flex-col gap-0.5 z-50 transition-all duration-500 hidden lg:flex ${
          visible
            ? 'transform translate-x-0 opacity-100 pointer-events-auto'
            : 'transform -translate-x-20 opacity-0 pointer-events-none'
        }`}
      >
        {/* 1. Book Appointment */}
        <Link
          href="/book-appointment"
          className="flex items-center h-12 w-12 hover:w-[250px] rounded-full bg-white hover:bg-[#FEF3C7] border border-slate-200 shadow-lg transition-all duration-300 overflow-hidden relative group/btn cursor-pointer mb-3.5"
          title="Book Appointment"
        >
          <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-transparent relative z-10 p-2.5">
            <CalendarDays className="w-5 h-5 text-[#26B09A]" strokeWidth={2} />
          </div>
          <span className="font-display font-bold text-xs sm:text-sm text-[#12302C] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pl-2 pr-12">
            Book Appointment
          </span>
          <div className="absolute right-1 w-9 h-9 rounded-full bg-[#26B09A] text-white flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 shadow-sm">
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
        </Link>

        {/* 2. Emergency Helpline */}
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="flex items-center h-12 w-12 hover:w-[245px] rounded-full bg-white hover:bg-[#FEE2E2] border border-slate-200 shadow-lg transition-all duration-300 overflow-hidden relative group/btn cursor-pointer mb-3.5"
          title="Emergency Helpline"
        >
          <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-transparent relative z-10 p-2.5">
            <Phone className="w-5 h-5 text-red-600 animate-pulse" strokeWidth={2} />
          </div>
          <span className="font-display font-bold text-xs sm:text-sm text-[#991B1B] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pl-2 pr-12">
            Emergency Helpline
          </span>
          <div className="absolute right-1 w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 shadow-sm">
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
        </a>

        {/* 3. Visit Hospital */}
        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center h-12 w-12 hover:w-[200px] rounded-full bg-white hover:bg-[#E0F2FE] border border-slate-200 shadow-lg transition-all duration-300 overflow-hidden relative group/btn cursor-pointer mb-3.5"
          title="Visit Hospital"
        >
          <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-transparent relative z-10 p-2.5">
            <Building2 className="w-5 h-5 text-[#0284C7]" strokeWidth={2} />
          </div>
          <span className="font-display font-bold text-xs sm:text-sm text-[#0369A1] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pl-2 pr-12">
            Visit Hospital
          </span>
          <div className="absolute right-1 w-9 h-9 rounded-full bg-[#0284C7] text-white flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 shadow-sm">
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
        </a>

        {/* 4. Search Doctors */}
        <Link
          href="/doctors"
          className="flex items-center h-12 w-12 hover:w-[215px] rounded-full bg-white hover:bg-[#FFEDD5] border border-slate-200 shadow-lg transition-all duration-300 overflow-hidden relative group/btn cursor-pointer focus:outline-none mb-3.5"
          title="Search Doctors"
        >
          <div className="w-12 h-12 shrink-0 flex items-center justify-center bg-transparent relative z-10 p-2.5">
            <Search className="w-5 h-5 text-[#EA580C]" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-xs sm:text-sm text-[#C2410C] whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pl-2 pr-12">
            Search Doctors
          </span>
          <div className="absolute right-1 w-9 h-9 rounded-full bg-[#EA580C] text-white flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 shadow-sm">
            <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </div>
        </Link>
      </aside>

      {/* Sticky Mobile Action Bar (Mobile / Small Tablet) */}
      <nav
        aria-label="Mobile quick actions"
        className="lg:hidden fixed bottom-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-6px_25px_-5px_rgba(18,48,44,0.12)] px-1 py-1.5 flex items-center justify-around overflow-hidden"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0.5rem)' }}
      >
        {/* 1. Book Appointment */}
        <Link
          href="/book-appointment"
          className="flex-1 min-w-0 max-w-[25%] flex flex-col items-center justify-center py-1 px-1 rounded-xl text-center group active:scale-95 transition-all select-none"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
            <CalendarDays className="w-5 h-5 text-[#26B09A]" strokeWidth={2} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-display font-semibold text-slate-800 group-hover:text-[#26B09A] mt-0.5 whitespace-nowrap truncate w-full">
            Appointment
          </span>
        </Link>

        {/* 2. Emergency Helpline */}
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="flex-1 min-w-0 max-w-[25%] flex flex-col items-center justify-center py-1 px-1 rounded-xl text-center group active:scale-95 transition-all select-none"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center relative">
            <Phone className="w-5 h-5 text-red-600 animate-pulse" strokeWidth={2} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-display font-bold text-red-600 group-hover:text-red-700 mt-0.5 whitespace-nowrap truncate w-full">
            Emergency
          </span>
        </a>

        {/* 3. Visit Hospital */}
        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-0 max-w-[25%] flex flex-col items-center justify-center py-1 px-1 rounded-xl text-center group active:scale-95 transition-all select-none"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#0284C7]" strokeWidth={2} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-display font-semibold text-slate-800 group-hover:text-[#0284C7] mt-0.5 whitespace-nowrap truncate w-full">
            Location
          </span>
        </a>

        {/* 4. Search Doctors */}
        <Link
          href="/doctors"
          className="flex-1 min-w-0 max-w-[25%] flex flex-col items-center justify-center py-1 px-1 rounded-xl text-center group active:scale-95 transition-all select-none"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
            <Search className="w-5 h-5 text-[#EA580C]" strokeWidth={2.5} />
          </div>
          <span className="text-[10px] sm:text-[11px] font-display font-semibold text-slate-800 group-hover:text-[#EA580C] mt-0.5 whitespace-nowrap truncate w-full">
            Doctors
          </span>
        </Link>
      </nav>

      {/* Spacer on mobile to prevent bottom bar from overlapping content */}
      <div className="lg:hidden h-14" aria-hidden="true" />
    </>
  )
}
