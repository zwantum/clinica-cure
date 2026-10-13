import { Phone, MapPin } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function EmergencyBanner() {
  return (
    <section className="pb-8 sm:pb-5 md:pb-5 lg:pb-10 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 py-4 sm:py-3 md:py-3 lg:py-6 md:px-8">
        <div className="rounded-3xl overflow-hidden bg-[#0F6B5E] grid grid-cols-1 md:grid-cols-12 items-stretch gap-0 shadow-lg">
          {/* Column 1: Surgeon/Emergency Image with Fade Gradient */}
          <div className="relative w-full h-44 sm:h-52 md:h-auto md:col-span-4 lg:col-span-3 self-stretch overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80"
              alt="Clinica Cure Emergency Surgical Team"
              className="w-full h-full md:absolute md:inset-0 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0F6B5E]/30 to-[#0F6B5E] hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F6B5E] via-[#0F6B5E]/60 to-transparent md:hidden" />
          </div>

          {/* Column 2: Text Info */}
          <div className="p-5 sm:p-6 md:p-5 lg:p-6 xl:p-8 md:col-span-8 lg:col-span-3 xl:col-span-3 text-white flex flex-col justify-center">
            <h3 className="font-display font-semibold text-[22px] sm:text-xl md:text-xl lg:text-2xl leading-tight">
              Medical Emergency?<br />
              <span className="text-white/95">We&apos;re here 24x7.</span>
            </h3>
            <p className="mt-2 text-white/85 text-[14px] sm:text-[13px] md:text-xs lg:text-sm leading-relaxed max-w-md">
              Our emergency team is always ready to provide immediate care for you and your loved ones.
            </p>
          </div>

          {/* Column 3: Action Cards in Same Row */}
          <div className="p-4 sm:p-5 md:p-4 lg:py-6 lg:pr-7 lg:pl-2 md:col-span-12 lg:col-span-6 xl:col-span-6 flex items-center justify-center w-full self-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {/* Card 1: Call Emergency */}
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="bg-white rounded-2xl p-3 sm:p-3 md:p-3.5 lg:p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-all shadow-sm group min-w-0"
              >
                <span className="w-9 h-9 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-[#FFF1F1] text-red-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] sm:text-[9.5px] md:text-xs text-slate-500 font-semibold uppercase tracking-wider truncate">
                    Call Emergency
                  </span>
                  <span className="block font-display font-extrabold text-[#D94B4B] text-xs sm:text-[12px] md:text-sm lg:text-[15px] mt-0.5 whitespace-nowrap group-hover:text-red-700 transition-colors truncate">
                    {siteConfig.phone}
                  </span>
                  <span className="block text-[9.5px] md:text-[10.5px] text-slate-400 mt-0.5 truncate">
                    24x7 Immediate Dispatch
                  </span>
                </div>
              </a>

              {/* Card 2: Get Directions */}
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-3 sm:p-3 md:p-3.5 lg:p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-all shadow-sm group min-w-0"
              >
                <span className="w-9 h-9 sm:w-10 sm:h-10 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full bg-[#EEF9F7] text-[#0E746D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] sm:text-[9.5px] md:text-xs text-slate-500 font-semibold uppercase tracking-wider truncate">
                    Hospital Location
                  </span>
                  <span className="block font-display font-extrabold text-slate-900 text-xs sm:text-[12px] md:text-sm lg:text-[15px] mt-0.5 whitespace-nowrap group-hover:text-[#0E746D] transition-colors truncate">
                    {siteConfig.addressShort}
                  </span>
                  <span className="block text-[9.5px] md:text-[10.5px] text-[#0F6B5E] font-medium mt-0.5 truncate">
                    Get Directions →
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
