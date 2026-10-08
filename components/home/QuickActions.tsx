import Link from 'next/link'
import { Users, CalendarDays, LayoutGrid, PhoneCall, ChevronRight } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function QuickActions() {
  return (
    <section className="relative bg-transparent -mt-6 sm:-mt-8 md:-mt-12 z-20 pb-2 sm:pb-4 md:pb-5">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
        {/* 1. Find a Doctor */}
        <Link
          href="/doctors"
          className="group bg-[#F8FAF9] border border-[#DDEAE7] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col justify-between transition-all shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(15,107,94,0.12)] hover:-translate-y-0.5 h-full"
        >
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#0F6B5E] shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.8} />
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#D1EBE6] text-[#0F6B5E] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#0E6B60] group-hover:text-white transition-all">
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" strokeWidth={2.2} />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3.5 md:mt-4">
            <h3 className="font-display font-semibold text-slate-900 text-xs sm:text-sm md:text-base leading-snug">Find a Doctor</h3>
            <p className="hidden sm:block text-[11.5px] sm:text-xs text-slate-600 mt-1 leading-snug">Find the right specialist for your health needs.</p>
          </div>
        </Link>

        {/* 2. Book an Appointment */}
        <Link
          href="/book-appointment"
          className="group bg-[#F8FAF9] border border-[#DDEAE7] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col justify-between transition-all shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(15,107,94,0.12)] hover:-translate-y-0.5 h-full"
        >
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#0F6B5E] shrink-0">
              <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.8} />
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#D1EBE6] text-[#0F6B5E] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#0E6B60] group-hover:text-white transition-all">
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" strokeWidth={2.2} />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3.5 md:mt-4">
            <h3 className="font-display font-semibold text-slate-900 text-xs sm:text-sm md:text-base leading-snug">Book Appointment</h3>
            <p className="hidden sm:block text-[11.5px] sm:text-xs text-slate-600 mt-1 leading-snug">Schedule a consultation with our specialists.</p>
          </div>
        </Link>

        {/* 3. Explore Departments */}
        <Link
          href="/departments"
          className="group bg-[#F8FAF9] border border-[#DDEAE7] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col justify-between transition-all shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(15,107,94,0.12)] hover:-translate-y-0.5 h-full"
        >
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl bg-[#E6F4F1] flex items-center justify-center text-[#0F6B5E] shrink-0">
              <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.8} />
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#D1EBE6] text-[#0F6B5E] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#0E6B60] group-hover:text-white transition-all">
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" strokeWidth={2.2} />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3.5 md:mt-4">
            <h3 className="font-display font-semibold text-slate-900 text-xs sm:text-sm md:text-base leading-snug">Explore Departments</h3>
            <p className="hidden sm:block text-[11.5px] sm:text-xs text-slate-600 mt-1 leading-snug">Explore our medical specialities and services.</p>
          </div>
        </Link>

        {/* 4. Emergency Care */}
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="group bg-[#FFF4F4] border border-[#FECACA] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col justify-between transition-all shadow-[0_2px_10px_rgba(220,38,38,0.05)] hover:shadow-[0_8px_24px_rgba(220,38,38,0.15)] hover:-translate-y-0.5 h-full"
        >
          <div className="flex items-center justify-between gap-1.5 sm:gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl bg-[#FEE2E2] flex items-center justify-center text-[#DC2626] shrink-0">
              <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.8} />
            </div>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#B91C1C] transition-all shadow-sm">
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" strokeWidth={2.2} />
            </div>
          </div>
          <div className="mt-2.5 sm:mt-3.5 md:mt-4">
            <h3 className="font-display font-semibold text-slate-900 text-xs sm:text-sm md:text-base leading-snug">Emergency Care</h3>
            <p className="hidden sm:block text-[11.5px] sm:text-xs text-slate-600 mt-1 leading-snug">24x7 emergency and critical care support.</p>
          </div>
        </a>
      </div>
    </section>
  )
}
