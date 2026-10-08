import type { Metadata } from 'next'
import { Suspense } from 'react'
import AppointmentHeroSection from '@/components/appointment/AppointmentHeroSection'
import AppointmentBookingEngine from '@/components/appointment/AppointmentBookingEngine'
import AppointmentFaqSection from '@/components/appointment/AppointmentFaqSection'

export const metadata: Metadata = {
  title: 'Book an Appointment | OPD Consultation | Clinica Cure Hospital Ranchi',
  description:
    'Schedule your outpatient consultation at Clinica Cure Hospital Bariatu, Ranchi. Instant digital token booking with 34+ senior doctors across 20+ specialized clinical departments.',
}

export default function BookAppointmentPage() {
  return (
    <div className="bg-[#F8FAF9] min-h-screen text-slate-800">
      {/* ── 1. Full-Width Hero Section matching site design ── */}
      <AppointmentHeroSection />

      {/* ── 2. Interactive Booking Engine & Helpful Sidebar ── */}
      <Suspense
        fallback={
          <div className="py-24 text-center text-slate-500">
            <div className="w-10 h-10 border-3 border-[#0E746D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-slate-700">Loading Clinica Cure Appointment Engine...</p>
            <p className="text-xs text-slate-400 mt-1">Connecting to OPD real-time schedule...</p>
          </div>
        }
      >
        <AppointmentBookingEngine />
      </Suspense>

      {/* ── 3. Clinical Reassurance & Appointment FAQs ── */}
      <AppointmentFaqSection />
    </div>
  )
}
