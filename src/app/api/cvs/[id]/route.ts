import { NextResponse, type NextRequest } from 'next/server'
import { requireAuth, unauthorized } from '@/lib/utils/auth'
import { prisma } from '@/lib/db/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireAuth()
  if (!session?.user?.email) return unauthorized()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!user) return unauthorized()

  const cv = await prisma.cvDocument.findFirst({
    where: {
      id: params.id,
      userId: user.id
    }
  })

  if (!cv) {
    return NextResponse.json({ error: 'CV not found.' }, { status: 404 })
  }

  return NextResponse.json({ cv })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireAuth()
  if (!session?.user?.email) return unauthorized()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!user) return unauthorized()

  const existing = await prisma.cvDocument.findFirst({
    where: { id: params.id, userId: user.id }
  })
  if (!existing) {
    return NextResponse.json({ error: 'CV not found.' }, { status: 404 })
  }

  const body = await request.json().catch(() => ({}))
  const updateData: any = {}

  if (body.title) updateData.title = body.title
  if (body.content) updateData.content = body.content
  if (body.designConfig) updateData.designConfig = body.designConfig
  if (body.status) updateData.status = body.status
  if (body.aiProvider) updateData.aiProvider = body.aiProvider

  const cv = await prisma.cvDocument.update({
    where: { id: params.id },
    data: updateData
  })

  return NextResponse.json({ cv })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await requireAuth()
  if (!session?.user?.email) return unauthorized()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!user) return unauthorized()

  const existing = await prisma.cvDocument.findFirst({
    where: { id: params.id, userId: user.id }
  })
  if (!existing) {
    return NextResponse.json({ error: 'CV not found.' }, { status: 404 })
  }

  // Soft delete - set isArchived to true
  await prisma.cvDocument.update({
    where: { id: params.id },
    data: { isArchived: true }
  })

  return NextResponse.json({ success: true })
}
