export interface PatientStory {
  id: string
  patient_name: string
  condition: string
  outcome: string
  department: string | null
  description: string | null
  video_url: string | null
  thumbnail: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface GoogleReview {
  id: string
  reviewer_name: string
  rating: number
  review_text: string
  time_ago: string
  avatar_initial: string
  is_approved: boolean
  created_at: string
}

export interface SiteSettings {
  id: string
  key: string
  value: string
  updated_at: string
}

export interface Partner {
  id: string
  name: string
  logo: string | null
  description: string | null
  website: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface Update {
  id: string
  title: string
  content: string
  excerpt: string | null
  image_url: string | null
  is_published: boolean
  published_at: string | null
  created_at: string
}

export interface ContactSubmission {
  id: string
  full_name: string
  phone: string
  email: string
  department: string | null
  message: string
  created_at: string
}
