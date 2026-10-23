'use client'

import {
  UserCheck,
  Layers,
  Siren,
  Heart,
  Building2,
  BadgeIndianRupee,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { WHY_CHOOSE_US } from '@/config/constants'

const WHY_ICONS: Record<string, LucideIcon> = {
  UserCheck,
  Layers,
  Siren,
  Heart,
  Building2,
  BadgeIndianRupee,
}

export default function WhyChooseUs() {
  return (
    <section id="why" className="pt-2 sm:pt-2 sm:pb-4 md:pt-3 md:pb-4 lg:pt-6 lg:pb-6 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-left max-w-2xl">
          <p className="text-[#0e746d] font-display font-bold text-xs md:text-sm tracking-wider uppercase">
            WHY CLINICA CURE
          </p>
          <h2 className="mt-2 sm:mt-3 font-display font-semibold text-slate-900 text-[22px] sm:text-[30px] md:text-[30px] lg:text-4xl leading-tight">
            Trusted Care. Advanced Facilities. Better Outcomes.
          </h2>
          <p className="mt-3 sm:mt-4 leading-relaxed text-slate-600 text-sm sm:text-base">
            At Clinica Cure, we combine clinical excellence with compassion, ensuring every patient receives world-class care and a better quality of life.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid lg:grid-cols-[1.15fr_1fr] gap-8 items-stretch">
          {/* 6 Feature cards in 2 columns */}
          <div className="grid sm:grid-cols-2 gap-5">
            {WHY_CHOOSE_US.map((item) => {
              const Icon = WHY_ICONS[item.icon] ?? ShieldCheck
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-[#F6FBFA] border border-[#E2ECE9] hover:border-[#0E746D]/40 transition-all shadow-xs hover:shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0E746D] flex items-center justify-center shadow-xs border border-slate-100">
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-3 font-display font-semibold text-slate-900 text-sm sm:text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] sm:text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Hospital Reception / Lobby Image */}
          <div className="rounded-2xl overflow-hidden min-h-[300px] border border-[#e2ece9] shadow-sm relative">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
              alt="Clinica Cure Hospital Modern Reception Corridor Lobby"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
