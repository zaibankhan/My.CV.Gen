import { NextResponse, type NextRequest } from 'next/server'
import { requireAuth, unauthorized, checkRateLimit, logAIGeneration } from '@/lib/utils/auth'
import { AIProviderFactory } from '@/lib/ai'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  const session = await requireAuth()
  if (!session?.user?.email) return unauthorized()

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })
  if (!user) return unauthorized()

  const body = await request.json().catch(() => ({}))
  const {
    cvData,
    jobDescription,
    tone,
    industries,
    provider = 'openai',
    cvId
  } = body

  if (!cvData || typeof cvData !== 'object') {
    return NextResponse.json(
      { error: 'cvData is required.' },
      { status: 400 }
    )
  }

  // Check rate limit
  const rateLimit = await checkRateLimit({ userId: user.id })
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error: 'Rate limit exceeded.',
        resetAt: rateLimit.resetAt,
        remaining: rateLimit.remaining
      },
      { status: 429 }
    )
  }

  try {
    const result = await AIProviderFactory.generateCV(provider, {
      cvData,
      jobDescription,
      tone,
      industries
    })

    // Log the AI generation
    await logAIGeneration({
      userId: user.id,
      cvDocumentId: cvId,
      provider,
      model: result.metadata.model,
      promptTokens: result.metadata.promptTokens,
      completionTokens: result.metadata.completionTokens,
      totalTokens: result.metadata.totalTokens,
      responseTimeMs: result.metadata.responseTimeMs,
      success: true
    })

    return NextResponse.json({
      data: result.data,
      metadata: {
        remaining: rateLimit.remaining,
        limit: rateLimit.limit,
        provider,
        model: result.metadata.model,
        responseTimeMs: result.metadata.responseTimeMs
      }
    })
  } catch (error: any) {
    await logAIGeneration({
      userId: user.id,
      cvDocumentId: cvId,
      provider,
      model: 'unknown',
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      responseTimeMs: 0,
      success: false,
      errorMessage: error.message
    })

    return NextResponse.json(
      { error: error.message || 'AI generation failed.' },
      { status: 500 }
    )
  }
}
