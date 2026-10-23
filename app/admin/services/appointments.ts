import { AppointmentRecord } from '../types'
import { safeSetItem, safeGetItem } from '../lib/safeStorage'

// Mock seed fallback if database table is initializing or offline
const INITIAL_APPOINTMENTS: AppointmentRecord[] = [
  {
    id: 'apt-001',
    booking_reference: 'CC-2026-9041',
    patient_name: 'Rajesh Verma',
    phone: '+91 94311 23456',
    email: 'rajesh.verma@gmail.com',
    gender: 'Male',
    age: 48,
    department_name: 'Orthopaedics',
    doctor_name: 'Dr. Syed Altamash',
    doctor_slug: 'dr-syed-altamash',
    appointment_date: '2026-03-29',
    appointment_time: '11:00 AM',
    reason: 'Post-operative knee examination and mobility evaluation.',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'apt-002',
    booking_reference: 'CC-2026-9042',
    patient_name: 'Sunita Mishra',
    phone: '+91 98350 70801',
    email: 'sunita.mishra@yahoo.com',
    gender: 'Female',
    age: 32,
    department_name: 'Obstetrics & Gynaecology',
    doctor_name: 'Dr. Soniya Bansal',
    doctor_slug: 'dr-soniya-bansal',
    appointment_date: '2026-03-29',
    appointment_time: '02:30 PM',
    reason: 'Second trimester ultrasound and routine antenatal checkup.',
    status: 'confirmed',
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'apt-003',
    booking_reference: 'CC-2026-9043',
    patient_name: 'Mohammad Farhan',
    phone: '+91 91234 56789',
    email: 'farhan.m@gmail.com',
    gender: 'Male',
    age: 29,
    department_name: 'Neurology & Neurosurgery',
    doctor_name: 'Dr. Tarique Jamil Hasan',
    doctor_slug: 'dr-tarique-jamil-hasan',
    appointment_date: '2026-03-30',
    appointment_time: '10:30 AM',
    reason: 'Persistent cervical neck stiffness and arm numbness.',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
]

// In-memory / localStorage cache store for fast, reactive UI with fallback
let appointmentsStore: AppointmentRecord[] = [...INITIAL_APPOINTMENTS]

export async function fetchAppointments(): Promise<AppointmentRecord[]> {
  const mergedMap = new Map<string, AppointmentRecord>()

  // 1. Seed fallback base
  INITIAL_APPOINTMENTS.forEach((apt) => mergedMap.set(apt.id, apt))

  // 2. Load from localStorage if present
  const cached = safeGetItem('clinicacure_admin_appointments')
  if (cached) {
    try {
      const localList: AppointmentRecord[] = JSON.parse(cached)
      if (Array.isArray(localList)) {
        localList.forEach((apt) => {
          if (apt.id) mergedMap.set(apt.id, apt)
        })
      }
    } catch {}
  }

  // 3. Fetch from API endpoint (Supabase + In-Memory)
  try {
    const res = await fetch('/api/appointments', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      const rawList = Array.isArray(data) ? data : data.appointments || data.data || []
      if (Array.isArray(rawList) && rawList.length > 0) {
        rawList.forEach((d: any) => {
          const id = d.id || `apt-${Math.random().toString(36).substr(2, 6)}`
          mergedMap.set(id, {
            id,
            booking_reference:
              d.booking_reference ||
              d.token_id ||
              `CC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            patient_name: d.patient_name || 'Patient',
            phone: d.phone || '',
            email: d.email || '',
            gender: d.gender || 'Not specified',
            age: d.age || 35,
            department_name: d.department_name || 'General OPD',
            doctor_name: d.doctor_name || 'Attending Consultant',
            doctor_slug: d.doctor_slug || '',
            appointment_date: d.appointment_date || new Date().toISOString().split('T')[0],
            appointment_time: d.appointment_time || '10:00 AM',
            reason: d.reason || '',
            status: d.status || 'pending',
            admin_notes: d.admin_notes || '',
            created_at: d.created_at || new Date().toISOString(),
          })
        })
      }
    }
  } catch (err) {
    console.warn('API fetch appointments error:', err)
  }

  // Sort by created_at descending (newest first)
  const DUMMY_IDS = new Set(['apt-001', 'apt-002', 'apt-003'])
  const allAppointments = Array.from(mergedMap.values())
  const hasRealAppointments = allAppointments.some((a) => !DUMMY_IDS.has(a.id))

  let result = allAppointments
  if (hasRealAppointments) {
    // Exclude dummy records so only real user bookings are shown!
    result = result.filter((a) => !DUMMY_IDS.has(a.id))
  }

  result.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  appointmentsStore = result
  safeSetItem('clinicacure_admin_appointments', JSON.stringify(result))

  return result
}

export async function updateAppointmentStatus(
  id: string,
  newStatus: AppointmentRecord['status'],
  notes?: string
): Promise<boolean> {
  // Sync to API endpoint
  try {
    await fetch('/api/appointments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus, notes }),
    })
  } catch {
    // fallback local sync
  }

  appointmentsStore = appointmentsStore.map((apt) =>
    apt.id === id ? { ...apt, status: newStatus, admin_notes: notes || apt.admin_notes } : apt
  )

  safeSetItem('clinicacure_admin_appointments', JSON.stringify(appointmentsStore))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('clinicacure_appointment_updated'))
    window.dispatchEvent(new CustomEvent('clinicacure_appointment_booked'))
  }

  return true
}

export async function createManualAppointment(
  data: Omit<AppointmentRecord, 'id' | 'booking_reference' | 'created_at'>
): Promise<AppointmentRecord> {
  const newAppointment: AppointmentRecord = {
    ...data,
    id: `apt-${Date.now()}`,
    booking_reference: `CC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    created_at: new Date().toISOString(),
  }

  try {
    await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAppointment),
    })
  } catch {
    // fallback local
  }

  appointmentsStore = [newAppointment, ...appointmentsStore]

  safeSetItem('clinicacure_admin_appointments', JSON.stringify(appointmentsStore))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('clinicacure_appointment_booked'))
    window.dispatchEvent(new CustomEvent('clinicacure_appointment_updated'))
  }

  return newAppointment
}
