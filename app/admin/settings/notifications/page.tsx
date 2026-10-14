'use client'

import React, { useState, useEffect } from 'react'
import { Bell, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageHeader } from '../../components/PageHeader'
import { LoadingState } from '../../components/LoadingState'
import { fetchNotifications, toggleNotification, NotificationChannel } from '../../services/team'

export default function NotificationsSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<NotificationChannel[]>([])

  const loadData = async () => {
    setLoading(true)
    const data = await fetchNotifications()
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
        title="Automated Operational Alerts &amp; Notifications"
        description="Configure automated email and SMS notification recipients for OPD bookings and critical stock drops."
      />

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
