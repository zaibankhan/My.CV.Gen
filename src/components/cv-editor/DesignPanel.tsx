'use client'

import { COLOR_PALETTES, FONT_OPTIONS, TEMPLATES } from '@/lib/constants/templates'
import { useCvEditorStore } from '@/store/cvEditor'
import { cn } from '@/lib/utils'

export function DesignPanel() {
  const { designConfig, setDesignConfig } = useCvEditorStore()

  const setTemplate = (template: string) => {
    setDesignConfig({ template })
  }

  const setColor = (key: 'primary' | 'secondary' | 'accent', color: string) => {
    setDesignConfig({
      colors: {
        ...designConfig.colors,
        [key]: color
      }
    })
  }

  const setFont = (key: 'headingFont' | 'bodyFont', font: string) => {
    setDesignConfig({
      typography: {
        ...designConfig.typography,
        [key]: font
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Template selection */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Template</h3>
        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={cn(
                'p-3 border-2 rounded-lg text-left transition-all',
                designConfig.template === t.id
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <div
                className="h-16 rounded mb-2 flex items-end p-2"
                style={{ background: t.defaultColors[0] }}
              >
                <div className="w-full space-y-1">
                  <div className="h-1.5 w-2/3 bg-white/80 rounded" />
                  <div className="h-1 w-1/2 bg-white/50 rounded" />
                </div>
              </div>
              <span className="text-xs font-medium">{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color selection */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Color Palette</h3>
        <div className="space-y-2">
          {COLOR_PALETTES.map((palette) => (
            <button
              key={palette.name}
              onClick={() => {
                setColor('primary', palette.colors[0])
                setColor('secondary', palette.colors[1])
                setColor('accent', palette.colors[2])
              }}
              className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded"
            >
              <span className="text-xs">{palette.name}</span>
              <div className="flex gap-1">
                {palette.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-6 h-6 rounded"
                    style={{ background: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom colors */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Custom Colors</h3>
        <div className="space-y-3">
          {(['primary', 'secondary', 'accent'] as const).map((key) => (
            <div key={key} className="flex items-center gap-3">
              <label className="text-xs w-20 capitalize text-gray-600">
                {key}
              </label>
              <input
                type="color"
                value={designConfig.colors[key]}
                onChange={(e) => setColor(key, e.target.value)}
                className="w-10 h-8 cursor-pointer rounded border-0"
              />
              <span className="text-xs text-gray-500 font-mono">
                {designConfig.colors[key]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Typography</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Heading Font
            </label>
            <select
              value={designConfig.typography.headingFont}
              onChange={(e) => setFont('headingFont', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.family} value={font.family}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Body Font
            </label>
            <select
              value={designConfig.typography.bodyFont}
              onChange={(e) => setFont('bodyFont', e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.family} value={font.family}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Layout</h3>
        <div className="space-y-3">
          <label className="block text-xs text-gray-600 mb-1">
            Font Size
          </label>
          <input
            type="range"
            min="11"
            max="18"
            value={parseInt(designConfig.typography.fontSize)}
            onChange={(e) =>
              setDesignConfig({
                typography: {
                  ...designConfig.typography,
                  fontSize: `${e.target.value}px`
                }
              })
            }
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>
      </div>
    </div>
  )
}
