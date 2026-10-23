'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  MapPin,
  Phone,
  PhoneCall,
  Menu,
  ChevronDown,
  Star,
  Search,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import { departments } from '@/config/navigation'
import MobileNav from './MobileNavigation'
import DepartmentMegaMenu from './DepartmentMegaMenu'
import SearchModal from './SearchModal'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const megaMenuRef = useRef<HTMLDivElement>(null)

  // Mark as mounted after hydration to avoid SSR/client class mismatches
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keyboard shortcut Ctrl+K / Cmd+K to open search, Escape to close overlays
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setMegaMenuOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close menus on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      <header
        id="site-header"
        className={`sticky top-0 z-50 bg-white border-b border-slate-200/80 transition-shadow ${mounted && scrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : 'shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
          }`}
      >
        {/* ── Top Bar: Brand + Utility Actions ── */}
        <div className="max-w-[1400px] mx-auto px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-6">
          {/* Left: Logo + Google Rating */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5 shrink-0">
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
              <Image
                src={siteConfig.logoUrl}
                alt="Clinica Cure Hospital Logo"
                width={40}
                height={40}
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 object-contain shrink-0"
                priority
              />
              <span className="leading-none">
                <span className="block font-display font-bold text-base sm:text-lg lg:text-xl xl:text-2xl text-[#0E6B60] tracking-tight">
                  CLINICA <span className="text-[#0e3592]">CURE</span>
                </span>
                <span className="block text-[8px] sm:text-[9.5px] lg:text-[10px] xl:text-[11px] font-bold text-[#149B88] tracking-widest uppercase mt-0.5 sm:mt-1">
                  Passion For Cure
                </span>
              </span>
            </Link>

            {/* Google Rating Badge */}
            <Link
              href="/#reviews"
              className="hidden md:flex items-center gap-1.5 lg:gap-2 pl-2.5 sm:pl-3 lg:pl-4 border-l border-slate-200 group cursor-pointer hover:opacity-90 transition-all select-none shrink-0"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[9.5px] lg:text-[10.5px] font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                  Google Rating
                </span>
                <div className="flex items-center gap-1 my-0.5">
                  <span className="font-display font-bold text-xs lg:text-[13px] text-amber-500">
                    {siteConfig.googleRating}
                  </span>
                  <div className="flex items-center text-amber-400 gap-0.5" aria-label="5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-[8.5px] lg:text-[9.5px] text-slate-500 group-hover:text-[#0E6B60] font-medium transition-all">
                  {siteConfig.googleReviewCount} reviews
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5 text-xs sm:text-sm font-normal text-slate-700 shrink-0">
            {/* Search (before location) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-1.5 text-slate-700 hover:text-[#0E6B60] transition-colors font-normal text-xs sm:text-sm shrink-0 group cursor-pointer mr-3.5 sm:mr-0 p-1 sm:p-0 rounded-lg hover:bg-slate-100 sm:hover:bg-transparent"
              title="Search Doctors, Specialities & Treatments (Ctrl + K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-slate-700 group-hover:text-[#0E6B60] transition-colors" strokeWidth={2} />
              <span className="hidden sm:inline font-normal group-hover:text-[#0E6B60] transition-colors">Search</span>
            </button>

            {/* Location (xl+) */}
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group hidden xl:block cursor-pointer shrink-0"
              title="Hospital Location: Bariatu, Ranchi"
            >
              <div className="flex items-center gap-1.5 text-slate-700 hover:text-[#0E6B60] transition-colors font-normal text-xs sm:text-sm">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 group-hover:text-[#0E6B60] transition-colors" strokeWidth={1.8} />
                <span className="group-hover:text-[#0E6B60] transition-colors">{siteConfig.addressShort}</span>
              </div>
            </a>

            {/* Phone (lg+) */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="hidden lg:flex items-center gap-1.5 hover:text-[#0E6B60] transition-colors text-slate-700 font-normal shrink-0"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" strokeWidth={1.8} />
              <span className="text-xs sm:text-sm font-medium">{siteConfig.phone}</span>
            </a>

            {/* 24/7 Emergency */}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              aria-label="24/7 Emergency Helpline"
              className="relative inline-flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:px-3.5 sm:py-2 lg:px-4 lg:py-2.5 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shrink-0 sm:bg-gradient-to-r sm:from-red-600 sm:via-rose-600 sm:to-red-600 sm:hover:from-red-700 sm:hover:to-rose-700 sm:text-white emergency-glow sm:shadow-md"
            >
              <div className="w-6 h-6 sm:w-5 sm:h-5 flex items-center justify-center shrink-0 relative">
                <PhoneCall className="w-4 h-4 text-red-600 sm:text-white" strokeWidth={2.2} />
              </div>
              <span className="hidden sm:inline-block font-bold text-[11px] sm:text-xs whitespace-nowrap uppercase tracking-wider">
                24/7 Emergency
              </span>
            </a>

            {/* Mobile toggle */}
            <button
              id="mobile-menu-btn"
              aria-label={mounted && mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mounted ? mobileOpen : false}
              onClick={() => setMobileOpen(true)}
              className="xl:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none shrink-0 transition-colors"
            >
              <Menu className="w-6 h-6" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* ── Bottom Nav Row: Desktop (xl+) ── */}
        <div
          ref={megaMenuRef}
          className="hidden xl:block border-t border-slate-100 bg-white relative w-full"
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8 flex items-center justify-center py-3.5">
            <nav
              className="flex items-center justify-center gap-4 xl:gap-6 2xl:gap-8 text-[14px] xl:text-[14.5px] font-normal text-slate-700 whitespace-nowrap"
              aria-label="Main navigation"
            >
              <Link
                href="/"
                onMouseEnter={() => setMegaMenuOpen(false)}
                className="px-1.5 py-1 hover:text-[#0E6B60] shrink-0 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                onMouseEnter={() => setMegaMenuOpen(false)}
                className="px-1.5 py-1 hover:text-[#0E6B60] shrink-0 font-medium transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/doctors"
                onMouseEnter={() => setMegaMenuOpen(false)}
                className="px-1.5 py-1 hover:text-[#0E6B60] shrink-0 font-medium transition-colors"
              >
                Doctors
              </Link>

              {/* Departments Mega Menu Trigger */}
              <div className="shrink-0 whitespace-normal">
                <button
                  onClick={() => setMegaMenuOpen((v) => !v)}
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  className={`px-1.5 py-1 flex items-center gap-1.5 font-medium transition-colors cursor-pointer ${
                    mounted && megaMenuOpen ? 'text-[#0E6B60]' : 'hover:text-[#0E6B60]'
                  }`}
                  aria-expanded={mounted ? megaMenuOpen : false}
                  aria-haspopup="true"
                >
                  <span>Departments</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      mounted && megaMenuOpen ? 'rotate-180 text-[#0E6B60]' : ''
                    }`}
                  />
                </button>
              </div>

              <Link
                href="/patient-stories"
                onMouseEnter={() => setMegaMenuOpen(false)}
                className="px-1.5 py-1 hover:text-[#0E6B60] shrink-0 font-medium transition-colors"
              >
                Patient Stories
              </Link>
              <Link
                href="/core-partners"
                onMouseEnter={() => setMegaMenuOpen(false)}
                className="px-1.5 py-1 hover:text-[#0E6B60] shrink-0 font-medium transition-colors"
              >
                Core Partners
              </Link>

              <Link
                href="/blood-bank"
                onMouseEnter={() => setMegaMenuOpen(false)}
                className="px-1.5 py-1 hover:text-[#0E6B60] shrink-0 font-medium transition-colors"
              >
                Blood Bank &amp; Donation
              </Link>

              <Link
                href="/blog"
                onMouseEnter={() => setMegaMenuOpen(false)}
                className="px-1.5 py-1 hover:text-[#0E6B60] shrink-0 font-medium transition-colors"
              >
                Blog
              </Link>

              <Link
                href="/contact"
                onMouseEnter={() => setMegaMenuOpen(false)}
                className="px-2 py-1 hover:text-[#0E6B60] shrink-0 font-medium transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Centered Mega Menu Overlay */}
          {mounted && megaMenuOpen && (
            <DepartmentMegaMenu
              departments={departments}
              onClose={() => setMegaMenuOpen(false)}
            />
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Interactive Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
