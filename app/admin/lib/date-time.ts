export const HOSPITAL_TIMEZONE = 'Asia/Kolkata'

/**
 * Returns today's date formatted as YYYY-MM-DD in Asia/Kolkata timezone
 */
export function getTodayDateString(): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: HOSPITAL_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  return formatter.format(new Date())
}

/**
 * Formats a date string (YYYY-MM-DD or ISO) into readable Indian date
 */
export function formatHospitalDate(dateStr: string): string {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr)
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: HOSPITAL_TIMEZONE,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d)
  } catch {
    return dateStr
  }
}

/**
 * Formats a timestamp into human time (e.g. 10:30 AM)
 */
export function formatHospitalTime(dateOrTimeStr: string): string {
  if (!dateOrTimeStr) return '—'
  if (dateOrTimeStr.includes('AM') || dateOrTimeStr.includes('PM')) {
    return dateOrTimeStr
  }
  try {
    const [hh, mm] = dateOrTimeStr.split(':')
    const h = parseInt(hh, 10)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const displayHour = h % 12 || 12
    return `${displayHour}:${mm} ${ampm}`
  } catch {
    return dateOrTimeStr
  }
}
