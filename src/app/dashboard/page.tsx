'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Plus, FileText, MoreVertical, Loader2 } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TEMPLATES } from '@/lib/constants/templates'

interface CVCard {
  id: string
  title: string
  templateId: string
  status: string
  updatedAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [cvs, setCvs] = useState<CVCard[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showTemplatePicker, setShowTemplatePicker] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'authenticated') {
      loadCVs()
    } else if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status])

  const loadCVs = async () => {
    try {
      const response = await fetch('/api/cvs')
      const data = await response.json()
      if (response.ok) {
        setCvs(data.cvs)
      }
    } catch (err) {
      setError('Failed to load your CVs.')
    } finally {
      setLoading(false)
    }
  }

  const createCV = async (templateId: string) => {
    setCreating(true)
    setShowTemplatePicker(false)
    try {
      const response = await fetch('/api/cvs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId })
      })
      const data = await response.json()
      if (response.ok) {
        router.push(`/cv/${data.cv.id}`)
      } else {
        setError(data.error || 'Failed to create CV.')
      }
    } catch (err) {
      setError('Failed to create CV.')
    } finally {
      setCreating(false)
    }
  }

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return ''
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome{session?.user?.name ? `, ${session.user.name}` : ''}
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and create your professional CVs
            </p>
          </div>
          <button
            onClick={() => setShowTemplatePicker(true)}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium"
          >
            <Plus className="w-4 h-4" />
            Create New CV
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        {/* CV grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          </div>
        ) : cvs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              You don&apos;t have any CVs yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first CV and let AI write it for you.
            </p>
            <button
              onClick={() => setShowTemplatePicker(true)}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 font-medium"
            >
              Create Your First CV
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => {
              const template = TEMPLATES.find((t) => t.id === cv.templateId)
              return (
                <button
                  key={cv.id}
                  onClick={() => router.push(`/cv/${cv.id}`)}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden text-left"
                >
                  <div
                    className="h-32 p-4 flex items-end"
                    style={{
                      background: template?.defaultColors[0] || '#2563EB'
                    }}
                  >
                    <div className="w-full space-y-2">
                      <div className="h-3 w-3/4 bg-white/90 rounded" />
                      <div className="h-2 w-1/2 bg-white/60 rounded" />
                    </div>
                    <span className="absolute top-2 right-2 px-2 py-1 bg-black/30 text-white text-xs rounded-full">
                      {cv.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {cv.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {template?.name || 'Custom'} template
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Updated {formatDate(cv.updatedAt)}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Template picker modal */}
        {showTemplatePicker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowTemplatePicker(false)}
            />
            <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Choose a Template
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Pick a starting point for your CV
                  </p>
                </div>
                <button
                  onClick={() => setShowTemplatePicker(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>

              {creating && (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => createCV(template.id)}
                    disabled={creating}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-600 transition-colors text-left disabled:opacity-50"
                  >
                    <div
                      className="h-24 rounded mb-3 flex items-end p-3"
                      style={{ background: template.defaultColors[0] }}
                    >
                      <div className="w-full space-y-1.5">
                        <div className="h-2.5 w-3/4 bg-white/90 rounded" />
                        <div className="h-2 w-1/2 bg-white/60 rounded" />
                        <div className="h-1.5 w-2/3 bg-white/40 rounded" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {template.description}
                    </p>
                    <p className="text-xs text-primary-600 mt-2">
                      Recommended for: {template.recommendedFor.join(', ')}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
