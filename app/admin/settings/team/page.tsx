'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users,
  Plus,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  UserCheck,
  Edit2,
  Trash2,
  Lock,
  Check,
  X,
  Sliders,
  Eye,
  EyeOff,
} from 'lucide-react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageHeader } from '../../components/PageHeader'
import { LoadingState } from '../../components/LoadingState'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import {
  fetchTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  toggleMemberActive,
  TeamMember,
} from '../../services/team'
import { SYSTEM_ROLE_PERMISSIONS } from '../../lib/permissions'
import { AdminModule, PermissionMatrix, RoleSlug } from '../../types'

const MODULE_LIST: Array<{ id: AdminModule; label: string }> = [
  { id: 'overview', label: 'Overview Dashboard' },
  { id: 'appointments', label: 'Appointments Desk' },
  { id: 'doctors', label: 'Doctors & Availability' },
  { id: 'blood-bank', label: 'Blood Bank' },
  { id: 'enquiries', label: 'Patient Enquiries CRM' },
  { id: 'settings', label: 'Hospital Settings & RBAC' },
]

export default function TeamMembersPage() {
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<TeamMember[]>([])

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('')

  // Form State
  const [memberName, setMemberName] = useState('')
  const [memberEmail, setMemberEmail] = useState('')
  const [memberPassword, setMemberPassword] = useState('clinicacure2026')
  const [showMemberPassword, setShowMemberPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState<RoleSlug>('appointment_staff')
  const [isCustomizingPermissions, setIsCustomizingPermissions] = useState(false)
  const [customPerms, setCustomPerms] = useState<PermissionMatrix>(
    JSON.parse(JSON.stringify(SYSTEM_ROLE_PERMISSIONS.appointment_staff))
  )

  const loadData = async () => {
    setLoading(true)
    const data = await fetchTeamMembers()
    setMembers(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const openAddModal = () => {
    setEditingMemberId(null)
    setMemberName('')
    setMemberEmail('')
    setMemberPassword('clinicacure2026')
    setShowMemberPassword(false)
    setSelectedRole('appointment_staff')
    setIsCustomizingPermissions(false)
    setCustomPerms(JSON.parse(JSON.stringify(SYSTEM_ROLE_PERMISSIONS.appointment_staff)))
    setIsModalOpen(true)
  }

  const openEditModal = (member: TeamMember) => {
    setEditingMemberId(member.id)
    setMemberName(member.name)
    setMemberEmail(member.email)
    setMemberPassword(member.password || 'clinicacure2026')
    setShowMemberPassword(false)
    const roleSlug = (member.roleSlug as RoleSlug) || 'appointment_staff'
    setSelectedRole(roleSlug)
    if (member.customPermissions) {
      setIsCustomizingPermissions(true)
      // Merge with default
      const base = SYSTEM_ROLE_PERMISSIONS[roleSlug] || SYSTEM_ROLE_PERMISSIONS.appointment_staff
      setCustomPerms({ ...base, ...member.customPermissions } as PermissionMatrix)
    } else {
      setIsCustomizingPermissions(false)
      const base = SYSTEM_ROLE_PERMISSIONS[roleSlug] || SYSTEM_ROLE_PERMISSIONS.appointment_staff
      setCustomPerms(JSON.parse(JSON.stringify(base)))
    }
    setIsModalOpen(true)
  }

  const handleRoleSelectChange = (role: RoleSlug) => {
    setSelectedRole(role)
    const base = SYSTEM_ROLE_PERMISSIONS[role] || SYSTEM_ROLE_PERMISSIONS.appointment_staff
    setCustomPerms(JSON.parse(JSON.stringify(base)))
  }

  const toggleCustomPerm = (
    module: AdminModule,
    action: 'can_view' | 'can_create' | 'can_edit' | 'can_delete'
  ) => {
    setCustomPerms((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action],
      },
    }))
  }

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!memberName.trim() || !memberEmail.trim()) return

    const roleNameMap: Record<string, string> = {
      super_admin: 'Super Administrator',
      appointment_staff: 'Appointment Staff',
      doctor_manager: 'Doctor & Availability Manager',
      blood_bank_staff: 'Blood Bank Officer',
      enquiries_staff: 'Enquiries Desk',
    }

    const payload = {
      name: memberName.trim(),
      email: memberEmail.trim(),
      password: memberPassword.trim() || 'clinicacure2026',
      roleSlug: selectedRole,
      roleName: roleNameMap[selectedRole] || 'Staff Member',
      isActive: true,
      customPermissions: isCustomizingPermissions ? customPerms : undefined,
    }

    if (editingMemberId) {
      await updateTeamMember(editingMemberId, payload)
      setSaveSuccessMsg('Staff member details, password, and tailored permissions updated successfully!')
    } else {
      await createTeamMember(payload)
      setSaveSuccessMsg(`New staff member ${payload.name} created with password and custom permissions!`)
    }

    setIsModalOpen(false)
    loadData()
    setTimeout(() => setSaveSuccessMsg(''), 4000)
  }

  const handleDeleteMember = async () => {
    if (deleteConfirmId) {
      await deleteTeamMember(deleteConfirmId)
      setDeleteConfirmId(null)
      loadData()
      setSaveSuccessMsg('Staff account removed.')
      setTimeout(() => setSaveSuccessMsg(''), 3000)
    }
  }

  const handleToggle = async (id: string) => {
    await toggleMemberActive(id)
    loadData()
  }

  if (loading) {
    return <LoadingState message="Loading hospital administrative accounts..." />
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Settings', href: '/admin/settings' },
          { label: 'Team Members' },
        ]}
      />

      <PageHeader
        title="Hospital Administrative Team"
        description="Add staff members, assign standard roles, or grant custom individual permissions per module."
        actions={
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Team Member</span>
          </button>
        }
      />

      {saveSuccessMsg && (
        <div className="p-3 rounded-lg bg-[#DCFCE7] border border-[#BBF7D0] text-[#16A34A] text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Team Table */}
      <div className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] text-[#5F6B7A] border-b border-[#E5EAF0] uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Email Login</th>
                <th className="py-3 px-4">Role &amp; Permissions</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5EAF0]">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-[#F7F8FA] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#FFCC00] text-[#172033] font-bold flex items-center justify-center text-xs">
                        {m.name[0]}
                      </div>
                      <div>
                        <span className="font-bold text-[#172033] block">{m.name}</span>
                        <span className="text-[10.5px] text-[#5F6B7A]">{m.lastActive}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#5F6B7A]">{m.email}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-[#172033] block">{m.roleName}</span>
                    {m.customPermissions ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#806600] bg-[#FFF9DB] border border-[#FFCC00]/60 px-1.5 py-0.2 rounded mt-0.5">
                        <Sliders className="w-3 h-3" />
                        <span>Custom Tailored Permissions</span>
                      </span>
                    ) : (
                      <span className="text-[10.5px] text-[#5F6B7A]">Standard Presets</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {m.isActive ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#DCFCE7] text-[#16A34A]">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#FEE2E2] text-[#DC2626]">
                        Suspended
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => openEditModal(m)}
                        title="Edit Staff Member & Permissions"
                        className="p-1.5 rounded-md border border-[#E5EAF0] text-[#5F6B7A] hover:text-[#172033] hover:bg-white transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Suspend / Activate Toggle */}
                      {m.roleSlug !== 'super_admin' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleToggle(m.id)}
                            className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                              m.isActive
                                ? 'bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA]'
                                : 'bg-[#DCFCE7] text-[#16A34A] hover:bg-[#BBF7D0]'
                            }`}
                          >
                            {m.isActive ? 'Suspend' : 'Activate'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(m.id)}
                            title="Delete Member"
                            className="p-1.5 rounded-md text-[#5F6B7A] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] text-[#5F6B7A] italic">Primary Admin</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Add / Edit Team Member with Custom Permissions */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 border border-[#E5EAF0] shadow-2xl text-[#172033] my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF0]">
              <div>
                <h3 className="font-bold text-base text-[#172033]">
                  {editingMemberId ? 'Edit Team Member & Access' : 'Add New Hospital Team Member'}
                </h3>
                <p className="text-xs text-[#5F6B7A] mt-0.5">
                  Assign administrative credentials and configure exact module permissions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#5F6B7A] hover:text-[#172033] font-bold text-sm cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-[#172033] mb-1">Staff Full Name *</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden focus:border-[#172033]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#172033] mb-1">Email Login Address *</label>
                  <input
                    type="email"
                    required
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="rahul.sharma@clinicacure.in"
                    className="w-full px-3 py-2 border border-[#E5EAF0] rounded-lg focus:outline-hidden focus:border-[#172033]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-[#172033] mb-1">
                    Staff Login Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showMemberPassword ? 'text' : 'password'}
                      required
                      value={memberPassword}
                      onChange={(e) => setMemberPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 pr-9 border border-[#E5EAF0] rounded-lg focus:outline-hidden focus:border-[#172033]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMemberPassword(!showMemberPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5F6B7A] hover:text-[#172033] p-1 cursor-pointer"
                      title={showMemberPassword ? 'Hide password' : 'Show password'}
                    >
                      {showMemberPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <p className="text-[10.5px] text-[#5F6B7A] mt-1">
                    Staff will use this password to sign in on <span className="font-semibold text-[#172033]">/admin/login</span>.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-[#172033] mb-1">
                    Preset Administrative Role
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => handleRoleSelectChange(e.target.value as RoleSlug)}
                    className="w-full px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg bg-white focus:outline-hidden"
                  >
                    <option value="appointment_staff">Appointment Staff (OPD Queue &amp; Tokens)</option>
                    <option value="doctor_manager">Doctor &amp; Availability Manager</option>
                    <option value="blood_bank_staff">Blood Bank Officer</option>
                    <option value="enquiries_staff">Enquiries Desk (Contact Inquiries CRM)</option>
                    <option value="super_admin">Super Administrator (Full Unrestricted Access)</option>
                  </select>
                  <p className="text-[10.5px] text-[#5F6B7A] mt-1">
                    Base permission template for this account.
                  </p>
                </div>
              </div>

              {/* Toggle for Fine-grained Custom Permissions */}
              <div className="p-3.5 bg-[#F7F8FA] border border-[#E5EAF0] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#806600]" />
                    <span className="font-bold text-xs text-[#172033]">
                      Customize Specific Module Permissions
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCustomizingPermissions}
                      onChange={(e) => setIsCustomizingPermissions(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#172033]"></div>
                  </label>
                </div>
                <p className="text-[11px] text-[#5F6B7A]">
                  Enable this to grant or restrict specific modules independently of the base role.
                </p>

                {/* Granular Module Permission Checklist */}
                {isCustomizingPermissions && (
                  <div className="pt-2 border-t border-[#E5EAF0] overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="text-[10.5px] uppercase font-bold text-[#5F6B7A] border-b border-[#E5EAF0]">
                        <tr>
                          <th className="py-2 px-2">Module</th>
                          <th className="py-2 px-2 text-center">View</th>
                          <th className="py-2 px-2 text-center">Create</th>
                          <th className="py-2 px-2 text-center">Edit</th>
                          <th className="py-2 px-2 text-center">Delete / Act</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5EAF0]">
                        {MODULE_LIST.map((m) => {
                          const p = customPerms[m.id] || {
                            can_view: false,
                            can_create: false,
                            can_edit: false,
                            can_delete: false,
                          }
                          return (
                            <tr key={m.id}>
                              <td className="py-2 px-2 font-bold text-[#172033]">{m.label}</td>
                              <td className="py-2 px-2 text-center">
                                <input
                                  type="checkbox"
                                  checked={Boolean(p.can_view)}
                                  onChange={() => toggleCustomPerm(m.id, 'can_view')}
                                  className="w-3.5 h-3.5 rounded border-[#E5EAF0] text-[#172033] focus:ring-[#FFCC00] cursor-pointer"
                                />
                              </td>
                              <td className="py-2 px-2 text-center">
                                <input
                                  type="checkbox"
                                  checked={Boolean(p.can_create)}
                                  onChange={() => toggleCustomPerm(m.id, 'can_create')}
                                  className="w-3.5 h-3.5 rounded border-[#E5EAF0] text-[#172033] focus:ring-[#FFCC00] cursor-pointer"
                                />
                              </td>
                              <td className="py-2 px-2 text-center">
                                <input
                                  type="checkbox"
                                  checked={Boolean(p.can_edit)}
                                  onChange={() => toggleCustomPerm(m.id, 'can_edit')}
                                  className="w-3.5 h-3.5 rounded border-[#E5EAF0] text-[#172033] focus:ring-[#FFCC00] cursor-pointer"
                                />
                              </td>
                              <td className="py-2 px-2 text-center">
                                <input
                                  type="checkbox"
                                  checked={Boolean(p.can_delete)}
                                  onChange={() => toggleCustomPerm(m.id, 'can_delete')}
                                  className="w-3.5 h-3.5 rounded border-[#E5EAF0] text-[#172033] focus:ring-[#FFCC00] cursor-pointer"
                                />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E5EAF0]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#5F6B7A] hover:bg-[#F7F8FA] rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {editingMemberId ? 'Save Member Changes' : 'Create Team Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteConfirmId)}
        title="Delete Team Member Account"
        message="Are you sure you want to remove this staff member? Their login session will be revoked immediately."
        confirmText="Confirm Delete"
        isDestructive={true}
        onConfirm={handleDeleteMember}
        onCancel={() => setDeleteConfirmId(null)}
      />
    </div>
  )
}
