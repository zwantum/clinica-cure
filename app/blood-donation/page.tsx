import type { Metadata } from 'next'
import BloodBankContainer from '@/components/blood-bank/BloodBankContainer'

export const metadata: Metadata = {
  title: 'Donate Blood in Ranchi | Voluntary Blood Donor Registry | Clinica Cure',
  description:
    'Become a lifesaver. Register as a voluntary blood donor, check live blood stock availability, and learn donation eligibility at Clinica Cure Hospital Bariatu, Ranchi.',
}

export default function BloodDonationPage() {
  return <BloodBankContainer />
}
