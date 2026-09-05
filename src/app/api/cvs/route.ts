import { NextResponse, type NextRequest } from 'next/server'
import { requireAuth, unauthorized } from '@/lib/utils/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  const session = await requireAuth()
  if (!session?.user?.email) return unauthorized()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) return unauthorized()

  const cvs = await prisma.cvDocument.findMany({
    where: {
      userId: user.id,
      isArchived: false
    },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      templateId: true,
      status: true,
      designConfig: true,
      createdAt: true,
      updatedAt: true
    }
  })

  return NextResponse.json({ cvs })
}

export async function POST(request: NextRequest) {
  const session = await requireAuth()
  if (!session?.user?.email) return unauthorized()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!user) return unauthorized()

  const body = await request.json().catch(() => ({}))
  const { title = 'Untitled CV', templateId = 'modern', aiProvider = 'free' } = body

  const cv = await prisma.cvDocument.create({
    data: {
      userId: user.id,
      title,
      templateId,
      aiProvider,
      status: 'draft',
      designConfig: {},
      content: {}
    }
  })

  return NextResponse.json({ cv }, { status: 201 })
}
