'use client'

import {
  Heart,
  Droplet,
  Clock,
  ShieldCheck,
  Building2,
  UserCheck,
  Plus,
} from 'lucide-react'

interface BloodBankHeroProps {
  onRequestBlood: (group?: string) => void
  onDonateClick: () => void
}

export default function BloodBankHero({
  onRequestBlood,
  onDonateClick,
}: BloodBankHeroProps) {
  return (
    <section className="relative bg-white overflow-hidden min-h-[460px] sm:min-h-[400px] md:min-h-[420px] lg:min-h-[500px] flex items-center">

      {/* ── FULL RIGHT BACKGROUND IMAGE (NO SIDEWAYS BOX) ── */}
      <div className="absolute top-0 right-0 w-full lg:w-[58%] xl:w-[55%] h-full z-0">
        <img
          src="/images/blood-donor-ball.jpg"
          alt="Clinica Cure Blood Donor in Clinical Recliner"
          className="w-full h-full object-cover object-[center_right] lg:object-[center_center]"
        />

        {/* Seamless Soft Fade Gradient: blurs cleanly into the white background on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:from-white lg:via-white/35 lg:to-transparent pointer-events-none" />

        {/* Mobile vertical gradient so text is 100% readable on small screens */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/90 lg:hidden pointer-events-none" />
      </div>

      {/* ── FLOATING ELEMENTS OVER RIGHT HALF (DESKTOP / TABLET) ── */}
      <div className="hidden lg:block absolute inset-0 max-w-[1440px] mx-auto pointer-events-none z-10 px-4 md:px-5 lg:px-8">

      </div>

      {/* ── MAIN CONTENT CONTAINER (LEFT-ALIGNED) ── */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8 py-8 sm:py-6 md:py-7 lg:py-12 relative z-10">
        <div className="max-w-xl xl:max-w-2xl space-y-4 sm:space-y-5">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 py-1 text-red-600 text-xs font-bold uppercase tracking-wider ">

            <span>CLINICA CURE BLOOD BANK</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-[1.12]">
            Every Drop Holds a Life.
            <br />
            <span className="text-[#0E746D]">Donate Blood, Save Lives.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
            A modern, 24×7 licensed blood bank providing safe, screened, and readily available blood for patients in need. Join our community of donors and help us build a healthier tomorrow.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              type="button"
              onClick={onDonateClick}
              className="py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-display font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-red-600/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >

              <span>Donate Blood</span>
            </button>

            <button
              type="button"
              onClick={() => onRequestBlood()}
              className="py-3 px-6 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-display font-bold text-sm flex items-center justify-center gap-2 transition-all border border-slate-300 shadow-2xs hover:border-slate-400 cursor-pointer"
            >

              <span>Request Blood</span>
            </button>
          </div>

          {/* 4 Trust Badges Horizontal Row */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-slate-200/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">24/7</span>
                <span className="text-[11px] text-slate-500 block leading-tight">Availability</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">100% Safe</span>
                <span className="text-[11px] text-slate-500 block leading-tight">&amp; Screened</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">NABH Standard</span>
                <span className="text-[11px] text-slate-500 block leading-tight">Blood Storage</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">Qualified</span>
                <span className="text-[11px] text-slate-500 block leading-tight">Medical Team</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
