import Link from 'next/link'
import { CalendarCheck, Clock, ShieldCheck, UserCheck, PhoneCall } from 'lucide-react'

export default function AppointmentHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F0F8FC] border-b border-slate-200/80 py-8 sm:py-6 md:py-7 lg:py-14">
      {/* Background Graphic / Hospital Ambient Image */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[48%] lg:w-[50%] xl:w-[52%] pointer-events-none select-none z-0">
        <div className="relative w-full h-full">
          <img
            src="/images/contact-hero-hospital.webp"
            alt="Clinica Cure Hospital OPD & Consultation"
            className="w-full h-full object-cover object-right lg:object-center [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_100%)] opacity-25 md:opacity-85 lg:opacity-95"
          />
        </div>
      </div>

      {/* Seamless Unified Overlay across the section */}
      <div className="absolute inset-0 pointer-events-none select-none z-[1] bg-gradient-to-r from-[#F0F8FC] via-[#F0F8FC]/95 via-35% md:via-[#F0F8FC]/75 md:via-45% lg:via-transparent to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
            <Link href="/" className="hover:text-[#0E746D] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Book Appointment</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2  py-1  text-[#0E746D] text-xs font-bold tracking-wide uppercase mb-1">
            OUTPATIENT CONSULTATION &amp; PRIORITY OPD
          </div>

          {/* Heading */}
          <h1 className="font-display font-semibold text-slate-900 text-2xl sm:text-3xl md:text-[34px] lg:text-[42px] leading-[1.16] tracking-tight">
            Schedule Your Consultation with <br className="hidden sm:inline" />
            <span className="text-[#0E746D]">Clinica Cure</span> Specialists
          </h1>

          {/* Description */}
          <p className="mt-2.5 text-[14px] sm:text-sm md:text-[15px] text-slate-600 leading-relaxed max-w-xl">
            Book guaranteed consultation slots with Ranchi&apos;s senior medical faculty across 20+ specialized clinical departments. Real-time digital token confirmation with no advance payment required.
          </p>

          {/* Open unboxed highlights with separators */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-y-2.5 gap-x-4 sm:gap-x-6 text-xs sm:text-[13px] text-slate-700 font-medium">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#0E746D] shrink-0" />
              <span className="font-semibold text-slate-800">Instant Confirmation</span>
            </div>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#0E746D] shrink-0" />
              <span className="font-semibold text-slate-800">34+ Specialists</span>
            </div>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0E746D] shrink-0" />
              <span className="font-semibold text-slate-800">Pay at Hospital</span>
            </div>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0E746D] shrink-0" />
              <span className="font-semibold text-slate-800">Zero Wait Priority</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
