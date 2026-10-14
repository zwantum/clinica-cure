import React from 'react'

export type BadgeVariant = 'success' | 'warning' | 'emergency' | 'info' | 'neutral'

interface StatusBadgeProps {
  status: string
  variant?: BadgeVariant
  className?: string
}

export function StatusBadge({ status, variant, className = '' }: StatusBadgeProps) {
  // Infer variant if not explicitly provided
  let determinedVariant: BadgeVariant = variant || 'neutral'
  const normalized = status.toLowerCase()

  if (!variant) {
    if (['confirmed', 'completed', 'adequate', 'active', 'published', 'resolved', 'fulfilled', 'available'].includes(normalized)) {
      determinedVariant = 'success'
    } else if (['pending', 'moderate', 'under_review', 'waiting', 'in_progress'].includes(normalized)) {
      determinedVariant = 'warning'
    } else if (['cancelled', 'no_show', 'critical', 'rejected', 'emergency', 'closed'].includes(normalized)) {
      determinedVariant = 'emergency'
    } else if (['new', 'routine', 'received', 'tested_quarantined'].includes(normalized)) {
      determinedVariant = 'info'
    }
  }

  const styles = {
    success: 'bg-[#DCFCE7] text-[#16A34A] border-[#BBF7D0]',
    warning: 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]',
    emergency: 'bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]',
    info: 'bg-[#DBEAFE] text-[#2563EB] border-[#BFDBFE]',
    neutral: 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]',
  }[determinedVariant]

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${styles} ${className}`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  )
}
