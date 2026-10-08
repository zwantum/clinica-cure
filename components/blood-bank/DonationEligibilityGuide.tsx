'use client'

import { useState } from 'react'
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Heart,
  Droplet,
  ChevronDown,
  AlertCircle,
  Sparkles,
  Coffee,
  Activity,
  Calendar,
} from 'lucide-react'
import {
  ELIGIBILITY_CRITERIA,
  DONATION_STEPS,
  BLOOD_MYTHS_FACTS,
  BLOOD_FAQS,
} from '@/config/blood-bank'

export default function DonationEligibilityGuide() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8 space-y-16 sm:space-y-24">
        {/* ── PART 1: ELIGIBILITY CHECKLIST ── */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider block mb-2">
              CLINICAL SAFETY STANDARDS
            </span>
            <h2 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl lg:text-4xl">
              Who Can Donate Blood?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Every donor undergoes a confidential on-site screening to ensure complete safety for both the donor and the patient receiving blood.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ELIGIBILITY_CRITERIA.map((crit, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-3xl bg-[#F8FAF9] border border-[#E2ECE9] hover:border-[#0E746D]/40 hover:bg-white hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-slate-900 text-base mb-1">
                  {crit.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {crit.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Deferrals Note */}
          <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Temporary Deferrals:</strong> Please wait if you had recent dental extraction (wait 3 days), antibiotics (wait 48 hrs), alcohol intake (wait 24 hrs), or tattoos / ear piercing in the last 6 months.
            </div>
          </div>
        </div>

        {/* ── PART 2: 4-STEP DONATION PROCESS ── */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider block mb-2">
              COMFORTABLE &amp; HASSLE-FREE
            </span>
            <h2 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl lg:text-4xl">
              Your 4-Step Donation Journey
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              The entire process takes under 30 minutes in our climate-controlled clinical donation suite in Bariatu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {DONATION_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-3xl border border-[#E2ECE9] p-6 shadow-sm hover:shadow-lg hover:border-[#0E746D] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono font-extrabold text-3xl text-slate-200 group-hover:text-[#0E746D] transition-colors">
                      {step.step}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0E746D]" />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PART 3: MYTHS VS FACTS ── */}
        <div className="bg-[#FAFDFB] rounded-3xl border border-[#D5E7E1] p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block mb-1">
              DISPELLING MISCONCEPTIONS
            </span>
            <h2 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl">
              Blood Donation: Myths vs. Clinical Facts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOOD_MYTHS_FACTS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3"
              >
                <div className="flex items-start gap-2.5 text-rose-900 text-xs font-semibold bg-rose-50 p-3 rounded-xl border border-rose-100">
                  <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[10px] font-bold shrink-0">
                    MYTH
                  </span>
                  <span>{item.myth}</span>
                </div>

                <div className="flex items-start gap-2.5 text-emerald-950 text-xs font-normal bg-emerald-50/80 p-3 rounded-xl border border-emerald-100">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-700 text-white text-[10px] font-bold shrink-0">
                    FACT
                  </span>
                  <span className="leading-relaxed">{item.fact}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── PART 4: FREQUENTLY ASKED QUESTIONS ── */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider block mb-1">
              HAVE QUESTIONS?
            </span>
            <h2 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl">
              Blood Bank Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {BLOOD_FAQS.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-display font-bold text-slate-900 text-sm sm:text-base hover:text-[#0E746D] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                      openFaq === fIdx ? 'rotate-180 text-[#0E746D]' : ''
                    }`}
                  />
                </button>
                {openFaq === fIdx && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
