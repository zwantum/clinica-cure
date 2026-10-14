import React from 'react'

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = 'Loading operational data...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white border border-[#E5EAF0] rounded-xl my-4">
      <div className="w-8 h-8 border-3 border-[#FFCC00] border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-xs sm:text-sm font-medium text-[#5F6B7A]">{message}</p>
    </div>
  )
}
