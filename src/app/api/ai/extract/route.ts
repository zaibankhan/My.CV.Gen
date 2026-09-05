import { NextResponse, type NextRequest } from 'next/server'
import { requireAuth, unauthorized } from '@/lib/utils/auth'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

function sanitizeFileName(name: string): string {
  return name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').slice(0, 120)
}

function textFromBuffer(buffer: Buffer): string {
  return buffer.toString('utf8').replace(/\u0000/g, '')
}

async function extractPdfText(arrayBuffer: ArrayBuffer): Promise<string> {
  // pdf-parse is required lazily so the debug-mode test file (which reads
  // ./test/data/*.pdf relative to the source) is never triggered when bundled
  // for the Next.js/Vercel serverless runtime.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pdfParse = require('pdf-parse/lib/pdf-parse.js').default || require('pdf-parse/lib/pdf-parse.js')
  const data = await pdfParse(Buffer.from(arrayBuffer))
  return String(data.text || '')
}

async function extractDocxText(arrayBuffer: ArrayBuffer): Promise<string> {
  const mammoth = require('mammoth')
  const result = await mammoth.extractRawText({ buffer: Buffer.from(arrayBuffer) })
  return String(result.value || '')
}

export async function POST(request: NextRequest) {
  const session = await requireAuth()
  if (!session?.user?.email) return unauthorized()

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No file uploaded. Please attach a text, PDF, or DOCX file.' },
        { status: 400 }
      )
    }

    if (file.size === 0) {
      return NextResponse.json({ error: 'The uploaded file is empty.' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File is too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    const name = sanitizeFileName(file.name || 'reference')
    const ext = name.split('.').pop()?.toLowerCase() || ''
    const mime = (file.type || '').toLowerCase()
    const arrayBuffer = await file.arrayBuffer()

    let text = ''
    if (ext === 'pdf' || mime === 'application/pdf') {
      text = await extractPdfText(arrayBuffer)
    } else if (ext === 'docx' || mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      text = await extractDocxText(arrayBuffer)
    } else if (ext === 'txt' || mime === 'text/plain') {
      text = textFromBuffer(Buffer.from(arrayBuffer))
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload a .txt, .pdf, or .docx file.' },
        { status: 400 }
      )
    }

    const cleaned = text.replace(/\s+/g, ' ').trim()

    if (!cleaned) {
      return NextResponse.json(
        { error: 'Could not extract any text from this file. It may be a scanned image.' },
        { status: 400 }
      )
    }

    // Keep raw extraction analytical but cap what we hand to the LLM later
    return NextResponse.json({
      fileName: name,
      text: cleaned,
      characters: cleaned.length,
      words: cleaned.split(' ').filter(Boolean).length
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: `Failed to read file: ${error.message || 'unknown error'}` },
      { status: 500 }
    )
  }
}