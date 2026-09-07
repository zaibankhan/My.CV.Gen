'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Camera, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { SectionCard } from '@/components/cv-editor/SectionCard'
import { useCvEditorStore } from '@/store/cvEditor'

function resizeImage(file: File, maxSize = 320): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('Canvas not supported.'))
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.onerror = () => reject(new Error('Could not read this image.'))
      img.src = String(reader.result)
    }
    reader.onerror = () => reject(new Error('Could not read this file.'))
    reader.readAsDataURL(file)
  })
}

export function PersonalForm() {
  const { content, setContent } = useCvEditorStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [photoError, setPhotoError] = useState('')

  const updatePersonal = (field: string, value: string) => {
    setContent({
      personal: {
        ...content.personal,
        [field]: value
      }
    })
  }

  const handlePhoto = async (file: File | null) => {
    setPhotoError('')
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setPhotoError('Please choose an image file (JPG or PNG).')
      return
    }
    try {
      const dataUrl = await resizeImage(file, 320)
      updatePersonal('photo', dataUrl)
    } catch (err: any) {
      setPhotoError(err.message || 'Failed to load the image.')
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  return (
    <SectionCard
      title="Personal Information"
      hint="Edit your name, job title, contact, links and photo"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Photo
          </label>
          {content.personal.photo ? (
            <div className="flex items-center gap-3">
              <img
                src={content.personal.photo}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-700 hover:text-primary-900"
                >
                  <ImagePlus className="w-3.5 h-3.5" />
                  Change photo
                </button>
                <button
                  onClick={() => updatePersonal('photo', '')}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-800"
                >
                  <X className="w-3.5 h-3.5" />
                  Remove photo
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 hover:border-primary-400 rounded-lg p-4 flex flex-col items-center gap-1.5 transition-colors"
              type="button"
            >
              <Camera className="w-5 h-5 text-gray-400" />
              <span className="text-xs font-medium text-gray-600">
                Upload profile photo
              </span>
              <span className="text-[11px] text-gray-400">
                JPG or PNG — shown on your CV (auto-resized)
              </span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handlePhoto(e.target.files?.[0] || null)}
          />
          {photoError && (
            <p className="mt-1 text-xs text-red-600">{photoError}</p>
          )}
        </div>

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
    </SectionCard>
  )
}
