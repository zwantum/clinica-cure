import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Terms of Use | Clinica Cure Hospital',
  description: 'Terms of use and website guidelines for Clinica Cure Hospital, Bariatu, Ranchi.',
}

export default function TermsOfUsePage() {
  return (
    <div className="bg-[#F8FAF9] pt-6 sm:pt-8 pb-8 sm:pb-10">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#0E746D]">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Terms of Use</span>
        </div>

        <div className="bg-white rounded-3xl border border-[#DDEAE7] p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl">
              Terms of Use
            </h1>
          </div>
          <p className="text-xs text-slate-500 mb-8">
            Last Updated: March 2026 • Clinica Cure Hospital, Bariatu, Ranchi
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the website, appointment booking portals, and online services provided by {siteConfig.name}, you agree to adhere to these Terms of Use and all applicable laws and regulations in India.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                2. Medical Advice Disclaimer
              </h2>
              <p>
                The information provided on this website is for general informational and educational purposes only. It does not constitute medical diagnosis, individual clinical advice, or treatment plans. In case of a medical emergency, visit our 24x7 emergency department at {siteConfig.address} or call {siteConfig.phone} immediately.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                3. Online Appointments &amp; Consultations
              </h2>
              <p>
                Booking requests submitted through our web portal are subject to physician availability and confirmation by our hospital reception. We strive to honor confirmed time slots, but emergency surgeries and critical cases may occasionally cause schedule adjustments.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                4. Intellectual Property
              </h2>
              <p>
                All text, graphics, trademarks, logos, and digital assets published on this site are the property of {siteConfig.name} and protected by applicable copyright and intellectual property legislation.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                5. Contact Information
              </h2>
              <p>
                If you have questions regarding these terms, reach our administrative office at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-[#0E746D] font-medium hover:underline">
                  {siteConfig.email}
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
