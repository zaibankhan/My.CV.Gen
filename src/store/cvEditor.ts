'use client'

import { create } from 'zustand'
import {
  EMPTY_CV_CONTENT,
  DEFAULT_DESIGN_CONFIG
} from '@/lib/constants/templates'
import type { CvContent, DesignConfig } from '@/types/cv'

interface CvEditorState {
  content: CvContent
  designConfig: DesignConfig
  isGenerating: boolean
  activeProvider: 'openai' | 'anthropic'
  jobDescription: string
  setContent: (content: Partial<CvContent>) => void
  setDesignConfig: (config: Partial<DesignConfig>) => void
  setJobDescription: (desc: string) => void
  setActiveProvider: (provider: 'openai' | 'anthropic') => void
  setIsGenerating: (loading: boolean) => void
  reset: () => void
}

export const useCvEditorStore = create<CvEditorState>((set) => ({
  content: { ...EMPTY_CV_CONTENT } as CvContent,
  designConfig: DEFAULT_DESIGN_CONFIG as DesignConfig,
  isGenerating: false,
  activeProvider: 'openai',
  jobDescription: '',
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
  setActiveProvider: (activeProvider) => set({ activeProvider }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  reset: () =>
    set({
      content: { ...EMPTY_CV_CONTENT } as CvContent,
      designConfig: DEFAULT_DESIGN_CONFIG as DesignConfig
    })
}))
