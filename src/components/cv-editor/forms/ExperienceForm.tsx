'use client'

import { Plus, Trash2, Sparkles } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { SectionCard } from '@/components/cv-editor/SectionCard'
import { useCvEditorStore } from '@/store/cvEditor'
import { useState } from 'react'

const isPresent = (endDate: string) =>
  endDate?.toLowerCase().trim() === 'present'

export function ExperienceForm() {
  const { content, setContent } = useCvEditorStore()
  const [regenerating, setRegenerating] = useState<number>(-1)

  const togglePresent = (index: number) => {
    const experience = [...content.experience]
    experience[index] = {
      ...experience[index],
      endDate: isPresent(experience[index].endDate) ? '' : 'Present'
    }
    setContent({ experience })
  }

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
    <SectionCard
      title="Work Experience"
      hint="Edit roles, dates, locations and achievements"
      action={
        <Button variant="ghost" size="sm" onClick={addExperience}>
          <Plus className="w-4 h-4" />
          Add
        </Button>
      }
      defaultOpen={content.experience.length > 0}
    >
      <div className="space-y-4">
        {content.experience.length === 0 && (
          <p className="text-xs text-gray-400">
            No experience added yet. Click Add to create your first role.
          </p>
        )}

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
              <div>
                <label className="block text-[11px] font-medium text-gray-500 mb-1">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                  aria-label="Start date"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-medium text-gray-500">
                    End Date
                  </label>
                  <label className="flex items-center gap-1 text-[11px] text-gray-500 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isPresent(exp.endDate)}
                      onChange={() => togglePresent(index)}
                      className="accent-primary-600"
                    />
                    Present
                  </label>
                </div>
                {isPresent(exp.endDate) ? (
                  <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-500">
                    Present
                  </div>
                ) : (
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                    aria-label="End date"
                  />
                )}
              </div>
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
    </SectionCard>
  )
}
