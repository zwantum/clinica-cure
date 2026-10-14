'use client'

import { useState, useEffect } from 'react'
import {
  Droplet,
  RotateCw,
  Search,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
import { fetchBloodStock } from '@/app/admin/services/blood-bank'
import { BloodStockRecord } from '@/app/admin/types'

export interface BloodStockRow {
  group: string
  units: number
  status: 'Good Stock' | 'Available' | 'Low Stock' | 'Critical Stock'
  percentage: number
}

const DEFAULT_STOCK_ROWS: BloodStockRow[] = [
  { group: 'A+', units: 14, status: 'Good Stock', percentage: 55 },
  { group: 'A-', units: 4, status: 'Low Stock', percentage: 25 },
  { group: 'B+', units: 22, status: 'Good Stock', percentage: 70 },
  { group: 'B-', units: 6, status: 'Available', percentage: 35 },
  { group: 'O+', units: 31, status: 'Good Stock', percentage: 85 },
  { group: 'O-', units: 3, status: 'Critical Stock', percentage: 15 },
  { group: 'AB+', units: 9, status: 'Available', percentage: 40 },
  { group: 'AB-', units: 2, status: 'Critical Stock', percentage: 10 },
  { group: 'BOMBAY (HH)', units: 1, status: 'Critical Stock', percentage: 10 },
]

interface LiveBloodStockTrackerProps {
  onRequestBlood: (group?: string) => void
}

export default function LiveBloodStockTracker({
  onRequestBlood,
}: LiveBloodStockTrackerProps) {
  const [unitMode, setUnitMode] = useState<'Units' | 'Bags'>('Units')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [stockRows, setStockRows] = useState<BloodStockRow[]>(DEFAULT_STOCK_ROWS)

  const loadStock = async () => {
    try {
      const records = await fetchBloodStock()
      if (records && records.length > 0) {
        const mapped: BloodStockRow[] = records.map((r) => {
          let statusText: BloodStockRow['status'] = 'Available'
          if (r.status === 'adequate') statusText = 'Good Stock'
          else if (r.status === 'moderate') statusText = 'Available'
          else statusText = 'Critical Stock'

          return {
            group: r.blood_group,
            units: r.available_units,
            status: statusText,
            percentage: Math.min(100, Math.max(10, Math.round((r.available_units / 35) * 100))),
          }
        })
        setStockRows(mapped)
      }
    } catch {
      // fallback
    }
  }

  useEffect(() => {
    loadStock()

    const onUpdate = () => {
      loadStock()
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

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadStock()
    setTimeout(() => setIsRefreshing(false), 500)
  }

  const getStatusBadge = (status: BloodStockRow['status']) => {
    switch (status) {
      case 'Good Stock':
        return (
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/80">
            Good Stock
          </span>
        )
      case 'Available':
        return (
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-teal-50 text-[#0E746D] text-xs font-bold border border-teal-200/80">
            Available
          </span>
        )
      case 'Low Stock':
        return (
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200/80">
            Low Stock
          </span>
        )
      case 'Critical Stock':
        return (
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200/80">
            Critical Stock
          </span>
        )
    }
  }

  const getProgressBarColor = (status: BloodStockRow['status']) => {
    switch (status) {
      case 'Good Stock':
        return 'bg-emerald-500'
      case 'Available':
        return 'bg-[#0E746D]'
      case 'Low Stock':
        return 'bg-amber-500'
      case 'Critical Stock':
        return 'bg-rose-600'
    }
  }

  return (
    <section id="live-blood-stock" className="py-8 sm:py-6 md:py-7 lg:py-12 bg-white scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-5 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>

            <h2 className="font-display font-bold text-slate-900 text-2xl sm:text-3xl lg:text-4xl">
              Live Blood Group Availability
            </h2>
            <p className="text-[14px] sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Updated in real-time from our blood bank inventory. Availability may change quickly. Please confirm with our team before visiting.
            </p>
          </div>

          {/* Right Status Meta Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Last updated: Today, 02:45 PM</span>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="py-1.5 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#0E746D]' : ''}`} />
              <span>Refresh</span>
            </button>

            <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setUnitMode('Units')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${unitMode === 'Units' ? 'bg-[#0E746D] text-white shadow-2xs' : 'text-slate-600'
                  }`}
              >
                Units
              </button>
              <button
                type="button"
                onClick={() => setUnitMode('Bags')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${unitMode === 'Bags' ? 'bg-[#0E746D] text-white shadow-2xs' : 'text-slate-600'
                  }`}
              >
                Bags
              </button>
            </div>
          </div>
        </div>


        {/* Real-Time Stock Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200/90 bg-slate-50/70 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <th className="py-4 px-6">BLOOD GROUP</th>
                  <th className="py-4 px-6">AVAILABLE UNITS</th>
                  <th className="py-4 px-6">STOCK STATUS</th>
                  <th className="py-4 px-6">AVAILABILITY %</th>
                  <th className="py-4 px-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {stockRows.map((row) => (
                  <tr key={row.group} className="hover:bg-slate-50/60 transition-colors">
                    {/* Blood Group with Drop Icon */}
                    <td className="py-4 px-6 font-display font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 fill-red-600 text-red-600" />
                        <span className="text-base">{row.group}</span>
                      </div>
                    </td>

                    {/* Available Units */}
                    <td className="py-4 px-6">
                      <span className="font-display font-bold text-slate-900 text-base">{row.units}</span>{' '}
                      <span className="text-xs text-slate-500">{unitMode}</span>
                    </td>

                    {/* Stock Status Badge */}
                    <td className="py-4 px-6">
                      {getStatusBadge(row.status)}
                    </td>

                    {/* Availability Percentage & Progress Bar */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3 max-w-xs">
                        <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${getProgressBarColor(
                              row.status
                            )}`}
                            style={{ width: `${row.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-500 w-9 text-right">
                          {row.percentage}%
                        </span>
                      </div>
                    </td>

                    {/* Action Button */}
                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => onRequestBlood(row.group)}
                        className="py-1.5 px-4 rounded-xl border border-teal-600 text-[#0E746D] hover:bg-[#0E746D] hover:text-white font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >

                        <span>Request Blood</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Banner: Can't find the required blood group? */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-bold text-slate-900 text-sm">
                Can&apos;t find the required blood group?
              </p>
              <p className="text-[14px] sm:text-xs text-slate-600 mt-0.5">
                Submit a request and our team will notify you when it becomes available.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onRequestBlood()}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-display font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 shadow-xs cursor-pointer"
          >
            <span>Request Blood Availability</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
