'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Users,
  Stethoscope,
  Activity,
  Award,
} from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  condition: string
  badge: string
  duration: string
  image: string
  videoUrl: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rajesh',
    name: 'Mr. Rajesh Kumar',
    condition: 'Knee Replacement Surgery',
    badge: 'Recovered in 6 Weeks',
    duration: '1:12',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=250&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-senior-man-resting-his-chin-on-his-hands-40118-large.mp4',
  },
  {
    id: 'amit',
    name: 'Mr. Amit Sharma',
    condition: 'Spine Rehabilitation',
    badge: 'Fully Restored in 8 Weeks',
    duration: '0:58',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=250&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-walking-and-smiling-in-the-city-40763-large.mp4',
  },
  {
    id: 'savitri',
    name: 'Mrs. Savitri Devi',
    condition: 'Cardiology Care',
    badge: 'Successful Angioplasty',
    duration: '1:05',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=250&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-senior-man-resting-his-chin-on-his-hands-40118-large.mp4',
  },
  {
    id: 'priya',
    name: 'Mrs. Priya Singh',
    condition: 'High-Risk Pregnancy Care',
    badge: 'Safe Delivery of Baby Girl',
    duration: '0:48',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=250&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-mother-holding-her-sleeping-baby-41662-large.mp4',
  },
  {
    id: 'aarohi',
    name: 'Baby Aarohi & Mother',
    condition: 'Paediatric Recovery',
    badge: 'Cared for in 5 Days',
    duration: '0:59',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=400&h=250&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-mother-holding-her-sleeping-baby-41662-large.mp4',
  },
]

interface GoogleReviewItem {
  name: string
  time: string
  initials: string
  avatarBg: string
  rating: number
  text: string
  hasReadMore?: boolean
}

const GOOGLE_REVIEWS_MASONRY: GoogleReviewItem[] = [
  // Column 1
  {
    name: 'Md Niyaj',
    time: '1 hour ago',
    initials: 'Md',
    avatarBg: 'bg-[#4338CA]',
    rating: 5,
    text: 'Best care best hospital,',
  },
  {
    name: 'Nasrin Prween',
    time: '2 days ago',
    initials: 'N',
    avatarBg: 'bg-[#15803D]',
    rating: 5,
    text: 'Dr aftab sir bahut acha doctor hai, acha ilaj hua, staff acha hai, patient ka diet acha provide kiya jata h, physio available hai...',
    hasReadMore: true,
  },
  {
    name: 'Yasmin Parween',
    time: '8 days ago',
    initials: 'Y',
    avatarBg: 'bg-[#334155]',
    rating: 5,
    text: 'Best orthopedic surgeon dr.satyendra , best hospital,fecelity Good',
    hasReadMore: true,
  },
  {
    name: 'naushad ali',
    time: '11 days ago',
    initials: 'N',
    avatarBg: 'bg-[#B45309]',
    rating: 5,
    text: 'Best hospital,dr aftab and dr altamash both are good consultant, good care of patients, staffs behaviour also very friendly',
  },

  // Column 2
  {
    name: 'Sanouwer Shah...',
    time: '1 day ago',
    initials: 'S',
    avatarBg: 'bg-[#065F46]',
    rating: 5,
    text: 'This place provided great comprehensive care to the patient, staff was competent and efficient.',
  },
  {
    name: 'Hujaifa Ansari',
    time: '3 days ago',
    initials: 'H',
    avatarBg: 'bg-[#D97706]',
    rating: 5,
    text: 'Best for emergency patients',
  },
  {
    name: 'Mahendara Ram',
    time: '6 days ago',
    initials: 'M',
    avatarBg: 'bg-[#166534]',
    rating: 5,
    text: 'Very good treatment, best doctor available,best staff , highly recommend',
  },
  {
    name: 'Rabul Alam',
    time: '10 days ago',
    initials: 'R',
    avatarBg: 'bg-[#DB2777]',
    rating: 5,
    text: 'Best hospital, dr.aftab sir best doctor, best treatment,',
    hasReadMore: true,
  },

  // Column 3
  {
    name: 'Anayat Husen',
    time: '1 day ago',
    initials: 'A',
    avatarBg: 'bg-[#BE123C]',
    rating: 5,
    text: 'Good care and treatment,dr aftab best doctor in ranchi',
  },
  {
    name: 'Mumtaz Ahmad',
    time: '3 days ago',
    initials: 'M',
    avatarBg: 'bg-[#57534E]',
    rating: 5,
    text: 'Best hospital best doctor available highly recomended',
  },
  {
    name: 'Adib Khan',
    time: '8 days ago',
    initials: 'A',
    avatarBg: 'bg-[#7C3AED]',
    rating: 5,
    text: 'Best hospital',
  },
  {
    name: 'Naushad Alam',
    time: '10 days ago',
    initials: 'N',
    avatarBg: 'bg-[#0284C7]',
    rating: 5,
    text: 'Doctors facility and all hospitals staff are very good and best treatment from here.',
    hasReadMore: true,
  },
  {
    name: 'ATISID PROPER...',
    time: '12 days ago',
    initials: 'A',
    avatarBg: 'bg-[#0F766E]',
    rating: 5,
    text: 'Best hospital and friendly staff',
  },

  // Column 4
  {
    name: 'Mohsin Akhtar',
    time: '1 day ago',
    initials: 'M',
    avatarBg: 'bg-[#92400E]',
    rating: 5,
    text: 'very good',
  },
  {
    name: 'Nisar Ansari',
    time: '2 days ago',
    initials: 'N',
    avatarBg: 'bg-[#EA580C]',
    rating: 5,
    text: 'Best treatment given by dr. Aftab Alam and dr altamash sir..',
  },
  {
    name: 'Shubham Saurav',
    time: '5 days ago',
    initials: 'S',
    avatarBg: 'bg-[#2563EB]',
    rating: 5,
    text: "It's good .. economical ..dr Aftam alam is very good",
  },
  {
    name: 'Talib Ansari',
    time: '10 days ago',
    initials: 'T',
    avatarBg: 'bg-[#115E59]',
    rating: 5,
    text: 'Very good',
    hasReadMore: true,
  },
  {
    name: 'Sudhir Munda',
    time: '13 days ago',
    initials: 'S',
    avatarBg: 'bg-[#C2410C]',
    rating: 5,
    text: 'Hospital best hai,Mera marij amrita ka ilaj doctor Aftab Alam ne kiya...',
  },

  // Column 5
  {
    name: 'Zuber Khan',
    time: '2 days ago',
    initials: 'Z',
    avatarBg: 'bg-[#D97706]',
    rating: 5,
    text: 'Treatment was very good, dr Aftab sir and dr altamash both are good consultant, very satisfied with the treatment',
  },
  {
    name: 'Saraswati Kumari',
    time: '3 days ago',
    initials: 'S',
    avatarBg: 'bg-[#6D28D9]',
    rating: 5,
    text: 'Dr aftab alam ka treatment acha hai best hospital',
  },
  {
    name: 'Ansulika Ansu',
    time: '9 days ago',
    initials: 'A',
    avatarBg: 'bg-[#0F766E]',
    rating: 5,
    text: 'Doctors are good and helpful I had 6-7 days in ICU the process was smooth . Only suggestion I would give to have extra...',
    hasReadMore: true,
  },
  {
    name: 'Suraj kumar Si...',
    time: '11 days ago',
    initials: 'S',
    avatarBg: 'bg-[#0D9488]',
    rating: 5,
    text: 'My patient is treated Under Dr Syed Altamash and Dr Aftab, very good recovery',
  },
]

interface PatientStoriesSectionProps {
  showHeading?: boolean
  showHospitalSection?: boolean
}

export default function PatientStoriesSection({
  showHeading = true,
  showHospitalSection = false,
}: PatientStoriesSectionProps = {}) {
  const [activeStory, setActiveStory] = useState<Testimonial>(TESTIMONIALS[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }, [activeStory])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const toggleFullscreen = () => {
    if (!videoRef.current) return
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00'
    const mins = Math.floor(secs / 60)
    const rem = Math.floor(secs % 60)
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`
  }

  const handleSelectStory = (item: Testimonial) => {
    setActiveStory(item)
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }, 150)
  }

  return (
    <section id="stories" className="py-8 sm:py-10 md:py-14 bg-[#F6FBFA]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        {showHeading && (
          <div className="text-left max-w-2xl">
            <h2 className="mt-2 sm:mt-3 font-display font-semibold text-slate-900 text-[22px] sm:text-[30px] md:text-[30px] lg:text-4xl leading-tight">
              Real Stories. Real People. Real Recoveries.
            </h2>
            <p className="mt-3 sm:mt-4 leading-relaxed text-slate-600 text-sm sm:text-base">
              Every recovery is a story of trust, expert care and compassion.
              <br className="hidden sm:inline" />
              Watch how we&apos;ve helped our patients live healthier, happier lives.
            </p>
          </div>
        )}

        {/* Video Player Grid Showcase (Side-by-side on small tablet and above) */}
        <div className={`${showHeading ? 'mt-8 sm:mt-10' : ''} grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-5 sm:gap-6 md:gap-8 lg:gap-12 items-center`}>
          {/* Left Column: The Custom Video Player */}
          <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-md border border-[#E2ECE9] flex items-center justify-center group">
            <video
              ref={videoRef}
              src={activeStory.videoUrl}
              poster={activeStory.image}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />

            {/* Big Circular Play Button (Centered overlay) */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play testimonial video"
                className="absolute w-14 h-14 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/95 text-[#00A88F] flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 z-20 cursor-pointer focus:outline-none"
              >
                <Play className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 translate-x-0.5 fill-current" />
              </button>
            )}

            {/* Custom Controls Overlay Panel (At the bottom) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-3 sm:p-3.5 md:p-4 flex flex-col gap-2 z-10 transition-opacity duration-300 group-hover:opacity-100 opacity-90">
              {/* Progress Slider */}
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#00A88F]"
              />

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Play/Pause Toggle Button */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="text-white hover:text-[#00A88F] transition-colors focus:outline-none cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current" />
                    ) : (
                      <Play className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current" />
                    )}
                  </button>

                  {/* Time Display */}
                  <span className="text-[11px] sm:text-[11px] md:text-xs text-white/95 font-display font-medium">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 text-white">
                  {/* Mute/Volume Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label="Toggle mute"
                    className="hover:text-[#00A88F] transition-colors focus:outline-none cursor-pointer"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    ) : (
                      <Volume2 className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    )}
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    aria-label="Fullscreen"
                    className="hover:text-[#00A88F] transition-colors focus:outline-none cursor-pointer"
                  >
                    <Maximize className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Vertical Timeline Playlist Selector (Shows ~3 items at a time + vertical scroll) */}
          <div className="relative flex items-center py-1 shrink-0 w-full sm:w-[160px] md:w-[185px] lg:w-[205px]">
            {/* Continuous Timeline Line on Left */}
            <div className="absolute top-3 bottom-3 left-[11px] w-0.5 bg-[#26B09A]/30 z-0" />

            {/* Playlist Items Container */}
            <div className="flex flex-col gap-2.5 sm:gap-3 md:gap-3.5 z-10 w-full max-h-[280px] sm:max-h-[280px] md:max-h-[320px] lg:max-h-[360px] xl:max-h-[400px] overflow-y-auto pr-1.5 py-1">
              {TESTIMONIALS.map((t) => {
                const isActive = t.id === activeStory.id
                return (
                  <div key={t.id} className="flex items-center gap-2.5 sm:gap-2.5 md:gap-3.5 w-full">
                    {/* Timeline Dot Node */}
                    <div className="flex items-center justify-center shrink-0 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6">
                      {isActive ? (
                        <div className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#00A88F] bg-white flex items-center justify-center relative z-10 shadow-xs">
                          <div className="w-2 h-2 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#00A88F]" />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSelectStory(t)}
                          aria-label={`Select story of ${t.name}`}
                          className="w-2.5 h-2.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-[#00A88F]/40 hover:bg-[#00A88F]/70 transition-colors relative z-10 focus:outline-none cursor-pointer"
                        />
                      )}
                    </div>

                    {/* Video Thumbnail Card */}
                    <button
                      type="button"
                      onClick={() => handleSelectStory(t)}
                      className={`playlist-card-btn relative flex-1 aspect-[16/10] rounded-lg sm:rounded-lg md:rounded-xl overflow-hidden border bg-black shadow-xs hover:shadow-md transition-all focus:outline-none group/thumb cursor-pointer ${isActive
                          ? 'border-[#00A88F] ring-2 ring-[#00A88F]/20 scale-[1.02]'
                          : 'border-[#E2ECE9]'
                        }`}
                    >
                      <img
                        src={t.image}
                        alt={`${t.name} thumbnail`}
                        className="w-full h-full object-cover brightness-[0.9]"
                        loading="lazy"
                      />

                      {/* Centered Mini Play Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover/thumb:bg-black/25">
                        <span className="w-7 h-7 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/95 text-[#00A88F] flex items-center justify-center shadow-md transition-transform group-hover/thumb:scale-110">
                          <Play className="w-3 h-3 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 translate-x-0.5 fill-current" />
                        </span>
                      </div>

                      {/* Duration Badge overlay */}
                      <span className="absolute bottom-1 right-1 sm:bottom-1 sm:right-1 md:right-1.5 bg-black/75 text-white text-[8px] sm:text-[8.5px] md:text-[9px] font-display font-semibold px-1 py-0.5 rounded leading-none">
                        {t.duration}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── SECTION: A HOSPITAL BUILT AROUND PEOPLE (IN BETWEEN VIDEO & REVIEWS) ── */}
        {showHospitalSection && (
          <div className="mt-12 sm:mt-16 pt-10 sm:pt-14 border-t border-[#E2ECE9] relative">
            {/* Light Faded Clinica Cure Favicon Watermark on Right Side Edge */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-6 sm:-right-8 md:-right-6 lg:-right-10 w-44 h-44 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-80 lg:h-80 pointer-events-none select-none z-0 opacity-[0.035]">
              <img
                src="/images/icons/favicon-clinicacure.webp"
                alt=""
                aria-hidden="true"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="relative z-10 grid md:grid-cols-[290px_1fr] lg:grid-cols-[360px_1fr] xl:grid-cols-[420px_1fr] gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center">
              {/* Left Side: 3 Hospital Images */}
              <div className="w-full max-w-[420px] md:max-w-none mx-auto lg:mx-0 space-y-2.5">
                {/* Top Reception Image */}
                <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-100 aspect-[16/9] group">
                  <img
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                    alt="Clinica Cure Hospital Modern Reception and Waiting Area"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Bottom Row: 2 Images (OT & Treatment Room) with small gap */}
                <div className="w-full grid grid-cols-2 gap-2.5">
                  <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-100 aspect-[4/3] group">
                    <img
                      src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80"
                      alt="Clinica Cure Inpatient Ward and Patient Beds"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-100 aspect-[4/3] group">
                    <img
                      src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80"
                      alt="Clinica Cure Advanced Operation Theatre and Surgeons"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Hospital Info & 4 Metrics with Lucide Icons */}
              <div className="flex flex-col justify-center">
                {/* Tagline Badge (Dot removed as requested) */}
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E8F7F4] text-[#0E746D] text-[11px] font-bold tracking-wider uppercase mb-2 w-fit">
                  <span>Clinica Cure Hospital</span>
                </div>

                {/* Main Heading */}
                <h2 className="font-display font-semibold text-slate-900 text-2xl sm:text-3xl md:text-[26px] lg:text-[32px] xl:text-[36px] leading-tight">
                  A Hospital Built Around People
                </h2>

                {/* Subtext */}
                <p className="mt-2.5 text-xs sm:text-sm md:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl">
                  Modern infrastructure, advanced technology and a compassionate team — all under one roof at Bariatu, Ranchi.
                </p>

                {/* 4 Stats Grid with Lucide Icons & Dividers */}
                <div className="mt-6 sm:mt-7 md:mt-6 lg:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-slate-200/90">
                  {/* Stat 1: Happy Patients */}
                  <div className="flex flex-col sm:pr-3 md:pr-2 lg:pr-5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                      <Users className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                    </div>
                    <span className="font-display font-bold text-xl sm:text-2xl md:text-[22px] lg:text-[28px] text-[#0E746D] leading-none">
                      50,000+
                    </span>
                    <span className="mt-1.5 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                      Happy Patients
                    </span>
                  </div>

                  {/* Stat 2: Medical Specialities */}
                  <div className="flex flex-col sm:px-3 md:px-2 lg:px-5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                      <Stethoscope className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                    </div>
                    <span className="font-display font-bold text-xl sm:text-2xl md:text-[22px] lg:text-[28px] text-[#0E746D] leading-none">
                      25+
                    </span>
                    <span className="mt-1.5 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                      Medical Specialities
                    </span>
                  </div>

                  {/* Stat 3: Successful Surgeries */}
                  <div className="flex flex-col sm:px-3 md:px-2 lg:px-5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                      <Activity className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                    </div>
                    <span className="font-display font-bold text-xl sm:text-2xl md:text-[22px] lg:text-[28px] text-[#0E746D] leading-none">
                      7,500+
                    </span>
                    <span className="mt-1.5 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                      Successful Surgeries
                    </span>
                  </div>

                  {/* Stat 4: Years of Care */}
                  <div className="flex flex-col sm:pl-3 md:pl-2 lg:pl-5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                      <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                    </div>
                    <span className="font-display font-bold text-xl sm:text-2xl md:text-[22px] lg:text-[28px] text-[#0E746D] leading-none">
                      8+
                    </span>
                    <span className="mt-1.5 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                      Years of Care
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ GOOGLE REVIEWS MASONRY WALL ============ */}
        <div className="mt-14 sm:mt-18 pt-10 sm:pt-14 border-t border-[#E2ECE9]">
          {/* Subheader with Google Rating Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white shadow-xs border border-[#E2ECE9] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 sm:w-6.5 sm:h-6.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base sm:text-2xl text-[#1E293B]">Google Reviews</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E8F6F4] text-[#0E746D] border border-[#0E746D]/20">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0E746D]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    Verified
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                  <div className="flex items-center text-amber-400 text-xs sm:text-sm gap-0.5">
                    {'★'.repeat(5)}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#1E293B]">4.8 / 5.0</span>
                  <span className="text-[11px] sm:text-sm text-[#64748B]">• Based on 874+ reviews on Google</span>
                </div>
              </div>
            </div>
          </div>

          {/* Masonry Columns Grid (Compact gap) */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3.5 sm:gap-4 [column-fill:_balance]">
            {GOOGLE_REVIEWS_MASONRY.map((r, idx) => (
              <div
                key={idx}
                className="break-inside-avoid mb-3.5 sm:mb-4 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#E2ECE9] shadow-[0_3px_14px_-3px_rgba(18,48,44,0.05)] hover:shadow-md transition-all duration-200"
              >
                {/* Top Row: User Profile on Left, Google Icon on Top Right */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full ${r.avatarBg} text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-xs`}
                    >
                      <span>{r.initials}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <h4 className="font-display font-bold text-xs sm:text-sm text-slate-800 truncate">{r.name}</h4>
                        <svg className="w-3.5 h-3.5 text-[#00A88F] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <span className="text-[11px] sm:text-xs text-[#94A3B8] block leading-tight mt-0.5">{r.time}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-center mt-0.5">
                    <svg className="w-[1.3rem] h-[1.3rem]" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400 text-xs my-2.5">
                  {'★'.repeat(r.rating)}
                </div>

                <p className="text-xs sm:text-[13px] text-[#475569] leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
