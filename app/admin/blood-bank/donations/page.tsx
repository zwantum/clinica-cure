'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { HeartHandshake, CheckCircle2, Clock, Plus, UserPlus, Droplet, ShieldCheck } from 'lucide-react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageHeader } from '../../components/PageHeader'
import { StatusBadge } from '../../components/StatusBadge'
import { LoadingState } from '../../components/LoadingState'
import { EmptyState } from '../../components/EmptyState'
import {
  fetchBloodDonations,
  updateBloodDonationStatus,
  createBloodDonation,
  getAvailableBloodGroups,
  BASE_BLOOD_GROUPS,
} from '../../services/blood-bank'
import { BloodDonationRecord } from '../../types'

export default function BloodDonationsPage() {
  const [loading, setLoading] = useState(true)
  const [donations, setDonations] = useState<BloodDonationRecord[]>([])
  const [bloodGroups, setBloodGroups] = useState<string[]>(BASE_BLOOD_GROUPS)
  const [showWalkinModal, setShowWalkinModal] = useState(false)
  const [walkinName, setWalkinName] = useState('')
  const [walkinPhone, setWalkinPhone] = useState('')
  const [walkinGroup, setWalkinGroup] = useState('O+')
  const [walkinGender, setWalkinGender] = useState('Male')
  const [walkinAge, setWalkinAge] = useState('28')
  const [walkinLocality, setWalkinLocality] = useState('Bariatu, Ranchi')
  const [isSubmittingWalkin, setIsSubmittingWalkin] = useState(false)

  const loadData = async () => {
    setLoading(true)
    const [donationsData, groupsData] = await Promise.all([
      fetchBloodDonations(),
      getAvailableBloodGroups(),
    ])
    setDonations(donationsData)
    if (groupsData && groupsData.length > 0) {
      setBloodGroups(groupsData)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()

    const onDonationUpdate = () => {
      loadData()
    }

    window.addEventListener('clinicacure_blood_donation_created', onDonationUpdate)
    window.addEventListener('storage', onDonationUpdate)
    window.addEventListener('focus', onDonationUpdate)

    return () => {
      window.removeEventListener('clinicacure_blood_donation_created', onDonationUpdate)
      window.removeEventListener('storage', onDonationUpdate)
      window.removeEventListener('focus', onDonationUpdate)
    }
  }, [])

  const handleStatusChange = async (id: string, status: BloodDonationRecord['status']) => {
    await updateBloodDonationStatus(id, status)
    loadData()
  }

  const handleRegisterWalkin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!walkinName || !walkinPhone) {
      alert('Please enter donor full name and mobile number.')
      return
    }

    setIsSubmittingWalkin(true)
    try {
      await createBloodDonation({
        fullName: walkinName,
        phone: walkinPhone,
        bloodGroup: walkinGroup,
        gender: walkinGender,
        age: walkinAge,
        locality: walkinLocality,
        donorType: 'Hospital Walk-in Donor',
      })
      setShowWalkinModal(false)
      setWalkinName('')
      setWalkinPhone('')
      loadData()
    } finally {
      setIsSubmittingWalkin(false)
    }
  }

  if (loading) {
    return <LoadingState message="Loading voluntary donation logs..." />
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Blood Bank', href: '/admin/blood-bank' },
          { label: 'Voluntary Donations' },
        ]}
      />

      <PageHeader
        title="Voluntary Blood Donation Register"
        description="Records of blood units collected through hospital walk-ins, voluntary online registry, and community donation camps."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowWalkinModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#0E746D] hover:bg-[#0b5e58] shadow-xs cursor-pointer transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Walk-in Donor</span>
            </button>
            <Link
              href="/admin/blood-bank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#172033] bg-white border border-[#E5EAF0] hover:bg-[#F7F8FA]"
            >
              <Droplet className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Inventory Stock</span>
            </Link>
          </div>
        }
      />

      {donations.length === 0 ? (
        <EmptyState
          title="No Voluntary Donors Registered"
          description="Register walk-in donors or await online voluntary submissions from the public website."
        />
      ) : (
        <div className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F8FA] text-[#5F6B7A] border-b border-[#E5EAF0] uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Donation Ref</th>
                  <th className="py-3 px-4">Donor Name &amp; Contact</th>
                  <th className="py-3 px-4">Group &amp; Profile</th>
                  <th className="py-3 px-4">Donor Category</th>
                  <th className="py-3 px-4">Units &amp; Date</th>
                  <th className="py-3 px-4">Testing Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF0]">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-[#F7F8FA] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#172033]">
                      {d.reference_no}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#172033] block">{d.donor_name}</span>
                      <span className="text-[11px] text-[#5F6B7A] block">{d.phone}</span>
                      {d.locality && (
                        <span className="text-[10px] text-[#8C98A4] block">{d.locality}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="px-2 py-0.5 rounded font-black text-xs bg-[#DC2626]/10 text-[#DC2626]">
                          {d.blood_group}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-[#5F6B7A]">
                        {d.age ? `${d.age} Yrs` : ''} {d.gender ? `• ${d.gender}` : ''}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-xs text-[#172033] font-medium block">
                        {d.donor_type || 'Voluntary Donor'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#172033] block">{d.units_donated || 1} unit</span>
                      <span className="text-[10.5px] text-[#5F6B7A]">{d.donation_date}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={d.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {d.status !== 'available' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(d.id, 'available')}
                            title="Test cleared & Release to stock"
                            className="px-2 py-1 bg-[#16A34A] text-white rounded text-[11px] font-bold hover:bg-[#15803D] cursor-pointer"
                          >
                            Release
                          </button>
                        )}
                        {d.status !== 'tested_quarantined' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(d.id, 'tested_quarantined')}
                            title="Mark quarantined for serology"
                            className="px-2 py-1 bg-[#2563EB] text-white rounded text-[11px] font-bold hover:bg-[#1D4ED8] cursor-pointer"
                          >
                            Quarantine
                          </button>
                        )}
                        {d.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(d.id, 'rejected')}
                            title="Discard unit"
                            className="px-2 py-1 bg-[#FEE2E2] text-[#DC2626] rounded text-[11px] font-bold hover:bg-[#FECACA] cursor-pointer"
                          >
                            Discard
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Register Walk-in Donor */}
      {showWalkinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E5EAF0] shadow-2xl text-[#172033] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5EAF0] mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0E746D]/10 text-[#0E746D] flex items-center justify-center">
                <HeartHandshake className="w-4 h-4 text-[#0E746D]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#172033]">Register Hospital Walk-in Donor</h3>
                <p className="text-[11px] text-[#5F6B7A]">Record donation intake conducted at Clinica Cure campus</p>
              </div>
            </div>

            <form onSubmit={handleRegisterWalkin} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold text-[#172033] mb-1">
                  Donor Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-1">
                    Mobile Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={walkinPhone}
                    onChange={(e) => setWalkinPhone(e.target.value)}
                    placeholder="+91 98765..."
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-1">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={walkinGroup}
                    onChange={(e) => setWalkinGroup(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg font-bold bg-white"
                  >
                    {bloodGroups.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-1">
                    Gender
                  </label>
                  <select
                    value={walkinGender}
                    onChange={(e) => setWalkinGender(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="65"
                    value={walkinAge}
                    onChange={(e) => setWalkinAge(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#172033] mb-1">
                  Locality / Residential Area
                </label>
                <input
                  type="text"
                  value={walkinLocality}
                  onChange={(e) => setWalkinLocality(e.target.value)}
                  placeholder="e.g. Bariatu, Lalpur, Kanke Road"
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5EAF0]">
                <button
                  type="button"
                  onClick={() => setShowWalkinModal(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-[#5F6B7A] hover:bg-[#F7F8FA] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingWalkin}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0E746D] hover:bg-[#0b5e58] rounded-lg cursor-pointer shadow-xs transition-colors"
                >
                  {isSubmittingWalkin ? 'Recording...' : 'Register Donor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
