'use client'

import { useState } from 'react'
import {
  Heart,
  Droplet,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Check,
  ShieldCheck,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
} from 'lucide-react'
import { siteConfig } from '@/config/site'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

const RANCHI_LOCALITIES = [
  'Bariatu (Hospital Vicinity)',
  'Morabadi',
  'Lalpur',
  'Kanke Road',
  'Ratu Road',
  'Doranda',
  'Hinoo',
  'Harmu Housing Colony',
  'Kokar',
  'Bariatu Housing Colony',
  'Ashok Nagar',
  'Other / Outer Ranchi',
]

interface BloodDonorRegistrationFormProps {
  initialBloodGroup?: string
}

export default function BloodDonorRegistrationForm({
  initialBloodGroup,
}: BloodDonorRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsappUpdates: true,
    email: '',
    bloodGroup: initialBloodGroup || 'O+',
    gender: 'Male',
    age: '26',
    weight: '62',
    locality: 'Bariatu (Hospital Vicinity)',
    donorType: 'Emergency On-Call & Regular Donor',
    lastDonation: 'First-time Donor',
    healthDeclared: true,
  })

  const [submitted, setSubmitted] = useState(false)
  const [donorId, setDonorId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Generate donor token
    const generatedId = `CC-DONOR-${Math.floor(100000 + Math.random() * 900000)}`
    setDonorId(generatedId)
    setSubmitted(true)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <section id="blood-donor-form" className="py-14 sm:py-20 bg-white relative scroll-mt-20 border-t border-[#E2ECE9]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Heart className="w-3.5 h-3.5 fill-red-600" />
              <span>JOIN CLINICA CURE VOLUNTARY DONOR REGISTRY</span>
            </div>
            <h2 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl lg:text-4xl">
              Register as a Voluntary Blood Donor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 max-w-xl mx-auto leading-relaxed">
              Join hundreds of proud donors in Ranchi. We reach out when someone with your blood type is in critical need, or schedule your convenient donation at Clinica Cure Hospital.
            </p>
          </div>

          {!submitted ? (
            /* Registration Form */
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-b from-[#FAFDFB] to-white rounded-3xl border border-[#D5E7E1] p-6 sm:p-10 shadow-[0_12px_40px_-10px_rgba(14,116,109,0.08)] space-y-8"
            >
              {/* Step 1: Select Blood Group */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  1. Select Your Blood Group <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                  {BLOOD_GROUPS.map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setFormData({ ...formData, bloodGroup: bg })}
                      className={`h-14 rounded-2xl font-display font-extrabold text-base transition-all flex flex-col items-center justify-center cursor-pointer ${
                        formData.bloodGroup === bg
                          ? 'bg-gradient-to-br from-red-600 to-rose-700 text-white shadow-md shadow-red-600/30 ring-2 ring-red-600 ring-offset-2'
                          : 'bg-white border border-slate-200 text-slate-800 hover:border-red-400 hover:bg-red-50/50'
                      }`}
                    >
                      <span>{bg}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Personal & Contact Information */}
              <div>
                <span className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  2. Personal &amp; Contact Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Kumar Verma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0E746D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Mobile Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (WhatsApp Preferred) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0E746D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (For Certificate)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        placeholder="e.g. rahul.verma@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0E746D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Locality in Ranchi */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Locality in Ranchi <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <select
                        value={formData.locality}
                        onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0E746D] transition-colors cursor-pointer"
                      >
                        {RANCHI_LOCALITIES.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Medical & Eligibility Stats */}
              <div>
                <span className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  3. Health &amp; Donation Profile
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0E746D] cursor-pointer"
                    >
                      <option value="Male">Male (Every 3 months)</option>
                      <option value="Female">Female (Every 4 months)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Age (18–65 Yrs)</label>
                    <input
                      type="number"
                      min={18}
                      max={65}
                      required
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0E746D]"
                    />
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Weight in KG (Min 45 kg)</label>
                    <input
                      type="number"
                      min={45}
                      max={180}
                      required
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0E746D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {/* Donor Role */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Donation Role
                    </label>
                    <select
                      value={formData.donorType}
                      onChange={(e) => setFormData({ ...formData, donorType: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0E746D] cursor-pointer"
                    >
                      <option value="Emergency On-Call & Regular Donor">
                        Emergency On-Call (Contact me when matching patient needs blood)
                      </option>
                      <option value="Regular Hospital Volunteer">
                        Scheduled Regular Donor (Visit Clinica Cure every 3-4 months)
                      </option>
                      <option value="Platelet Apheresis Donor">
                        Platelet Apheresis Donor (SDP Cell Separator)
                      </option>
                    </select>
                  </div>

                  {/* Previous Donation */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Past Donation Experience
                    </label>
                    <select
                      value={formData.lastDonation}
                      onChange={(e) => setFormData({ ...formData, lastDonation: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0E746D] cursor-pointer"
                    >
                      <option value="First-time Donor">First-time Donor</option>
                      <option value="Donated > 3 months ago">Donated &gt; 3 months ago</option>
                      <option value="Regular Multi-time Donor">Regular Multi-time Donor</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Health Declaration Checkbox */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="health-dec"
                  required
                  checked={formData.healthDeclared}
                  onChange={(e) => setFormData({ ...formData, healthDeclared: e.target.checked })}
                  className="mt-1 w-4 h-4 text-[#0E746D] rounded border-slate-300 focus:ring-[#0E746D] cursor-pointer"
                />
                <label htmlFor="health-dec" className="text-xs text-emerald-950 leading-relaxed cursor-pointer">
                  <strong>Voluntary Health Declaration:</strong> I confirm that I am in good health today, have had no fever or antibiotics in the last 48 hours, weigh over 45 kg, and voluntarily register as a donor at Clinica Cure Hospital.
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-[#0E746D] hover:opacity-95 text-white font-display font-bold text-base transition-all shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  <span>Submit Voluntary Donor Registration</span>
                </button>
                <p className="text-[11px] text-center text-slate-500 mt-2.5">
                  Your details are stored in accordance with confidential hospital medical ethics.
                </p>
              </div>
            </form>
          ) : (
            /* Digital Donor Pass / Confirmation Card */
            <div className="bg-white rounded-3xl border border-[#BCE1DB] p-6 sm:p-10 shadow-xl text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8" strokeWidth={3} />
              </div>

              <span className="text-xs font-bold text-[#0E746D] uppercase tracking-wider">
                REGISTRATION CONFIRMED
              </span>
              <h3 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl mt-1">
                Thank You, Lifesaver!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
                Your voluntary donor registration has been enrolled in Clinica Cure Blood Bank Registry.
              </p>

              {/* Digital Donor ID Card */}
              <div className="mt-8 max-w-md mx-auto bg-gradient-to-br from-[#0E746D] to-[#08524D] text-white rounded-3xl p-6 sm:p-7 text-left shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200 block">
                      CLINICA CURE HOSPITAL • BARIATU
                    </span>
                    <h4 className="font-display font-bold text-white text-base">
                      Voluntary Blood Donor Card
                    </h4>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white text-red-600 font-display font-extrabold text-xl flex items-center justify-center shadow-md">
                    {formData.bloodGroup}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-emerald-200/80 block text-[11px]">Donor Name</span>
                    <strong className="text-white text-sm block">{formData.name}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-200/80 block text-[11px]">Donor ID</span>
                    <strong className="text-white font-mono text-sm block">{donorId}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-200/80 block text-[11px]">Contact Mobile</span>
                    <span className="text-white font-semibold">+91 {formData.phone}</span>
                  </div>
                  <div>
                    <span className="text-emerald-200/80 block text-[11px]">City Area</span>
                    <span className="text-white font-semibold truncate block">{formData.locality}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-emerald-200/80 block text-[11px]">Status</span>
                    <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Active On-Call Hero ({formData.donorType})
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-emerald-200">
                  <span>Ground Floor Blood Centre, Bariatu</span>
                  <span>24x7: {siteConfig.phone}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4 text-[#0E746D]" />
                  <span>Print Donor Card</span>
                </button>

                <a
                  href={`https://wa.me/919263397076?text=${encodeURIComponent(
                    `Hello Clinica Cure Hospital, I have registered as a Voluntary Blood Donor (${formData.bloodGroup}) with Donor ID: ${donorId}. Name: ${formData.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Notify Blood Bank on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline py-2 cursor-pointer"
                >
                  Register Another Donor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
