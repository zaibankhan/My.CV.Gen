'use client'

import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/cv-editor/SectionHeader'
import { useCvEditorStore } from '@/store/cvEditor'

export function EducationForm() {
  const { content, setContent } = useCvEditorStore()

  const updateEducation = (index: number, field: string, value: string) => {
    const education = [...content.education]
    education[index] = { ...education[index], [field]: value }
    setContent({ education })
  }

  const addEducation = () => {
    setContent({
      education: [
        ...content.education,
        {
          id: `edu-${Date.now()}`,
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    })
  }

  const removeEducation = (index: number) => {
    const education = [...content.education]
    education.splice(index, 1)
    setContent({ education })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SectionHeader title="Education" />
        <Button variant="ghost" size="sm" onClick={addEducation}>
          <Plus className="w-4 h-4" />
          Add
        </Button>
      </div>

      {content.education.map((edu, index) => (
        <div key={edu.id} className="space-y-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium">Education {index + 1}</h4>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => removeEducation(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <Input
            placeholder="Degree (e.g., B.S. Computer Science)"
            value={edu.degree}
            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
          />
          <Input
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) =>
              updateEducation(index, 'institution', e.target.value)
            }
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Start Date"
              value={edu.startDate}
              onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
            />
            <Input
              placeholder="End Date"
              value={edu.endDate}
              onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
            />
          </div>
          <Textarea
            placeholder="Description, achievements, GPA, etc."
            value={edu.description || ''}
            onChange={(e) =>
              updateEducation(index, 'description', e.target.value)
            }
            className="min-h-[60px]"
          />
        </div>
      ))}
    </div>
  )
}
