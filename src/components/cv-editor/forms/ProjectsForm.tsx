'use client'

import { Plus, Trash2, LinkIcon } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { SectionCard } from '@/components/cv-editor/SectionCard'
import { useCvEditorStore } from '@/store/cvEditor'

export function ProjectsForm() {
  const { content, setContent } = useCvEditorStore()

  const updateProject = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const projects = [...content.projects]
    projects[index] = { ...projects[index], [field]: value }
    setContent({ projects })
  }

  const addProject = () => {
    setContent({
      projects: [
        ...content.projects,
        {
          id: `project-${Date.now()}`,
          name: '',
          description: '',
          link: '',
          technologies: []
        }
      ]
    })
  }

  const removeProject = (index: number) => {
    const projects = [...content.projects]
    projects.splice(index, 1)
    setContent({ projects })
  }

  return (
    <SectionCard
      title="Projects"
      hint="Add projects with links to demos, repos or achievements"
      action={
        <Button variant="ghost" size="sm" onClick={addProject}>
          <Plus className="w-4 h-4" />
          Add
        </Button>
      }
      defaultOpen={content.projects.length > 0}
    >
      <div className="space-y-4">
        {content.projects.length === 0 && (
          <p className="text-xs text-gray-400">
            No projects yet. Click Add to paste your project or achievement
            link.
          </p>
        )}

        {content.projects.map((project, index) => (
          <div key={project.id} className="space-y-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Project {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-700"
                onClick={() => removeProject(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Project name"
              value={project.name}
              onChange={(e) => updateProject(index, 'name', e.target.value)}
            />
            <Input
              placeholder="Project or achievement link (e.g. https://github.com/you/repo)"
              type="url"
              value={project.link || ''}
              onChange={(e) => updateProject(index, 'link', e.target.value)}
            />
            <div className="flex items-start gap-2">
              <LinkIcon className="w-3.5 h-3.5 text-gray-400 mt-2 shrink-0" />
              <Textarea
                placeholder="Short description of the project or achievement"
                value={project.description}
                onChange={(e) =>
                  updateProject(index, 'description', e.target.value)
                }
                className="min-h-[60px]"
              />
            </div>
            <Input
              placeholder="Technologies (comma separated) — React, Node.js, AWS"
              value={project.technologies.join(', ')}
              onChange={(e) =>
                updateProject(
                  index,
                  'technologies',
                  e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean)
                )
              }
            />
          </div>
        ))}
      </div>
    </SectionCard>
  )
}