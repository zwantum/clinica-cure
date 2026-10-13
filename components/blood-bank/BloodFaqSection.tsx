'use client'

import { useState } from 'react'
import {
  ChevronDown,
  PhoneCall,
  HelpCircle,
} from 'lucide-react'
import { siteConfig } from '@/config/site'

interface FaqItem {
  q: string
  a: string
}

const FAQS_LEFT: FaqItem[] = [
  {
    q: 'How do family members request urgent blood units from Clinica Cure?',
    a: 'You can call our blood bank helpline or submit a blood request form online. Our team will check availability and guide you with the next steps.',
  },
  {
    q: 'Can I donate platelets separately?',
    a: 'Yes. Plateletpheresis allows targeted platelet collection through modern cell separator machines. It takes about 60–75 minutes and can be donated every 2 weeks.',
  },
  {
    q: 'How does Clinica Cure ensure transfused blood safety?',
    a: 'Every unit undergoes mandatory 5-parameter screening (HIV 1 & 2, Hepatitis B, Hepatitis C, Syphilis, and Malaria) via automated advanced testing before release to patients.',
  },
]

const FAQS_RIGHT: FaqItem[] = [
  {
    q: 'What should I do before coming to donate blood?',
    a: 'Hydrate well (drink 500ml water or fruit juice), eat a healthy non-fatty meal 2 hours prior, avoid alcohol for 24 hours, and get a good night sleep.',
  },
  {
    q: 'How often can I donate blood?',
    a: 'Healthy male donors can donate whole blood every 90 days (3 months), while healthy female donors can donate every 120 days (4 months).',
  },
  {
    q: 'Is there any cost for blood donation?',
    a: 'No. Blood donation is completely voluntary and free. Clinica Cure provides all testing, clinical screening, and post-donation refreshments complimentary to donors.',
  },
  {
    q: 'Can people with diabetes or hypertension donate?',
    a: 'Yes, provided your blood pressure and sugar levels are well-controlled on regular oral medication on the day of donation and you do not require insulin.',
  },
]

export default function BloodFaqSection() {
  const [openLeft, setOpenLeft] = useState<number | null>(0)
  const [openRight, setOpenRight] = useState<number | null>(null)

  const toggleLeft = (idx: number) => {
    setOpenLeft(openLeft === idx ? null : idx)
  }

  const toggleRight = (idx: number) => {
    setOpenRight(openRight === idx ? null : idx)
  }

  return (
    <section className="py-8 sm:py-6 md:py-7 lg:py-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
        {/* Header with Title and Phone Desk */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          <div>
            <h2 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[14px] sm:text-sm text-slate-600 mt-2">
              Find answers to common questions about blood donation at Clinica Cure.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
            <span>Need more help? Call us at</span>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="text-[#0E746D] font-bold hover:underline inline-flex items-center gap-1"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{siteConfig.phone}</span>
            </a>
          </div>
        </div>

        {/* 2 Columns of Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Left Column */}
          <div className="space-y-4">
            {FAQS_LEFT.map((faq, idx) => {
              const isOpen = openLeft === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 bg-white transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleLeft(idx)}
                    className="w-full text-left py-4 px-5 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-display font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0E746D]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-[14px] sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {FAQS_RIGHT.map((faq, idx) => {
              const isOpen = openRight === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 bg-white transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleRight(idx)}
                    className="w-full text-left py-4 px-5 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="font-display font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                        {faq.q}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0E746D]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-[14px] sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
