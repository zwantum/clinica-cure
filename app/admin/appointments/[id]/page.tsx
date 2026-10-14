'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  CalendarDays,
  User,
  Phone,
  Mail,
  Stethoscope,
  Building,
  Clock,
  Printer,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  FileText,
  AlertCircle,
} from 'lucide-react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageHeader } from '../../components/PageHeader'
import { StatusBadge } from '../../components/StatusBadge'
import { LoadingState } from '../../components/LoadingState'
import { OpdPrintSlipModal } from '../../components/OpdPrintSlipModal'
import { fetchAppointments, updateAppointmentStatus } from '../../services/appointments'
import { AppointmentRecord } from '../../types'

export default function AppointmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [loading, setLoading] = useState(true)
  const [appointment, setAppointment] = useState<AppointmentRecord | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [showPrintModal, setShowPrintModal] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const all = await fetchAppointments()
      const found = all.find((a) => a.id === id)
      if (found) {
        setAppointment(found)
        setAdminNotes(found.admin_notes || '')
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return <LoadingState message="Loading appointment details..." />
  }

  if (!appointment) {
    return (
      <div className="p-8 text-center bg-white border border-[#E5EAF0] rounded-xl">
        <AlertCircle className="w-8 h-8 text-[#DC2626] mx-auto mb-2" />
        <h2 className="text-base font-bold text-[#172033]">Appointment Not Found</h2>
        <p className="text-xs text-[#5F6B7A] mt-1">This booking may have been removed or archived.</p>
        <Link
          href="/admin/appointments"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-4 text-xs font-bold text-white bg-[#172033] rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Appointments</span>
        </Link>
      </div>
    )
  }

  const handleUpdate = async (status: AppointmentRecord['status']) => {
    setIsSaving(true)
    await updateAppointmentStatus(appointment.id, status, adminNotes)
    setAppointment({ ...appointment, status, admin_notes: adminNotes })
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Appointments', href: '/admin/appointments' },
          { label: appointment.booking_reference },
        ]}
      />

      <PageHeader
        title={`Appointment: ${appointment.booking_reference}`}
        description="Patient clinical reservation sheet and consultation tracking."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPrintModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-[#172033] bg-white border border-[#E5EAF0] hover:bg-[#F7F8FA] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print OPD Slip</span>
            </button>

            {appointment.status === 'pending' && (
              <button
                type="button"
                onClick={() => handleUpdate('confirmed')}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#16A34A] hover:bg-[#15803D]"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirm Reservation</span>
              </button>
            )}

            {appointment.status === 'confirmed' && (
              <button
                type="button"
                onClick={() => handleUpdate('completed')}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#172033] hover:bg-[#0F172A]"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Consulted</span>
              </button>
            )}

            {appointment.status !== 'cancelled' && (
              <button
                type="button"
                onClick={() => handleUpdate('cancelled')}
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-[#DC2626] bg-[#FEE2E2] hover:bg-[#FECACA]"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Patient & Booking Specs */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#172033] pb-3 border-b border-[#E5EAF0]">
              Patient Demographics &amp; Contact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#5F6B7A] block">Full Name</span>
                <span className="font-bold text-[#172033] text-sm block mt-0.5">{appointment.patient_name}</span>
              </div>
              <div>
                <span className="text-[#5F6B7A] block">Contact Phone</span>
                <span className="font-bold text-[#172033] text-sm block mt-0.5">{appointment.phone}</span>
              </div>
              <div>
                <span className="text-[#5F6B7A] block">Email Address</span>
                <span className="font-medium text-[#172033] block mt-0.5">{appointment.email || 'None on record'}</span>
              </div>
              <div>
                <span className="text-[#5F6B7A] block">Age &amp; Gender</span>
                <span className="font-medium text-[#172033] block mt-0.5">
                  {appointment.age ? `${appointment.age} yrs` : 'Not specified'} • {appointment.gender || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#172033] pb-3 border-b border-[#E5EAF0]">
              Consultation &amp; Specialty Assignment
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#5F6B7A] block">Consulting Specialist</span>
                <span className="font-bold text-[#172033] text-sm block mt-0.5">{appointment.doctor_name}</span>
              </div>
              <div>
                <span className="text-[#5F6B7A] block">Department</span>
                <span className="font-bold text-[#172033] block mt-0.5">{appointment.department_name}</span>
              </div>
              <div>
                <span className="text-[#5F6B7A] block">Scheduled Date</span>
                <span className="font-bold text-[#172033] block mt-0.5">{appointment.appointment_date}</span>
              </div>
              <div>
                <span className="text-[#5F6B7A] block">Reserved Slot</span>
                <span className="font-bold text-[#16A34A] block mt-0.5">{appointment.appointment_time}</span>
              </div>
            </div>

            {appointment.reason && (
              <div className="pt-3 border-t border-[#E5EAF0]">
                <span className="text-[#5F6B7A] text-xs font-semibold block mb-1">
                  Reported Medical Complaint / Reason:
                </span>
                <div className="p-3 bg-[#FFF9DB] border border-[#FFCC00]/40 rounded-lg text-xs text-[#806600]">
                  &quot;{appointment.reason}&quot;
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Status & Staff Notes */}
        <div className="space-y-6">
          <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-[#172033] pb-3 border-b border-[#E5EAF0]">
              Current Operational Status
            </h2>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#5F6B7A]">Status</span>
              <StatusBadge status={appointment.status} />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5F6B7A]">Booked On</span>
              <span className="font-medium text-[#172033]">
                {new Date(appointment.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-[#172033]">Front Desk Staff Notes</h2>
            <textarea
              rows={4}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Internal verification notes (e.g. VIP patient, insurance card verified)..."
              className="w-full p-2.5 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden focus:border-[#172033]"
            />
            <button
              type="button"
              disabled={isSaving}
              onClick={() => handleUpdate(appointment.status)}
              className="w-full py-2 text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Save Internal Notes
            </button>
          </div>
        </div>
      </div>

      {/* Printable OPD Consultation Slip Modal */}
      <OpdPrintSlipModal
        appointment={showPrintModal ? appointment : null}
        onClose={() => setShowPrintModal(false)}
      />
    </div>
  )
}
