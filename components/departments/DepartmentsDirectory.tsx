'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  X,
  RotateCcw,
  Calendar,
  ArrowRight,
  ChevronRight,
  Stethoscope,
  Heart,
  Brain,
  Bone,
  Cross,
  Venus,
  Baby,
  ScanLine,
  Activity,
  Droplets,
  Layers,
  Syringe,
  Eye,
  Wind,
  Microscope,
  ShieldCheck,
  Scissors,
  Smile,
  Plus,
  type LucideIcon,
} from 'lucide-react'
import { departments, type NavDepartment } from '@/config/navigation'
import { SEED_DOCTORS } from '@/config/constants'

const DEPT_ICONS: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  heart: Heart,
  brain: Brain,
  bone: Bone,
  'first-aid-kit': Cross,
  'gender-female': Venus,
  baby: Baby,
  scan: ScanLine,
  activity: Activity,
  drop: Droplets,
  droplets: Droplets,
  layers: Layers,
  sparkle: Layers,
  syringe: Syringe,
  eye: Eye,
  lungs: Wind,
  microscope: Microscope,
  'shield-check': ShieldCheck,
  scissors: Scissors,
  smile: Smile,
}

export const DEPT_DETAILS: Record<string, { desc: string; category: string; services: string[] }> = {
  'general-medicine': {
    category: 'Medicine & Critical',
    desc: 'Comprehensive adult medicine for diabetes, hypertension, persistent fevers, chest conditions, and chronic metabolic illnesses.',
    services: ['Diabetes Clinic', 'Hypertension Care', 'Infection & Fever', 'Preventive Health'],
  },
  'orthopedics-joint-replacement': {
    category: 'Surgical & Ortho',
    desc: 'Premier joint replacement (knee & hip), sports arthroscopy, ligament reconstruction, and 24x7 emergency trauma fracture management.',
    services: ['Total Knee & Hip Replacement', 'Arthroscopy & Sports Med', 'Fracture & Trauma Surgery', 'Arthritis Care'],
  },
  neurosurgery: {
    category: 'Surgical & Ortho',
    desc: 'Super-specialised neurosurgical interventions for brain & spine trauma, tumours, stroke decompression, and minimally invasive spine fixation.',
    services: ['Brain & Spine Surgery', 'Endoscopic Neurosurgery', 'Head Injury ICU', 'Spine Rehabilitation'],
  },
  cardiology: {
    category: 'Medicine & Critical',
    desc: 'Comprehensive cardiovascular care covering angiography, stenting, heart failure management, 2D echo diagnostics, and acute coronary ICU.',
    services: ['Coronary Angiography', 'Angioplasty & Stenting', 'Heart Failure Care', '2D Echo & ECG'],
  },
  'general-laparoscopic-surgery': {
    category: 'Surgical & Ortho',
    desc: 'Advanced minimally invasive keyhole procedures for gallbladder stones, hernias, appendix, abdominal trauma, and laser proctology (piles/fissure).',
    services: ['Laparoscopic Surgery', 'Hernia Repair', 'Laser Piles & Fistula', 'Minimal Access Surgery'],
  },
  'obstetrics-gynecology': {
    category: 'Women & Child',
    desc: 'Dedicated women’s healthcare covering high-risk pregnancies, safe normal & cesarean deliveries, laparoscopic gynaecological surgery, and PCOS care.',
    services: ['High-Risk Maternity', 'Normal & C-Section Delivery', 'Gynaec Laparoscopy', 'Infertility Workup'],
  },
  'anaesthesia-critical-care': {
    category: 'Medicine & Critical',
    desc: '24x7 intensive critical care unit (ICU) and advanced surgical anaesthesia with continuous hemodynamic and invasive ventilator monitoring.',
    services: ['24x7 Critical Care ICU', 'Emergency Resuscitation', 'Ventilator Support', 'Pain Management'],
  },
  neurology: {
    category: 'Medicine & Critical',
    desc: 'Comprehensive neuro-medical care for acute stroke, epilepsy, chronic migraines, neuropathies, vertigo, and Parkinson’s movement disorders.',
    services: ['Stroke Management', 'Epilepsy & Seizures', 'Migraine Clinic', 'Parkinson’s Care'],
  },
  urology: {
    category: 'Surgical & Ortho',
    desc: 'Advanced endourology for kidney stones, laser prostate surgery (TURP), uro-oncology, laparoscopic urology, and male reproductive health.',
    services: ['PCNL / URSL Stone Care', 'Laser Prostate Surgery', 'Urologic Oncology', 'Male Infertility'],
  },
  'pediatric-neonatal': {
    category: 'Women & Child',
    desc: 'Compassionate pediatric and neonatal intensive care (NICU), child immunization, growth monitoring, and acute childhood infection treatment.',
    services: ['Neonatal Care (NICU)', 'Pediatric Nutrition', 'Vaccination Clinic', 'Growth Monitoring'],
  },
  ophthalmology: {
    category: 'Diagnostics & Specialized',
    desc: 'Advanced eye care including sutureless phaco cataract surgery, glaucoma detection, diabetic retinopathy screening, and vision correction.',
    services: ['Phaco Cataract Surgery', 'Glaucoma Clinic', 'Diabetic Eye Care', 'Refractive Vision Check'],
  },
  pulmonology: {
    category: 'Medicine & Critical',
    desc: 'Expert chest and respiratory medicine for asthma, COPD, pneumonia, tuberculosis, sleep apnea, and bronchoscopy diagnostics.',
    services: ['Asthma & Allergy Clinic', 'COPD Management', 'Tuberculosis Care', 'Bronchoscopy'],
  },
  radiology: {
    category: 'Diagnostics & Specialized',
    desc: 'Advanced digital imaging and radio-diagnosis with ultrasound, colour Doppler, digital X-Ray, and image-guided clinical interventions.',
    services: ['Digital X-Ray', 'Ultrasound & Doppler', 'CT & MRI Coordination', 'Guided Biopsies'],
  },
  gastroenterology: {
    category: 'Diagnostics & Specialized',
    desc: 'Specialised diagnostic & therapeutic endoscopy, colonoscopy, hepatology (liver disease), pancreatitis, and gastrointestinal bleed care.',
    services: ['Endoscopy & Colonoscopy', 'Liver & Hepatitis Care', 'IBD & Acid Peptic Care', 'GI Bleed Treatment'],
  },
  nephrology: {
    category: 'Medicine & Critical',
    desc: 'Comprehensive kidney health, chronic kidney disease (CKD) management, hemodialysis support, and diabetic renal disease care.',
    services: ['Kidney Disease Care', 'Dialysis Coordination', 'Hypertension & Renal Clinic', 'Acute Kidney Support'],
  },
  'reconstructive-plastic-surgery': {
    category: 'Surgical & Ortho',
    desc: 'Specialised plastic, burns, craniofacial trauma, microvascular surgery, aesthetic procedures, and complex wound reconstruction.',
    services: ['Burns & Flap Surgery', 'Craniofacial Reconstruction', 'Microvascular Surgery', 'Cosmetic Procedures'],
  },
  'oral-maxillofacial-surgery': {
    category: 'Surgical & Ortho',
    desc: 'Specialised facial trauma management, corrective jaw surgery, impacted tooth removal, and comprehensive dental implantology.',
    services: ['Facial Trauma & Fractures', 'Wisdom Tooth Surgery', 'Dental Implants', 'Root Canal & Crowns'],
  },
  dermatology: {
    category: 'Diagnostics & Specialized',
    desc: 'Expert diagnosis and therapy for clinical skin diseases, STD & venereology, psoriasis, vitiligo, and aesthetic dermatology.',
    services: ['Clinical Dermatology', 'STD & Venereology', 'Psoriasis & Vitiligo', 'Acne & Laser Care'],
  },
  'microbiology-pathology': {
    category: 'Diagnostics & Specialized',
    desc: 'State-of-the-art diagnostic laboratory for clinical microbiology, histopathology, cytology, hematology, and rapid pathology reporting.',
    services: ['Automated Blood Tests', 'Histopathology & Biopsy', 'FNAC & Cytology', 'Infection Diagnostics'],
  },
  'preventive-medicine': {
    category: 'Medicine & Critical',
    desc: 'Proactive health screenings, executive checkup packages, lifestyle disease prevention, and immunization for families.',
    services: ['Health Checkup Packages', 'Lifestyle Counselling', 'Vaccination Clinic', 'Disease Screening'],
  },
}

const CATEGORIES = [
  'All Specialities',
  'Surgical & Ortho',
  'Medicine & Critical',
  'Women & Child',
  'Diagnostics & Specialized',
]

export default function DepartmentsDirectory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Specialities')

  const q = searchQuery.trim().toLowerCase()

  const filteredDepartments = departments.filter((dept) => {
    const detail = DEPT_DETAILS[dept.slug]
    const category = detail?.category || 'Medicine & Critical'

    const matchesCategory =
      selectedCategory === 'All Specialities' || category === selectedCategory

    const matchesSearch =
      !q ||
      dept.name.toLowerCase().includes(q) ||
      detail?.desc.toLowerCase().includes(q) ||
      detail?.services.some((s) => s.toLowerCase().includes(q))

    return matchesCategory && matchesSearch
  })

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('All Specialities')
  }

  return (
    <div>
      {/* ── Filter Bar & Search Input ── */}
      <div className="bg-white rounded-3xl border border-[#DDEAE7] p-2 sm:p-2.5 shadow-sm mb-8 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 flex-1 bg-[#F8FAF9] rounded-2xl border border-transparent focus-within:border-[#0E746D]/30 focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0" strokeWidth={2.2} />
          <input
            type="text"
            placeholder="Search departments, treatments, or specialties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:ring-0 p-0"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar px-1 py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0E746D] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filter Indicators */}
      {(searchQuery || selectedCategory !== 'All Specialities') && (
        <div className="flex items-center justify-between gap-3 flex-wrap mb-6 text-xs">
          <div className="flex items-center gap-2 flex-wrap text-slate-600">
            <span className="font-semibold text-slate-700">Active Filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DDEAE7] text-slate-800 shadow-2xs">
                Keyword: &ldquo;{searchQuery}&rdquo;
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== 'All Specialities' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DDEAE7] text-slate-800 shadow-2xs">
                Category: {selectedCategory}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All Specialities')}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 font-semibold text-[#0E746D] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* ── Departments Grid ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((dept) => {
          const detail = DEPT_DETAILS[dept.slug] || {
            category: 'Medicine & Critical',
            desc: 'Specialized clinical care, consultations, and modern diagnostic treatment for patient recovery.',
            services: ['Specialist Consultations', 'Outpatient Care', 'Inpatient Facilities'],
          }

          const Icon = DEPT_ICONS[dept.icon] ?? Plus
          const allDeptSlugs = [dept.slug, ...(dept.aliases || [])]
          const docCount = SEED_DOCTORS.filter((d) =>
            d.departments.some((slug) => allDeptSlugs.includes(slug))
          ).length

          return (
            <div
              key={dept.slug}
              className="bg-white rounded-3xl border border-[#DDEAE7] p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-[#0E746D]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Icon + Doctor Count Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-13 h-13 rounded-2xl bg-[#EEF9F7] text-[#0E746D] group-hover:bg-[#0E746D] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105">
                    <Icon className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  {docCount > 0 ? (
                    <span className="text-xs font-bold text-[#0E746D] bg-[#E8F7F4] px-3 py-1 rounded-full border border-[#26B09A]/15">
                      {docCount} {docCount === 1 ? 'Specialist' : 'Specialists'}
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      OPD Available
                    </span>
                  )}
                </div>

                {/* Department Name */}
                <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl group-hover:text-[#0E746D] transition-colors leading-snug">
                  {dept.name}
                </h3>

                {/* Category Subtitle */}
                <span className="text-[11px] font-semibold text-[#0E746D] uppercase tracking-wider block mt-1">
                  {detail.category}
                </span>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {detail.desc}
                </p>

                {/* Services / Treatments Chips */}
                <div className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {detail.services.map((srv) => (
                    <span
                      key={srv}
                      className="text-[11px] sm:text-xs px-2.5 py-1 bg-[#EEF9F7] text-[#0E6B60] font-medium rounded-lg border border-[#26B09A]/15"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: View Department & Book Doctor */}
              <div className="mt-6 pt-5 border-t border-[#DDEAE7]/70 flex items-center gap-2.5">
                <Link
                  href={`/departments/${dept.slug}`}
                  className="flex-1 rounded-xl h-11 inline-flex items-center justify-center gap-1.5 font-display font-semibold text-xs sm:text-[13px] border border-slate-200 text-slate-700 hover:text-[#0E6B60] hover:border-[#0E6B60] bg-white px-2.5 whitespace-nowrap transition-all"
                >
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.2} />
                </Link>

                <Link
                  href={`/book-appointment?department=${dept.slug}`}
                  className="flex-1 rounded-xl h-11 inline-flex items-center justify-center gap-1.5 font-display font-semibold text-xs sm:text-[13px] shadow-sm px-2.5 whitespace-nowrap transition-all bg-[#0E746D] hover:bg-[#0b5c57] text-white"
                >
                  <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                  <span>Book Visit</span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredDepartments.length === 0 && (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#DDEAE7] mt-8">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Search className="w-7 h-7" strokeWidth={1.8} />
          </div>
          <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg">
            No departments found
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-md mx-auto">
            No departments match your current search query. Try searching with different keywords or clearing active filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-4 px-5 py-2.5 rounded-xl bg-[#0E746D] text-white text-xs font-semibold hover:bg-[#0b5c57] transition-all cursor-pointer shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  )
}
