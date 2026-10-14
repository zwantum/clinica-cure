'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, ExternalLink, Bell } from 'lucide-react'
import { StaffUser } from '../types'

interface AdminHeaderProps {
  user: StaffUser | null
  onOpenMobile: () => void
}

export function AdminHeader({ user, onOpenMobile }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-[#E5EAF0] sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobile}
          className="p-2 rounded-lg text-[#5F6B7A] hover:bg-[#F7F8FA] hover:text-[#172033] md:hidden transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center text-xs text-[#5F6B7A]">
          <span className="font-medium">Clinica Cure Core Operations (Ranchi, Jharkhand)</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Public Website Preview Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#172033] bg-[#F7F8FA] hover:bg-[#E5EAF0] border border-[#E5EAF0] transition-colors"
        >
          <span>Public Portal</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#5F6B7A]" />
        </Link>

        {/* Quick Notifications */}
        <NotificationBell />

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-3 border-l border-[#E5EAF0]">
          <div className="w-8 h-8 rounded-full bg-[#FFCC00] text-[#172033] flex items-center justify-center font-bold text-xs">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div className="hidden md:block text-left">
            <span className="block text-xs font-bold text-[#172033] leading-tight">
              {user?.name || 'Administrator'}
            </span>
            <span className="block text-[10.5px] text-[#5F6B7A] capitalize leading-tight">
              {user?.roleName || user?.role?.replace('_', ' ') || 'Super Admin'}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

function NotificationBell() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [appointments, setAppointments] = React.useState<any[]>([])
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const loadRecent = async () => {
    try {
      const res = await fetch('/api/appointments?limit=5')
      if (res.ok) {
        const data = await res.json()
        const list = Array.isArray(data) ? data : data?.appointments || []
        setAppointments(list.slice(0, 5))
      }
    } catch {
      // fallback to localStorage
      try {
        const local = localStorage.getItem('clinicacure_admin_appointments')
        if (local) {
          setAppointments(JSON.parse(local).slice(0, 5))
        }
      } catch {
        // ignore
      }
    }
  }

  React.useEffect(() => {
    loadRecent()

    const onUpdate = () => {
      loadRecent()
    }

    window.addEventListener('clinicacure_appointment_booked', onUpdate)
    window.addEventListener('focus', onUpdate)
    window.addEventListener('storage', onUpdate)

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('clinicacure_appointment_booked', onUpdate)
      window.removeEventListener('focus', onUpdate)
      window.removeEventListener('storage', onUpdate)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const pendingCount = appointments.filter((a) => a.status === 'pending').length

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-[#5F6B7A] hover:bg-[#F7F8FA] hover:text-[#172033] transition-colors relative cursor-pointer"
        title="Recent Appointments & Alerts"
        aria-expanded={isOpen}
      >
        <Bell className="w-4 h-4" />
        {pendingCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#DC2626] text-white text-[9.5px] font-bold flex items-center justify-center leading-none">
            {pendingCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E5EAF0] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-3 bg-[#F7F8FA] border-b border-[#E5EAF0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#172033]">Recent Appointments</span>
              {pendingCount > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FEF3C7] text-[#92400E]">
                  {pendingCount} pending
                </span>
              )}
            </div>
            <Link
              href="/admin/appointments"
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-semibold text-[#172033] hover:underline"
            >
              View All Queue →
            </Link>
          </div>

          <div className="max-h-72 overflow-y-auto divide-y divide-[#F0F4F8]">
            {appointments.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#5F6B7A]">
                No recent appointment bookings found.
              </div>
            ) : (
              appointments.map((apt) => (
                <Link
                  key={apt.id || apt.booking_reference}
                  href="/admin/appointments"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 hover:bg-[#F7F8FA] transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-[#172033]">
                      {apt.patient_name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        apt.status === 'confirmed'
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : apt.status === 'cancelled'
                          ? 'bg-[#FEE2E2] text-[#DC2626]'
                          : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}
                    >
                      {apt.status || 'pending'}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#5F6B7A] flex items-center gap-1.5">
                    <span>{apt.doctor_name || 'Assigned Specialist'}</span>
                    <span>•</span>
                    <span>{apt.appointment_date}</span>
                    {apt.time_slot && (
                      <>
                        <span>•</span>
                        <span>{apt.time_slot}</span>
                      </>
                    )}
                  </div>
                  <div className="text-[10px] text-[#8C98A4] mt-0.5">
                    Ref: {apt.booking_reference}
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="p-2 bg-[#FAFBFD] border-t border-[#E5EAF0] text-center">
            <Link
              href="/admin/appointments"
              onClick={() => setIsOpen(false)}
              className="inline-block w-full py-1.5 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors"
            >
              Go to Appointments Desk
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

