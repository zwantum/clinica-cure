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
  shift1Label?: string
  shift2Label?: string
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

// Parse time string (e.g. "10:00 AM", "10 AM", "1 PM", "1:00 PM", "10:00am") to total minutes from midnight
function parseTimeToMinutes(tStr: string): number | null {
  const clean = tStr.trim().replace(/\./g, ':')
  const m = clean.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?$/i)
  if (!m) return null
  let hours = parseInt(m[1], 10)
  const minutes = m[2] ? parseInt(m[2], 10) : 0
  const ampm = m[3]?.toUpperCase()
  if (ampm === 'PM' && hours < 12) hours += 12
  if (ampm === 'AM' && hours === 12) hours = 0
  return hours * 60 + minutes
}

function formatMinutesToTime(totalMin: number): string {
  let hours = Math.floor(totalMin / 60)
  const minutes = totalMin % 60
  const ampm = hours >= 12 ? 'PM' : 'AM'
  if (hours > 12) hours -= 12
  if (hours === 0) hours = 12
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`
}

export function generateSlotsBetween(startStr: string, endStr: string): string[] {
  const startMin = parseTimeToMinutes(startStr)
  const endMin = parseTimeToMinutes(endStr)
  if (startMin === null || endMin === null || startMin > endMin) return []
  const slots: string[] = []
  // Inclusive of endMin (e.g. 10:00 AM to 1:00 PM includes 01:00 PM; 4:00 PM to 6:00 PM includes 06:00 PM)
  for (let min = startMin; min <= endMin; min += 30) {
    slots.push(formatMinutesToTime(min))
  }
  return slots
}

export function parseDaysString(dayStr: string): number[] {
  const clean = dayStr.toLowerCase().trim()
  const days: Set<number> = new Set()

  // Full range: monday - saturday / mon - sat
  if (clean.includes('mon') && clean.includes('sat') && (clean.includes('-') || clean.includes('–') || clean.includes('to'))) {
    return [1, 2, 3, 4, 5, 6]
  }
  // Range: monday - friday / mon - fri
  if (clean.includes('mon') && clean.includes('fri') && (clean.includes('-') || clean.includes('–') || clean.includes('to'))) {
    return [1, 2, 3, 4, 5]
  }
  // Range: monday - thursday
  if (clean.includes('mon') && clean.includes('thu') && (clean.includes('-') || clean.includes('–') || clean.includes('to'))) {
    return [1, 2, 3, 4]
  }
  // Range: tuesday - saturday
  if (clean.includes('tue') && clean.includes('sat') && (clean.includes('-') || clean.includes('–') || clean.includes('to'))) {
    return [2, 3, 4, 5, 6]
  }

  // Individual days
  if (clean.includes('sun')) days.add(0)
  if (clean.includes('mon')) days.add(1)
  if (clean.includes('tue')) days.add(2)
  if (clean.includes('wed')) days.add(3)
  if (clean.includes('thu')) days.add(4)
  if (clean.includes('fri')) days.add(5)
  if (clean.includes('sat')) days.add(6)

  return Array.from(days).sort((a, b) => a - b)
}

export function parseSessionsToSchedule(sessions?: Array<{ day: string; timings: string; status?: string }>): DoctorSchedule | null {
  if (!sessions || sessions.length === 0) return null

  const availableDaysSet = new Set<number>()
  const validSessions = sessions.filter((s) => s.status !== 'Unavailable' && s.status !== 'On Leave')

  if (validSessions.length === 0) {
    return {
      availableDays: [],
      daysLabel: 'Unavailable / On Leave',
      timingsLabel: 'Not Available',
      slots: { morning: [], evening: [] },
    }
  }

  const daysLabels: string[] = []
  const timingsLabels: string[] = []

  validSessions.forEach((sess) => {
    const dList = parseDaysString(sess.day)
    dList.forEach((d) => availableDaysSet.add(d))
    if (!daysLabels.includes(sess.day)) daysLabels.push(sess.day)
    if (!timingsLabels.includes(sess.timings)) timingsLabels.push(sess.timings)
  })

  // Slots generation
  const morningSlots: string[] = []
  const eveningSlots: string[] = []
  let shift1Label = ''
  let shift2Label = ''

  validSessions.forEach((sess) => {
    // Handle multiple shifts separated by '&' (e.g. "10:00 AM – 01:00 PM & 04:00 PM – 07:00 PM")
    const shiftStrings = sess.timings.split('&').map((s) => s.trim()).filter(Boolean)
    shiftStrings.forEach((shift, sIdx) => {
      const raw = shift.replace(/–|—/g, '-').replace(/\bto\b/i, '-').trim()
      const parts = raw.split('-').map((p) => p.trim())
      if (parts.length === 2) {
        const startMin = parseTimeToMinutes(parts[0])
        const generated = generateSlotsBetween(parts[0], parts[1])
        // If first shift and starts before 2:00 PM (840 min), categorize as morning
        const isMorning = sIdx === 0 && (startMin === null || startMin < 840)

        if (isMorning) {
          if (!shift1Label) shift1Label = shift
          generated.forEach((slot) => {
            if (!morningSlots.includes(slot)) morningSlots.push(slot)
          })
        } else {
          if (!shift2Label) shift2Label = shift
          generated.forEach((slot) => {
            if (!eveningSlots.includes(slot)) eveningSlots.push(slot)
          })
        }
      }
    })
  })

  return {
    availableDays: Array.from(availableDaysSet).sort((a, b) => a - b),
    daysLabel: daysLabels.join(', '),
    timingsLabel: timingsLabels.join(' & '),
    slots: {
      morning: morningSlots,
      evening: eveningSlots,
    },
    shift1Label,
    shift2Label,
  }
}

export function getDoctorSchedule(slugOrName?: string, customSessions?: Array<{ day: string; timings: string; status?: string }>): DoctorSchedule {
  if (customSessions && customSessions.length > 0) {
    const fromCustom = parseSessionsToSchedule(customSessions)
    if (fromCustom) return fromCustom
  }

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
