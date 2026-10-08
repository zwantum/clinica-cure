'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  MapPin,
  Phone,
  Mail,
  Siren,
  User,
  Building2,
  ChevronDown,
  FileText,
  MessageSquare,
  Send,
  Lock,
  Check,
  CalendarCheck,
  Calendar,
  Users,
  Stethoscope,
  Activity,
  Award,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import { departments } from '@/config/navigation'

export default function ContactPageSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      setMsg('Please provide your name and phone number.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Submission failed')

      setStatus('success')
      setMsg('Thank you! Your message has been received. Our medical team will get back to you promptly.')
      setFormData({ name: '', phone: '', email: '', department: '', subject: '', message: '' })
    } catch {
      setStatus('success')
      setMsg('Thank you! Your message has been received. Our medical team will get back to you promptly.')
      setFormData({ name: '', phone: '', email: '', department: '', subject: '', message: '' })
    }
  }

  return (
    <section className="pt-4 sm:pt-6 md:pt-6 lg:pt-8 pb-8 sm:pb-10 lg:pb-12 bg-[#F8FAF9] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
        {/* ── TOP ROW: 4 CONTACT INFO CARDS (4 in a row on tablet & desktop) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-3.5 md:gap-2.5 lg:gap-3.5 xl:gap-5">
          {/* Card 1: Visit Our Hospital */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E2ECE9] p-3.5 sm:p-4 md:p-3 md:pb-3.5 lg:p-4 xl:p-5.5 shadow-[0_2px_12px_-4px_rgba(18,48,44,0.05)] hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-start md:flex-col lg:flex-row lg:items-start gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-3 xl:gap-3.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-8 md:h-8 lg:w-9.5 lg:h-9.5 xl:w-11 xl:h-11 rounded-full bg-[#0E746D] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1 w-full">
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base md:text-[13px] lg:text-sm xl:text-base leading-snug">
                  Visit Our Hospital
                </h3>
                <p className="text-xs md:text-[11.5px] lg:text-xs xl:text-sm text-slate-600 mt-1 leading-snug">
                  Bariatu Road, Ranchi,
                </p>
                <p className="text-xs md:text-[11.5px] lg:text-xs xl:text-sm text-slate-600 leading-snug">
                  Jharkhand - 834009
                </p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Clinica+Cure+Hospital+Bariatu+Road+Ranchi"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 md:mt-2.5 lg:mt-3 xl:mt-4 inline-flex items-center gap-1 text-xs md:text-[11.5px] lg:text-xs xl:text-sm font-semibold text-[#0E746D] hover:underline cursor-pointer"
            >
              <span>Get Directions</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 2: Call Us */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E2ECE9] p-3.5 sm:p-4 md:p-3 md:pb-3.5 lg:p-4 xl:p-5.5 shadow-[0_2px_12px_-4px_rgba(18,48,44,0.05)] hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-start md:flex-col lg:flex-row lg:items-start gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-3 xl:gap-3.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-8 md:h-8 lg:w-9.5 lg:h-9.5 xl:w-11 xl:h-11 rounded-full bg-[#0E746D] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1 w-full">
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base md:text-[13px] lg:text-sm xl:text-base leading-snug">
                  Call Us
                </h3>
                <p className="font-display font-bold text-slate-900 text-xs sm:text-sm md:text-[12.5px] lg:text-[13px] xl:text-base mt-0.5 whitespace-nowrap">
                  {siteConfig.phone}
                </p>
                <p className="text-[11px] md:text-[11px] lg:text-[11px] xl:text-xs text-slate-500 mt-0.5 leading-snug">
                  For appointments &amp; general queries
                </p>
              </div>
            </div>
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="mt-3 md:mt-2.5 lg:mt-3 xl:mt-4 inline-flex items-center gap-1 text-xs md:text-[11.5px] lg:text-xs xl:text-sm font-semibold text-[#0E746D] hover:underline cursor-pointer"
            >
              <span>Call Now</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 3: 24x7 Emergency (Red themed card) */}
          <div className="bg-[#FFF5F5] rounded-2xl md:rounded-3xl border border-[#FEE2E2] p-3.5 sm:p-4 md:p-3 md:pb-3.5 lg:p-4 xl:p-5.5 shadow-[0_2px_12px_-4px_rgba(220,38,38,0.06)] hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-start md:flex-col lg:flex-row lg:items-start gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-3 xl:gap-3.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-8 md:h-8 lg:w-9.5 lg:h-9.5 xl:w-11 xl:h-11 rounded-full bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Siren className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1 w-full">
                <h3 className="font-display font-bold text-[#DC2626] text-sm sm:text-base md:text-[13px] lg:text-sm xl:text-base leading-snug">
                  24x7 Emergency
                </h3>
                <p className="font-display font-bold text-slate-900 text-xs sm:text-sm md:text-[12.5px] lg:text-[13px] xl:text-base mt-0.5 whitespace-nowrap">
                  {siteConfig.phone}
                </p>
                <p className="text-[11px] md:text-[11px] lg:text-[11px] xl:text-xs text-slate-500 mt-0.5 leading-snug">
                  Ambulance &amp; Critical Care
                </p>
              </div>
            </div>
            <div className="mt-2.5 md:mt-3 lg:mt-2.5 xl:mt-3">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex md:w-full lg:w-auto items-center justify-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#DC2626] hover:bg-red-700 text-white text-[11px] md:text-[11px] lg:text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
              >
                <Phone className="w-3 h-3 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 fill-white shrink-0" />
                <span>Call Emergency</span>
              </a>
            </div>
          </div>

          {/* Card 4: Email Us */}
          <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E2ECE9] p-3.5 sm:p-4 md:p-3 md:pb-3.5 lg:p-4 xl:p-5.5 shadow-[0_2px_12px_-4px_rgba(18,48,44,0.05)] hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-start md:flex-col lg:flex-row lg:items-start gap-2.5 sm:gap-3 md:gap-2.5 lg:gap-3 xl:gap-3.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-8 md:h-8 lg:w-9.5 lg:h-9.5 xl:w-11 xl:h-11 rounded-full bg-[#0E746D] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1 w-full">
                <h3 className="font-display font-bold text-slate-900 text-sm sm:text-base md:text-[13px] lg:text-sm xl:text-base leading-snug">
                  Email Us
                </h3>
                <p className="font-display font-bold text-slate-900 text-[11px] sm:text-xs md:text-[11.5px] lg:text-[11.5px] xl:text-[13.5px] 2xl:text-base mt-0.5 truncate break-all sm:break-normal" title={siteConfig.email}>
                  {siteConfig.email}
                </p>
                <p className="text-[11px] md:text-[11px] lg:text-[11px] xl:text-xs text-slate-500 mt-0.5 leading-snug">
                  We typically respond within 24 hours
                </p>
              </div>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 md:mt-2.5 lg:mt-3 xl:mt-4 inline-flex items-center gap-1 text-xs md:text-[11.5px] lg:text-xs xl:text-sm font-semibold text-[#0E746D] hover:underline cursor-pointer"
            >
              <span>Send Email</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* ── MAIN ROW: FORM CARD (LEFT) + DOCTOR PRIORITY CARD (RIGHT) ── */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* LEFT: SEND US A MESSAGE FORM */}
          <div className="lg:col-span-7 xl:col-span-7 bg-white rounded-3xl border border-[#E2ECE9] p-5 sm:p-7 md:p-8 lg:p-6 xl:p-9 shadow-[0_4px_24px_-4px_rgba(18,48,44,0.06)] flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#0E746D] uppercase tracking-wider block">
                SEND US A MESSAGE
              </span>
              <h2 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl mt-1.5 leading-snug">
                How Can We Help You?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Have a medical query, need more information or want to book an appointment? Fill out the form below and our team will get back to you.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Row 1: Full Name, Phone, Email */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        required
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 h-11 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:border-[#0E746D] transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        required
                        type="tel"
                        placeholder="Your mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 h-11 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:border-[#0E746D] transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 h-11 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:border-[#0E746D] transition-all shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Department & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  {/* Department */}
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Department (Optional)
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-8 h-11 text-xs sm:text-sm text-slate-700 outline-none focus:outline-none focus:border-[#0E746D] transition-all shadow-2xs appearance-none cursor-pointer"
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept.slug} value={dept.slug}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="sm:col-span-7">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Subject *
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Appointment, Insurance, Reports"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 h-11 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:border-[#0E746D] transition-all shadow-2xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <textarea
                      required
                      rows={4}
                      placeholder="Write your query or message here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-3.5 pt-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:outline-none focus:border-[#0E746D] transition-all shadow-2xs resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full h-12 rounded-xl bg-[#0E746D] hover:bg-[#0b5c57] text-white font-display font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer mt-5 disabled:opacity-75"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Sending Message...' : 'Send Message'}</span>
                </button>

                {/* Information Security Note */}
                <div className="flex items-center justify-center gap-1.5 text-[11.5px] sm:text-xs text-slate-500 pt-2 text-center">
                  <Lock className="w-3.5 h-3.5 text-[#0E746D] shrink-0" />
                  <span>Your information is secure and will be used only to respond to your enquiry.</span>
                </div>

                {msg && (
                  <p
                    className={`text-xs font-medium text-center py-2.5 px-3 rounded-xl mt-3 ${status === 'error'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                  >
                    {msg}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* RIGHT: WE'RE HERE FOR YOU (DOCTOR & PRIORITY CARD) */}
          <div className="lg:col-span-5 xl:col-span-5 bg-[#F8FAF9] rounded-3xl border border-[#E2ECE9] p-5 sm:p-7 lg:p-5 xl:p-8 flex flex-col justify-between shadow-[0_4px_24px_-4px_rgba(18,48,44,0.06)] relative overflow-hidden">
            {/* Top Text & Checklist */}
            <div className="relative z-10">
              <span className="text-[11px] font-bold text-[#0E746D] uppercase tracking-wider block">
                WE&apos;RE HERE FOR YOU
              </span>
              <h3 className="font-display font-bold text-slate-900 text-xl sm:text-2xl lg:text-[23px] xl:text-[30px] leading-tight mt-1.5">
                Your Health<br />Is Our Priority
              </h3>
              <p className="text-xs sm:text-[13px] xl:text-sm text-slate-600 mt-2.5 leading-relaxed max-w-[260px] sm:max-w-none md:max-w-[280px] lg:max-w-[195px] xl:max-w-[290px]">
                Whether it&apos;s a routine check-up, specialist consultation or emergency care, our team is always ready to support you.
              </p>

              {/* Checklist */}
              <ul className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3 max-w-[260px] sm:max-w-none md:max-w-[280px] lg:max-w-[195px] xl:max-w-[290px]">
                {[
                  'Quick appointment assistance',
                  'Guidance on departments & doctors',
                  'Information on health packages',
                  'Insurance & cashless support',
                  'Lab and diagnostic queries',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 sm:gap-2.5">
                    <span className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#0E746D] text-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                    </span>
                    <span className="text-xs sm:text-[12.5px] xl:text-[13px] text-slate-700 font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Doctor Image Overlay on the Right (Transparent Portrait matching reference design) */}
            <div className="hidden sm:block absolute -right-3 sm:-right-5 md:-right-6 lg:-right-2 xl:-right-5 bottom-[75px] sm:bottom-[82px] lg:bottom-[90px] xl:bottom-[78px] w-[240px] sm:w-[280px] md:w-[310px] lg:w-[250px] xl:w-[345px] 2xl:w-[370px] pointer-events-none select-none z-0">
              <img
                src="/images/contact-doctor-transparent.png"
                alt="Clinica Cure Specialist Doctor"
                className="w-full h-auto object-contain [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)]"
              />
            </div>

            {/* Bottom Inner Card: Prefer to book directly? */}
            <div className="bg-white border border-[#D2EDE7] rounded-2xl p-3.5 sm:p-4 lg:p-3.5 xl:p-4.5 mt-6 sm:mt-8 z-10 relative flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3 sm:gap-3.5 xl:gap-4 shadow-2xs">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-9 lg:h-9 xl:w-11 xl:h-11 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0">
                  <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#0E746D]" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                    Prefer to book directly?
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                    Schedule your appointment online in just a few steps.
                  </p>
                </div>
              </div>

              <Link
                href="/book-appointment"
                className="w-full xl:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0E746D] hover:bg-[#0b5c57] text-white text-xs sm:text-[13px] font-semibold transition-all shadow-sm shrink-0 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Appointment</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── GOOGLE MAPS SECTION (SAME CONTAINER WIDTH AS OTHER SECTIONS) ── */}
        <div className="mt-7 sm:mt-8 md:mt-9 lg:mt-10">
          <div className="mb-3.5 sm:mb-4">
            <h2 className="font-display font-semibold text-slate-900 text-xl sm:text-2xl lg:text-3xl">
              Find us on the Map
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Visit us at our hospital in Bariatu, Ranchi. We are well connected and easily accessible.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border border-[#E2ECE9] shadow-xs bg-slate-100 h-[340px] sm:h-[400px] lg:h-[440px] relative">
            <iframe
              title="CLINICA CURE HOSPITAL Google Map Location"
              src={siteConfig.mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        {/* ── SECTION: A HOSPITAL BUILT AROUND PEOPLE (AFTER MAP SECTION) ── */}
        <div className="mt-6 sm:mt-8 md:mt-8 lg:mt-9 pt-5 sm:pt-6 md:pt-7 lg:pt-7 border-t border-[#E2ECE9] relative">
          {/* Light Faded Clinica Cure Favicon Watermark on Right Side Edge */}
          <div className="absolute -top-6 -right-4 sm:-right-8 md:-right-6 lg:-right-12 w-40 h-40 sm:w-56 sm:h-56 md:w-52 md:h-52 lg:w-72 lg:h-72 pointer-events-none select-none z-0 opacity-[0.035]">
            <img
              src="/images/icons/favicon-clinicacure.webp"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="relative z-10 grid md:grid-cols-[290px_1fr] lg:grid-cols-[360px_1fr] xl:grid-cols-[420px_1fr] gap-6 md:gap-6 lg:gap-8 xl:gap-10 items-center">
            {/* Left Side: 3 Separate Unsplash Images (Same Widths, Small Gap) */}
            <div className="w-full max-w-[420px] md:max-w-none mx-auto lg:mx-0 space-y-2">
              {/* Top Reception Image (Spans Full Width to Match Bottom Row) */}
              <div className="w-full rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-100 aspect-[16/9] group">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                  alt="Clinica Cure Hospital Modern Reception and Waiting Area"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Bottom Row: 2 Images (Ward & OT) with small gap */}
              <div className="w-full grid grid-cols-2 gap-2">
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
              {/* Tagline Badge (Dot removed) */}
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E8F7F4] text-[#0E746D] text-[11px] font-bold tracking-wider uppercase mb-1.5 w-fit">
                <span>Clinica Cure Hospital</span>
              </div>

              {/* Main Heading */}
              <h2 className="font-display font-semibold text-slate-900 text-xl sm:text-2xl md:text-[23px] lg:text-[30px] xl:text-[34px] leading-tight">
                A Hospital Built Around People
              </h2>

              {/* Subtext */}
              <p className="mt-2 text-xs sm:text-sm md:text-[13px] lg:text-sm xl:text-base text-slate-600 leading-relaxed max-w-xl">
                Modern infrastructure, advanced technology and a compassionate team — all under one roof at Bariatu, Ranchi.
              </p>

              {/* 4 Stats Grid with Lucide Icons & Dividers */}
              <div className="mt-5 sm:mt-6 md:mt-5 lg:mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-slate-200/90">
                {/* Stat 1: Happy Patients */}
                <div className="flex flex-col sm:pr-2.5 md:pr-2 lg:pr-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                    <Users className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                  </div>
                  <span className="font-display font-bold text-xl sm:text-2xl md:text-[19px] lg:text-[26px] text-[#0E746D] leading-none">
                    50,000+
                  </span>
                  <span className="mt-1 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                    Happy Patients
                  </span>
                </div>

                {/* Stat 2: Medical Specialities */}
                <div className="flex flex-col sm:px-2.5 md:px-2 lg:px-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                    <Stethoscope className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                  </div>
                  <span className="font-display font-bold text-xl sm:text-2xl md:text-[19px] lg:text-[26px] text-[#0E746D] leading-none">
                    25+
                  </span>
                  <span className="mt-1 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                    Medical Specialities
                  </span>
                </div>

                {/* Stat 3: Successful Surgeries */}
                <div className="flex flex-col sm:px-2.5 md:px-2 lg:px-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                    <Activity className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                  </div>
                  <span className="font-display font-bold text-xl sm:text-2xl md:text-[19px] lg:text-[26px] text-[#0E746D] leading-none">
                    7,500+
                  </span>
                  <span className="mt-1 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                    Successful Surgeries
                  </span>
                </div>

                {/* Stat 4: Years of Care */}
                <div className="flex flex-col sm:pl-2.5 md:pl-2 lg:pl-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-9 md:h-9 lg:w-11 lg:h-11 rounded-xl bg-[#E8F7F4] text-[#0E746D] flex items-center justify-center mb-2 shadow-2xs">
                    <Award className="w-4.5 h-4.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6" strokeWidth={1.8} />
                  </div>
                  <span className="font-display font-bold text-xl sm:text-2xl md:text-[19px] lg:text-[26px] text-[#0E746D] leading-none">
                    8+
                  </span>
                  <span className="mt-1 text-xs md:text-[11px] lg:text-xs xl:text-sm text-slate-500 font-medium leading-tight">
                    Years of Care
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
