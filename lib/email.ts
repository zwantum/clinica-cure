import nodemailer from 'nodemailer'

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

// Create transporter if SMTP credentials are provided in env
function getTransporter() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT) || 587
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    })
  }

  return null
}

export async function sendAppointmentNotificationEmail(
  payload: AppointmentEmailPayload
): Promise<{ success: boolean; message: string }> {
  const recipient =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.SMTP_TO_EMAIL ||
    'admin@clinicacure.in'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinicacure.in'
  const adminDashboardUrl = `${siteUrl}/admin/appointments`

  const emailSubject = `🔔 New OPD Appointment [${payload.booking_reference}] - ${payload.patient_name} (${payload.doctor_name || 'General OPD'})`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9fa; color: #172033; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5eaf0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0E746D; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 0; font-size: 13px; color: #c5e8e0; }
    .badge { display: inline-block; background: #FFCC00; color: #172033; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 6px; margin-top: 10px; text-transform: uppercase; }
    .content { padding: 24px; }
    .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #5F6B7A; font-weight: 700; margin-bottom: 12px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid #f0f4f7; font-size: 13px; }
    .info-table td.label { color: #5F6B7A; font-weight: 600; width: 38%; }
    .info-table td.val { color: #172033; font-weight: 700; }
    .action-box { background: #F8FAF9; border: 1px solid #C5E8E0; border-radius: 12px; padding: 18px; text-align: center; margin-top: 20px; }
    .btn { display: inline-block; background: #0E746D; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 10px; margin-top: 8px; }
    .footer { text-align: center; padding: 16px; font-size: 11px; color: #8F9CA9; border-top: 1px solid #f0f4f7; }
  </style>
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
          <td class="val" style="color: #0E746D; font-family: monospace;">${payload.booking_reference}</td>
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
          <td class="label">Assigned Specialist:</td>
          <td class="val">${payload.doctor_name || 'General OPD Attending'}</td>
        </tr>
        <tr>
          <td class="label">Clinical Department:</td>
          <td class="val">${payload.department_name || 'General OPD'}</td>
        </tr>
        <tr>
          <td class="label">Appointment Date:</td>
          <td class="val" style="color: #172033;">${payload.appointment_date}</td>
        </tr>
        <tr>
          <td class="label">Reserved Time Slot:</td>
          <td class="val" style="color: #0E746D;">${payload.appointment_time || '10:00 AM – 1:00 PM'}</td>
        </tr>
        ${
          payload.reason
            ? `<tr>
          <td class="label">Reason / Symptoms:</td>
          <td class="val" style="font-weight: 500; font-style: italic; color: #4A5568;">"${payload.reason}"</td>
        </tr>`
            : ''
        }
        <tr>
          <td class="label">Booking Received:</td>
          <td class="val" style="font-weight: 500; color: #718096; font-size: 12px;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
        </tr>
      </table>

      <div class="action-box">
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #172033; font-weight: 600;">
          Review this appointment in the hospital operations desk:
        </p>
        <a href="${adminDashboardUrl}" class="btn" target="_blank">
          Open Admin Appointments Desk &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Clinica Cure Hospital &bull; Bariatu Road, Near RIMS, Ranchi, Jharkhand 834009 &bull; +91 92633 97076
    </div>
  </div>
</body>
</html>
  `

  const transporter = getTransporter()

  if (transporter) {
    try {
      const fromAddress =
        process.env.SMTP_FROM ||
        process.env.SMTP_USER ||
        '"Clinica Cure Hospital" <notifications@clinicacure.in>'

      await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        subject: emailSubject,
        html: htmlContent,
      })

      console.log(`[Email Service] Notification email sent successfully to ${recipient} for ${payload.booking_reference}`)
      return { success: true, message: `Email dispatched to ${recipient}` }
    } catch (err) {
      console.error('[Email Service] Error sending email via SMTP:', err)
      return { success: false, message: 'SMTP error; notification logged' }
    }
  } else {
    // If SMTP is not yet configured in .env, log cleanly for developer
    console.log(`[Email Service - Simulated] New appointment alert for ${recipient}:`)
    console.log(`Token: ${payload.booking_reference} | Patient: ${payload.patient_name} | Doctor: ${payload.doctor_name} | Date: ${payload.appointment_date} ${payload.appointment_time}`)
    console.log(`[Email Service] To send real emails, define SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and ADMIN_NOTIFICATION_EMAIL in your .env.local`)
    return { success: true, message: 'Notification recorded (SMTP not configured in env)' }
  }
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

export async function sendEnquiryNotificationEmail(
  payload: EnquiryEmailPayload
): Promise<{ success: boolean; message: string }> {
  const recipient =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.SMTP_TO_EMAIL ||
    'admin@clinicacure.in'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://clinicacure.in'
  const adminDashboardUrl = `${siteUrl}/admin/enquiries`

  const emailSubject = `📩 New Patient Enquiry [${payload.reference_no}] - ${payload.name} (${payload.department || 'General Helpdesk'})`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9fa; color: #172033; margin: 0; padding: 20px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5eaf0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #0E746D; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 0; font-size: 13px; color: #c5e8e0; }
    .badge { display: inline-block; background: #FFCC00; color: #172033; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 6px; margin-top: 10px; text-transform: uppercase; }
    .content { padding: 24px; }
    .section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #5F6B7A; font-weight: 700; margin-bottom: 12px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid #f0f4f7; font-size: 13px; }
    .info-table td.label { color: #5F6B7A; font-weight: 600; width: 38%; }
    .info-table td.val { color: #172033; font-weight: 700; }
    .message-box { background: #F8FAF9; border-left: 4px solid #0E746D; padding: 14px 16px; border-radius: 4px 10px 10px 4px; margin-top: 10px; font-size: 13px; color: #2D3748; line-height: 1.6; }
    .action-box { background: #F8FAF9; border: 1px solid #C5E8E0; border-radius: 12px; padding: 18px; text-align: center; margin-top: 20px; }
    .btn { display: inline-block; background: #0E746D; color: #ffffff !important; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 10px; margin-top: 8px; }
    .footer { text-align: center; padding: 16px; font-size: 11px; color: #8F9CA9; border-top: 1px solid #f0f4f7; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Clinica Cure Hospital</h1>
      <p>Patient Enquiries &amp; Public Contact CRM Alert</p>
      <div class="badge">New Inbound Website Query</div>
    </div>
    <div class="content">
      <div class="section-title">Enquiry Details &amp; Sender Information</div>
      <table class="info-table">
        <tr>
          <td class="label">Enquiry Ref No:</td>
          <td class="val" style="color: #0E746D; font-family: monospace;">${payload.reference_no}</td>
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
        ${payload.message.replace(/\n/g, '<br/>')}
      </div>

      <div class="action-box">
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #172033; font-weight: 600;">
          Respond and track status in the Hospital CRM:
        </p>
        <a href="${adminDashboardUrl}" class="btn" target="_blank">
          Open Patient Enquiries CRM &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Clinica Cure Hospital &bull; Bariatu Road, Near RIMS, Ranchi, Jharkhand 834009 &bull; +91 92633 97076
    </div>
  </div>
</body>
</html>
  `

  const transporter = getTransporter()

  if (transporter) {
    try {
      const fromAddress =
        process.env.SMTP_FROM ||
        process.env.SMTP_USER ||
        '"Clinica Cure Hospital" <notifications@clinicacure.in>'

      await transporter.sendMail({
        from: fromAddress,
        to: recipient,
        subject: emailSubject,
        html: htmlContent,
      })

      console.log(`[Email Service] Enquiry notification email sent successfully to ${recipient} for ${payload.reference_no}`)
      return { success: true, message: `Email dispatched to ${recipient}` }
    } catch (err) {
      console.error('[Email Service] Error sending enquiry email via SMTP:', err)
      return { success: false, message: 'SMTP error; notification logged' }
    }
  } else {
    console.log(`[Email Service - Simulated] New enquiry alert for ${recipient}:`)
    console.log(`Ref: ${payload.reference_no} | Name: ${payload.name} | Phone: ${payload.phone} | Subject: ${payload.subject} | Desk: ${payload.department}`)
    console.log(`Message: ${payload.message}`)
    return { success: true, message: 'Enquiry recorded (SMTP not configured in env)' }
  }
}
