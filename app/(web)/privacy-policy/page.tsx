import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Privacy Policy | Clinica Cure Hospital',
  description: 'Privacy Policy and patient data protection standards at Clinica Cure Hospital, Bariatu, Ranchi.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F8FAF9] pt-6 sm:pt-6 md:pt-6 lg:pt-8 pb-8 sm:pb-6 md:pb-7 lg:pb-10">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#0E746D]">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Privacy Policy</span>
        </div>

        <div className="bg-white rounded-3xl border border-[#DDEAE7] p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h1 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xs text-slate-500 mb-8">
            Last Updated: March 2026 • Clinica Cure Hospital, Bariatu, Ranchi
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                1. Commitment to Patient Privacy
              </h2>
              <p>
                At {siteConfig.name}, safeguarding your confidential medical information and personal data is fundamental to our clinical ethics. This policy explains how we collect, handle, and protect your information when you visit our facility, use our website, or book appointments.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                2. Information We Collect
              </h2>
              <p>
                We may collect personal identification details (name, contact number, email, address), demographic data, and clinical history necessary for scheduling consultations, processing lab investigations, diagnostic reporting, and maintaining official medical records.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                3. Use of Health Information
              </h2>
              <p>
                All patient health records are strictly used for providing medical care, coordinating specialist consultations, emergency clinical interventions, and billing/TPA cashless insurance claim settlements as authorized by you or your legal representative.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                4. Data Security &amp; Confidentiality
              </h2>
              <p>
                We enforce technical, administrative, and physical safeguards in compliance with healthcare data protection standards. Your records are accessible exclusively by verified medical and administrative staff on a need-to-know basis.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                5. Contacting Our Data Grievance Desk
              </h2>
              <p>
                For questions regarding your medical data or this privacy statement, please contact us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-[#0E746D] font-medium hover:underline">
                  {siteConfig.email}
                </a>{' '}
                or reach our helpline at{' '}
                <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#0E746D] font-medium hover:underline">
                  {siteConfig.phone}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
