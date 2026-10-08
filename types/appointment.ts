export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'

export interface Appointment {
  id: string
  patient_name: string
  phone: string
  email: string | null
  gender: string | null
  age: number | null
  department_id: string
  doctor_id: string
  appointment_date: string // YYYY-MM-DD
  appointment_time: string // HH:MM
  status: AppointmentStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export interface AppointmentWithRelations extends Appointment {
  doctor: { name: string; designation: string }
  department: { name: string }
}

// Form data for the appointment wizard
export interface AppointmentFormData {
  patient_name: string
  phone: string
  email: string
  gender: string
  age: number
  department_id: string
  doctor_id: string
  appointment_date: string
  appointment_time: string
  notes: string
}
