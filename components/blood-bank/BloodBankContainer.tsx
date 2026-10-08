'use client'

import { useState } from 'react'
import BloodBankHero from '@/components/blood-bank/BloodBankHero'
import LiveBloodStockTracker from '@/components/blood-bank/LiveBloodStockTracker'
import BloodDonorRegistrationSection from '@/components/blood-bank/BloodDonorRegistrationSection'
import BloodEligibilityAndFacts from '@/components/blood-bank/BloodEligibilityAndFacts'
import BloodDonationSteps from '@/components/blood-bank/BloodDonationSteps'
import BloodMythsFacts from '@/components/blood-bank/BloodMythsFacts'
import BloodFaqSection from '@/components/blood-bank/BloodFaqSection'
import BloodRequestModal from '@/components/blood-bank/BloodRequestModal'

export default function BloodBankContainer() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalGroup, setModalGroup] = useState('O+')

  const handleOpenRequest = (group?: string) => {
    setModalGroup(group || 'O+')
    setModalOpen(true)
  }

  const handleScrollToDonorForm = () => {
    const el = document.getElementById('register-donor')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <BloodBankHero
        onRequestBlood={handleOpenRequest}
        onDonateClick={handleScrollToDonorForm}
      />

      {/* 2. Live Blood Group Availability (Table) */}
      <LiveBloodStockTracker onRequestBlood={handleOpenRequest} />

      {/* 3. Register as a Voluntary Blood Donor (3-Column Layout) */}
      <BloodDonorRegistrationSection initialBloodGroup={modalGroup} />

      {/* 4. Who Can Donate Blood? & Blood Donation Facts (2-Card Section) */}
      <BloodEligibilityAndFacts />

      {/* 5. Your 4-Step Donation Journey (Dark Green Banner) */}
      <BloodDonationSteps />

      {/* 6. Blood Donation Myths vs. Facts (Lab Image + Table) */}
      <BloodMythsFacts />

      {/* 7. Frequently Asked Questions (2-Column Accordion) */}
      <BloodFaqSection />

      {/* Emergency Blood Requisition Modal */}
      <BloodRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialBloodGroup={modalGroup}
      />
    </div>
  )
}
