'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Droplet,
  Clock,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Building,
} from 'lucide-react'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { PageHeader } from '../../components/PageHeader'
import { StatusBadge } from '../../components/StatusBadge'
import { LoadingState } from '../../components/LoadingState'
import { EmptyState } from '../../components/EmptyState'
import { fetchBloodRequests, updateBloodRequestStatus } from '../../services/blood-bank'
import { BloodRequestRecord } from '../../types'

export default function BloodRequestsPage() {
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState<BloodRequestRecord[]>([])

  const loadData = async () => {
    setLoading(true)
    const data = await fetchBloodRequests()
    setRequests(data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()

    const onReqUpdate = () => {
      loadData()
    }

    window.addEventListener('clinicacure_blood_request_created', onReqUpdate)
    window.addEventListener('storage', onReqUpdate)
    window.addEventListener('focus', onReqUpdate)

    return () => {
      window.removeEventListener('clinicacure_blood_request_created', onReqUpdate)
      window.removeEventListener('storage', onReqUpdate)
      window.removeEventListener('focus', onReqUpdate)
    }
  }, [])

  const handleStatus = async (id: string, status: BloodRequestRecord['status']) => {
    await updateBloodRequestStatus(id, status)
    loadData()
  }

  if (loading) {
    return <LoadingState message="Loading emergency blood requests..." />
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Blood Bank', href: '/admin/blood-bank' },
          { label: 'Emergency Requests' },
        ]}
      />

      <PageHeader
        title="Emergency &amp; Ward Blood Requests"
        description="Verify requisition orders from ICUs, Modular Operating Theatres, and institutional tie-ups."
      />

      {requests.length === 0 ? (
        <EmptyState
          title="No Active Blood Requisitions"
          description="All incoming ward requisitions have been fulfilled or dispatched."
        />
      ) : (
        <div className="bg-white border border-[#E5EAF0] rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F8FA] text-[#5F6B7A] border-b border-[#E5EAF0] uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Requisition Ref</th>
                  <th className="py-3 px-4">Requester &amp; Ward</th>
                  <th className="py-3 px-4">Group &amp; Units</th>
                  <th className="py-3 px-4">Urgency</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5EAF0]">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-[#F7F8FA] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#172033]">
                      {req.reference_no}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#172033] block">
                        {req.patient_name || req.requester_name}
                      </span>
                      {req.patient_name && req.requester_name && req.patient_name !== req.requester_name && (
                        <span className="text-[10px] text-[#5F6B7A] block">Req by: {req.requester_name}</span>
                      )}
                      <span className="text-[11px] text-[#5F6B7A] block">{req.hospital_ward} • {req.contact_phone}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded font-black text-xs bg-[#DC2626]/10 text-[#DC2626]">
                          {req.blood_group}
                        </span>
                        <span className="font-bold text-[#172033]">{req.units_needed} units</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                          req.urgency_level === 'Emergency'
                            ? 'bg-[#FEE2E2] text-[#DC2626]'
                            : 'bg-[#FEF3C7] text-[#D97706]'
                        }`}
                      >
                        {req.urgency_level}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {req.status === 'received' && (
                          <button
                            type="button"
                            onClick={() => handleStatus(req.id, 'under_review')}
                            className="px-2 py-1 bg-[#2563EB] text-white rounded text-[11px] font-bold hover:bg-[#1D4ED8]"
                          >
                            Review
                          </button>
                        )}
                        {req.status === 'under_review' && (
                          <button
                            type="button"
                            onClick={() => handleStatus(req.id, 'fulfilled')}
                            className="px-2 py-1 bg-[#16A34A] text-white rounded text-[11px] font-bold hover:bg-[#15803D]"
                          >
                            Dispense
                          </button>
                        )}
                        {req.status !== 'rejected' && req.status !== 'fulfilled' && (
                          <button
                            type="button"
                            onClick={() => handleStatus(req.id, 'rejected')}
                            className="px-2 py-1 bg-[#FEE2E2] text-[#DC2626] rounded text-[11px] font-bold hover:bg-[#FECACA]"
                          >
                            Reject
                          </button>
                        )}
                      </div>
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
