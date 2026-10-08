'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Home,
  Building2,
  UserRound,
  Stethoscope,
  MessageSquareHeart,
  Handshake,
  Newspaper,
  Phone,
  Calendar,
  ChevronRight,
  ChevronDown,
  X,
  Star,
  MapPin,
  ExternalLink,
  Search,
  Droplet,
} from 'lucide-react'
import { siteConfig } from '@/config/site'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  onOpenSearch?: () => void
}

export default function MobileNavigation({ isOpen, onClose, onOpenSearch }: MobileNavProps) {

  return (
    <>
      {/* Mobile overlay */}
      <div
        id="mobile-overlay"
        onClick={onClose}
        className={`fixed inset-0 bg-[#0c1e3a]/50 z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      />

      {/* Mobile Drawer Panel */}
      <div
        id="mobile-panel"
        className={`fixed top-0 right-0 h-full w-[88%] max-w-sm bg-white z-[70] transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Mobile Drawer Header */}
        <div className="flex items-center justify-between px-5 h-[68px] border-b border-slate-100 shrink-0">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <Image
              src={siteConfig.logoUrl}
              alt="Clinica Cure"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <span className="font-display font-bold text-base text-[#0E6B60]">
              CLINICA <span className="text-[#0e3592]">CURE</span>
            </span>
          </Link>
          <button
            id="mobile-close-btn"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 -mr-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Mobile Drawer Body with Navigation & Quick Actions */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4 text-slate-800">
          {/* Quick Search Bar */}
          {onOpenSearch && (
            <button
              type="button"
              onClick={() => {
                onClose()
                onOpenSearch()
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-left text-slate-500 text-xs transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#0E6B60]" />
              <span className="flex-1 font-medium text-slate-600">Search doctors, specialities...</span>
            </button>
          )}
          {/* Google Review Rating Card */}
          <Link
            href="/#reviews"
            onClick={onClose}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50/50 to-orange-50/40 hover:from-amber-100/60 hover:to-orange-100/50 rounded-2xl border border-amber-100/80 shadow-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-xs font-semibold text-slate-700">Google Rating</span>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm font-bold text-slate-900">{siteConfig.googleRating}</span>
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">({siteConfig.googleReviewCount})</span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1 font-display text-sm font-semibold">
            <Link
              href="/"
              onClick={onClose}
              className="group flex items-center justify-between py-2.5 px-2.5 border-b border-slate-100/80 hover:text-[#0E6B60] hover:bg-slate-50/80 rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#0E6B60]/10 text-[#0E6B60] flex items-center justify-center">
                  <Home className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-medium text-slate-800 group-hover:text-[#0E6B60]">Home</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/about"
              onClick={onClose}
              className="group flex items-center justify-between py-2.5 px-2.5 border-b border-slate-100/80 hover:text-[#0E6B60] hover:bg-slate-50/80 rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#0E6B60]/10 text-[#0E6B60] flex items-center justify-center">
                  <Building2 className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-medium text-slate-800 group-hover:text-[#0E6B60]">About Us</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/doctors"
              onClick={onClose}
              className="group flex items-center justify-between py-2.5 px-2.5 border-b border-slate-100/80 hover:text-[#0E6B60] hover:bg-slate-50/80 rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#0E6B60]/10 text-[#0E6B60] flex items-center justify-center">
                  <UserRound className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-medium text-slate-800 group-hover:text-[#0E6B60]">Doctors</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/departments"
              onClick={onClose}
              className="group flex items-center justify-between py-2.5 px-2.5 border-b border-slate-100/80 hover:text-[#0E6B60] hover:bg-slate-50/80 rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#0E6B60]/10 text-[#0E6B60] flex items-center justify-center">
                  <Stethoscope className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-medium text-slate-800 group-hover:text-[#0E6B60]">Departments</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/patient-stories"
              onClick={onClose}
              className="group flex items-center justify-between py-2.5 px-2.5 border-b border-slate-100/80 hover:text-[#0E6B60] hover:bg-slate-50/80 rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#0E6B60]/10 text-[#0E6B60] flex items-center justify-center">
                  <MessageSquareHeart className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-medium text-slate-800 group-hover:text-[#0E6B60]">Patient Stories</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/core-partners"
              onClick={onClose}
              className="group flex items-center justify-between py-2.5 px-2.5 border-b border-slate-100/80 hover:text-[#0E6B60] hover:bg-slate-50/80 rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#0E6B60]/10 text-[#0E6B60] flex items-center justify-center">
                  <Handshake className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-medium text-slate-800 group-hover:text-[#0E6B60]">Core Partners</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/blood-bank"
              onClick={onClose}
              className="group flex items-center justify-between py-2.5 px-2.5 border-b border-slate-100/80 hover:text-[#0E6B60] hover:bg-slate-50/80 rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <Droplet className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-medium text-slate-800 group-hover:text-[#0E6B60]">Blood Bank &amp; Donation</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/blog"
              onClick={onClose}
              className="group flex items-center justify-between py-2.5 px-2.5 border-b border-slate-100/80 hover:text-[#0E6B60] hover:bg-slate-50/80 rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#0E6B60]/10 text-[#0E6B60] flex items-center justify-center">
                  <Newspaper className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-medium text-slate-800 group-hover:text-[#0E6B60]">Blog</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className="group flex items-center justify-between py-2.5 px-2.5 border-b border-slate-100/80 hover:text-[#0E6B60] hover:bg-slate-50/80 rounded-xl transition-all"
            >
              <span className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#0E6B60]/10 text-[#0E6B60] flex items-center justify-center">
                  <Phone className="w-4 h-4" strokeWidth={1.8} />
                </span>
                <span className="font-medium text-slate-800 group-hover:text-[#0E6B60]">Contact Us</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0E6B60] group-hover:translate-x-0.5 transition-all" />
            </Link>
          </nav>

          {/* Emergency & Location Quick Card */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="flex items-center justify-between p-3.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-85"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
                <div className="leading-tight">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-red-100">Emergency 24x7</span>
                  <span className="block text-sm font-extrabold">{siteConfig.phone}</span>
                </div>
              </div>
              <span className="text-xs bg-white/20 px-2.5 py-1 rounded-lg font-semibold">Call Now</span>
            </a>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0E6B60]" />
                <span>{siteConfig.name}</span>
              </p>
              <p>{siteConfig.address}</p>
              <p className="text-[11px] text-[#0E6B60] font-medium pt-0.5">24x7 Ambulance &amp; Emergency OPD</p>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-white space-y-2.5 shrink-0">
          <Link
            href="/book-appointment"
            onClick={onClose}
            className="rounded-xl h-11 flex items-center justify-center gap-2 font-display font-semibold text-sm w-full bg-[#0E746D] text-white hover:bg-[#0b544b] shadow-sm transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </Link>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="rounded-xl h-11 border border-slate-200 flex items-center justify-center gap-2 text-slate-700 font-display font-semibold text-xs w-full hover:bg-slate-50 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#0E746D]" />
            <span>Helpline: {siteConfig.phone}</span>
          </a>
        </div>
      </div>
    </>
  )
}
