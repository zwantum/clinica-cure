import React from 'react'
import { Inbox } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white border border-[#E5EAF0] rounded-xl my-4">
      <div className="w-12 h-12 rounded-xl bg-[#F7F8FA] border border-[#E5EAF0] flex items-center justify-center text-[#5F6B7A] mb-3">
        {icon || <Inbox className="w-6 h-6 text-[#A0AEC0]" />}
      </div>
      <h3 className="text-base font-semibold text-[#172033] mb-1">{title}</h3>
      {description && (
        <p className="text-xs sm:text-sm text-[#5F6B7A] max-w-sm mb-4">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  )
}
