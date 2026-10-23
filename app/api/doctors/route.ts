import { NextResponse } from 'next/server'
import { SEED_DOCTORS } from '@/config/constants'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const department = searchParams.get('department')?.toLowerCase()

  let doctors: any[] = [...SEED_DOCTORS]

  // Try to load doctors from Supabase if configured
  try {
    const supabase = createAdminClient()
    const { data: dbDoctors, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (!error && Array.isArray(dbDoctors) && dbDoctors.length > 0) {
      const slugMap = new Map<string, any>()
      doctors.forEach((d) => slugMap.set(d.slug, d))
      dbDoctors.forEach((d) => {
        const existing = slugMap.get(d.slug)
        slugMap.set(d.slug, {
          ...existing,
          ...d,
          departments: d.departments || existing?.departments || [],
        })
      })
      doctors = Array.from(slugMap.values())
    }
  } catch {
    // Supabase optional fallback
  }

  if (department) {
    doctors = doctors.filter((doc) => {
      const depts = (doc.departments || []).map((d: string) => d?.toLowerCase())
      const deptSlug = doc.department_slug?.toLowerCase()
      const deptName = (doc.department_name || doc.department || '').toLowerCase()
      return (
        depts.includes(department) ||
        deptSlug === department ||
        deptName === department
      )
    })
  }

  return NextResponse.json({ success: true, data: doctors })
}
