import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center text-xs text-[#5F6B7A] mb-3" aria-label="Breadcrumb">
      <Link
        href="/admin/overview"
        className="flex items-center gap-1 hover:text-[#172033] transition-colors"
      >
        <Home className="w-3.5 h-3.5 text-[#5F6B7A]" />
        <span>Admin</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-[#A0AEC0] shrink-0" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-[#172033] transition-colors font-medium truncate max-w-[150px]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[#172033] truncate max-w-[200px]">
                {item.label}
              </span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
