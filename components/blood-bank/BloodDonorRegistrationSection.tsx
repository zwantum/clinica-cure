'use client'

import { useState, useEffect } from 'react'
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  Clock,
  Activity,
  Users,
  CheckCircle2,
} from 'lucide-react'
import { getAvailableBloodGroups, createBloodDonation, BASE_BLOOD_GROUPS } from '@/app/admin/services/blood-bank'

interface BloodDonorRegistrationSectionProps {
  initialBloodGroup?: string
}

export default function BloodDonorRegistrationSection({
  initialBloodGroup = 'O+',
}: BloodDonorRegistrationSectionProps) {
  const [bloodGroups, setBloodGroups] = useState<string[]>(BASE_BLOOD_GROUPS)
  const [bloodGroup, setBloodGroup] = useState(initialBloodGroup || 'O+')
  const [customGroup, setCustomGroup] = useState('')

  useEffect(() => {
    if (initialBloodGroup) {
      setBloodGroup(initialBloodGroup)
    }
  }, [initialBloodGroup])
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [donorRef, setDonorRef] = useState('')

  const loadGroups = async () => {
    const list = await getAvailableBloodGroups()
    if (list && list.length > 0) {
      setBloodGroups(list)
    }
  }

  useEffect(() => {
    loadGroups()

    const onUpdate = () => {
      loadGroups()
    }

    window.addEventListener('clinicacure_blood_stock_updated', onUpdate)
    window.addEventListener('storage', onUpdate)
    window.addEventListener('focus', onUpdate)

    return () => {
      window.removeEventListener('clinicacure_blood_stock_updated', onUpdate)
      window.removeEventListener('storage', onUpdate)
      window.removeEventListener('focus', onUpdate)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName || !phone) {
      alert('Please enter your full name and contact number.')
      return
    }

    const chosenGroup = bloodGroup === 'Other' ? (customGroup.trim().toUpperCase() || 'Other') : bloodGroup

    setIsSubmitting(true)
    try {
      const res = await createBloodDonation({
        fullName,
        phone,
        email,
        bloodGroup: chosenGroup,
        donorType: 'Voluntary Quick Donor Registration',
      })
      if (res.data?.reference_no) {
        setDonorRef(res.data.reference_no)
      }
      setIsSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="register-donor" className="py-6 sm:py-6 md:py-7 lg:py-10 bg-white scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Column 1: Registration Form Card (5 cols on lg) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="font-display font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight leading-tight">
                Register as a Voluntary <span className="text-red-600">Blood Donor</span>
              </h2>
              <p className="text-[14px] sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                Join our community of life-savers. It only takes a few minutes to register and you could help save multiple lives.
              </p>

              {isSubmitted ? (
                <div className="mt-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-lg">Thank You, Life Saver!</h3>
                  {donorRef && (
                    <div className="inline-block px-3 py-1 bg-white border border-emerald-300 rounded-lg text-xs font-mono font-bold text-emerald-800">
                      Registration ID: {donorRef}
                    </div>
                  )}
                  <p className="text-[14px] sm:text-xs text-slate-600 leading-relaxed">
                    Your donor profile for blood group <strong className="text-red-600 font-bold">{bloodGroup === 'Other' ? customGroup : bloodGroup}</strong> has been recorded in the Clinica Cure hospital donor register. Our transfusion team will reach out whenever there is an urgent patient match in Ranchi.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false)
                      setFullName('')
                      setPhone('')
                      setEmail('')
                      setCustomGroup('')
                    }}
                    className="mt-2 text-xs font-bold text-[#0E746D] hover:underline cursor-pointer"
                  >
                    Register another donor
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Select Blood Group */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Select Blood Group <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E746D]/20 focus:border-[#0E746D] transition-all cursor-pointer"
                        required
                      >
                        {bloodGroups.map((grp) => (
                          <option key={grp} value={grp}>
                            {grp}
                          </option>
                        ))}
                        <option value="Other">Other / Rare Group</option>
                      </select>

                      {bloodGroup === 'Other' && (
                        <input
                          type="text"
                          required
                          value={customGroup}
                          onChange={(e) => setCustomGroup(e.target.value)}
                          placeholder="Specify group (e.g. Bombay Phenotype)"
                          className="w-full mt-2 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0E746D]"
                        />
                      )}
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E746D]/20 focus:border-[#0E746D] transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E746D]/20 focus:border-[#0E746D] transition-all"
                        required
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#0E746D]/20 focus:border-[#0E746D] transition-all"
                      />
                    </div>
                  </div>

                  {/* Register CTA */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-3 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-display font-bold text-xs sm:text-sm transition-all shadow-md shadow-red-600/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                  >

                    <span>Register as a Blood Donor</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </form>
              )}
            </div>

            <p className="text-[11px] text-slate-600 mt-6 pt-4 border-t border-slate-100 text-center">
              Your information is safe and will only be used for blood bank purposes.
            </p>
          </div>

          {/* Column 2: Center Photo with Floating Badge (3.5 cols on lg) */}
          <div className="lg:col-span-3 relative rounded-3xl overflow-hidden min-h-[360px] lg:min-h-full bg-slate-100 shadow-xs border border-slate-200/90 group">
            <img
              src="/images/blood-donation-hero.jpg"
              alt="Smiling voluntary donor at Clinica Cure blood bank"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Floating Glass Badge in Center */}
            <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-xl text-left">
              <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-2">
                <Heart className="w-4 h-4 fill-red-600" />
              </div>
              <h4 className="font-display font-bold text-slate-900 text-sm leading-tight">
                Be a Hero,
                <br />
                Donate Blood
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Safe. Simple. Life-saving.
              </p>
            </div>
          </div>

          {/* Column 3: Why Donate Blood? (3.5 cols on lg) */}
          <div className="lg:col-span-4 bg-slate-50/70 rounded-3xl border border-slate-200/90 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight mb-6">
                Why Donate Blood?
              </h3>

              <div className="space-y-5">
                {/* Reason 1 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-5 h-5 fill-[#0E746D]/20" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">
                      Save Lives
                    </h4>
                    <p className="text-[14px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                      One donation can save up to 3 lives.
                    </p>
                  </div>
                </div>

                {/* Reason 2 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">
                      Safe Process
                    </h4>
                    <p className="text-[14px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Takes only 15–20 minutes.
                    </p>
                  </div>
                </div>

                {/* Reason 3 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0 mt-0.5">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">
                      Better Health
                    </h4>
                    <p className="text-[14px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Helps maintain good heart health.
                    </p>
                  </div>
                </div>

                {/* Reason 4 */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#E2F5F0] text-[#0E746D] flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-900 text-sm">
                      Stronger Community
                    </h4>
                    <p className="text-[14px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                      Supports patients in emergencies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200/70 flex items-center gap-2 text-xs font-semibold text-[#0E746D]">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified transfusion protocols by Clinica Cure</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
