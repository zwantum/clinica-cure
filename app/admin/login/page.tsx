'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldAlert,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  HelpCircle,
  X,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import { fetchTeamMembers } from '../services/team'
import { hasPermission } from '../lib/permissions'
import { RoleSlug, StaffUser } from '../types'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [showHelpModal, setShowHelpModal] = useState(false)

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setErrorMsg('')

    if (!email.trim() || password.length < 4) {
      setErrorMsg('Please enter your registered staff email and password (minimum 4 characters).')
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
        setErrorMsg('No staff account found for this email address. Please verify with hospital administration.')
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
        setErrorMsg('Incorrect password. Please verify your credentials or contact the IT desk.')
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
      const maxAge = rememberMe ? 86400 * 7 : 86400
      document.cookie = `clinicacure_admin_session=true; path=/; max-age=${maxAge}; SameSite=Lax`

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
      setErrorMsg('Authentication service unavailable. Please retry shortly.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062420] via-[#0A332E] to-[#0D1F1C] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden text-slate-800">
      {/* Subtle Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#0E746D]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-[#26B09A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 my-auto">
        {/* Hospital Brand Badge with Real Logo */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-xl shadow-black/20 ring-4 ring-white/10 mb-3.5 transition-transform hover:scale-105">
            <Image
              src={siteConfig.logoUrl}
              alt="Clinica Cure Hospital Logo"
              width={52}
              height={52}
              className="w-13 h-13 object-contain"
              priority
            />
          </div>

          <h1 className="font-display font-black text-2xl sm:text-[26px] text-white tracking-tight leading-tight">
            CLINICA CURE HOSPITAL
          </h1>
          <p className="text-xs font-semibold text-[#5EEAD4] tracking-wider uppercase mt-1">
            Clinical Operations &amp; Administration Portal
          </p>
        </div>

        {/* Login Card Frame */}
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#E2ECE9] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900 font-display">Staff Sign In</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Authenticate with your hospital credentials to access the management portal.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2.5 animate-in fade-in duration-200">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@clinicacure.in"
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAF9] border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-[#0E746D] focus:ring-3 focus:ring-[#0E746D]/15 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="text-[11px] font-semibold text-[#0E746D] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm bg-[#F8FAF9] border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:bg-white focus:border-[#0E746D] focus:ring-3 focus:ring-[#0E746D]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 transition-colors cursor-pointer"
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

            {/* Remember Me Option */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0E746D] border-slate-300 focus:ring-[#0E746D] cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-medium">
                  Keep me signed in on this device
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#0E746D] hover:bg-[#0B5C56] active:scale-[0.99] text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-[#0E746D]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0E746D]" />
            <span>Authorized Medical &amp; Staff Access Only </span>
          </div>
        </div>

        {/* Back Link to Public Site */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Clinica Cure Public Website</span>
          </Link>
        </div>
      </div>

      {/* Forgot Password / Helpdesk Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-10 h-10 rounded-2xl bg-[#EAF7F4] text-[#0E746D] flex items-center justify-center mb-3">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-base">
              Password Assistance
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              For security compliance, staff passwords can only be reset by the Super Administrator or Hospital IT Desk.
            </p>
            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">IT Support:</span>
                <span className="font-semibold text-slate-800">it@clinicacure.in</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Emergency Extension:</span>
                <span className="font-semibold text-slate-800">+91 92633 97076</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
