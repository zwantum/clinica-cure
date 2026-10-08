'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SYMPTOMS = [
  {
    name: 'Headache / Head Pain',
    image: '/images/symptoms/headache.jpg',
    href: '/departments/neurology-neurosurgery',
  },
  {
    name: 'Knee & Joint Pain',
    image: '/images/symptoms/knee-pain.jpg',
    href: '/departments/orthopaedics',
  },
  {
    name: 'Lower Back / Spine',
    image: '/images/symptoms/back-pain.jpg',
    href: '/departments/orthopaedics',
  },
  {
    name: 'Neck / Cervical',
    image: '/images/symptoms/neck-pain.jpg',
    href: '/departments/neurology-neurosurgery',
  },
  {
    name: 'Shoulder & Rotator Cuff',
    image: '/images/symptoms/shoulder-pain.jpg',
    href: '/departments/orthopaedics',
  },
  {
    name: 'Facial & Neuralgic Pain',
    image: '/images/symptoms/facial-pain.jpg',
    href: '/departments/neurology-neurosurgery',
  },
  {
    name: 'Heel & Foot Pain',
    image: '/images/symptoms/foot-pain.jpg',
    href: '/departments/orthopaedics',
  },
]

export default function SymptomsCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -280, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 280, behavior: 'smooth' })
    }
  }

  return (
    <div className="mt-14 sm:mt-18 pt-10 sm:pt-12 border-t border-[#E2ECE9]/90">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h2 className="text-[22px] sm:text-[30px] md:text-[30px] lg:text-[36px] font-display font-medium text-[#1E293B] leading-tight">
          Find Possible Symptoms and Expertise
        </h2>
      </div>

      {/* Circular Carousel with Teal Navigation Buttons */}
      <div className="relative max-w-[1180px] mx-auto px-2 sm:px-4 flex items-center justify-between">
        {/* Left Prev Button */}
        <button
          onClick={scrollLeft}
          type="button"
          aria-label="Previous symptom"
          className="shrink-0 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#00A88F] hover:bg-[#008f7a] text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer mr-2 sm:mr-3 md:mr-4"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
        </button>

        {/* Scrollable Track */}
        <div
          ref={carouselRef}
          className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-3 w-full"
          tabIndex={0}
          role="region"
          aria-label="Symptoms carousel"
        >
          {SYMPTOMS.map((symptom) => (
            <div
              key={symptom.name}
              className="snap-start shrink-0 w-[calc((100%-16px)/2)] sm:w-[calc((100%-40px)/3)] lg:w-[calc((100%-72px)/4)] flex flex-col items-center justify-center group"
            >
              <Link
                href={symptom.href}
                className="aspect-square w-full max-w-[205px] sm:max-w-[215px] lg:max-w-[225px] rounded-full overflow-hidden shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white border border-slate-200 cursor-pointer block"
                title={`Consult for ${symptom.name}`}
              >
                <img
                  src={symptom.image}
                  alt={`${symptom.name} Symptom`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </Link>
              <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-800 text-center group-hover:text-[#00A88F] transition-colors">
                {symptom.name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Next Button */}
        <button
          onClick={scrollRight}
          type="button"
          aria-label="Next symptom"
          className="shrink-0 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#00A88F] hover:bg-[#008f7a] text-white flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer ml-2 sm:ml-3 md:ml-4"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
