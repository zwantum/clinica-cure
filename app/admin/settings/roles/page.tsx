'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  ShieldCheck,
  Check,
  X,
  Save,
  Plus,
  RotateCcw,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageHeader } from '../../components/PageHeader'
import {
  getRolePermissions,
  saveRolePermissions,
  SYSTEM_ROLE_PERMISSIONS,
} from '../../lib/permissions'
import { RoleSlug, AdminModule, PermissionMatrix } from '../../types'

export default function RolesPermissionsPage() {
  const [selectedRole, setSelectedRole] = useState<RoleSlug>('super_admin')
  const [matrix, setMatrix] = useState<PermissionMatrix>(SYSTEM_ROLE_PERMISSIONS.super_admin)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Custom role creation modal state
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [newRoleName, setNewRoleName] = useState('')
  const [newRoleDesc, setNewRoleDesc] = useState('')

  const [rolesList, setRolesList] = useState<Array<{ slug: RoleSlug; name: string; desc: string }>>([
    { slug: 'super_admin', name: 'Super Administrator', desc: 'Unrestricted clinical, staff, and system settings authority' },
    { slug: 'appointment_staff', name: 'Appointment Staff', desc: 'OPD queue management, patient verification, and token issuance' },
    { slug: 'doctor_manager', name: 'Doctor & Availability Manager', desc: 'Specialist roster updates, weekly consultation sessions, and leaves' },
    { slug: 'blood_bank_staff', name: 'Blood Bank Officer', desc: 'Blood component unit audit, stock adjustments, and urgent requests' },
    { slug: 'enquiries_staff', name: 'Enquiries Desk', desc: 'Public website contact messages and internal notes follow-up' },
  ])

  // Load active matrix for selected role
  useEffect(() => {
    const current = getRolePermissions(selectedRole)
    setMatrix(JSON.parse(JSON.stringify(current)))
  }, [selectedRole])

  const modules: Array<{ id: AdminModule; name: string; specialAction: string }> = [
    { id: 'overview', name: 'Overview Dashboard', specialAction: 'Live hospital KPIs' },
    { id: 'appointments', name: 'Appointments Desk', specialAction: 'Confirm, Cancel, Reschedule, Complete' },
    { id: 'doctors', name: 'Doctors Roster', specialAction: 'Unpublish, On-duty/Leave Toggle' },
    { id: 'availability', name: 'Consultation Timings', specialAction: 'Emergency date-specific blocks' },
    { id: 'blood-bank', name: 'Blood Bank', specialAction: 'Adjust unit quantities, Dispense to OT' },
    { id: 'enquiries', name: 'Patient Enquiries CRM', specialAction: 'Assign desk, Log internal staff notes' },
    { id: 'reviews', name: 'Google Reviews Wall', specialAction: 'Add verified patient reviews, delete or edit rating' },
    { id: 'blog', name: 'Blog Management', specialAction: 'Create, edit, schedule and publish articles' },
    { id: 'settings', name: 'Settings & RBAC', specialAction: 'Manage team logins, Modify role permissions' },
  ]

  const togglePermission = (moduleId: AdminModule, action: 'can_view' | 'can_create' | 'can_edit' | 'can_delete') => {
    // If Super Admin, warn or allow full configuration
    setMatrix((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [action]: !prev[moduleId][action],
      },
    }))
  }

  const handleSave = () => {
    setIsSaving(true)
    saveRolePermissions(selectedRole, matrix)
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleResetDefaults = () => {
    const defaults = SYSTEM_ROLE_PERMISSIONS[selectedRole]
    if (defaults) {
      setMatrix(JSON.parse(JSON.stringify(defaults)))
      saveRolePermissions(selectedRole, defaults)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
  }

  const handleCreateCustomRole = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoleName.trim()) return
    const slug = newRoleName.toLowerCase().replace(/[^a-z0-9]+/g, '_') as RoleSlug
    const newRole = {
      slug,
      name: newRoleName,
      desc: newRoleDesc || 'Custom tailored administrative access role',
    }
    setRolesList([...rolesList, newRole])
    // Default matrix with overview enabled
    const customDefault: PermissionMatrix = {
      overview: { can_view: true, can_create: false, can_edit: false, can_delete: false },
      appointments: { can_view: false, can_create: false, can_edit: false, can_delete: false },
      doctors: { can_view: false, can_create: false, can_edit: false, can_delete: false },
      availability: { can_view: false, can_create: false, can_edit: false, can_delete: false },
      'blood-bank': { can_view: false, can_create: false, can_edit: false, can_delete: false },
      enquiries: { can_view: false, can_create: false, can_edit: false, can_delete: false },
      reviews: { can_view: false, can_create: false, can_edit: false, can_delete: false },
      'patient-stories': { can_view: false, can_create: false, can_edit: false, can_delete: false },
      blog: { can_view: false, can_create: false, can_edit: false, can_delete: false },
      settings: { can_view: false, can_create: false, can_edit: false, can_delete: false },
    }
    saveRolePermissions(slug, customDefault)
    setSelectedRole(slug)
    setIsCreateRoleOpen(false)
    setNewRoleName('')
    setNewRoleDesc('')
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Settings', href: '/admin/settings' },
          { label: 'Roles & Permissions (RBAC)' },
        ]}
      />

      <PageHeader
        title="Role-Based Access Control (RBAC) Matrix"
        description="Configure fine-grained module privileges. Toggle permissions below to grant or revoke specific operational capabilities."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCreateRoleOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#172033] bg-white border border-[#E5EAF0] hover:bg-[#F7F8FA] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Role</span>
            </button>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-[#5F6B7A] bg-white border border-[#E5EAF0] hover:bg-[#F7F8FA] transition-colors cursor-pointer"
              title="Reset this role to default presets"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors cursor-pointer shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Permissions'}</span>
            </button>
          </div>
        }
      />

      {saveSuccess && (
        <div className="p-3 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Role permissions updated successfully! Live guards and sidebars will enforce these rules immediately.</span>
        </div>
      )}

      {/* Role Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {rolesList.map((r) => (
          <button
            key={r.slug}
            type="button"
            onClick={() => setSelectedRole(r.slug)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedRole === r.slug
                ? 'bg-[#172033] text-[#FFCC00] shadow-xs'
                : 'bg-white text-[#5F6B7A] border border-[#E5EAF0] hover:bg-[#F7F8FA]'
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* Interactive Matrix Table */}
      <div className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E5EAF0] bg-[#F7F8FA] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm text-[#172033]">
              Editing Privileges for: {rolesList.find((r) => r.slug === selectedRole)?.name}
            </h3>
            <p className="text-xs text-[#5F6B7A] mt-0.5">
              {rolesList.find((r) => r.slug === selectedRole)?.desc}
            </p>
          </div>
          <span className="text-[11px] text-[#806600] font-bold bg-[#FFF9DB] border border-[#FFCC00]/50 px-2.5 py-1 rounded-full self-start sm:self-auto">
            Click any checkbox to toggle
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] text-[#5F6B7A] border-b border-[#E5EAF0] uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Hospital Module</th>
                <th className="py-3 px-4 text-center">Can View</th>
                <th className="py-3 px-4 text-center">Can Create</th>
                <th className="py-3 px-4 text-center">Can Edit</th>
                <th className="py-3 px-4 text-center">Special Actions / Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF0]">
              {modules.map((m) => {
                const perm = matrix[m.id] || { can_view: false, can_create: false, can_edit: false, can_delete: false }
                return (
                  <tr key={m.id} className="hover:bg-[#F7F8FA] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#172033]">
                      <div>{m.name}</div>
                      <div className="text-[10.5px] text-[#5F6B7A] font-normal mt-0.5">{m.specialAction}</div>
                    </td>

                    {/* View Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <label className="inline-flex items-center justify-center cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={Boolean(perm.can_view)}
                          onChange={() => togglePermission(m.id, 'can_view')}
                          className="w-4 h-4 rounded border-[#E5EAF0] text-[#172033] focus:ring-[#FFCC00] cursor-pointer"
                        />
                      </label>
                    </td>

                    {/* Create Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <label className="inline-flex items-center justify-center cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={Boolean(perm.can_create)}
                          onChange={() => togglePermission(m.id, 'can_create')}
                          className="w-4 h-4 rounded border-[#E5EAF0] text-[#172033] focus:ring-[#FFCC00] cursor-pointer"
                        />
                      </label>
                    </td>

                    {/* Edit Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <label className="inline-flex items-center justify-center cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={Boolean(perm.can_edit)}
                          onChange={() => togglePermission(m.id, 'can_edit')}
                          className="w-4 h-4 rounded border-[#E5EAF0] text-[#172033] focus:ring-[#FFCC00] cursor-pointer"
                        />
                      </label>
                    </td>

                    {/* Delete / Special Action Checkbox */}
                    <td className="py-3.5 px-4 text-center">
                      <label className="inline-flex items-center justify-center cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={Boolean(perm.can_delete)}
                          onChange={() => togglePermission(m.id, 'can_delete')}
                          className="w-4 h-4 rounded border-[#E5EAF0] text-[#172033] focus:ring-[#FFCC00] cursor-pointer"
                        />
                      </label>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Create Custom Role */}
      {isCreateRoleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 border border-[#E5EAF0] shadow-2xl text-[#172033] animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-base mb-1">Create Custom Hospital Role</h3>
            <p className="text-xs text-[#5F6B7A] mb-4">
              Define a new administrative role with tailor-made access privileges across the 6 modules.
            </p>

            <form onSubmit={handleCreateCustomRole} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Night Duty OPD Supervisor"
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Role Description</label>
                <textarea
                  rows={2}
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Operational scope and responsibility..."
                  className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateRoleOpen(false)}
                  className="px-3.5 py-2 text-xs text-[#5F6B7A] hover:bg-[#F7F8FA] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] rounded-lg"
                >
                  Create Role &amp; Set Permissions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
