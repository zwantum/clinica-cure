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
          <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
            <Phone className="w-5 h-5 text-red-600" strokeWidth={2} />
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

      {/* Right-Side Floating WhatsApp Button */}
      <aside
        id="right-floating-whatsapp"
        aria-label="WhatsApp Support"
        className="fixed right-4 sm:right-6 bottom-20 lg:bottom-7 z-50 pointer-events-auto"
      >
        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Clinica Cure on WhatsApp"
          className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)] transition-all duration-300 hover:scale-110 active:scale-95"
          title="Chat on WhatsApp"
        >
          {/* Subtle Ambient Pulse Ring */}
          <span
            className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35 pointer-events-none"
            aria-hidden="true"
          />

          {/* Official WhatsApp SVG Icon */}
          <svg
            className="w-7 h-7 sm:w-7.5 sm:h-7.5 fill-current relative z-10 shrink-0 drop-shadow-xs"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>

          {/* Desktop/Tablet Hover Tooltip */}
          <span
            className="hidden sm:inline-block pointer-events-none absolute right-full mr-3.5 top-1/2 -translate-y-1/2 bg-slate-900/90 text-white font-display font-medium text-xs py-1.5 px-3 rounded-xl shadow-lg opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap"
            aria-hidden="true"
          >
            Chat on WhatsApp
            <span className="absolute top-1/2 -translate-y-1/2 left-full -ml-1 border-4 border-transparent border-l-slate-900/90" />
          </span>
        </a>
      </aside>
    </>
  )
}
