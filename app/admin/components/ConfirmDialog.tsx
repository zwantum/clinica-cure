import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  isDestructive?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl max-w-md w-full border border-[#E5EAF0] shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[#E5EAF0]">
          <div className="flex items-center gap-2.5">
            {isDestructive ? (
              <div className="w-8 h-8 rounded-lg bg-[#FEE2E2] flex items-center justify-center text-[#DC2626]">
                <AlertTriangle className="w-4 h-4" />
              </div>
            ) : null}
            <h3 className="font-bold text-sm text-[#172033]">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded-lg text-[#5F6B7A] hover:bg-[#F7F8FA] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 text-xs sm:text-sm text-[#5F6B7A]">
          <p>{message}</p>
        </div>

        <div className="flex items-center justify-end gap-2.5 p-4 bg-[#F7F8FA] border-t border-[#E5EAF0]">
          <button
            type="button"
            onClick={onCancel}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#5F6B7A] hover:bg-[#E5EAF0] rounded-lg transition-colors cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-1.5 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer ${
              isDestructive
                ? 'bg-[#DC2626] hover:bg-[#B91C1C]'
                : 'bg-[#172033] hover:bg-[#0F172A]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
