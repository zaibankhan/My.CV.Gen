'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { CVEditor } from '@/components/cv-editor/CVEditor'
import { useCvEditorStore } from '@/store/cvEditor'

export default function CVEditPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { status } = useSession()
  const { setContent, setDesignConfig } = useCvEditorStore()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (status === 'authenticated' && params.id) {
      loadCV()
    }
  }, [status, params.id])

  const loadCV = async () => {
    try {
      const response = await fetch(`/api/cvs/${params.id}`)
      const data = await response.json()
      if (response.ok && data.cv) {
        if (data.cv.content && Object.keys(data.cv.content).length > 0) {
          setContent(data.cv.content)
        }
        if (data.cv.designConfig && Object.keys(data.cv.designConfig).length > 0) {
          setDesignConfig(data.cv.designConfig)
        }
      }
    } catch (err) {
      console.error('Failed to load CV:', err)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return <CVEditor cvId={params.id} />
}
