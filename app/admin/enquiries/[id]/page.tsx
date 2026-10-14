'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Mail,
  User,
  Phone,
  Clock,
  ArrowLeft,
  CheckCircle2,
  MessageSquare,
  Send,
  AlertCircle,
} from 'lucide-react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageHeader } from '../../components/PageHeader'
import { StatusBadge } from '../../components/StatusBadge'
import { LoadingState } from '../../components/LoadingState'
import { fetchEnquiries, updateEnquiryStatus, addEnquiryNote } from '../../services/enquiries'
import { EnquiryRecord } from '../../types'

export default function EnquiryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [loading, setLoading] = useState(true)
  const [enquiry, setEnquiry] = useState<EnquiryRecord | null>(null)
  const [newNote, setNewNote] = useState('')
  const [isSubmittingNote, setIsSubmittingNote] = useState(false)

  const loadData = async () => {
    setLoading(true)
    const all = await fetchEnquiries()
    const found = all.find((e) => e.id === id || e.reference_no === id)
    if (found) {
      setEnquiry(found)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [id])

  if (loading) {
    return <LoadingState message="Loading enquiry thread..." />
  }

  if (!enquiry) {
    return (
      <div className="p-8 text-center bg-white border border-[#E5EAF0] rounded-xl">
        <AlertCircle className="w-8 h-8 text-[#DC2626] mx-auto mb-2" />
        <h2 className="text-base font-bold text-[#172033]">Enquiry Not Found</h2>
        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-4 text-xs font-bold text-white bg-[#172033] rounded-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Enquiries</span>
        </Link>
      </div>
    )
  }

  const handleStatusChange = async (status: EnquiryRecord['status']) => {
    await updateEnquiryStatus(enquiry.id, status)
    loadData()
  }

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return
    setIsSubmittingNote(true)
    await addEnquiryNote(enquiry.id, 'Front Desk Staff', newNote.trim())
    setNewNote('')
    setIsSubmittingNote(false)
    loadData()
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Enquiries', href: '/admin/enquiries' },
          { label: enquiry.reference_no },
        ]}
      />

      <PageHeader
        title={`Enquiry: ${enquiry.reference_no}`}
        description={`Submitted by ${enquiry.name} on ${new Date(enquiry.created_at).toLocaleDateString()}`}
        actions={
          <div className="flex items-center gap-2">
            {enquiry.status !== 'resolved' && (
              <button
                type="button"
                onClick={() => handleStatusChange('resolved')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#16A34A] hover:bg-[#15803D] rounded-lg transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Resolved</span>
              </button>
            )}

            {enquiry.status === 'resolved' && (
              <button
                type="button"
                onClick={() => handleStatusChange('in_progress')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#172033] bg-[#FEF3C7] hover:bg-[#FDE68A] rounded-lg transition-colors cursor-pointer"
              >
                <span>Re-open Ticket</span>
              </button>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Original Message Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5EAF0]">
              <span className="text-xs font-bold text-[#5F6B7A] uppercase tracking-wider">
                Submitted Message Text
              </span>
              <StatusBadge status={enquiry.status} />
            </div>

            <h3 className="font-bold text-base text-[#172033]">
              {enquiry.subject || 'General Inquiry'}
            </h3>

            <div className="p-4 bg-[#F7F8FA] border border-[#E5EAF0] rounded-lg text-xs leading-relaxed text-[#172033]">
              {enquiry.message}
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <span className="text-[#5F6B7A] block">Sender Phone</span>
                <span className="font-bold text-[#172033] block mt-0.5">{enquiry.phone}</span>
              </div>
              <div>
                <span className="text-[#5F6B7A] block">Sender Email</span>
                <span className="font-medium text-[#172033] block mt-0.5">{enquiry.email || 'None'}</span>
              </div>
            </div>
          </div>

          {/* Internal Notes Thread */}
          <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#172033] flex items-center gap-2 pb-3 border-b border-[#E5EAF0]">
              <MessageSquare className="w-4 h-4 text-[#FFCC00]" />
              <span>Internal Staff Resolution Notes</span>
            </h3>

            <div className="space-y-3">
              {(enquiry.internal_notes || []).length === 0 ? (
                <p className="text-xs text-[#5F6B7A] italic">No internal notes logged yet.</p>
              ) : (
                enquiry.internal_notes?.map((n) => (
                  <div key={n.id} className="p-3 bg-[#FFF9DB] border border-[#FFCC00]/40 rounded-lg text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#806600]">{n.author}</span>
                      <span className="text-[10px] text-[#A0AEC0]">{n.date}</span>
                    </div>
                    <p className="text-[#172033]">{n.note}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
              <input
                type="text"
                required
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log internal action (e.g. Called patient, scheduled for OPD)..."
                className="flex-1 px-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={isSubmittingNote}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#172033] bg-[#FFCC00] hover:bg-[#E6B800] rounded-lg cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right: Ticket Details */}
        <div className="space-y-4">
          <div className="p-5 bg-white border border-[#E5EAF0] rounded-xl shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-[#172033] pb-2 border-b border-[#E5EAF0]">
              Assignment &amp; Routing
            </h3>

            <div className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#5F6B7A]">Assigned Desk:</span>
                <span className="font-bold text-[#172033]">{enquiry.assigned_to || 'Front Desk'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5F6B7A]">Submission Date:</span>
                <span className="font-medium">{new Date(enquiry.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E5EAF0]">
              <label className="block text-xs font-bold text-[#172033] mb-1.5">Change Status</label>
              <select
                value={enquiry.status}
                onChange={(e) => handleStatusChange(e.target.value as any)}
                className="w-full p-2 text-xs border border-[#E5EAF0] rounded-lg bg-white font-medium"
              >
                <option value="new">New / Unread</option>
                <option value="in_progress">In Progress</option>
                <option value="waiting">Waiting for Patient Response</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed / Archived</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
