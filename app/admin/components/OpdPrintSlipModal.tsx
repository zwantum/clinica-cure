'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { Printer, X } from 'lucide-react'
import { AppointmentRecord } from '../types'
import { siteConfig } from '@/config/site'

interface OpdPrintSlipModalProps {
  appointment: AppointmentRecord | null
  onClose: () => void
}

export function OpdPrintSlipModal({ appointment, onClose }: OpdPrintSlipModalProps) {
  const printRef = useRef<HTMLDivElement>(null)

  if (!appointment) return null

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      const prevTitle = document.title
      document.title = ''
      window.print()
      setTimeout(() => {
        document.title = prevTitle
      }, 1000)
    }
  }

  // Format issue date/time
  const createdDate = appointment.created_at
    ? new Date(appointment.created_at).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })

  const createdTime = appointment.created_at
    ? new Date(appointment.created_at).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })

  return (
    <>
      {/* Print Specific CSS to isolate only the printable slip and remove browser headers/footers */}
      <style jsx global>{`
        @page {
          size: auto;
          margin: 0mm; /* Suppresses browser auto-generated date, URL, title and page numbers */
        }
        @media print {
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            height: auto !important;
          }
          body * {
            visibility: hidden !important;
          }
          #opd-printable-slip,
          #opd-printable-slip * {
            visibility: visible !important;
          }
          #opd-printable-slip {
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            top: 12mm !important;
            margin: 0 auto !important;
            width: 180mm !important;
            max-width: 90% !important;
            padding: 20px 24px !important;
            border: 1px solid #334155 !important;
            border-radius: 4px !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Screen Modal Backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
        <div className="bg-white rounded-xl max-w-xl w-full border border-slate-300 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
          
          {/* Modal Header Bar (Screen Only) */}
          <div className="no-print bg-[#0E746D] px-5 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Printer className="w-4 h-4 text-[#FFCC00]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">
                OPD Consultation Slip
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close slip"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Printable Slip Container */}
          <div className="p-4 sm:p-6 max-h-[84vh] overflow-y-auto">
            <div
              id="opd-printable-slip"
              ref={printRef}
              className="bg-white border border-slate-300 rounded-lg p-5 sm:p-6 text-slate-800 relative shadow-xs text-xs font-sans"
            >
              {/* TOP HEADER: Clean Proportional Hospital Logo + Address */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-300">
                {/* Official Brand Logo (Proportionate, Clean) */}
                <div className="flex items-center gap-2">
                  <Image
                    src={siteConfig.logoUrl}
                    alt="Clinica Cure Hospital Logo"
                    width={32}
                    height={32}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
                    priority
                  />
                  <div className="leading-none">
                    <span className="block font-display font-bold text-lg sm:text-xl text-[#0E6B60] tracking-tight">
                      CLINICA <span className="text-[#0e3592]">CURE</span>
                    </span>
                    <span className="block text-[8px] sm:text-[9px] font-bold text-[#149B88] tracking-widest uppercase mt-0.5">
                      Passion For Cure
                    </span>
                  </div>
                </div>

                {/* Hospital Address and Helplines */}
                <div className="text-left sm:text-right text-[10px] sm:text-[10.5px] text-slate-600 leading-tight">
                  <div className="font-semibold text-slate-800">Bariatu Road, Ranchi, Jharkhand - 834009</div>
                  <div>24x7 Helpline: {siteConfig.phone} | OPD: {siteConfig.phoneSecondary}</div>
                  <div className="text-[9.5px] text-slate-500">Website: clinicacure.in | care@clinicacure.in</div>
                </div>
              </div>

              {/* SLIP TITLE */}
              <div className="text-center py-2.5 border-b border-slate-200">
                <h2 className="font-bold text-sm sm:text-base text-slate-900 uppercase tracking-wider">
                  OPD Consultation Slip
                </h2>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Issued on: {createdDate} at {createdTime}
                </div>
              </div>

              {/* TOKEN & REGISTRATION SUMMARY BAR */}
              <div className="bg-slate-50 border border-slate-200 rounded px-3 py-2 my-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold uppercase text-[10.5px]">Token No:</span>
                  <span className="font-mono font-bold text-sm text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-300">
                    {appointment.booking_reference}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 text-[11px]">Status:</span>
                  <span className="font-bold text-xs uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {appointment.status || 'Confirmed'}
                  </span>
                </div>
              </div>

              {/* PATIENT & APPOINTMENT DETAILS (Two-Column Clean Layout - No Tables) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                
                {/* Column 1: Patient Details */}
                <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200 pb-1">
                    Patient Details
                  </div>
                  
                  <div className="space-y-1.5 text-xs pt-0.5">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-slate-500 text-[11px]">Patient Name:</span>
                      <strong className="text-slate-900 text-right font-bold">{appointment.patient_name}</strong>
                    </div>

                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-slate-500 text-[11px]">Phone / Mobile:</span>
                      <span className="text-slate-800 text-right font-medium">{appointment.phone}</span>
                    </div>

                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-slate-500 text-[11px]">Age / Gender:</span>
                      <span className="text-slate-800 text-right">
                        {appointment.age ? `${appointment.age} Yrs` : 'Adult'} • {appointment.gender || 'Not specified'}
                      </span>
                    </div>

                    {appointment.email && (
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="text-slate-500 text-[11px]">Email ID:</span>
                        <span className="text-slate-700 text-right text-[11px] truncate max-w-[170px]">{appointment.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Column 2: Consultation Details */}
                <div className="bg-slate-50/70 border border-slate-200 rounded-lg p-3 space-y-2">
                  <div className="text-[10.5px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200 pb-1">
                    Consultation Details
                  </div>

                  <div className="space-y-1.5 text-xs pt-0.5">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-slate-500 text-[11px]">Consultant:</span>
                      <strong className="text-slate-900 text-right font-bold">{appointment.doctor_name || 'Attending Consultant'}</strong>
                    </div>

                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-slate-500 text-[11px]">Department:</span>
                      <span className="text-slate-800 text-right font-medium">{appointment.department_name || 'General OPD'}</span>
                    </div>

                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-slate-500 text-[11px]">Appt. Date:</span>
                      <strong className="text-slate-900 text-right">{appointment.appointment_date}</strong>
                    </div>

                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-slate-500 text-[11px]">Time Slot:</span>
                      <strong className="text-slate-900 text-right font-bold text-[#0E746D]">
                        {appointment.appointment_time || '10:00 AM'}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* PURPOSE OF VISIT / REASON (If present) */}
              {appointment.reason && (
                <div className="border border-slate-200 rounded p-2.5 my-2.5 bg-slate-50/50 text-xs">
                  <span className="font-semibold text-slate-600 text-[10.5px] uppercase tracking-wide block">
                    Chief Complaint / Reason for Consultation:
                  </span>
                  <div className="text-slate-800 font-medium italic mt-0.5">
                    &quot;{appointment.reason}&quot;
                  </div>
                </div>
              )}

              {/* PATIENT INSTRUCTIONS */}
              <div className="mt-3 pt-2.5 border-t border-slate-200 text-[10px] text-slate-500 leading-relaxed">
                <div className="font-bold text-slate-700 uppercase tracking-wider mb-1">
                  General Instructions:
                </div>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>Please report at the OPD reception counter 15 minutes before your scheduled appointment.</li>
                  <li>Please carry previous prescriptions, diagnostic reports, and patient identification.</li>
                  <li>This consultation token is valid for the designated date and consultant only.</li>
                  <li>In case of medical emergencies, visit our 24x7 Emergency &amp; Trauma Centre directly or dial +91 92633 97076.</li>
                </ul>
              </div>

              {/* SIGN-OFF & STAMP SECTION */}
              <div className="flex items-end justify-between gap-4 pt-6 mt-4 border-t border-slate-200">
                <div className="text-[9px] text-slate-400 leading-tight">
                  <div className="font-mono text-slate-600 text-[10px] font-bold">Ref: {appointment.booking_reference}</div>
                  <div>System generated document. Valid without physical seal for OPD check-in.</div>
                  <div>Clinica Cure Hospital, Ranchi</div>
                </div>

                <div className="text-center">
                  <div className="border-b border-slate-400 w-36 mb-1" />
                  <div className="text-[10px] font-bold text-slate-700 uppercase">
                    Authorized Signatory
                  </div>
                  <div className="text-[9px] text-slate-400">Reception / Desk Officer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons (Screen Only) */}
          <div className="no-print bg-slate-50 px-5 py-3 border-t border-slate-200 flex items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500 hidden sm:block">
              Print this slip for patient registration or records.
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 sm:flex-none px-5 py-2 text-xs font-bold bg-[#0E746D] text-white rounded-lg hover:bg-[#0b5e58] flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
              >
                <Printer className="w-4 h-4 text-[#FFCC00]" />
                <span>Print Slip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
