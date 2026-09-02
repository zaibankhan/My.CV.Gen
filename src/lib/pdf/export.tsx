'use client'

import { pdf } from '@react-pdf/renderer'
import { CVPDFDocument } from '@/components/cv-pdf/CVPDFDocument'
import type { CvContent, DesignConfig } from '@/types/cv'

/**
 * Generates a PDF Blob for the given CV content/design.
 * Uses the browser-side ReactPDF renderer via the `pdf()` API.
 */
export async function generatePDFBlob(
  content: CvContent,
  designConfig: DesignConfig
): Promise<Blob> {
  // The pdf() API returns a PDF instance; toBlob() renders asynchronously.
  const pdfInstance = pdf(
    <CVPDFDocument content={content} designConfig={designConfig} />
  )

  const blob = await pdfInstance.toBlob()
  return blob
}
