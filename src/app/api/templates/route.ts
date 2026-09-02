import { NextResponse } from 'next/server'
import { TEMPLATES, COLOR_PALETTES, FONT_OPTIONS, AVAILABLE_SECTIONS } from '@/lib/constants/templates'

export async function GET() {
  return NextResponse.json({
    templates: TEMPLATES,
    colorPalettes: COLOR_PALETTES,
    fonts: FONT_OPTIONS,
    availableSections: AVAILABLE_SECTIONS
  })
}
