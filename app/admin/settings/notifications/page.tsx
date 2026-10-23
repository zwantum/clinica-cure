'use client'

import React, { useState, useEffect } from 'react'
import { Bell, CheckCircle2, ShieldCheck, Mail, Send, AlertCircle, RefreshCw } from 'lucide-react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageHeader } from '../../components/PageHeader'
import { LoadingState } from '../../components/LoadingState'
import { fetchNotifications, toggleNotification, NotificationChannel } from '../../services/team'

export default function NotificationsSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<NotificationChannel[]>([])
  const [smtpStatus, setSmtpStatus] = useState<{
    status?: string
    isConfigured?: boolean
    recipients?: string[]
    fromAddress?: string
    smtpHost?: string
  } | null>(null)
  const [testingEmail, setTestingEmail] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  const loadData = async () => {
    setLoading(true)
    const [data] = await Promise.all([
      fetchNotifications(),
      fetch('/api/admin/test-email')
        .then((r) => r.json())
        .then((res) => setSmtpStatus(res))
        .catch(() => null),
    ])
    setNotifications(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleToggle = async (idx: number) => {
    await toggleNotification(idx)
    loadData()
  }

  const handleSendTestEmail = async () => {
    setTestingEmail(true)
    setTestResult(null)
    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Admin Notification Verification' }),
      })
      const json = await res.json()
      if (json.success) {
        setTestResult({ success: true, message: json.message })
      } else {
        setTestResult({ success: false, message: json.error || 'Failed to dispatch email.' })
      }
    } catch (err: unknown) {
      setTestResult({
        success: false,
        message: err instanceof Error ? err.message : 'Network error testing SMTP.',
      })
    } finally {
      setTestingEmail(false)
    }
  }

  if (loading) {
    return <LoadingState message="Loading notification channels..." />
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Settings', href: '/admin/settings' },
          { label: 'Notifications' },
        ]}
      />

      <PageHeader
        title="Automated Operational Alerts & Notifications"
        description="Configure automated email and SMS notification recipients for OPD bookings, inquiries, and blood bank requisitions."
      />

      {/* SMTP Gateway & All Forms Email Reception Status Card */}
      <div className="bg-white border border-[#E5EAF0] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              smtpStatus?.isConfigured ? 'bg-[#DCFCE7] text-[#16A34A]' : 'bg-[#FEF3C7] text-[#D97706]'
            }`}>
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#172033]">
                Website Forms Email Reception Gateway
              </h3>
              <p className="text-xs text-[#5F6B7A]">
                Receiving Email(s):{' '}
                <span className="font-mono font-bold text-[#0E746D]">
                  {smtpStatus?.recipients?.join(', ') || 'admin@clinicacure.in'}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={testingEmail}
              onClick={handleSendTestEmail}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0E746D] hover:bg-[#0b5c57] text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {testingEmail ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Test Email</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Feedback banner */}
        {testResult && (
          <div
            className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              testResult.success
                ? 'bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]'
                : 'bg-[#FEE2E2] text-[#B91C1C] border border-[#FECACA]'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}

        {/* List of Connected Forms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-[#F8FAF9] border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span>OPD Appointments</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Homepage &amp; /book-appointment</p>
          </div>
          <div className="p-3 rounded-lg bg-[#F8FAF9] border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span>Patient Enquiries</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Homepage &amp; /contact Helpdesk</p>
          </div>
          <div className="p-3 rounded-lg bg-[#F8FAF9] border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span>Blood Requisitions</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Emergency Requisition Modal</p>
          </div>
          <div className="p-3 rounded-lg bg-[#F8FAF9] border border-slate-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span>Donor Registrations</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Voluntary Blood Registry</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E5EAF0] flex items-center justify-between">
          <h2 className="font-bold text-sm text-[#172033]">Configured Notification Triggers</h2>
          <span className="text-xs text-[#5F6B7A]">SMTP / SMS Gateway Active</span>
        </div>

        <div className="divide-y divide-[#E5EAF0]">
          {notifications.map((n, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-[#F7F8FA] transition-colors">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#172033] text-[#FFCC00]">
                    {n.channel}
                  </span>
                  <span className="font-bold text-xs text-[#172033]">{n.eventType}</span>
                </div>
                <p className="text-[11px] text-[#5F6B7A] mt-1 font-mono">
                  Recipients: {n.recipients.join(', ')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleToggle(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  n.isEnabled
                    ? 'bg-[#DCFCE7] text-[#16A34A] hover:bg-[#BBF7D0]'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {n.isEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
