'use client'

import React, { useState, useEffect } from 'react'
import { Save, CheckCircle2, Clock } from 'lucide-react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageHeader } from '../../components/PageHeader'
import { LoadingState } from '../../components/LoadingState'
import { fetchBookingConfig, updateBookingConfig, BookingConfig } from '../../services/team'

export default function BookingSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [config, setConfig] = useState<BookingConfig | null>(null)
  const [savedSuccess, setSavedSuccess] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const data = await fetchBookingConfig()
      setConfig(data)
      setLoading(false)
    }
    load()
  }, [])

  if (loading || !config) {
    return <LoadingState message="Loading hospital booking parameters..." />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateBookingConfig(config)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Settings', href: '/admin/settings' },
          { label: 'Booking Configuration' },
        ]}
      />

      <PageHeader
        title="Global OPD Booking Parameters"
        description="Set lead times, default session slot durations, and emergency cancellation cutoff rules."
      />

      {savedSuccess && (
        <div className="p-3 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Booking parameters updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          <div>
            <label className="block font-bold text-[#172033] mb-1">
              Minimum Advance Booking Window (Hours)
            </label>
            <input
              type="number"
              value={config.minAdvanceHours}
              onChange={(e) => setConfig({ ...config, minAdvanceHours: parseInt(e.target.value) || 2 })}
              className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg"
            />
            <span className="text-[10.5px] text-[#5F6B7A] mt-1 block">
              Prevents patients from booking slots starting in under X hours.
            </span>
          </div>

          <div>
            <label className="block font-bold text-[#172033] mb-1">
              Maximum Booking Window (Days in Advance)
            </label>
            <input
              type="number"
              value={config.maxAdvanceDays}
              onChange={(e) => setConfig({ ...config, maxAdvanceDays: parseInt(e.target.value) || 30 })}
              className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg"
            />
            <span className="text-[10.5px] text-[#5F6B7A] mt-1 block">
              Furthest date into the future open for OPD reservations.
            </span>
          </div>

          <div>
            <label className="block font-bold text-[#172033] mb-1">
              Default Slot Duration (Minutes)
            </label>
            <input
              type="number"
              value={config.defaultSlotMinutes}
              onChange={(e) => setConfig({ ...config, defaultSlotMinutes: parseInt(e.target.value) || 20 })}
              className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg"
            />
            <span className="text-[10.5px] text-[#5F6B7A] mt-1 block">
              Default appointment duration when not overridden by a specialist.
            </span>
          </div>

          <div>
            <label className="block font-bold text-[#172033] mb-1">
              Emergency Hospital Helpline
            </label>
            <input
              type="text"
              value={config.emergencyHotline}
              onChange={(e) => setConfig({ ...config, emergencyHotline: e.target.value })}
              className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg"
            />
            <span className="text-[10.5px] text-[#5F6B7A] mt-1 block">
              Printed on emergency token slips and patient SMS.
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-[#E5EAF0] flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] rounded-lg cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  )
}
