'use client'

import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { TEMPLATES } from '@/lib/constants/templates'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'

export default function TemplatesPage() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleUseTemplate = (templateId: string) => {
    if (session?.user) {
      router.push(`/templates/${templateId}`)
    } else {
      router.push(`/register?template=${templateId}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Template</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start with a professionally designed layout and customize every
            detail to make it yours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div
                className="h-48 p-6 flex items-end"
                style={{ background: template.defaultColors[0] }}
              >
                <div className="w-full space-y-2">
                  <div className="h-5 w-3/4 bg-white/90 rounded" />
                  <div className="h-3 w-1/2 bg-white/60 rounded" />
                  <div className="h-3 w-2/3 bg-white/40 rounded" />
                  <div className="h-3 w-1/3 bg-white/25 rounded" />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{template.name}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {template.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-gray-500">
                    {template.layout
                      .split('-')
                      .map((w) => w[0].toUpperCase() + w.slice(1))
                      .join(' ')}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-medium text-gray-500 capitalize">
                    {template.style}
                  </span>
                </div>
                <Button
                  onClick={() => handleUseTemplate(template.id)}
                  className="w-full"
                >
                  Use This Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
