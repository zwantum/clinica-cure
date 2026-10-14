'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Droplet,
  Mail,
  Settings,
  ChevronDown,
  UserPlus,
  ShieldCheck,
  Bell,
  Clock,
  HeartHandshake,
  LogOut,
  Hospital,
} from 'lucide-react'
import { hasPermission } from '../lib/permissions'
import { StaffUser } from '../types'

interface AdminSidebarProps {
  user: StaffUser | null
  isOpenMobile: boolean
  onCloseMobile: () => void
  onLogout: () => void
}

export function AdminSidebar({
  user,
  isOpenMobile,
  onCloseMobile,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname()
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({
    doctors: pathname.startsWith('/admin/doctors'),
    bloodBank: pathname.startsWith('/admin/blood-bank'),
    settings: pathname.startsWith('/admin/settings'),
  })

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const role = user?.role || 'super_admin'

  // Navigation Items with RBAC checks
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      href: '/admin/overview',
      allowed: hasPermission(role, 'overview', 'view', user?.permissions),
    },
    {
      id: 'appointments',
      label: 'Appointments',
      icon: CalendarDays,
      href: '/admin/appointments',
      allowed: hasPermission(role, 'appointments', 'view', user?.permissions),
    },
    {
      id: 'doctors',
      label: 'Doctors & Availability',
      icon: Stethoscope,
      href: '/admin/doctors',
      allowed: hasPermission(role, 'doctors', 'view', user?.permissions),
      submenu: [
        { label: 'All Doctors', href: '/admin/doctors' },
        { label: 'Add Doctor', href: '/admin/doctors/new', icon: UserPlus },
      ],
    },
    {
      id: 'bloodBank',
      label: 'Blood Bank',
      icon: Droplet,
      href: '/admin/blood-bank',
      allowed: hasPermission(role, 'blood-bank', 'view', user?.permissions),
      submenu: [
        { label: 'Blood Stock', href: '/admin/blood-bank' },
        { label: 'Requests', href: '/admin/blood-bank/requests', icon: Clock },
        { label: 'Donations', href: '/admin/blood-bank/donations', icon: HeartHandshake },
      ],
    },
    {
      id: 'enquiries',
      label: 'Enquiries',
      icon: Mail,
      href: '/admin/enquiries',
      allowed: hasPermission(role, 'enquiries', 'view', user?.permissions),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/admin/settings',
      allowed: hasPermission(role, 'settings', 'view', user?.permissions),
      submenu: [
        { label: 'Team Members', href: '/admin/settings/team' },
        { label: 'Roles & Permissions', href: '/admin/settings/roles', icon: ShieldCheck },
        { label: 'Notifications', href: '/admin/settings/notifications', icon: Bell },
      ],
    },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white text-[#172033] border-r border-[#E5EAF0] flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-[#E5EAF0]">
          <div className="w-8 h-8 rounded-lg bg-[#FFCC00] text-[#172033] flex items-center justify-center font-bold shadow-xs">
            <Hospital className="w-5 h-5 text-[#172033]" />
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-sm text-[#172033] tracking-wide truncate">
              CLINICA CURE
            </h1>
            <p className="text-[10px] text-[#5F6B7A] uppercase tracking-wider font-semibold">
              Hospital Admin
            </p>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          {navItems
            .filter((item) => item.allowed)
            .map((item) => {
              const isActive =
                item.href === '/admin/overview'
                  ? pathname === '/admin' || pathname === '/admin/overview'
                  : pathname.startsWith(item.href)
              const hasSubmenu = item.submenu && item.submenu.length > 0
              const isSubmenuOpen = openSubmenus[item.id]

              return (
                <div key={item.id} className="space-y-0.5">
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`flex-1 flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#FFCC00] text-[#172033] font-bold shadow-xs'
                          : 'text-[#5F6B7A] hover:bg-[#F7F8FA] hover:text-[#172033]'
                      }`}
                    >
                      <item.icon
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-[#172033]' : 'text-[#5F6B7A]'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>

                    {hasSubmenu && (
                      <button
                        type="button"
                        onClick={() => toggleSubmenu(item.id)}
                        className="p-2 text-[#5F6B7A] hover:text-[#172033] transition-colors"
                      >
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform ${
                            isSubmenuOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Submenu links */}
                  {hasSubmenu && isSubmenuOpen && (
                    <div className="pl-9 pr-2 py-1 space-y-1 border-l border-[#E5EAF0] ml-5 my-1">
                      {item.submenu.map((sub, sIdx) => {
                        const isSubActive = pathname === sub.href
                        return (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            onClick={onCloseMobile}
                            className={`block py-1.5 px-2.5 rounded-md text-[11.5px] transition-colors truncate ${
                              isSubActive
                                ? 'bg-[#FFF9DB] text-[#806600] font-bold'
                                : 'text-[#5F6B7A] hover:text-[#172033] hover:bg-[#F7F8FA]'
                            }`}
                          >
                            {sub.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
        </div>

        {/* User Card & Logout at bottom */}
        <div className="p-3 border-t border-[#E5EAF0] bg-[#F7F8FA]">
          <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-[#E5EAF0]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#FFCC00] text-[#172033] flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name ? user.name[0].toUpperCase() : 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#172033] truncate">
                  {user?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-[#5F6B7A] capitalize truncate">
                  {user?.roleName || user?.role?.replace('_', ' ') || 'Super Admin'}
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Sign Out"
              className="p-1.5 rounded-md text-[#5F6B7A] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
