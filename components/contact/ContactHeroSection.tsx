import Link from 'next/link'

export default function ContactHeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F0F8FC] border-b border-slate-200/80 py-8 sm:py-10 md:py-11 lg:py-12 xl:py-18">
      {/* Right: Hospital Building with Emergency Entrance and Ambulance */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[48%] lg:w-[50%] xl:w-[54%] pointer-events-none select-none z-0">
        <div className="relative w-full h-full">
          <img
            src="/images/contact-hero-hospital.webp"
            alt="Clinica Cure Hospital Building and 24x7 Emergency Entrance"
            className="w-full h-full object-cover object-right lg:object-center [mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_100%)] opacity-30 md:opacity-90 lg:opacity-100"
          />
        </div>
      </div>

      {/* Seamless Unified Overlay across the section */}
      <div className="absolute inset-0 pointer-events-none select-none z-[1] bg-gradient-to-r from-[#F0F8FC] via-[#F0F8FC]/95 via-30% md:via-[#F0F8FC]/75 md:via-42% lg:via-transparent to-transparent" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-xl md:max-w-[420px] lg:max-w-[460px] xl:max-w-2xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 sm:mb-2.5">
            <Link href="/" className="hover:text-[#0E746D] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-700 font-medium">Contact Us</span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-semibold text-slate-900 text-2xl sm:text-3xl md:text-[28px] lg:text-[32px] xl:text-[44px] leading-[1.18] tracking-tight">
            Get in Touch with <br className="hidden sm:inline" />
            <span className="text-[#0E746D]">Clinica Cure</span> Hospital
          </h1>

          {/* Description */}
          <p className="mt-2 sm:mt-2.5 text-xs sm:text-sm md:text-[13px] lg:text-sm xl:text-[15px] text-slate-600 leading-relaxed max-w-lg md:max-w-[390px] lg:max-w-[440px] xl:max-w-xl">
            We are here to help you with appointments, medical queries, diagnostic services, insurance assistance or emergency support.
          </p>
        </div>
      </div>
    </section>
  )
}
