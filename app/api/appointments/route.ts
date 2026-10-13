import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'

const appointmentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email().optional().or(z.literal('')),
  department: z.string().optional().or(z.literal('')),
  doctor: z.string().optional().or(z.literal('')),
  date: z.string().optional().or(z.literal('')),
  time: z.string().optional().or(z.literal('')),
  reason: z.string().optional().or(z.literal('')),
})

// In-memory store for dev/preview when Supabase credentials are placeholder
const inMemoryAppointments: Array<Record<string, unknown>> = []

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const validatedData = appointmentSchema.parse(json)

    const appointmentRecord = {
      id: `apt-${Date.now()}`,
      patient_name: validatedData.name,
      phone: validatedData.phone,
      email: validatedData.email || null,
      appointment_date: validatedData.date || new Date().toISOString().split('T')[0],
      appointment_time: validatedData.time || null,
      reason: validatedData.reason || null,
      department_name: validatedData.department || null,
      doctor_name: validatedData.doctor || null,
      status: 'pending',
      created_at: new Date().toISOString(),
    }

    // Try Supabase insert if keys configured
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const supabase = createAdminClient()
        if (supabase) {
          const { data, error } = await supabase
            .from('appointments')
            .insert({
              patient_name: appointmentRecord.patient_name,
              phone: appointmentRecord.phone,
              email: appointmentRecord.email,
              appointment_date: appointmentRecord.appointment_date,
              appointment_time: appointmentRecord.appointment_time,
              reason: appointmentRecord.reason,
              status: 'pending',
            })
            .select()
            .single()

          if (!error && data) {
            return NextResponse.json({ success: true, data }, { status: 201 })
          }
        }
      } catch (err) {
        console.warn('Supabase insert skipped, using fallback store:', err)
      }
    }

    // Fallback store
    inMemoryAppointments.unshift(appointmentRecord)

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment request received successfully',
        data: appointmentRecord,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('API Error in /api/appointments:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = createAdminClient()
      if (supabase) {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data) {
          return NextResponse.json({ appointments: data })
        }
      }
    } catch (err) {
      console.warn('Supabase fetch skipped, using fallback store:', err)
    }
  }

  return NextResponse.json({ appointments: inMemoryAppointments })
}
