import { GoogleReviewRecord } from '../types'
import { safeSetItem, safeGetItem } from '../lib/safeStorage'

export const AVATAR_PALETTES = [
  { name: 'Indigo', class: 'bg-[#4338CA]' },
  { name: 'Forest Green', class: 'bg-[#15803D]' },
  { name: 'Slate Gray', class: 'bg-[#334155]' },
  { name: 'Warm Amber', class: 'bg-[#B45309]' },
  { name: 'Emerald', class: 'bg-[#065F46]' },
  { name: 'Deep Amber', class: 'bg-[#D97706]' },
  { name: 'Green Dark', class: 'bg-[#166534]' },
  { name: 'Pink Rose', class: 'bg-[#DB2777]' },
  { name: 'Crimson Rose', class: 'bg-[#BE123C]' },
  { name: 'Stone Brown', class: 'bg-[#57534E]' },
  { name: 'Purple Violet', class: 'bg-[#7C3AED]' },
  { name: 'Sky Cerulean', class: 'bg-[#0284C7]' },
  { name: 'Deep Teal', class: 'bg-[#0F766E]' },
  { name: 'Nut Brown', class: 'bg-[#92400E]' },
  { name: 'Bright Orange', class: 'bg-[#EA580C]' },
  { name: 'Royal Blue', class: 'bg-[#2563EB]' },
  { name: 'Teal Pine', class: 'bg-[#115E59]' },
  { name: 'Rust Red', class: 'bg-[#C2410C]' },
  { name: 'Dark Violet', class: 'bg-[#6D28D9]' },
  { name: 'Cyan Sea', class: 'bg-[#0D9488]' },
]

export const INITIAL_BASELINE_REVIEWS: GoogleReviewRecord[] = [
  {
    id: 'rev-01',
    name: 'Md Niyaj',
    time: '1 hour ago',
    initials: 'Md',
    avatarBg: 'bg-[#4338CA]',
    rating: 5,
    text: 'Best care best hospital,',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-02',
    name: 'Nasrin Prween',
    time: '2 days ago',
    initials: 'N',
    avatarBg: 'bg-[#15803D]',
    rating: 5,
    text: 'Dr aftab sir bahut acha doctor hai, acha ilaj hua, staff acha hai, patient ka diet acha provide kiya jata h, physio available hai...',
    hasReadMore: true,
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-03',
    name: 'Yasmin Parween',
    time: '8 days ago',
    initials: 'Y',
    avatarBg: 'bg-[#334155]',
    rating: 5,
    text: 'Best orthopedic surgeon dr.satyendra , best hospital,fecelity Good',
    hasReadMore: true,
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-04',
    name: 'naushad ali',
    time: '11 days ago',
    initials: 'N',
    avatarBg: 'bg-[#B45309]',
    rating: 5,
    text: 'Best hospital,dr aftab and dr altamash both are good consultant, good care of patients, staffs behaviour also very friendly',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-05',
    name: 'Sanouwer Shah...',
    time: '1 day ago',
    initials: 'S',
    avatarBg: 'bg-[#065F46]',
    rating: 5,
    text: 'This place provided great comprehensive care to the patient, staff was competent and efficient.',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-06',
    name: 'Hujaifa Ansari',
    time: '3 days ago',
    initials: 'H',
    avatarBg: 'bg-[#D97706]',
    rating: 5,
    text: 'Best for emergency patients',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-07',
    name: 'Mahendara Ram',
    time: '6 days ago',
    initials: 'M',
    avatarBg: 'bg-[#166534]',
    rating: 5,
    text: 'Very good treatment, best doctor available,best staff , highly recommend',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-08',
    name: 'Rabul Alam',
    time: '10 days ago',
    initials: 'R',
    avatarBg: 'bg-[#DB2777]',
    rating: 5,
    text: 'Best hospital, dr.aftab sir best doctor, best treatment,',
    hasReadMore: true,
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-09',
    name: 'Anayat Husen',
    time: '1 day ago',
    initials: 'A',
    avatarBg: 'bg-[#BE123C]',
    rating: 5,
    text: 'Good care and treatment,dr aftab best doctor in ranchi',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-10',
    name: 'Mumtaz Ahmad',
    time: '3 days ago',
    initials: 'M',
    avatarBg: 'bg-[#57534E]',
    rating: 5,
    text: 'Best hospital best doctor available highly recomended',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-11',
    name: 'Adib Khan',
    time: '8 days ago',
    initials: 'A',
    avatarBg: 'bg-[#7C3AED]',
    rating: 5,
    text: 'Best hospital',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-12',
    name: 'Naushad Alam',
    time: '10 days ago',
    initials: 'N',
    avatarBg: 'bg-[#0284C7]',
    rating: 5,
    text: 'Doctors facility and all hospitals staff are very good and best treatment from here.',
    hasReadMore: true,
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-13',
    name: 'ATISID PROPER...',
    time: '12 days ago',
    initials: 'A',
    avatarBg: 'bg-[#0F766E]',
    rating: 5,
    text: 'Best hospital and friendly staff',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-14',
    name: 'Mohsin Akhtar',
    time: '1 day ago',
    initials: 'M',
    avatarBg: 'bg-[#92400E]',
    rating: 5,
    text: 'very good',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-15',
    name: 'Nisar Ansari',
    time: '2 days ago',
    initials: 'N',
    avatarBg: 'bg-[#EA580C]',
    rating: 5,
    text: 'Best treatment given by dr. Aftab Alam and dr altamash sir..',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-16',
    name: 'Shubham Saurav',
    time: '5 days ago',
    initials: 'S',
    avatarBg: 'bg-[#2563EB]',
    rating: 5,
    text: "It's good .. economical ..dr Aftam alam is very good",
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-17',
    name: 'Talib Ansari',
    time: '10 days ago',
    initials: 'T',
    avatarBg: 'bg-[#115E59]',
    rating: 5,
    text: 'Very good',
    hasReadMore: true,
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-18',
    name: 'Sudhir Munda',
    time: '13 days ago',
    initials: 'S',
    avatarBg: 'bg-[#C2410C]',
    rating: 5,
    text: 'Hospital best hai,Mera marij amrita ka ilaj doctor Aftab Alam ne kiya...',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-19',
    name: 'Zuber Khan',
    time: '2 days ago',
    initials: 'Z',
    avatarBg: 'bg-[#D97706]',
    rating: 5,
    text: 'Treatment was very good, dr Aftab sir and dr altamash both are good consultant, very satisfied with the treatment',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-20',
    name: 'Saraswati Kumari',
    time: '3 days ago',
    initials: 'S',
    avatarBg: 'bg-[#6D28D9]',
    rating: 5,
    text: 'Dr aftab alam ka treatment acha hai best hospital',
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-21',
    name: 'Ansulika Ansu',
    time: '9 days ago',
    initials: 'A',
    avatarBg: 'bg-[#0F766E]',
    rating: 5,
    text: 'Doctors are good and helpful I had 6-7 days in ICU the process was smooth . Only suggestion I would give to have extra...',
    hasReadMore: true,
    verified: true,
    source: 'google',
  },
  {
    id: 'rev-22',
    name: 'Suraj kumar Si...',
    time: '11 days ago',
    initials: 'S',
    avatarBg: 'bg-[#0D9488]',
    rating: 5,
    text: 'My patient is treated Under Dr Syed Altamash and Dr Aftab, very good recovery',
    verified: true,
    source: 'google',
  },
]

export function computeInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'CC'
  if (parts.length === 1) return parts[0].slice(0, 2)
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export function pickAvatarClass(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const idx = Math.abs(hash) % AVATAR_PALETTES.length
  return AVATAR_PALETTES[idx].class
}

const STORAGE_KEY = 'clinicacure_google_reviews'

function broadcastReviewsUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('clinicacure_reviews_updated'))
  }
}

export async function fetchGoogleReviews(): Promise<GoogleReviewRecord[]> {
  try {
    const res = await fetch('/api/reviews', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data?.reviews)) {
        safeSetItem(STORAGE_KEY, JSON.stringify(data.reviews))
        return data.reviews
      }
    }
  } catch (err) {
    console.warn('Could not fetch reviews from /api/reviews, trying localStorage:', err)
  }

  // Fallback to localStorage if API unreachable
  const cached = safeGetItem(STORAGE_KEY)
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    } catch {}
  }

  return INITIAL_BASELINE_REVIEWS
}

export async function createGoogleReview(
  payload: Omit<GoogleReviewRecord, 'id'> & { id?: string }
): Promise<GoogleReviewRecord> {
  const finalPayload: GoogleReviewRecord = {
    id: payload.id || `rev-${Date.now()}`,
    name: payload.name.trim(),
    time: payload.time?.trim() || 'Just now',
    initials: payload.initials?.trim() || computeInitials(payload.name),
    avatarBg: payload.avatarBg || pickAvatarClass(payload.name),
    rating: Number(payload.rating) || 5,
    text: payload.text.trim(),
    verified: payload.verified !== undefined ? payload.verified : true,
    hasReadMore: payload.text.trim().length > 110,
    source: payload.source || 'manual',
    created_at: new Date().toISOString(),
  }

  try {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalPayload),
    })

    if (res.ok) {
      const data = await res.json()
      if (data?.reviews) {
        safeSetItem(STORAGE_KEY, JSON.stringify(data.reviews))
      }
      broadcastReviewsUpdate()
      return data.review || finalPayload
    }
  } catch (err) {
    console.warn('POST /api/reviews failed, saving to localStorage directly:', err)
  }

  // Local fallback
  const current = await fetchGoogleReviews()
  const updated = [finalPayload, ...current.filter((r) => r.id !== finalPayload.id)]
  safeSetItem(STORAGE_KEY, JSON.stringify(updated))

  broadcastReviewsUpdate()
  return finalPayload
}

export async function updateGoogleReview(
  id: string,
  updates: Partial<GoogleReviewRecord>
): Promise<GoogleReviewRecord | null> {
  try {
    const res = await fetch('/api/reviews', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    })

    if (res.ok) {
      const data = await res.json()
      if (data?.reviews) {
        safeSetItem(STORAGE_KEY, JSON.stringify(data.reviews))
      }
      broadcastReviewsUpdate()
      return data.review
    }
  } catch (err) {
    console.warn('PATCH /api/reviews failed, applying to localStorage:', err)
  }

  const current = await fetchGoogleReviews()
  const index = current.findIndex((r) => r.id === id)
  if (index !== -1) {
    current[index] = { ...current[index], ...updates, id }
    safeSetItem(STORAGE_KEY, JSON.stringify(current))
    broadcastReviewsUpdate()
    return current[index]
  }

  return null
}

export async function deleteGoogleReview(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      const data = await res.json()
      if (data?.reviews) {
        safeSetItem(STORAGE_KEY, JSON.stringify(data.reviews))
      }
      broadcastReviewsUpdate()
      return true
    }
  } catch (err) {
    console.warn('DELETE /api/reviews failed, removing from localStorage:', err)
  }

  const current = await fetchGoogleReviews()
  const updated = current.filter((r) => r.id !== id)
  safeSetItem(STORAGE_KEY, JSON.stringify(updated))
  broadcastReviewsUpdate()
  return true
}
