'use client'

import { useState } from 'react'
import {
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  Clock,
  HeartHandshake,
  PhoneCall,
  Activity,
} from 'lucide-react'
import { siteConfig } from '@/config/site'

const APPOINTMENT_FAQS = [
  {
    q: 'Do I need to make an advance online payment to confirm my appointment?',
    a: 'No advance payment is needed when booking online. You will receive an instant digital OPD Token reference ID, and consultation fees can be paid conveniently at the hospital registration counter on your arrival via Cash, UPI, Debit/Credit Card, or Cashless Insurance.',
  },
  {
    q: 'What should I do in an acute emergency or trauma situation?',
    a: 'For urgent medical emergencies, head straight to our 24x7 Emergency & Trauma Centre at Bariatu Road, Ranchi, or immediately dial our emergency helpline (+91 92633 97076). Emergency cases do not require prior OPD appointment scheduling and receive immediate triage intervention.',
  },
  {
    q: 'Can I reschedule or cancel my booked appointment slot?',
    a: 'Yes, absolutely. You can reschedule or cancel your appointment at any time without penalty by contacting our OPD Reception Desk via WhatsApp or telephone call. Simply quote your Token ID (e.g., APT-XXXXXX) for instant rescheduling.',
  },
  {
    q: 'Are cashless mediclaim policies and Ayushman Bharat cards accepted for OPD visits?',
    a: 'Clinica Cure is empaneled with major health insurance TPAs and Ayushman Bharat. While routine outpatient consultations are typically self-paid (subject to specific OPD rider insurance), all subsequent daycare procedures, surgeries, admissions, and advanced diagnostics are covered under cashless processing at our on-site TPA Desk.',
  },
  {
    q: 'How early should I arrive before my scheduled appointment time?',
    a: 'We recommend arriving 15 minutes prior to your designated consultation slot. This allows our reception team to verify your vitals (Blood Pressure, SpO2, Temperature, Weight) and pull up previous records so your face-to-face consultation with the specialist is smooth and punctual.',
  },
]

const VALUE_PILLARS = [
  {
    title: 'Zero Consultation Queue',
    desc: 'Tokens are prioritized by allocated time window, drastically reducing hospital waiting lounge delays.',
    icon: Clock,
  },
  {
    title: 'Transparent Hospital Billing',
    desc: 'Standardized OPD consultation rates with detailed itemized receipts for insurance and mediclaim reimbursement.',
    icon: CreditCard,
  },
  {
    title: 'Integrated Diagnostics',
    desc: 'Pathology labs, Digital X-Ray, 4D Ultrasound, ECG, and Pharmacy operate in the same building for same-day evaluation.',
    icon: Activity,
  },
  {
    title: 'Empathetic Patient Care',
    desc: 'Our nursing coordinators and guest relationship officers guide you personally from arrival to discharge.',
    icon: HeartHandshake,
  },
]

export default function AppointmentFaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
        
        {/* ── TOP: CLINICAL VALUE PILLARS ── */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#0E746D] bg-[#EEF9F7] px-3.5 py-1 rounded-full uppercase tracking-wider">
            SEAMLESS CARE EXPERIENCE
          </span>
          <h2 className="mt-3 font-display font-semibold text-slate-900 text-2xl sm:text-3xl">
            Why Book with Clinica Cure Hospital?
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Delivering prompt, patient-first outpatient clinical consultations supported by state-of-the-art diagnostic and surgical infrastructure in Ranchi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
          {VALUE_PILLARS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="bg-[#F8FAF9] border border-[#E2ECE9] rounded-2xl p-5 hover:bg-white hover:shadow-md hover:border-[#BCE1DB] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center mb-3.5 group-hover:bg-[#0E746D] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* ── BOTTOM: FAQ ACCORDIONS ── */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E746D] uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h3 className="font-display font-semibold text-slate-900 text-xl sm:text-2xl">
              OPD Appointment &amp; Consultation FAQs
            </h3>
          </div>

          <div className="space-y-3">
            {APPOINTMENT_FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx
              return (
                <div
                  key={faq.q}
                  className="border border-[#E2ECE9] rounded-2xl overflow-hidden transition-all bg-[#FAFDFB]"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-slate-900 font-display font-semibold text-xs sm:text-sm hover:text-[#0E746D] transition-colors cursor-pointer"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#0E746D]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Quick Help Footer */}
          <div className="mt-8 p-4 rounded-2xl bg-[#F0F8FC] border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="font-display font-bold text-slate-900 text-xs sm:text-sm">
                Have a unique medical inquiry or need ambulance transfer?
              </p>
              <p className="text-xs text-slate-600 mt-0.5">
                Our 24x7 emergency and admissions control desk is available round-the-clock.
              </p>
            </div>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0E746D] hover:bg-[#0A635B] text-white text-xs font-semibold whitespace-nowrap transition-all shadow-xs cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call {siteConfig.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
