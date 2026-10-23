import { NextResponse } from 'next/server'
import { getAdminRecipients, getFromAddress, getTransporter } from '@/lib/email'

export async function GET() {
  const recipients = getAdminRecipients()
  const fromAddress = getFromAddress()
  const host = process.env.SMTP_HOST || 'Not configured'
  const port = process.env.SMTP_PORT || '587'
  const user = process.env.SMTP_USER ? `${process.env.SMTP_USER.slice(0, 3)}***` : 'Not configured'
  const isConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)

  return NextResponse.json({
    status: isConfigured ? 'SMTP Configured' : 'SMTP Credentials Pending',
    isConfigured,
    recipients,
    fromAddress,
    smtpHost: host,
    smtpPort: port,
    smtpUserMasked: user,
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const recipients = getAdminRecipients()
    const transporter = getTransporter()

    if (!transporter) {
      return NextResponse.json(
        {
          success: false,
          error:
            'SMTP credentials are not configured in .env.local. Please define SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and ADMIN_NOTIFICATION_EMAIL.',
          recipients,
        },
        { status: 400 }
      )
    }

    const testType = body.type || 'System Diagnostic Test'
    const fromAddress = getFromAddress()
    const targetEmail = body.to || recipients.join(', ')

    await transporter.sendMail({
      from: fromAddress,
      to: targetEmail,
      subject: `✅ [TEST EMAIL] Clinica Cure Hospital Email Delivery Verified`,
      html: `
        <div style="font-family: sans-serif; max-width: 550px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <div style="background: #0E746D; color: #ffffff; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 18px;">Clinica Cure Hospital - Test Verification</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">Email gateway operational diagnostic</p>
          </div>
          <p style="font-size: 14px; color: #1e293b;">
            This is an automated test verifying that admin notification emails from all Clinica Cure Hospital website forms (OPD Appointments, Patient Inquiries, Blood Requisitions, and Blood Donor Registrations) are delivering successfully.
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Recipient:</td>
              <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${targetEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Diagnostic Type:</td>
              <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${testType}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Timestamp:</td>
              <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 24px;">
            Clinica Cure Hospital &bull; Bariatu Road, Ranchi &bull; +91 92633 97076
          </p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: `Test email successfully sent to ${targetEmail}`,
      recipients: targetEmail,
    })
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Failed to send test email'
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 })
  }
}
