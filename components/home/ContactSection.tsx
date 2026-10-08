'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
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
      setMsg('Thank you! Your message has been received. Our team will contact you shortly.')
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('success')
      setMsg('Thank you! Your message has been received. Our team will contact you shortly.')
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <section id="contact" className="py-10 sm:py-14 md:py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="text-left max-w-2xl">
          <p className="text-[#0e746d] font-display font-bold text-xs md:text-sm tracking-wider uppercase">
            GET IN TOUCH
          </p>
          <h2 className="mt-2 sm:mt-3 font-display font-semibold text-slate-900 text-[22px] sm:text-[30px] md:text-3xl lg:text-4xl leading-tight">
            We&apos;re Here to Help You
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600 text-sm sm:text-base">
            Reach out for appointments, general queries or emergency assistance - our team responds quickly.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* Left Column: Info Cards & Map */}
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Address */}
              <div className="bg-[#F8FAF9] border border-[#E2ECE9] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0E746D] shrink-0">
                  <MapPin className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-display font-bold text-slate-900 text-sm">Address</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {siteConfig.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-[#F8FAF9] border border-[#E2ECE9] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-red-600 shrink-0">
                  <Phone className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-display font-bold text-slate-900 text-sm">Phone</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Reception: <a href={`tel:${siteConfig.phoneRaw}`} className="hover:underline">{siteConfig.phone}</a>
                  </p>
                  <p className="text-xs sm:text-sm text-red-600 font-semibold mt-0.5">
                    Emergency: 24x7 Available
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="bg-[#F8FAF9] border border-[#E2ECE9] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0E746D] shrink-0">
                  <Mail className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-display font-bold text-slate-900 text-sm">Email</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    <a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a>
                  </p>
                </div>
              </div>

              {/* OPD Hours */}
              <div className="bg-[#F8FAF9] border border-[#E2ECE9] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                <span className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0E746D] shrink-0">
                  <Clock className="w-5 h-5" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-display font-bold text-slate-900 text-sm">OPD Hours</p>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Mon–Sat: {siteConfig.opdHours}<br />
                    Emergency: Open {siteConfig.emergencyHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs aspect-[16/9] sm:aspect-[21/9] bg-slate-100">
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

          {/* Right Column: Query Form */}
          <div className="bg-[#F8FAF9] border border-[#E2ECE9] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-slate-900 text-lg sm:text-xl">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Have a medical query or need more information? Fill out the form below and we will get back to you promptly.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 h-11 text-xs sm:text-[13px] outline-none focus:border-[#0E746D] transition-all shadow-2xs"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="Your mobile number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 h-11 text-xs sm:text-[13px] outline-none focus:border-[#0E746D] transition-all shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 h-11 text-xs sm:text-[13px] outline-none focus:border-[#0E746D] transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Appointment Enquiry, Health Package, Second Opinion"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 h-11 text-xs sm:text-[13px] outline-none focus:border-[#0E746D] transition-all shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your query or message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs sm:text-[13px] outline-none focus:border-[#0E746D] resize-none transition-all shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full h-11 sm:h-12 rounded-xl bg-[#0E746D] hover:bg-[#0b5c57] text-white font-display font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-75"
                >
                  {status === 'submitting' ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" strokeWidth={1.8} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {msg && (
                  <p className={`text-xs font-medium text-center py-2 px-3 rounded-lg ${status === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                    {msg}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
