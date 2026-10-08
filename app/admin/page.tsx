'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SEED_DOCTORS } from '@/config/constants'
import { departments } from '@/config/navigation'

interface AppointmentRecord {
  id: string
  patient_name: string
  phone: string
  department_name?: string
  doctor_name?: string
  appointment_date: string
  appointment_time?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  reason?: string
}

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([
    {
      id: 'APT-10821',
      patient_name: 'Rajesh Verma',
      phone: '+91 94311 23456',
      department_name: 'Orthopaedics',
      doctor_name: 'Dr. Syed Altamash',
      appointment_date: '2026-03-29',
      appointment_time: '11:00 AM',
      status: 'pending',
      reason: 'Post-operative knee examination and mobility evaluation.',
    },
    {
      id: 'APT-10822',
      patient_name: 'Sunita Mishra',
      phone: '+91 98350 78901',
      department_name: 'Obstetrics & Gynaecology',
      doctor_name: 'Dr. Soniya Bansal',
      appointment_date: '2026-03-29',
      appointment_time: '02:30 PM',
      status: 'confirmed',
      reason: 'Second trimester ultrasound and routine antenatal checkup.',
    },
    {
      id: 'APT-10823',
      patient_name: 'Mohammad Farhan',
      phone: '+91 91234 56789',
      department_name: 'Neurology & Neurosurgery',
      doctor_name: 'Dr. Tarique Jamil Hasan',
      appointment_date: '2026-03-30',
      appointment_time: '10:30 AM',
      status: 'pending',
      reason: 'Persistent cervical neck stiffness and arm numbness.',
    },
  ])

  const [activeTab, setActiveTab] = useState<'appointments' | 'doctors' | 'settings'>('appointments')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    // Fetch live appointments from API if available
    fetch('/api/appointments')
      .then((res) => res.json())
      .then((data) => {
        if (data.appointments && data.appointments.length > 0) {
          setAppointments(data.appointments)
        }
      })
      .catch(() => {})
  }, [])

  const updateStatus = (id: string, newStatus: AppointmentRecord['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    )
  }

  const filteredAppointments = appointments.filter((apt) => {
    if (filterStatus === 'all') return true
    return apt.status === filterStatus
  })

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Admin Navbar */}
      <header className="bg-[#0B211D] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-lg text-white">
            Clinica Cure <span className="text-[#26B09A]">Portal</span>
          </span>
          <span className="bg-[#26B09A]/20 text-[#26B09A] text-[11px] font-bold px-2 py-0.5 rounded">
            Hospital Admin
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-white/60">Staff: Bariatu Desk</span>
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            ← Public Website
          </Link>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-[1400px] mx-auto p-6 md:p-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-xs font-semibold text-slate-500">Total Appointments</p>
            <p className="font-display font-extrabold text-2xl text-slate-900 mt-1">
              {appointments.length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-xs font-semibold text-amber-600">Pending Review</p>
            <p className="font-display font-extrabold text-2xl text-amber-600 mt-1">
              {appointments.filter((a) => a.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-xs font-semibold text-emerald-600">Confirmed Slots</p>
            <p className="font-display font-extrabold text-2xl text-emerald-600 mt-1">
              {appointments.filter((a) => a.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <p className="text-xs font-semibold text-[#0E746D]">Specialists Active</p>
            <p className="font-display font-extrabold text-2xl text-[#0E746D] mt-1">
              {SEED_DOCTORS.length}
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-2 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'appointments'
                ? 'bg-[#0E746D] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Appointments Desk
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'doctors'
                ? 'bg-[#0E746D] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Doctors Roster ({SEED_DOCTORS.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#0E746D] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Departments ({departments.length})
          </button>
        </div>

        {/* TAB 1: Appointments List */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-slate-900 text-base">
                  Incoming Patient Booking Queue
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update appointment review status and communicate with patients.
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
                {['all', 'pending', 'confirmed', 'completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all cursor-pointer ${
                      filterStatus === st
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-5">ID / Patient</th>
                    <th className="py-3 px-5">Contact</th>
                    <th className="py-3 px-5">Department &amp; Doctor</th>
                    <th className="py-3 px-5">Requested Date</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-5">
                        <span className="font-mono text-[10px] text-slate-400 block">{apt.id}</span>
                        <span className="font-bold text-slate-900 text-sm">{apt.patient_name}</span>
                        {apt.reason && (
                          <span className="block text-[11px] text-slate-500 mt-0.5 max-w-xs truncate">
                            {apt.reason}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <a href={`tel:${apt.phone}`} className="text-slate-900 font-semibold hover:text-[#0E746D]">
                          {apt.phone}
                        </a>
                      </td>
                      <td className="py-4 px-5">
                        <span className="text-slate-900 font-semibold block">{apt.department_name || 'General OPD'}</span>
                        <span className="text-slate-500 text-[11px]">{apt.doctor_name || 'Assigned Specialist'}</span>
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span className="font-semibold text-slate-900">{apt.appointment_date}</span>
                        {apt.appointment_time && (
                          <span className="block text-[11px] text-[#0E746D]">{apt.appointment_time}</span>
                        )}
                      </td>
                      <td className="py-4 px-5 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : apt.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : apt.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="inline-flex gap-1.5">
                          {apt.status === 'pending' && (
                            <button
                              onClick={() => updateStatus(apt.id, 'confirmed')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-semibold cursor-pointer shadow-2xs"
                            >
                              Confirm
                            </button>
                          )}
                          {apt.status === 'confirmed' && (
                            <button
                              onClick={() => updateStatus(apt.id, 'completed')}
                              className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-semibold cursor-pointer shadow-2xs"
                            >
                              Complete
                            </button>
                          )}
                          {apt.status !== 'cancelled' && (
                            <button
                              onClick={() => updateStatus(apt.id, 'cancelled')}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 rounded-lg text-[11px] font-semibold cursor-pointer"
                            >
                              Cancel
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

        {/* TAB 2: Doctors List */}
        {activeTab === 'doctors' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEED_DOCTORS.map((doc) => (
              <div key={doc.slug} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-4">
                <img src={doc.profile_image} alt={doc.name} className="w-14 h-14 rounded-xl object-cover" />
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h3>
                  <p className="text-xs text-[#0E746D] truncate">{doc.designation}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{doc.qualifications.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Departments */}
        {activeTab === 'settings' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <div key={dept.slug} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <span className="font-semibold text-slate-800 text-xs">{dept.name}</span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">Active</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
