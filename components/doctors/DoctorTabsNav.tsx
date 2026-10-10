'use client'

import React, { useState, useEffect } from 'react'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'consultation', label: 'Consultation' },
  { id: 'faqs', label: 'FAQs' },
]

export function DoctorTabsNav() {
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140
      for (let i = TABS.length - 1; i >= 0; i--) {
        const el = document.getElementById(TABS[i].id)
        if (el && el.offsetTop <= scrollPosition) {
          setActiveTab(TABS[i].id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setActiveTab(id)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="overflow-x-auto no-scrollbar pt-4 pb-1 sm:py-2 -mx-4 px-4 sm:mx-0 sm:px-0">
      <nav
        aria-label="Doctor profile tabs"
        className="inline-flex items-center p-1 sm:p-1.5 rounded-full bg-[#F4F9F8] border border-[#DCEBE7] shadow-xs min-w-max"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => scrollToSection(tab.id)}
              className={`rounded-full text-xs font-semibold transition-all select-none cursor-pointer ${
                isActive
                  ? 'bg-[#0E746D] text-white px-5 py-2 shadow-xs'
                  : 'text-slate-600 hover:text-[#0E746D] hover:bg-slate-50/60 px-4 sm:px-5 py-2'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
