'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  X,
  UserRound,
  Stethoscope,
  CalendarDays,
  PhoneCall,
  MapPin,
  ArrowRight,
  Activity,
  Building2,
  HeartHandshake,
} from 'lucide-react'
import { SEED_DOCTORS } from '@/config/constants'
import { departments } from '@/config/navigation'
import { siteConfig } from '@/config/site'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const QUICK_SERVICES = [
  {
    title: 'Book an Appointment',
    subtitle: 'Consult specialist doctors online or in OPD',
    href: '/book-appointment',
    icon: CalendarDays,
    badge: 'Instant',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    title: '24x7 Emergency Response',
    subtitle: 'Call immediate dispatch & ambulance',
    href: `tel:${siteConfig.phoneRaw}`,
    icon: PhoneCall,
    badge: '24x7',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    external: true,
  },
  {
    title: 'Browse All Specialist Doctors',
    subtitle: 'Surgeons, intensivists & consultants in Ranchi',
    href: '/doctors',
    icon: UserRound,
    badge: `${SEED_DOCTORS.length} Specialists`,
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    title: 'Hospital Location & Directions',
    subtitle: 'Bariatu Road, Ranchi, Jharkhand - 834009',
    href: siteConfig.mapsUrl,
    icon: MapPin,
    badge: 'Map',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    external: true,
  },
]

const POPULAR_TAGS = [
  'Dr. Syed Altamash',
  'Cardiology',
  'Laparoscopic Surgery',
  'Brain & Spine',
  'Dr. Tarique',
  'Orthopaedics',
  'Emergency',
  'Gynaecology',
]

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input on open & lock background scroll
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const q = query.trim().toLowerCase()

  // Filter Doctors
  const matchedDoctors = q
    ? SEED_DOCTORS.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.designation.toLowerCase().includes(q) ||
          doc.short_title?.toLowerCase().includes(q) ||
          doc.qualifications.some((qual) => qual.toLowerCase().includes(q)) ||
          doc.specializations.some((s) => s.toLowerCase().includes(q)) ||
          doc.departments.some((d) => d.toLowerCase().includes(q))
      )
    : []

  // Filter Departments
  const matchedDepartments = q
    ? departments.filter(
        (dept) =>
          dept.name.toLowerCase().includes(q) ||
          dept.slug.toLowerCase().includes(q)
      )
    : []

  // Filter Quick Services
  const matchedServices = q
    ? QUICK_SERVICES.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q)
      )
    : []

  const hasResults =
    matchedDoctors.length > 0 ||
    matchedDepartments.length > 0 ||
    matchedServices.length > 0

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Clinica Cure Hospital"
      className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-20 px-3.5 sm:px-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh] transition-all"
      >
        {/* Search Header Bar */}
        <div className="flex items-center gap-3 px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-100 bg-white shrink-0">
          <div className="flex-1 flex items-center bg-slate-50 hover:bg-slate-100/70 focus-within:bg-white rounded-2xl px-4 py-3 border border-slate-200/80 focus-within:border-[#0E6B60] focus-within:ring-4 focus-within:ring-[#0E6B60]/10 transition-all">
            <Search className="w-5 h-5 text-[#0E6B60] shrink-0" strokeWidth={2.2} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search doctors, specialities, treatments..."
              className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 placeholder:font-normal font-medium border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none pl-3.5 pr-2 py-0.5 shadow-none"
              style={{ outline: 'none' }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-2xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            aria-label="Close search"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Search Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Active Query Results */}
          {q ? (
            hasResults ? (
              <div className="space-y-6">
                {/* Matched Doctors */}
                {matchedDoctors.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0E6B60] flex items-center gap-1.5">
                        <UserRound className="w-3.5 h-3.5" />
                        Doctors ({matchedDoctors.length})
                      </span>
                      <Link
                        href="/doctors"
                        onClick={onClose}
                        className="text-xs font-semibold text-slate-500 hover:text-[#0E6B60] flex items-center gap-1 transition-colors"
                      >
                        All Doctors <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {matchedDoctors.map((doc) => (
                        <Link
                          key={doc.slug}
                          href={`/doctors/${doc.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-3.5 py-3 px-2 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                            {doc.profile_image ? (
                              <Image
                                src={doc.profile_image}
                                alt={doc.name}
                                width={44}
                                height={44}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold">
                                {doc.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-display font-semibold text-sm text-slate-900 group-hover:text-[#0E6B60] transition-colors truncate">
                                {doc.name}
                              </span>
                              {doc.short_title && (
                                <span className="hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-teal-50 text-[#0E6B60] border border-teal-100 truncate">
                                  {doc.short_title}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 truncate mt-0.5">
                              {doc.designation}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                              {doc.specializations.slice(0, 3).join(' • ')}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Departments */}
                {matchedDepartments.length > 0 && (
                  <div>
                    <div className="pb-2 mb-2 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0E6B60] flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5" />
                        Departments &amp; Specialities ({matchedDepartments.length})
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {matchedDepartments.map((dept) => (
                        <Link
                          key={dept.slug}
                          href={`/departments/${dept.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/40 transition-all group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0E6B60] flex items-center justify-center shrink-0">
                              <Stethoscope className="w-4 h-4" />
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#0E6B60] transition-colors truncate">
                              {dept.name}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Quick Services */}
                {matchedServices.length > 0 && (
                  <div>
                    <div className="pb-2 mb-2 border-b border-slate-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0E6B60] flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        Hospital Services ({matchedServices.length})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {matchedServices.map((item) => {
                        const Icon = item.icon
                        const isExt = item.external
                        const Component = isExt ? 'a' : Link
                        const extraProps = isExt
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {}
                        return (
                          <Component
                            key={item.title}
                            href={item.href}
                            {...extraProps}
                            onClick={onClose}
                            className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/40 transition-all group"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0E6B60] flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <span className="block text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-[#0E6B60] transition-colors truncate">
                                  {item.title}
                                </span>
                                <span className="block text-[11px] text-slate-500 truncate">
                                  {item.subtitle}
                                </span>
                              </div>
                            </div>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${item.badgeColor}`}>
                              {item.badge}
                            </span>
                          </Component>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* No Results State */
              <div className="text-center py-10 sm:py-12">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-slate-800 text-base">
                  No matching results for &ldquo;{query}&rdquo;
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                  Try searching for a doctor&apos;s name, department (e.g. Cardiology, Surgery), or specific medical treatments.
                </p>
                <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
                  <Link
                    href="/doctors"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-[#0E6B60] text-white text-xs font-semibold hover:bg-[#0c5950] transition-colors"
                  >
                    View All Doctors
                  </Link>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Call Hospital: {siteConfig.phone}
                  </a>
                </div>
              </div>
            )
          ) : (
            /* Empty State: Popular Searches & Quick Links */
            <div className="space-y-6">
              {/* Popular Search Tags */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 bg-slate-100 hover:bg-[#0E6B60] hover:text-white transition-all cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Services */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Quick Actions
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {QUICK_SERVICES.map((item) => {
                    const Icon = item.icon
                    const isExt = item.external
                    const Component = isExt ? 'a' : Link
                    const extraProps = isExt
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {}
                    return (
                      <Component
                        key={item.title}
                        href={item.href}
                        {...extraProps}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-[#F6FBFA] hover:bg-white hover:border-[#0E6B60]/30 hover:shadow-xs transition-all group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-white text-[#0E6B60] flex items-center justify-center shadow-2xs border border-slate-100 shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-xs font-semibold text-slate-900 group-hover:text-[#0E6B60] transition-colors truncate">
                              {item.title}
                            </span>
                            <span className="block text-[10.5px] text-slate-500 truncate">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </Component>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 sm:px-7 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0"></span>
            <span>
              Need assistance? Call our 24×7 hospital desk:{' '}
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="font-bold text-[#0E6B60] hover:underline"
              >
                {siteConfig.phone}
              </a>
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
