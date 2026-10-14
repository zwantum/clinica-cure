import { PermissionMatrix } from '../types'

export interface TeamMember {
  id: string
  name: string
  email: string
  password?: string
  roleSlug: string
  roleName: string
  isActive: boolean
  lastActive: string
  customPermissions?: Partial<PermissionMatrix>
}

export interface BookingConfig {
  minAdvanceHours: number
  maxAdvanceDays: number
  defaultSlotMinutes: number
  bookingCutoffHours: number
  emergencyHotline: string
  allowWalkIn: boolean
}

export interface NotificationChannel {
  channel: string
  eventType: string
  isEnabled: boolean
  recipients: string[]
}

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: 'usr-1',
    name: 'Dr. Administrative Head',
    email: 'admin@clinicacure.in',
    password: 'clinicacure2026',
    roleSlug: 'super_admin',
    roleName: 'Super Administrator',
    isActive: true,
    lastActive: 'Online now',
  },
  {
    id: 'usr-2',
    name: 'Priya Sharma (Bariatu Desk)',
    email: 'reception@clinicacure.in',
    password: 'clinicacure2026',
    roleSlug: 'appointment_staff',
    roleName: 'Appointment Staff',
    isActive: true,
    lastActive: '12m ago',
  },
  {
    id: 'usr-3',
    name: 'Dr. Roster Coordinator',
    email: 'roster@clinicacure.in',
    password: 'clinicacure2026',
    roleSlug: 'doctor_manager',
    roleName: 'Doctor & Availability Manager',
    isActive: true,
    lastActive: '2h ago',
  },
  {
    id: 'usr-4',
    name: 'Blood Bank Officer',
    email: 'bloodbank@clinicacure.in',
    password: 'clinicacure2026',
    roleSlug: 'blood_bank_staff',
    roleName: 'Blood Bank Officer',
    isActive: true,
    lastActive: '1d ago',
  },
]

const INITIAL_CONFIG: BookingConfig = {
  minAdvanceHours: 2,
  maxAdvanceDays: 30,
  defaultSlotMinutes: 20,
  bookingCutoffHours: 1,
  emergencyHotline: '+91 651 228 0000',
  allowWalkIn: true,
}

const INITIAL_NOTIFICATIONS: NotificationChannel[] = [
  { channel: 'Email', eventType: 'New OPD Booking Token', isEnabled: true, recipients: ['admin@clinicacure.in', 'reception@clinicacure.in'] },
  { channel: 'SMS', eventType: 'Patient Token Confirmation', isEnabled: true, recipients: ['+91 94311 00000'] },
  { channel: 'Email', eventType: 'Critical Blood Stock Alert (<3 units)', isEnabled: true, recipients: ['bloodbank@clinicacure.in'] },
  { channel: 'Email', eventType: 'New Website Patient Enquiry', isEnabled: true, recipients: ['support@clinicacure.in'] },
]

let membersStore: TeamMember[] = [...INITIAL_MEMBERS]
let configStore = { ...INITIAL_CONFIG }
let notificationsStore = [...INITIAL_NOTIFICATIONS]

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem('clinicacure_admin_team_members')
    if (cached) {
      try {
        membersStore = JSON.parse(cached)
      } catch {}
    }
  }
  return membersStore
}

export async function createTeamMember(
  data: Omit<TeamMember, 'id' | 'lastActive'>
): Promise<TeamMember> {
  const newMember: TeamMember = {
    ...data,
    id: `usr-${Date.now()}`,
    lastActive: 'Just registered',
  }
  membersStore = [...membersStore, newMember]
  if (typeof window !== 'undefined') {
    localStorage.setItem('clinicacure_admin_team_members', JSON.stringify(membersStore))
  }
  return newMember
}

export async function updateTeamMember(
  id: string,
  updates: Partial<TeamMember>
): Promise<TeamMember | null> {
  let updatedMember: TeamMember | null = null
  membersStore = membersStore.map((m) => {
    if (m.id === id) {
      updatedMember = { ...m, ...updates }
      return updatedMember
    }
    return m
  })
  if (typeof window !== 'undefined') {
    localStorage.setItem('clinicacure_admin_team_members', JSON.stringify(membersStore))
  }
  return updatedMember
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  membersStore = membersStore.filter((m) => m.id !== id)
  if (typeof window !== 'undefined') {
    localStorage.setItem('clinicacure_admin_team_members', JSON.stringify(membersStore))
  }
  return true
}

export async function toggleMemberActive(id: string): Promise<boolean> {
  membersStore = membersStore.map((m) =>
    m.id === id ? { ...m, isActive: !m.isActive } : m
  )
  if (typeof window !== 'undefined') {
    localStorage.setItem('clinicacure_admin_team_members', JSON.stringify(membersStore))
  }
  return true
}

export async function fetchBookingConfig(): Promise<BookingConfig> {
  return configStore
}

export async function updateBookingConfig(newConfig: BookingConfig): Promise<boolean> {
  configStore = { ...newConfig }
  return true
}

export async function fetchNotifications(): Promise<NotificationChannel[]> {
  return notificationsStore
}

export async function toggleNotification(index: number): Promise<boolean> {
  if (notificationsStore[index]) {
    notificationsStore[index].isEnabled = !notificationsStore[index].isEnabled
  }
  return true
}
