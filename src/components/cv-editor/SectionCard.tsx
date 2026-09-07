'use client'

import { useState, type ReactNode } from 'react'
import { ChevronDown, Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionCardProps {
  title: string
  hint?: string
  action?: ReactNode
  defaultOpen?: boolean
  children: ReactNode
}

export function SectionCard({
  title,
  hint,
  action,
  defaultOpen = true,
  children
}: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="text-left min-w-0">
            <span className="block text-sm font-semibold text-gray-900">
              {title}
            </span>
            {hint && (
              <span className="block text-[11px] text-gray-500 truncate">
                {hint}
              </span>
            )}
          </span>
          <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-medium text-primary-700 bg-primary-100 rounded-full px-1.5 py-0.5">
            <Pencil className="w-3 h-3" />
            Edit
          </span>
        </span>
        <span className="flex items-center gap-2 shrink-0">
          {action}
          <ChevronDown
            className={cn(
              'w-4 h-4 text-gray-400 transition-transform',
              open ? 'rotate-180' : ''
            )}
          />
        </span>
      </button>
      {open && <div className="p-3">{children}</div>}
    </div>
  )
}