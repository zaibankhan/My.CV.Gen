'use client'

import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useCvEditorStore } from '@/store/cvEditor'

interface GenerateResponse {
  data: any
  metadata: {
    remaining: number
    limit: number
    provider: string
    model: string
  }
}

export function useCVData() {
  const { data: session } = useSession()
  const {
    content,
    jobDescription,
    activeProvider,
    activeModel,
    referenceFile,
    setContent,
    setIsGenerating,
    isGenerating
  } = useCvEditorStore()

  const generateCV = useMutation({
    mutationFn: async (): Promise<GenerateResponse> => {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvData: content,
          jobDescription: jobDescription || undefined,
          provider: activeProvider,
          model: activeModel,
          referenceText: referenceFile?.text || undefined,
          referenceFileName: referenceFile?.fileName || undefined
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate CV')
      }

      return response.json()
    },
    onMutate: () => {
      setIsGenerating(true)
    },
    onSuccess: (data) => {
      // Merge generated content into the current CV
      if (data.data) {
        setContent({
          summary: data.data.summary || content.summary,
          experience:
            data.data.experience?.length > 0
              ? data.data.experience.map((exp: any) => ({
                  id: `exp-${Date.now()}-${Math.random()}`,
                  ...exp
                }))
              : content.experience,
          skills: data.data.skills || content.skills,
          education:
            data.data.education?.length > 0
              ? data.data.education.map((edu: any) => ({
                  id: `edu-${Date.now()}-${Math.random()}`,
                  ...edu
                }))
              : content.education
        })
      }
    },
    onSettled: () => {
      setIsGenerating(false)
    }
  })

  return {
    generateCV: generateCV.mutate,
    isGenerating: isGenerating || generateCV.isPending
  }
}