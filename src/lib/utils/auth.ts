import { NextResponse, type NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import type { Session } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/db/prisma'

interface RateLimitParams {
  userId: string
  maxCalls?: number
  windowHours?: number
}

export async function checkRateLimit({
  userId,
  maxCalls = Number(process.env.RATE_LIMIT_MAX_CALLS) || 20,
  windowHours = Number(process.env.RATE_LIMIT_WINDOW_HOURS) || 1
}: RateLimitParams): Promise<{ allowed: boolean; remaining: number; limit: number; resetAt: Date }> {
  const now = new Date()
  const periodStart = new Date(now.getTime() - windowHours * 60 * 60 * 1000)

  // Find current rate limit record
  let limit = await prisma.rateLimit.findFirst({
    where: {
      userId,
      periodStart: { gte: periodStart }
    },
    orderBy: { periodStart: 'desc' }
  })

  if (!limit) {
    limit = await prisma.rateLimit.create({
      data: {
        userId,
        aiCallsUsed: 0,
        aiCallsLimit: maxCalls,
        periodStart: now,
        periodEnd: new Date(now.getTime() + windowHours * 60 * 60 * 1000)
      }
    })
  }

  const remaining = Math.max(0, limit.aiCallsLimit - limit.aiCallsUsed)

  if (remaining <= 0) {
    return {
      allowed: false,
      remaining: 0,
      limit: limit.aiCallsLimit,
      resetAt: limit.periodEnd
    }
  }

  // Increment usage
  await prisma.rateLimit.update({
    where: { id: limit.id },
    data: { aiCallsUsed: { increment: 1 } }
  })

  return {
    allowed: true,
    remaining: remaining - 1,
    limit: limit.aiCallsLimit,
    resetAt: limit.periodEnd
  }
}

export async function logAIGeneration(input: {
  userId: string
  cvDocumentId?: string
  provider: 'openai' | 'anthropic'
  model: string
  promptTokens: number
  completionTokens: number
  totalTokens: number
  responseTimeMs: number
  success: boolean
  errorMessage?: string
}) {
  try {
    await prisma.aiGenerationLog.create({
      data: {
        userId: input.userId,
        cvDocumentId: input.cvDocumentId,
        provider: input.provider,
        model: input.model,
        promptTokens: input.promptTokens,
        completionTokens: input.completionTokens,
        totalTokens: input.totalTokens,
        responseTimeMs: input.responseTimeMs,
        success: input.success,
        errorMessage: input.errorMessage
      }
    })
  } catch (error) {
    console.error('Failed to log AI generation:', error)
  }
}

export async function requireAuth(): Promise<Session | null> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return null
  }
  return session
}

export function unauthorized(): NextResponse {
  return NextResponse.json(
    { error: 'Unauthorized. Please log in.' },
    { status: 401 }
  )
}

export function rateLimited(resetAt: Date): NextResponse {
  return NextResponse.json(
    {
      error: 'Rate limit exceeded. Please wait before trying again.',
      resetAt: resetAt.toISOString()
    },
    { status: 429 }
  )
}
