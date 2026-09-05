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
      // Merge generated content into the current CV. Never drop an entry
      // that already existed in the editor, even if the AI omitted it.
      if (data.data) {
        const genExp: any[] = data.data.experience || []
        const genEdu: any[] = data.data.education || []
        const curExp: any[] = content.experience || []
        const curEdu: any[] = content.education || []

        const expMatch = (a: any, b: any) =>
          (a.company || '').toLowerCase() === (b.company || '').toLowerCase() &&
          (a.jobTitle || '').toLowerCase() === (b.jobTitle || '').toLowerCase()

        const eduMatch = (a: any, b: any) =>
          (a.institution || '').toLowerCase() ===
            (b.institution || '').toLowerCase() &&
          (a.degree || '').toLowerCase() === (b.degree || '').toLowerCase()

        const mergedExperience = [
          ...genExp,
          ...curExp.filter((orig) => !genExp.some((g) => expMatch(orig, g)))
        ]

        const mergedEducation = [
          ...genEdu,
          ...curEdu.filter((orig) => !genEdu.some((g) => eduMatch(orig, g)))
        ]

        const uniqueSkills = (lists: any[]) => {
          const seen = new Set<string>()
          const out: string[] = []
          for (const s of lists.flat().filter(Boolean)) {
            const k = String(s).trim().toLowerCase()
            if (k && !seen.has(k)) {
              seen.add(k)
              out.push(String(s).trim())
            }
          }
          return out
        }

        setContent({
          summary: data.data.summary || content.summary,
          experience: mergedExperience.map((exp) => ({
            id: exp.id || `exp-${Date.now()}-${Math.random()}`,
            jobTitle: exp.jobTitle || '',
            company: exp.company || '',
            startDate: exp.startDate || '',
            endDate: exp.endDate || '',
            location: exp.location || '',
            bullets: Array.isArray(exp.bullets) ? exp.bullets : []
          })),
          skills: {
            technical: uniqueSkills([
              data.data.skills?.technical,
              content.skills?.technical
            ]),
            soft: uniqueSkills([data.data.skills?.soft, content.skills?.soft])
          },
          education: mergedEducation.map((edu) => ({
            id: edu.id || `edu-${Date.now()}-${Math.random()}`,
            degree: edu.degree || '',
            institution: edu.institution || '',
            startDate: edu.startDate || '',
            endDate: edu.endDate || '',
            description: edu.description || ''
          }))
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