'use client'

import { X, Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/cv-editor/SectionHeader'
import { useCvEditorStore } from '@/store/cvEditor'
import { useState } from 'react'

export function SkillsForm() {
  const { content, setContent } = useCvEditorStore()
  const [suggesting, setSuggesting] = useState(false)

  const updateSkill = (
    category: 'technical' | 'soft',
    index: number,
    value: string
  ) => {
    const skills = { ...content.skills }
    skills[category][index] = value
    setContent({ skills })
  }

  const addSkill = (category: 'technical' | 'soft') => {
    const skills = { ...content.skills }
    skills[category].push('')
    setContent({ skills })
  }

  const removeSkill = (category: 'technical' | 'soft', index: number) => {
    const skills = { ...content.skills }
    skills[category].splice(index, 1)
    setContent({ skills })
  }

  return (
    <div className="space-y-4">
      <SectionHeader title="Skills" />
      <SkillCategory
        title="Technical Skills"
        skillType="technical"
        skills={content.skills.technical}
        onUpdate={updateSkill}
        onAdd={addSkill}
        onRemove={removeSkill}
      />
      <SkillCategory
        title="Soft Skills"
        skillType="soft"
        skills={content.skills.soft}
        onUpdate={updateSkill}
        onAdd={addSkill}
        onRemove={removeSkill}
      />
    </div>
  )
}

function SkillCategory({
  title,
  skillType,
  skills,
  onUpdate,
  onAdd,
  onRemove
}: {
  title: string
  skillType: 'technical' | 'soft'
  skills: string[]
  onUpdate: (type: 'technical' | 'soft', index: number, value: string) => void
  onAdd: (type: 'technical' | 'soft') => void
  onRemove: (type: 'technical' | 'soft', index: number) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">{title}</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAdd(skillType)}
        >
          <Plus className="w-3 h-3" />
          Add
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group relative inline-flex items-center"
          >
            <input
              value={skill}
              onChange={(e) => onUpdate(skillType, index, e.target.value)}
              placeholder={`Skill ${index + 1}`}
              className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 w-28 text-center"
            />
            <button
              onClick={() => onRemove(skillType, index)}
              className="absolute -top-1 -right-1 hidden group-hover:flex w-4 h-4 bg-red-500 text-white rounded-full items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        {skills.length === 0 && (
          <span className="text-xs text-gray-400">No skills added yet</span>
        )}
      </div>
    </div>
  )
}
