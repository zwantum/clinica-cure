import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneForTel(phone: string): string {
  return phone.replace(/\s+/g, '')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generateInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours % 12 || 12
  return `${displayHour}:${String(minutes).padStart(2, '0')} ${period}`
}

export function getDayName(dayOfWeek: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[dayOfWeek] ?? ''
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  durationMinutes: number,
  breakStart?: string | null,
  breakEnd?: string | null,
): string[] {
  const slots: string[] = []

  const [startH, startM] = startTime.split(':').map(Number)
  const [endH, endM] = endTime.split(':').map(Number)

  let current = startH * 60 + startM
  const end = endH * 60 + endM

  const breakStartMin = breakStart
    ? (() => {
        const [h, m] = breakStart.split(':').map(Number)
        return h * 60 + m
      })()
    : null
  const breakEndMin = breakEnd
    ? (() => {
        const [h, m] = breakEnd.split(':').map(Number)
        return h * 60 + m
      })()
    : null

  while (current + durationMinutes <= end) {
    // Skip break time
    if (
      breakStartMin !== null &&
      breakEndMin !== null &&
      current >= breakStartMin &&
      current < breakEndMin
    ) {
      current = breakEndMin
      continue
    }

    const h = Math.floor(current / 60)
    const m = current % 60
    slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    current += durationMinutes
  }

  return slots
}
