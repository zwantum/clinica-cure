import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Hospital Updates & Announcements',
  description:
    'Latest notices, specialist joinings, community health camps, and clinical announcements from Clinica Cure Hospital, Bariatu, Ranchi.',
}

const NOTICES = [
  {
    id: '1',
    title: 'Free Health Screening & Diabetes Check-Up Camp This Sunday',
    date: 'March 22, 2026',
    category: 'Community Outreach',
    description: 'Clinica Cure Hospital is hosting a free multi-speciality health screening camp including blood sugar, blood pressure, and specialist consultations.',
  },
  {
    id: '2',
    title: 'New High-Definition Laparoscopy Tower Installed in Modular OT',
    date: 'March 05, 2026',
    category: 'Technology Update',
    description: 'Our surgical suites are upgraded with modern 4K laparoscopic imaging systems for higher surgical precision and expedited recovery times.',
  },
  {
    id: '3',
    title: 'Round-the-clock Emergency Trauma & Neuro-ICU Services Enhanced',
    date: 'February 18, 2026',
    category: 'Emergency Services',
    description: 'Immediate bedside triage and neuro-trauma stabilization support expanded under our 24x7 intensivist and surgeon team.',
  },
]

export default function UpdatesPage() {
  return (
    <div className="bg-[#F8FAF9] min-h-screen py-10 sm:py-14">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <Link href="/" className="hover:text-[#0E746D]">Home</Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">Updates</span>
            </div>
            <h1 className="font-display font-semibold text-slate-900 text-3xl sm:text-4xl">
              Hospital Updates &amp; Notices
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Official announcements, health camps, facility upgrades, and administrative notices from Clinica Cure.
            </p>
          </div>

          <a
            href={siteConfig.blogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E746D] hover:bg-[#0b5c57] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
          >
            <span>Visit Health Articles Blog</span>
            <span className="text-xs">↗</span>
          </a>
        </div>

        {/* Notices Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {NOTICES.map((notice) => (
            <div
              key={notice.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="bg-[#EEF9F7] text-[#0E746D] font-bold px-2.5 py-1 rounded-md text-[11px]">
                    {notice.category}
                  </span>
                  <span>{notice.date}</span>
                </div>
                <h3 className="font-display font-semibold text-slate-900 text-base leading-snug">
                  {notice.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="text-xs font-bold text-[#0E746D] hover:underline"
                >
                  Enquire at Hospital →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
