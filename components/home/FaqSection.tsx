'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, ChevronRight } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: 'How do I book an appointment at Clinica Cure Hospital?',
    a: 'You can book an appointment online using the "Book an Appointment" form on this page, by calling our reception at +91 92633 97076, or via WhatsApp. Walk-in consultations are also available during OPD hours.',
  },
  {
    q: 'Is emergency care available 24x7?',
    a: 'Yes. Our emergency and critical care department is staffed and operational 24 hours a day, 7 days a week, including ambulance support for critical cases.',
  },
  {
    q: 'Do you accept health insurance or cashless treatment?',
    a: 'Clinica Cure Hospital works with several major insurance providers for cashless treatment. Please carry your insurance card and ID proof, and our billing desk will guide you through the approval process.',
  },
  {
    q: 'What should I bring for my first visit?',
    a: 'Please carry a valid photo ID, any previous medical records or prescriptions, current medications, and your insurance details if applicable.',
  },
  {
    q: 'Do you offer preventive health check-up packages?',
    a: 'Yes, we offer a range of health check-up packages tailored to age, gender and risk factors. Visit our Health Packages section or ask our care team for a recommendation.',
  },
  {
    q: 'What are the visiting hours for admitted patients?',
    a: "General visiting hours are typically in the afternoon and evening; exact timings can vary by ward. Please check with the nursing station on your family member's floor for current visiting hours.",
  },
  {
    q: 'How can I consult a specialist doctor?',
    a: "Use our doctor consultation search to browse by department or specialty, view a doctor's profile and areas of expertise, and book a slot directly online or by phone.",
  },
  {
    q: 'How do I get my lab or diagnostic reports?',
    a: 'Most reports are available at the diagnostics reception within the same day. For select tests, our team will inform you of the expected turnaround time and can share reports digitally on request.',
  },
]

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-8 sm:py-10 md:py-14 bg-[#F6FBFA]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12">
        {/* Left Column (Sticky on desktop) */}
        <div className="relative">
          <div className="lg:sticky lg:top-32">
            <h2 className="mt-2 sm:mt-3 font-display font-semibold text-slate-900 text-[22px] sm:text-[30px] md:text-[30px] lg:text-4xl leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 sm:mt-4 leading-relaxed text-slate-600 text-sm sm:text-base">
              Everything you need to know about appointments, emergency care, insurance and visiting our hospital.
            </p>

            <div className="mt-6 bg-white rounded-2xl border border-[#E2ECE9] shadow-xs p-5 sm:p-6">
              <p className="font-display font-bold text-slate-900 text-sm sm:text-base">
                Still have questions?
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Our patient care team is happy to help with anything not covered here.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 rounded-xl px-5 h-10 bg-[#00A88F] hover:bg-[#008f7a] text-white font-display font-semibold text-xs sm:text-sm shadow-xs transition-colors"
              >
                <span>Contact Us</span>
                <ChevronRight className="w-4 h-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Accordion List */}
        <div id="faq-list" className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="bg-white border border-[#E2ECE9] rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5 cursor-pointer select-none"
                >
                  <span className="font-display font-semibold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full bg-[#E8F6F4] text-[#0E746D] flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? 'rotate-45 bg-[#00A88F] text-white' : ''
                    }`}
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
