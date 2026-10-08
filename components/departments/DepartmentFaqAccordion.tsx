'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FaqItem {
  question: string
  answer: string
}

interface Props {
  faqs: FaqItem[]
}

export default function DepartmentFaqAccordion({ faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3 mt-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx
        return (
          <div
            key={faq.question}
            className="bg-white rounded-2xl border border-[#E2ECE9] overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-display font-semibold text-xs sm:text-sm text-slate-900 hover:text-[#0E746D] transition-colors cursor-pointer"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-[#0E746D]' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                <p className="pt-3">{faq.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
