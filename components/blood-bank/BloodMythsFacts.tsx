'use client'

import {
  XCircle,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react'

const COMPARISONS = [
  {
    myth: 'Donating blood can make you weak.',
    fact: 'Your body quickly replaces the donated blood.',
  },
  {
    myth: 'Only people with rare blood groups can donate.',
    fact: 'All healthy individuals can donate blood.',
  },
  {
    myth: 'Blood donation is painful.',
    fact: 'The process is quick and causes only minimal discomfort.',
  },
  {
    myth: 'You can get infected while donating.',
    fact: 'We use 100% sterile, single-use equipment.',
  },
]

export default function BloodMythsFacts() {
  return (
    <section className="py-8 sm:py-6 md:py-7 lg:py-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Blood Lab Vials Image (4.5 cols on lg) */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden bg-slate-100 shadow-sm border border-slate-200 aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-[420px]">
            <img
              src="/images/blood-lab-vials.jpg"
              alt="Clinica Cure certified blood testing tubes in laboratory"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />


          </div>

          {/* Right Column: Myths vs Facts (7.5 cols on lg) */}
          <div className="lg:col-span-7">
            <div>
              <h2 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                Blood Donation Myths vs. Facts
              </h2>
              <p className="text-[14px] sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Let&apos;s clear some common misconceptions about blood donation.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="mt-8 rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-2xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/90 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-5 w-1/2">
                      <span className="inline-flex items-center gap-1.5 text-rose-600">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        MYTH
                      </span>
                    </th>
                    <th className="py-3.5 px-5 w-1/2">
                      <span className="inline-flex items-center gap-1.5 text-emerald-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        FACT
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {COMPARISONS.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      {/* Myth Cell */}
                      <td className="py-4 px-5 align-top">
                        <div className="flex items-start gap-2.5">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium leading-relaxed">
                            {item.myth}
                          </span>
                        </div>
                      </td>

                      {/* Fact Cell */}
                      <td className="py-4 px-5 align-top">
                        <div className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="text-slate-800 font-semibold leading-relaxed">
                            {item.fact}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
