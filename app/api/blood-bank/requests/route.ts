import { NextResponse } from 'next/server'
import { BloodRequestRecord } from '@/app/admin/types'
import { sendBloodRequestNotificationEmail } from '@/lib/email'

const INITIAL_REQUESTS: BloodRequestRecord[] = [
  {
    id: 'req-01',
    reference_no: 'BR-2026-104',
    requester_name: 'Dr. Aftab Alam (ICU-2)',
    patient_name: 'Anil Kumar (Bed 14)',
    blood_group: 'O-',
    component_type: 'Whole Blood',
    units_needed: 2,
    hospital_ward: 'ICU / Emergency Trauma',
    urgency_level: 'Emergency',
    contact_phone: '+91 94311 00221',
    status: 'under_review',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'req-02',
    reference_no: 'BR-2026-105',
    requester_name: 'Dr. Vivek Goswami',
    patient_name: 'Baby of Kavita',
    blood_group: 'B+',
    component_type: 'Whole Blood',
    units_needed: 1,
    hospital_ward: 'Modular OT 1',
    urgency_level: 'Urgent',
    contact_phone: '+91 98351 44552',
    status: 'received',
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
]

const inMemoryRequests: BloodRequestRecord[] = [...INITIAL_REQUESTS]

export async function GET() {
  return NextResponse.json({
    success: true,
    requests: inMemoryRequests,
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      patient_name,
      requester_name,
      contact_phone,
      blood_group,
      component_type,
      units_needed,
      hospital_ward,
      urgency_level,
      notes,
    } = body

    if (!patient_name || !contact_phone || !blood_group) {
      return NextResponse.json(
        { success: false, error: 'Patient name, contact phone, and blood group are required.' },
        { status: 400 }
      )
    }

    const refNo = `BR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    const newReq: BloodRequestRecord = {
      id: `req-${Date.now()}`,
      reference_no: refNo,
      requester_name: requester_name || 'Patient Attendant / Public Requisition',
      patient_name: patient_name.trim(),
      blood_group: blood_group.trim().toUpperCase(),
      component_type: component_type || 'Whole Blood',
      units_needed: Number(units_needed) > 0 ? Number(units_needed) : 1,
      hospital_ward: hospital_ward || 'Clinica Cure Emergency / OPD Desk',
      urgency_level: urgency_level || 'Urgent',
      contact_phone: contact_phone.trim(),
      status: 'under_review',
      created_at: new Date().toISOString(),
    }

    // Prepend newest request first
    inMemoryRequests.unshift(newReq)

    // Send email notification to Admin & Blood Bank officers
    sendBloodRequestNotificationEmail({
      reference_no: newReq.reference_no,
      patient_name: newReq.patient_name,
      requester_name: newReq.requester_name,
      contact_phone: newReq.contact_phone,
      blood_group: newReq.blood_group,
      units_needed: newReq.units_needed,
      hospital_ward: newReq.hospital_ward,
      urgency_level: newReq.urgency_level,
      component_type: newReq.component_type,
      notes: notes || null,
      created_at: newReq.created_at,
    }).catch((emailErr) => {
      console.warn('[Blood Bank API] Failed to dispatch admin email:', emailErr)
    })

    return NextResponse.json({
      success: true,
      message: 'Blood requisition submitted successfully and alerted to on-duty blood bank officer.',
      data: newReq,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Request ID and new status are required' }, { status: 400 })
    }

    const index = inMemoryRequests.findIndex((r) => r.id === id || r.reference_no === id)
    if (index === -1) {
      return NextResponse.json({ success: false, error: 'Request not found' }, { status: 404 })
    }

    inMemoryRequests[index] = {
      ...inMemoryRequests[index],
      status,
    }

    return NextResponse.json({
      success: true,
      data: inMemoryRequests[index],
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid request'
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
