'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Mail,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  User,
  ArrowRight,
} from 'lucide-react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { PageHeader } from '../components/PageHeader'
import { StatusBadge } from '../components/StatusBadge'
import { LoadingState } from '../components/LoadingState'
import { EmptyState } from '../components/EmptyState'
import { fetchEnquiries, updateEnquiryStatus } from '../services/enquiries'
import { EnquiryRecord } from '../types'

export default function EnquiriesPage() {
  const [loading, setLoading] = useState(true)
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const loadData = async () => {
    setLoading(true)
    const data = await fetchEnquiries()
    setEnquiries(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()

    const onUpdate = () => {
      loadData()
    }

    window.addEventListener('clinicacure_enquiry_created', onUpdate)
    window.addEventListener('clinicacure_enquiry_updated', onUpdate)
    window.addEventListener('storage', onUpdate)
    window.addEventListener('focus', onUpdate)

    return () => {
      window.removeEventListener('clinicacure_enquiry_created', onUpdate)
      window.removeEventListener('clinicacure_enquiry_updated', onUpdate)
      window.removeEventListener('storage', onUpdate)
      window.removeEventListener('focus', onUpdate)
    }
  }, [])

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesSearch =
      searchQuery === '' ||
      enq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.phone.includes(searchQuery) ||
      enq.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enq.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || enq.status === statusFilter

    return matchesSearch && matchesStatus
  })

  if (loading) {
    return <LoadingState message="Loading patient enquiries CRM..." />
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Patient Enquiries' }]} />

      <PageHeader
        title="Patient Enquiries &amp; Public Contact CRM"
        description="Review inbound messages from the website contact page, assign tickets, and log internal staff notes."
      />

      {/* Filter and Search */}
      <div className="p-4 bg-white border border-[#E5EAF0] rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by patient name, phone, subject, or message text..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#E5EAF0] rounded-lg focus:outline-hidden bg-[#F7F8FA]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="py-2 px-3 text-xs font-medium border border-[#E5EAF0] rounded-lg bg-white text-[#172033] focus:outline-hidden cursor-pointer"
        >
          <option value="all">All Enquiry Statuses</option>
          <option value="new">New / Unread</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {filteredEnquiries.length === 0 ? (
        <EmptyState
          title="No Inquiries Found"
          description="There are no patient inquiries matching your filter criteria."
        />
      ) : (
        <div className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F8FA] text-[#5F6B7A] border-b border-[#E5EAF0] uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Ref &amp; Date</th>
                  <th className="py-3 px-4">Patient / Sender</th>
                  <th className="py-3 px-4">Inquiry Subject &amp; Note</th>
                  <th className="py-3 px-4">Assigned Desk</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF0]">
                {filteredEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#F7F8FA] transition-colors">
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-[#172033] block">{enq.reference_no}</span>
                      <span className="text-[10px] text-[#5F6B7A]">
                        {new Date(enq.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#172033] block">{enq.name}</span>
                      <span className="text-[11px] text-[#5F6B7A]">{enq.phone}</span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="font-bold text-[#172033] block truncate">
                        {enq.subject || 'General Medical Inquiry'}
                      </span>
                      <p className="text-[11px] text-[#5F6B7A] line-clamp-1 mt-0.5">
                        {enq.message}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#172033]">
                        {enq.assigned_to || 'Front Desk'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={enq.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/enquiries/${enq.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#172033] bg-[#F7F8FA] hover:bg-[#E5EAF0] border border-[#E5EAF0] rounded-md transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
