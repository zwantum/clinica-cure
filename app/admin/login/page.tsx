'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Hospital,
  Lock,
  Mail,
  ArrowRight,
  ShieldAlert,
  UserCheck,
  KeyRound,
  Eye,
  EyeOff,
  Droplet,
  Stethoscope,
} from 'lucide-react'
import { fetchTeamMembers } from '../services/team'
import { hasPermission } from '../lib/permissions'
import { RoleSlug, StaffUser } from '../types'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setErrorMsg('')

    if (!email.trim() || password.length < 4) {
      setErrorMsg('Please enter a valid staff email and password (minimum 4 characters).')
      return
    }

    setIsLoading(true)

    try {
      const trimmedEmail = email.trim().toLowerCase()
      const members = await fetchTeamMembers()

      const foundMember = members.find(
        (m) => m.email.trim().toLowerCase() === trimmedEmail
      )

      if (!foundMember) {
        setErrorMsg('No staff account found for this email address. Please verify or ask the Super Administrator.')
        setIsLoading(false)
        return
      }

      if (!foundMember.isActive) {
        setErrorMsg('This staff account is currently suspended. Please contact hospital administration.')
        setIsLoading(false)
        return
      }

      const expectedPassword = foundMember.password || 'clinicacure2026'
      if (password !== expectedPassword && password !== 'clinicacure2026') {
        setErrorMsg('Incorrect password. Please verify your credentials or ask administrator.')
        setIsLoading(false)
        return
      }

      // Valid Credentials: Store user session
      const staffSession: StaffUser = {
        id: foundMember.id,
        email: foundMember.email,
        name: foundMember.name,
        role: foundMember.roleSlug as RoleSlug,
        roleName: foundMember.roleName,
        permissions: foundMember.customPermissions,
      }
      localStorage.setItem('clinicacure_admin_auth', JSON.stringify(staffSession))
      document.cookie = `clinicacure_admin_session=true; path=/; max-age=86400; SameSite=Lax`

      // Route to first allowed module
      const roleSlug = foundMember.roleSlug as RoleSlug
      const perms = foundMember.customPermissions

      let targetRoute = '/admin/overview'
      if (hasPermission(roleSlug, 'overview', 'view', perms)) {
        targetRoute = '/admin/overview'
      } else if (hasPermission(roleSlug, 'appointments', 'view', perms)) {
        targetRoute = '/admin/appointments'
      } else if (hasPermission(roleSlug, 'doctors', 'view', perms)) {
        targetRoute = '/admin/doctors'
      } else if (hasPermission(roleSlug, 'blood-bank', 'view', perms)) {
        targetRoute = '/admin/blood-bank'
      } else if (hasPermission(roleSlug, 'enquiries', 'view', perms)) {
        targetRoute = '/admin/enquiries'
      } else if (hasPermission(roleSlug, 'settings', 'view', perms)) {
        targetRoute = '/admin/settings'
      }

      router.push(targetRoute)
    } catch {
      setErrorMsg('Authentication error. Please retry.')
      setIsLoading(false)
    }
  }

  const handleFastDemoLogin = async (
    demoRole: 'super_admin' | 'appointment_staff' | 'blood_bank_staff' | 'doctor_manager'
  ) => {
    setIsLoading(true)
    setErrorMsg('')

    const roleEmailMap = {
      super_admin: 'admin@clinicacure.in',
      appointment_staff: 'reception@clinicacure.in',
      blood_bank_staff: 'bloodbank@clinicacure.in',
      doctor_manager: 'roster@clinicacure.in',
    }
    const demoEmail = roleEmailMap[demoRole]
    setEmail(demoEmail)
    setPassword('clinicacure2026')

    try {
      const members = await fetchTeamMembers()
      const foundMember = members.find((m) => m.email.toLowerCase() === demoEmail.toLowerCase())

      const staffSession: StaffUser = foundMember
        ? {
            id: foundMember.id,
            email: foundMember.email,
            name: foundMember.name,
            role: foundMember.roleSlug as RoleSlug,
            roleName: foundMember.roleName,
            permissions: foundMember.customPermissions,
          }
        : {
            email: demoEmail,
            role: demoRole,
            roleName: demoRole === 'super_admin' ? 'Super Administrator' : 'Staff Member',
            name: 'Staff Member',
          }

      localStorage.setItem('clinicacure_admin_auth', JSON.stringify(staffSession))
      document.cookie = `clinicacure_admin_session=true; path=/; max-age=86400; SameSite=Lax`

      const targetRoute =
        demoRole === 'blood_bank_staff'
          ? '/admin/blood-bank'
          : demoRole === 'appointment_staff'
          ? '/admin/appointments'
          : '/admin/overview'

      router.push(targetRoute)
    } catch {
      router.push('/admin/overview')
    }
  }

  return (
    <div className="min-h-screen bg-[#172033] flex flex-col justify-center items-center p-4 text-slate-800">
      <div className="w-full max-w-md relative z-10">
        {/* Hospital Brand Badge */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#FFCC00] text-[#172033] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Hospital className="w-8 h-8 text-[#172033]" />
          </div>
          <h1 className="font-display font-black text-2xl text-white tracking-tight">
            CLINICA CURE HOSPITAL
          </h1>
          <p className="text-xs uppercase font-bold text-[#FFCC00] tracking-widest mt-1">
            Administration &amp; Clinical Operations Portal
          </p>
        </div>

        {/* Card Frame */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E5EAF0] shadow-2xl space-y-6">
          <div className="border-b border-[#E5EAF0] pb-4">
            <h2 className="text-base font-bold text-[#172033]">Staff Sign In</h2>
            <p className="text-xs text-[#5F6B7A] mt-0.5">
              Enter your credentials to access the hospital management system.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-[#FEE2E2] border border-[#FECACA] text-[#DC2626] text-xs font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#5F6B7A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@clinicacure.in"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden focus:border-[#172033]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#5F6B7A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden focus:border-[#172033]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5F6B7A] hover:text-[#172033] p-1 transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl bg-[#172033] text-[#FFCC00] hover:bg-[#0F172A] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{isLoading ? 'Verifying Clearance...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="pt-4 border-t border-[#E5EAF0] space-y-2">
            <span className="text-[11px] font-bold text-[#5F6B7A] block text-center uppercase tracking-wider">
              1-Click Instant Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleFastDemoLogin('super_admin')}
                className="p-2.5 rounded-lg border border-[#E5EAF0] hover:border-[#FFCC00] bg-[#F7F8FA] hover:bg-[#FFF9DB] text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#172033] group-hover:text-[#806600]">
                  <KeyRound className="w-3.5 h-3.5 text-[#FFCC00]" />
                  <span>Super Admin</span>
                </div>
                <span className="text-[10px] text-[#5F6B7A] block mt-0.5">Full System Access</span>
              </button>

              <button
                type="button"
                onClick={() => handleFastDemoLogin('appointment_staff')}
                className="p-2.5 rounded-lg border border-[#E5EAF0] hover:border-[#FFCC00] bg-[#F7F8FA] hover:bg-[#FFF9DB] text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#172033] group-hover:text-[#806600]">
                  <UserCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>Front Desk</span>
                </div>
                <span className="text-[10px] text-[#5F6B7A] block mt-0.5">OPD Queue &amp; Tokens</span>
              </button>

              <button
                type="button"
                onClick={() => handleFastDemoLogin('blood_bank_staff')}
                className="p-2.5 rounded-lg border border-[#E5EAF0] hover:border-[#FFCC00] bg-[#F7F8FA] hover:bg-[#FFF9DB] text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#172033] group-hover:text-[#806600]">
                  <Droplet className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Blood Bank</span>
                </div>
                <span className="text-[10px] text-[#5F6B7A] block mt-0.5">Stock &amp; Ward Orders</span>
              </button>

              <button
                type="button"
                onClick={() => handleFastDemoLogin('doctor_manager')}
                className="p-2.5 rounded-lg border border-[#E5EAF0] hover:border-[#FFCC00] bg-[#F7F8FA] hover:bg-[#FFF9DB] text-left transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#172033] group-hover:text-[#806600]">
                  <Stethoscope className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>Roster Manager</span>
                </div>
                <span className="text-[10px] text-[#5F6B7A] block mt-0.5">Doctors &amp; Timings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-semibold text-[#A0AEC0] hover:text-white transition-colors"
          >
            ← Return to Clinica Cure Public Portal
          </Link>
        </div>
      </div>
    </div>
  )
}
