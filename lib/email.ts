import nodemailer from 'nodemailer'

// ── Types for All Website Forms ──────────────────────────────────────────────

export interface AppointmentEmailPayload {
  booking_reference: string
  patient_name: string
  phone: string
  email?: string | null
  department_name?: string | null
  doctor_name?: string | null
  appointment_date: string
  appointment_time?: string | null
  reason?: string | null
  created_at?: string
}

export interface EnquiryEmailPayload {
  reference_no: string
  name: string
  phone: string
  email?: string | null
  department?: string | null
  subject?: string | null
  message: string
  created_at?: string
}

export interface BloodRequestEmailPayload {
  reference_no: string
  patient_name?: string | null
  requester_name?: string | null
  contact_phone: string
  blood_group: string
  units_needed: number | string
  hospital_ward?: string | null
  urgency_level: 'Emergency' | 'Urgent' | 'Routine' | string
  component_type?: string | null
  notes?: string | null
  created_at?: string
}

export interface BloodDonorEmailPayload {
  reference_no: string
  donor_name: string
  phone: string
  email?: string | null
  blood_group: string
  gender?: string | null
  age?: string | number | null
  weight?: string | number | null
  locality?: string | null
  donor_type?: string | null
  donation_date?: string | null
  created_at?: string
}

// ── Configuration & Transporter Helpers ──────────────────────────────────────

export function getAdminRecipients(): string[] {
  const raw =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.SMTP_TO_EMAIL ||
    'admin@clinicacure.in'

  const emails = raw
    .split(/[,;]/)
    .map((e) => e.trim())
    .filter((e) => e.length > 0 && e.includes('@'))

  return emails.length > 0 ? emails : ['admin@clinicacure.in']
}

export function getFromAddress(): string {
  if (process.env.SMTP_FROM) return process.env.SMTP_FROM.trim()
  if (process.env.SMTP_FROM_EMAIL) return process.env.SMTP_FROM_EMAIL.trim()
  if (process.env.SMTP_USER) {
    return `"Clinica Cure Hospital" <${process.env.SMTP_USER.trim()}>`
  }
  return '"Clinica Cure Hospital" <notifications@clinicacure.in>'
}

export function getTransporter() {
  const host = process.env.SMTP_HOST?.trim()
  const port = Number(process.env.SMTP_PORT) || 587
  const user = process.env.SMTP_USER?.trim()
  // Sanitize password (strips spaces from Gmail 16-character app passwords like "abcd efgh ijkl mnop")
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '').trim() : ''

  if (host && user && pass) {
    const isGmail = host.toLowerCase().includes('gmail')
    if (isGmail) {
      return nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      })
    }

    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: false,
      },
    })
  }

  return null
}

async function dispatchEmail(options: {
  subject: string
  html: string
  tag: string
  logSummary: string
}): Promise<{ success: boolean; message: string }> {
  const recipients = getAdminRecipients()
  const transporter = getTransporter()
  const recipientStr = recipients.join(', ')

  if (transporter) {
    try {
      const fromAddress = getFromAddress()
      await transporter.sendMail({
        from: fromAddress,
        to: recipientStr,
        subject: options.subject,
        html: options.html,
      })

      console.log(`[Email Service] ${options.tag} email successfully sent to ${recipientStr}`)
      return { success: true, message: `Email dispatched to ${recipientStr}` }
    } catch (err) {
      console.error(`[Email Service] Error sending ${options.tag} via SMTP:`, err)
      return { success: false, message: 'SMTP dispatch error; logged to system' }
    }
  } else {
    // If SMTP credentials aren't present in .env.local, log formatted output
    console.log(`[Email Service - Simulated] ${options.tag} alert for ${recipientStr}:`)
    console.log(options.logSummary)
    console.log(`[Email Service] Define SMTP_USER and SMTP_PASS in .env.local to send live emails via SMTP.`)
    return { success: true, message: 'Alert recorded (SMTP credentials pending in .env.local)' }
  }
}

// ── Email Shared CSS ─────────────────────────────────────────────────────────

const emailCss = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9fa; color: #172033; margin: 0; padding: 20px; }
  .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5eaf0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
  .header { background: #0E746D; color: #ffffff; padding: 24px; text-align: left; }
  .header.alert-red { background: #DC2626; }
  .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; letter-spacing: -0.01em; }
  .header p { margin: 0; font-size: 13px; color: #e0f2fe; opacity: 0.9; }
  .badge { display: inline-block; background: #FFCC00; color: #172033; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 6px; margin-top: 10px; text-transform: uppercase; letter-spacing: 0.05em; }
  .badge-red { background: #FFFFFF; color: #DC2626; }
  .content { padding: 24px; }
  .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #5F6B7A; font-weight: 700; margin-bottom: 12px; }
  .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
  .info-table td { padding: 10px 12px; border-bottom: 1px solid #f0f4f7; font-size: 13px; vertical-align: top; }
  .info-table td.label { color: #5F6B7A; font-weight: 600; width: 38%; }
  .info-table td.val { color: #172033; font-weight: 700; }
  .message-box { background: #F8FAF9; border-left: 4px solid #0E746D; padding: 14px 16px; border-radius: 4px 10px 10px 4px; margin-top: 10px; font-size: 13px; color: #2D3748; line-height: 1.6; }
  .action-box { background: #F8FAF9; border: 1px solid #C5E8E0; border-radius: 12px; padding: 18px; text-align: center; margin-top: 20px; }
  .btn { display: inline-block; background: #0E746D; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 10px; margin-top: 8px; }
  .btn-red { background: #DC2626 !important; }
  .footer { text-align: center; padding: 16px; font-size: 11px; color: #8F9CA9; border-top: 1px solid #f0f4f7; line-height: 1.5; }
`

// ── 1. OPD Appointment Email ─────────────────────────────────────────────────

export async function sendAppointmentNotificationEmail(
  payload: AppointmentEmailPayload
): Promise<{ success: boolean; message: string }> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinicacure.in'
  const adminDashboardUrl = `${siteUrl}/admin/appointments`

  const emailSubject = `🔔 [NEW APPOINTMENT] Token ${payload.booking_reference} - ${payload.patient_name} (${payload.doctor_name || 'General OPD'})`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${emailCss}</style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Clinica Cure Hospital</h1>
      <p>OPD Consultation Real-Time Alert</p>
      <div class="badge">New Online Appointment Booking</div>
    </div>
    <div class="content">
      <div class="section-title">Consultation Schedule &amp; Patient Record</div>
      <table class="info-table">
        <tr>
          <td class="label">Booking Token:</td>
          <td class="val" style="color: #0E746D; font-family: monospace; font-size: 14px;">${payload.booking_reference}</td>
        </tr>
        <tr>
          <td class="label">Patient Name:</td>
          <td class="val">${payload.patient_name}</td>
        </tr>
        <tr>
          <td class="label">Contact Phone:</td>
          <td class="val"><a href="tel:${payload.phone}" style="color: #0E746D; text-decoration: none;">${payload.phone}</a></td>
        </tr>
        ${
          payload.email
            ? `<tr>
          <td class="label">Patient Email:</td>
          <td class="val"><a href="mailto:${payload.email}" style="color: #0E746D; text-decoration: none;">${payload.email}</a></td>
        </tr>`
            : ''
        }
        <tr>
          <td class="label">Consulting Doctor:</td>
          <td class="val">${payload.doctor_name || 'General OPD Specialist'}</td>
        </tr>
        <tr>
          <td class="label">Department:</td>
          <td class="val">${payload.department_name || 'General Medicine'}</td>
        </tr>
        <tr>
          <td class="label">Preferred Date:</td>
          <td class="val">${payload.appointment_date}</td>
        </tr>
        ${
          payload.appointment_time
            ? `<tr>
          <td class="label">Preferred Time Slot:</td>
          <td class="val">${payload.appointment_time}</td>
        </tr>`
            : ''
        }
        ${
          payload.reason
            ? `<tr>
          <td class="label">Reason / Symptoms:</td>
          <td class="val" style="font-weight: normal; color: #4A5568;">${payload.reason}</td>
        </tr>`
            : ''
        }
      </table>

      <div class="action-box">
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #172033; font-weight: 600;">
          Manage patient queue in Hospital Admin:
        </p>
        <a href="${adminDashboardUrl}" class="btn" target="_blank">
          Open Appointments Dashboard &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Clinica Cure Hospital &bull; Bariatu Road, Near RIMS, Ranchi, Jharkhand 834009 &bull; +91 92633 97076 &bull; care@clinicacure.in
    </div>
  </div>
</body>
</html>
  `

  return dispatchEmail({
    subject: emailSubject,
    html: htmlContent,
    tag: 'OPD Appointment',
    logSummary: `Token: ${payload.booking_reference} | Patient: ${payload.patient_name} | Doctor: ${payload.doctor_name} | Date: ${payload.appointment_date} ${payload.appointment_time || ''}`,
  })
}

// ── 2. Contact & Patient Enquiry Email ───────────────────────────────────────

export async function sendEnquiryNotificationEmail(
  payload: EnquiryEmailPayload
): Promise<{ success: boolean; message: string }> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinicacure.in'
  const adminDashboardUrl = `${siteUrl}/admin/enquiries`

  const emailSubject = `📩 [PATIENT ENQUIRY] Ref ${payload.reference_no} - ${payload.name} (${payload.department || 'General Helpdesk'})`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${emailCss}</style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Clinica Cure Hospital</h1>
      <p>Patient Enquiries &amp; Public Contact Alert</p>
      <div class="badge">New Inbound Website Query</div>
    </div>
    <div class="content">
      <div class="section-title">Enquiry Details &amp; Sender Information</div>
      <table class="info-table">
        <tr>
          <td class="label">Enquiry Ref No:</td>
          <td class="val" style="color: #0E746D; font-family: monospace; font-size: 14px;">${payload.reference_no}</td>
        </tr>
        <tr>
          <td class="label">Sender / Patient:</td>
          <td class="val">${payload.name}</td>
        </tr>
        <tr>
          <td class="label">Contact Phone:</td>
          <td class="val"><a href="tel:${payload.phone}" style="color: #0E746D; text-decoration: none;">${payload.phone}</a></td>
        </tr>
        ${
          payload.email
            ? `<tr>
          <td class="label">Email Address:</td>
          <td class="val"><a href="mailto:${payload.email}" style="color: #0E746D; text-decoration: none;">${payload.email}</a></td>
        </tr>`
            : ''
        }
        <tr>
          <td class="label">Assigned Desk / Dept:</td>
          <td class="val">${payload.department || 'General Helpdesk'}</td>
        </tr>
        ${
          payload.subject
            ? `<tr>
          <td class="label">Query Subject:</td>
          <td class="val">${payload.subject}</td>
        </tr>`
            : ''
        }
      </table>

      <div class="section-title" style="margin-top: 20px;">Patient Message</div>
      <div class="message-box">
        ${(payload.message || 'No message text provided.').replace(/\n/g, '<br/>')}
      </div>

      <div class="action-box">
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #172033; font-weight: 600;">
          Respond and track status in Hospital CRM:
        </p>
        <a href="${adminDashboardUrl}" class="btn" target="_blank">
          Open Patient Enquiries CRM &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Clinica Cure Hospital &bull; Bariatu Road, Near RIMS, Ranchi, Jharkhand 834009 &bull; +91 92633 97076 &bull; care@clinicacure.in
    </div>
  </div>
</body>
</html>
  `

  return dispatchEmail({
    subject: emailSubject,
    html: htmlContent,
    tag: 'Patient Enquiry',
    logSummary: `Ref: ${payload.reference_no} | Name: ${payload.name} | Phone: ${payload.phone} | Subject: ${payload.subject || 'General'} | Desk: ${payload.department || 'Helpdesk'}`,
  })
}

// ── 3. Blood Requisition Request Email ───────────────────────────────────────

export async function sendBloodRequestNotificationEmail(
  payload: BloodRequestEmailPayload
): Promise<{ success: boolean; message: string }> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinicacure.in'
  const adminDashboardUrl = `${siteUrl}/admin/blood-bank`

  const isEmergency = (payload.urgency_level || '').toLowerCase().includes('emergency')
  const emailSubject = `🚨 [BLOOD REQUEST: ${payload.urgency_level.toUpperCase()}] Ref ${payload.reference_no} - Group ${payload.blood_group} (${payload.units_needed} Unit${Number(payload.units_needed) > 1 ? 's' : ''}) for ${payload.patient_name || 'Patient'}`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${emailCss}</style>
</head>
<body>
  <div class="card">
    <div class="header ${isEmergency ? 'alert-red' : ''}">
      <h1>Clinica Cure Blood Bank</h1>
      <p>Urgent Blood Requisition Alert</p>
      <div class="badge ${isEmergency ? 'badge-red' : ''}">${payload.urgency_level.toUpperCase()} REQUISITION</div>
    </div>
    <div class="content">
      <div class="section-title">Patient &amp; Blood Component Details</div>
      <table class="info-table">
        <tr>
          <td class="label">Requisition Ref:</td>
          <td class="val" style="color: ${isEmergency ? '#DC2626' : '#0E746D'}; font-family: monospace; font-size: 14px;">${payload.reference_no}</td>
        </tr>
        <tr>
          <td class="label">Patient Name:</td>
          <td class="val">${payload.patient_name || 'Emergency Attendant Requisition'}</td>
        </tr>
        <tr>
          <td class="label">Required Blood Group:</td>
          <td class="val" style="font-size: 16px; color: #DC2626; font-weight: 900;">${payload.blood_group}</td>
        </tr>
        <tr>
          <td class="label">Units Required:</td>
          <td class="val">${payload.units_needed} Unit(s)</td>
        </tr>
        <tr>
          <td class="label">Urgency Level:</td>
          <td class="val" style="color: ${isEmergency ? '#DC2626' : '#D97706'}; font-weight: 800;">${payload.urgency_level}</td>
        </tr>
        <tr>
          <td class="label">Contact Phone:</td>
          <td class="val"><a href="tel:${payload.contact_phone}" style="color: #0E746D; text-decoration: none; font-size: 14px;">${payload.contact_phone}</a></td>
        </tr>
        <tr>
          <td class="label">Hospital / Ward:</td>
          <td class="val">${payload.hospital_ward || 'Clinica Cure Emergency / Ward'}</td>
        </tr>
        ${
          payload.component_type
            ? `<tr>
          <td class="label">Component Type:</td>
          <td class="val">${payload.component_type}</td>
        </tr>`
            : ''
        }
        ${
          payload.requester_name
            ? `<tr>
          <td class="label">Requester / Attendant:</td>
          <td class="val">${payload.requester_name}</td>
        </tr>`
            : ''
        }
        ${
          payload.notes
            ? `<tr>
          <td class="label">Clinical Notes:</td>
          <td class="val" style="font-weight: normal; color: #4A5568;">${payload.notes}</td>
        </tr>`
            : ''
        }
      </table>

      <div class="action-box">
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #172033; font-weight: 600;">
          Process requisition &amp; cross-match in Blood Bank Portal:
        </p>
        <a href="${adminDashboardUrl}" class="btn ${isEmergency ? 'btn-red' : ''}" target="_blank">
          Open Blood Bank Management &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Clinica Cure Hospital Blood Bank &bull; Bariatu Road, Near RIMS, Ranchi, Jharkhand 834009 &bull; 24x7 Helpline: +91 92633 97076
    </div>
  </div>
</body>
</html>
  `

  return dispatchEmail({
    subject: emailSubject,
    html: htmlContent,
    tag: 'Blood Requisition',
    logSummary: `Ref: ${payload.reference_no} | Patient: ${payload.patient_name} | Group: ${payload.blood_group} | Units: ${payload.units_needed} | Phone: ${payload.contact_phone} | Urgency: ${payload.urgency_level}`,
  })
}

// ── 4. Voluntary Blood Donor Registration Email ──────────────────────────────

export async function sendBloodDonorNotificationEmail(
  payload: BloodDonorEmailPayload
): Promise<{ success: boolean; message: string }> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinicacure.in'
  const adminDashboardUrl = `${siteUrl}/admin/blood-bank/donations`

  const emailSubject = `🩸 [NEW BLOOD DONOR REGISTRATION] ${payload.blood_group} - ${payload.donor_name} (${payload.phone})`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${emailCss}</style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Clinica Cure Blood Bank</h1>
      <p>Voluntary Donor Registry Real-Time Alert</p>
      <div class="badge">New Donor Enrolled</div>
    </div>
    <div class="content">
      <div class="section-title">Donor Information &amp; Clinical Profile</div>
      <table class="info-table">
        <tr>
          <td class="label">Donor Registry ID:</td>
          <td class="val" style="color: #0E746D; font-family: monospace; font-size: 14px;">${payload.reference_no}</td>
        </tr>
        <tr>
          <td class="label">Donor Full Name:</td>
          <td class="val">${payload.donor_name}</td>
        </tr>
        <tr>
          <td class="label">Blood Group:</td>
          <td class="val" style="font-size: 16px; color: #DC2626; font-weight: 900;">${payload.blood_group}</td>
        </tr>
        <tr>
          <td class="label">Contact Phone:</td>
          <td class="val"><a href="tel:${payload.phone}" style="color: #0E746D; text-decoration: none;">${payload.phone}</a></td>
        </tr>
        ${
          payload.email
            ? `<tr>
          <td class="label">Email Address:</td>
          <td class="val"><a href="mailto:${payload.email}" style="color: #0E746D; text-decoration: none;">${payload.email}</a></td>
        </tr>`
            : ''
        }
        ${
          payload.gender
            ? `<tr>
          <td class="label">Gender:</td>
          <td class="val">${payload.gender}</td>
        </tr>`
            : ''
        }
        ${
          payload.age
            ? `<tr>
          <td class="label">Age:</td>
          <td class="val">${payload.age} years</td>
        </tr>`
            : ''
        }
        ${
          payload.weight
            ? `<tr>
          <td class="label">Weight:</td>
          <td class="val">${payload.weight} kg</td>
        </tr>`
            : ''
        }
        ${
          payload.locality
            ? `<tr>
          <td class="label">Locality / City:</td>
          <td class="val">${payload.locality}</td>
        </tr>`
            : ''
        }
        <tr>
          <td class="label">Donor Category:</td>
          <td class="val">${payload.donor_type || 'Voluntary Donor Registry'}</td>
        </tr>
      </table>

      <div class="action-box">
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #172033; font-weight: 600;">
          View full donor roster in Blood Bank Registry:
        </p>
        <a href="${adminDashboardUrl}" class="btn" target="_blank">
          Open Blood Donor Registry &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Clinica Cure Hospital Blood Bank &bull; Bariatu Road, Near RIMS, Ranchi, Jharkhand 834009 &bull; +91 92633 97076 &bull; care@clinicacure.in
    </div>
  </div>
</body>
</html>
  `

  return dispatchEmail({
    subject: emailSubject,
    html: htmlContent,
    tag: 'Blood Donor Registration',
    logSummary: `ID: ${payload.reference_no} | Donor: ${payload.donor_name} | Group: ${payload.blood_group} | Phone: ${payload.phone} | Locality: ${payload.locality || 'Ranchi'}`,
  })
}
