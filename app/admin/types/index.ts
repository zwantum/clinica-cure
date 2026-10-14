export type AdminModule =
  | 'overview'
  | 'appointments'
  | 'doctors'
  | 'availability'
  | 'blood-bank'
  | 'enquiries'
  | 'settings'

export type RoleSlug =
  | 'super_admin'
  | 'appointment_staff'
  | 'doctor_manager'
  | 'blood_bank_staff'
  | 'enquiries_staff'

export interface ModulePermissions {
  can_view: boolean
  can_create: boolean
  can_edit: boolean
  can_delete: boolean
}

export type PermissionMatrix = Record<AdminModule, ModulePermissions>

export interface StaffUser {
  id?: string
  name: string
  email: string
  role: RoleSlug | 'admin' | 'receptionist'
  roleName: string
  permissions?: Partial<PermissionMatrix>
}

export interface AppointmentRecord {
  id: string
  booking_reference: string
  patient_name: string
  phone: string
  email?: string
  gender?: string
  age?: number
  department_name: string
  doctor_name: string
  doctor_slug?: string
  appointment_date: string
  appointment_time: string
  reason?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'
  admin_notes?: string
  created_at: string
}

export interface DoctorExpertiseItem {
  title: string
  description: string
}

export interface DoctorMetricBadge {
  title: string
  subtitle: string
}

export interface DoctorScheduleItem {
  day: string
  timings: string
  type: string
  status: 'Available' | 'On-Duty' | 'Unavailable' | 'On Leave'
  shift1?: string
  shift2?: string
}

export interface DoctorCtaBanner {
  eyebrow?: string
  title?: string
  description?: string
  button_text?: string
  button_url?: string
  image?: string
  features?: string[]
}

export interface DoctorRecord {
  id: string
  name: string
  slug: string
  designation: string
  department_name: string
  department_slug: string
  departments?: string[]
  seniority_badge?: string
  experience_years: string
  procedures_count?: string
  expertise_highlight?: string
  care_approach?: string
  metric_badges?: DoctorMetricBadge[]
  consultation_fee: number
  gender?: string
  profile_image?: string
  is_active: boolean
  is_on_leave: boolean
  qualifications: string[]
  short_title?: string
  short_bio?: string
  bio?: string
  quote?: string
  expertise?: DoctorExpertiseItem[]
  schedule_sessions?: DoctorScheduleItem[]
  faqs?: Array<{ question: string; answer: string; sort_order: number; is_published: boolean }>
  cta_banner?: DoctorCtaBanner
}

export interface BloodStockRecord {
  blood_group: string
  component_type: string
  available_units: number
  min_threshold: number
  last_updated_at: string
  status: 'adequate' | 'moderate' | 'critical'
}

export interface BloodRequestRecord {
  id: string
  reference_no: string
  requester_name: string
  patient_name?: string
  blood_group: string
  component_type: string
  units_needed: number
  hospital_ward?: string
  urgency_level: 'Routine' | 'Urgent' | 'Emergency'
  contact_phone: string
  status: 'received' | 'under_review' | 'fulfilled' | 'rejected' | 'cancelled'
  assigned_staff?: string
  created_at: string
}

export interface BloodDonationRecord {
  id: string
  reference_no: string
  donor_name: string
  phone: string
  email?: string
  blood_group: string
  gender?: string
  age?: number | string
  weight?: string
  locality?: string
  donor_type?: string
  units_donated: number
  donation_date: string
  status: 'tested_quarantined' | 'available' | 'rejected'
}

export interface EnquiryRecord {
  id: string
  reference_no: string
  name: string
  phone: string
  email?: string
  subject?: string
  message: string
  status: 'new' | 'in_progress' | 'waiting' | 'resolved' | 'closed'
  assigned_to?: string
  internal_notes?: Array<{ id: string; author: string; note: string; date: string }>
  created_at: string
}
