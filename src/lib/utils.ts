import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  })
}

export function formatDateRange(start: string, end: string): string {
  const startFmt = formatDate(start)
  const endFmt = end === 'present' ? 'Present' : formatDate(end)
  return `${startFmt} - ${endFmt}`
}

export function truncateString(str: string, length: number = 100): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}
