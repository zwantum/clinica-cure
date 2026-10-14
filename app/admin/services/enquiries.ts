import { EnquiryRecord } from '../types'

const INITIAL_ENQUIRIES: EnquiryRecord[] = [
  {
    id: 'enq-01',
    reference_no: 'ENQ-2026-081',
    name: 'Suresh Kumar Gupta',
    phone: '+91 94311 88220',
    email: 'suresh.gupta@rediffmail.com',
    subject: 'Insurance TPA Empanelment Query',
    message: 'Wanted to inquire whether Star Health cashless Mediclaim is accepted for laparoscopic cholecystectomy.',
    status: 'new',
    assigned_to: 'Billing & TPA Desk',
    internal_notes: [
      { id: 'n1', author: 'Priya (Front Desk)', note: 'Forwarded to TPA desk officer Rahul.', date: 'Today, 10:15 AM' },
    ],
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'enq-02',
    reference_no: 'ENQ-2026-082',
    name: 'Meena Devi',
    phone: '+91 98350 44112',
    email: 'meenadevi@gmail.com',
    subject: 'CT Scan & Ultrasound Timings',
    message: 'Need urgent appointment for whole abdomen USG and Doppler test this Wednesday.',
    status: 'in_progress',
    assigned_to: 'Radiology Desk',
    internal_notes: [
      { id: 'n2', author: 'Dr. Coordinator', note: 'Slot kept tentative for Wednesday 9:30 AM.', date: 'Yesterday' },
    ],
    created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
  {
    id: 'enq-03',
    reference_no: 'ENQ-2026-083',
    name: 'Vikram Singh',
    phone: '+91 91234 99001',
    email: 'vikram.singh@gmail.com',
    subject: 'Physiotherapy Rehabilitation Package',
    message: 'Post-ACL reconstruction physiotherapy charges for 15 days session.',
    status: 'resolved',
    assigned_to: 'Rehab Dept',
    internal_notes: [
      { id: 'n3', author: 'Front Desk', note: 'Contacted patient via phone and shared tariff card.', date: '2 days ago' },
    ],
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
]

let enquiriesStore = [...INITIAL_ENQUIRIES]

export async function fetchEnquiries(): Promise<EnquiryRecord[]> {
  try {
    const res = await fetch('/api/contact', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data?.enquiries)) {
        enquiriesStore = data.enquiries
        if (typeof window !== 'undefined') {
          localStorage.setItem('clinicacure_admin_enquiries', JSON.stringify(data.enquiries))
        }
        return data.enquiries
      }
    }
  } catch (err) {
    console.warn('Could not fetch enquiries from /api/contact, using local storage:', err)
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('clinicacure_admin_enquiries')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length > 0) {
          enquiriesStore = parsed
          return parsed
        }
      } catch {
        // fallback
      }
    }
  }
  return enquiriesStore
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryRecord['status']
): Promise<boolean> {
  try {
    await fetch('/api/contact', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
  } catch {
    // ignore
  }

  enquiriesStore = enquiriesStore.map((enq) => (enq.id === id || enq.reference_no === id ? { ...enq, status } : enq))
  if (typeof window !== 'undefined') {
    localStorage.setItem('clinicacure_admin_enquiries', JSON.stringify(enquiriesStore))
    window.dispatchEvent(new CustomEvent('clinicacure_enquiry_updated'))
  }
  return true
}

export async function addEnquiryNote(
  id: string,
  author: string,
  note: string
): Promise<boolean> {
  try {
    await fetch('/api/contact', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, author, note }),
    })
  } catch {
    // ignore
  }

  enquiriesStore = enquiriesStore.map((enq) => {
    if (enq.id === id || enq.reference_no === id) {
      const existing = enq.internal_notes || []
      return {
        ...enq,
        internal_notes: [
          { id: `note-${Date.now()}`, author, note, date: 'Just now' },
          ...existing,
        ],
      }
    }
    return enq
  })

  if (typeof window !== 'undefined') {
    localStorage.setItem('clinicacure_admin_enquiries', JSON.stringify(enquiriesStore))
    window.dispatchEvent(new CustomEvent('clinicacure_enquiry_updated'))
  }
  return true
}

export async function createEnquiry(
  payload: {
    name: string
    phone: string
    email?: string
    department?: string
    subject?: string
    message: string
  }
): Promise<{ success: boolean; data?: EnquiryRecord }> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const result = await res.json()
      if (result.data) {
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem('clinicacure_admin_enquiries')
          const current: EnquiryRecord[] = cached ? JSON.parse(cached) : [...INITIAL_ENQUIRIES]
          current.unshift(result.data)
          localStorage.setItem('clinicacure_admin_enquiries', JSON.stringify(current))
          window.dispatchEvent(new CustomEvent('clinicacure_enquiry_created'))
        }
        return { success: true, data: result.data }
      }
    }
  } catch (err) {
    console.warn('API error submitting enquiry:', err)
  }

  // Fallback local store
  const ref = `ENQ-2026-${Math.floor(100 + Math.random() * 900)}`
  const localEnquiry: EnquiryRecord = {
    id: `enq-${Date.now()}`,
    reference_no: ref,
    name: payload.name,
    phone: payload.phone,
    email: payload.email || '',
    subject: payload.subject || 'General Patient Inquiry',
    message: payload.message,
    status: 'new',
    assigned_to: payload.department ? `${payload.department} Desk` : 'General Helpdesk',
    internal_notes: [],
    created_at: new Date().toISOString(),
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('clinicacure_admin_enquiries')
    const current: EnquiryRecord[] = cached ? JSON.parse(cached) : [...INITIAL_ENQUIRIES]
    current.unshift(localEnquiry)
    localStorage.setItem('clinicacure_admin_enquiries', JSON.stringify(current))
    window.dispatchEvent(new CustomEvent('clinicacure_enquiry_created'))
  }

  return { success: true, data: localEnquiry }
}
