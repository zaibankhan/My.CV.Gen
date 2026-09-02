'use client'

import { Plus, Trash2, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/cv-editor/SectionHeader'
import { useCvEditorStore } from '@/store/cvEditor'
import { useState } from 'react'

export function ExperienceForm() {
  const { content, setContent } = useCvEditorStore()
  const [regenerating, setRegenerating] = useState<number>(-1)

  const updateExperience = (index: number, field: string, value: any) => {
    const experience = [...content.experience]
    experience[index] = { ...experience[index], [field]: value }
    setContent({ experience })
  }

  const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
    const experience = [...content.experience]
    const bullets = [...experience[expIndex].bullets]
    bullets[bulletIndex] = value
    experience[expIndex] = { ...experience[expIndex], bullets }
    setContent({ experience })
  }

  const addExperience = () => {
    setContent({
      experience: [
        ...content.experience,
        {
          id: `exp-${Date.now()}`,
          jobTitle: '',
          company: '',
          startDate: '',
          endDate: '',
          location: '',
          bullets: ['']
        }
      ]
    })
  }

  const removeExperience = (index: number) => {
    const experience = [...content.experience]
    experience.splice(index, 1)
    setContent({ experience })
  }

  const addBullet = (expIndex: number) => {
    const experience = [...content.experience]
    experience[expIndex].bullets.push('')
    setContent({ experience })
  }

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const experience = [...content.experience]
    experience[expIndex].bullets.splice(bulletIndex, 1)
    setContent({ experience })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionHeader title="Work Experience" />
        <Button variant="ghost" size="sm" onClick={addExperience}>
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {content.experience.map((exp, index) => (
        <div key={exp.id} className="space-y-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Position {index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => removeExperience(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input
            placeholder="Job Title"
            value={exp.jobTitle}
            onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
          />
          <Input
            placeholder="Company"
            value={exp.company}
            onChange={(e) => updateExperience(index, 'company', e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
            />
            <Input
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
            />
          </div>
          <Input
            placeholder="Location"
            value={exp.location || ''}
            onChange={(e) => updateExperience(index, 'location', e.target.value)}
          />
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-500">
                Key Achievements
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addBullet(index)}
              >
                <Plus className="w-3 h-3" />
                Add
              </Button>
            </div>
            {exp.bullets.map((bullet, bulletIndex) => (
              <div key={bulletIndex} className="flex items-center gap-2">
                <Textarea
                  placeholder="Achievement or responsibility"
                  value={bullet}
                  onChange={(e) =>
                    updateBullet(index, bulletIndex, e.target.value)
                  }
                  className="min-h-[50px]"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0"
                  onClick={() => removeBullet(index, bulletIndex)}
                >
                  <Trash2 className="w-3 h-3 text-gray-400" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
