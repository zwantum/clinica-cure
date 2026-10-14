'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Droplet,
  Plus,
  Minus,
  AlertTriangle,
  Clock,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import { LoadingState } from '../components/LoadingState'
import { fetchBloodStock, adjustBloodStock, addBloodStockGroup } from '../services/blood-bank'
import { BloodStockRecord } from '../types'

export default function BloodBankStockPage() {
  const [loading, setLoading] = useState(true)
  const [stock, setStock] = useState<BloodStockRecord[]>([])
  const [adjustModal, setAdjustModal] = useState<{ group: string; delta: number; component?: string } | null>(null)
  const [adjustReason, setAdjustReason] = useState('')

  // Add New Blood Group Modal State
  const [showAddModal, setShowAddModal] = useState(false)
  const [newGroup, setNewGroup] = useState('O+')
  const [customGroup, setCustomGroup] = useState('')
  const [newComponentType, setNewComponentType] = useState('Whole Blood')
  const [newUnits, setNewUnits] = useState(10)
  const [newThreshold, setNewThreshold] = useState(4)
  const [isSavingGroup, setIsSavingGroup] = useState(false)

  const loadData = async () => {
    setLoading(true)
    const data = await fetchBloodStock()
    setStock(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()

    const onStockUpdate = () => {
      loadData()
    }

    window.addEventListener('clinicacure_blood_stock_updated', onStockUpdate)
    window.addEventListener('storage', onStockUpdate)
    window.addEventListener('focus', onStockUpdate)

    return () => {
      window.removeEventListener('clinicacure_blood_stock_updated', onStockUpdate)
      window.removeEventListener('storage', onStockUpdate)
      window.removeEventListener('focus', onStockUpdate)
    }
  }, [])

  const handleConfirmAdjust = async () => {
    if (adjustModal) {
      await adjustBloodStock(
        adjustModal.group,
        adjustModal.delta,
        adjustReason || 'Routine stock audit',
        adjustModal.component
      )
      setAdjustModal(null)
      setAdjustReason('')
      loadData()
    }
  }

  const handleAddBloodGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    const groupName = newGroup === 'Other' ? customGroup.trim().toUpperCase() : newGroup.trim().toUpperCase()
    if (!groupName) {
      alert('Please enter or select a valid blood group.')
      return
    }

    setIsSavingGroup(true)
    try {
      await addBloodStockGroup({
        blood_group: groupName,
        component_type: newComponentType,
        available_units: Number(newUnits) || 0,
        min_threshold: Number(newThreshold) || 3,
      })
      setShowAddModal(false)
      setCustomGroup('')
      loadData()
    } finally {
      setIsSavingGroup(false)
    }
  }

  if (loading) {
    return <LoadingState message="Loading blood bank inventory..." />
  }

  const criticalGroups = stock.filter((s) => s.status === 'critical')

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Blood Bank' }, { label: 'Inventory Stock' }]} />

      <PageHeader
        title="Blood Bank Inventory &amp; Stock Audit"
        description="Real-time component units across all 8 blood groups with audit logs and minimum threshold monitoring."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#0E746D] hover:bg-[#0b5e58] shadow-xs cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Blood Group / Component</span>
            </button>
            <Link
              href="/admin/blood-bank/requests"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#172033] bg-white border border-[#E5EAF0] hover:bg-[#F7F8FA]"
            >
              <Clock className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>Emergency Requests</span>
            </Link>
            <Link
              href="/admin/blood-bank/donations"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] shadow-xs"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Donor Records</span>
            </Link>
          </div>
        }
      />

      {/* Critical Stock Warning Banner */}
      {criticalGroups.length > 0 && (
        <div className="p-4 rounded-xl bg-[#FEE2E2] border border-[#FECACA] flex items-center justify-between text-[#DC2626]">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              <h2 className="text-xs font-bold sm:text-sm">
                Urgent Replenishment Required ({criticalGroups.length} Groups in Deficit)
              </h2>
              <p className="text-xs text-[#DC2626]/80 mt-0.5">
                {criticalGroups.map((c) => `${c.blood_group} (${c.available_units} units)`).join(', ')} are below safety reserve levels.
              </p>
            </div>
          </div>
          <Link
            href="/admin/blood-bank/requests"
            className="text-xs font-bold bg-[#DC2626] text-white px-3 py-1.5 rounded-lg shrink-0"
          >
            Review Pipeline →
          </Link>
        </div>
      )}

      {/* Clean Operational Stock Table */}
      <div className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E5EAF0] flex items-center justify-between">
          <h2 className="font-bold text-sm text-[#172033]">Live Blood Component Units (Whole Blood / PRBC)</h2>
          <span className="text-xs text-[#5F6B7A]">Updated: Just now</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] text-[#5F6B7A] border-b border-[#E5EAF0] uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Blood Group</th>
                <th className="py-3 px-4">Component Type</th>
                <th className="py-3 px-4">Available Units</th>
                <th className="py-3 px-4">Min Threshold</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4 text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF0]">
              {stock.map((item) => (
                <tr key={`${item.blood_group}-${item.component_type}`} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center shrink-0">
                        <Droplet className="w-4 h-4 fill-[#DC2626]" />
                      </div>
                      <span className="font-bold text-sm text-[#172033] whitespace-nowrap">
                        {item.blood_group}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-[#172033]">{item.component_type}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-base text-[#172033]">{item.available_units}</span>
                    <span className="text-[11px] text-[#5F6B7A] ml-1">units</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-[#5F6B7A] font-medium">{item.min_threshold} units</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setAdjustModal({ group: item.blood_group, delta: -1, component: item.component_type })}
                        disabled={item.available_units === 0}
                        title="Deduct 1 unit (Dispense to OT/Ward)"
                        className="p-1.5 rounded-md border border-[#E5EAF0] text-[#DC2626] hover:bg-[#FEE2E2] disabled:opacity-40 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdjustModal({ group: item.blood_group, delta: 1, component: item.component_type })}
                        title="Add 1 unit (Inflow / Tested)"
                        className="p-1.5 rounded-md border border-[#E5EAF0] text-[#16A34A] hover:bg-[#DCFCE7] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Adjustment Reason Modal */}
      {adjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 border border-[#E5EAF0] shadow-xl text-[#172033]">
            <h3 className="font-bold text-sm mb-1">
              {adjustModal.delta > 0 ? 'Record Stock Intake' : 'Record Blood Unit Dispense'}
            </h3>
            <p className="text-xs text-[#5F6B7A] mb-3">
              {adjustModal.delta > 0 ? 'Adding +1 unit' : 'Deducting -1 unit'} for group{' '}
              <strong className="text-[#DC2626]">{adjustModal.group}</strong>. Please record the clinical audit reason:
            </p>

            <input
              type="text"
              autoFocus
              value={adjustReason}
              onChange={(e) => setAdjustReason(e.target.value)}
              placeholder={adjustModal.delta > 0 ? 'e.g. Inflow from Rotary Blood Camp' : 'e.g. Dispensed to ICU Bed 14'}
              className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg mb-4"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setAdjustModal(null)}
                className="px-3 py-1.5 text-xs text-[#5F6B7A] hover:bg-[#F7F8FA] rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAdjust}
                className="px-4 py-1.5 text-xs font-bold text-white bg-[#172033] hover:bg-[#0F172A] rounded-lg cursor-pointer"
              >
                Save Audit Record
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal: Add New Blood Group / Component Entry */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-[#E5EAF0] shadow-2xl text-[#172033] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E5EAF0] mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0E746D]/10 text-[#0E746D] flex items-center justify-center">
                <Droplet className="w-4 h-4 fill-[#0E746D]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#172033]">Add Blood Group / Component Entry</h3>
                <p className="text-[11px] text-[#5F6B7A]">Register stock inventory for rare types or specific blood products</p>
              </div>
            </div>

            <form onSubmit={handleAddBloodGroup} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                {/* Blood Group Select */}
                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-1">
                    Blood Group <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg font-bold bg-white"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="Other">Other / Rare Group</option>
                  </select>
                </div>

                {/* Component Type */}
                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-1">
                    Component Type
                  </label>
                  <select
                    value={newComponentType}
                    onChange={(e) => setNewComponentType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg bg-white"
                  >
                    <option value="Whole Blood">Whole Blood</option>
                    <option value="Packed Red Blood Cells (PRBC)">PRBC (Red Cells)</option>
                    <option value="Platelet Concentrate (RDP)">Platelets (RDP)</option>
                    <option value="Single Donor Platelet (SDP)">Platelets (SDP)</option>
                    <option value="Fresh Frozen Plasma (FFP)">FFP (Plasma)</option>
                    <option value="Cryoprecipitate">Cryoprecipitate</option>
                  </select>
                </div>
              </div>

              {/* Custom Blood Group Text Input (if Other selected) */}
              {newGroup === 'Other' && (
                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-1">
                    Custom / Rare Blood Group Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customGroup}
                    onChange={(e) => setCustomGroup(e.target.value)}
                    placeholder="e.g. Bombay Phenotype (Oh), Rh-null"
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                {/* Available Units */}
                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-1">
                    Initial Units in Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newUnits}
                    onChange={(e) => setNewUnits(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg font-bold"
                  />
                </div>

                {/* Minimum Safety Threshold */}
                <div>
                  <label className="block text-[11px] font-bold text-[#172033] mb-1">
                    Min Safety Reserve (Threshold)
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newThreshold}
                    onChange={(e) => setNewThreshold(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5EAF0]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-[#5F6B7A] hover:bg-[#F7F8FA] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingGroup}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0E746D] hover:bg-[#0b5e58] rounded-lg cursor-pointer shadow-xs transition-colors"
                >
                  {isSavingGroup ? 'Saving...' : 'Add Stock Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
