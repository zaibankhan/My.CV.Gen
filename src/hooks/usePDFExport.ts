'use client'

import { useState } from 'react'
import type { CvContent, DesignConfig } from '@/types/cv'

export function usePDFExport() {
  const [isExporting, setIsExporting] = useState(false)

  const exportCV = async (
    content: CvContent,
    designConfig: DesignConfig
  ) => {
    setIsExporting(true)

    try {
      // Dynamically import to keep the initial bundle lean
      const { generatePDFBlob } = await import('@/lib/pdf/export')

      const blob = await generatePDFBlob(content, designConfig)

      const downloadUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const name = (content.personal?.fullName || 'My_CV')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
      link.href = downloadUrl
      link.download = `${name}_resume.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()

      // Clean up the object URL after a delay
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000)

      return true
    } catch (error) {
      console.error('PDF export failed:', error)
      return false
    } finally {
      setIsExporting(false)
    }
  }

  const previewCV = async (
    content: CvContent,
    designConfig: DesignConfig
  ) => {
    try {
      const { generatePDFBlob } = await import('@/lib/pdf/export')
      const blob = await generatePDFBlob(content, designConfig)
      const previewUrl = URL.createObjectURL(blob)
      window.open(previewUrl, '_blank')
      setTimeout(() => URL.revokeObjectURL(previewUrl), 60000)
    } catch (error) {
      console.error('PDF preview failed:', error)
    }
  }

  return {
    exportCV,
    previewCV,
    isExporting
  }
}
