import type { Doctor } from './doctor'

export interface Department {
  id: string
  name: string
  slug: string
  short_description: string | null
  description: string | null
  image_url: string | null
  icon: string | null
  services: string[]
  conditions: string[]
  facilities: string[]
  is_active: boolean
  sort_order: number
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface DepartmentWithDoctors extends Department {
  doctors: Doctor[]
}
