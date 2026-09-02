'use client'

import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex-1 px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px',
            active === tab.id
              ? 'border-primary-600 text-primary-700'
              : 'border-transparent text-gray-600 hover:text-gray-800'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
