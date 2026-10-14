'use client'

import React, { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Calendar,
  Clock,
  HelpCircle,
  Stethoscope,
  Award,
  Quote,
  BriefcaseMedical,
  Upload,
  ScanLine,
  Heart,
  UserCheck,
  Megaphone,
  Check,
  Copy,
  Sun,
  Moon,
} from 'lucide-react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageHeader } from '../../components/PageHeader'
import { saveDoctor } from '../../services/doctors'
import { DoctorRecord, DoctorExpertiseItem, DoctorScheduleItem, DoctorMetricBadge, DoctorCtaBanner } from '../../types'
import { departments } from '@/config/navigation'

export default function NewDoctorPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const ctaFileInputRef = useRef<HTMLInputElement>(null)

  // Qualifications raw string
  const [qualificationsStr, setQualificationsStr] = useState('MBBS, MD')

  // Form state
  const [formData, setFormData] = useState<Partial<DoctorRecord> & { name: string; slug: string }>({
    name: '',
    slug: '',
    designation: '',
    department_name: 'General Medicine',
    department_slug: 'general-medicine',
    seniority_badge: 'Senior Consultant',
    experience_years: '10+ Years',
    procedures_count: '5,000+',
    expertise_highlight: 'Advanced Clinical Care',
    care_approach: 'Patient-Centric Approach',
    metric_badges: [
      { title: '10+ Years', subtitle: 'Years of Experience' },
      { title: '5,000+', subtitle: 'Procedures Done' },
      { title: 'Advanced Clinical Care', subtitle: 'Clinical Focus' },
      { title: 'Patient-Centric Approach', subtitle: 'Care Philosophy' },
    ],
    consultation_fee: 600,
    profile_image: '/images/doctors/doctor-male.svg',
    is_active: true,
    is_on_leave: false,
    qualifications: ['MBBS', 'MD'],
    short_title: 'Consultant Specialist',
    short_bio: '',
    bio: '',
    quote: '“Accurate diagnosis and compassionate patient care are our foremost commitments.”',
    expertise: [
      { title: 'Clinical Diagnosis', description: 'Comprehensive patient assessment and clinical diagnostic evaluation.' },
      { title: 'Specialist Consultation', description: 'Evidence-based therapeutic planning and ongoing disease management.' },
      { title: 'Advanced Procedural Care', description: 'Modern medical and surgical interventions with minimal downtime.' },
      { title: 'Preventive Follow-up', description: 'Long-term health monitoring and preventive counseling.' },
    ],
    schedule_sessions: [
      { day: 'Monday', timings: '10:00 AM – 01:00 PM', shift1: '10:00 AM – 01:00 PM', shift2: '', type: 'Regular OPD Consultation', status: 'Available' },
      { day: 'Tuesday', timings: '10:00 AM – 01:00 PM', shift1: '10:00 AM – 01:00 PM', shift2: '', type: 'Regular OPD Consultation', status: 'Available' },
      { day: 'Wednesday', timings: '10:00 AM – 01:00 PM', shift1: '10:00 AM – 01:00 PM', shift2: '', type: 'Regular OPD Consultation', status: 'Available' },
      { day: 'Thursday', timings: '10:00 AM – 01:00 PM', shift1: '10:00 AM – 01:00 PM', shift2: '', type: 'Regular OPD Consultation', status: 'Available' },
      { day: 'Friday', timings: '10:00 AM – 01:00 PM', shift1: '10:00 AM – 01:00 PM', shift2: '', type: 'Regular OPD Consultation', status: 'Available' },
    ],
    faqs: [
      {
        question: 'Do I need a prior appointment to consult this specialist?',
        answer: 'While prior online or telephone booking is recommended to avoid waiting queues, walk-in consultations are also accommodated based on day-of OPD slot availability.',
        sort_order: 1,
        is_published: true,
      },
      {
        question: 'What medical documents should I bring?',
        answer: 'Please carry your government ID, previous prescription slips, current medication lists, and past diagnostic reports.',
        sort_order: 2,
        is_published: true,
      },
    ],
    cta_banner: {
      eyebrow: 'CLINICA CURE HOSPITAL',
      title: 'Need a Specialist Consultation?',
      description: 'Book an appointment and get accurate, expert clinical care.',
      button_text: 'Book Appointment',
      button_url: '#book-appointment',
      image: '',
      features: ['Advanced Technology', 'Expert Diagnosis', 'Patient-Centric Care'],
    },
  })

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    const clean = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    const autoSlug = clean.startsWith('dr-') ? clean : `dr-${clean}`
    setFormData((prev) => ({
      ...prev,
      name,
      slug: autoSlug,
      short_bio: prev.short_bio || `${name} is a dedicated specialist at Clinica Cure Hospital, Ranchi. Known for clinical precision and patient-first care.`,
      bio: prev.bio || `${name} brings high clinical precision, advanced procedural acumen, and a compassionate bedside approach to patient care at Clinica Cure Hospital, Bariatu, Ranchi.`,
      cta_banner: {
        ...(prev.cta_banner || {}),
        description: `Book an appointment with ${name} and get accurate, expert clinical care.`,
      },
    }))
  }

  const handleDepartmentChange = (deptSlug: string) => {
    const selectedDept = departments.find((d) => d.slug === deptSlug)
    setFormData((prev) => ({
      ...prev,
      department_slug: deptSlug,
      department_name: selectedDept?.name || deptSlug,
      cta_banner: {
        ...(prev.cta_banner || {}),
        title: `Need a ${selectedDept?.name || deptSlug} Consultation?`,
      },
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, profile_image: reader.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCtaImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({
            ...prev,
            cta_banner: { ...(prev.cta_banner || {}), image: reader.result as string },
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateCta = (field: keyof DoctorCtaBanner, value: any) => {
    setFormData((prev) => ({
      ...prev,
      cta_banner: {
        ...(prev.cta_banner || {}),
        [field]: value,
      },
    }))
  }

  const handleUpdateCtaFeature = (index: number, val: string) => {
    setFormData((prev) => {
      const currentFeatures = [
        ...(prev.cta_banner?.features && prev.cta_banner.features.length === 3
          ? prev.cta_banner.features
          : ['Advanced Technology', 'Expert Diagnosis', 'Patient-Centric Care']),
      ]
      currentFeatures[index] = val
      return {
        ...prev,
        cta_banner: {
          ...(prev.cta_banner || {}),
          features: currentFeatures,
        },
      }
    })
  }

  const handleUpdateMetricBadge = (index: number, field: 'title' | 'subtitle', val: string) => {
    const current = [
      ...((formData.metric_badges && formData.metric_badges.length === 4)
        ? formData.metric_badges
        : [
            { title: formData.experience_years || '10+ Years', subtitle: 'Years of Experience' },
            { title: formData.procedures_count || '5,000+', subtitle: 'Procedures Done' },
            { title: formData.expertise_highlight || 'Advanced Clinical Care', subtitle: 'Clinical Focus' },
            { title: formData.care_approach || 'Patient-Centric Approach', subtitle: 'Care Philosophy' },
          ]),
    ]
    current[index] = { ...current[index], [field]: val }
    setFormData((prev) => ({
      ...prev,
      metric_badges: current,
      experience_years: current[0].title,
      procedures_count: current[1].title,
      expertise_highlight: current[2].title,
      care_approach: current[3].title,
    }))
  }

  // Expertise Handlers
  const handleAddExpertise = () => {
    setFormData((prev) => ({
      ...prev,
      expertise: [...(prev.expertise || []), { title: '', description: '' }],
    }))
  }

  const handleUpdateExpertise = (index: number, field: 'title' | 'description', value: string) => {
    const current = [...(formData.expertise || [])]
    if (current[index]) {
      current[index] = { ...current[index], [field]: value }
      setFormData((prev) => ({ ...prev, expertise: current }))
    }
  }

  const handleRemoveExpertise = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      expertise: (prev.expertise || []).filter((_, i) => i !== index),
    }))
  }

  // Schedule Session Handlers (Day Toggles & Dual Shifts)
  const ALL_DAYS_LIST = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const isDayActive = (dayName: string) => {
    return (formData.schedule_sessions || []).some((s) => {
      if (s.status === 'Unavailable' || s.status === 'On Leave') return false
      const clean = s.day.toLowerCase()
      const dClean = dayName.toLowerCase()
      if (clean === dClean) return true
      if (clean.includes('mon') && clean.includes('fri') && ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(dayName)) return true
      if (clean.includes('mon') && clean.includes('sat') && ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].includes(dayName)) return true
      if (clean.includes(dClean.slice(0, 3))) return true
      return false
    })
  }

  const getDaySession = (dayName: string): DoctorScheduleItem => {
    const direct = (formData.schedule_sessions || []).find((s) => s.day === dayName)
    if (direct) {
      const parts = (direct.timings || '').split('&').map((p) => p.trim())
      return {
        ...direct,
        shift1: direct.shift1 || parts[0] || '10:00 AM – 01:00 PM',
        shift2: direct.shift2 || parts[1] || '',
      }
    }
    const matched = (formData.schedule_sessions || []).find((s) => {
      if (s.status === 'Unavailable' || s.status === 'On Leave') return false
      const clean = s.day.toLowerCase()
      if (clean.includes('mon') && clean.includes('fri') && ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(dayName)) return true
      if (clean.includes('mon') && clean.includes('sat') && ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].includes(dayName)) return true
      return clean.includes(dayName.toLowerCase().slice(0, 3))
    })
    if (matched) {
      const parts = (matched.timings || '').split('&').map((p) => p.trim())
      return {
        day: dayName,
        shift1: matched.shift1 || parts[0] || '10:00 AM – 01:00 PM',
        shift2: matched.shift2 || parts[1] || '',
        timings: matched.timings || '10:00 AM – 01:00 PM',
        type: matched.type || 'Regular OPD Consultation',
        status: 'Available',
      }
    }
    return {
      day: dayName,
      shift1: '10:00 AM – 01:00 PM',
      shift2: '',
      timings: '10:00 AM – 01:00 PM',
      type: 'Regular OPD Consultation',
      status: 'Available',
    }
  }

  const handleToggleDay = (dayName: string) => {
    const active = isDayActive(dayName)
    const explicitMap = new Map<string, DoctorScheduleItem>()

    ALL_DAYS_LIST.forEach((d) => {
      if (isDayActive(d)) {
        explicitMap.set(d, getDaySession(d))
      }
    })

    if (active) {
      explicitMap.delete(dayName)
    } else {
      const existing = getDaySession(dayName)
      explicitMap.set(dayName, {
        ...existing,
        day: dayName,
        status: 'Available',
      })
    }

    const current = Array.from(explicitMap.values())
    current.sort((a, b) => ALL_DAYS_LIST.indexOf(a.day) - ALL_DAYS_LIST.indexOf(b.day))
    setFormData((prev) => ({ ...prev, schedule_sessions: current }))
  }

  const handleSelectDaysPreset = (daysToEnable: string[]) => {
    const updated: DoctorScheduleItem[] = daysToEnable.map((dayName) => {
      const existing = getDaySession(dayName)
      return {
        ...existing,
        day: dayName,
        status: 'Available',
      }
    })
    updated.sort((a, b) => ALL_DAYS_LIST.indexOf(a.day) - ALL_DAYS_LIST.indexOf(b.day))
    setFormData((prev) => ({ ...prev, schedule_sessions: updated }))
  }

  const handleUpdateDayShift = (
    dayName: string,
    field: 'shift1' | 'shift2' | 'type',
    value: string
  ) => {
    const activeDaysList = ALL_DAYS_LIST.filter((d) => isDayActive(d))
    const current = activeDaysList.map((d) => {
      const s = getDaySession(d)
      return { ...s, day: d, status: 'Available' as const }
    })

    let found = current.find((s) => s.day === dayName)
    if (!found) {
      found = {
        day: dayName,
        shift1: '10:00 AM – 01:00 PM',
        shift2: '',
        timings: '10:00 AM – 01:00 PM',
        type: 'Regular OPD Consultation',
        status: 'Available',
      }
      current.push(found)
    }

    if (field === 'shift1') {
      found.shift1 = value
      found.timings = found.shift2 ? `${value} & ${found.shift2}` : value
    } else if (field === 'shift2') {
      found.shift2 = value
      found.timings = value ? `${found.shift1 || '10:00 AM – 01:00 PM'} & ${value}` : (found.shift1 || '10:00 AM – 01:00 PM')
    } else if (field === 'type') {
      found.type = value
    }

    current.sort((a, b) => ALL_DAYS_LIST.indexOf(a.day) - ALL_DAYS_LIST.indexOf(b.day))
    setFormData((prev) => ({ ...prev, schedule_sessions: current }))
  }

  const handleToggleDayShift2 = (dayName: string, enable: boolean) => {
    const activeDaysList = ALL_DAYS_LIST.filter((d) => isDayActive(d))
    const current = activeDaysList.map((d) => {
      const s = getDaySession(d)
      return { ...s, day: d, status: 'Available' as const }
    })
    const found = current.find((s) => s.day === dayName)
    if (!found) return

    if (enable) {
      found.shift2 = '04:00 PM – 07:00 PM'
      found.timings = `${found.shift1 || '10:00 AM – 01:00 PM'} & 04:00 PM – 07:00 PM`
    } else {
      found.shift2 = ''
      found.timings = found.shift1 || '10:00 AM – 01:00 PM'
    }

    setFormData((prev) => ({ ...prev, schedule_sessions: current }))
  }

  const handleCopyTimingsToAllDays = (sourceDayName: string) => {
    const source = getDaySession(sourceDayName)
    const activeDaysList = ALL_DAYS_LIST.filter((d) => isDayActive(d))
    const current = activeDaysList.map((d) => ({
      ...getDaySession(d),
      day: d,
      shift1: source.shift1,
      shift2: source.shift2,
      timings: source.timings,
      type: source.type,
      status: 'Available' as const,
    }))
    setFormData((prev) => ({ ...prev, schedule_sessions: current }))
  }

  // FAQ Handlers
  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [
        ...(prev.faqs || []),
        { question: '', answer: '', sort_order: (prev.faqs || []).length + 1, is_published: true },
      ],
    }))
  }

  const handleUpdateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const current = [...(formData.faqs || [])]
    if (current[index]) {
      current[index] = { ...current[index], [field]: value }
      setFormData((prev) => ({ ...prev, faqs: current }))
    }
  }

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: (prev.faqs || []).filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.slug) return
    setIsSubmitting(true)

    const parsedQualifications = qualificationsStr
      .split(',')
      .map((q) => q.trim())
      .filter(Boolean)

    await saveDoctor({
      ...formData,
      qualifications: parsedQualifications.length > 0 ? parsedQualifications : ['MBBS'],
    })

    setIsSubmitting(false)
    router.push('/admin/doctors')
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Doctors', href: '/admin/doctors' },
          { label: 'Add New Specialist' },
        ]}
      />

      <PageHeader
        title="Add New Hospital Specialist"
        description="Register a clinical consultant, configure hero stats, expertise areas, timings, and patient FAQs."
      />

      <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
        {/* 1. Basic Information */}
        <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#172033] pb-3 border-b border-[#E5EAF0] flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-[#806600]" />
            <span>Clinical Identity &amp; Department</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#172033] mb-1">Doctor Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Dr. Rajesh Khanna"
                className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-[#172033] mb-1">Clinical Designation *</label>
              <input
                type="text"
                required
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                placeholder="e.g. Consultant Cardiologist & Interventional Specialist"
                className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-[#172033] mb-1">Department *</label>
              <select
                value={formData.department_slug}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg bg-white focus:outline-hidden text-xs"
              >
                {departments.map((dept) => (
                  <option key={dept.slug} value={dept.slug}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#172033] mb-1">Seniority Rank / Badge</label>
              <input
                type="text"
                value={formData.seniority_badge || 'Senior Consultant'}
                onChange={(e) => setFormData({ ...formData, seniority_badge: e.target.value })}
                placeholder="e.g. Senior Consultant"
                className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden"
              />
            </div>

            {/* Profile Photo (Upload from device or URL) */}
            <div className="sm:col-span-2 lg:col-span-3 p-4 bg-[#F8FAF9] border border-[#E2ECE9] rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white border border-[#E5EAF0] overflow-hidden shrink-0 shadow-xs relative flex items-center justify-center">
                {formData.profile_image ? (
                  <img
                    src={formData.profile_image}
                    alt={formData.name || 'Doctor'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCheck className="w-8 h-8 text-[#A0AEC0]" />
                )}
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors cursor-pointer shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo from Device</span>
                  </button>
                  {formData.profile_image && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, profile_image: '' })}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#DC2626] hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={formData.profile_image || ''}
                    onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                    placeholder="Or enter image URL (e.g. /images/doctors/dr-abid-raza.jpg)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5EAF0] rounded-md focus:outline-hidden"
                  />
                </div>
                <p className="text-[10.5px] text-[#5F6B7A]">
                  Supported formats: JPG, PNG, WEBP, SVG. You can upload directly from your device or paste an image URL.
                </p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#172033] mb-1">
              Qualifications &amp; Honors (Comma-separated)
            </label>
            <input
              type="text"
              value={qualificationsStr}
              onChange={(e) => setQualificationsStr(e.target.value)}
              placeholder="e.g. MBBS, MD, DM (Cardiology), FACC"
              className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden"
            />
            <p className="text-[11px] text-[#5F6B7A] mt-1">
              Displayed on doctor hero badge and consultation token passes.
            </p>
          </div>
        </div>

        {/* 2. Highlight Metric Badges (4 Stats: Both Title and Subtitle Editable) */}
        <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E5EAF0] flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#172033] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#806600]" />
              <span>Hero Highlight Metric Badges (Editable Title &amp; Subtitle)</span>
            </h2>
            <span className="text-[11px] text-[#5F6B7A] font-semibold">4 Front-facing Stat Badges</span>
          </div>

          <p className="text-xs text-[#5F6B7A]">
            Customize both the main bold number/text (Title) and the descriptive label below it (Subtitle).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {((formData.metric_badges && formData.metric_badges.length === 4)
              ? formData.metric_badges
              : [
                  { title: formData.experience_years || '10+ Years', subtitle: 'Years of Experience' },
                  { title: formData.procedures_count || '5,000+', subtitle: 'Procedures Done' },
                  { title: formData.expertise_highlight || 'Advanced Clinical Care', subtitle: 'Clinical Focus' },
                  { title: formData.care_approach || 'Patient-Centric Approach', subtitle: 'Care Philosophy' },
                ]
            ).map((badge, idx) => {
              const defaultIcons = [Clock, ScanLine, Award, Heart]
              const IconComp = defaultIcons[idx]
              return (
                <div key={idx} className="p-3.5 bg-[#F8FAF9] border border-[#E2ECE9] rounded-xl space-y-2.5">
                  <div className="flex items-center gap-1.5 text-[#0E746D] font-bold text-[11px] uppercase">
                    <IconComp className="w-3.5 h-3.5" />
                    <span>Stat #{idx + 1}</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#172033] mb-1">
                      Title / Main Value *
                    </label>
                    <input
                      type="text"
                      required
                      value={badge.title}
                      onChange={(e) => handleUpdateMetricBadge(idx, 'title', e.target.value)}
                      placeholder="e.g. 10+ Years"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5EAF0] rounded-md font-bold text-[#172033]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#172033] mb-1">
                      Subtitle / Label *
                    </label>
                    <input
                      type="text"
                      required
                      value={badge.subtitle}
                      onChange={(e) => handleUpdateMetricBadge(idx, 'subtitle', e.target.value)}
                      placeholder="e.g. Years of Experience"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#E5EAF0] rounded-md text-[#5F6B7A]"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 3. Bio & Quote */}
        <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#172033] pb-3 border-b border-[#E5EAF0] flex items-center gap-2">
            <Quote className="w-4 h-4 text-[#806600]" />
            <span>Biography &amp; Patient Philosophy</span>
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#172033] mb-1">
                Hero Bio Summary (2–3 lines)
              </label>
              <textarea
                rows={2}
                value={formData.short_bio || ''}
                onChange={(e) => setFormData({ ...formData, short_bio: e.target.value })}
                placeholder="Brief summary appearing in the top hero section beside the profile photo..."
                className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-[#172033] mb-1">
                Full Bio Content (About Section Paragraphs)
              </label>
              <textarea
                rows={4}
                value={formData.bio || ''}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Detailed career experience and hospital clinical background..."
                className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-[#172033] mb-1">
                Doctor&apos;s Personal Philosophy / Quote Callout
              </label>
              <textarea
                rows={2}
                value={formData.quote || ''}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                placeholder="“Accurate diagnosis and personalized clinical attention...”"
                className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* 4. Areas of Expertise (Dynamic List) */}
        <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF0]">
            <div className="flex items-center gap-2">
              <BriefcaseMedical className="w-4 h-4 text-[#806600]" />
              <h2 className="text-sm font-bold text-[#172033]">
                Areas of Expertise ({(formData.expertise || []).length} Cards)
              </h2>
            </div>
            <button
              type="button"
              onClick={handleAddExpertise}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Expertise Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {(formData.expertise || []).map((exp, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#F8FAF9] border border-[#E2ECE9] rounded-xl relative space-y-2 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] font-bold text-[#0E746D] uppercase">
                    Card #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveExpertise(idx)}
                    className="p-1 text-[#DC2626] hover:bg-red-50 rounded transition-colors cursor-pointer"
                    title="Delete Card"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-0.5">
                    Expertise Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={exp.title}
                    onChange={(e) => handleUpdateExpertise(idx, 'title', e.target.value)}
                    placeholder="e.g. Coronary Angiography"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5EAF0] rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-0.5">
                    1-Line Description *
                  </label>
                  <input
                    type="text"
                    required
                    value={exp.description}
                    onChange={(e) => handleUpdateExpertise(idx, 'description', e.target.value)}
                    placeholder="e.g. Advanced diagnostic and interventional coronary procedures"
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#E5EAF0] rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Weekly Consultation Schedule & Dual Shifts */}
        <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5EAF0]">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#806600]" />
                <h2 className="text-sm font-bold text-[#172033]">
                  Weekly Consultation Schedule &amp; Timings
                </h2>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  ALL_DAYS_LIST.filter(isDayActive).length > 0
                    ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200'
                    : 'bg-amber-50 text-[#806600] border border-amber-200'
                }`}>
                  {ALL_DAYS_LIST.filter(isDayActive).length} of 7 Days Active
                </span>
              </div>
              <p className="text-xs text-[#5F6B7A] mt-0.5">
                Select the doctor&apos;s working days. Only active days will appear in the schedule and booking calendar.
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleSelectDaysPreset(ALL_DAYS_LIST)}
                className="px-2.5 py-1 text-xs font-semibold text-[#0E746D] bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors cursor-pointer"
              >
                Select All 7 Days
              </button>
              <button
                type="button"
                onClick={() => handleSelectDaysPreset([])}
                className="px-2.5 py-1 text-xs font-semibold text-[#DC2626] bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>


          {/* 7 Days Toggle Buttons Bar (Always shown) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#172033]">
                Select Active Days (Click to toggle on/off):
              </label>
              <span className="text-[11px] text-[#5F6B7A]">
                Clicking a day expands its timings below
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {ALL_DAYS_LIST.map((dayName) => {
                const active = isDayActive(dayName)
                const shortName = dayName.slice(0, 3)
                const session = active ? getDaySession(dayName) : null
                const hasEvening = Boolean(session?.shift2)

                return (
                  <button
                    key={dayName}
                    type="button"
                    onClick={() => handleToggleDay(dayName)}
                    className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[76px] ${
                      active
                        ? 'bg-[#F0FDF4] border-[#16A34A] shadow-xs ring-1 ring-[#16A34A]/20'
                        : 'bg-white border-[#E5EAF0] hover:border-slate-300 hover:bg-slate-50/60 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        active ? 'text-[#15803D]' : 'text-[#5F6B7A]'
                      }`}>
                        {shortName}
                      </span>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        active ? 'bg-[#16A34A] text-white' : 'border border-slate-300 text-transparent'
                      }`}>
                        {active ? <Check className="w-3 h-3 stroke-[3]" /> : '•'}
                      </span>
                    </div>

                    <div>
                      <span className={`block text-xs font-semibold truncate ${
                        active ? 'text-[#172033]' : 'text-[#8C9BA8]'
                      }`}>
                        {dayName}
                      </span>
                      <span className={`block text-[10.5px] truncate mt-0.5 ${
                        active ? 'text-[#15803D] font-medium' : 'text-[#A0AEC0]'
                      }`}>
                        {active ? (hasEvening ? '2 Shifts' : '1 Shift') : 'Off'}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Datalists for quick completion */}
          <datalist id="opd-shift1-options-new">
            <option value="10:00 AM – 01:00 PM" />
            <option value="10:00 AM – 02:00 PM" />
            <option value="10:00 AM – 04:00 PM" />
            <option value="09:00 AM – 01:00 PM" />
            <option value="09:00 AM – 02:00 PM" />
            <option value="11:00 AM – 03:00 PM" />
          </datalist>

          <datalist id="opd-shift2-options-new">
            <option value="04:00 PM – 07:00 PM" />
            <option value="04:00 PM – 08:00 PM" />
            <option value="05:00 PM – 08:00 PM" />
            <option value="05:00 PM – 09:00 PM" />
            <option value="06:00 PM – 09:00 PM" />
          </datalist>

          {/* Dynamic Cards for Selected Days Only */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#172033] uppercase tracking-wider">
                Configured Day Timings ({ALL_DAYS_LIST.filter(isDayActive).length} Active)
              </span>
              <span className="text-[11px] text-[#5F6B7A]">
                Only active days appear below and in public booking
              </span>
            </div>

            {ALL_DAYS_LIST.filter(isDayActive).length === 0 ? (
              <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-300 rounded-xl space-y-2">
                <Clock className="w-8 h-8 text-[#8C9BA8] mx-auto" />
                <p className="text-xs font-bold text-[#172033]">
                  No consultation days selected yet
                </p>
                <p className="text-xs text-[#5F6B7A] max-w-md mx-auto">
                  Click any day above (e.g. Monday, Wednesday) or choose a 1-click preset to configure OPD timings.
                </p>
              </div>
            ) : (
              ALL_DAYS_LIST.filter(isDayActive).map((dayName) => {
                const session = getDaySession(dayName)
                const hasShift2 = Boolean(session.shift2 && session.shift2.trim())

                return (
                  <div
                    key={dayName}
                    className="p-4 bg-white border border-[#DDEAE7] hover:border-[#0E746D]/60 rounded-xl shadow-2xs space-y-3.5 transition-all"
                  >
                    {/* Day Card Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#F0F4F4]">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                        <h3 className="text-sm font-bold text-[#172033]">
                          {dayName}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#F0FDF4] text-[#15803D] border border-emerald-200">
                          Active OPD Day
                        </span>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() => handleCopyTimingsToAllDays(dayName)}
                          title="Apply this day's hours to all other active days"
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-[#0E746D] bg-[#F0F9F8] hover:bg-[#E0F2EF] rounded-md border border-[#D2EAE5] transition-colors cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy to All Days</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleDay(dayName)}
                          title="Remove this day from schedule"
                          className="inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove Day</span>
                        </button>
                      </div>
                    </div>

                    {/* Day Configuration Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                      {/* Consultation Type */}
                      <div className="md:col-span-12">
                        <label className="block text-[11px] font-bold text-[#172033] mb-1">
                          Session / Consultation Type
                        </label>
                        <input
                          type="text"
                          value={session.type || 'Regular OPD Consultation'}
                          onChange={(e) => handleUpdateDayShift(dayName, 'type', e.target.value)}
                          placeholder="e.g. Regular OPD Consultation or Specialist Review Clinic"
                          className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5EAF0] rounded-lg focus:border-[#0E746D] focus:outline-hidden"
                        />
                      </div>

                      {/* Shift 1 (Morning OPD Shift) */}
                      <div className={hasShift2 ? 'md:col-span-6' : 'md:col-span-12'}>
                        <div className="p-3 bg-amber-50/40 border border-amber-200/80 rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-1.5 text-xs font-bold text-[#806600]">
                              <Sun className="w-3.5 h-3.5 text-amber-600" />
                              <span>Morning Shift (Shift 1) *</span>
                            </label>
                            <span className="text-[10px] text-amber-700 font-semibold bg-amber-100/60 px-1.5 py-0.5 rounded">
                              Primary
                            </span>
                          </div>

                          <input
                            type="text"
                            list="opd-shift1-options-new"
                            value={session.shift1 || ''}
                            onChange={(e) => handleUpdateDayShift(dayName, 'shift1', e.target.value)}
                            placeholder="e.g. 10:00 AM – 01:00 PM"
                            className="w-full px-3 py-1.5 text-xs font-mono font-medium bg-white border border-[#E5EAF0] rounded-md focus:border-[#0E746D] focus:outline-hidden"
                          />

                          {/* Quick chips for Shift 1 */}
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            {['10:00 AM – 01:00 PM', '10:00 AM – 02:00 PM', '10:00 AM – 04:00 PM', '09:00 AM – 01:00 PM'].map((preset) => (
                              <button
                                key={preset}
                                type="button"
                                onClick={() => handleUpdateDayShift(dayName, 'shift1', preset)}
                                className={`text-[10.5px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                                  session.shift1 === preset
                                    ? 'bg-amber-600 text-white border-amber-600'
                                    : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100/50'
                                }`}
                              >
                                {preset}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Shift 2 (Evening OPD Shift - Optional) */}
                      {hasShift2 ? (
                        <div className="md:col-span-6">
                          <div className="p-3 bg-indigo-50/40 border border-indigo-200/80 rounded-lg space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-900">
                                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Evening Shift (Shift 2)</span>
                              </label>
                              <button
                                type="button"
                                onClick={() => handleToggleDayShift2(dayName, false)}
                                className="text-[10.5px] text-rose-600 hover:underline cursor-pointer font-semibold"
                              >
                                Remove Evening Shift
                              </button>
                            </div>

                            <input
                              type="text"
                              list="opd-shift2-options-new"
                              value={session.shift2 || ''}
                              onChange={(e) => handleUpdateDayShift(dayName, 'shift2', e.target.value)}
                              placeholder="e.g. 04:00 PM – 07:00 PM"
                              className="w-full px-3 py-1.5 text-xs font-mono font-medium bg-white border border-[#E5EAF0] rounded-md focus:border-[#0E746D] focus:outline-hidden"
                            />

                            {/* Quick chips for Shift 2 */}
                            <div className="flex flex-wrap gap-1.5 pt-0.5">
                              {['04:00 PM – 07:00 PM', '04:00 PM – 08:00 PM', '05:00 PM – 08:00 PM', '05:00 PM – 09:00 PM'].map((preset) => (
                                <button
                                  key={preset}
                                  type="button"
                                  onClick={() => handleUpdateDayShift(dayName, 'shift2', preset)}
                                  className={`text-[10.5px] px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                                    session.shift2 === preset
                                      ? 'bg-indigo-600 text-white border-indigo-600'
                                      : 'bg-white text-slate-700 border-indigo-200 hover:bg-indigo-100/50'
                                  }`}
                                >
                                  {preset}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="md:col-span-12">
                          <button
                            type="button"
                            onClick={() => handleToggleDayShift2(dayName, true)}
                            className="w-full py-2 px-3 border border-dashed border-[#0E746D]/40 bg-[#F0F9F8]/60 hover:bg-[#E0F2EF] rounded-lg text-xs font-bold text-[#0E746D] inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Moon className="w-3.5 h-3.5" />
                            <span>+ Add Evening OPD Shift (e.g. 04:00 PM – 07:00 PM)</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Live Summary Bar */}
                    <div className="pt-2 border-t border-[#F0F4F4] flex flex-wrap items-center justify-between text-[11px] text-[#5F6B7A]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#172033]">Live Schedule Output:</span>
                        <span className="font-mono text-[#0E746D] font-bold">
                          {session.timings}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        Patient Booking Enabled
                      </span>
                    </div>
                  </div>
                )
              })
            )}
          </div>

        </div>

        {/* 6. FAQs */}
        <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF0]">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#806600]" />
              <h2 className="text-sm font-bold text-[#172033]">
                Frequently Asked Questions ({(formData.faqs || []).length} Q&amp;As)
              </h2>
            </div>
            <button
              type="button"
              onClick={handleAddFaq}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {(formData.faqs || []).map((faq, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[#F7F8FA] border border-[#E5EAF0] rounded-xl space-y-2 relative"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10.5px] font-bold text-[#5F6B7A] uppercase">
                    Question #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="p-1 text-[#DC2626] hover:bg-red-50 rounded transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    value={faq.question}
                    onChange={(e) => handleUpdateFaq(idx, 'question', e.target.value)}
                    placeholder="Question..."
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5EAF0] rounded-md font-bold"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    required
                    value={faq.answer}
                    onChange={(e) => handleUpdateFaq(idx, 'answer', e.target.value)}
                    placeholder="Answer..."
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5EAF0] rounded-md"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Bottom Consultation CTA Banner */}
        <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E5EAF0] flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#172033] flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#0E746D]" />
              <span>Bottom Consultation CTA Banner</span>
            </h2>
            <span className="text-[11px] text-[#5F6B7A] font-semibold">Front-facing Booking Banner</span>
          </div>

          <p className="text-xs text-[#5F6B7A]">
            Customize the bottom banner displayed on this doctor's profile, including heading, description, button, feature highlights, and facility image.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#172033] mb-1">Banner Tagline / Eyebrow</label>
              <input
                type="text"
                value={formData.cta_banner?.eyebrow ?? 'CLINICA CURE HOSPITAL'}
                onChange={(e) => handleUpdateCta('eyebrow', e.target.value)}
                placeholder="e.g. CLINICA CURE HOSPITAL"
                className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-[#172033] mb-1">Banner Title / Heading</label>
              <input
                type="text"
                value={formData.cta_banner?.title ?? `Need a ${formData.department_name || 'Specialist'} Consultation?`}
                onChange={(e) => handleUpdateCta('title', e.target.value)}
                placeholder="e.g. Need a Radiology Consultation?"
                className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden font-bold"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-[#172033] mb-1">Banner Description</label>
            <textarea
              rows={2}
              value={formData.cta_banner?.description ?? `Book an appointment with ${formData.name || 'our specialist'} and get accurate, expert clinical care.`}
              onChange={(e) => handleUpdateCta('description', e.target.value)}
              placeholder="e.g. Book an appointment with Dr. Abid Raza and get accurate, expert clinical care."
              className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden"
            />
          </div>

          {/* Banner Facility Image (Upload from device or URL) */}
          <div className="text-xs space-y-2">
            <label className="block font-bold text-[#172033]">Banner Facility Image</label>
            <div className="p-4 bg-[#F8FAF9] border border-[#E2ECE9] rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-24 h-16 rounded-xl bg-white border border-[#E5EAF0] overflow-hidden shrink-0 shadow-xs relative flex items-center justify-center">
                {formData.cta_banner?.image ? (
                  <img
                    src={formData.cta_banner.image}
                    alt="Banner Facility"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="/images/facilities/mri-scanner-suite.jpg"
                    alt="Default Facility"
                    className="w-full h-full object-cover opacity-60"
                  />
                )}
              </div>

              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    type="file"
                    ref={ctaFileInputRef}
                    accept="image/*"
                    onChange={handleCtaImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => ctaFileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors cursor-pointer shadow-xs"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Banner Photo from Device</span>
                  </button>
                  {formData.cta_banner?.image && (
                    <button
                      type="button"
                      onClick={() => handleUpdateCta('image', '')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#DC2626] hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
                    >
                      Reset to Default
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={formData.cta_banner?.image || ''}
                    onChange={(e) => handleUpdateCta('image', e.target.value)}
                    placeholder="Or enter image URL (e.g. /images/facilities/mri-scanner-suite.jpg)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5EAF0] rounded-md focus:outline-hidden"
                  />
                </div>
                <p className="text-[10.5px] text-[#5F6B7A]">
                  Upload a photo from your local device or paste an image URL. If left empty, the department facility image will be used.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-3">
          <Link
            href="/admin/doctors"
            className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#5F6B7A] bg-white border border-[#E5EAF0] hover:bg-[#F7F8FA] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>{isSubmitting ? 'Registering...' : 'Register Specialist'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
