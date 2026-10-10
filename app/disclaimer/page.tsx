import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Disclaimer | Clinica Cure Hospital',
  description: 'Clinical and legal disclaimer for Clinica Cure Hospital, Bariatu, Ranchi.',
}

export default function DisclaimerPage() {
  return (
    <div className="bg-[#F8FAF9] pt-6 sm:pt-8 pb-8 sm:pb-10">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#0E746D]">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Disclaimer</span>
        </div>

        <div className="bg-white rounded-3xl border border-[#DDEAE7] p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h1 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl">
              Medical &amp; Legal Disclaimer
            </h1>
          </div>
          <p className="text-xs text-slate-500 mb-8">
            Last Updated: March 2026 • Clinica Cure Hospital, Bariatu, Ranchi
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                1. Not a Substitute for Medical Consultation
              </h2>
              <p>
                The materials and information available on this website are intended solely for general health awareness and educational reference. None of the web content should be considered professional medical diagnosis, personalized treatment advice, or a physician-patient relationship. Always consult a qualified medical doctor for individual clinical evaluation.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                2. Emergency Care Protocol
              </h2>
              <p>
                This website is not monitored for real-time acute emergency response. If you or someone you know is experiencing severe symptoms, trauma, acute chest pain, stroke symptoms, or breathing distress, immediately report to our 24x7 Emergency Trauma Center at {siteConfig.address} or call our critical desk at{' '}
                <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#0E746D] font-semibold hover:underline">
                  {siteConfig.phone}
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                3. Accuracy of Information
              </h2>
              <p>
                While {siteConfig.name} strives to maintain current, evidence-based medical information on this platform, healthcare science evolves rapidly. We do not warrant that all digital content is completely error-free or perpetually updated in real-time.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-slate-900 text-base sm:text-lg mb-2">
                4. Third-Party Websites &amp; External Links
              </h2>
              <p>
                Links to external platforms, healthcare blogs, or health portals are provided for user convenience. {siteConfig.name} does not endorse or bear responsibility for the content, privacy standards, or services offered by third-party websites.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
