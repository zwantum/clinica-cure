import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail, Clock, CalendarDays } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { departments } from '@/config/navigation'
import FloatingActions from './FloatingActions'

export default function Footer() {
  // Display top 6 real clinical departments in footer
  const footerDepts = departments.slice(0, 6)

  return (
    <>
      <footer className="bg-[#0B211D] text-white/80 pt-10 sm:pt-14 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] gap-10">
          {/* Column 1: Hospital Info */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image
                src={siteConfig.logoUrl}
                alt="Clinica Cure Hospital Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain bg-white rounded-lg p-1 transition-transform group-hover:scale-105"
              />
              <div className="leading-none">
                <span className="block font-display font-bold text-white tracking-tight text-lg">
                  CLINICA CURE
                </span>
                <span className="block text-[9px] font-semibold tracking-wider text-[#26B09A] mt-1 uppercase">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-relaxed max-w-xs text-white/70">
              A multi-speciality hospital in Bariatu, Ranchi, committed to compassionate care, advanced technology, and better health outcomes for every patient.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#26B09A] text-white hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#26B09A] text-white hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#26B09A] text-white hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#26B09A] text-white hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <p className="font-display font-bold text-white mb-4 text-sm tracking-wide">Quick Links</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#DDF5F0] transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-[#DDF5F0] transition-colors">Departments</Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-[#DDF5F0] transition-colors">Find a Doctor</Link>
              </li>
              <li>
                <Link href="/patient-stories" className="hover:text-[#DDF5F0] transition-colors">Patient Stories</Link>
              </li>
              <li>
                <Link href="/core-partners" className="hover:text-[#DDF5F0] transition-colors">Core Partners</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#DDF5F0] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/blood-bank" className="hover:text-[#DDF5F0] transition-colors flex items-center gap-1.5">
                  <span>Blood Bank &amp; Donation</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#DDF5F0] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Departments */}
          <div>
            <p className="font-display font-bold text-white mb-4 text-sm tracking-wide">Departments</p>
            <ul className="space-y-3 text-sm">
              {footerDepts.map((dept) => (
                <li key={dept.slug}>
                  <Link href={`/departments/${dept.slug}`} className="hover:text-[#DDF5F0] transition-colors">
                    {dept.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/departments" className="text-[#26B09A] hover:underline font-semibold text-xs inline-flex items-center gap-1 mt-1">
                  <span>View All Departments</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <p className="font-display font-bold text-white mb-4 text-sm tracking-wide">Contact</p>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-[#26B09A] shrink-0" strokeWidth={1.8} />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-[#26B09A] shrink-0" strokeWidth={1.8} />
                <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-[#DDF5F0] font-semibold text-white">
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 text-[#26B09A] shrink-0" strokeWidth={1.8} />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[#DDF5F0]">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Clock className="w-4 h-4 mt-0.5 text-[#26B09A] shrink-0" strokeWidth={1.8} />
                <span>OPD: 9 AM – 8 PM • Emergency 24x7</span>
              </li>
            </ul>

            <div className="mt-5">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#26B09A] text-white hover:bg-[#168A78] text-xs font-semibold shadow-sm transition-all"
              >
                <CalendarDays className="w-4 h-4" strokeWidth={1.8} />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>© 2026 Clinica Cure Hospital. All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p>
              Designed &amp; Developed by{' '}
              <a
                href="https://zwantum.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#26B09A] hover:underline font-semibold tracking-wide transition-colors"
              >
                Zwantum
              </a>
            </p>
          </div>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </footer>

      {/* Floating Action Bars (Desktop Left Bar + Mobile Bottom Bar) */}
      <FloatingActions />
    </>
  )
}
