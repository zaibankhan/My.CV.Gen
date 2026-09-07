'use client'

import { useState, useRef } from 'react'
import {
  Sparkles,
  Loader2,
  Upload,
  FileText,
  X,
  CheckCircle2,
  Wand2
} from 'lucide-react'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { useCvEditorStore } from '@/store/cvEditor'
import { useCVData } from '@/hooks/useCVData'
import {
  modelsForProvider,
  type AIModelInfo
} from '@/lib/constants/aiModels'
import { TEMPLATES } from '@/lib/constants/templates'
import { cn } from '@/lib/utils'

export function AIGeneratePanel() {
  const {
    content,
    setContent,
    designConfig,
    setDesignConfig,
    jobDescription,
    setJobDescription,
    activeModel,
    setActiveModel,
    referenceFile,
    setReferenceFile
  } = useCvEditorStore()
  const { generateCV, isGenerating } = useCVData()

  const [expanded, setExpanded] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [importNotice, setImportNotice] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const availableModels = modelsForProvider('groq')
  const selectedModel: AIModelInfo | undefined = availableModels.find(
    (m) => m.id === activeModel
  )

  const handleFile = async (file: File | null) => {
    if (!file) return
    setUploadError('')
    setImportNotice('')
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

      const text = data.text.slice(0, 30000)
      setReferenceFile({
        fileName: data.fileName,
        text
      })

      setUploading(false)
      await importDocument(data.text)
    } catch (err: any) {
      setUploadError(err.message || 'Failed to read the file.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const importDocument = async (text: string) => {
    setImporting(true)
    try {
      const response = await fetch('/api/ai/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })

      const data = await response.json()

      if (!response.ok || !data.data) {
        throw new Error(data.error || 'Could not import the document.')
      }

      const parsed = data.data
      const importPersonal = (p: any) => {
        const filled = Object.entries(p || {}).filter(
          ([, v]) => typeof v === 'string' && v.trim().length > 0
        )
        if (filled.length === 0) return null
        return Object.fromEntries(filled)
      }
      const personal = importPersonal(parsed.personal)

      const parts: string[] = []
      if (personal) {
        const pos = Math.min(
          (personal.email ? 1 : 0) +
            (personal.phone ? 1 : 0) +
            (personal.location ? 1 : 0) +
            (personal.linkedin ? 1 : 0) +
            (personal.github ? 1 : 0) +
            (personal.website ? 1 : 0),
          3
        )
        parts.push(
          `${personal.fullName ? `${personal.fullName}'s ` : ''}contact info (${pos} field${pos > 1 ? 's' : ''})`
        )
      }
      if (parsed.summary) parts.push('summary')
      if (parsed.experience?.length) {
        parts.push(`${parsed.experience.length} job${parsed.experience.length > 1 ? 's' : ''}`)
      }
      if (parsed.education?.length) {
        parts.push(`${parsed.education.length} education${parsed.education.length > 1 ? ' entries' : ' entry'}`)
      }
      const skillCount =
        (parsed.skills?.technical?.length || 0) + (parsed.skills?.soft?.length || 0)
      if (skillCount) parts.push(`${skillCount} skills`)

      setContent({
        personal: personal
          ? { ...content.personal, ...personal }
          : content.personal,
        summary: parsed.summary || content.summary,
        experience:
          parsed.experience?.length > 0
            ? parsed.experience.map((exp: any) => ({
                id: `exp-${Date.now()}-${Math.random()}`,
                jobTitle: exp.jobTitle || '',
                company: exp.company || '',
                startDate: exp.startDate || '',
                endDate: exp.endDate || '',
                location: exp.location || '',
                bullets: Array.isArray(exp.bullets) ? exp.bullets : []
              }))
            : content.experience,
        skills:
          parsed.skills && skillCount > 0
            ? {
                technical: parsed.skills.technical || [],
                soft: parsed.skills.soft || []
              }
            : content.skills,
        education:
          parsed.education?.length > 0
            ? parsed.education.map((edu: any) => ({
                id: `edu-${Date.now()}-${Math.random()}`,
                degree: edu.degree || '',
                institution: edu.institution || '',
                startDate: edu.startDate || '',
                endDate: edu.endDate || '',
                description: edu.description || ''
              }))
            : content.education
      })

      setImportNotice(
        parts.length > 0
          ? `Copied into your editor: ${parts.join(', ')}.`
          : 'Document attached — AI will use it as the source when writing.'
      )
    } catch (err: any) {
      setImportNotice(
        'File attached. AI will reference this document when writing your CV.'
      )
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-primary-50 hover:bg-primary-100 transition-colors"
        type="button"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-semibold text-primary-800">
            Professional AI Writer
          </span>
        </div>
        <span className="text-gray-400 text-sm">{expanded ? '▾' : '▸'}</span>
      </button>

      {expanded && (
        <div className="p-3 space-y-3 border-t border-primary-100">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Target Job Description (optional)
            </label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job you're applying for — we tailor your CV to match it perfectly..."
              className="min-h-[72px] text-xs"
            />
            <p className="mt-1 text-[11px] text-gray-400">
              The AI optimizes keywords, skills, and phrasing for this role.
            </p>
          </div>

          {/* Import existing CV */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Import Your Existing CV
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
                      {importNotice ||
                        'AI will use this document as your source of truth.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setReferenceFile(null)
                    setImportNotice('')
                  }}
                  className="text-green-700 hover:text-green-900 shrink-0"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || importing}
                className="w-full border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-lg p-4 flex flex-col items-center gap-1 transition-colors disabled:opacity-50"
              >
                {uploading || importing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-primary-600" />
                    <span className="text-xs text-gray-500">
                      {uploading ? 'Reading file...' : 'Copying your details...'}
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-xs font-medium text-gray-600">
                      Upload your CV — we copy your details and upgrade it
                    </span>
                    <span className="text-[11px] text-gray-400">
                      PDF, DOCX or TXT (max 5MB)
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
                  Your details are kept intact while the wording is upgraded.
                </span>
              </div>
            )}
            {uploadError && (
              <p className="mt-1 text-[11px] text-red-600">{uploadError}</p>
            )}
          </div>

          {/* Model */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Writing Quality
            </label>
            <select
              value={activeModel}
              onChange={(e) => setActiveModel(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
            >
              {availableModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name.replace('(FREE)', '').trim()}
                  {model.recommended ? '  (Recommended)' : ''}
                </option>
              ))}
            </select>
            <p className="mt-1 text-[11px] text-gray-400">
              {selectedModel?.description ||
                'The smartest available model writes your CV.'}
            </p>
          </div>

          {/* Design */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              CV Design
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setDesignConfig({ template: t.id })}
                  className={cn(
                    'p-2 border-2 rounded-lg text-left transition-all',
                    designConfig.template === t.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  )}
                >
                  <div
                    className="h-10 rounded mb-1.5 flex items-end p-1.5"
                    style={{ background: t.defaultColors[0] }}
                  >
                    <div className="w-full space-y-0.5">
                      <div className="h-1 w-2/3 bg-white/80 rounded" />
                      <div className="h-0.5 w-1/2 bg-white/50 rounded" />
                    </div>
                  </div>
                  <span className="text-[10px] font-medium leading-tight block">
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => generateCV()}
            loading={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Writing your professional CV...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                Write Professional CV
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}