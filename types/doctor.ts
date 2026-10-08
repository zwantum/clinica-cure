import type { Department } from './department'

export interface Doctor {
  id: string
  name: string
  slug: string
  designation: string
  short_title: string | null
  qualifications: string[]
  bio: string | null
  profile_image: string | null
  specializations: string[]
  is_active: boolean
  is_available: boolean
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface DoctorWithDepartments extends Doctor {
  departments: Department[]
}

export interface DoctorAvailability {
  id: string
  doctor_id: string
  day_of_week: number // 0=Sunday, 1=Monday, ..., 6=Saturday
  start_time: string // HH:MM format
  end_time: string // HH:MM format
  slot_duration_minutes: number
  break_start: string | null
  break_end: string | null
  is_active: boolean
}

export interface DoctorTimeSlot {
  id: string
  doctor_id: string
  slot_date: string // YYYY-MM-DD
  slot_time: string // HH:MM
  is_booked: boolean
  is_blocked: boolean
}
