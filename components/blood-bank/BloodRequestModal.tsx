'use client'

import { useState, useEffect } from 'react'
import {
  X,
  Droplet,
  PhoneCall,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
} from 'lucide-react'
import { siteConfig } from '@/config/site'
import { createBloodRequest, getAvailableBloodGroups, BASE_BLOOD_GROUPS } from '@/app/admin/services/blood-bank'

interface BloodRequestModalProps {
  isOpen: boolean
  onClose: () => void
  initialBloodGroup?: string
}

export default function BloodRequestModal({
  isOpen,
  onClose,
  initialBloodGroup = 'O+',
}: BloodRequestModalProps) {
  const [bloodGroups, setBloodGroups] = useState<string[]>(BASE_BLOOD_GROUPS)
  const [bloodGroup, setBloodGroup] = useState(initialBloodGroup || 'O+')
  const [customGroup, setCustomGroup] = useState('')
  const [patientName, setPatientName] = useState('')
  const [hospitalName, setHospitalName] = useState('Clinica Cure Hospital, Bariatu')
  const [unitsNeeded, setUnitsNeeded] = useState('1')
  const [urgency, setUrgency] = useState<'Immediate (Emergency)' | 'Within 2-4 Hours' | 'Scheduled / Tomorrow'>('Immediate (Emergency)')
  const [contactPhone, setContactPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [referenceNo, setReferenceNo] = useState('')

  const loadGroups = async () => {
    const list = await getAvailableBloodGroups()
    if (list && list.length > 0) {
      setBloodGroups(list)
    }
  }

  useEffect(() => {
    loadGroups()

    const onUpdate = () => {
      loadGroups()
    }

    window.addEventListener('clinicacure_blood_stock_updated', onUpdate)
    window.addEventListener('storage', onUpdate)
    window.addEventListener('focus', onUpdate)

    return () => {
      window.removeEventListener('clinicacure_blood_stock_updated', onUpdate)
      window.removeEventListener('storage', onUpdate)
      window.removeEventListener('focus', onUpdate)
    }
  }, [])

  useEffect(() => {
    if (initialBloodGroup) {
      setBloodGroup(initialBloodGroup)
    }
  }, [initialBloodGroup])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!patientName || !contactPhone) {
      alert('Please fill out patient name and contact phone.')
      return
    }

    const chosenGroup = bloodGroup === 'Other' ? (customGroup.trim().toUpperCase() || 'Other') : bloodGroup

    setSubmitting(true)
    try {
      const urgencyMap: Record<string, 'Emergency' | 'Urgent' | 'Routine'> = {
        'Immediate (Emergency)': 'Emergency',
        'Within 2-4 Hours': 'Urgent',
        'Scheduled / Tomorrow': 'Routine',
      }
      const res = await createBloodRequest({
        patient_name: patientName,
        contact_phone: contactPhone,
        blood_group: chosenGroup,
        units_needed: Number(unitsNeeded) || 1,
        hospital_ward: hospitalName || 'Clinica Cure Emergency / Ward',
        urgency_level: urgencyMap[urgency] || 'Urgent',
      })
      if (res.data?.reference_no) {
        setReferenceNo(res.data.reference_no)
      }
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setPatientName('')
    setContactPhone('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-xl">
              Blood Request Dispatched
            </h3>
            {referenceNo && (
              <div className="inline-block px-3 py-1 bg-slate-100 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800">
                Requisition Ref: {referenceNo}
              </div>
            )}
            <p className="text-[14px] sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              We received your urgent request for <strong className="text-red-600">{unitsNeeded} Unit(s) of {bloodGroup}</strong>. Our on-duty blood bank medical officer has been alerted and will call <strong>{contactPhone}</strong> within 3 minutes.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 text-left">
              <strong>Emergency Note:</strong> Please ensure the patient blood sample tube and original Doctor Cross-Match requisition slip are ready for delivery to our Bariatu ground floor counter.
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-[#0E746D] hover:bg-[#0b5c56] text-white text-xs font-bold cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Title */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Droplet className="w-5 h-5 fill-red-600" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl">
                  Request Blood Units
                </h3>
                <p className="text-[13.5px] sm:text-xs text-slate-500">
                  24×7 Rapid Clinical Cross-Match Desk
                </p>
              </div>
            </div>

            {/* Direct Helpline Banner */}
            <div className="my-4 p-3.5 rounded-2xl bg-red-50/80 border border-red-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                <span className="text-xs font-bold text-red-900">Critical Immediate Need?</span>
              </div>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Emergency</span>
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 mt-2">
              <div className="grid grid-cols-2 gap-3">
                {/* Blood Group */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer"
                    required
                  >
                    {bloodGroups.map((grp) => (
                      <option key={grp} value={grp}>
                        {grp}
                      </option>
                    ))}
                    <option value="Other">Other / Rare Group</option>
                  </select>

                  {bloodGroup === 'Other' && (
                    <input
                      type="text"
                      required
                      value={customGroup}
                      onChange={(e) => setCustomGroup(e.target.value)}
                      placeholder="Specify (e.g. Bombay hh)"
                      className="w-full mt-2 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-none focus:border-red-500"
                    />
                  )}
                </div>

                {/* Units Needed */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Units Needed <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={unitsNeeded}
                    onChange={(e) => setUnitsNeeded(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    required
                  >
                    {[1, 2, 3, 4, 5, 6].map((u) => (
                      <option key={u} value={u}>
                        {u} Unit{u > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  required
                />
              </div>

              {/* Hospital / Ward */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hospital &amp; Ward / Bed No.
                </label>
                <input
                  type="text"
                  placeholder="e.g. Clinica Cure ICU / Bed 04"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Immediate (Emergency)', 'Within 2-4 Hours', 'Scheduled / Tomorrow'] as const).map((urg) => (
                    <button
                      key={urg}
                      type="button"
                      onClick={() => setUrgency(urg)}
                      className={`py-2 px-2 rounded-xl text-[11px] font-bold text-center border transition-all cursor-pointer ${
                        urgency === urg
                          ? 'bg-red-50 border-red-500 text-red-700'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {urg.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attendant Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Attendant Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                  required
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-display font-bold text-xs sm:text-sm transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Priority Requisition</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
