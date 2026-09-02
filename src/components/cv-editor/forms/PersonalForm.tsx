'use client'

import { Input } from '@/components/ui/Input'
import { SectionHeader } from '@/components/cv-editor/SectionHeader'
import { useCvEditorStore } from '@/store/cvEditor'

export function PersonalForm() {
  const { content, setContent } = useCvEditorStore()

  const updatePersonal = (field: string, value: string) => {
    setContent({
      personal: {
        ...content.personal,
        [field]: value
      }
    })
  }

  return (
    <div className="space-y-4">
      <SectionHeader title="Personal Information" />
      <Input
        label="Full Name"
        placeholder="John Doe"
        value={content.personal.fullName}
        onChange={(e) => updatePersonal('fullName', e.target.value)}
      />
      <Input
        label="Professional Title"
        placeholder="Senior Software Engineer"
        value={content.personal.jobTitle}
        onChange={(e) => updatePersonal('jobTitle', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={content.personal.email}
          onChange={(e) => updatePersonal('email', e.target.value)}
        />
        <Input
          label="Phone"
          placeholder="+1 555 123 4567"
          value={content.personal.phone}
          onChange={(e) => updatePersonal('phone', e.target.value)}
        />
      </div>
      <Input
        label="Location"
        placeholder="San Francisco, CA"
        value={content.personal.location}
        onChange={(e) => updatePersonal('location', e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Website"
          placeholder="yourwebsite.com"
          value={content.personal.website || ''}
          onChange={(e) => updatePersonal('website', e.target.value)}
        />
        <Input
          label="LinkedIn"
          placeholder="username"
          value={content.personal.linkedin || ''}
          onChange={(e) => updatePersonal('linkedin', e.target.value)}
        />
      </div>
      <Input
        label="GitHub"
        placeholder="username"
        value={content.personal.github || ''}
        onChange={(e) => updatePersonal('github', e.target.value)}
      />
    </div>
  )
}
