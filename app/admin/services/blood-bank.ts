import { BloodStockRecord, BloodRequestRecord, BloodDonationRecord } from '../types'
import { safeSetItem, safeGetItem } from '../lib/safeStorage'

const INITIAL_STOCK: BloodStockRecord[] = [
  { blood_group: 'A+', component_type: 'Whole Blood', available_units: 14, min_threshold: 5, last_updated_at: new Date().toISOString(), status: 'adequate' },
  { blood_group: 'A-', component_type: 'Whole Blood', available_units: 4, min_threshold: 3, last_updated_at: new Date().toISOString(), status: 'moderate' },
  { blood_group: 'B+', component_type: 'Whole Blood', available_units: 22, min_threshold: 6, last_updated_at: new Date().toISOString(), status: 'adequate' },
  { blood_group: 'B-', component_type: 'Whole Blood', available_units: 6, min_threshold: 3, last_updated_at: new Date().toISOString(), status: 'adequate' },
  { blood_group: 'AB+', component_type: 'Whole Blood', available_units: 9, min_threshold: 4, last_updated_at: new Date().toISOString(), status: 'adequate' },
  { blood_group: 'AB-', component_type: 'Whole Blood', available_units: 2, min_threshold: 3, last_updated_at: new Date().toISOString(), status: 'critical' },
  { blood_group: 'O+', component_type: 'Whole Blood', available_units: 31, min_threshold: 8, last_updated_at: new Date().toISOString(), status: 'adequate' },
  { blood_group: 'O-', component_type: 'Whole Blood', available_units: 3, min_threshold: 4, last_updated_at: new Date().toISOString(), status: 'critical' },
  { blood_group: 'BOMBAY (HH)', component_type: 'Whole Blood', available_units: 1, min_threshold: 2, last_updated_at: new Date().toISOString(), status: 'critical' },
]

const INITIAL_REQUESTS: BloodRequestRecord[] = [
  {
    id: 'req-01',
    reference_no: 'BR-2026-104',
    requester_name: 'Dr. Aftab Alam (ICU-2)',
    patient_name: 'Anil Kumar (Bed 14)',
    blood_group: 'O-',
    component_type: 'Whole Blood',
    units_needed: 2,
    hospital_ward: 'ICU / Emergency Trauma',
    urgency_level: 'Emergency',
    contact_phone: '+91 94311 00221',
    status: 'under_review',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'req-02',
    reference_no: 'BR-2026-105',
    requester_name: 'Dr. Vivek Goswami',
    patient_name: 'Baby of Kavita',
    blood_group: 'B+',
    component_type: 'Whole Blood',
    units_needed: 1,
    hospital_ward: 'Modular OT 1',
    urgency_level: 'Urgent',
    contact_phone: '+91 98351 44552',
    status: 'received',
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
]

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

// ==========================================
// 1. BLOOD STOCK INVENTORY
// ==========================================

export async function fetchBloodStock(): Promise<BloodStockRecord[]> {
  try {
    const res = await fetch('/api/blood-bank/stock', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data?.stock)) {
        safeSetItem('clinicacure_admin_blood_stock', JSON.stringify(data.stock))
        return data.stock
      }
    }
  } catch (err) {
    console.warn('Could not fetch stock from API, falling back to local storage:', err)
  }

  const cached = safeGetItem('clinicacure_admin_blood_stock')
  if (cached) {
    try {
      return JSON.parse(cached)
    } catch {
      // fallback
    }
  }
  return [...INITIAL_STOCK]
}

export async function adjustBloodStock(
  group: string,
  delta: number,
  reason: string,
  component_type?: string
): Promise<BloodStockRecord[]> {
  try {
    const res = await fetch('/api/blood-bank/stock', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blood_group: group,
        component_type: component_type || 'Whole Blood',
        delta,
        reason,
      }),
    })
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data?.stock)) {
        safeSetItem('clinicacure_admin_blood_stock', JSON.stringify(data.stock))
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('clinicacure_blood_stock_updated'))
        }
        return data.stock
      }
    }
  } catch (err) {
    console.warn('API adjust failed, using local update:', err)
  }

  // Fallback local update
  const current = await fetchBloodStock()
  const compType = component_type || 'Whole Blood'
  const updated = current.map((item) => {
    if (item.blood_group === group && (!component_type || item.component_type === compType)) {
      const newUnits = Math.max(0, item.available_units + delta)
      let status: 'adequate' | 'moderate' | 'critical' = 'adequate'
      if (newUnits <= item.min_threshold / 2) status = 'critical'
      else if (newUnits <= item.min_threshold) status = 'moderate'
      return {
        ...item,
        available_units: newUnits,
        status,
        last_updated_at: new Date().toISOString(),
      }
    }
    return item
  })

  safeSetItem('clinicacure_admin_blood_stock', JSON.stringify(updated))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('clinicacure_blood_stock_updated'))
  }

  return updated
}

export async function addBloodStockGroup(params: {
  blood_group: string
  component_type: string
  available_units: number
  min_threshold: number
}): Promise<{ success: boolean; stock: BloodStockRecord[] }> {
  try {
    const res = await fetch('/api/blood-bank/stock', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    })
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data?.stock)) {
        safeSetItem('clinicacure_admin_blood_stock', JSON.stringify(data.stock))
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('clinicacure_blood_stock_updated'))
        }
        return { success: true, stock: data.stock }
      }
    }
  } catch (err) {
    console.warn('API add group failed, using local update:', err)
  }

  const current = await fetchBloodStock()
  const cleanGroup = params.blood_group.trim().toUpperCase()
  const compType = params.component_type.trim() || 'Whole Blood'
  const units = Number(params.available_units) || 0
  const threshold = Number(params.min_threshold) || 3

  let status: 'adequate' | 'moderate' | 'critical' = 'adequate'
  if (units <= threshold / 2) status = 'critical'
  else if (units <= threshold) status = 'moderate'

  const newRecord: BloodStockRecord = {
    blood_group: cleanGroup,
    component_type: compType,
    available_units: units,
    min_threshold: threshold,
    status,
    last_updated_at: new Date().toISOString(),
  }

  const existingIdx = current.findIndex(
    (c) => c.blood_group === cleanGroup && c.component_type === compType
  )
  if (existingIdx >= 0) {
    current[existingIdx] = newRecord
  } else {
    current.push(newRecord)
  }

  safeSetItem('clinicacure_admin_blood_stock', JSON.stringify(current))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('clinicacure_blood_stock_updated'))
  }

  return { success: true, stock: current }
}

// ==========================================
// 2. BLOOD REQUISITIONS / REQUESTS
// ==========================================

export async function fetchBloodRequests(): Promise<BloodRequestRecord[]> {
  let apiRequests: BloodRequestRecord[] = []
  try {
    const res = await fetch('/api/blood-bank/requests', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data?.requests)) {
        apiRequests = data.requests
      }
    }
  } catch (err) {
    console.warn('Could not fetch requests from API:', err)
  }

  let localRequests: BloodRequestRecord[] = []
  const cached = safeGetItem('clinicacure_admin_blood_requests')
  if (cached) {
    try {
      localRequests = JSON.parse(cached)
    } catch {
      // fallback
    }
  }

  // Merge unique by reference_no or id
  const map = new Map<string, BloodRequestRecord>()
  INITIAL_REQUESTS.forEach((r) => map.set(r.reference_no, r))
  apiRequests.forEach((r) => map.set(r.reference_no, r))
  localRequests.forEach((r) => map.set(r.reference_no, r))

  const merged = Array.from(map.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  safeSetItem('clinicacure_admin_blood_requests', JSON.stringify(merged))

  return merged
}

export async function createBloodRequest(reqData: {
  patient_name: string
  contact_phone: string
  blood_group: string
  component_type?: string
  units_needed?: number
  hospital_ward?: string
  urgency_level?: 'Routine' | 'Urgent' | 'Emergency'
  requester_name?: string
}): Promise<{ success: boolean; data?: BloodRequestRecord }> {
  try {
    const res = await fetch('/api/blood-bank/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqData),
    })
    if (res.ok) {
      const json = await res.json()
      if (json.data) {
        const cached = safeGetItem('clinicacure_admin_blood_requests')
        const current: BloodRequestRecord[] = cached ? JSON.parse(cached) : []
        current.unshift(json.data)
        safeSetItem('clinicacure_admin_blood_requests', JSON.stringify(current))
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('clinicacure_blood_request_created'))
        }
        return { success: true, data: json.data }
      }
    }
  } catch (err) {
    console.warn('API create request failed, saving to local store:', err)
  }

  // Local fallback
  const refNo = `BR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  const newReq: BloodRequestRecord = {
    id: `req-${Date.now()}`,
    reference_no: refNo,
    requester_name: reqData.requester_name || 'Patient Attendant / Web Request',
    patient_name: reqData.patient_name,
    blood_group: reqData.blood_group.toUpperCase(),
    component_type: reqData.component_type || 'Whole Blood',
    units_needed: reqData.units_needed || 1,
    hospital_ward: reqData.hospital_ward || 'Clinica Cure Emergency / Ward',
    urgency_level: reqData.urgency_level || 'Urgent',
    contact_phone: reqData.contact_phone,
    status: 'under_review',
    created_at: new Date().toISOString(),
  }

  const cached = safeGetItem('clinicacure_admin_blood_requests')
  const current: BloodRequestRecord[] = cached ? JSON.parse(cached) : []
  current.unshift(newReq)
  safeSetItem('clinicacure_admin_blood_requests', JSON.stringify(current))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('clinicacure_blood_request_created'))
  }

  return { success: true, data: newReq }
}

export async function updateBloodRequestStatus(
  id: string,
  status: BloodRequestRecord['status']
): Promise<boolean> {
  try {
    await fetch('/api/blood-bank/requests', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
  } catch {
    // ignore
  }

  const cached = safeGetItem('clinicacure_admin_blood_requests')
  if (cached) {
    try {
      const current: BloodRequestRecord[] = JSON.parse(cached)
      const updated = current.map((r) =>
        r.id === id || r.reference_no === id ? { ...r, status } : r
      )
      safeSetItem('clinicacure_admin_blood_requests', JSON.stringify(updated))
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('clinicacure_blood_request_created'))
      }
    } catch {
      // ignore
    }
  }

  return true
}

// ==========================================
// 3. VOLUNTARY BLOOD DONATIONS
// ==========================================

export async function fetchBloodDonations(): Promise<BloodDonationRecord[]> {
  let apiDonations: BloodDonationRecord[] = []
  try {
    const res = await fetch('/api/blood-bank/donations', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data?.donations)) {
        apiDonations = data.donations
      }
    }
  } catch (err) {
    console.warn('Could not fetch donations from API:', err)
  }

  let localDonations: BloodDonationRecord[] = []
  const cached = safeGetItem('clinicacure_admin_blood_donations')
  if (cached) {
    try {
      localDonations = JSON.parse(cached)
    } catch {
      // fallback
    }
  }

  // Merge unique by reference_no or id
  const map = new Map<string, BloodDonationRecord>()
  INITIAL_DONATIONS.forEach((d) => map.set(d.reference_no, d))
  apiDonations.forEach((d) => map.set(d.reference_no, d))
  localDonations.forEach((d) => map.set(d.reference_no, d))

  const merged = Array.from(map.values())

  safeSetItem('clinicacure_admin_blood_donations', JSON.stringify(merged))

  return merged
}

export async function createBloodDonation(donorData: {
  fullName: string
  phone: string
  email?: string
  bloodGroup: string
  gender?: string
  age?: string | number
  weight?: string
  locality?: string
  donorType?: string
}): Promise<{ success: boolean; data?: BloodDonationRecord }> {
  try {
    const res = await fetch('/api/blood-bank/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donorData),
    })
    if (res.ok) {
      const json = await res.json()
      if (json.data) {
        const cached = safeGetItem('clinicacure_admin_blood_donations')
        const current: BloodDonationRecord[] = cached ? JSON.parse(cached) : []
        current.unshift(json.data)
        safeSetItem('clinicacure_admin_blood_donations', JSON.stringify(current))
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('clinicacure_blood_donation_created'))
        }
        return { success: true, data: json.data }
      }
    }
  } catch (err) {
    console.warn('API create donation failed, saving to local store:', err)
  }

  // Local fallback
  const refNo = `CC-DONOR-${Math.floor(100000 + Math.random() * 900000)}`
  const newDonation: BloodDonationRecord = {
    id: `don-${Date.now()}`,
    reference_no: refNo,
    donor_name: donorData.fullName,
    phone: donorData.phone,
    email: donorData.email || '',
    blood_group: donorData.bloodGroup.toUpperCase(),
    gender: donorData.gender || 'Not specified',
    age: donorData.age || '',
    weight: donorData.weight || '',
    locality: donorData.locality || 'Ranchi',
    donor_type: donorData.donorType || 'Voluntary Donor Registry',
    units_donated: 1,
    donation_date: new Date().toISOString().split('T')[0],
    status: 'tested_quarantined',
  }

  const cached = safeGetItem('clinicacure_admin_blood_donations')
  const current: BloodDonationRecord[] = cached ? JSON.parse(cached) : []
  current.unshift(newDonation)
  safeSetItem('clinicacure_admin_blood_donations', JSON.stringify(current))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('clinicacure_blood_donation_created'))
  }

  return { success: true, data: newDonation }
}

export async function updateBloodDonationStatus(
  id: string,
  status: BloodDonationRecord['status']
): Promise<boolean> {
  try {
    await fetch('/api/blood-bank/donations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
  } catch {
    // ignore
  }

  const cached = safeGetItem('clinicacure_admin_blood_donations')
  if (cached) {
    try {
      const current: BloodDonationRecord[] = JSON.parse(cached)
      const updated = current.map((d) =>
        d.id === id || d.reference_no === id ? { ...d, status } : d
      )
      safeSetItem('clinicacure_admin_blood_donations', JSON.stringify(updated))
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('clinicacure_blood_donation_created'))
      }
    } catch {
      // ignore
    }
  }

  return true
}

// ==========================================
// 4. SHARED BLOOD GROUPS HELPER
// ==========================================

export const BASE_BLOOD_GROUPS = [
  'A+',
  'A-',
  'B+',
  'B-',
  'O+',
  'O-',
  'AB+',
  'AB-',
  'BOMBAY (HH)',
]

export async function getAvailableBloodGroups(): Promise<string[]> {
  try {
    const stock = await fetchBloodStock()
    if (stock && stock.length > 0) {
      const stockGroups = stock.map((s) => s.blood_group.trim().toUpperCase())
      const result = [...BASE_BLOOD_GROUPS]
      stockGroups.forEach((grp) => {
        if (!result.includes(grp)) {
          result.push(grp)
        }
      })
      return result
    }
  } catch {
    // fallback
  }
  return [...BASE_BLOOD_GROUPS]
}

