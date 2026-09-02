// Anthropic (Claude) integration
import Anthropic from '@anthropic-ai/sdk'
import type { AIUsageMetadata } from '@/types/ai'

export async function generateWithAnthropicClaude(
  prompt: string,
  model = 'claude-3-opus-20240229'
): Promise<{ content: string; usage: AIUsageMetadata }> {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not configured')
  }

  const startTime = Date.now()

  try {
    const response = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || model,
      max_tokens: 4000,
      system: 'You are an expert professional resume writer. Return only valid JSON.',
      messages: [{ role: 'user', content: prompt }]
    })

    const textBlock = response.content.find(
      (block) => block.type === 'text'
    )
    const text = textBlock && 'text' in textBlock ? textBlock.text : '{}'
    const promptTokens = response.usage.input_tokens ?? 0
    const completionTokens = response.usage.output_tokens ?? 0

    return {
      content: text,
      usage: {
        promptTokens,
        completionTokens,
        totalTokens: promptTokens + completionTokens,
        responseTimeMs: Date.now() - startTime,
        model: response.model
      }
    }
  } catch (error: any) {
    throw new Error(`Anthropic API error: ${error.message}`)
  }
}
