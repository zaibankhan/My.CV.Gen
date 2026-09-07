'use client'

import { Textarea } from '@/components/ui/Textarea'
import { SectionCard } from '@/components/cv-editor/SectionCard'
import { useCvEditorStore } from '@/store/cvEditor'

export function SummaryForm() {
  const { content, setContent } = useCvEditorStore()

  return (
    <SectionCard title="Professional Summary">
      <Textarea
        placeholder="Write a compelling summary about yourself, your experience, and what you bring to a role. Or use AI to generate one."
        value={content.summary}
        onChange={(e) => setContent({ summary: e.target.value })}
        className="min-h-[150px]"
      />
    </SectionCard>
  )
}
