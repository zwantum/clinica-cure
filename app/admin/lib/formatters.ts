/**
 * Formats amount into Indian Rupees (INR)
 */
export function formatINR(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined) return '₹0'
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(num)
}

/**
 * Formats 10-digit or 12-digit Indian phone numbers
 */
export function formatPhone(phone: string): string {
  if (!phone) return '—'
  const clean = phone.replace(/[^\d+]/g, '')
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`
  }
  return phone
}

/**
 * Truncates long text gracefully
 */
export function truncateText(text: string, maxLen = 60): string {
  if (!text) return ''
  return text.length > maxLen ? `${text.slice(0, maxLen)}...` : text
}
