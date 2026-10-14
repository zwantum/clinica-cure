import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendAppointmentNotificationEmail } from '@/lib/email'

const appointmentSchema = z.object({
  name: z.string().optional(),
  patient_name: z.string().optional(),
  phone: z.string().optional(),
  patient_phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  patient_email: z.string().email().optional().or(z.literal('')),
  department: z.string().optional().or(z.literal('')),
  department_name: z.string().optional().or(z.literal('')),
  doctor: z.string().optional().or(z.literal('')),
  doctor_name: z.string().optional().or(z.literal('')),
  doctor_slug: z.string().optional().or(z.literal('')),
  date: z.string().optional().or(z.literal('')),
  appointment_date: z.string().optional().or(z.literal('')),
  time: z.string().optional().or(z.literal('')),
  time_slot: z.string().optional().or(z.literal('')),
  appointment_time: z.string().optional().or(z.literal('')),
  reason: z.string().optional().or(z.literal('')),
  problem_description: z.string().optional().or(z.literal('')),
  gender: z.string().optional().or(z.literal('')),
  age: z.number().or(z.string()).optional(),
  booking_reference: z.string().optional(),
})

// In-memory store for dev/preview so appointments persist across routes
const inMemoryAppointments: Array<Record<string, unknown>> = []

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const validatedData = appointmentSchema.parse(json)

    const patientName = (validatedData.name || validatedData.patient_name || '').trim()
    if (!patientName) {
      return NextResponse.json(
        { success: false, error: 'Patient name is required.' },
        { status: 400 }
      )
    }

    const patientPhone = (validatedData.phone || validatedData.patient_phone || '').trim()
    if (!patientPhone) {
      return NextResponse.json(
        { success: false, error: 'Contact phone number is required.' },
        { status: 400 }
      )
    }

    const randomRefNum = Math.floor(1000 + Math.random() * 9000)
    const bookingReference =
      validatedData.booking_reference || `CC-${new Date().getFullYear()}-${randomRefNum}`

    const appointmentRecord = {
      id: `apt-${Date.now()}-${randomRefNum}`,
      booking_reference: bookingReference,
      patient_name: patientName,
      phone: patientPhone,
      email: validatedData.email || validatedData.patient_email || null,
      gender: validatedData.gender || 'Not specified',
      age: validatedData.age ? Number(validatedData.age) : null,
      department_name: validatedData.department || validatedData.department_name || 'General OPD',
      doctor_name: validatedData.doctor || validatedData.doctor_name || 'Attending Consultant',
      doctor_slug: validatedData.doctor_slug || '',
      appointment_date: validatedData.date || validatedData.appointment_date || new Date().toISOString().split('T')[0],
      appointment_time: validatedData.time || validatedData.time_slot || validatedData.appointment_time || '10:00 AM',
      reason: validatedData.reason || validatedData.problem_description || 'General Medical Consultation',
      status: 'pending',
      admin_notes: '',
      created_at: new Date().toISOString(),
    }

    // 1. Try Supabase insert if keys configured
    let savedToSupabase = false
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
              gender: appointmentRecord.gender,
              age: appointmentRecord.age,
              appointment_date: appointmentRecord.appointment_date,
              appointment_time: appointmentRecord.appointment_time,
              reason: appointmentRecord.reason,
              status: 'pending',
              admin_notes: `Ref: ${appointmentRecord.booking_reference} | Doctor: ${appointmentRecord.doctor_name}`,
            })
            .select()
            .single()

          if (!error && data) {
            savedToSupabase = true
            appointmentRecord.id = data.id || appointmentRecord.id
          }
        }
      } catch (err) {
        console.warn('Supabase insert skipped, using fallback store:', err)
      }
    }

    // 2. Always prepend to in-memory store for instantaneous reactive UI
    inMemoryAppointments.unshift(appointmentRecord)

    // 3. Send email notification to Admin
    try {
      await sendAppointmentNotificationEmail({
        booking_reference: appointmentRecord.booking_reference,
        patient_name: appointmentRecord.patient_name,
        phone: appointmentRecord.phone,
        email: appointmentRecord.email,
        department_name: appointmentRecord.department_name,
        doctor_name: appointmentRecord.doctor_name,
        appointment_date: appointmentRecord.appointment_date,
        appointment_time: appointmentRecord.appointment_time,
        reason: appointmentRecord.reason,
        created_at: appointmentRecord.created_at,
      })
    } catch (emailErr) {
      console.error('Failed to trigger admin notification email:', emailErr)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment request received and confirmed successfully',
        data: appointmentRecord,
        savedToSupabase,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('API Error in /api/appointments POST:', error)
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
  const mergedList: Array<Record<string, unknown>> = [...inMemoryAppointments]

  if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const supabase = createAdminClient()
      if (supabase) {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && Array.isArray(data) && data.length > 0) {
          data.forEach((row) => {
            if (!mergedList.some((item) => item.id === row.id)) {
              mergedList.push(row)
            }
          })
        }
      }
    } catch (err) {
      console.warn('Supabase fetch skipped, returning in-memory:', err)
    }
  }

  return NextResponse.json({ success: true, appointments: mergedList })
}

export async function PATCH(request: Request) {
  try {
    const { id, status, notes } = await request.json()
    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Missing appointment ID or status' },
        { status: 400 }
      )
    }

    // Update in memory
    const existing = inMemoryAppointments.find((a) => a.id === id)
    if (existing) {
      existing.status = status
      if (notes) existing.admin_notes = notes
    }

    // Update in Supabase if available
    if (process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const supabase = createAdminClient()
        if (supabase) {
          await supabase
            .from('appointments')
            .update({ status, admin_notes: notes })
            .eq('id', id)
        }
      } catch (err) {
        console.warn('Supabase update status skipped:', err)
      }
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` })
  } catch (err) {
    return NextResponse.json(
      { success: false, message: 'Failed to update appointment status' },
      { status: 500 }
    )
  }
}
