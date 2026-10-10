export default function HeroBanner() {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-white">
      <div className="w-full">
        <picture>
          <source media="(max-width: 639px)" srcSet="/images/bg-mobile.png" />
          <source media="(min-width: 640px)" srcSet="/images/bg-2.png" />
          <img
            src="/images/bg.png"
            alt="Clinica Cure Hospital Banner - Advanced Multi-Speciality Healthcare in Ranchi"
            className="w-full h-auto block select-none"
            loading="eager"
          />
        </picture>
      </div>
    </section>
  )
}
