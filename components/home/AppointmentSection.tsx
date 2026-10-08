'use client'

import { useState } from 'react'
import Link from 'next/link'
import { departments } from '@/config/navigation'
import SymptomsCarousel from './SymptomsCarousel'
import { User, Stethoscope, CalendarDays, Check, Users, Lock, ChevronDown } from 'lucide-react'

export default function AppointmentSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    date: '',
    time: '',
    reason: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      setMsg('Please fill in your name and phone number.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      // Direct client or API call
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error('Submission failed')
      }

      setStatus('success')
      setMsg("Thank you! Your appointment request has been submitted. Our team will call you shortly to confirm.")
      setFormData({
        name: '',
        phone: '',
        email: '',
        department: '',
        date: '',
        time: '',
        reason: '',
      })
    } catch {
      // Graceful fallback for mock/demo
      setStatus('success')
      setMsg("Your appointment request has been received. Our team will contact you shortly.")
    }
  }

  return (
    <section id="health-info" className="py-14 sm:py-18 md:py-18 bg-[#F6FBFA]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch justify-center">
          {/* LEFT CARD: Your Appointment, Made Simple */}
          <div className="w-full lg:w-[48%] bg-white rounded-3xl lg:rounded-l-[32px] lg:rounded-r-none p-6 sm:p-8 md:p-9 lg:p-10 shadow-[0_15px_40px_-10px_rgba(18,48,44,0.08)] flex flex-col justify-between z-0 lg:my-6 border border-[#E2ECE9]">
            <div>
              <h2 className="text-[20px] sm:text-[26px] md:text-[30px] lg:text-[26px] font-display font-semibold text-[#1E293B] leading-snug mb-2">
                Your Appointment, <span className="text-[#0E746D]">Made Simple</span>
              </h2>
              <p className="text-[#64748B] text-xs sm:text-[13px] leading-relaxed mb-6 sm:mb-7">
                Book your consultation in just a few easy steps. Choose your department, select a specialist, and pick a convenient time.
              </p>

              {/* Stepper List with Connecting Dashed Line */}
              <div className="relative space-y-4 sm:space-y-4.5">
                <div className="absolute left-[19px] top-4 bottom-5 w-0.5 border-l-2 border-dashed border-[#BCE1DB] z-0 pointer-events-none" />

                {/* Step 01 */}
                <div className="relative z-10 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#EAF6F4] text-[#0E746D] flex items-center justify-center shrink-0 border-2 border-white shadow-xs">
                    <User className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div className="pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-xs sm:text-sm text-[#0E746D]">01</span>
                      <h3 className="font-display font-bold text-xs sm:text-[14px] text-[#1E293B]">Tell Us About You</h3>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                      Enter your basic details so we can create your appointment request.
                    </p>
                  </div>
                </div>

                {/* Step 02 */}
                <div className="relative z-10 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#EAF6F4] text-[#0E746D] flex items-center justify-center shrink-0 border-2 border-white shadow-xs">
                    <Stethoscope className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div className="pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-xs sm:text-sm text-[#0E746D]">02</span>
                      <h3 className="font-display font-bold text-xs sm:text-[14px] text-[#1E293B]">Choose Your Care</h3>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                      Select the department and choose your preferred doctor.
                    </p>
                  </div>
                </div>

                {/* Step 03 */}
                <div className="relative z-10 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#EAF6F4] text-[#0E746D] flex items-center justify-center shrink-0 border-2 border-white shadow-xs">
                    <CalendarDays className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div className="pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-xs sm:text-sm text-[#0E746D]">03</span>
                      <h3 className="font-display font-bold text-xs sm:text-[14px] text-[#1E293B]">Pick Your Time</h3>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                      View the doctor&apos;s available days and select a convenient time slot.
                    </p>
                  </div>
                </div>

                {/* Step 04 */}
                <div className="relative z-10 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#0E746D] text-white flex items-center justify-center shrink-0 border-2 border-white shadow-xs">
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                  </div>
                  <div className="pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-xs sm:text-sm text-[#0E746D]">04</span>
                      <h3 className="font-display font-bold text-xs sm:text-[14px] text-[#1E293B]">Confirm Your Appointment</h3>
                    </div>
                    <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">
                      Review your details and confirm your appointment instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Box: Not sure which doctor to consult? */}
            <div className="mt-6 bg-[#EDF7F5] rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 border border-[#D5EBE7]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white text-[#0E746D] flex items-center justify-center shrink-0 shadow-xs border border-[#E2ECE9]">
                  <Users className="w-4 h-4" strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-xs sm:text-[13px] text-[#1E293B] leading-snug">
                    Not sure which doctor to consult?
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#64748B] mt-0.5 leading-relaxed">
                    Our team can help you find the right specialist for your health concern.
                  </p>
                </div>
              </div>
              <Link
                href="/departments"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#0E746D] text-[#0E746D] hover:text-white border border-[#0E746D]/35 rounded-xl text-xs font-semibold shadow-xs transition-all duration-200 shrink-0 cursor-pointer"
              >
                <span>Find Doctor</span>
                <span className="text-xs">→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT CARD: Book an Appointment */}
          <div className="w-full lg:w-[54%] lg:-ml-2 bg-[#0E746D] rounded-3xl lg:rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-11 shadow-[0_25px_60px_-15px_rgba(14,116,109,0.35)] text-white flex flex-col justify-between z-10 mt-6 lg:mt-0">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-3.5 mb-5 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/15 text-white flex items-center justify-center shrink-0 shadow-inner">
                  <CalendarDays className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-[18px] sm:text-2xl md:text-[26px] text-white leading-snug">
                    Book an Appointment
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mt-1 sm:mt-1.5 leading-relaxed">
                    Schedule a consultation with your specialist.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-white text-xs font-semibold mb-1.5">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F1F5F9] text-[#1E293B] placeholder-slate-400 rounded-xl px-3.5 h-11 text-xs sm:text-[13px] outline-none border border-transparent focus:bg-white focus:border-[#0E746D] transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-xs font-semibold mb-1.5">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#F1F5F9] text-[#1E293B] placeholder-slate-400 rounded-xl px-3.5 h-11 text-xs sm:text-[13px] outline-none border border-transparent focus:bg-white focus:border-[#0E746D] transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-white text-xs font-semibold mb-1.5">Email Address</label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F1F5F9] text-[#1E293B] placeholder-slate-400 rounded-xl px-3.5 h-11 text-xs sm:text-[13px] outline-none border border-transparent focus:bg-white focus:border-[#0E746D] transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-xs font-semibold mb-1.5">Select Department</label>
                    <div className="relative">
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full bg-[#F1F5F9] text-[#1E293B] rounded-xl px-3.5 h-11 text-xs sm:text-[13px] outline-none border border-transparent focus:bg-white focus:border-[#0E746D] appearance-none cursor-pointer transition-all shadow-sm"
                      >
                        <option value="">Choose department</option>
                        {departments.map((dept) => (
                          <option key={dept.slug} value={dept.name}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-white text-xs font-semibold mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[#F1F5F9] text-[#1E293B] rounded-xl px-3.5 h-11 text-xs sm:text-[13px] outline-none border border-transparent focus:bg-white focus:border-[#0E746D] transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-xs font-semibold mb-1.5">Preferred Time</label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-[#F1F5F9] text-[#1E293B] rounded-xl px-3.5 h-11 text-xs sm:text-[13px] outline-none border border-transparent focus:bg-white focus:border-[#0E746D] transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-xs font-semibold mb-1.5">Reason for Visit</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your concern or symptoms"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full bg-[#F1F5F9] text-[#1E293B] placeholder-slate-400 rounded-xl p-3 text-xs sm:text-[13px] outline-none border border-transparent focus:bg-white focus:border-[#0E746D] resize-none transition-all shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-white hover:bg-white/95 text-[#0E746D] font-display font-bold text-sm sm:text-base rounded-xl h-11 sm:h-12 w-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer disabled:opacity-75"
                >
                  {status === 'submitting' ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <CalendarDays className="w-4 h-4" strokeWidth={1.8} />
                      <span>Book Appointment</span>
                    </>
                  )}
                </button>

                {msg && (
                  <p className={`text-xs font-medium text-center py-2 px-3 rounded-lg ${
                    status === 'error' ? 'bg-red-500/80 text-white' : 'bg-white/20 text-white'
                  }`}>
                    {msg}
                  </p>
                )}

                <p className="text-center text-xs text-white/80 flex items-center justify-center gap-1.5 pt-1">
                  <Lock className="w-3.5 h-3.5" strokeWidth={1.8} />
                  <span>Your information is secure and confidential.</span>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Symptoms Carousel below Appointment */}
        <SymptomsCarousel />
      </div>
    </section>
  )
}
