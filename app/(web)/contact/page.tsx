import type { Metadata } from 'next'
import ContactHeroSection from '@/components/contact/ContactHeroSection'
import ContactPageSection from '@/components/contact/ContactPageSection'

export const metadata: Metadata = {
  title: 'Contact Us & Location',
  description:
    'Contact Clinica Cure Hospital in Bariatu, Ranchi. Phone numbers, 24x7 emergency helpline, OPD hours, map directions, and inquiry form.',
}

export default function ContactPage() {
  return (
    <div className="bg-[#F8FAF9] min-h-screen">
      {/* Hero Banner Section matching reference design */}
      <ContactHeroSection />

      {/* Dedicated Contact Page Section */}
      <ContactPageSection />
    </div>
  )
}
