'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  Stethoscope,
  Droplet,
  Mail,
  AlertTriangle,
  Plus,
  ArrowRight,
  UserCheck,
  Building,
  Star,
  BookOpen,
} from 'lucide-react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import { LoadingState } from '../components/LoadingState'
import { fetchAppointments, updateAppointmentStatus } from '../services/appointments'
import { fetchDoctors } from '../services/doctors'
import { fetchBloodStock } from '../services/blood-bank'
import { fetchEnquiries } from '../services/enquiries'
import { AppointmentRecord, DoctorRecord, BloodStockRecord, EnquiryRecord } from '../types'

export default function OverviewPage() {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([])
  const [doctors, setDoctors] = useState<DoctorRecord[]>([])
  const [bloodStock, setBloodStock] = useState<BloodStockRecord[]>([])
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([])

  const loadData = async (isInitial = false) => {
    if (isInitial) setLoading(true)
    try {
      const [apts, docs, stock, enqs] = await Promise.all([
        fetchAppointments(),
        fetchDoctors(),
        fetchBloodStock(),
        fetchEnquiries(),
      ])
      setAppointments(apts)
      setDoctors(docs)
      setBloodStock(stock)
      setEnquiries(enqs)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData(true)

    const handleUpdate = () => {
      loadData(false)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('clinicacure_appointment_booked', handleUpdate)
      window.addEventListener('clinicacure_appointment_updated', handleUpdate)
      window.addEventListener('clinicacure_blood_stock_updated', handleUpdate)
      window.addEventListener('clinicacure_blood_request_created', handleUpdate)
      window.addEventListener('clinicacure_blood_donation_created', handleUpdate)
      window.addEventListener('clinicacure_enquiry_created', handleUpdate)
      window.addEventListener('clinicacure_enquiry_updated', handleUpdate)
      window.addEventListener('clinicacure_doctor_updated', handleUpdate)
      window.addEventListener('focus', handleUpdate)
      window.addEventListener('storage', handleUpdate)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('clinicacure_appointment_booked', handleUpdate)
        window.removeEventListener('clinicacure_appointment_updated', handleUpdate)
        window.removeEventListener('clinicacure_blood_stock_updated', handleUpdate)
        window.removeEventListener('clinicacure_blood_request_created', handleUpdate)
        window.removeEventListener('clinicacure_blood_donation_created', handleUpdate)
        window.removeEventListener('clinicacure_enquiry_created', handleUpdate)
        window.removeEventListener('clinicacure_enquiry_updated', handleUpdate)
        window.removeEventListener('clinicacure_doctor_updated', handleUpdate)
        window.removeEventListener('focus', handleUpdate)
        window.removeEventListener('storage', handleUpdate)
      }
    }
  }, [])

  if (loading) {
    return <LoadingState message="Loading Clinica Cure operational metrics..." />
  }

  // Calculated Metrics
  const pendingApts = appointments.filter((a) => a.status === 'pending')
  const confirmedApts = appointments.filter((a) => a.status === 'confirmed')
  const completedApts = appointments.filter((a) => a.status === 'completed')
  const activeDoctors = doctors.filter((d) => d.is_active && !d.is_on_leave)
  const criticalBlood = bloodStock.filter((b) => b.status === 'critical' || b.available_units <= b.min_threshold)
  const newEnquiries = enquiries.filter((e) => e.status === 'new')

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Operational Overview' }]} />

      <PageHeader
        title="Hospital Operational Overview"
        description="Live status monitoring of Clinica Cure OPD queue, active rosters, blood bank, and enquiries."
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/appointments"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Register OPD Walk-in</span>
            </Link>
            <Link
              href="/admin/doctors/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#172033] bg-white border border-[#E5EAF0] hover:bg-[#F7F8FA] transition-colors"
            >
              <Stethoscope className="w-3.5 h-3.5 text-[#5F6B7A]" />
              <span>Add Specialist</span>
            </Link>
          </div>
        }
      />

      {/* Critical Operational Banner (If low blood or pending tasks exist) */}
      {criticalBlood.length > 0 && (
        <div className="p-4 rounded-xl bg-[#FEE2E2] border border-[#FECACA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[#DC2626]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#DC2626] text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-xs sm:text-sm">
                Critical Blood Bank Stock Alert ({criticalBlood.length} Groups Below Safe Threshold)
              </h2>
              <p className="text-xs text-[#DC2626]/80 mt-0.5">
                Groups {criticalBlood.map((b) => `${b.blood_group} (${b.available_units} units)`).join(', ')} require replenishment.
              </p>
            </div>
          </div>
          <Link
            href="/admin/blood-bank"
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-colors shrink-0 text-center"
          >
            Manage Blood Stock →
          </Link>
        </div>
      )}

      {/* 6 Metric KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#5F6B7A] mb-2">
            <span className="text-xs font-semibold">Total Queue</span>
            <CalendarDays className="w-4 h-4 text-[#5F6B7A]" />
          </div>
          <span className="text-2xl font-semibold text-[#172033] block">{appointments.length}</span>
          <span className="text-[11px] text-[#5F6B7A] mt-1 block">Scheduled tokens</span>
        </div>

        <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#D97706] mb-2">
            <span className="text-xs font-semibold">Pending Review</span>
            <Clock className="w-4 h-4" />
          </div>
          <span className="text-2xl font-semibold text-[#D97706] block">{pendingApts.length}</span>
          <span className="text-[11px] text-[#5F6B7A] mt-1 block">Awaiting confirmation</span>
        </div>

        <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#16A34A] mb-2">
            <span className="text-xs font-semibold">Confirmed</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-2xl font-semibold text-[#16A34A] block">{confirmedApts.length}</span>
          <span className="text-[11px] text-[#5F6B7A] mt-1 block">Ready for consult</span>
        </div>

        <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#172033] mb-2">
            <span className="text-xs font-semibold">Doctors on Duty</span>
            <UserCheck className="w-4 h-4 text-[#16A34A]" />
          </div>
          <span className="text-2xl font-semibold text-[#172033] block">{activeDoctors.length}</span>
          <span className="text-[11px] text-[#5F6B7A] mt-1 block">of {doctors.length} specialists</span>
        </div>

        <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#DC2626] mb-2">
            <span className="text-xs font-semibold">Blood Alerts</span>
            <Droplet className="w-4 h-4" />
          </div>
          <span className="text-2xl font-semibold text-[#DC2626] block">{criticalBlood.length}</span>
          <span className="text-[11px] text-[#5F6B7A] mt-1 block">Low stock groups</span>
        </div>

        <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl shadow-xs">
          <div className="flex items-center justify-between text-[#2563EB] mb-2">
            <span className="text-xs font-semibold">New Enquiries</span>
            <Mail className="w-4 h-4" />
          </div>
          <span className="text-2xl font-semibold text-[#2563EB] block">{newEnquiries.length}</span>
          <span className="text-[11px] text-[#5F6B7A] mt-1 block">Unresolved messages</span>
        </div>
      </div>

      {/* Main Operational Split: Today's OPD Schedule Table & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-[#E5EAF0] rounded-xl overflow-hidden shadow-xs flex flex-col">
          <div className="p-4 border-b border-[#E5EAF0] flex items-center justify-between">
            <div>
              <h2 className="font-bold text-sm text-[#172033]">Today&apos;s OPD Queue &amp; Schedule</h2>
              <p className="text-xs text-[#5F6B7A] mt-0.5">Real-time patient bookings awaiting or completed</p>
            </div>
            <Link
              href="/admin/appointments"
              className="text-xs font-bold text-[#172033] hover:text-[#E6B800] flex items-center gap-1 transition-colors"
            >
              <span>View Full Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto flex-1">
            {appointments.length === 0 ? (
              <div className="p-8 text-center text-[#5F6B7A]">
                <CalendarDays className="w-8 h-8 mx-auto mb-2 text-[#A0AEC0]" />
                <p className="font-semibold text-xs text-[#172033]">No Active OPD Bookings</p>
                <p className="text-[11px] text-[#5F6B7A] mt-0.5">
                  New online patient bookings or campus walk-ins will appear here in real time.
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F8FA] text-[#5F6B7A] border-b border-[#E5EAF0] uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Time &amp; Token</th>
                    <th className="py-3 px-4">Patient Name</th>
                    <th className="py-3 px-4">Specialist / Dept</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF0]">
                  {appointments.slice(0, 8).map((apt) => (
                    <tr key={apt.id} className="hover:bg-[#F7F8FA] transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#172033] block">{apt.appointment_time || '10:00 AM'}</span>
                        <span className="text-[10px] text-[#5F6B7A] font-mono block">{apt.booking_reference}</span>
                        {apt.appointment_date && (
                          <span className="text-[10px] text-[#8C9BA8] block">{apt.appointment_date}</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-[#172033] block">{apt.patient_name}</span>
                        <span className="text-[11px] text-[#5F6B7A]">{apt.phone}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#172033] block">{apt.doctor_name}</span>
                        <span className="text-[10.5px] text-[#5F6B7A]">{apt.department_name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={apt.status} />
                      </td>
                      <td className="py-3 px-4 text-right">
                        {apt.status === 'pending' ? (
                          <button
                            type="button"
                            onClick={async () => {
                              await updateAppointmentStatus(apt.id, 'confirmed')
                              loadData(false)
                            }}
                            className="px-2.5 py-1 rounded bg-[#16A34A] text-white font-bold text-[11px] hover:bg-[#15803D] transition-colors cursor-pointer"
                          >
                            Confirm
                          </button>
                        ) : apt.status === 'confirmed' ? (
                          <button
                            type="button"
                            onClick={async () => {
                              await updateAppointmentStatus(apt.id, 'completed')
                              loadData(false)
                            }}
                            className="px-2.5 py-1 rounded bg-[#172033] text-white font-bold text-[11px] hover:bg-[#0F172A] transition-colors cursor-pointer"
                          >
                            Complete
                          </button>
                        ) : (
                          <span className="text-[11px] text-[#5F6B7A] italic">Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Right Column: Quick Action Cards & Operational Alerts */}
        <div className="space-y-4">
          {/* Quick Actions Shortcuts */}
          <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl shadow-xs">
            <h2 className="font-bold text-sm text-[#172033] mb-3">Operational Shortcuts</h2>
            <div className="space-y-2">
              <Link
                href="/admin/appointments"
                className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5EAF0] hover:bg-[#F7F8FA] transition-colors text-xs font-semibold text-[#172033]"
              >
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="w-4 h-4 text-[#FFCC00]" />
                  <span>Manual OPD Booking</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#5F6B7A]" />
              </Link>

              <Link
                href="/admin/blood-bank"
                className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5EAF0] hover:bg-[#F7F8FA] transition-colors text-xs font-semibold text-[#172033]"
              >
                <div className="flex items-center gap-2.5">
                  <Droplet className="w-4 h-4 text-[#DC2626]" />
                  <span>Update Blood Stock Units</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#5F6B7A]" />
              </Link>

              <Link
                href="/admin/doctors"
                className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5EAF0] hover:bg-[#F7F8FA] transition-colors text-xs font-semibold text-[#172033]"
              >
                <div className="flex items-center gap-2.5">
                  <Stethoscope className="w-4 h-4 text-[#16A34A]" />
                  <span>Doctor Shift Roster &amp; Leaves</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#5F6B7A]" />
              </Link>

              <Link
                href="/admin/enquiries"
                className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5EAF0] hover:bg-[#F7F8FA] transition-colors text-xs font-semibold text-[#172033]"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#2563EB]" />
                  <span>Review Patient Enquiries</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#5F6B7A]" />
              </Link>

              <Link
                href="/admin/reviews"
                className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5EAF0] hover:bg-[#F7F8FA] transition-colors text-xs font-semibold text-[#172033]"
              >
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-[#EAB308]" />
                  <span>Manage Google Reviews</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#5F6B7A]" />
              </Link>

              <Link
                href="/admin/blog"
                className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5EAF0] hover:bg-[#F7F8FA] transition-colors text-xs font-semibold text-[#172033]"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#0E746D]" />
                  <span>Blog &amp; Medical Articles</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#5F6B7A]" />
              </Link>
            </div>
          </div>

          {/* Blood Stock Status Snapshot */}
          <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-sm text-[#172033]">Blood Bank Snapshot</h2>
              <Link href="/admin/blood-bank" className="text-xs font-bold text-[#DC2626] hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {bloodStock.map((b) => {
                const isLong = b.blood_group.length > 5
                return (
                  <div
                    key={b.blood_group}
                    className={`p-2 rounded-lg text-center border ${isLong ? 'col-span-2' : 'col-span-1'} ${b.status === 'critical'
                      ? 'bg-[#FEE2E2] border-[#FECACA] text-[#DC2626]'
                      : b.status === 'moderate'
                        ? 'bg-[#FEF3C7] border-[#FDE68A] text-[#D97706]'
                        : 'bg-[#F7F8FA] border-[#E5EAF0] text-[#172033]'
                      }`}
                  >
                    <span className="block text-xs font-bold truncate">{b.blood_group}</span>
                    <span className="block text-sm font-semibold mt-0.5">{b.available_units}u</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
