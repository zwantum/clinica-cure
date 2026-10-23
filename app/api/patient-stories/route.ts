import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { extractYouTubeId, getYouTubeThumbnail } from '@/lib/youtube'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

function getAdminClient() {
  return createClient(supabaseUrl, serviceRoleKey)
}

export const dynamic = 'force-dynamic'

export const FALLBACK_STORIES = [
  {
    id: 'story-01',
    patient_name: 'Dr. Tarique Jameel Hasan',
    condition: 'Brain & Spine Solutions',
    outcome: 'Advanced Neurosurgery',
    department: 'Neurosurgery',
    description: 'Expert care for complex brain & spine disorders by Senior Neurosurgeon Dr. Tarique Jameel Hasan.',
    video_url: 'https://youtu.be/NhdTWMe1sbk',
    thumbnail: 'https://img.youtube.com/vi/NhdTWMe1sbk/hqdefault.jpg',
    sort_order: 1,
    is_active: true,
  },
  {
    id: 'story-02',
    patient_name: 'Dr. Syed Altamash',
    condition: 'Advanced Modular OT Complex',
    outcome: 'Zero Infection Environment',
    department: 'Advanced Surgery',
    description: 'State-of-the-art modular operating theaters designed for precision surgical safety.',
    video_url: 'https://youtu.be/l1g9AWc7OUk',
    thumbnail: 'https://img.youtube.com/vi/l1g9AWc7OUk/hqdefault.jpg',
    sort_order: 2,
    is_active: true,
  },
  {
    id: 'story-03',
    patient_name: 'Clinica Cure Care Team',
    condition: '4 Years of Healthcare Trust',
    outcome: '10,000+ Recovered Patients',
    department: 'Hospital Highlights',
    description: 'Celebrating 4 years of affordable, multi-specialty, and compassionate healing in Ranchi.',
    video_url: 'https://youtu.be/Sj2wIDZ4ecA',
    thumbnail: 'https://img.youtube.com/vi/Sj2wIDZ4ecA/hqdefault.jpg',
    sort_order: 3,
    is_active: true,
  },
  {
    id: 'story-04',
    patient_name: 'Dr. Aftab Alam',
    condition: 'Clinical Excellence & Vision',
    outcome: 'Patient-First Healthcare',
    department: 'Critical Care & Medicine',
    description: 'Clinical journey, patient-first ethos, and modern healthcare advancements at Clinica Cure.',
    video_url: 'https://youtu.be/cRH_947GqeU',
    thumbnail: 'https://img.youtube.com/vi/cRH_947GqeU/hqdefault.jpg',
    sort_order: 4,
    is_active: true,
  },
  {
    id: 'story-05',
    patient_name: 'Emergency & Critical Care Team',
    condition: '24x7 Emergency & ICU',
    outcome: 'Rapid Response Trauma Care',
    department: 'Emergency & Trauma',
    description: 'Round-the-clock emergency, trauma resuscitation, and advanced surgical intensive care.',
    video_url: 'https://youtu.be/V4Ew8qV7Mvk',
    thumbnail: 'https://img.youtube.com/vi/V4Ew8qV7Mvk/hqdefault.jpg',
    sort_order: 5,
    is_active: true,
  },
  {
    id: 'story-06',
    patient_name: 'Dr. Aftab Alam & Patient Care Team',
    condition: 'Comprehensive Consultation & Care',
    outcome: 'Compassionate Recovery',
    department: 'General & Preventive Care',
    description: 'Dedicated patient consultations and personalized treatment protocols at Bariatu, Ranchi.',
    video_url: 'https://youtu.be/JggjqS2Z40c',
    thumbnail: 'https://img.youtube.com/vi/JggjqS2Z40c/hqdefault.jpg',
    sort_order: 6,
    is_active: true,
  },
]

export async function GET() {
  try {
    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from('patient_stories')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error || !data || data.length === 0) {
      return NextResponse.json({ success: true, stories: FALLBACK_STORIES })
    }

    return NextResponse.json({ success: true, stories: data })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch stories'
    return NextResponse.json({ success: false, stories: FALLBACK_STORIES, error: message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      patient_name,
      condition,
      outcome,
      department,
      description,
      video_url,
      thumbnail,
      sort_order = 0,
      is_active = true,
    } = body

    if (!video_url || !video_url.trim()) {
      return NextResponse.json({ success: false, error: 'YouTube video URL is required' }, { status: 400 })
    }

    const ytId = extractYouTubeId(video_url)
    const finalThumbnail =
      thumbnail && thumbnail.trim()
        ? thumbnail.trim()
        : ytId
        ? getYouTubeThumbnail(ytId)
        : '/images/patient-stories-hero-clean.webp'

    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from('patient_stories')
      .insert({
        patient_name: (patient_name || 'Patient Story').trim(),
        condition: (condition || 'Recovery Journey').trim(),
        outcome: (outcome || 'Recovered').trim(),
        department: (department || 'General Care').trim(),
        description: description?.trim() || null,
        video_url: video_url.trim(),
        thumbnail: finalThumbnail,
        sort_order: Number(sort_order) || 0,
        is_active: is_active !== false,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, story: data })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create patient story'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Story ID is required' }, { status: 400 })
    }

    if (updates.video_url) {
      const ytId = extractYouTubeId(updates.video_url)
      if (ytId && !updates.thumbnail) {
        updates.thumbnail = getYouTubeThumbnail(ytId)
      }
    }

    const supabase = getAdminClient()
    const { data, error } = await supabase
      .from('patient_stories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, story: data })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update patient story'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Story ID is required' }, { status: 400 })
    }

    const supabase = getAdminClient()
    const { error } = await supabase.from('patient_stories').delete().eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true, message: 'Story deleted successfully' })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete story'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
