'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CalendarDays,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Eye,
  UserPlus,
  Hospital,
  AlertCircle,
} from 'lucide-react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import { EmptyState } from '../components/EmptyState'
import { LoadingState } from '../components/LoadingState'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { OpdPrintSlipModal } from '../components/OpdPrintSlipModal'
import {
  fetchAppointments,
  updateAppointmentStatus,
  createManualAppointment,
} from '../services/appointments'
import { fetchDoctors } from '../services/doctors'
import { AppointmentRecord, DoctorRecord } from '../types'

export default function AppointmentsPage() {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([])
  const [doctors, setDoctors] = useState<DoctorRecord[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [doctorFilter, setDoctorFilter] = useState<string>('all')

  // Modals state
  const [isWalkInOpen, setIsWalkInOpen] = useState(false)
  const [printToken, setPrintToken] = useState<AppointmentRecord | null>(null)
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null)
  const [cancelReason, setCancelReason] = useState('')

  // Walk-in form state
  const [walkInPatient, setWalkInPatient] = useState({
    patient_name: '',
    phone: '',
    department_name: 'General Medicine',
    doctor_name: 'Dr. Syed Altamash',
    doctor_slug: 'dr-syed-altamash',
    appointment_date: new Date().toISOString().split('T')[0],
    appointment_time: '11:00 AM',
    reason: 'Walk-in acute medical consultation',
    status: 'confirmed' as const,
  })

  const loadData = async () => {
    setLoading(true)
    const [apts, docs] = await Promise.all([fetchAppointments(), fetchDoctors()])
    setAppointments(apts)
    setDoctors(docs)
    setLoading(false)
  }

  useEffect(() => {
    loadData()

    const handleNewBooking = () => {
      loadData()
    }
    window.addEventListener('clinicacure_appointment_booked', handleNewBooking)
    window.addEventListener('clinicacure_appointment_updated', handleNewBooking)
    window.addEventListener('focus', handleNewBooking)
    window.addEventListener('storage', handleNewBooking)

    return () => {
      window.removeEventListener('clinicacure_appointment_booked', handleNewBooking)
      window.removeEventListener('clinicacure_appointment_updated', handleNewBooking)
      window.removeEventListener('focus', handleNewBooking)
      window.removeEventListener('storage', handleNewBooking)
    }
  }, [])

  // Filter Logic
  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      searchQuery === '' ||
      apt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.booking_reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor_name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' || apt.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesDoctor =
      doctorFilter === 'all' || apt.doctor_slug === doctorFilter || apt.doctor_name === doctorFilter

    return matchesSearch && matchesStatus && matchesDoctor
  })

  const handleStatusChange = async (id: string, newStatus: AppointmentRecord['status']) => {
    await updateAppointmentStatus(id, newStatus)
    loadData()
  }

  const handleConfirmCancel = async () => {
    if (confirmCancelId) {
      await updateAppointmentStatus(confirmCancelId, 'cancelled', cancelReason)
      setConfirmCancelId(null)
      setCancelReason('')
      loadData()
    }
  }

  const handleCreateWalkIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!walkInPatient.patient_name || !walkInPatient.phone) return
    const created = await createManualAppointment(walkInPatient)
    setIsWalkInOpen(false)
    setPrintToken(created)
    loadData()
  }

  if (loading) {
    return <LoadingState message="Loading OPD appointment queue..." />
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Appointments Desk' }]} />

      <PageHeader
        title="Appointments &amp; OPD Booking Queue"
        description="Verify online reservations, assign consultation tokens, manage cancellations, and register on-spot walk-ins."
        actions={
          <button
            type="button"
            onClick={() => setIsWalkInOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors shadow-xs cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Walk-in Patient</span>
          </button>
        }
      />

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Patient name, phone (+91), Token ID, or Specialist..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden focus:border-[#172033] bg-[#F7F8FA]"
          />
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Status Select */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 text-xs font-medium border border-[#E5EAF0] rounded-lg bg-white text-[#172033] focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending Review</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Doctor Filter */}
          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="py-2 px-3 text-xs font-medium border border-[#E5EAF0] rounded-lg bg-white text-[#172033] focus:outline-hidden cursor-pointer max-w-[200px]"
          >
            <option value="all">All Specialists (35)</option>
            {doctors.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Appointments Operational Table */}
      {filteredAppointments.length === 0 ? (
        <EmptyState
          title="No Appointments Found"
          description="Try adjusting your search criteria, or register a new walk-in patient."
          action={
            <button
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
                setDoctorFilter('all')
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#172033] text-white hover:bg-[#0F172A]"
            >
              Reset Filters
            </button>
          }
        />
      ) : (
        <div className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F8FA] text-[#5F6B7A] border-b border-[#E5EAF0] uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Patient Information</th>
                  <th className="py-3 px-4">Specialist &amp; Specialty</th>
                  <th className="py-3 px-4">Date &amp; Slot</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF0]">
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-[#F7F8FA] transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#172033] font-mono block">
                        {apt.booking_reference}
                      </span>
                      <span className="text-[10px] text-[#5F6B7A]">
                        {new Date(apt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#172033] block">{apt.patient_name}</span>
                      <span className="text-[11px] text-[#5F6B7A]">{apt.phone}</span>
                      {apt.reason && (
                        <span className="text-[10.5px] text-[#806600] line-clamp-1 italic mt-0.5">
                          &quot;{apt.reason}&quot;
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#172033] block">{apt.doctor_name}</span>
                      <span className="text-[10.5px] text-[#5F6B7A]">{apt.department_name}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#172033] block">{apt.appointment_date}</span>
                      <span className="text-[11px] text-[#16A34A] font-bold">{apt.appointment_time}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={apt.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {apt.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(apt.id, 'confirmed')}
                            title="Confirm OPD Slot"
                            className="p-1.5 rounded-md bg-[#16A34A] text-white hover:bg-[#15803D] transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {apt.status === 'confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(apt.id, 'completed')}
                            title="Mark Consultation Complete"
                            className="p-1.5 rounded-md bg-[#172033] text-white hover:bg-[#0F172A] transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setPrintToken(apt)}
                          title="Print Official Token Pass"
                          className="p-1.5 rounded-md border border-[#E5EAF0] text-[#5F6B7A] hover:bg-[#F7F8FA] hover:text-[#172033] transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>

                        <Link
                          href={`/admin/appointments/${apt.id}`}
                          title="View Details"
                          className="p-1.5 rounded-md border border-[#E5EAF0] text-[#5F6B7A] hover:bg-[#F7F8FA] hover:text-[#172033] transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        {apt.status !== 'cancelled' && apt.status !== 'completed' && (
                          <button
                            type="button"
                            onClick={() => setConfirmCancelId(apt.id)}
                            title="Cancel Appointment"
                            className="p-1.5 rounded-md text-[#DC2626] hover:bg-[#FEE2E2] transition-colors cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: Walk-in Registration Modal */}
      {isWalkInOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full border border-[#E5EAF0] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#E5EAF0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FFCC00] text-[#172033] flex items-center justify-center font-bold">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#172033]">Register OPD Walk-in Patient</h3>
                  <p className="text-[11px] text-[#5F6B7A]">Generate instant consultation token at Front Desk</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWalkInOpen(false)}
                className="text-[#5F6B7A] hover:text-[#172033] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateWalkIn} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={walkInPatient.patient_name}
                  onChange={(e) => setWalkInPatient({ ...walkInPatient, patient_name: e.target.value })}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden focus:border-[#172033]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={walkInPatient.phone}
                  onChange={(e) => setWalkInPatient({ ...walkInPatient, phone: e.target.value })}
                  placeholder="+91 94311 00000"
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden focus:border-[#172033]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Select Specialist *</label>
                  <select
                    value={walkInPatient.doctor_slug}
                    onChange={(e) => {
                      const doc = doctors.find((d) => d.slug === e.target.value)
                      setWalkInPatient({
                        ...walkInPatient,
                        doctor_slug: e.target.value,
                        doctor_name: doc?.name || '',
                        department_name: doc?.department_name || '',
                      })
                    }}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden bg-white"
                  >
                    {doctors.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.name} ({d.department_name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#172033] mb-1">Time Slot *</label>
                  <input
                    type="text"
                    value={walkInPatient.appointment_time}
                    onChange={(e) => setWalkInPatient({ ...walkInPatient, appointment_time: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1">Medical Concern / Symptoms</label>
                <textarea
                  rows={2}
                  value={walkInPatient.reason}
                  onChange={(e) => setWalkInPatient({ ...walkInPatient, reason: e.target.value })}
                  placeholder="Primary complaint..."
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5EAF0]">
                <button
                  type="button"
                  onClick={() => setIsWalkInOpen(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-[#5F6B7A] hover:bg-[#F7F8FA] rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Issue OPD Token Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Professional Printable OPD Token Slip */}
      <OpdPrintSlipModal
        appointment={printToken}
        onClose={() => setPrintToken(null)}
      />

      {/* Cancellation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(confirmCancelId)}
        title="Cancel Patient Appointment"
        message="Are you sure you want to cancel this booking? This slot will immediately be released back into the available pool."
        confirmText="Confirm Cancellation"
        isDestructive={true}
        onConfirm={handleConfirmCancel}
        onCancel={() => {
          setConfirmCancelId(null)
          setCancelReason('')
        }}
      />
    </div>
  )
}
