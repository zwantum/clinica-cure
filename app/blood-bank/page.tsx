import type { Metadata } from 'next'
import BloodBankContainer from '@/components/blood-bank/BloodBankContainer'

export const metadata: Metadata = {
  title: 'Blood Bank & Voluntary Blood Donation in Ranchi | Clinica Cure Hospital',
  description:
    'Check real-time blood group availability (A+, A-, B+, B-, O+, O-, AB+, AB-), 24x7 emergency blood component requisition, and register as a voluntary blood donor at Clinica Cure Hospital Bariatu, Ranchi.',
  keywords: [
    'blood bank ranchi',
    'blood donation ranchi',
    'voluntary blood donor',
    'clinica cure blood bank',
    'platelets ranchi',
    'emergency blood transfusion bariatu',
    'O negative blood ranchi',
  ],
  openGraph: {
    title: 'Blood Bank & Voluntary Blood Donation | Clinica Cure Hospital',
    description:
      'Live blood stock tracker, emergency blood components, and voluntary donor registry at Clinica Cure Hospital Ranchi.',
    images: ['/images/blood-donation-hero.jpg'],
    type: 'website',
  },
}

export default function BloodBankPage() {
  return <BloodBankContainer />
}
