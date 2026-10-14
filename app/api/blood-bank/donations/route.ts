import { NextResponse } from 'next/server'
import { BloodDonationRecord } from '@/app/admin/types'

const INITIAL_DONATIONS: BloodDonationRecord[] = [
  {
    id: 'don-01',
    reference_no: 'BD-2026-89',
    donor_name: 'Amitabh Soren',
    phone: '+91 94315 88990',
    email: 'amitabh.soren@example.com',
    blood_group: 'O+',
    gender: 'Male',
    age: '29',
    weight: '68',
    locality: 'Bariatu (Hospital Vicinity)',
    donor_type: 'Emergency On-Call & Regular Donor',
    units_donated: 1,
    donation_date: '2026-03-28',
    status: 'available',
  },
  {
    id: 'don-02',
    reference_no: 'BD-2026-90',
    donor_name: 'Pooja Kumari',
    phone: '+91 98350 11223',
    email: 'pooja.k@example.com',
    blood_group: 'A+',
    gender: 'Female',
    age: '24',
    weight: '54',
    locality: 'Kanke Road, Ranchi',
    donor_type: 'Regular Camp Donor',
    units_donated: 1,
    donation_date: '2026-03-29',
    status: 'tested_quarantined',
  },
]

const inMemoryDonations: BloodDonationRecord[] = [...INITIAL_DONATIONS]

export async function GET() {
  return NextResponse.json({
    success: true,
    donations: inMemoryDonations,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      fullName,
      donor_name,
      phone,
      email,
      bloodGroup,
      blood_group,
      gender,
      age,
      weight,
      locality,
      donorType,
      donor_type,
      donation_date,
      units_donated,
    } = body

    const name = (fullName || donor_name || '').trim()
    const contactPhone = (phone || '').trim()
    const group = (bloodGroup || blood_group || 'O+').trim().toUpperCase()

    if (!name || !contactPhone) {
      return NextResponse.json(
        { success: false, error: 'Donor full name and mobile number are required.' },
        { status: 400 }
      )
    }

    const refNo = `CC-DONOR-${Math.floor(100000 + Math.random() * 900000)}`
    const newDonation: BloodDonationRecord = {
      id: `don-${Date.now()}`,
      reference_no: refNo,
      donor_name: name,
      phone: contactPhone,
      email: email || '',
      blood_group: group,
      gender: gender || 'Not specified',
      age: age || '',
      weight: weight || '',
      locality: locality || 'Ranchi',
      donor_type: donorType || donor_type || 'Voluntary Donor Registry',
      units_donated: Number(units_donated) > 0 ? Number(units_donated) : 1,
      donation_date: donation_date || new Date().toISOString().split('T')[0],
      status: 'tested_quarantined',
    }

    inMemoryDonations.unshift(newDonation)

    return NextResponse.json({
      success: true,
      message: 'Voluntary donor registration successful and added to hospital donor registry.',
      data: newDonation,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Donation ID and status are required' }, { status: 400 })
    }

    const index = inMemoryDonations.findIndex((d) => d.id === id || d.reference_no === id)
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Donation record not found' }, { status: 404 })
    }

    inMemoryDonations[index] = {
      ...inMemoryDonations[index],
      status,
    }

    return NextResponse.json({
      success: true,
      data: inMemoryDonations[index],
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
