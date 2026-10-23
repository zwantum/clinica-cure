'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Users, ArrowRight, Calendar, PhoneCall, Stethoscope } from 'lucide-react'
import DepartmentDoctorCard from '@/components/departments/DepartmentDoctorCard'
import { SEED_DOCTORS } from '@/config/constants'
import { siteConfig } from '@/config/site'

interface DepartmentDoctorsSectionProps {
  departmentName: string
  departmentSlug: string
  aliases?: string[]
  initialDoctors: any[]
}

function doctorMatchesDepartment(
  doc: any,
  deptSlug: string,
  deptName: string,
  aliases: string[] = []
): boolean {
  if (!doc) return false

  const allSlugs = [deptSlug, ...aliases].map((s) => s.toLowerCase().trim())
  const targetName = deptName.toLowerCase().trim()

  // 1. Direct match on department_slug
  if (doc.department_slug && allSlugs.includes(doc.department_slug.toLowerCase().trim())) {
    return true
  }

  // 2. Match on departments array
  if (Array.isArray(doc.departments)) {
    const hasSlugMatch = doc.departments.some((d: any) => {
      if (!d) return false
      const clean = (typeof d === 'string' ? d : d.slug || d.name || '').toLowerCase().trim()
      return allSlugs.includes(clean) || clean === targetName
    })
    if (hasSlugMatch) return true
  }

  // 3. Match on department_name or department string
  const docDeptName = (doc.department_name || doc.department || '').toLowerCase().trim()
  if (docDeptName) {
    if (docDeptName === targetName) return true
    const docDeptSlug = docDeptName.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    if (allSlugs.includes(docDeptSlug)) return true
  }

  return false
}

export default function DepartmentDoctorsSection({
  departmentName,
  departmentSlug,
  aliases = [],
  initialDoctors = [],
}: DepartmentDoctorsSectionProps) {
  const [allRoster, setAllRoster] = useState<any[]>(() => [...SEED_DOCTORS, ...initialDoctors])

  useEffect(() => {
    // 1. Hydrate from admin localStorage if present
    const loadFromStorage = () => {
      try {
        const cached = localStorage.getItem('clinicacure_admin_doctors')
        if (cached) {
          const list = JSON.parse(cached)
          if (Array.isArray(list) && list.length > 0) {
            const map = new Map<string, any>()
            SEED_DOCTORS.forEach((d) => map.set(d.slug, d))
            list.forEach((d) => map.set(d.slug, d))
            setAllRoster(Array.from(map.values()))
          }
        }
      } catch {}
    }

    loadFromStorage()

    // 2. Also fetch from dynamic /api/doctors endpoint
    fetch(`/api/doctors?department=${departmentSlug}`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
          setAllRoster((prev) => {
            const map = new Map<string, any>()
            prev.forEach((d) => map.set(d.slug, d))
            json.data.forEach((d: any) => map.set(d.slug, d))
            return Array.from(map.values())
          })
        }
      })
      .catch(() => {})

    // 3. Listen for updates dispatched by admin doctor editor
    const handleDoctorUpdated = () => {
      loadFromStorage()
    }

    window.addEventListener('clinicacure_doctor_updated', handleDoctorUpdated)
    return () => {
      window.removeEventListener('clinicacure_doctor_updated', handleDoctorUpdated)
    }
  }, [departmentSlug])

  // Filter doctors that belong strictly to this department
  const filteredDoctors = useMemo(() => {
    const matched = allRoster.filter(
      (doc) =>
        doc.is_active !== false &&
        doctorMatchesDepartment(doc, departmentSlug, departmentName, aliases)
    )

    // Deduplicate by slug
    const uniqueMap = new Map<string, any>()
    matched.forEach((d) => uniqueMap.set(d.slug, d))
    return Array.from(uniqueMap.values())
  }, [allRoster, departmentSlug, departmentName, aliases])

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-1">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center shrink-0">
            <Users className="w-4.5 h-4.5" strokeWidth={2} />
          </div>
          <div>
            <h2 className="font-display font-bold text-slate-900 text-xl sm:text-2xl">
              Our Doctors in {departmentName}
            </h2>
          </div>
        </div>

        {/* Desktop / Tablet Sideways Link */}
        <Link
          href="/doctors"
          className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#0E746D] hover:underline shrink-0 pt-1"
        >
          <span>View All Doctors</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <p className="text-[13px] sm:text-sm text-slate-500 mt-1 mb-2.5 sm:mb-6 ml-12">
        {filteredDoctors.length > 0
          ? 'You may also like to consult these specialists:'
          : `Specialist consultants available for outpatient and inpatient care in ${departmentName}:`}
      </p>

      {/* Mobile View Link: Displayed Below Paragraph */}
      <div className="sm:hidden mb-5 ml-12">
        <Link
          href="/doctors"
          className="text-[13px] font-semibold text-[#0E746D] hover:underline inline-flex items-center gap-1.5"
        >
          <span>View All Doctors</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Doctors Grid or Empty State */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredDoctors.map((doc) => (
            <DepartmentDoctorCard key={doc.slug} doctor={doc} />
          ))}
        </div>
      ) : (
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE9] text-center max-w-2xl">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mx-auto mb-3">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg mb-1.5">
            Specialist Consultations in {departmentName}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
            Our department is staffed by visiting senior consultants and on-duty specialists. You can schedule an outpatient appointment or consult our medical reception directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/book-appointment?department=${departmentSlug}`}
              className="px-5 py-2.5 rounded-xl bg-[#0E746D] hover:bg-[#0A635B] text-white font-semibold text-xs transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#0E746D]" />
              <span>Call OPD Desk: {siteConfig.phone}</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
