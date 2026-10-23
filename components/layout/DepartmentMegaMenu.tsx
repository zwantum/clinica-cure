'use client'

import Link from 'next/link'
import {
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
  Ear,
  Layers,
  Syringe,
  Eye,
  Wind,
  Building2,
  ChevronRight,
  Plus,
  Microscope,
  ShieldCheck,
  Scissors,
  Smile,
  type LucideIcon,
} from 'lucide-react'
import { type Department } from '@/config/navigation'

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
  ear: Ear,
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

interface Props {
  departments: Department[]
  onClose: () => void
}

export default function DepartmentMegaMenu({ departments, onClose }: Props) {
  const col1 = departments.slice(0, 5)
  const col2 = departments.slice(5, 10)
  const col3 = departments.slice(10, 15)
  const col4 = departments.slice(15, 20)

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 w-[1160px] 2xl:w-[1220px] max-w-[95vw] whitespace-normal pointer-events-auto"
      onMouseLeave={onClose}
    >
      <div className="bg-white rounded-2xl xl:rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18),0_0_1px_1px_rgba(0,0,0,0.06)] border border-slate-200/90 p-4.5 sm:p-5 xl:p-6 text-left whitespace-normal max-h-[calc(100vh-130px)] overflow-y-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 mb-2.5 border-b border-slate-100">
          <div>
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#0E746D] block mb-0.5">OUR DEPARTMENTS</span>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 font-display">
              Comprehensive Care for Every Stage of Life
            </h3>
          </div>
          <Link
            href="/departments"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EAF7F4] hover:bg-[#DDF2ED] text-[#0E6B60] text-xs font-semibold transition-all group shrink-0 w-fit"
          >
            <span>View All Departments</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* 4-column grid for 20 departments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-3.5 xl:gap-x-5 gap-y-0.5 whitespace-normal">
          {[col1, col2, col3, col4].map((col, colIdx) => (
            <div key={colIdx} className="space-y-0.5">
              {col.map((dept) => {
                const Icon = DEPT_ICONS[dept.icon] ?? Plus
                return (
                  <Link
                    key={dept.slug}
                    href={`/departments/${dept.slug}`}
                    onClick={onClose}
                    className="group flex items-center justify-between p-1.5 xl:p-2 rounded-xl hover:bg-slate-50 transition-all min-h-[42px] xl:min-h-[46px] whitespace-normal"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-1.5">
                      <div className="w-8 h-8 xl:w-8.5 xl:h-8.5 rounded-full bg-[#EAF7F4] text-[#0E6B60] flex items-center justify-center shrink-0 group-hover:bg-[#0E6B60] group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" strokeWidth={1.8} />
                      </div>
                      <span className="text-[12.5px] xl:text-[13px] font-semibold text-slate-800 group-hover:text-[#0E6B60] transition-colors leading-snug whitespace-normal break-words line-clamp-2">
                        {dept.name}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all shrink-0 ml-1" strokeWidth={2} />
                  </Link>
                )
              })}
            </div>
          ))}
        </div>

        {/* Helper banner */}
        <div className="mt-3 xl:mt-4 p-3 xl:p-3.5 bg-[#F5FAF8] border border-[#E5F4F0] rounded-xl xl:rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl bg-white text-[#0E6B60] flex items-center justify-center shrink-0 shadow-xs border border-slate-100">
              <Building2 className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div>
              <h4 className="text-xs xl:text-sm font-semibold text-slate-900 leading-snug">Need help finding the right department?</h4>
              <p className="text-[11px] xl:text-xs text-slate-600 mt-0.5 leading-tight">Our medical team can guide you to the right specialist.</p>
            </div>
          </div>
          <Link
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#0E6B60] hover:bg-[#0E6B60] hover:text-white text-[#0E6B60] text-xs font-semibold transition-all shrink-0 shadow-xs"
          >
            <span>Get Assistance</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
