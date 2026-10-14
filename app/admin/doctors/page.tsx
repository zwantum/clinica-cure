'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Stethoscope,
  Search,
  Filter,
  Plus,
  ExternalLink,
  Edit3,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import { LoadingState } from '../components/LoadingState'
import { fetchDoctors, toggleDoctorLeave, toggleDoctorActive } from '../services/doctors'
import { DoctorRecord } from '../types'

export default function DoctorsListPage() {
  const [loading, setLoading] = useState(true)
  const [doctors, setDoctors] = useState<DoctorRecord[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')

  const loadData = async () => {
    setLoading(true)
    const docs = await fetchDoctors()
    setDoctors(docs)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const departments = Array.from(new Set(doctors.map((d) => d.department_name)))

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      searchQuery === '' ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department_name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDept = deptFilter === 'all' || doc.department_name === deptFilter

    return matchesSearch && matchesDept
  })

  const handleToggleLeave = async (slug: string) => {
    await toggleDoctorLeave(slug)
    loadData()
  }

  const handleToggleActive = async (slug: string) => {
    await toggleDoctorActive(slug)
    loadData()
  }

  if (loading) {
    return <LoadingState message="Loading hospital specialists roster..." />
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Doctors & Availability' }]} />

      <PageHeader
        title="Specialists &amp; Shift Availability Roster"
        description="Manage the hospital's clinical consultants, consultation chamber schedules, and leave exceptions."
        actions={
          <Link
            href="/admin/doctors/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Doctor</span>
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specialist by name, designation, or specialty..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden focus:border-[#172033] bg-[#F7F8FA]"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="py-2 px-3 text-xs font-medium border border-[#E5EAF0] rounded-lg bg-white text-[#172033] focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Departments ({departments.length})</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Operational Doctors Table */}
      <div className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] text-[#5F6B7A] border-b border-[#E5EAF0] uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4 min-w-[220px]">Doctor &amp; Designation</th>
                <th className="py-3 px-4 min-w-[130px]">Department</th>
                <th className="py-3 px-4 min-w-[340px]">Available Days &amp; Time Slots</th>
                <th className="py-3 px-4 min-w-[110px]">Duty Status</th>
                <th className="py-3 px-4 text-right min-w-[110px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF0]">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D5ECE6] bg-[#E8F5F2] shrink-0 relative shadow-2xs">
                        <img
                          src={
                            doc.profile_image ||
                            (doc.gender === 'Female'
                              ? '/images/doctors/doctor-female.svg'
                              : '/images/doctors/doctor-male.svg')
                          }
                          alt={doc.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            e.currentTarget.src =
                              doc.gender === 'Female'
                                ? '/images/doctors/doctor-female.svg'
                                : '/images/doctors/doctor-male.svg'
                          }}
                        />
                      </div>
                      <div>
                        <span className="font-bold text-[#172033] block text-xs">{doc.name}</span>
                        <span className="text-[11px] text-[#5F6B7A] block">{doc.designation}</span>
                        <span className="text-[10px] text-[#806600] font-medium block">
                          {doc.qualifications?.join(', ')}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#172033]">{doc.department_name}</span>
                    <span className="text-[10.5px] text-[#5F6B7A] block">{doc.experience_years} exp</span>
                  </td>
                  <td className="py-3.5 px-4 min-w-[340px]">
                    <div className="space-y-1.5 py-0.5">
                      {doc.schedule_sessions && doc.schedule_sessions.length > 0 ? (
                        doc.schedule_sessions.map((sess, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1.5 text-[11.5px] whitespace-nowrap">
                            <span className="font-bold text-[#172033]">{sess.day}:</span>
                            <span className="text-[#0E746D] font-mono text-[11px] font-semibold bg-[#EAF7F4] px-2 py-0.5 rounded-md border border-[#C5E8E0]/70 inline-flex items-center">
                              {sess.timings}
                            </span>
                            {sess.status === 'Unavailable' && (
                              <span className="text-[9.5px] font-bold text-[#DC2626] bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                                (Off)
                              </span>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="flex items-center gap-1.5 text-[11.5px] whitespace-nowrap">
                          <span className="font-bold text-[#172033]">Mon – Sat:</span>
                          <span className="text-[#0E746D] font-mono text-[11px] font-semibold bg-[#EAF7F4] px-2 py-0.5 rounded-md border border-[#C5E8E0]/70 inline-flex items-center">
                            10:00 AM – 4:00 PM
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      {doc.is_on_leave ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEE2E2] text-[#DC2626]">
                          On Leave
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DCFCE7] text-[#16A34A]">
                          On Duty
                        </span>
                      )}
                      {!doc.is_active && (
                        <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9.5px] font-bold bg-slate-100 text-slate-500">
                          Unpublished
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Toggle On Duty / Leave */}
                      <button
                        type="button"
                        onClick={() => handleToggleLeave(doc.slug)}
                        title={doc.is_on_leave ? 'Mark Specialist On Duty' : 'Mark Specialist On Leave'}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                          doc.is_on_leave
                            ? 'bg-[#16A34A] text-white hover:bg-[#15803D]'
                            : 'bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA]'
                        }`}
                      >
                        {doc.is_on_leave ? 'Mark Active' : 'Mark Leave'}
                      </button>

                      <Link
                        href={`/admin/doctors/${doc.slug}/edit`}
                        title="Edit Profile & Schedule"
                        className="p-1.5 rounded-md border border-[#E5EAF0] text-[#5F6B7A] hover:text-[#172033] hover:bg-[#F7F8FA]"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/doctors/${doc.slug}`}
                        target="_blank"
                        title="View Live Public Profile"
                        className="p-1.5 rounded-md border border-[#E5EAF0] text-[#5F6B7A] hover:text-[#172033] hover:bg-[#F7F8FA]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
