import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email().optional().or(z.literal('')),
  department: z.string().optional().or(z.literal('')),
  subject: z.string().optional().or(z.literal('')),
  message: z.string().optional().or(z.literal('')),
})

const inMemoryQueries: Array<Record<string, unknown>> = []

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const validatedData = contactSchema.parse(json)

    const submission = {
      id: `contact-${Date.now()}`,
      name: validatedData.name,
      phone: validatedData.phone,
      email: validatedData.email || null,
      department: validatedData.department || null,
      subject: validatedData.subject || null,
      message: validatedData.message || '',
      created_at: new Date().toISOString(),
    }

    const supabase = createAdminClient()
    if (supabase) {
      await supabase.from('contact_submissions').insert(submission)
    } else {
      inMemoryQueries.unshift(submission)
    }

    return NextResponse.json(
      { success: true, message: 'Message received successfully' },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ submissions: inMemoryQueries })
}
