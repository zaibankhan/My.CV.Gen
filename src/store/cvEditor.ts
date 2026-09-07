'use client'

import { create } from 'zustand'
import {
  EMPTY_CV_CONTENT,
  DEFAULT_DESIGN_CONFIG
} from '@/lib/constants/templates'
import { DEFAULT_MODEL } from '@/lib/constants/aiModels'
import type { CvContent, DesignConfig } from '@/types/cv'
import type { AIProvider } from '@/types/ai'

interface ReferenceFile {
  fileName: string
  text: string
}

interface CvEditorState {
  content: CvContent
  designConfig: DesignConfig
  isGenerating: boolean
  activeProvider: AIProvider
  activeModel: string
  jobDescription: string
  aiTone: string
  aiIndustries: string
  referenceFile: ReferenceFile | null
  setContent: (content: Partial<CvContent>) => void
  setDesignConfig: (config: Partial<DesignConfig>) => void
  setJobDescription: (desc: string) => void
  setActiveProvider: (provider: AIProvider) => void
  setActiveModel: (model: string) => void
  setAiTone: (tone: string) => void
  setAiIndustries: (industries: string) => void
  setReferenceFile: (referenceFile: ReferenceFile | null) => void
  setIsGenerating: (loading: boolean) => void
  reset: () => void
}

export const useCvEditorStore = create<CvEditorState>((set) => ({
  content: { ...EMPTY_CV_CONTENT } as CvContent,
  designConfig: DEFAULT_DESIGN_CONFIG as DesignConfig,
  isGenerating: false,
  activeProvider: 'groq',
  activeModel: DEFAULT_MODEL.groq,
  jobDescription: '',
  aiTone: 'professional',
  aiIndustries: '',
  referenceFile: null,
  setContent: (content) =>
    set((state) => ({
      content: { ...state.content, ...content }
    })),
  setDesignConfig: (config) =>
    set((state) => ({
      designConfig: {
        ...state.designConfig,
        ...config
      }
    })),
  setJobDescription: (jobDescription) => set({ jobDescription }),
  setAiTone: (aiTone) => set({ aiTone }),
  setAiIndustries: (aiIndustries) => set({ aiIndustries }),
  setActiveProvider: (activeProvider) =>
    set((state) => ({
      activeProvider,
      activeModel: DEFAULT_MODEL[activeProvider]
    })),
  setActiveModel: (activeModel) => set({ activeModel }),
  setReferenceFile: (referenceFile) => set({ referenceFile }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  reset: () =>
    set({
      content: { ...EMPTY_CV_CONTENT } as CvContent,
      designConfig: DEFAULT_DESIGN_CONFIG as DesignConfig,
      referenceFile: null
    })
}))