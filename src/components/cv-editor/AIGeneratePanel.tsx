'use client'

import { useState } from 'react'
import { Sparkles, Bot, Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select'
import { useCvEditorStore } from '@/store/cvEditor'
import { useCVData } from '@/hooks/useCVData'

export function AIGeneratePanel() {
  const { jobDescription, setJobDescription, setIsGenerating } = useCvEditorStore()
  const { generateCV, isGenerating } = useCVData()

  const [expanded, setExpanded] = useState(true)

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-primary-50 hover:bg-primary-100 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-semibold text-primary-800">
            AI Assistant
          </span>
        </div>
        <span className="text-gray-400 text-sm">{expanded ? '▾' : '▸'}</span>
      </button>

      {expanded && (
        <div className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Target Job Description (optional)
            </label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description to tailor your CV for a specific role..."
              className="min-h-[100px] text-xs"
            />
            <p className="mt-1 text-[11px] text-gray-400">
              AI will optimize content, keywords, and phrasing for this job.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-gray-400" />
            <label className="text-xs font-medium text-gray-600">
              AI Provider
            </label>
          </div>
          <select className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option value="openai">OpenAI (GPT-4)</option>
            <option value="anthropic">Claude (Anthropic)</option>
          </select>

          <Button
            onClick={() => generateCV()}
            loading={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Full CV
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
