'use client'

import { useRef, useState } from 'react'
import { useCVData } from '@/hooks/useCVData'
import { usePDFExport } from '@/hooks/usePDFExport'
import { CVPreview } from '@/components/cv-editor/CVPreview'
import { Tabs } from '@/components/ui/Tabs'
import { PersonalForm } from '@/components/cv-editor/forms/PersonalForm'
import { SummaryForm } from '@/components/cv-editor/forms/SummaryForm'
import { ExperienceForm } from '@/components/cv-editor/forms/ExperienceForm'
import { EducationForm } from '@/components/cv-editor/forms/EducationForm'
import { SkillsForm } from '@/components/cv-editor/forms/SkillsForm'
import { ProjectsForm } from '@/components/cv-editor/forms/ProjectsForm'
import { AIGeneratePanel } from '@/components/cv-editor/AIGeneratePanel'
import { DesignPanel } from '@/components/cv-editor/DesignPanel'
import { useCvEditorStore } from '@/store/cvEditor'

export function CVEditor({ cvId }: { cvId: string }) {
  const { content, designConfig, isGenerating } = useCvEditorStore()
  const { generateCV } = useCVData()
  const { exportCV, previewCV, isExporting } = usePDFExport()
  const [activeTab, setActiveTab] = useState('content')
  const [showExportMenu, setShowExportMenu] = useState(false)

  const handleGenerate = async () => {
    await generateCV()
  }

  const handleExport = () => {
    setShowExportMenu(false)
    exportCV(content, designConfig)
  }

  const handlePreview = () => {
    setShowExportMenu(false)
    previewCV(content, designConfig)
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Editor header */}
      <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">CV Editor</h1>
          <p className="text-sm text-gray-500">
            {isGenerating ? 'AI is generating content...' : 'Create your perfect CV'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {isGenerating ? 'Generating...' : '✨ Generate with AI'}
          </button>

          {/* Export dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              {isExporting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Preparing...
                </>
              ) : (
                <>
                  <DownloadIcon />
                  Export PDF
                  <span className="text-gray-400">▾</span>
                </>
              )}
            </button>

            {showExportMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowExportMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={handleExport}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm"
                  >
                    ⬇️ Download PDF
                  </button>
                  <button
                    onClick={handlePreview}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm"
                  >
                    👁️ Preview PDF
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                  <div className="px-4 py-1.5 text-xs text-gray-400">
                    A4 • {designConfig.template} template
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Editor body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Editor panel */}
        <div className="w-[460px] shrink-0 border-r bg-white flex flex-col">
          <Tabs
            tabs={[
              { id: 'content', label: 'Content & AI' },
              { id: 'design', label: 'Design' }
            ]}
            active={activeTab}
            onChange={setActiveTab}
          />
          {activeTab === 'content' ? (
            <div className="flex-1 overflow-y-auto">
              <div className="p-3 space-y-3">
                <p className="text-[11px] text-gray-600 bg-primary-50 border border-primary-100 rounded-lg px-3 py-2">
                  <span className="font-semibold text-primary-800">
                    Everything here is editable.
                  </span>{' '}
                  Change your name, title, location or any imported detail —
                  the preview updates instantly.
                </p>
                <AIGeneratePanel />
                <PersonalForm />
                <SummaryForm />
                <ExperienceForm />
                <EducationForm />
                <SkillsForm />
                <ProjectsForm />
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <DesignPanel />
              </div>
            </div>
          )}
        </div>

        {/* Right: Live preview */}
        <div className="flex-1 min-w-0 bg-gray-100 overflow-hidden">
          <CVPreview content={content} designConfig={designConfig} />
        </div>
      </div>
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  )
}
