'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react'
import { TemplateRenderer } from '@/components/cv-templates/TemplateRenderer'
import type { CvContent, DesignConfig } from '@/types/cv'

const MM_PER_PX = 96 / 25.4
const PAGE_WIDTH_MM = 210
const PAGE_HEIGHT_MM = 297
const PAGE_HEIGHT_PX = PAGE_HEIGHT_MM * MM_PER_PX

interface CVPreviewProps {
  content: CvContent
  designConfig: DesignConfig
}

export function CVPreview({ content, designConfig }: CVPreviewProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const el = measureRef.current
    if (!el) return

    const update = () => {
      const totalMm = el.scrollHeight / MM_PER_PX
      const count = Math.max(1, Math.ceil(totalMm / PAGE_HEIGHT_MM))
      setPages(count)
      setPage((p) => Math.min(p, count - 1))
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [content, designConfig])

  return (
    <>
      {/* Hidden measuring copy (outside viewport, rendered at real width) */}
      <div
        ref={measureRef}
        aria-hidden
        style={{
          position: 'absolute',
          left: -99999,
          top: 0,
          width: `${PAGE_WIDTH_MM}mm`,
          visibility: 'hidden',
          pointerEvents: 'none'
        }}
      >
        <TemplateRenderer content={content} designConfig={designConfig} />
      </div>

      <div className="flex flex-col items-center min-h-full">
        <div className="sticky top-0 z-20 mb-4 bg-gray-100/80 backdrop-blur border border-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-3 shadow-sm">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <span className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5 text-gray-400" />
            Page {page + 1} of {pages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={page >= pages - 1}
            className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>

        <div
          className="relative bg-white shadow-lg overflow-hidden"
          style={{
            width: `${PAGE_WIDTH_MM}mm`,
            height: `${PAGE_HEIGHT_MM}mm`
          }}
        >
          <div
            className="will-change-transform"
            style={{
              transform: `translateY(-${page * PAGE_HEIGHT_MM}mm)`,
              width: `${PAGE_WIDTH_MM}mm`,
              minHeight: `${PAGE_HEIGHT_MM}mm`
            }}
          >
            <TemplateRenderer content={content} designConfig={designConfig} />
          </div>
        </div>
      </div>
    </>
  )
}