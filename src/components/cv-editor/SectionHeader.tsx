'use client'

import { cn } from '@/lib/utils'

export function SectionHeader({
  title,
  className
}: {
  title: string
  className?: string
}) {
  return (
    <h3
      className={cn(
        'text-sm font-semibold text-gray-900 uppercase tracking-wide pb-1 border-b border-gray-200',
        className
      )}
    >
      {title}
    </h3>
  )
}
