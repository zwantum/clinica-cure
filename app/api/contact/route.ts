import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendEnquiryNotificationEmail } from '@/lib/email'
import { EnquiryRecord } from '@/app/admin/types'

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email().optional().or(z.literal('')),
  department: z.string().optional().or(z.literal('')),
  subject: z.string().optional().or(z.literal('')),
  message: z.string().optional().or(z.literal('')),
})

const INITIAL_ENQUIRIES: EnquiryRecord[] = [
  {
    id: 'enq-01',
    reference_no: 'ENQ-2026-081',
    name: 'Suresh Kumar Gupta',
    phone: '+91 94311 88220',
    email: 'suresh.gupta@rediffmail.com',
    subject: 'Insurance TPA Empanelment Query',
    message: 'Wanted to inquire whether Star Health cashless Mediclaim is accepted for laparoscopic cholecystectomy.',
    status: 'new',
    assigned_to: 'Billing & TPA Desk',
    internal_notes: [
      { id: 'n1', author: 'Priya (Front Desk)', note: 'Forwarded to TPA desk officer Rahul.', date: 'Today, 10:15 AM' },
    ],
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'enq-02',
    reference_no: 'ENQ-2026-082',
    name: 'Meena Devi',
    phone: '+91 98350 44112',
    email: 'meenadevi@gmail.com',
    subject: 'CT Scan & Ultrasound Timings',
    message: 'Need urgent appointment for whole abdomen USG and Doppler test this Wednesday.',
    status: 'in_progress',
    assigned_to: 'Radiology Desk',
    internal_notes: [
      { id: 'n2', author: 'Dr. Coordinator', note: 'Slot kept tentative for Wednesday 9:30 AM.', date: 'Yesterday' },
    ],
    created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
  {
    id: 'enq-03',
    reference_no: 'ENQ-2026-083',
    name: 'Vikram Singh',
    phone: '+91 91234 99001',
    email: 'vikram.singh@gmail.com',
    subject: 'Physiotherapy Rehabilitation Package',
    message: 'Post-ACL reconstruction physiotherapy charges for 15 days session.',
    status: 'resolved',
    assigned_to: 'Rehab Dept',
    internal_notes: [
      { id: 'n3', author: 'Front Desk', note: 'Contacted patient via phone and shared tariff card.', date: '2 days ago' },
    ],
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
]

// Server in-memory store so enquiries persist during the server lifetime
let inMemoryEnquiries: EnquiryRecord[] = [...INITIAL_ENQUIRIES]
let refCounter = 84

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const validatedData = contactSchema.parse(json)

    const nextRef = `ENQ-2026-${String(refCounter++).padStart(3, '0')}`
    const departmentName = validatedData.department?.trim() || ''
    const assignedDesk = departmentName
      ? (departmentName.toLowerCase().includes('desk') || departmentName.toLowerCase().includes('dept')
          ? departmentName
          : `${departmentName} Desk`)
      : 'General Helpdesk'

    const querySubject =
      validatedData.subject?.trim() ||
      (departmentName ? `Inquiry regarding ${departmentName}` : 'General Patient Inquiry')

    const newEnquiry: EnquiryRecord = {
      id: `enq-${Date.now()}`,
      reference_no: nextRef,
      name: validatedData.name.trim(),
      phone: validatedData.phone.trim(),
      email: validatedData.email?.trim() || '',
      subject: querySubject,
      message: (validatedData.message || '').trim(),
      status: 'new',
      assigned_to: assignedDesk,
      internal_notes: [
        {
          id: `note-${Date.now()}`,
          author: 'Website Contact Gateway',
          note: `Inquiry submitted via public Contact Us form. Routed to ${assignedDesk}.`,
          date: 'Just now',
        },
      ],
      created_at: new Date().toISOString(),
    }

    inMemoryEnquiries.unshift(newEnquiry)

    // Optional Supabase persistence if table exists
    try {
      const supabase = createAdminClient()
      if (supabase) {
        await supabase.from('contact_submissions').insert({
          id: newEnquiry.id,
          name: newEnquiry.name,
          phone: newEnquiry.phone,
          email: newEnquiry.email || null,
          department: departmentName || null,
          subject: newEnquiry.subject || null,
          message: newEnquiry.message,
          created_at: newEnquiry.created_at,
        })
      }
    } catch {
      // ignore table absence
    }

    // Send admin notification email asynchronously
    sendEnquiryNotificationEmail({
      reference_no: newEnquiry.reference_no,
      name: newEnquiry.name,
      phone: newEnquiry.phone,
      email: newEnquiry.email,
      department: assignedDesk,
      subject: newEnquiry.subject,
      message: newEnquiry.message,
      created_at: newEnquiry.created_at,
    }).catch((emailErr) => {
      console.warn('[Contact Route] Failed to send enquiry notification email:', emailErr)
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Message received successfully',
        data: newEnquiry,
        reference_no: newEnquiry.reference_no,
      },
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
  return NextResponse.json({
    success: true,
    enquiries: inMemoryEnquiries,
    submissions: inMemoryEnquiries,
  })
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status, note, author } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Enquiry ID is required' }, { status: 400 })
    }

    const index = inMemoryEnquiries.findIndex((e) => e.id === id || e.reference_no === id)
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Enquiry not found' }, { status: 404 })
    }

    if (status) {
      inMemoryEnquiries[index].status = status
    }

    if (note) {
      const existingNotes = inMemoryEnquiries[index].internal_notes || []
      existingNotes.unshift({
        id: `note-${Date.now()}`,
        author: author || 'Admin Staff',
        note: note.trim(),
        date: 'Just now',
      })
      inMemoryEnquiries[index].internal_notes = existingNotes
    }

    return NextResponse.json({
      success: true,
      enquiry: inMemoryEnquiries[index],
      enquiries: inMemoryEnquiries,
    })
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Failed to update enquiry' }, { status: 500 })
  }
}
