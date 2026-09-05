'use client'

import { useState, useRef } from 'react'
import {
  Sparkles,
  Bot,
  Loader2,
  Upload,
  FileText,
  X,
  CheckCircle2
} from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { useCvEditorStore } from '@/store/cvEditor'
import { useCVData } from '@/hooks/useCVData'
import {
  modelsForProvider,
  type AIModelInfo
} from '@/lib/constants/aiModels'
import type { AIProvider } from '@/types/ai'

export function AIGeneratePanel() {
  const {
    jobDescription,
    setJobDescription,
    activeProvider,
    activeModel,
    setActiveProvider,
    setActiveModel,
    referenceFile,
    setReferenceFile
  } = useCvEditorStore()
  const { generateCV, isGenerating } = useCVData()

  const [expanded, setExpanded] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const availableModels = modelsForProvider(activeProvider)
  const selectedModel: AIModelInfo | undefined = availableModels.find(
    (m) => m.id === activeModel
  )

  const handleProviderChange = (value: string) => {
    setActiveProvider(value as AIProvider)
  }

  const handleFile = async (file: File | null) => {
    if (!file) return
    setUploadError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/ai/extract', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to read the file.')
      }

      setReferenceFile({
        fileName: data.fileName,
        text: data.text.slice(0, 12000)
      })
    } catch (err: any) {
      setUploadError(err.message || 'Failed to read the file.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

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
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Target Job Description (optional)
            </label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description to tailor your CV for a specific role..."
              className="min-h-[80px] text-xs"
            />
            <p className="mt-1 text-[11px] text-gray-400">
              AI will optimize content, keywords, and phrasing for this job.
            </p>
          </div>

          {/* Reference document upload */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Upload Your Existing CV or Notes
            </label>
            {referenceFile ? (
              <div className="flex items-start justify-between gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-2 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-green-800 truncate">
                      {referenceFile.fileName}
                    </p>
                    <p className="text-[11px] text-green-600">
                      {referenceFile.text.length.toLocaleString()} characters
                      extracted — AI will use it as reference.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setReferenceFile(null)}
                  className="text-green-700 hover:text-green-900 shrink-0"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-lg p-4 flex flex-col items-center gap-1 transition-colors disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                    <span className="text-xs text-gray-500">Reading file...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-xs font-medium text-gray-600">
                      Upload a reference document
                    </span>
                    <span className="text-[11px] text-gray-400">
                      PDF, DOCX or TXT (max 5MB) — we&apos;ll extract the text
                    </span>
                  </>
                )}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,application/pdf,text/plain"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
            {referenceFile && (
              <div className="mt-1">
                <FileText className="inline w-3 h-3 text-primary-600 mr-1" />
                <span className="text-[11px] text-gray-500">
                  AI fills missing details from this document.
                </span>
              </div>
            )}
            {uploadError && (
              <p className="mt-1 text-[11px] text-red-600">{uploadError}</p>
            )}
          </div>

          {/* AI Provider */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              AI Provider
            </label>
            <select
              value={activeProvider}
              onChange={(e) => handleProviderChange(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              <option value="free">Free AI — No Key Needed</option>
              <option value="groq">Groq — Free AI (Llama)</option>
              <option value="openai">OpenAI (GPT-4)</option>
              <option value="anthropic">Anthropic (Claude)</option>
            </select>
          </div>

          {/* Model selection */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Model
            </label>
            <select
              value={activeModel}
              onChange={(e) => setActiveModel(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              {(activeProvider === 'anthropic'
                ? [...availableModels].reverse()
                : availableModels
              ).map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                  {model.recommended ? '  (Recommended)' : ''}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-gray-400">
              {selectedModel?.description ||
                `Using ${activeProvider === 'openai' ? 'GPT-4' : activeProvider === 'anthropic' ? 'Claude' : activeProvider === 'groq' ? 'Groq' : 'the free AI gateway'} to write your CV.`}
            </p>
          </div>

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