'use client'

import { Textarea } from '@/components/ui/Textarea'
import { SectionHeader } from '@/components/cv-editor/SectionHeader'
import { useCvEditorStore } from '@/store/cvEditor'

export function SummaryForm() {
  const { content, setContent } = useCvEditorStore()

  return (
    <div className="space-y-3">
      <SectionHeader title="Professional Summary" />
      <Textarea
        placeholder="Write a compelling summary about yourself, your experience, and what you bring to a role. Or use AI to generate one."
        value={content.summary}
        onChange={(e) => setContent({ summary: e.target.value })}
        className="min-h-[150px]"
      />
    </div>
  )
}
