'use client'

import React from 'react'
import Link from 'next/link'
import {
  Users,
  ShieldCheck,
  Bell,
  ArrowRight,
  Hospital,
} from 'lucide-react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PageHeader } from '../components/PageHeader'

export default function SettingsHubPage() {
  const settingsCards = [
    {
      title: 'Team Members',
      description: 'Manage staff credentials, activate or deactivate hospital personnel accounts.',
      icon: Users,
      href: '/admin/settings/team',
      badge: '4 Active Staff',
    },
    {
      title: 'Roles & Permissions (RBAC)',
      description: 'Granular view, create, edit, and delete capability matrix across all 6 hospital modules.',
      icon: ShieldCheck,
      href: '/admin/settings/roles',
      badge: '5 System Roles',
    },
    {
      title: 'Notification Alerts',
      description: 'Email and SMS notification triggers for appointments, blood shortages, and enquiries.',
      icon: Bell,
      href: '/admin/settings/notifications',
      badge: 'Active Channels',
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Hospital Settings' }]} />

      <PageHeader
        title="Hospital Administration Settings"
        description="Configure role-based access control (RBAC), team accounts, OPD queue rules, and notification endpoints."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsCards.map((card, idx) => (
          <Link
            key={idx}
            href={card.href}
            className="p-5 bg-white border border-[#E5EAF0] hover:border-[#FFCC00] rounded-xl shadow-xs transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#FFCC00]/20 text-[#172033] flex items-center justify-center font-bold">
                  <card.icon className="w-5 h-5 text-[#806600]" />
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F7F8FA] text-[#5F6B7A] border border-[#E5EAF0]">
                  {card.badge}
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#172033] group-hover:text-[#806600] transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-[#5F6B7A] mt-1 line-clamp-2">
                {card.description}
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-[#172033] mt-4 pt-3 border-t border-[#E5EAF0]">
              <span>Configure Settings</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
