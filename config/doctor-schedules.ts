// Doctor Availability & Scheduling Configuration
// Can be customized per doctor and later connected directly to Supabase dashboard

export interface DoctorSchedule {
  availableDays: number[] // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  daysLabel: string // e.g., "Mon – Sat" or "Mon, Wed, Fri"
  timingsLabel: string
  slots: {
    morning: string[]
    evening: string[]
  }
}

const DEFAULT_SLOTS = {
  morning: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'],
  evening: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM'],
}

// Doctor specific scheduled days and consultation times
export const DOCTOR_SCHEDULES: Record<string, DoctorSchedule> = {
  'dr-abid-raza': {
    availableDays: [1, 2, 3, 4, 5, 6], // Mon - Sat
    daysLabel: 'Mon – Sat',
    timingsLabel: '10:00 AM – 06:00 PM',
    slots: {
      morning: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM'],
      evening: ['02:00 PM', '02:30 PM', '03:30 PM', '04:30 PM', '05:30 PM'],
    },
  },
  'dr-tarique-jameel-hasan': {
    availableDays: [1, 3, 5, 6], // Mon, Wed, Fri, Sat
    daysLabel: 'Mon, Wed, Fri, Sat',
    timingsLabel: '10:30 AM – 02:00 PM & 04:30 PM – 07:30 PM',
    slots: {
      morning: ['10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM'],
      evening: ['04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM'],
    },
  },
  'dr-manzar-ali': {
    availableDays: [1, 2, 4, 6], // Mon, Tue, Thu, Sat
    daysLabel: 'Mon, Tue, Thu, Sat',
    timingsLabel: '11:00 AM – 03:00 PM & 05:00 PM – 07:00 PM',
    slots: {
      morning: ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:30 PM', '02:30 PM'],
      evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'],
    },
  },
  'dr-smriti-bharti': {
    availableDays: [1, 2, 3, 4, 5, 6], // Mon - Sat
    daysLabel: 'Mon – Sat',
    timingsLabel: '10:00 AM – 02:00 PM & 04:00 PM – 06:30 PM',
    slots: {
      morning: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM'],
      evening: ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'],
    },
  },
  'dr-m-kumar': {
    availableDays: [1, 2, 3, 4, 5], // Mon - Fri
    daysLabel: 'Mon – Fri',
    timingsLabel: '11:00 AM – 03:00 PM',
    slots: {
      morning: ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM'],
      evening: ['02:00 PM', '02:30 PM'],
    },
  },
  'dr-shafique-alam': {
    availableDays: [2, 4, 6], // Tue, Thu, Sat
    daysLabel: 'Tue, Thu, Sat',
    timingsLabel: '10:00 AM – 01:30 PM & 03:30 PM – 06:30 PM',
    slots: {
      morning: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM'],
      evening: ['03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'],
    },
  },
}

// Default schedule fallback for any doctor without custom override (Mon - Sat)
export const DEFAULT_DOCTOR_SCHEDULE: DoctorSchedule = {
  availableDays: [1, 2, 3, 4, 5, 6],
  daysLabel: 'Mon – Sat',
  timingsLabel: '10:00 AM – 01:00 PM & 02:30 PM – 06:30 PM',
  slots: DEFAULT_SLOTS,
}

export function getDoctorSchedule(slugOrName?: string): DoctorSchedule {
  if (!slugOrName) return DEFAULT_DOCTOR_SCHEDULE
  const clean = slugOrName
    .toLowerCase()
    .replace(/^dr\.\s*/i, 'dr-')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')

  if (DOCTOR_SCHEDULES[clean]) {
    return DOCTOR_SCHEDULES[clean]
  }

  // Find by partial key
  for (const [key, sched] of Object.entries(DOCTOR_SCHEDULES)) {
    if (clean.includes(key) || key.includes(clean)) {
      return sched
    }
  }

  return DEFAULT_DOCTOR_SCHEDULE
}

// Check if a doctor is available on a specific date string (YYYY-MM-DD)
export function isDoctorAvailableOnDate(slugOrName: string | undefined, dateStr: string): boolean {
  if (!dateStr) return false
  const [year, month, day] = dateStr.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  const dayOfWeek = d.getDay() // 0 to 6
  const schedule = getDoctorSchedule(slugOrName)
  return schedule.availableDays.includes(dayOfWeek)
}

// Find next valid available date for a doctor starting from today
export function getNextAvailableDate(slugOrName?: string, fromDate = new Date()): string {
  const schedule = getDoctorSchedule(slugOrName)
  const cur = new Date(fromDate)
  for (let i = 0; i < 14; i++) {
    const dayOfWeek = cur.getDay()
    if (schedule.availableDays.includes(dayOfWeek)) {
      const y = cur.getFullYear()
      const m = String(cur.getMonth() + 1).padStart(2, '0')
      const d = String(cur.getDate()).padStart(2, '0')
      return `${y}-${m}-${d}`
    }
    cur.setDate(cur.getDate() + 1)
  }
  return fromDate.toISOString().split('T')[0]
}

// Generate the next 14 calendar days with doctor availability status
export function getUpcomingDaysForDoctor(slugOrName?: string, count = 14) {
  const schedule = getDoctorSchedule(slugOrName)
  const days = []
  const today = new Date()

  for (let i = 0; i < count; i++) {
    const d = new Date()
    d.setDate(today.getDate() + i)
    const dayOfWeek = d.getDay()
    const isAvailable = schedule.availableDays.includes(dayOfWeek)
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const dayNum = String(d.getDate()).padStart(2, '0')
    const dateStr = `${y}-${m}-${dayNum}`

    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' })
    const monthName = d.toLocaleDateString('en-US', { month: 'short' })

    days.push({
      dateStr,
      dayName,
      monthName,
      dayNumber: d.getDate(),
      isAvailable,
      isToday: i === 0,
      isTomorrow: i === 1,
    })
  }

  return days
}
