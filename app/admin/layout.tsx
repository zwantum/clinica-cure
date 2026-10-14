'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ShieldAlert } from 'lucide-react'
import { AdminSidebar } from './components/AdminSidebar'
import { AdminHeader } from './components/AdminHeader'
import { hasPermission } from './lib/permissions'
import { AdminModule, StaffUser } from './types'

function getRequiredModule(path: string): AdminModule | null {
  if (path === '/admin' || path.startsWith('/admin/overview')) return 'overview'
  if (path.startsWith('/admin/appointments')) return 'appointments'
  if (path.startsWith('/admin/doctors')) return 'doctors'
  if (path.startsWith('/admin/blood-bank')) return 'blood-bank'
  if (path.startsWith('/admin/enquiries')) return 'enquiries'
  if (path.startsWith('/admin/settings')) return 'settings'
  return null
}

function getFirstAllowedRoute(user: StaffUser | null): string {
  if (!user) return '/admin/login'
  const modules: Array<{ id: AdminModule; path: string }> = [
    { id: 'overview', path: '/admin/overview' },
    { id: 'appointments', path: '/admin/appointments' },
    { id: 'doctors', path: '/admin/doctors' },
    { id: 'blood-bank', path: '/admin/blood-bank' },
    { id: 'enquiries', path: '/admin/enquiries' },
    { id: 'settings', path: '/admin/settings' },
  ]
  for (const m of modules) {
    if (hasPermission(user.role, m.id, 'view', user.permissions)) {
      return m.path
    }
  }
  return '/admin/overview'
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [staffUser, setStaffUser] = useState<StaffUser | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    // Never gate the login page
    if (pathname === '/admin/login') {
      setIsAuthenticated(true)
      return
    }

    const authData = localStorage.getItem('clinicacure_admin_auth')
    const hasCookie = typeof document !== 'undefined' && document.cookie.includes('clinicacure_admin_session=true')

    if (authData || hasCookie) {
      try {
        const parsed: StaffUser = authData
          ? JSON.parse(authData)
          : {
              name: 'Dr. Administrative Head',
              role: 'super_admin',
              roleName: 'Super Administrator',
              email: 'admin@clinicacure.in',
            }
        setStaffUser(parsed)
        setIsAuthenticated(true)
      } catch {
        setStaffUser({
          name: 'Hospital Administrator',
          role: 'super_admin',
          roleName: 'Super Administrator',
          email: 'admin@clinicacure.in',
        })
        setIsAuthenticated(true)
      }
    } else {
      setIsAuthenticated(false)
      router.push('/admin/login')
    }
  }, [pathname, router])

  const handleLogout = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('clinicacure_admin_auth')
    }
    if (typeof document !== 'undefined') {
      document.cookie = 'clinicacure_admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
    router.push('/admin/login')
  }

  // If on login route, render standalone without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#172033] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-3 border-[#FFCC00] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-bold text-white">Verifying Clinica Cure Security Clearance...</p>
        <p className="text-xs text-[#A0AEC0] mt-1">Connecting to Hospital Gateway</p>
      </div>
    )
  }

  if (isAuthenticated === false) {
    return null
  }

  const requiredModule = getRequiredModule(pathname)
  const isModuleAllowed =
    !requiredModule ||
    (staffUser && hasPermission(staffUser.role, requiredModule, 'view', staffUser.permissions))

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#172033] flex flex-col font-sans">
      <AdminSidebar
        user={staffUser}
        isOpenMobile={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        onLogout={handleLogout}
      />

      <div className="md:pl-64 flex flex-col flex-1 min-w-0">
        <AdminHeader user={staffUser} onOpenMobile={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {isModuleAllowed ? (
            children
          ) : (
            <div className="max-w-md mx-auto my-16 bg-white rounded-2xl p-8 border border-[#E5EAF0] shadow-sm text-center animate-in fade-in zoom-in-95">
              <div className="w-14 h-14 rounded-2xl bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h2 className="text-base font-bold text-[#172033]">Access Restricted</h2>
              <p className="text-xs text-[#5F6B7A] mt-2 leading-relaxed">
                Your staff profile (<span className="font-bold text-[#172033]">{staffUser?.name}</span> • <span className="font-semibold text-[#172033]">{staffUser?.roleName}</span>) does not have authorization to access this module.
              </p>
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => router.push(getFirstAllowedRoute(staffUser))}
                  className="px-4 py-2.5 rounded-xl bg-[#FFCC00] text-[#172033] font-bold text-xs hover:bg-[#E6B800] transition-colors cursor-pointer shadow-xs"
                >
                  Go to Authorized Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
        <footer className="py-3 px-4 sm:px-6 lg:px-8 border-t border-[#E5EAF0] bg-white text-[11.5px] text-[#5F6B7A] flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <p>© 2026 Clinica Cure Hospital. All rights reserved.</p>
          <p>
            Designed &amp; Developed by{' '}
            <a
              href="https://zwantum.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#172033] hover:text-[#0E746D] hover:underline transition-colors"
            >
              Zwantum
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#172033] flex flex-col items-center justify-center text-white">
          <div className="w-10 h-10 border-3 border-[#FFCC00] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-bold text-white">Loading Clinica Cure Administration...</p>
        </div>
      }
    >
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  )
}
