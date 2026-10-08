'use client'

import { useState } from 'react'
import {
  Calendar,
  Scale,
  ShieldCheck,
  Activity,
  HeartHandshake,
  FileCheck,
  ArrowRight,
  Droplet,
  Clock,
  RotateCw,
  Heart,
  ChevronDown,
  X,
} from 'lucide-react'

export default function BloodEligibilityAndFacts() {
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false)

  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Card: Who Can Donate Blood? */}
          <div className="rounded-3xl border border-slate-200/90 p-6 sm:p-8 bg-white shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight mb-8">
                Who Can Donate Blood?
              </h3>

              {/* 3x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6">
                {/* 1. Age */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Age</h4>
                    <p className="text-xs text-slate-600 mt-0.5">18–65 years</p>
                  </div>
                </div>

                {/* 2. Minimum Weight */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Minimum Weight</h4>
                    <p className="text-xs text-slate-600 mt-0.5">50 kg</p>
                  </div>
                </div>

                {/* 3. Generally Healthy */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Generally Healthy</h4>
                    <p className="text-xs text-slate-600 mt-0.5">No major illness</p>
                  </div>
                </div>

                {/* 4. No Recent Surgery */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">No Recent Surgery</h4>
                    <p className="text-xs text-slate-600 mt-0.5">In last 6 months</p>
                  </div>
                </div>

                {/* 5. No Active Infection */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">No Active Infection</h4>
                    <p className="text-xs text-slate-600 mt-0.5">As per guidelines</p>
                  </div>
                </div>

                {/* 6. Valid ID Proof */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">Valid ID Proof</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Required</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowGuidelinesModal(true)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0E746D] transition-colors cursor-pointer"
              >
                <span>View Detailed Guidelines</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Card: Blood Donation Facts */}
          <div className="rounded-3xl border border-rose-200/60 p-6 sm:p-8 bg-[#FFF5F6] shadow-xs relative overflow-hidden flex flex-col justify-between">
            {/* Right Side Illustration Graphic (Droplet & Ripples, No Text) */}
            <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-36 sm:w-48 md:w-52 lg:w-44 xl:w-52 flex items-center justify-center pointer-events-none select-none">
              <img
                src="/images/blood-facts-drop-notext.png"
                alt="Blood Donation Droplet Graphic"
                className="w-full max-h-[88%] object-contain"
              />
            </div>

            <div className="relative z-10">
              <h3 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight mb-8">
                Blood Donation Facts
              </h3>

              <div className="space-y-6 max-w-[240px] sm:max-w-xs md:max-w-sm">
                {/* Fact 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Droplet className="w-5 h-5 fill-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">
                      1 Donation
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      can save up to 3 lives.
                    </p>
                  </div>
                </div>

                {/* Fact 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">
                      15–20 Minutes
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      to donate blood
                    </p>
                  </div>
                </div>

                {/* Fact 3 */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <RotateCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">
                      56 Days
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      your body replaces the donated blood
                    </p>
                  </div>
                </div>

                {/* Fact 4 */}
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 fill-rose-600/30" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">
                      Regular Donation
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      helps maintain good heart health
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modal for Detailed Guidelines */}
      {showGuidelinesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowGuidelinesModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-slate-900 text-xl mb-4">
              Comprehensive Donor Eligibility Criteria
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold">1. Hemoglobin Level:</strong>
                Minimum 12.5 g/dL measured instantly on-site with sterile digital hemoglobinometer.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold">2. Blood Pressure &amp; Pulse:</strong>
                Systolic 100–140 mmHg, Diastolic 60–90 mmHg, resting pulse between 60 and 100 beats/min.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold">3. Donation Frequency:</strong>
                Men can donate every 90 days (3 months); women can donate every 120 days (4 months).
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold">4. Medications &amp; Vaccinations:</strong>
                No antibiotics within 48 hours. Routine non-live vaccines require 24 hours deferral; COVID-19 vaccines require 14 days deferral.
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <strong className="text-slate-900 block font-semibold">5. Tattoos &amp; Body Piercings:</strong>
                Deferral period of 6 months from the date of getting the tattoo or piercing.
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuidelinesModal(false)}
              className="w-full mt-6 py-2.5 rounded-xl bg-[#0E746D] hover:bg-[#0b5c56] text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Close Guidelines
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
