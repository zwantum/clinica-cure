'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

interface DoctorFaqAccordionProps {
  doctorName: string
  faqs?: FaqItem[]
}

export function DoctorFaqAccordion({ doctorName, faqs }: DoctorFaqAccordionProps) {
  const defaultFaqs: FaqItem[] = [
    {
      question: `Do I need a prior appointment to consult ${doctorName}?`,
      answer:
        'While prior online or telephone booking is recommended to avoid waiting queues, walk-in consultations are also accommodated based on day-of OPD slot availability.',
    },
    {
      question: 'What medical documents should I bring?',
      answer:
        'Please carry your government ID, previous prescription slips, current medication lists, and past diagnostic reports (MRI/CT scans, blood tests, or discharge summaries).',
    },
    {
      question: 'Can I get a second opinion on a diagnostic report?',
      answer:
        `Yes. ${doctorName} routinely provides objective, evidence-based second opinions for complex planned surgical, diagnostic, and medical treatments.`,
    },
    {
      question: 'How long does it take to get MRI/CT/Ultrasound reports?',
      answer:
        'Emergency and trauma reports are generated within 30 to 60 minutes. Routine OPD ultrasound reports are handed over immediately post-procedure, and detailed cross-sectional CT/MRI diagnostic reports are delivered within 4 to 12 hours.',
    },
  ]

  const items = faqs && faqs.length > 0 ? faqs : defaultFaqs
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="space-y-3 mt-5">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        return (
          <div
            key={item.question}
            className="rounded-2xl border border-[#E2ECE9] bg-white overflow-hidden transition-all"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="w-full p-4.5 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-slate-800 hover:text-[#0E746D] transition-colors"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#0E746D]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4.5 sm:px-5 pb-5 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
