'use client'

import { Fragment } from 'react'
import {
  FileText,
  Stethoscope,
  Droplet,
  Heart,
} from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: 'Register / Walk-in',
    desc: 'Fill the form or visit our blood bank.',
    icon: FileText,
  },
  {
    step: '02',
    title: 'Health Screening',
    desc: 'Basic check-up to ensure your safety.',
    icon: Stethoscope,
  },
  {
    step: '03',
    title: 'Donate Blood',
    desc: 'A safe process that takes 15–20 minutes.',
    icon: Droplet,
  },
  {
    step: '04',
    title: 'Post-Donation Care',
    desc: 'Rest for a few minutes and enjoy refreshments.',
    icon: Heart,
  },
]

export default function BloodDonationSteps() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
            Your 4-Step Donation Journey
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            A safe, simple and well-guided process from registration to post-donation care.
          </p>
        </div>

        {/* 4 Steps Horizontal Flow with Chevron Separators */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 lg:gap-2">
          {STEPS.map((item, idx) => {
            const Icon = item.icon
            return (
              <Fragment key={item.step}>
                {/* Single Step Item */}
                <div className="flex-1 flex items-start gap-3.5 p-3 sm:p-4 rounded-2xl hover:bg-slate-50/70 transition-colors">
                  {/* Step Icon Badge */}
                  <div className="w-12 h-12 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0 border border-teal-100/80 shadow-2xs">
                    <Icon
                      className={`w-5 h-5 ${
                        item.step === '03'
                          ? 'fill-red-600 text-red-600'
                          : 'text-[#0E746D]'
                      }`}
                    />
                  </div>

                  {/* Step Text Info */}
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-[#0E746D] block leading-tight font-mono">
                      {item.step}
                    </span>
                    <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base leading-snug mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Chevron Separator between steps on Desktop */}
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center shrink-0 px-2 text-slate-300">
                    <svg
                      width="18"
                      height="54"
                      viewBox="0 0 18 54"
                      fill="none"
                      className="text-slate-300"
                    >
                      <path
                        d="M5 4 V20 L13 27 L5 34 V50"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}

                {/* Vertical Separator for Mobile/Tablet Stack */}
                {idx < STEPS.length - 1 && (
                  <div className="flex lg:hidden justify-center py-0.5 text-slate-300">
                    <svg
                      width="54"
                      height="18"
                      viewBox="0 0 54 18"
                      fill="none"
                      className="text-slate-300"
                    >
                      <path
                        d="M4 5 H20 L27 13 L34 5 H50"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>

      </div>
    </section>
  )
}
